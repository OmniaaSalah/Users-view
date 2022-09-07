import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Assesment } from 'src/app/core/Models/assesment';
import { HeaderService } from 'src/app/core/services/Header/header.service';
import { AssessmentService } from '../../service/assessment.service';
import { faEllipsisVertical} from '@fortawesome/free-solid-svg-icons';
import { paginationState } from 'src/app/core/Models/pagination/pagination';
@Component({
  selector: 'app-view-assessments-list',
  templateUrl: './view-assessments-list.component.html',
  styleUrls: ['./view-assessments-list.component.scss']
})
export class ViewAssessmentsListComponent implements OnInit {
  faEllipsisVertical=faEllipsisVertical;
  AssessmentList: Assesment[]=[];
  IDOfSpecificSchool:number=0;
  first=0;
	rows =4;
  cities: string[];
  constructor( private headerService:HeaderService,
    private Assessmentservice:AssessmentService,private translate:TranslateService,private router:Router) { }

  ngOnInit(): void {

    this.headerService.Header.next(
      {'breadCrump':[
        {label: this.translate.instant('sideBar.educationalSettings.children.Subjects Assessments')}],
      }
      );


 this.AssessmentList=this.Assessmentservice.AssessmentList;
 this.cities=this.Assessmentservice.cities;
 
  }

  onTableDataChange(event:paginationState) {
    this.first = event.first
		this.rows = event.rows
    
  }
  

  gotoAddAssessment()
  {
    this.router.navigate(['/dashboard/educational-settings/Assessments/New-Assessment']);
  }
}
