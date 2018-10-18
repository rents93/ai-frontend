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

    ifDuplicateUsername(username: string){
        
        let targetUrl = this.basicUrl + "/guest/checkUser/" + username;
        let getObs: Observable<any> = this.http.get(targetUrl).pipe(retry(3));   
        
        let boolObs: Observable<any> = getObs.pipe(map(
                resp => {
                    return resp.status === 200 ? true:false
                }
            ));
        return boolObs;
    
       //return null;
       //let boolObs: Observable<any>;
       //return boolObs;
    }

    register(user:User){
        let targetUrl = this.basicUrl + "/guest/register";
        //console.log(targetUrl);
        let res : Observable<any> = this.http.post(
            targetUrl,
            user,
        ).pipe(retry(3));
        console.log(res);
        let obs : Observable<any> = res.pipe(
            map(
                resp => {
                    if(resp.status===201){
                        return true;
                        }
                    return false;
                }
        ), catchError((e)=>{return of(false)}));
        return obs;
      }
      
      activate(username : string, code : string){
        let targetUrl = this.basicUrl + "/guest/activate/" + username + "/" + code;
      
        let ris : Observable<any> = this.http.get(targetUrl).pipe(retry(3));
        return ris.pipe(map((resp) => {
          return resp.status === 200 ? true:false
        }));
      }



}