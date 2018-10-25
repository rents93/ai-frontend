import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { JwtService } from '../services/jwt/jwt.service';

@Injectable()
export class NoAuthGuard implements CanActivate {    // path without guards

    constructor(private  router: Router, private jwtService : JwtService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        
        let token = window.localStorage.getItem('ai-token');   
        let isExpired = this.jwtService.ifTokenExpired(token);
        let canAccess: boolean;

        if (isExpired) {
            // stay where you are
            canAccess = true;
        }
        else{
            // have token, redirect to user domain
            canAccess = false;
            this.router.navigateByUrl('map');            
        }

        return canAccess;
    }
}

