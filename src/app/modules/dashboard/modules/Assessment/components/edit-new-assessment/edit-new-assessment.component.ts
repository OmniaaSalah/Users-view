import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';


import { faExclamationCircle, faCheck } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { HeaderService } from 'src/app/core/services/header/header.service';
import { AssessmentService } from '../../service/assessment.service';

@Component({
  selector: 'app-edit-new-assessment',
  templateUrl: './edit-new-assessment.component.html',
  styleUrls: ['./edit-new-assessment.component.scss']
})

export class EditNewAssessmentComponent implements OnInit {

  exclamationIcon = faExclamationCircle;
  righticon = faArrowRight;
  assesmentFormGrp: FormGroup;
  cities: string[];
  constructor(private fb: FormBuilder, private router: Router, private headerService: HeaderService, private translate: TranslateService, private assessmentservice: AssessmentService) {
    const formOptions: AbstractControlOptions = {


    };

    this.assesmentFormGrp = fb.group({

      assesmentname: ['', [Validators.required, Validators.maxLength(65)]],
      maximumdegree: ['', [Validators.required, Validators.min(0)]],
      minmumdegree: ['', [Validators.required, Validators.min(0)]],
      assessment: ['', [Validators.required]],
      deservingdegreesfrom: [''],
      deservingdegreesto: [''],
      status: ['', [Validators.required]],


    }, formOptions);
  }
  get assesmentname() {
    return this.assesmentFormGrp.controls['assesmentname'] as FormControl;
  }
  get maximumdegree() {
    return this.assesmentFormGrp.controls['maximumdegree'] as FormControl;
  }
  get minmumdegree() {
    return this.assesmentFormGrp.controls['minmumdegree'] as FormControl;
  }
  get assessment() {
    return this.assesmentFormGrp.controls['assessment'] as FormControl;
  }
  get deservingdegreesfrom() {
    return this.assesmentFormGrp.controls['deservingdegreesfrom'] as FormControl;
  }
  get deservingdegreesto() {
    return this.assesmentFormGrp.controls['deservingdegreesto'] as FormControl;
  }
  get status() {
    return this.assesmentFormGrp.controls['status'] as FormControl;
  }

  ngOnInit(): void {
    this.headerService.Header.next(
      {
        'breadCrump': [
          { label: this.translate.instant('sideBar.educationalSettings.children.Subjects Assessments'), routerLink: '/dashboard/educational-settings/assessments/assements-list' },
          { label: this.translate.instant('dashboard.Assessment.Add Assessment System') }],
        mainTitle: { main: this.translate.instant('dashboard.Assessment.Add Assessment System') }
      }
    );
    this.cities = this.assessmentservice.cities;
  }



}
