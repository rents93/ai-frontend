import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from "@angular/router";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    
    // constructor(private router : Router){}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentUser = JSON.parse(localStorage.getItem('ai-token'));
        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: { 
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
        }

        return next.handle(request);
    }

    // const Token = window.localStorage.getItem("ai-token");

    // if (Token) {

    //     const cloned = request.clone({
    //         headers: request.headers.set("Authorization","Bearer " + Token)
    //         .set("Content-Type","application/json")
    //         //.set("withCredential", "true")
    //         //.set("Access-Control-Expose-Headers", "Set-Cookie")               
    //     });

    //     return next.handle(cloned).do(event => {}, err => {
    //         if(err instanceof HttpErrorResponse){
    //             this.router.navigateByUrl("/connectionError");
    //         }
    //     });
    // }
    // else {
    //     return next.handle(request).do(event => {}, err => {
    //         if(err instanceof HttpErrorResponse){
    //             this.router.navigateByUrl("/connectionError");
    //         }
    //     });
    // }

}