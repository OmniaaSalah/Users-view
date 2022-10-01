import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { IAnnualHoliday } from 'src/app/core/Models/iannual-holiday';
import { TranslateService } from '@ngx-translate/core';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { AnnualHolidayService } from '../../service/annual-holiday.service';
import { paginationState } from 'src/app/core/models/pagination/pagination';
import { MenuItem } from 'src/app/core/models/dropdown/menu-item';


@Component({
  selector: 'app-annual-holiday',
  templateUrl: './annual-holiday-list.component.html',
  styleUrls: ['./annual-holiday-list.component.scss']
})
export class AnnualHolidayComponent implements OnInit {
  faEllipsisVertical = faEllipsisVertical;
  annualHolidayList: IAnnualHoliday[] = [];
  urlParameter:number=0;
  first = 0;
  rows = 4;
  cities: string[];
  
	holidaysItems: MenuItem[]=[
		{label: this.translate.instant('shared.edit'), icon:'assets/images/dropdown/pen.svg',routerLink:"/dashboard/educational-settings/annual-holiday/edit-holiday/{{e.id}}"},
		
	];
  constructor(
    private headerService: HeaderService,
    private annualHolidayService: AnnualHolidayService, private translate: TranslateService, private router: Router ,private route: ActivatedRoute) {


  }
  ngOnInit(): void {
    this.annualHolidayService.getAllHolidays().subscribe((res)=>{console.log(res.data);this.annualHolidayList=res.data});
    this.route.paramMap.subscribe(param => {
      this.urlParameter = Number(param.get('schoolId'));
    });

    this.headerService.Header.next(
      {
        breadCrump: [
          { label: this.translate.instant('dashboard.AnnualHoliday.List Of Annual Holidays') ,routerLink:'/dashboard/educational-settings/annual-holiday/annual-holiday-list/:schoolId'}
        ]
      }
    );


    // this.annualHolidayList = this.annualHolidayService.annualHolidayList;
    this.cities = this.annualHolidayService.cities;



  }



  onTableDataChange(event: paginationState) {
    this.first = event.first
    this.rows = event.rows

  }
  

  gotoAddHoliday() {
    this.router.navigate(['/dashboard/educational-settings/annual-holiday/new-holiday']);
  }
}
