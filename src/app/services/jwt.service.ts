import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tokenGetter } from '../app.module';

@Injectable({
    providedIn: 'root'
})
export class JwtService {

    constructor(private jwtHelperService: JwtHelperService) { }

    ifLogged(){
        let token = tokenGetter();
        if(token && !this.ifTokenExpired(token)){
            return true;
        }
        else{
            return false;
        }
    }
    
    ifTokenExpired(token: string): boolean{
        let expireTime: number;
        let nowTime: number;

        if(!token){ 
            // token not set
            return true;
        }
        
        // check token expiration (in seconds)
        expireTime = this.getTokenExpireTime(token);        
        nowTime = Math.round((new Date().getTime())/1000);  

        if(!expireTime || expireTime < nowTime ){
            return true;
        }
        else {  // token not expired
            return false;
        }
    }
  
    getTokenExpireTime(token: string): number | null{
        let jsonToken: any;

        if(!token){
            // token invalid
            return null;
        }
        
        jsonToken = this.jwtHelperService.decodeToken(token);
        if(!jsonToken || !jsonToken.exp){
            return null;
        }
        
        // ok        
        return jsonToken.exp;
    }

    getTokenUsername(token: string){
        let jsonToken: any;

        if(!token){
            // token invalid
            return null;
        }

        jsonToken = this.jwtHelperService.decodeToken(token);
        if(!jsonToken || !jsonToken.user_name){
            return null;
        }

        return jsonToken.user_name;
    }

    getTokenRoles(token : string): any[]{
        let jsonToken: any;

        if(!token){
            // token invalid
            return [];
        }

        jsonToken = this.jwtHelperService.decodeToken(token);
        if(!jsonToken || !jsonToken.user_name){
            return [];
        }
        
        // ok
        return jsonToken.authorities;
    }
  
}
