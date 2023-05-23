import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteEnums } from 'src/app/shared/enums/route/route.enum';
import { GracePeriodComponent } from './components/grace-period/grace-period.component';
import { SchoolInGracePeriodComponent } from './components/school-in-grace-period/school-in-grace-period.component';
import { SystemSettingComponent } from './system-setting.component';
import { LayoutComponent } from 'src/app/layout/layout.component';
import { Layout } from 'src/app/layout/layout-routing.service';

const routes: Routes = [

  Layout.childRoutes([
    { path: "", component: SystemSettingComponent,data:{ RouteKey: RouteEnums.Settings}},
    { path: "grace-period/new", component: GracePeriodComponent},
    { path: "grace-period/:id", component: GracePeriodComponent},
    { path: "grace-period/:id/school/:schoolId", component: SchoolInGracePeriodComponent},
  ])


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemSettingRoutingModule { }
