import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AbsenceRecordsComponent } from './components/absence-records/absence-records.component';
import { SchoolDetailsComponent } from './components/school-details/school-details.component';
import { SchoolListComponent } from './components/school-list/school-list.component';
import { TransferGroupComponent } from './components/transfer-group/transfer-group.component';


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
    path: 'transfer-students',
    component: TransferGroupComponent,
  },

  { path: 'school/:schoolId/grade/:gradeId', loadChildren: () => import('./components/school-class/school-class.module').then(m => m.SchoolClassModule) },
  { path: 'school/:schoolId/division/:divisionId', loadChildren: () => import('./components/school-track/school-track.module').then(m => m.SchoolTrackModule) },
  {path: 'school/:schoolId/division/:divisionId/absence-records', component: AbsenceRecordsComponent}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolsRoutingModule { }
