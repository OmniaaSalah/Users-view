import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DegreesReportsComponent } from './components/degrees-reports/degrees-reports.component';
import { ParentsReportsComponent } from './components/parents-reports/parents-reports.component';
import { SchoolsReportsComponent } from './components/schools-reports/schools-reports.component';
import { StudentsReportsComponent } from './components/students-reports/students-reports.component';
import { SubjectsReportsComponent } from './components/subjects-reports/subjects-reports/subjects-reports.component';
import { UsersReportsComponent } from './components/users-reports/users-reports/users-reports.component';
import { AttendanceReportsComponent } from './components/attendance-reports/attendance-reports/attendance-reports.component';
import { TeachersReportsComponent } from './components/teachers-reports/teachers-reports.component';

const routes: Routes = [

  {path:'', children:[
    {path: 'students-reports', component:StudentsReportsComponent},
    {path: 'degrees-reports', component:DegreesReportsComponent},
    {path: 'subjects-reports', component:SubjectsReportsComponent},
    {path: 'users-reports', component:UsersReportsComponent},
    {path: 'attendance-reports', component:AttendanceReportsComponent},
    {path: 'parents-reports', component:ParentsReportsComponent},
    {path: 'schools-reports', component:SchoolsReportsComponent},
    {path: 'teachers-reports', component:TeachersReportsComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsManagmentRoutingModule { }
