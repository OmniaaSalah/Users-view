import { NgModule } from '@angular/core';
import { BrowserModule ,Title } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from './layout/layout.module';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { DTransalteModule } from './shared/transaltion/transalte.module';

import { SharedModule } from './shared/shared.module';


import { ChartModule } from 'primeng/chart';
import { ToastModule } from 'primeng/toast';
import { AuthInterceptor } from './interseptors/AuthInterceptor';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import {  DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';




@NgModule({
  declarations: [
    AppComponent,
    // PermissionDirective
    // ClickOutsideDirective

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    SharedModule,
    ChartModule,
    LayoutModule,
    DialogModule,
    FileUploadModule,
    DropdownModule,
    InputSwitchModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    DTransalteModule.forRoot(),
    ToastModule,
  ],
  providers: [
    Title, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
