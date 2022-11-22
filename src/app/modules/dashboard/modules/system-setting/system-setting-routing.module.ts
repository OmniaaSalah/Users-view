import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GracePeriodComponent } from './components/grace-period/grace-period.component';
import { SchoolInGracePeriodComponent } from './components/school-in-grace-period/school-in-grace-period.component';
import { SystemSettingComponent } from './system-setting.component';

const routes: Routes = [
  { path: "", component: SystemSettingComponent},
  { path: "grace-period/new", component: GracePeriodComponent},
  { path: "grace-period/:id/edit", component: GracePeriodComponent},
  { path: "grace-period/:id/edit/school/:schoolId", component: SchoolInGracePeriodComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemSettingRoutingModule { }
