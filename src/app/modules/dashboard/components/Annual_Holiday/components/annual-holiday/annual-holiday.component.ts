import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faSearch,faEllipsisVertical} from '@fortawesome/free-solid-svg-icons';
import { AnnualHoliday } from 'src/app/core/Models/annual-holiday';

import { paginationState } from 'src/app/core/Models/pagination/pagination';
import { MenuItem } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { HeaderService } from 'src/app/core/services/Header/header.service';
import { AnnualHolidayService } from '../../service/annual-holiday.service';
@Component({
  selector: 'app-annual-holiday',
  templateUrl: './annual-holiday.component.html',
  styleUrls: ['./annual-holiday.component.scss']
})
export class AnnualHolidayComponent implements OnInit {
  balanceFrozen: boolean = false;
  value1: string;
  filtericon=faFilter;
  Homeicon = faHome  ;
  faEllipsisVertical=faEllipsisVertical;
  searchicon =faSearch;
  AnnualHolidayList: AnnualHoliday[]=[];
  IDOfSpecificSchool:number=0;
  page: number = 1;
  
  tableSize: number = 7;
  // items: MenuItem[];
  // home: MenuItem;

  constructor(
    private headerService:HeaderService,
    private AnnualHolidayAPIservice:AnnualHolidayService,private translate:TranslateService,private router:Router,private activatedroute:ActivatedRoute,private location:Location) { 
 

}
  ngOnInit(): void {
    
    this.headerService.Header.next(
      {'breadCrump':[
        {label: this.translate.instant('dashboard.AnnualHoliday.List Of Annual Holidays')}],
        'home':{icon: 'pi pi-home', routerLink: '/'},
        'mainTittle':""
      }
      );


 this.AnnualHolidayList=this.AnnualHolidayAPIservice.AnnualHolidayList;
 
  
    
     
  }

  

   onTableDataChange(event: number) {
    this.page = event;
    
  }
  gotoEditHoliday(Holidayid:number){
    this.router.navigate(['/dashboard/AnnualHoliday/EditHoliday/',Holidayid]);
  }

  gotoAddHoliday()
  {
    this.router.navigate(['/dashboard/AnnualHoliday/NewHoliday']);
  }
}
