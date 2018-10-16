import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../../environments/environment';
import { tokenGetter } from '../../app.module';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  
  public uploadUrl;

  constructor() { }

  ngOnInit() {
    this.uploadUrl = environment.API_URL + '/user/upload';
  }

}
