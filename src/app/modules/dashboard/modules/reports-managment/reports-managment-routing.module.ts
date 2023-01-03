import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DegreesReportsComponent } from './components/degrees-reports/degrees-reports.component';
import { ParentsReportsComponent } from './components/parents-reports/parents-reports.component';
import { SchoolsReportsComponent } from './components/schools-reports/schools-reports.component';
import { StudentsReportsComponent } from './components/students-reports/students-reports.component';
import { TeachersReportsComponent } from './components/teachers-reports/teachers-reports.component';

const routes: Routes = [

  {path:'', children:[
    {path: 'students-reports', component:StudentsReportsComponent},
    {path: 'degrees-reports', component:DegreesReportsComponent},
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
