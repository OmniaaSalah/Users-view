import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PaginationComponent } from './components/pagination/pagination.component';
import { PrimngModule } from '../modules/primng/primng.module';
import { LayoutModule } from '../layout/layout.module';
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
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { LoaderComponent } from './components/loader/loader/loader.component';
import { SkeletonComponent } from './components/skeleton/skeleton.component';

import { ButtonGroupComponent } from './components/button-group/button-group.component';
import { ConfirmModelComponent } from './components/confirm-model/confirm-model.component';
import { PermissionDirective } from './directives/permission/permission.directive';
import { SendMessageComponent } from './components/send-message/send-message.component';
import { FileUploadModule } from 'primeng/fileupload';
import { CurrentLangPipe } from './pipes/current-lang/current-lang.pipe';
import { CardStudentComponent } from './components/card-student/card-student.component';
import { DialogModule } from 'primeng/dialog';
import { InputSwitchModule } from 'primeng/inputswitch';
import { LocalizeDatePipe } from './pipes/localize-date.pipe';

import { SelectSchoolsComponent } from './components/select-schools/select-schools.component';
import { RegisterRequestComponent } from './components/register-request/register-request.component';
import { SharedService } from './services/shared/shared.service';
import { DTransalteModule } from './transaltion/transalte.module';
registerLocaleData(localeAr);


@NgModule({
  declarations: [

    PaginationComponent,
    InformativeBlockComponent,
    FileUploadComponent,
    CalenderComponent,
    BackComponent,
    ValidationDirective,
    ValidatorsInputDirective,
    TableCaptionComponent,
    AddBtnComponent,
    DropdownComponent,
    SendBtnComponent,
    DropdownComponent,
    LocalizeDatePipe,
    // PermissionDirective,
    LoaderComponent,
    SkeletonComponent,
    ConfirmModelComponent,
    ButtonGroupComponent,
    ConfirmModelComponent,
    SendMessageComponent,
    CurrentLangPipe,
    CardStudentComponent,
    RegisterRequestComponent,
   SelectSchoolsComponent, 
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
    DialogModule,
    FileUploadModule,
    InputSwitchModule,
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
    CalenderComponent,
    TranslateModule,
    BackComponent,
    ValidationDirective,
    ValidatorsInputDirective,
    TableCaptionComponent,
    AddBtnComponent,
    SendBtnComponent,
    DropdownComponent,
    // PermissionDirective,
    NgxSkeletonLoaderModule,
    LoaderComponent,
    SkeletonComponent,
    ConfirmModelComponent,
    ButtonGroupComponent,
    ConfirmModelComponent,
    SendMessageComponent,
    CurrentLangPipe,
    CardStudentComponent,
    LocalizeDatePipe,
    RegisterRequestComponent,
    SelectSchoolsComponent

  ],
  providers:[SharedService]
})
export class SharedModule { }
