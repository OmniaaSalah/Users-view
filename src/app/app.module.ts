import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
<<<<<<< HEAD
import { AuthGuard } from './core/services/auth-guard.service';
import { TokenGuard } from './core/services/token-guard.service';
import { LayoutComponent } from './layout/layout.component';
import { LayoutModule } from './layout/layout.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
=======
// import { AuthGuard } from './core/services/auth-guard.service';
// import { TokenGuard } from './core/services/token-guard.service';
import { LayoutModule } from './layout/layout.module';
import { TranslateModule } from '@ngx-translate/core';
>>>>>>> 7cee60edc56e3e4f4eed3b2ecb61c9f7cb669b9c

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SchoolsModule,
    SharedModule,
    BrowserAnimationsModule,
    SharedModule,
    LayoutModule,
<<<<<<< HEAD
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-left'
    }),
    TranslateModule.forRoot({
      defaultLanguage: 'ar',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
=======
    TranslateModule.forRoot(),
    BrowserAnimationsModule
>>>>>>> 7cee60edc56e3e4f4eed3b2ecb61c9f7cb669b9c
  ],
  providers: [
    // AuthGuard,
    // TokenGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

// export function HttpLoaderFactory(http: HttpClient) {
//   return new TranslateHttpLoader(http, './assets/i18n/', '.json')
// }