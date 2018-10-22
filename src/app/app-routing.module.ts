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
// {
//   canActivate: [AuthGuardService],
//   children: [
//     { path:'', pathMatch: 'full', redirectTo:'home'},
//     { path: 'logout', component: LogoutComponent, canActivate:[AuthGuardService], pathMatch: 'full'},
//     { path: 'home', component: HomeComponent, canActivate:[AuthGuardService], pathMatch: 'full'},
//     { path: 'archive', component: ArchiveComponent, canActivate:[AuthGuardService, NgxPermissionsGuard], data: {permissions: {only: ['ROLE_USER', 'ROLE_CUSTOMER'], redirectTo: 'home'}, pathMatch: 'full'}},
//     { path: 'upload', component: UploadComponent, canActivate:[AuthGuardService, NgxPermissionsGuard],data: {permissions: {only: ['ROLE_USER', 'ROLE_CUSTOMER'], redirectTo: 'home'}, pathMatch: 'full'}},
//     { path: 'buy', component: BuyComponent, canActivate:[AuthGuardService, NgxPermissionsGuard], data: {permissions: {only: ['ROLE_USER', 'ROLE_CUSTOMER'], redirectTo: 'home'}, pathMatch: 'full'}},
//     ],
//   component: LayoutAuthComponent,
//   data: [{
//     'skin': 'skin-blue',
//     'display_tasks': false,
//     'display_notifications': false,
//     'display_menu_search': false,
//     'display_menu_user': true,
//     'display_messages': false,
//     'display_control': false,
//     'display_user': false,
//     /*
//     // USE THIS IS YOU WANT TO HIDE SOME TEMPLATE PART
//     'boxed_style': false,
//     'display_logout': true,
//     header_components: []
//     */

//   }],
//   path: '',
// },