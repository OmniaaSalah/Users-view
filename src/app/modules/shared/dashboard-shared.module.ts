import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterChildComponent } from './components/register-child/register-child.component';
import { PrimngModule } from 'src/app/primng/primeNg.module';
import { AbsenceDetailsComponent } from './components/register-child/absence-details/absence-details.component';
import { AcceptInformationComponent } from './components/register-child/accept-information/accept-information.component';
import { AttachmentsChildComponent } from './components/register-child/attachments-child/attachments-child.component';
import { CertificateListComponent } from './components/register-child/certificate-list/certificate-list.component';
import { MedicalFileComponent } from './components/register-child/medical-file/medical-file.component';
import { PersonalInformationComponent } from './components/register-child/personal-information/personal-information.component';
import { SchoolRecordComponent } from './components/register-child/school-record/school-record.component';
import { SubjectsAndDegreesComponent } from './components/register-child/subjects-and-degrees/subjects-and-degrees.component';
import { WithdrawalRequestComponent } from './components/register-child/withdrawal-request/withdrawal-request.component';
import { IdentityInfoComponent } from './components/register-child/identity-info/identity-info.component';
import { PaymentsComponent } from './components/register-child/payments/payments.component';
import { StudentProhibitedStatusComponent } from './components/register-child/student-prohibited-status/student-prohibited-status.component';
import { StudentOperationsDropdownComponent } from './components/register-child/student-operations-dropdown/student-operations-dropdown.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditHistoryComponent } from './components/register-child/edit-history/edit-history.component';






@NgModule({
  declarations: [
    RegisterChildComponent,
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
    StudentProhibitedStatusComponent,
    StudentOperationsDropdownComponent,
    EditHistoryComponent
  ],
  imports: [
    CommonModule,
    PrimngModule,
    SharedModule,
  ],
  exports:[RegisterChildComponent, MedicalFileComponent,AttachmentsChildComponent,AbsenceDetailsComponent]
})
export class DashboardSharedModule { }
