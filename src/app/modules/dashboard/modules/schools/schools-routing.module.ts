import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AbsenceRecordsComponent } from './components/absence-records/absence-records.component';
import { SchoolDetailsComponent } from './components/school-details/school-details.component';
import { SchoolEmployeeComponent } from './components/school-employee/school-employee.component';
import { SchoolListComponent } from './components/school-list/school-list.component';


const routes: Routes = [
  {
    path: '',
    component: SchoolListComponent,
  },
  {
    path: 'school/:schoolId',
    component: SchoolDetailsComponent,
  },
  {
    path: 'school/:schoolId/employee/:employeeId',
    component: SchoolEmployeeComponent,
  },

  { path: 'school/:schoolId/class/:classId', loadChildren: () => import('./components/school-class/school-class.module').then(m => m.SchoolClassModule) },
  { path: 'school/:schoolId/track/:trackId', loadChildren: () => import('./components/school-track/school-track.module').then(m => m.SchoolTrackModule) },
  {path: 'school/:schoolId/track/:trackId/absence-records', component: AbsenceRecordsComponent}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolsRoutingModule { }
