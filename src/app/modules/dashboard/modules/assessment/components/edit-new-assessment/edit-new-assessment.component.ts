import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators,FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { KeyValue } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { faArrowRight, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faExclamationCircle, faCheck } from '@fortawesome/free-solid-svg-icons';
import { timer } from 'rxjs';

import { IRate, IRateScores } from './edit-new-assessment.model';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { AssessmentService } from '../../service/assessment.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { assesmentDegreesValidator } from './assement-degrees-validators';

@Component({
  selector: 'app-edit-new-assessment',
  templateUrl: './edit-new-assessment.component.html',
  styleUrls: ['./edit-new-assessment.component.scss']
})

export class EditNewAssessmentComponent implements OnInit {
  rateArray={};
  valueFrom;
  valueTo;
  checkIcon = faCheck;
  assessmtId='';
  faPlus = faPlus;
  exclamationIcon = faExclamationCircle;
  isBtnLoading: boolean=false;
  righticon = faArrowRight;
  assesmentFormGrp: FormGroup;
  statusList: Array<KeyValue<string, boolean>> = [
    {
      key: this.getTranslateValue('dashboard.Assessment.successful'),
      value: true
    },
    {
      key: this.getTranslateValue('dashboard.Assessment.Try again'),
      value: false
    }
  ];
  private readonly assementsListUrl = '/dashboard/educational-settings/assessments/assements-list';

  get rateScores(): FormArray {
    return this.assesmentFormGrp.get('rateScores') as FormArray
  }

  get arabicAssesmentName() {
    return this.assesmentFormGrp.controls['arabicName'] as FormControl;
  }
  
  get englishAssesmentName() {
    return this.assesmentFormGrp.controls['englishName'] as FormControl;
  }
  get maximumDegree() {
    return this.assesmentFormGrp.controls['max'] as FormControl;
  }
  get minmumDegree() {
    return this.assesmentFormGrp.controls['min'] as FormControl;
  }
  get assesmentStatus() {
    return this.assesmentFormGrp.controls['assesmentStatus'] as FormControl;
  }

	// get assesmentForm () 
  // { return this.assesmentFormGrp.controls}


  get canAddRate(): boolean {
    return this.assesmentFormGrp.get('rateScores').valid;
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private headerService: HeaderService,
    private translate: TranslateService,
    private assessmentService: AssessmentService,
    private toastService: ToastService
  ) {
   
  }


  ngOnInit(): void {
   
   this.assessmtId=this.activatedRoute.snapshot.paramMap.get('id');
   if (this.assessmtId) {
    this.getRate();
   }
   this.setBreadCrump();
   this.initFormModels();
  }

  save(): void {
    this.isBtnLoading = true;
    if (this.assesmentFormGrp.valid) {
      const formValue = this.assesmentFormGrp.value;
      const data: IRate = {
        isActive:formValue.assesmentStatus,
        max: formValue.max,
        min: formValue.min,
        name: {
          ar: formValue.arabicName,
          en: formValue.englishName
        },
        rateScores: (formValue.rateScores).map(item => ({...item, isSuccess: item.isSuccess.value}))
      };
      if (this.assessmtId) {
        this.assessmentService.updateRate({...data, id: Number(this.assessmtId)}).subscribe(() => {
          this.isBtnLoading =false;
          this.assesmentFormGrp.reset();
          this.toastService.success(this.getTranslateValue('updatedSuccessfully'));
          this.router.navigateByUrl(this.assementsListUrl);
        },(err)=>{ this.isBtnLoading =false;})
      } else {
        this.assessmentService.addRate(data).subscribe(() => {
          this.isBtnLoading =false;
          this.assesmentFormGrp.reset();
          this.toastService.success(this.getTranslateValue('savedSuccessfully'));
          this.router.navigateByUrl(this.assementsListUrl);
        },(err)=>{ this.isBtnLoading =false;});
      }
    }
  }

  addRateScores(): void {
    if (this.canAddRate) {
      this.rateScores.push(this.newRateScores());
    } else {
      this.toastService.warning(
        this.getTranslateValue('pleaseFillTheAboveRate'),
        this.getTranslateValue('warning'),
        {timeOut: 3000}
      );
    }
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
      arabicName: ['', [Validators.required, Validators.maxLength(65)]],
      englishName: ['', [Validators.required, Validators.maxLength(65)]],
      max: ['', [Validators.required, Validators.min(0)]],
      min: ['', [Validators.required, Validators.min(0)]],
      assesmentStatus: [false],
      rateScores: this.fb.array([])
    }, { validators: assesmentDegreesValidator });
    // For add the first row
    if (!this.assessmtId) {
      this.addRateScores();
    }
  }

  private setBreadCrump(): void {
    this.headerService.Header.next(
      {
        'breadCrump': [
          { label: this.translate.instant('sideBar.educationalSettings.children.Subjects Assessments'),routerLink: this.assementsListUrl,routerLinkActiveOptions:{exact: true} },
          { 
            label: (this.assessmtId==null||this.assessmtId=='')?  this.translate.instant('dashboard.Assessment.Add Assessment System'):this.translate.instant('dashboard.Assessment.Edit Assessment System'),
            routerLink: (this.assessmtId==null||this.assessmtId=='')? '/dashboard/educational-settings/assessments/new-assessment':'/dashboard/educational-settings/assessments/edit-assessment/'+this.assessmtId
          }],
          'mainTitle':{main:(this.assessmtId==null||this.assessmtId=='')? this.translate.instant('dashboard.Assessment.Add Assessment System'):this.translate.instant('dashboard.Assessment.Edit Assessment System')}
      }
    );
  }

  private getRate(): void {
    this.assessmentService.getRateById(Number(this.assessmtId)).subscribe((res: IRate) => {
      this.patchFormValue(res);
    });
  }

  private patchFormValue(data: IRate): void {
    this.assesmentFormGrp.patchValue({
      arabicName: data.name.ar,
      englishName: data.name.en,
      max: data.max,
      min: data.min,
      assesmentStatus: data.isActive
    });
    if (data.rateScores.length > 0) {
      data.rateScores.forEach(item => {
        this.rateScores.push(this.updateRateScores(item));
      });
    }
  }

  private updateRateScores(data: IRateScores): FormGroup {
    return this.fb.group({
      code: data.code,
      from: data.from,
      to: data.to,
      isSuccess: data.isSuccess ? this.statusList[0] : this.statusList[1],
      id: data.id
    });
  }

checkRating(i)
 {
  
  var rateScoreGroup=this.rateScores.controls[i] as FormGroup


  var fromControl=rateScoreGroup.controls['from'];
  var toControl=rateScoreGroup.controls['to'];
  

  if(Number(fromControl.value)<Number(toControl.value))
   {
      this.rateArray[i]=true
    
   }
   else
   {
    this.rateArray[i]=false

   }
     

 
 }
}
