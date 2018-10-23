import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../services/login/login.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading = false;
  errorMessage: any = '';
  loginForm: FormGroup;
  disableButton = false;
  sub: Subscription;

  @ViewChild("user") userField: ElementRef;

  constructor(private loginService : LoginService, private router : Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  loginFormSubmit(): void{
    if(this.loginForm.invalid){
      return;
    }
    this.loading = true;
    this.sub = this.loginService.login(this.loginForm.controls.username.value , 
                                        this.loginForm.controls.password.value)
      .subscribe( 
          response => {
            window.localStorage.setItem('ai-token', response.access_token);
            this.router.navigate(['map']);
          },
          (respErr: HttpErrorResponse) => {
            // console.log(respErr.error.error_description);
            if(respErr.status == 400){
              this.loading = false;
              this.loginForm.reset();
              this.errorMessage = "Credenziali errate";
            }
            else
              this.errorMessage = "Error, please try later."
          } 
      );
  }
  
  clearErrMess() {
    this.errorMessage = '';
  }

  ngOnDestroy(): void {
    if(this.sub !== null && this.sub !== undefined)
      this.sub.unsubscribe();
  }
}
