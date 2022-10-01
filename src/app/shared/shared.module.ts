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
import { TranslateModule } from '@ngx-translate/core';
import { BackComponent } from './components/back/back.component';
import { TableCaptionComponent } from './components/table-caption/table-caption.component';
import { ValidationDirective } from './directives/validation.directive';
import { ValidatorsInputDirective } from './directives/validators-input.directive';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { NgxSpinnerModule } from "ngx-spinner";
import { AddBtnComponent } from './components/add-btn/add-btn.component';
import { SendBtnComponent } from './components/send-btn/send-btn.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { CustomDatePipe } from './pipes/custom-date.pipe';


registerLocaleData(localeAr);



@NgModule({
  declarations: [
    PaginationComponent,
    InformativeBlockComponent,
    FileUploadComponent,
    InputSwitchComponent,
    CalenderComponent,
    BackComponent,
    ValidationDirective,
    ValidatorsInputDirective,
    TableCaptionComponent,
    AddBtnComponent,
    DropdownComponent,
    SendBtnComponent,
    DropdownComponent,
    CustomDatePipe


  ],
  imports: [

    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    FontAwesomeModule,
    InfiniteScrollModule,
    NgxSpinnerModule,
    PrimngModule,
    LayoutModule,
    TranslateModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    InfiniteScrollModule,
    NgxSpinnerModule,
    PaginationComponent,
    LayoutModule,
    InformativeBlockComponent,
    FileUploadComponent,
    InputSwitchComponent,
    CalenderComponent,
    TranslateModule,
    BackComponent,
    ValidationDirective,
    ValidatorsInputDirective,
    TableCaptionComponent,
    AddBtnComponent,
    DropdownComponent,
    SendBtnComponent,
    DropdownComponent

  ]
})
export class SharedModule { }
