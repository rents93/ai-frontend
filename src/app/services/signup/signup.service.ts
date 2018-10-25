import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { retry, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { User } from '../../models/user';

@Injectable()
export class SignupService {
    basicUrl: String;

    constructor(private http: HttpClient) {
        this.basicUrl = environment.API_URL;
    }

    //registrazione di un nuovo utente
    register(user:User){
        let targetUrl = this.basicUrl + "/guest/register";
        // console.log(targetUrl);
        // console.log(user);
        let res = this.http.post(
            targetUrl,
            user,
            {observe: 'response'}
        ).pipe(
            retry(3)
            ,map(resp => resp.status)   
        );
        return res;
    }
}