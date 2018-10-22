import { Component, OnInit, Input, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
<<<<<<< HEAD
import { SignupService } from '../../services/signup.service';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
// import { PasswordStrengthBarModule } from 'ng2-password-strength-bar';
=======
import { SignupService } from '../../services/signup/signup.service';
import { map, delay } from 'rxjs/operators';
import { Subscription, observable } from 'rxjs';
import { PasswordStrengthBarModule } from 'ng2-password-strength-bar';
//import { UserValidator } from '../../validators/user.validator';
import { User } from '../../models/user';
import { Router } from '@angular/router';
>>>>>>> 9be9327b982de36ced2a3aa15bab6cef67c21f3b

import { environment } from '../../../environments/environment';
import { retry, mapTo } from 'rxjs/operators';
import { Observable, timer, of} from 'rxjs';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: []
})
export class SignupComponent implements OnInit, OnDestroy {

  signupForm: FormGroup;
  startBarLabel: string = "Password strength:";
  strengthBarColors = ['#DD2C00', '#FFD600', '#00C853'];
  strengthBarLabels = ['(Weak)', '(Ok)', '(Strong)'];
  changeDetectorRefs :ChangeDetectorRef[] = [];
  public user: User;
  private subscription: Subscription;

<<<<<<< HEAD
  constructor(private signupService: SignupService) {}

  ngOnInit() {}
=======

  constructor(private signupService: SignupService, private changeDetectorRef:ChangeDetectorRef, private router : Router) {
  }

  ngOnInit() {
    this.signupForm = new FormGroup({
      username: new FormControl('', [Validators.required /*,this.checkUsernameNotTaken.bind(this)*/]),
      password: new FormControl('', Validators.required),
      passwordConfirm: new FormControl('', Validators.required)
    },  [this.checkPasswordMatch/*,this.checkUsernameNotTaken.bind(this) */]);
  }
>>>>>>> 9be9327b982de36ced2a3aa15bab6cef67c21f3b


  checkUsernameNotTaken(fc: FormControl): Subscription {
    
    //if(fc.value){
    let targetUrl = environment.API_URL + "/guest/checkUser/" + fc.value;
    console.log(fc.value);
    console.log(targetUrl);
    
    //console.log(this.signupService.ifDuplicateUsername(fc.value));
    /*
    return this.signupService.ifDuplicateUsername(fc.value)
      .subscribe(
        map(
          bool => {
            bool ? null : { usernameTaken: true };
      }));
    }
    else
    */
      return null;

      /*

      let ob = new Observable;
      ob.pipe(
        delay(500),
        map(()=>{
          return this.signupService.ifDuplicateUsername(fc.value)
            .pipe(
              map(null,err=>of({usernameTaken: true}))
            )
            
        }
        )
      )
      return ob.subscribe();
      */
     //return null;
  }

  checkPasswordMatch(formGroup:FormGroup){
    return formGroup.controls.password.value === formGroup.controls.passwordConfirm.value ? null : { mismatch: true };
  }

  ngOnDestroy(): void {
     if(this.subscription){
        this.subscription.unsubscribe();
     }
  }

  @Input() errorMessage: string | null;

  signupFormSubmit(): void{
    this.user =
      new User(
        this.signupForm.controls.username.value,
        this.signupForm.controls.password.value);

        //console.log(this.user);

    if (this.signupForm.valid) {
      this.subscription = this.signupService.register(this.user).subscribe((data) => {
        if (!data) {
          this.errorMessage = "Registration Error";
          this.changeDetectorRef.detectChanges();
        }
        else{
          this.errorMessage = null;
          window.localStorage.setItem('ai-registration', 'pending');
          this.router.navigateByUrl('login');
        }
      });
    }

  }

}
