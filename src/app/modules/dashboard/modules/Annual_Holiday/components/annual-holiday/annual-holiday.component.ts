import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faEllipsisVertical} from '@fortawesome/free-solid-svg-icons';
import { AnnualHoliday } from 'src/app/core/Models/annual-holiday';
import { TranslateService } from '@ngx-translate/core';
import { HeaderService } from 'src/app/core/services/Header/header.service';
import { AnnualHolidayService } from '../../service/annual-holiday.service';
@Component({
  selector: 'app-annual-holiday',
  templateUrl: './annual-holiday.component.html',
  styleUrls: ['./annual-holiday.component.scss']
})
export class AnnualHolidayComponent implements OnInit {
  faEllipsisVertical=faEllipsisVertical;
  AnnualHolidayList: AnnualHoliday[]=[];
  IDOfSpecificSchool:number=0;
  page: number = 1;
  tableSize: number = 7;
  
  constructor(
    private headerService:HeaderService,
    private AnnualHolidayAPIservice:AnnualHolidayService,private translate:TranslateService,private router:Router,private activatedroute:ActivatedRoute,private location:Location) { 
 

}
  ngOnInit(): void {
    
    this.headerService.Header.next(
      {
        breadCrump:[
          { label: this.translate.instant('dashboard.AnnualHoliday.List Of Annual Holidays') }
        ]
      }
      );


 this.AnnualHolidayList=this.AnnualHolidayAPIservice.AnnualHolidayList;
 
  
    
     
  }

  

   onTableDataChange(event: number) {
    this.page = event;
    
  }
  gotoEditHoliday(Holidayid:number){
    this.router.navigate(['/dashboard/educational-settings/AnnualHoliday/EditHoliday/',Holidayid]);
  }

  gotoAddHoliday()
  {
    this.router.navigate(['/dashboard/educational-settings/AnnualHoliday/NewHoliday']);
  }
}
