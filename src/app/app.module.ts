import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { DTransalteModule } from './shared/transaltion/transalte.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { PrimngModule } from './primng/primeNg.module';
import { RouteReuseStrategy } from '@angular/router';
import { CustomRouteReuseStrategy } from './core/strategies/route-reuse.strategy';
import { GlobalErrorHandlerService } from './core/services/global-error-handler.service';
import { ConfirmModelService } from './shared/services/confirm-model/confirm-model.service';
import { ConfirmModalModule } from './shared/confirm-modal.module';




@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    PrimngModule,
    DTransalteModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    })
  ],
  providers: [
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: appInitializerFactory,
    //   deps: [TranslateService],
    //   multi: true
    // },
    {
      provide: RouteReuseStrategy,
      useClass: CustomRouteReuseStrategy,
    },
    {provide: ErrorHandler, useClass: GlobalErrorHandlerService},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

// export function appInitializerFactory(translate: TranslateService) {
//   return () => {
//     translate.setDefaultLang('ar');
//     return translate.use('ar').toPromise();
//   };
// }
