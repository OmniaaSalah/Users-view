import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PaginationComponent } from './components/pagination/pagination.component';
import { PrimngModule } from '../modules/primng/primng.module';
import { LayoutModule } from '../layout/layout.module';
import { InputSwitchComponent } from './components/input-switch/input-switch.component';
import { InformativeBlockComponent } from './components/informative-block/informative-block.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { CalenderComponent } from './components/calender/calender.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import localeAr from '@angular/common/locales/ar';

registerLocaleData(localeAr);



@NgModule({
  declarations: [
    PaginationComponent,
    InformativeBlockComponent,
    FileUploadComponent,
    InputSwitchComponent,
    CalenderComponent
  ],
  imports: [
    
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    FontAwesomeModule,
    PrimngModule,
    LayoutModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    PaginationComponent,
    LayoutModule,
    InformativeBlockComponent,
    FileUploadComponent,
    InputSwitchComponent,
    CalenderComponent
  ]
})
export class SharedModule { }
