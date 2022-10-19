import { NgModule } from '@angular/core';
import { BrowserModule ,Title } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LayoutModule } from './layout/layout.module';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';



// import { AuthGuard } from './core/services/auth-guard.service';
// import { TokenGuard } from './core/services/token-guard.service';
import { ClickOutsideDirective } from './shared/directives/click-outside/click-outside.directive';
import { DTransalteModule } from './shared/transaltion/transalte.module';

import { SharedModule } from './shared/shared.module';

import { ChartModule } from 'primeng/chart';
import { AuthInterceptor } from './interseptors/AuthInterceptor';



@NgModule({
  declarations: [
    AppComponent,

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
    // SharedModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      tapToDismiss: false,
      timeOut: 1000
    }),
    LayoutModule,
    // ToastrModule.forRoot({
    //   positionClass: 'toast-bottom-left'
    // }),
    DTransalteModule.forRoot(),

  ],
  providers: [
    Title, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    // AuthGuard,
    // TokenGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
