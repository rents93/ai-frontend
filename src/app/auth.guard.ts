// import { Injectable } from '@angular/core';
// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// import { Observable } from 'rxjs';
// import { AuthService } from './services/login.service';
// import { Router } from '@angular/router';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {
  
//   constructor(private authService: AuthService, private router: Router){}

//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
//       let url: string = state.url;
//       return this.checkLogin(url);
//   }

//   checkLogin(url: string): boolean {
//     return true;
// /*     if (this.authService.isLoggedIn) {return true;}

//     this.authService.redirectUrl = url;

//     this.router.navigate(['/login']);
//     return false;
//  */  }
// }
