import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { AnnualHoliday } from 'src/app/core/models/annual-holiday';
import { TranslateService } from '@ngx-translate/core';
import { HeaderService } from 'src/app/core/services/header/header.service';
import { AnnualHolidayService } from '../../service/annual-holiday.service';
import { paginationState } from 'src/app/core/models/pagination/pagination';
@Component({
  selector: 'app-annual-holiday',
  templateUrl: './annual-holiday.component.html',
  styleUrls: ['./annual-holiday.component.scss']
})
export class AnnualHolidayComponent implements OnInit {
  faEllipsisVertical = faEllipsisVertical;
  AnnualHolidayList: AnnualHoliday[] = [];
  IDOfSpecificSchool: number = 0;
  first = 0;
  rows = 4;
  cities: string[];
  constructor(
    private headerService: HeaderService,
    private AnnualHolidayAPIservice: AnnualHolidayService, private translate: TranslateService, private router: Router, private activatedroute: ActivatedRoute, private location: Location) {


  }
  ngOnInit(): void {

    this.headerService.Header.next(
      {
        breadCrump: [
          { label: this.translate.instant('dashboard.AnnualHoliday.List Of Annual Holidays') }
        ]
      }
    );


    this.AnnualHolidayList = this.AnnualHolidayAPIservice.AnnualHolidayList;
    this.cities = this.AnnualHolidayAPIservice.cities;



  }



  onTableDataChange(event: paginationState) {
    this.first = event.first
    this.rows = event.rows

  }
  gotoEditHoliday(Holidayid: number) {
    this.router.navigate(['/dashboard/educational-settings/AnnualHoliday/EditHoliday/', Holidayid]);
  }

  gotoAddHoliday() {
    this.router.navigate(['/dashboard/educational-settings/AnnualHoliday/NewHoliday']);
  }
}
