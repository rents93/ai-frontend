import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../services/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading = false;
  errorMessage: string = '';
  loginForm: FormGroup;
  disableButton = false;

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
    this.loginService.login(this.loginForm.controls.username.value , this.loginForm.controls.password.value)
      .subscribe(
          (response) => {
            window.localStorage.setItem('ai-token', response.access_token);
            this.router.navigate(['map']);
          },
          error => {    
            if(error.status == 400){
              // 400 bad request
              this.errorMessage = JSON.parse(error._body).error_description;
            }
            else{
              this.errorMessage = "Error, please try later."
            }
          } 
      );
  }
}
