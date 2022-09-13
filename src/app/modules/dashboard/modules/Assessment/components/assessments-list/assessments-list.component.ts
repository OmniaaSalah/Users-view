import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { iassesment } from 'src/app/core/models/iassesment';
import { HeaderService } from 'src/app/core/services/header/header.service';

import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { paginationState } from 'src/app/core/models/pagination/pagination';
import { AssessmentService } from '../../service/assessment.service';
@Component({
  selector: 'app-assessments-list',
  templateUrl: './assessments-list.component.html',
  styleUrls: ['./assessments-list.component.scss']
})
export class AssessmentsListComponent implements OnInit {
  faEllipsisVertical = faEllipsisVertical;
  assessmentlist: iassesment[] = [];
  first = 0;
  rows = 4;
  cities: string[];
  constructor(private headerService: HeaderService,
    private assessmentservice: AssessmentService, private translate: TranslateService, private router: Router) { }

  ngOnInit(): void {

    this.headerService.Header.next(
      {
        'breadCrump': [
          { label: this.translate.instant('sideBar.educationalSettings.children.Subjects Assessments') }],
      }
    );


    this.assessmentlist = this.assessmentservice.assessmentlist;
    this.cities = this.assessmentservice.cities;

  }

  onTableDataChange(event: paginationState) {
    this.first = event.first
    this.rows = event.rows

  }


  gotoAddAssessment() {
    this.router.navigate(['/dashboard/educational-settings/assessments/new-assessment']);
  }
}
