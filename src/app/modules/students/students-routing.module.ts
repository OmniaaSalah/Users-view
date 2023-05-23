import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteEnums } from 'src/app/shared/enums/route/route.enum';
import { WithdrawalRequestComponent } from '../shared/components/register-child/withdrawal-request/withdrawal-request.component';
import { DeletedStudentComponent } from './components/deleted-student/deleted-student.component';
import { IssuanceOfACertificateComponent } from './components/issuance-of-a-certificate/issuance-of-a-certificate.component';
import { StudentDetailsComponent } from './components/student-details/student-details.component';
import { StudentsListComponent } from './components/students-list/students-list.component';
import { TransferStudentComponent } from './components/transfer-student/transfer-student.component';
import { LayoutComponent } from 'src/app/layout/layout.component';
import { Layout } from 'src/app/layout/layout-routing.service';

const routes: Routes = [
  Layout.childRoutes(
    [
      {
        path: "", component: StudentsListComponent,
        data:{
          RouteKey: RouteEnums.Students,
          title:{ar:'قائمه الطلاب',en: 'Students List'}
        },
      },
      {
        path: "student/:id", component: StudentDetailsComponent ,
        data:{
          title:{ar:'تفاصيل الطالب',en: 'Student Details'}
        }
      },

      {
        path: "student/:id/transfer", component: TransferStudentComponent,
          data:{title:{ar:'نقل الطالب',en: 'Transfer Student'}
        }
      },
      {
        path: "student/:id/withdraw-request", component: WithdrawalRequestComponent,
          data:{title:{ar:'إرسال طلب سحب',en: 'Withdraw Request'}
        }
       },
      {
        path: "delete-student/:id", component: DeletedStudentComponent,
          data:{title:{ar:'إرسال طلب حذف ',en: 'Student Details'}
        }
       },
      {
        path: "student/:id/IssuanceOfACertificateComponent", component: IssuanceOfACertificateComponent,
          data:{title:{ar:'اصدار شهاده للطالب',en: 'Issue Student Certificate'}
        }
      }
    ])

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
