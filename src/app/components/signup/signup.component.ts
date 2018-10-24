import { Component, OnInit, Input, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SignupService } from '../../services/signup/signup.service';
import { map, delay } from 'rxjs/operators';
import { Subscription, observable } from 'rxjs';
import { PasswordStrengthBarModule } from 'ng2-password-strength-bar';
//import { UserValidator } from '../../validators/user.validator';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';


import { environment } from '../../../environments/environment';
import { retry, mapTo } from 'rxjs/operators';
import { Observable, timer, of} from 'rxjs';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  signupForm: FormGroup;
  startBarLabel: string = "Sicurezza Password:";
  strengthBarColors = ['#DD2C00', '#FFD600', '#00C853'];
  strengthBarLabels = ['(Weak)', '(Ok)', '(Strong)'];
  changeDetectorRefs :ChangeDetectorRef[] = [];

  user: User;
  subscription: Subscription;
  errorMessage: string = "";

  constructor(private signupService: SignupService, private changeDetectorRef:ChangeDetectorRef,
              private router : Router) {}

  ngOnInit() {
    this.signupForm = new FormGroup({
        username: new FormControl('', [Validators.required /*,this.checkUsernameNotTaken.bind(this)*/]),
        password: new FormControl('', Validators.required),
        passwordConfirm: new FormControl('', Validators.required)
      },
      [this.checkPasswordMatch/*,this.checkUsernameNotTaken.bind(this) */]
    );
  }

  checkPasswordMatch(formGroup:FormGroup){
    return formGroup.controls.password.value === formGroup.controls.passwordConfirm.value ? null : { mismatch: true };
  }

  clearErrMess() {
    this.errorMessage = '';
  }

  signupFormSubmit(): void {
    this.user = new User(this.signupForm.controls.username.value, 
                          this.signupForm.controls.password.value);
    //console.log(this.user);
    if (this.signupForm.valid) {
      this.subscription = this.signupService.register(this.user).subscribe(
        response => {
          this.router.navigate(['login']);
        },
        (respErr: HttpErrorResponse) => {
          // console.log(respErr.error.error_description);
          if(respErr.status == 409){
            this.signupForm.reset();
            this.errorMessage = "Username già in uso, riprova";
          }
          else
            this.errorMessage = "Errore, riprova più tardi!"
        }
      );
    }
  }

  ngOnDestroy(): void {
    if(this.subscription)
       this.subscription.unsubscribe();
  }
}
