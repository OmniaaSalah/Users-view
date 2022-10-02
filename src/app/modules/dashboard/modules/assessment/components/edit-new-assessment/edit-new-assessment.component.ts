import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators,FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { faArrowRight, faPlus } from '@fortawesome/free-solid-svg-icons';


import { faExclamationCircle, faCheck } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { AssessmentService } from '../../service/assessment.service';

export interface Subject{
  Assessment:string
  deservingDegreesFrom:string
  deservingDegreesTo:string
  chronicDiseases:string
  status:string
}

@Component({
  selector: 'app-edit-new-assessment',
  templateUrl: './edit-new-assessment.component.html',
  styleUrls: ['./edit-new-assessment.component.scss']
})

export class EditNewAssessmentComponent implements OnInit {
  checkIcon= faCheck;
  faPlus= faPlus;
  subjects: Subject[]
  exclamationIcon = faExclamationCircle;
  righticon = faArrowRight;
  assesmentFormGrp: FormGroup;
  cities: string[];

  get classSubjects(){ return this.assesmentFormGrp.controls['subjects'] as FormArray }
  constructor(private fb: FormBuilder, private router: Router, private headerService: HeaderService, private translate: TranslateService, private assessmentService: AssessmentService) {
    const formOptions: AbstractControlOptions = {


    };

    this.assesmentFormGrp = fb.group({

      assesmentName: ['', [Validators.required, Validators.maxLength(65)]],
      maximumDegree: ['', [Validators.required, Validators.min(0)]],
      minmumDegree: ['', [Validators.required, Validators.min(0)]],
      assessment: ['', [Validators.required]],
      deservingDegreesFrom: [''],
      deservingDegreesTo: [''],
      status: ['', [Validators.required]],
      subjects:this.fb.array([])

    }, formOptions);
  }
  get assesmentName() {
    return this.assesmentFormGrp.controls['assesmentName'] as FormControl;
  }
  get maximumDegree() {
    return this.assesmentFormGrp.controls['maximumDegree'] as FormControl;
  }
  get minmumDegree() {
    return this.assesmentFormGrp.controls['minmumDegree'] as FormControl;
  }
  get assessment() {
    return this.assesmentFormGrp.controls['assessment'] as FormControl;
  }
  get deservingDegreesFrom() {
    return this.assesmentFormGrp.controls['deservingDegreesFrom'] as FormControl;
  }
  get deservingDegreesTo() {
    return this.assesmentFormGrp.controls['deservingDegreesTo'] as FormControl;
  }
  get status() {
    return this.assesmentFormGrp.controls['status'] as FormControl;
  }



  ngOnInit(): void {
    this.headerService.Header.next(
      {
        'breadCrump': [
          { label: this.translate.instant('sideBar.educationalSettings.children.Subjects Assessments'),routerLink: '/dashboard/educational-settings/assessments/assements-list',routerLinkActiveOptions:{exact: true} },
          { label: this.translate.instant('dashboard.Assessment.Add Assessment System'),routerLink:'/dashboard/educational-settings/assessments/new-assessment' }],
      }
    );

    this.cities = this.assessmentService.cities;
  }
  fillSubjects(){
    this.subjects.forEach(subject =>{
      this.classSubjects.push(this.fb.group({
        Assessment:[subject.Assessment],
        deservingDegreesFrom:[subject.deservingDegreesFrom],
        deservingDegreesTo:[subject.deservingDegreesTo],
        chronicDiseases:[subject.chronicDiseases],
        status:[subject.status]
        })
      )

    })
  }
  newSubjectGroup(){
    return this.fb.group({
      Assessment:[''],
      deservingDegreesFrom:[''],
      deservingDegreesTo:[''],
      chronicDiseases:[''],
      status:['']
    })
  }
  addSubject(){
    this.classSubjects.push(this.newSubjectGroup())
  }


}
