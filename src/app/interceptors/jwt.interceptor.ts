import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from "@angular/router";
import { tap } from "rxjs/operators";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    
    constructor(private router : Router){}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let token = localStorage.getItem('ai-token');
        if (token) {
            request = request.clone({
                setHeaders: { 
                    Authorization: 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }
            });
        }

        return next.handle(request).pipe(
            tap(event => {}, err => {
                if (err instanceof HttpErrorResponse)
                    this.router.navigateByUrl("connectionError");
            })
        );
    }
}