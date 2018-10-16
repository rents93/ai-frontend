import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Archive } from '../../models/archive';
import { ResponseContentType, RequestOptions, RequestMethod } from '@angular/http';
import { Headers, Http} from '@angular/http';
import { saveAs } from 'file-saver/FileSaver';
import { NavigableArchive} from '../../models/navigable-archive';
import { Subscription } from 'rxjs';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArchiveService implements OnDestroy{

    private subscription1: Subscription;
    private subscription2: Subscription;

    serverAddress : String;
    archivesAddress : String;
    ownedArchiveParam : String;
    purchasedArchiveParam : String;
    constructor(private http : HttpClient){ 
        //private http : Http) {

    }

    ngOnInit() {
        this.serverAddress  = environment.API_URL+"/user";
        this.archivesAddress  = environment.API_URL+"/user/archives";
        this.ownedArchiveParam = "?ownership=self";
        this.purchasedArchiveParam = "?ownership=purchased";
    }


    getOwnedArchive(page:number,size:number) : Observable<NavigableArchive>{
        return this.http.get<NavigableArchive>(this.archivesAddress+""+this.ownedArchiveParam+"&page="+page+"&size="+size).pipe(retry(3));
    }

    getPurchasedArchive(page:number,size:number) : Observable<NavigableArchive>{
        return this.http.get<NavigableArchive>(this.archivesAddress+""+this.purchasedArchiveParam+"&page="+page+"&size="+size).pipe(retry(3));
    }
//     navigateNext(nav:NavigableArchive):Observable<NavigableArchive>{
//         return this.webclient.get<NavigableArchive>(nav._links.next.href).pipe(retry(3));
//     }
//     navigateBack(nav:NavigableArchive):Observable<NavigableArchive>{
//       return this.webclient.get<NavigableArchive>(nav._links.previous.href).pipe(retry(3));
//     }

//     getArchives(filenames:String[]){
//         let body : String[] = filenames;
//         let token = window.localStorage.getItem('ai-token');
//         let newheaders = new Headers( );
//         newheaders.append( 'Content-Type', 'application/json' );
//         newheaders.append('Authorization','Bearer '+ token);
        
//         this.subscription1 = this.http.post(this.serverAddress+"/zip/archives/", body, {
//             method: RequestMethod.Post,
//             responseType: ResponseContentType.Blob,
//             headers: newheaders
//         }).pipe(
//             retry(3)
//         ).subscribe(
//             (response) => {
//                 //console.log("File downloaded");
//                 var blob = new Blob([response.blob()], {type: 'application/zip'});
//                 var filename = 'file.zip';
//                 saveAs(blob, filename);
//         }, (error) => {
//             //console.log("File not downloaded");
//             //var blob = new Blob([error.blob()], {type: 'application/json'});
//                // var filename = 'error.json';
//                 //saveAs(blob, filename);
//                 alert("Error during the download. Retry later!");
//         }
//     );
//         //return this.webclient.post(this.serverAddress+"/ziparchive", body);
//         //return this.webclient.get(this.resourceAddress+"/"+filename);
//     }


//     getArchive(filename:string){
//         let body : String[] = [];
//         body.push(filename);
//         let token = window.localStorage.getItem('ai-token');
//         let newheaders = new Headers( );
//         newheaders.append( 'Content-Type', 'application/json' );
//         newheaders.append('Authorization','Bearer '+ token);
        
//         this.subscription2 = this.http.get(this.serverAddress+"/archives/"+filename,{
//             method: RequestMethod.Get,
//             responseType: ResponseContentType.Blob,
//             headers: newheaders
//         }).pipe(
//             retry(3)
//         ).subscribe(
//             (response) => {
//                 let elements = response.url.split("/");
//                 let l = elements.length;
//                 var blob = new Blob([response.blob()], {type: 'application/json'});
//                 var filename = elements[l-1];
//                 saveAs(blob, filename);
//         }, (error) => {
//             //console.log("File not downloaded");
//             //var blob = new Blob([error.blob()], {type: 'application/json'});
//                 //var filename = 'error.json';
//                 //saveAs(blob, filename);
//                 alert("Error during the download. Retry later!");
//         }
//     );
//         //return this.webclient.post(this.serverAddress+"/ziparchive", body);
//         //return this.webclient.get(this.resourceAddress+"/"+filename);
//     }

//     deleteArchive(filename:string){
//         return this.webclient.delete(this.resourceAddress+"/"+filename).pipe(retry(3));
//     }

//     deleteArchives(filenames : string[]){
//         let newbody : String[] = filenames;
//         let newheaders = new HttpHeaders( );
//         let token = window.localStorage.getItem('ai-token');
//         newheaders.append( 'Content-Type', 'application/json' );
//         newheaders.append('Authorization','Bearer '+ token);
//         //console.dir(newbody);
//         /*for(let filename in filenames){
//             newbody.push(filename);
//         }*/
//         //http.request('delete', url, { body: { ... } });
//         return this.webclient.request('delete',this.resourceAddress+"", { headers: newheaders, body:newbody}).pipe(retry(3));
        
//     }

    ngOnDestroy(): void {
        if(this.subscription1)
            this.subscription1.unsubscribe();
        if(this.subscription2)
            this.subscription2.unsubscribe();
    }
}
