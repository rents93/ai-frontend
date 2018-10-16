import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  endpointAddr : String = "http://localhost:8080/customer";
  usersPath : String = "/users";
  buyPath : String = "/buy";
  getPath : String = "/search";
  confirmPath : String = this.buyPath+"/confirm";    


  constructor(private httpClient : HttpClient) { }

  getUsers() : Observable<String[]>{
    return this.httpClient.get<String[]>(this.endpointAddr+""+this.usersPath)
                            .pipe(
                                retry(3)
                            );

}
}
