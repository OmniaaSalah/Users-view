import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators,FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { KeyValue } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { faArrowRight, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faExclamationCircle, faCheck } from '@fortawesome/free-solid-svg-icons';

import { IRate } from './edit-new-assessment.model';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { AssessmentService } from '../../service/assessment.service';

@Component({
  selector: 'app-edit-new-assessment',
  templateUrl: './edit-new-assessment.component.html',
  styleUrls: ['./edit-new-assessment.component.scss']
})

export class EditNewAssessmentComponent implements OnInit {
  checkIcon = faCheck;
  faPlus = faPlus;
  exclamationIcon = faExclamationCircle;
  righticon = faArrowRight;
  assesmentFormGrp: FormGroup;
  statusList: Array<KeyValue<string, boolean>> = [
    {
      key: this.getTranslateValue('dashboard.Assessment.successful'),
      value: true
    },
    {
      key: this.getTranslateValue('dashboard.Assessment.unSuccessful'),
      value: false
    }
  ];

  get rateScores(): FormArray { 
    return this.assesmentFormGrp.get('rateScores') as FormArray 
  }

  get assesmentName() {
    return this.assesmentFormGrp.controls['name'] as FormControl;
  }
  get maximumDegree() {
    return this.assesmentFormGrp.controls['max'] as FormControl;
  }
  get minmumDegree() {
    return this.assesmentFormGrp.controls['min'] as FormControl;
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private headerService: HeaderService,
    private translate: TranslateService,
    private assessmentService: AssessmentService
  ) {
    this.initFormModels();
  }

  get assessmtId() {
    return this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
   this.setBreadCrump();
   if (this.assessmtId) {
    this.getRate();
   }
  }

  save(): void {
    if (this.assesmentFormGrp.valid) {
      const formValue = this.assesmentFormGrp.value;
      const data: IRate = {
        max: formValue.max,
        min: formValue.min,
        name: {
          ar: formValue.name,
          en: formValue.name
        },
        rateScores: (formValue.rateScores).map(item => ({...item, isSuccess: item.isSuccess.value}))
      };
      this.assessmentService.addRate(data).subscribe(() => {
        this.assesmentFormGrp.reset();
      });
    }
  }

  addRateScores(): void {
    this.rateScores.push(this.newRateScores());
  }

  private newRateScores(): FormGroup {
    return this.fb.group({
      code: ['', [Validators.required]],
      from: ['', [Validators.required, Validators.min(0)]],
      to: ['', [Validators.required, Validators.min(0)]],
      isSuccess: ['', Validators.required]
    });
  }

  private getTranslateValue(key: string): string {
    return this.translate.instant(key);
  }

  private initFormModels(): void {
    this.assesmentFormGrp = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(65)]],
      max: ['', [Validators.required, Validators.min(0)]],
      min: ['', [Validators.required, Validators.min(0)]],
      rateScores: this.fb.array([])
    });
    // For add the first row
    this.addRateScores();
  }

  private setBreadCrump(): void {
    this.headerService.Header.next(
      {
        'breadCrump': [
          { label: this.translate.instant('sideBar.educationalSettings.children.Subjects Assessments'),routerLink: '/dashboard/educational-settings/assessments/assements-list',routerLinkActiveOptions:{exact: true} },
          { label: this.translate.instant('dashboard.Assessment.Add Assessment System'),routerLink:'/dashboard/educational-settings/assessments/new-assessment' }],
      }
    );
  }

  private getRate(): void {
    this.assessmentService.getRateById(+this.assessmtId).subscribe(res => {
      console.log('res', res);
    });
  }
}
