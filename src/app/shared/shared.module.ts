import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PaginationComponent } from './components/pagination/pagination.component';
import { PrimngModule } from '../modules/primng/primng.module';
import { LayoutModule } from '../layout/layout.module';
import { InputSwitchComponent } from '../shared/components/input-switch/input-switch.component';
import { InformativeBlockComponent } from '../shared/components/informative-block/informative-block.component';
import { FileUploadComponent } from '../shared/components/file-upload/file-upload.component';
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
import { DropdownComponent } from '../shared/components/dropdown/dropdown.component';
import { CustomDatePipe } from './pipes/custom-date.pipe';
import { PermissionDirective } from './directives/permission/permission.directive';

import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

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
    CustomDatePipe,
    PermissionDirective

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
    NgxSkeletonLoaderModule,
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
    SendBtnComponent,
    DropdownComponent,
    PermissionDirective,
    NgxSkeletonLoaderModule


  ]
})
export class SharedModule { }
