import {NgModule} from "@angular/core";
import { MatFileUploadModule } from 'angular-material-fileupload';
import { 
    MatMenuModule, 
    MatProgressSpinnerModule, 
    MatNativeDateModule, 
    MatInputModule, 
    MatButtonModule, 
    MatSelectModule, 
    MatIconModule, 
    MatToolbarModule, 
    MatSidenavModule, 
    MatListModule, 
    MatDatepickerModule, 
    MatCardModule,
    MatCheckboxModule,
    MatGridListModule,
    MatTabsModule
} from '@angular/material';

@NgModule({
imports: [
    MatMenuModule, 
    MatProgressSpinnerModule, 
    MatNativeDateModule, 
    MatInputModule, 
    MatButtonModule, 
    MatSelectModule, 
    MatIconModule, 
    MatToolbarModule, 
    MatSidenavModule, 
    MatListModule, 
    MatDatepickerModule, 
    MatCardModule,
    MatCheckboxModule,
    MatGridListModule,
    MatFileUploadModule,
    MatTabsModule
],
exports: [
    MatMenuModule, 
    MatProgressSpinnerModule, 
    MatNativeDateModule, 
    MatInputModule, 
    MatButtonModule, 
    MatSelectModule, 
    MatIconModule, 
    MatToolbarModule, 
    MatSidenavModule, 
    MatListModule, 
    MatDatepickerModule, 
    MatCardModule,
    MatCheckboxModule,
    MatGridListModule,
    MatFileUploadModule,
    MatTabsModule
],
})
export class CustomMaterialModule { }