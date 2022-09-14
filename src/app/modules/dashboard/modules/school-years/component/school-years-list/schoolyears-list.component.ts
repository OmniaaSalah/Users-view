import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ischoolyear, paginationState } from 'src/app/core/Models';
import { HeaderService } from 'src/app/core/services/header/header.service';
import { faEllipsisVertical} from '@fortawesome/free-solid-svg-icons';
import { SchoolYearsService } from '../../service/school-years.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-schoolyears-list',
  templateUrl: './schoolyears-list.component.html',
  styleUrls: ['./schoolyears-list.component.scss']
})
export class SchoolyearsListComponent implements OnInit {
  faEllipsisVertical=faEllipsisVertical;
  schoolyearlist:ischoolyear[]=[];
  first=0;
	rows =4;
  cities: string[];
  

  constructor(private headerService:HeaderService,private translate:TranslateService,private router:Router, private schoolyearservice:SchoolYearsService) { }

  ngOnInit(): void {
    this.headerService.Header.next(
      {
        breadCrump:[
          { label: this.translate.instant('breadcrumb.School Years List') }
        ]
      }
      );
      
      this.schoolyearlist=this.schoolyearservice.schoolyearlist;
      this.cities=this.schoolyearservice.cities;
  }

  onTableDataChange(event:paginationState) {
    this.first = event.first
		this.rows = event.rows
    
  }
 

  gotoAddSchoolYear()
  {
    this.router.navigate(['/dashboard/educational-settings/school-year/new-school-year']);
  }


}
