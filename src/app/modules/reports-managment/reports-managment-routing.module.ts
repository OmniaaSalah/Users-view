import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DegreesReportsComponent } from './components/degrees-reports/degrees-reports.component';
import { ParentsReportsComponent } from './components/parents-reports/parents-reports.component';
import { SchoolsReportsComponent } from './components/schools-reports/schools-reports.component';
import { StudentsReportsComponent } from './components/students-reports/students-reports.component';
import { SubjectsReportsComponent } from './components/subjects-reports/subjects-reports.component';
import { UsersReportsComponent } from './components/users-reports/users-reports.component';
import { AttendanceReportsComponent } from './components/attendance-reports/attendance-reports.component';
import { TeachersReportsComponent } from './components/teachers-reports/teachers-reports.component';
import { RouteEnums } from 'src/app/shared/enums/route/route.enum';
import { LayoutComponent } from 'src/app/layout/layout.component';
import { TransferStudentComponent } from '../students/components/transfer-student/transfer-student.component';
import { TransferedStudentsReportsComponent } from './components/transfered-students-reports/transfered-students-reports.component';

const routes: Routes = [

  {
    path: '', component: LayoutComponent,
    children:[
      {path:'', children:[
        {path: 'students-reports', component:StudentsReportsComponent, data:{ RouteKey: RouteEnums.R_Students}},
        {path: 'degrees-reports', component:DegreesReportsComponent, data:{ RouteKey: RouteEnums.R_Degrees}},
        {path: 'subjects-reports', component:SubjectsReportsComponent, data:{ RouteKey: RouteEnums.R_Subjects}},
        {path: 'users-reports', component:UsersReportsComponent, data:{ RouteKey: RouteEnums.R_Employees}},
        {path: 'attendance-reports', component:AttendanceReportsComponent, data:{ RouteKey: RouteEnums.R_AbsenceRecord}},
        {path: 'parents-reports', component:ParentsReportsComponent, data:{ RouteKey: RouteEnums.R_Guardians}},
        {path: 'schools-reports', component:SchoolsReportsComponent, data:{ RouteKey: RouteEnums.R_Schools}},
        {path: 'teachers-reports', component:TeachersReportsComponent, data:{ RouteKey: RouteEnums.R_Teachers}},
        {path: 'transfered-students-reports', component:TransferedStudentsReportsComponent, data:{ RouteKey: RouteEnums.R_TransferedStudents}}
      ]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsManagmentRoutingModule { }
