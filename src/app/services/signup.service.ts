import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { retry, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class SignupService {
    basicUrl: String;

    constructor(private http: HttpClient) {
        this.basicUrl = environment.API_URL;
    }

    ifDuplicateUsername(username: string){
        let targetUrl = this.basicUrl + "/guest/checkUser/" + username;
        let getObs: Observable<any> = this.http.get(targetUrl).pipe(retry(3));    
        let boolObs: Observable<any> = getObs.pipe(map(
                resp => {
                    return resp.status === 200 ? true:false
                }
            ));
        return boolObs;
    }
}