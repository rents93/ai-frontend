import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { LoginComponent } from '../../components/login/login.component';
import { SignupComponent } from '../../components/signup/signup.component';


@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    AuthComponent, 
    LoginComponent,
    SignupComponent
  ],
  providers:[
  ]
})
export class AuthModule { }
