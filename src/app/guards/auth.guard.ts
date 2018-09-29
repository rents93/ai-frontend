import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { JwtService } from '../services/jwt.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,  private jwtService : JwtService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    let token = window.localStorage.getItem('ai-token');   
    let isExpired = this.jwtService.ifTokenExpired(token);
    let canAccess: boolean;

    if (isExpired) {
      // cannot access
       canAccess = false;
       window.localStorage.removeItem('ai-token');
       this.router.navigate(['/login']);
    }
    else{
      // can access
      canAccess = true;
    }
    return canAccess;
  }
}
