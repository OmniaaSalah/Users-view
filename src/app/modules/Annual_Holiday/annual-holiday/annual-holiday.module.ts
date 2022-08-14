import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnualHolidayComponent } from '../components/annual-holiday/annual-holiday.component';
import { EditNewAnnualHolidayComponent } from '../components/edit-new-annual-holiday/edit-new-annual-holiday.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxPaginationModule } from 'ngx-pagination';
import { PrimngModule } from '../../primng/primng.module';
import { TranslateModule } from '@ngx-translate/core';
import { AnnualHolidayRoutingModule } from './annual-holiday-routing.module';


@NgModule({
  declarations: [AnnualHolidayComponent,
    EditNewAnnualHolidayComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    NgxPaginationModule,
    PrimngModule,
    TranslateModule,
    AnnualHolidayRoutingModule
    
  ]
})
export class AnnualHolidayModule { }
