import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnnualHolidayComponent } from '../components/annual-holiday/annual-holiday.component';
import { EditNewAnnualHolidayComponent } from '../components/edit-new-annual-holiday/edit-new-annual-holiday.component';

const routes:Routes=[
{path:"ViewSpecific/:SID",component:AnnualHolidayComponent},
{path:"NewHoliday",component:EditNewAnnualHolidayComponent},
{path:"EditHoliday/:SID",component:EditNewAnnualHolidayComponent},

//UnComment this latter and Put NotFound Component because we need the id of school and URL is wrong
// {path:'',component:}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnnualHolidayRoutingModule { }
