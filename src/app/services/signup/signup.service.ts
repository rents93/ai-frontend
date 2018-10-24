import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../models/user';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class SignupService {
    basicUrl: String;

    constructor(private http: HttpClient) {
        this.basicUrl = environment.API_URL;
    }

    //registrazione di un nuovo utente
    register(user:User){
        let targetUrl = this.basicUrl + "/guest/register";
        console.log(targetUrl);
        console.log(user);
        let res = this.http.post(
            targetUrl,
            user,
            {observe: 'response'}
        ).pipe(
            retry(3),
            map(resp => {
                if(resp.status==201)
                    return true;
                else
                    return false;
            })
        );
        return res;
    }
}