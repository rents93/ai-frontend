import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { tokenGetter } from '../../app.module';
import { FileUploader, FileItem, ParsedResponseHeaders } from 'ng2-file-upload';


const URL = environment.API_URL + '/user/upload';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  
  public uploader: FileUploader = null;
  public hasBaseDropZoneOver: boolean = false;
  public upload: String = "";

  constructor() { }

  ngOnInit() {
    let token = window.localStorage.getItem('ai-token');
    //token = 'Bearer '+ token;
    //console.log(token);
    //console.log(URL);
    this.uploader = new FileUploader({
                    url: URL,
                    isHTML5: true,
                    method: 'POST',
                    itemAlias: 'file',
                    authTokenHeader:  'authorization',
                    authToken: 'Bearer '+ token,
    });
    this.uploader.onSuccessItem = (item, response, status, headers) => this.onSuccessItem(item, response, status, headers);
    this.uploader.onErrorItem = (item, response, status, headers) => this.onErrorItem(item, response, status, headers);
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };

    /* this.uploader._onErrorItem = (error) => {
      let errorCause = JSON.parse(error._xhr.responseText);
      alert("Error during the upload of "+ error.file.name+".\nCheck file format, please.\n"); 
    }; */
  }

  onSuccessItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    if(status===201){
      this.upload='ok';
    }
    else{
      this.upload='error';
    }
  }

  onErrorItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    if(status===418){
      this.upload='error';
    }
    else{
      this.upload='error';
    }
  }

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }
}
