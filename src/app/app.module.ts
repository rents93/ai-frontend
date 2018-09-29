import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './components/nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MapComponent } from './components/map/map.component';
import { CustomMaterialModule } from './/material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module'
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginService } from './services/login.service';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { ArchivesComponent } from './components/archives/archives.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/no-auth.guard';
import { JwtService } from './services/jwt.service';
import { MapService } from './services/map.service';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { JwtModule } from '@auth0/angular-jwt';

// config JwtHelper
export function tokenGetter(){
  return localStorage.getItem('ai-token');
}


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    MapComponent,
    LoginComponent,
    PageNotFoundComponent,
    ArchivesComponent,
    HomeComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    LayoutModule,
    LeafletModule,
    HttpClientModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    AppRoutingModule,
    CustomMaterialModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }
    })    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    LoginService,
    JwtService,
    MapService,
    ErrorInterceptor,
    JwtInterceptor,
    AuthGuard,
    NoAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
