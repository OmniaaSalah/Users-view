import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterChildComponent } from './components/register-child/register-child.component';
import { TranslateModule } from '@ngx-translate/core';
import { PrimngModule } from 'src/app/modules/primng/primng.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { AbsenceDetailsComponent } from './components/register-child/absence-details/absence-details.component';
import { AcceptInformationComponent } from './components/register-child/accept-information/accept-information.component';
import { AttachmentsChildComponent } from './components/register-child/attachments-child/attachments-child.component';
import { CertificateListComponent } from './components/register-child/certificate-list/certificate-list.component';
import { MedicalFileComponent } from './components/register-child/medical-file/medical-file.component';
import { PersonalInformationComponent } from './components/register-child/personal-information/personal-information.component';
import { SchoolRecordComponent } from './components/register-child/school-record/school-record.component';
import { SubjectsAndDegreesComponent } from './components/register-child/subjects-and-degrees/subjects-and-degrees.component';
import { WithdrawalRequestComponent } from './components/register-child/withdrawal-request/withdrawal-request.component';
import { SchoolsComponent } from './components/schools/schools.component';
import { LayoutModule } from 'src/app/layout/layout.module';
import { IdentityInfoComponent } from './components/register-child/identity-info/identity-info.component';
import { PaymentsComponent } from './components/register-child/payments/payments.component';
import { StudentProhibitedStatusComponent } from './components/register-child/student-prohibited-status/student-prohibited-status.component';






@NgModule({
  declarations: [
    RegisterChildComponent,
    SchoolsComponent,
    MedicalFileComponent,
    AttachmentsChildComponent,
    AbsenceDetailsComponent,
    AcceptInformationComponent,
    PersonalInformationComponent,
    SubjectsAndDegreesComponent,
    CertificateListComponent,
    SchoolRecordComponent,
    WithdrawalRequestComponent,
    IdentityInfoComponent,
    PaymentsComponent,
    StudentProhibitedStatusComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    PrimngModule,
    SharedModule,
    ReactiveFormsModule,
    LayoutModule
  ],
  exports:[RegisterChildComponent,SchoolsComponent,MedicalFileComponent,AttachmentsChildComponent,AbsenceDetailsComponent]
})
export class DashboardSharedModule { }
