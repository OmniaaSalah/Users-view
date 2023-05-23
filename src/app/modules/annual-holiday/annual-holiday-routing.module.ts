import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteEnums } from 'src/app/shared/enums/route/route.enum';
import { AnnualHolidayComponent } from './components/annual-holiday-list/annual-holiday-list.component';
import { EditNewAnnualHolidayComponent } from './components/edit-new-annual-holiday/edit-new-annual-holiday.component';
import { LayoutComponent } from 'src/app/layout/layout.component';
import { Layout } from 'src/app/layout/layout-routing.service';


const routes:Routes=[
  Layout.childRoutes([
    {
      path:"annual-holiday-list",component:AnnualHolidayComponent,
      data:{
        RouteKey: RouteEnums.AnnaulHolidays,
        title:{ar:'الاجازات السنويه',en: 'Annual Holiday'}
      }
    },
    {
      path:"new-holiday",component:EditNewAnnualHolidayComponent,
      data:{
        title:{ar:'اضافه اجازه',en: 'Create Annual Holiday'}
      }
    },
    {
      path:"edit-holiday/:holidayId",component:EditNewAnnualHolidayComponent,
      data:{
        title:{ar:'تعديل اجازة',en: 'Update Annual Holiday'}
      }
    },
  ])


//UnComment this latter and Put NotFound Component because we need the id of school and URL is wrong
// {path:'',component:}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnnualHolidayRoutingModule { }
