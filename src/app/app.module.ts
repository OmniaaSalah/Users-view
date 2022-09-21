import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { LayoutModule } from './layout/layout.module';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

import { LayoutComponent } from './layout/layout.component';


// import { AuthGuard } from './core/services/auth-guard.service';
// import { TokenGuard } from './core/services/token-guard.service';
import { ClickOutsideDirective } from './shared/directives/click-outside.directive';
import { DTransalteModule } from './shared/transaltion/transalte.module';



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
    // SharedModule,
    LayoutModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-left'
    }),
    DTransalteModule.forRoot(),

  ],
  providers: [
    // AuthGuard,
    // TokenGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
