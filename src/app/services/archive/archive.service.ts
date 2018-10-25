import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Archive } from '../../models/archive';
import { ResponseContentType, RequestOptions, RequestMethod } from '@angular/http';
import { Headers, Http} from '@angular/http';
import { saveAs } from 'file-saver';
import { NavigableArchive} from '../../models/navigablearchive';
import { Subscription } from 'rxjs';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArchiveService implements OnDestroy{

    private subscription1: Subscription;
    private subscription2: Subscription;

    serverAddress : String = environment.API_URL+"/user";
    archivesAddress : String = environment.API_URL+"/user/archives";
    ownedArchiveParam : String = "?ownership=self";
    purchasedArchiveParam : String = "?ownership=purchased";

    constructor(private client : HttpClient, private http : Http) {

    }

    ngOnInit() {
    }

    //ottieni archivi personali dal server
    getOwnedArchives(page:number,size:number) : Observable<NavigableArchive>{
        return this.client.get<NavigableArchive>(this.archivesAddress+""+this.ownedArchiveParam+"&page="+page+"&size="+size).pipe(retry(3));
    }

    //ottieni archivi personali dal server
    getPurchasedArchives(page:number,size:number) : Observable<NavigableArchive>{
        return this.client.get<NavigableArchive>(this.archivesAddress+""+this.purchasedArchiveParam+"&page="+page+"&size="+size).pipe(retry(3));
    }

    //visualizza i 10 archivi successivi
    navigateNext(nav:NavigableArchive):Observable<NavigableArchive>{
        return this.client.get<NavigableArchive>(nav._links.next.href).pipe(retry(3));
    }

    //visualizza i 10 archivi precedenti
    navigateBack(nav:NavigableArchive):Observable<NavigableArchive>{
      return this.client.get<NavigableArchive>(nav._links.previous.href).pipe(retry(3));
    }

    //scarica il file
    getArchive(filename:string){
        let body : String[] = [];
        body.push(filename);
        let token = window.localStorage.getItem('ai-token');
        let newheaders = new Headers( );
        newheaders.append( 'Content-Type', 'application/json' );
        newheaders.append('Authorization','Bearer '+ token);
        
        this.subscription2 = this.http.get(this.serverAddress+"/archives/"+filename,{
            method: RequestMethod.Get,
            responseType: ResponseContentType.Blob,
            headers: newheaders
        }).pipe(
            retry(3)
        ).subscribe(
            (response) => {
                let elements = response.url.split("/");
                let l = elements.length;
                var blob = new Blob([response.blob()], {type: 'application/json'});
                var filename = elements[l-1];
                saveAs(blob, filename);
            }, (error) => {
                alert("Error during the download. Retry later!");
            }
        );
    }

    deleteArchive(filename:string){
        return this.client.delete(this.archivesAddress+"/"+filename).pipe(retry(3));
    }

    ngOnDestroy(): void {
        if(this.subscription1)
            this.subscription1.unsubscribe();
        if(this.subscription2)
            this.subscription2.unsubscribe();
    }
}
