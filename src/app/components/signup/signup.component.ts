import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SignupService } from '../../services/signup.service';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
// import { PasswordStrengthBarModule } from 'ng2-password-strength-bar';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: []
})
export class SignupComponent implements OnInit, OnDestroy {

  signupForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', Validators.required),
    passwordConfirm: new FormControl('', Validators.required)
  },  Validators.compose([this.checkPasswordMatch , this.checkUsernameNotTaken ]));

  startBarLabel: string = "Password strength:";
  strengthBarColors = ['#DD2C00', '#FFD600', '#00C853'];
  strengthBarLabels = ['(Weak)', '(Ok)', '(Strong)'];

  constructor(private signupService: SignupService) {}

  ngOnInit() {}

  checkUsernameNotTaken(formGroup: FormGroup): Subscription {
    return this.signupService.ifDuplicateUsername(formGroup.controls.username.value)
      .subscribe(
        map(
          bool => {
            bool ? null : { emailTaken: true };
      }));
  }

  checkPasswordMatch(formGroup: FormGroup): any{
    return formGroup.controls.password.value === formGroup.controls.passwordConfirm.value ? null : { 'mismatch': true };
  }

  ngOnDestroy(): void {
    // if(this.subscription){
    //    this.subscription.unsubscribe();
    // }
  }

}
