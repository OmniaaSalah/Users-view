import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IAssesment } from 'src/app/core/models/iassesment';
import { HeaderService } from 'src/app/core/services/header-service/header.service';

import { faAngleLeft, faAngleRight, faEllipsisVertical, faPlus } from '@fortawesome/free-solid-svg-icons';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { AssessmentService } from '../../service/assessment.service';
import { IHeader } from 'src/app/core/Models';
@Component({
  selector: 'app-assessments-list',
  templateUrl: './assessments-list.component.html',
  styleUrls: ['./assessments-list.component.scss']
})
export class AssessmentsListComponent implements OnInit {
  faEllipsisVertical = faEllipsisVertical;
  assessmentList: IAssesment[] = [];
  first = 0;
  rows = 4;
  cities: string[];
  faAngleLeft = faAngleLeft
  faAngleRight = faAngleRight
  plusIcon = faPlus;
  componentHeaderData: IHeader = {
    'breadCrump': [
      { label: this.translate.instant('sideBar.educationalSettings.children.Subjects Assessments'),routerLink:'/dashboard/educational-settings/assessments/assements-list/',routerLinkActiveOptions:{exact: true}}],

  };
  constructor(private headerService: HeaderService,
    private assessmentService: AssessmentService, private translate: TranslateService, private router: Router) { }

  ngOnInit(): void {
    this.headerService.changeHeaderdata(this.componentHeaderData);



    this.assessmentList = this.assessmentService.assessmentList;
    this.cities = this.assessmentService.cities;

  }

  onTableDataChange(event: paginationState) {
    this.first = event.first
    this.rows = event.rows

  }


  gotoAddAssessment() {
    this.router.navigate(['/dashboard/educational-settings/assessments/new-assessment']);
  }
}
