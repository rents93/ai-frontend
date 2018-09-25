import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: []
})
export class SignupComponent implements OnInit, OnDestroy {

  // registrationForm: FormGroup = new FormGroup({
  //   email: new FormControl('', Validators.required),
  //   username: new FormControl('', Validators.required, this.validateUsernameNotTaken.bind(this)),
  //   password: new FormControl('', Validators.required),
  //   passwordConfirm: new FormControl('', Validators.required)
  // },  this.passwordMatchValidator); 

  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    // if(this.subscription){
    //    this.subscription.unsubscribe();
    // }
  }

}
