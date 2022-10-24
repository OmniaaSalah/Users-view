import { NgModule } from '@angular/core';
import { BrowserModule ,Title } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from './layout/layout.module';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { DTransalteModule } from './shared/transaltion/transalte.module';
import { SharedModule } from './shared/shared.module';
import { ChartModule } from 'primeng/chart';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';




@NgModule({
  declarations: [
    AppComponent,

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
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    DTransalteModule.forRoot(),
    ToastModule
  ],
  providers: [
    Title, 
    MessageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
