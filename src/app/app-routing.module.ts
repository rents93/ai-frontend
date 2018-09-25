import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from './components/map/map.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthGuardService } from './services/auth-guard.service';
import { ArchivesComponent } from './components/archives/archives.component';

const routes: Routes = [
  { path: '', redirectTo: '/map', pathMatch: 'full' },
  { path: 'map', component: MapComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent },
  { path: 'archives', component: ArchivesComponent, canActivate: [AuthGuardService]  },
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