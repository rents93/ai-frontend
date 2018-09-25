import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { map, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
    basicUrl: string;
    postSub: Subscription;

    constructor(private http: HttpClient,  private  router: Router) {
        this.basicUrl = environment.API_URL;
    }

    login(username: string, password: string) {
        let targetUrl = this.basicUrl + "/oauth/token";

        let body = new URLSearchParams();
            body.set('grant_type', 'password');
            body.set('username', username);
            body.set('password', password);
            body.set('client_id', 'fooClientIdPassword');

        let bodyString = body.toString();

        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/x-www-form-urlencoded',
              'authorization': 'Basic Zm9vQ2xpZW50SWRQYXNzd29yZDpzZWNyZXQ=' //FIXME:
            })
        };

        let postObs: Observable<any> = this.http
            .post(
                targetUrl,
                bodyString,
                httpOptions
            )
            .pipe(
                retry(3),              
            );
        
        postObs.subscribe(
            (response) =>{
                localStorage.setItem('ai-token', response.access_token);
            });
            
        return postObs;
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

    ngOnDestroy(): void {
        if(this.postSub){
            this.postSub.unsubscribe();
        }
    }
}