import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { paginationState } from 'src/app/core/Models/pagination/pagination';
import { HeaderService } from 'src/app/core/services/Header/header.service';
import { faEllipsisVertical} from '@fortawesome/free-solid-svg-icons';
import { Schoolyear } from 'src/app/core/Models/schoolyear';
import { SchoolYearService } from '../../service/school-years.service';

@Component({
  selector: 'app-view-school-years-list',
  templateUrl: './view-school-years-list.component.html',
  styleUrls: ['./view-school-years-list.component.scss']
})
export class ViewSchoolYearsListComponent implements OnInit {
  faEllipsisVertical=faEllipsisVertical;
  SchoolYearList:Schoolyear[]=[];
  first=0;
	rows =4;
  cities: string[];
  constructor(private headerService:HeaderService,private translate:TranslateService,private router:Router, private schoolyearservice:SchoolYearService) { }

  ngOnInit(): void {

    this.headerService.Header.next(
      {
        breadCrump:[
          { label: this.translate.instant('breadcrumb.School Years List') }
        ]
      }
      );

      this.SchoolYearList=this.schoolyearservice.SchoolYearList;
      this.cities=this.schoolyearservice.cities;
  }

  onTableDataChange(event:paginationState) {
    this.first = event.first
		this.rows = event.rows
    
  }
 

  gotoAddSchoolYear()
  {
    this.router.navigate(['/dashboard/educational-settings/SchoolYear/New-SchoolYear']);
  }

}
