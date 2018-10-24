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

    // register(user:User){
    //     let targetUrl = this.basicUrl + "/guest/register";
    //     console.log("targetURL:" +targetUrl);
    //     console.log("user "+user);
    //     let res : Observable<any> = this.http.post(
    //         targetUrl,
    //         user            
    //     );//.pipe(retry(3));
    //     console.log(res);
    //     let obs : Observable<any> = res.pipe(
    //         map(
    //             resp => {
    //                 if(resp.status===201)
    //                     return true;
    //                 else
    //                     return false;
    //             }
    //     ), catchError(
    //         (e)=>{
    //             return of(false);
    //         }
    //     ));
    //     return obs;
    //   }

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
      
    //   activate(username : string, code : string){
    //     let targetUrl = this.basicUrl + "/guest/activate/" + username + "/" + code;
      
    //     let ris : Observable<any> = this.http.get(targetUrl).pipe(retry(3));
    //     return ris.pipe(map((resp) => {
    //       return resp.status === 200 ? true:false
    //     }));
    //   }



}