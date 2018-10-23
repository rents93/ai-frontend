import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { User } from '../../models/user';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class SignupService {
    basicUrl: String;

    constructor(private http: HttpClient) {
        this.basicUrl = environment.API_URL;
    }

    ifDuplicateUsername(username: string){
        
        let targetUrl = this.basicUrl + "/guest/checkUser/" + username;
        let getObs: Observable<any> = this.http.get(targetUrl).pipe(retry(3));   
        
        // let boolObs: Observable<any> = getObs.pipe(map(
        //         resp => {
        //             return resp.status === 200 ? true:false
        //         }
        //     ));
        // return boolObs;
    
       //return null;
       //let boolObs: Observable<any>;
       //return boolObs;
    }

    register(user:User){
        let targetUrl = this.basicUrl + "/guest/register";
        console.log(targetUrl);
        console.log(user);

        // const httpOptions = {
        //     headers: new HttpHeaders({
        //       'Content-Type':  'application/json'
        //     })
        // };

        return this.http.post(
                targetUrl,
                user
                //httpOptions
            )
            .pipe(retry(3))
            .map(
                (resp: Response) => {
                    if(resp.status===201){
                        return true;
                    }
                    else{
                        return false;
                    }
                }
            )
            .catch(
                (e)=>{
                    return of(false);
                }
            );
      }
      
    //   activate(username : string, code : string){
    //     let targetUrl = this.basicUrl + "/guest/activate/" + username + "/" + code;
      
    //     let ris : Observable<any> = this.http.get(targetUrl).pipe(retry(3));
    //     return ris.pipe(map((resp) => {
    //       return resp.status === 200 ? true:false
    //     }));
    //   }



}