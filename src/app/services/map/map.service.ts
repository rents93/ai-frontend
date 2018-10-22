import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';
import { QueryObj } from '../../models/queryObj';
import { QueryResult } from '../../models/QueryResult/queryResult';
import { ArchiveTransaction } from 'src/app/models/QueryResult/archiveTransaction';

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

  getPositions(queryObj: QueryObj, startDate : number, endDate : number) : Observable<QueryResult>{
    console.log("Sending JSON: " + JSON.stringify(queryObj));
    console.log(startDate + " to " + endDate);
    return this.httpClient.post<QueryResult>(this.endpointAddr+""+this.getPath+"?after="+startDate+"&before="+endDate,
                                        JSON.stringify(queryObj), {observe: 'response'}).pipe(
                                            retry(3),
                                            map(resp => {
                                               console.dir(resp);
                                               console.dir(resp.headers);
                                               console.dir(resp.headers.keys());
                                               return resp.body;
                                            }
                                            )
                                        );
    //let totPositions = 0;
    //let database = new Database();
    //totPositions = database.getNumPositionInsidePolygon(coordinates, startDate, endDate);
    //return Observable.of(totPositions);
  }

  selectArchive(objectToSend : QueryObj, startDate : number, endDate : number) : Observable<ArchiveTransaction[]>{
    //alert("Sending JSON: " + JSON.stringify(objectToSend));
    return this.httpClient.post<ArchiveTransaction[]>(this.endpointAddr+""+this.buyPath+"?after="+startDate+"&before="+endDate,
                                JSON.stringify(objectToSend));
  }

  buyArchives(objectToSend : ArchiveTransaction[]){
    return this.httpClient.post(this.endpointAddr+""+this.confirmPath, JSON.stringify(objectToSend));
  }
}
