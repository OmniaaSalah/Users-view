import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faArrowRight, faExclamationCircle, faCheck } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { HeaderService } from 'src/app/core/services/header/header.service';
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
  SubjectFormGrp: FormGroup;
  isSubjectNotUnique: number = 0;

  constructor(private headerService: HeaderService, private router: Router, private fb: FormBuilder, private subjectservise: SubjectService, private translate: TranslateService) {

    this.SubjectFormGrp = fb.group({

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
    this.cities = this.subjectservise.cities;
  }
  CheckUniqueSubjectNameInArabic(e)
  {
    this.isSubjectNotUnique=0;
    
     this.subjectservise.subjectsList.forEach(element => {
      
      if(element.subjectnameinarabic==e)
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
    
     this.subjectservise.subjectsList.forEach(element => {
      
      if(element.subjectnameinenglish==e)
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
    
     this.subjectservise.subjectsList.forEach(element => {
      
      if(element.subjectnameinenglish==e)
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
    
     this.subjectservise.subjectsList.forEach(element => {
      
      if(element.subjectnameinenglish==e)
      {
        this.isSubjectNotUnique=1;
        return;
      }
      
     });
     this.isSubjectNotUnique=0;

  }

  get subjectnameinarabic() {
    return this.SubjectFormGrp.controls['subjectnameinarabic'] as FormControl;
  }

  get subjectnameinenglish() {
    return this.SubjectFormGrp.controls['subjectnameinenglish'] as FormControl;
  }

  get nameinresultsscreeninarabic() {
    return this.SubjectFormGrp.controls['nameinresultsscreeninarabic'] as FormControl;
  }

  get nameinresultsscreeninenglish() {
    return this.SubjectFormGrp.controls['nameinresultsscreeninenglish'] as FormControl;
  }

  get subjecthours() {
    return this.SubjectFormGrp.controls['subjecthours'] as FormControl;
  }
  get numberofsessionsperweek() {
    return this.SubjectFormGrp.controls['numberofsessionsperweek'] as FormControl;
  }

  get gpa() {
    return this.SubjectFormGrp.controls['gpa'] as FormControl;
  }
  get evaluationsystem() {
    return this.SubjectFormGrp.controls['evaluationsystem'] as FormControl;
  }



}
