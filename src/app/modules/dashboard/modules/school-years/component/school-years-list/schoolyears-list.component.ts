import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ISchoolYear } from 'src/app/core/Models/school-years/school-year';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { faEllipsisVertical} from '@fortawesome/free-solid-svg-icons';
import { SchoolYearsService } from '../../service/school-years.service';
import { Router } from '@angular/router';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { IHeader } from 'src/app/core/Models/header-dashboard';
@Component({
  selector: 'app-schoolyears-list',
  templateUrl: './schoolyears-list.component.html',
  styleUrls: ['./schoolyears-list.component.scss']
})
export class SchoolyearsListComponent implements OnInit {
  faEllipsisVertical=faEllipsisVertical;
  
  schoolYearList:ISchoolYear[]=[];
  first=0;
	rows =6;
  cities: string[];
  componentHeaderData: IHeader = {
    breadCrump: [
      { label: this.translate.instant('breadcrumb.School Years List'),routerLink:'/dashboard/educational-settings/school-year/school-years-list'}
    ],
    
  };

  constructor(private headerService:HeaderService,private translate:TranslateService,private router:Router, private schoolYearService:SchoolYearsService) { }

  ngOnInit(): void {
      //   this.schoolYearService.curriculumClassList.next([]);
      // localStorage.removeItem('curriculumClassList');
      // this.schoolYearService.classSubjectsList.next([]);
      // localStorage.removeItem('classSubjectsList');
    this.headerService.changeHeaderdata(this.componentHeaderData);
   
      this.schoolYearList=this.schoolYearService.schoolYearList;
     
      this.cities=this.schoolYearService.cities;
  }

  onTableDataChange(event:paginationState) {
    this.first = event.first
		this.rows = event.rows
    
  }
 




}
