import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight ,faExclamationCircle,faCheck } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { HeaderService } from 'src/app/core/services/Header/header.service';
import { SubjectService } from '../../service/subject.service';



@Component({
  selector: 'app-new-subject',
  templateUrl: './new-subject.component.html',
  styleUrls: ['./new-subject.component.scss']
})
export class NewSubjectComponent implements OnInit {
  checkicon=faCheck;
  Exclamationicon=faExclamationCircle;
  Homeicon = faHome  ;
  righticon=faArrowRight;
  SubjectFormgrp:FormGroup;
  IsSubjectNotUnique:number=0;


  constructor(private headerService:HeaderService,private fb: FormBuilder,private subjectservise:SubjectService,private translate:TranslateService) { 

    this.SubjectFormgrp= fb.group({
     
    SubjectNameInArabic:['',[Validators.required,Validators.maxLength(65)]],
    SubjectNameInEnglish:['',[Validators.required,Validators.maxLength(65)]],
    NameInResultsScreenInArabic:['',[Validators.required,Validators.maxLength(65)]],
    NameInResultsScreenInEnglish:['',[Validators.required, Validators.maxLength(65)]],
    SubjectHours:['',[Validators.required, Validators.min(1),Validators.min(1)]],
    NumberOfSessionsPerWeek:[''],
    GPA:[''],
    EvaluationSystem:['',[Validators.required]]

    });
  }

  ngOnInit(): void {
   
    this.headerService.Header.next(
      {'breadCrump':[
        {label: this.translate.instant('dashboard.Subjects.List Of Subjects')},
        {label: this.translate.instant('dashboard.Subjects.Add New Subject')}],
        'home':{icon: 'pi pi-home', routerLink: '/'},
        'mainTittle':this.translate.instant('dashboard.Subjects.Add New Subject')
      }
      );
  }
  CheckUniqueSubjectNameInArabic(e)
  {
    this.IsSubjectNotUnique=0;
    
     this.subjectservise.SubjectsList.forEach(element => {
      
      if(element.SubjectNameInArabic==e)
      {
        this.IsSubjectNotUnique=1;
        return;
      }
      
     });
     this.IsSubjectNotUnique=0;
  }

  CheckUniqueNameInResultsScreenInArabic(e)
  {
    this.IsSubjectNotUnique=0;
    
     this.subjectservise.SubjectsList.forEach(element => {
      
      if(element.SubjectNameInEnglish==e)
      {
        this.IsSubjectNotUnique=1;
        return;
      }
      
     });
     this.IsSubjectNotUnique=0;

  }

  CheckUniqueNameInResultsScreenInEnglish(e)
  {
    this.IsSubjectNotUnique=0;
    
     this.subjectservise.SubjectsList.forEach(element => {
      
      if(element.SubjectNameInEnglish==e)
      {
        this.IsSubjectNotUnique=1;
        return;
      }
      
     });
     this.IsSubjectNotUnique=0;

  }
  CheckUniqueSubjectNameInEnglish(e)
  {
    this.IsSubjectNotUnique=0;
    
     this.subjectservise.SubjectsList.forEach(element => {
      
      if(element.SubjectNameInEnglish==e)
      {
        this.IsSubjectNotUnique=1;
        return;
      }
      
     });
     this.IsSubjectNotUnique=0;

  }

  get SubjectNameInArabic() {
    return this.SubjectFormgrp.controls['SubjectNameInArabic'] as FormControl;
  }

  get SubjectNameInEnglish() {
    return this.SubjectFormgrp.controls['SubjectNameInEnglish'] as FormControl;
  }

  get NameInResultsScreenInArabic() {
    return this.SubjectFormgrp.controls['NameInResultsScreenInArabic'] as FormControl;
  }

  get NameInResultsScreenInEnglish() {
    return this.SubjectFormgrp.controls['NameInResultsScreenInEnglish'] as FormControl;
  }

  get SubjectHours() {
    return this.SubjectFormgrp.controls['SubjectHours'] as FormControl;
  }
  get NumberOfSessionsPerWeek() {
    return this.SubjectFormgrp.controls['NumberOfSessionsPerWeek'] as FormControl;
  }

  get GPA() {
    return this.SubjectFormgrp.controls['GPA'] as FormControl;
  }
  get EvaluationSystem() {
    return this.SubjectFormgrp.controls['EvaluationSystem'] as FormControl;
  }

}
