import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faArrowRight, faExclamationCircle, faCheck } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { SubjectService } from '../../service/subject.service';



@Component({
  selector: 'app-new-subject',
  templateUrl: './new-subject.component.html',
  styleUrls: ['./new-subject.component.scss']
})
export class NewSubjectComponent implements OnInit {
  cities: string[];
  checkIcon= faCheck;
  exclamationIcon = faExclamationCircle;
  rightIcon = faArrowRight;
  subjectFormGrp: FormGroup;
  isSubjectNotUnique: number = 0;

  constructor(private headerService: HeaderService, private router: Router, private fb: FormBuilder, private subjectServise: SubjectService, private translate: TranslateService) {

    this.subjectFormGrp = fb.group({

      subjectNameInArabic: ['', [Validators.required, Validators.maxLength(65)]],
      subjectNameInEnglish: ['', [Validators.required, Validators.maxLength(65)]],
      nameInResultsScreenInArabic: ['', [Validators.required, Validators.maxLength(65)]],
      nameInResultsScreenInEnglish: ['', [Validators.required, Validators.maxLength(65)]],
      subjectHours: ['', [Validators.required, Validators.min(1), Validators.min(1)]],
      numberOfSessionsPerWeek: [''],
      gpa: [''],
      evaluationSystem: ['', [Validators.required]]

    });
  }

  ngOnInit(): void {

    this.headerService.Header.next(
      {
        'breadCrump': [
          { label: this.translate.instant('dashboard.Subjects.List Of Subjects'), routerLink: '/dashboard/educational-settings/subject/subjects-list' },
          { label: this.translate.instant('dashboard.Subjects.Add New Subject') ,routerLinkActiveOptions:{exact: true}}],
        'mainTitle': { main: this.translate.instant('dashboard.Subjects.Add New Subject') }
      }
    );
    this.cities = this.subjectServise.cities;
  }
  checkUniqueSubjectNameInArabic(e)
  {
    this.isSubjectNotUnique=0;
    
     this.subjectServise.subjectsList.forEach(element => {
      
      if(element.subjectNameInArabic==e)
      {
        this.isSubjectNotUnique=1;
        return;
      }
      
     });
     this.isSubjectNotUnique=0;
  }

  checkUniqueNameInResultsScreenInArabic(e)
  {
    this.isSubjectNotUnique=0;
    
     this.subjectServise.subjectsList.forEach(element => {
      
      if(element.subjectNameInEnglish==e)
      {
        this.isSubjectNotUnique=1;
        return;
      }
      
     });
     this.isSubjectNotUnique=0;

  }

  checkUniqueNameInResultsScreenInEnglish(e)
  {
    this.isSubjectNotUnique=0;
    
     this.subjectServise.subjectsList.forEach(element => {
      
      if(element.subjectNameInEnglish==e)
      {
        this.isSubjectNotUnique=1;
        return;
      }
      
     });
     this.isSubjectNotUnique=0;

  }
  checkUniqueSubjectNameInEnglish(e)
  {
    this.isSubjectNotUnique=0;
    
     this.subjectServise.subjectsList.forEach(element => {
      
      if(element.subjectNameInEnglish==e)
      {
        this.isSubjectNotUnique=1;
        return;
      }
      
     });
     this.isSubjectNotUnique=0;

  }

  get subjectNameInArabic() {
    return this.subjectFormGrp.controls['subjectNameInArabic'] as FormControl;
  }

  get subjectNameInEnglish() {
    return this.subjectFormGrp.controls['subjectNameInEnglish'] as FormControl;
  }

  get nameInResultsScreenInArabic() {
    return this.subjectFormGrp.controls['nameInResultsScreenInArabic'] as FormControl;
  }

  get nameInResultsScreenInEnglish() {
    return this.subjectFormGrp.controls['nameInResultsScreenInEnglish'] as FormControl;
  }

  get subjectHours() {
    return this.subjectFormGrp.controls['subjectHours'] as FormControl;
  }
  get numberOfSessionsPerWeek() {
    return this.subjectFormGrp.controls['numberOfSessionsPerWeek'] as FormControl;
  }

  get gpa() {
    return this.subjectFormGrp.controls['gpa'] as FormControl;
  }
  get evaluationSystem() {
    return this.subjectFormGrp.controls['evaluationSystem'] as FormControl;
  }



}
