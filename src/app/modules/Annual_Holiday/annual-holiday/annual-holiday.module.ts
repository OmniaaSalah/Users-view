import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AnnualHolidayComponent } from '../components/annual-holiday/annual-holiday.component';
import { AuthenticationMainComponent } from '../../authentication/components/authentication-main/authentication-main.component';
import { EditNewAnnualHolidayComponent } from '../components/edit-new-annual-holiday/edit-new-annual-holiday.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxPaginationModule } from 'ngx-pagination';

const routes:Routes=[
  {path:"ViewSpecific/:SID",component:AnnualHolidayComponent},
{path:"NewHoliday",component:EditNewAnnualHolidayComponent},
{path:"EditHoliday/:SID",component:EditNewAnnualHolidayComponent},

//UnComment this latter and Put NotFound Component because we need the id of school and URL is wrong
// {path:'',component:}
]

@NgModule({
  declarations: [AnnualHolidayComponent,
    EditNewAnnualHolidayComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    NgxPaginationModule,
  ]
})
export class AnnualHolidayModule { }
