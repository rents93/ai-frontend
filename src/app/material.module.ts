import {NgModule} from "@angular/core";
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
    MatCheckboxModule, } from '@angular/material';

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
],
})
export class CustomMaterialModule { }