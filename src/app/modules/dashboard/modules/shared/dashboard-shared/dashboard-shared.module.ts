import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterChildComponent } from '../components/register-child/register-child.component';
import { TranslateModule } from '@ngx-translate/core';
import { PrimngModule } from 'src/app/modules/primng/primng.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { SchoolsComponent } from '../components/schools/schools.component';
import { MedicalFileComponent } from '../components/register-child/medical-file/medical-file.component';
import { AttachmentsChildComponent } from '../components/register-child/attachments-child/attachments-child.component';
import { AbsenceDetailsComponent } from '../components/register-child/absence-details/absence-details.component';
import { AcceptInformationComponent } from '../components/register-child/accept-information/accept-information.component';
import { PersonalInformationComponent } from '../components/register-child/personal-information/personal-information.component';
import { SubjectsAndDegreesComponent } from '../components/register-child/subjects-and-degrees/subjects-and-degrees.component';
import { CertificateListComponent } from '../components/register-child/certificate-list/certificate-list.component';
import { SchoolRecordComponent } from '../components/register-child/school-record/school-record.component';
import { WithdrawalRequestComponent } from '../components/register-child/withdrawal-request/withdrawal-request.component';





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
    WithdrawalRequestComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    PrimngModule,
    SharedModule,
    ReactiveFormsModule,

  ],
  exports:[RegisterChildComponent,SchoolsComponent,MedicalFileComponent,AttachmentsChildComponent,AbsenceDetailsComponent]
})
export class DashboardSharedModule { }
