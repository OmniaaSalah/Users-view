import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { iannualholiday } from 'src/app/core/Models/iannual-holiday';
import { TranslateService } from '@ngx-translate/core';
import { HeaderService } from 'src/app/core/services/header/header.service';
import { AnnualHolidayService } from '../../service/annual-holiday.service';
import { paginationState } from 'src/app/core/models/pagination/pagination';
@Component({
  selector: 'app-annual-holiday',
  templateUrl: './annual-holiday-list.component.html',
  styleUrls: ['./annual-holiday-list.component.scss']
})
export class AnnualHolidayComponent implements OnInit {
  faEllipsisVertical = faEllipsisVertical;
  annualholidaylist: iannualholiday[] = [];
  first = 0;
  rows = 4;
  cities: string[];
  constructor(
    private headerservice: HeaderService,
    private annualholidayservice: AnnualHolidayService, private translate: TranslateService, private router: Router ) {


  }
  ngOnInit(): void {

    this.headerservice.Header.next(
      {
        breadCrump: [
          { label: this.translate.instant('dashboard.AnnualHoliday.List Of Annual Holidays') }
        ]
      }
    );


    this.annualholidaylist = this.annualholidayservice.annualholidaylist;
    this.cities = this.annualholidayservice.cities;



  }



  onTableDataChange(event: paginationState) {
    this.first = event.first
    this.rows = event.rows

  }
  

  gotoAddHoliday() {
    this.router.navigate(['/dashboard/educational-settings/annual-holiday/new-holiday']);
  }
}
