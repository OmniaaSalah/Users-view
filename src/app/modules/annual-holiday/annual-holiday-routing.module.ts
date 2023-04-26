import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteEnums } from 'src/app/shared/enums/route/route.enum';
import { AnnualHolidayComponent } from './components/annual-holiday-list/annual-holiday-list.component';
import { EditNewAnnualHolidayComponent } from './components/edit-new-annual-holiday/edit-new-annual-holiday.component';
import { LayoutComponent } from 'src/app/layout/layout.component';


const routes:Routes=[
  {
    path: '', component: LayoutComponent,
    children:[
      {path:"annual-holiday-list",component:AnnualHolidayComponent,data:{ RouteKey: RouteEnums.AnnaulHolidays}},
      {path:"new-holiday",component:EditNewAnnualHolidayComponent},
      {path:"edit-holiday/:holidayId",component:EditNewAnnualHolidayComponent},
    ]
  }

//UnComment this latter and Put NotFound Component because we need the id of school and URL is wrong
// {path:'',component:}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnnualHolidayRoutingModule { }
