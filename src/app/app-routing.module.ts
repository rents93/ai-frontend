import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from './components/map/map.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthGuard } from './guards/auth.guard';
import { ArchivesComponent } from './components/archives/archives.component';
import { UploadComponent } from './components/upload/upload.component';
import { SignupComponent } from './components/signup/signup.component';
import { NoAuthGuard } from './guards/no-auth.guard';


const routes: Routes = [
  { path: '', redirectTo: 'map', canActivate: [AuthGuard], pathMatch: 'full' },
  { path: 'map', component: MapComponent, canActivate: [AuthGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [NoAuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [NoAuthGuard] },
  { path: 'archives', component: ArchivesComponent, canActivate: [AuthGuard]  },
  { path: 'upload', component: UploadComponent, canActivate: [AuthGuard]  },
  { path: '**', component: PageNotFoundComponent }
]


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }