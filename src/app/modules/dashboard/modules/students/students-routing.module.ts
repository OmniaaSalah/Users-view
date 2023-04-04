import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteEnums } from 'src/app/shared/enums/route/route.enum';
import { WithdrawalRequestComponent } from '../shared/components/register-child/withdrawal-request/withdrawal-request.component';
import { DeletedStudentComponent } from './components/deleted-student/deleted-student.component';
import { IssuanceOfACertificateComponent } from './components/issuance-of-a-certificate/issuance-of-a-certificate.component';
import { StudentDetailsComponent } from './components/student-details/student-details.component';
import { StudentsListComponent } from './components/students-list/students-list.component';
import { TransferStudentComponent } from './components/transfer-student/transfer-student.component';

const routes: Routes = [
  { path: "", component: StudentsListComponent, data:{ RouteKey: RouteEnums.Students}},
  { path: "student/:id", component: StudentDetailsComponent },

  { path: "student/:id/transfer", component: TransferStudentComponent},
  { path: "student/:id/withdraw-request", component: WithdrawalRequestComponent },
  { path: "delete-student/:id", component: DeletedStudentComponent },
  { path: "student/:id/IssuanceOfACertificateComponent", component: IssuanceOfACertificateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
