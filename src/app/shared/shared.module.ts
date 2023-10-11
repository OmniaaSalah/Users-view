import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PaginationComponent } from './components/pagination/pagination.component';
import { PrimngModule } from '../primng/primeNg.module';
import { InformativeBlockComponent } from './components/informative-block/informative-block.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { CalenderComponent } from './components/calender/calender.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import localeAr from '@angular/common/locales/ar';
import { BackComponent } from './components/back/back.component';
import { TableCaptionComponent } from './components/table-caption/table-caption.component';
import { ValidationDirective } from './directives/validation.directive';
import { ValidatorsInputDirective } from './directives/validators-input.directive';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
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
import { CurrentLangPipe } from './pipes/current-lang/current-lang.pipe';
import { CardStudentComponent } from './components/card-student/card-student.component';
import { DialogModule } from 'primeng/dialog';
import { LocalizeDatePipe } from './pipes/localize-date.pipe';
import { SelectSchoolsComponent } from './components/select-schools/select-schools.component';
import { RegisterRequestComponent } from './components/register-request/register-request.component';
import { SharedService } from './services/shared/shared.service';
import { NumberToWordsPipe } from './pipes/numbers-to-words/number-to-words.pipe';
import { CustomDatePipe } from './pipes/custom-date/custom-date.pipe';
import { StopPropagationDirective } from './directives/stop-propagation/stop-propagation.directive';
import { LanguageRestrictionDirective } from './directives/language-restriction/language-restriction.directive';
import { LocalizeSearchPipe } from './pipes/localize-search.pipe';
import { FileComponent } from './components/file/file.component';
import { TrauncateTextPipe } from './pipes/truncate-text/trauncate-text.pipe';
import { WorkflowComponent } from './components/workflow/workflow.component';
import { SafePipe } from './pipes/safe.pipe';
import { ConfirmDialogDirective } from './directives/confirm-dialog/confirm-dialog.directive';
import { StudentBadgesComponent } from './components/student-badges/student-badges.component';
import { WrapFuncPipe } from './pipes/wrapFunc/wrap-func.pipe';
import { ClickOutsideDirective } from './directives/click-outside/click-outside.directive';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';
import { RequestListComponent } from '../modules/request-list/Component/request-list/request-list.component';
import { FullbackImagePipe } from './pipes/fullback-image.pipe';
import { FullbackImageDirective } from './directives/fullback-image.directive';
import { SubHeaderComponent } from './components/sub-header/sub-header.component';
import { RequiredRolesDirective } from './directives/required-roles/required-roles.directive';
import { ExcludeEmptyListPipe } from './pipes/exclude-empty-list.pipe';
import { FormControlValidationMsgDirective } from './directives/validations/form-control-validation-msg.directive';
import { ToLocalDatePipe } from './pipes/to-local-date.pipe';
import { BlobToBase64Pipe } from './pipes/blob-to-base64.pipe';
import { NotAllowedComponent } from '../core/components/not-allowed/not-allowed.component';

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
    NumberToWordsPipe,
    CustomDatePipe,
    StopPropagationDirective,
    LocalizeSearchPipe,
    FileComponent,
    LanguageRestrictionDirective,
    LocalizeSearchPipe,
    RequestListComponent,
    TrauncateTextPipe,
    WorkflowComponent,
    SafePipe,
    ConfirmDialogDirective,
    StudentBadgesComponent,
    StudentBadgesComponent,
    WrapFuncPipe,
    ClickOutsideDirective,
    PermissionDirective,
    FullbackImagePipe,
    FullbackImageDirective,
    SubHeaderComponent,
    RequiredRolesDirective,
    ExcludeEmptyListPipe,
    FormControlValidationMsgDirective,
    ToLocalDatePipe,
    BlobToBase64Pipe,
    NotAllowedComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    FontAwesomeModule,
    InfiniteScrollModule,
    PrimngModule,
    DialogModule,
    NgxSkeletonLoaderModule,
    TranslateModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    RouterModule,
    ToastrModule

  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    InfiniteScrollModule,
    PaginationComponent,
    InformativeBlockComponent,
    FileUploadComponent,
    CalenderComponent,
    BackComponent,
    ValidationDirective,
    ValidatorsInputDirective,
    TableCaptionComponent,
    AddBtnComponent,
    SendBtnComponent,
    DropdownComponent,
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
    SelectSchoolsComponent,
    NumberToWordsPipe,
    CustomDatePipe,
    StopPropagationDirective,
    LocalizeSearchPipe,
    FileComponent,
    LanguageRestrictionDirective,
    LocalizeSearchPipe,
    RequestListComponent,
    TrauncateTextPipe,
    WorkflowComponent,
    SafePipe,
    ConfirmDialogDirective,
    StudentBadgesComponent,
    WrapFuncPipe,
    ClickOutsideDirective,
    PermissionDirective,
    RouterModule,
    TranslateModule,
    ToastrModule,
    FullbackImagePipe,
    FullbackImageDirective,
    SubHeaderComponent,
    RequiredRolesDirective,
    ExcludeEmptyListPipe,
    FormControlValidationMsgDirective,
    ToLocalDatePipe,
    BlobToBase64Pipe,
    NotAllowedComponent
  ],
  providers:[SharedService]
})
export class SharedModule { }
