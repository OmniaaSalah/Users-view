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
 
  exclamationIcon = faExclamationCircle;
  rightIcon = faArrowRight;
  subjectFormGrp: FormGroup;
  isSubjectNotUnique: number = 0;

  constructor(private headerService: HeaderService, private router: Router, private fb: FormBuilder, private subjectServise: SubjectService, private translate: TranslateService) {

    this.subjectFormGrp = fb.group({

      subjectnameinarabic: ['', [Validators.required, Validators.maxLength(65)]],
      subjectnameinenglish: ['', [Validators.required, Validators.maxLength(65)]],
      nameinresultsscreeninarabic: ['', [Validators.required, Validators.maxLength(65)]],
      nameinresultsscreeninenglish: ['', [Validators.required, Validators.maxLength(65)]],
      subjecthours: ['', [Validators.required, Validators.min(1), Validators.min(1)]],
      numberofsessionsperweek: [''],
      gpa: [''],
      evaluationsystem: ['', [Validators.required]]

    });
  }

  ngOnInit(): void {

    this.headerService.Header.next(
      {
        'breadCrump': [
          { label: this.translate.instant('dashboard.Subjects.List Of Subjects'), routerLink: '/dashboard/educational-settings/subject/subjects-list' },
          { label: this.translate.instant('dashboard.Subjects.Add New Subject') }],
        'mainTitle': { main: this.translate.instant('dashboard.Subjects.Add New Subject') }
      }
    );
    this.cities = this.subjectServise.cities;
  }
  CheckUniqueSubjectNameInArabic(e)
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

  CheckUniqueNameInResultsScreenInArabic(e)
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

  CheckUniqueNameInResultsScreenInEnglish(e)
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
  CheckUniqueSubjectNameInEnglish(e)
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

  get subjectnameinarabic() {
    return this.subjectFormGrp.controls['subjectnameinarabic'] as FormControl;
  }

  get subjectnameinenglish() {
    return this.subjectFormGrp.controls['subjectnameinenglish'] as FormControl;
  }

  get nameinresultsscreeninarabic() {
    return this.subjectFormGrp.controls['nameinresultsscreeninarabic'] as FormControl;
  }

  get nameinresultsscreeninenglish() {
    return this.subjectFormGrp.controls['nameinresultsscreeninenglish'] as FormControl;
  }

  get subjecthours() {
    return this.subjectFormGrp.controls['subjecthours'] as FormControl;
  }
  get numberofsessionsperweek() {
    return this.subjectFormGrp.controls['numberofsessionsperweek'] as FormControl;
  }

  get gpa() {
    return this.subjectFormGrp.controls['gpa'] as FormControl;
  }
  get evaluationsystem() {
    return this.subjectFormGrp.controls['evaluationsystem'] as FormControl;
  }



}
