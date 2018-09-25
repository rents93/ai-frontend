import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('ai-token')) {
      //user logged
      return true;
    }

    // not logged, redirect to login page
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }}); 
    //after login redirect to previous authguard protected url
    return false;
  }
}
