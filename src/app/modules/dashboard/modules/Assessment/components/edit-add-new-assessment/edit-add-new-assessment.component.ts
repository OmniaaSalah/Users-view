import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';


import { faExclamationCircle, faCheck } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { HeaderService } from 'src/app/core/services/header/header.service';
import { AssessmentService } from '../../service/assessment.service';

@Component({
  selector: 'app-edit-add-new-assessment',
  templateUrl: './edit-add-new-assessment.component.html',
  styleUrls: ['./edit-add-new-assessment.component.scss']
})

export class EditAddNewAssessmentComponent implements OnInit {
  checkicon = faCheck;
  Exclamationicon = faExclamationCircle;
  righticon = faArrowRight;
  AssesmentFormgrp: FormGroup;
  cities: string[];
  constructor(private fb: FormBuilder, private router: Router, private headerService: HeaderService, private translate: TranslateService, private AssessmentService: AssessmentService) {
    const formOptions: AbstractControlOptions = {


    };

    this.AssesmentFormgrp = fb.group({

      AssesmentName: ['', [Validators.required, Validators.maxLength(65)]],
      MaximumDegree: ['', [Validators.required, Validators.min(0)]],
      MinmumDegree: ['', [Validators.required, Validators.min(0)]],
      Assessment: ['', [Validators.required]],
      DeservingDegreesFrom: [''],
      DeservingDegreesTo: [''],
      Status: ['', [Validators.required]],


    }, formOptions);
  }
  get AssesmentName() {
    return this.AssesmentFormgrp.controls['AssesmentName'] as FormControl;
  }
  get MaximumDegree() {
    return this.AssesmentFormgrp.controls['MaximumDegree'] as FormControl;
  }
  get MinmumDegree() {
    return this.AssesmentFormgrp.controls['MinmumDegree'] as FormControl;
  }
  get Assessment() {
    return this.AssesmentFormgrp.controls['Assessment'] as FormControl;
  }
  get DeservingDegreesFrom() {
    return this.AssesmentFormgrp.controls['DeservingDegreesFrom'] as FormControl;
  }
  get DeservingDegreesTo() {
    return this.AssesmentFormgrp.controls['DeservingDegreesTo'] as FormControl;
  }
  get Status() {
    return this.AssesmentFormgrp.controls['Status'] as FormControl;
  }

  ngOnInit(): void {
    this.headerService.Header.next(
      {
        'breadCrump': [
          { label: this.translate.instant('sideBar.educationalSettings.children.Subjects Assessments'), routerLink: '/dashboard/educational-settings/Assessments/View-Assements-List' },
          { label: this.translate.instant('dashboard.Assessment.Add Assessment System') }],
        mainTitle: { main: this.translate.instant('dashboard.Assessment.Add Assessment System') }
      }
    );
    this.cities = this.AssessmentService.cities;
  }



}
