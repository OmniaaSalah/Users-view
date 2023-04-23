import { NgModule } from '@angular/core';
import { AnnualHolidayComponent } from './components/annual-holiday-list/annual-holiday-list.component';
import { EditNewAnnualHolidayComponent } from './components/edit-new-annual-holiday/edit-new-annual-holiday.component';
import { PrimngModule } from '../../../../shared/primng/shared-primng.module';
import { AnnualHolidayRoutingModule } from './annual-holiday-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HolidayModelComponent } from './components/holiday-model/holiday-model.component';



@NgModule({
  declarations: [AnnualHolidayComponent,
    EditNewAnnualHolidayComponent,
    HolidayModelComponent,


  ],
  imports: [
    PrimngModule,
    AnnualHolidayRoutingModule,
    SharedModule,
  ]
})
export class AnnualHolidayModule { }
