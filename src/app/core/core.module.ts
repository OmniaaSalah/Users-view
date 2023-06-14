import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home-page/home.component';
import { GuardianHomeComponent } from './home-page/guardian-home/guardian-home.component';
import { PrimngModule } from '../primng/primeNg.module';
import { SharedModule } from '../shared/shared.module';
import { LayoutModule } from '../layout/layout.module';
import { NotAllowedComponent } from './components/not-allowed/not-allowed.component';



@NgModule({
  declarations: [
    HomeComponent,
    GuardianHomeComponent,
    NotAllowedComponent
  ],
  imports: [
    CommonModule,
    // TranslateModule,
    HttpClientModule,
    PrimngModule,
    SharedModule,
    LayoutModule
  ],
  exports:[
    HttpClientModule,
    HomeComponent,
    GuardianHomeComponent,
    LayoutModule,
    NotAllowedComponent
  ]
})
export class CoreModule { }
