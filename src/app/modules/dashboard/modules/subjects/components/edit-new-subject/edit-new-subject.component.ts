import { Component, OnInit,inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faPlus, faArrowRight, faExclamationCircle, faCheck } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { ISubject } from 'src/app/core/Models/subjects/subject';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { LayoutService } from 'src/app/layout/services/layout/layout.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { AssessmentService } from 'src/app/modules/dashboard/modules/assessment/service/assessment.service';
import { SubjectService } from '../../service/subject.service';
import { UserScope } from 'src/app/shared/enums/user/user.enum';
import { UserService } from 'src/app/core/services/user/user.service';
import { timeout } from 'rxjs';
import { degreesMatchValidator } from './degrees-validators';
import { AssessmentsEnum } from 'src/app/shared/enums/subjects/assessment-type.enum';



@Component({
  selector: 'app-new-subject',
  templateUrl: './edit-new-subject.component.html',
  styleUrls: ['./edit-new-subject.component.scss']
})
export class EditNewSubjectComponent implements OnInit {
  isLabelShown:boolean=false;
  subject;
  addedSubject;
  subjectList:ISubject[] = [];
  subjectAddedList: ISubject[] = [];
  successStatusList;
  cities: string[];
  message:string="";
  isBtnLoading: boolean=false;
  empty:string="";
  checkIcon= faCheck;
  exclamationIcon = faExclamationCircle;
  plusIcon= faPlus;
  rightIcon = faArrowRight;
  subjectFormGrp: FormGroup;
  isSubjectNotUnique: number = 0;
  urlParameter: string='';
  evaluationTypeList;
  evaluation:{id:0,name:{ar:"",en:""}};
  showDegree:boolean=false;
  showIpPoints:boolean=false;
  showDescription:boolean=false;
  showEvaluation:boolean=false;
  oldAssesmentList;
  schoolId=0;
  gradeId=0;
  trackId=null;
  currentUserScope = inject(UserService).getCurrentUserScope()
  get userScope() { return UserScope }
  constructor(private headerService: HeaderService,private userService:UserService,private assessmentService:AssessmentService,private toastService: ToastService,private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private subjectServise: SubjectService, private translate: TranslateService) {

    this.subjectFormGrp = fb.group({

      subjectNameInArabic: ['', [Validators.required, Validators.maxLength(65)]],
      subjectNameInEnglish: ['', [Validators.required, Validators.maxLength(65)]],
      nameInResultsScreenInArabic: ['', [Validators.required, Validators.maxLength(65)]],
      nameInResultsScreenInEnglish: ['', [Validators.required, Validators.maxLength(65)]],
      minmumDegree: [''],
      maximumDegree: [''],
      subjectCode: [''],
      exemptableStatus:[''],
      oldEvaluation: [''],
      evaluationType: ['',[Validators.required]],
      descriptionArr: fb.array([])

    }, { validators: degreesMatchValidator });
  }

  ngOnInit(): void {
   this.assessmentService.getRates().subscribe((res)=>{this.oldAssesmentList=res.data;}) 
    this.subjectAddedList.push({} as ISubject );
    this.evaluationTypeList=this.subjectServise.evaluationTypeList;
    this.successStatusList=this.subjectServise.successStatus;
    this.route.paramMap.subscribe(param => {
      this.schoolId=Number(param.get('schoolId'));
      this.urlParameter =param.get('subjectId');
         
      if(!this.urlParameter)
      {
        this.addFieldsinFormArray();
      }

     this.subjectServise.getSubjectByID(Number(this.urlParameter)).subscribe((res)=>{this.subject=res;this.bindOldSubject(this.subject);});
    });

   if(!this.schoolId)
   { this.headerService.Header.next(
      {
        'breadCrump': [
          { label: this.translate.instant('dashboard.Subjects.List Of Subjects'), routerLink: '/dashboard/educational-settings/subject/subjects-list' ,routerLinkActiveOptions:{exact: true}},
         {
             label: (this.urlParameter==null||this.urlParameter=='')?  this.translate.instant('dashboard.Subjects.Add New Subject'):this.translate.instant('dashboard.Subjects.Edit Subject'),
            routerLink: (this.urlParameter==null||this.urlParameter=='')? '/dashboard/educational-settings/subject/new-subject':'/dashboard/educational-settings/subject/edit-subject/'+this.urlParameter
          }
     ],
      'mainTitle':{main:(this.urlParameter==null||this.urlParameter=='')? this.translate.instant('dashboard.Subjects.Add New Subject'):this.translate.instant('dashboard.Subjects.Edit Subject')}
      }
    );
   }
   else
   {
    
      this.headerService.Header.next(
        {
          'breadCrump': [
        
           {label:   this.translate.instant('dashboard.Subjects.Add New Subject'),routerLink:`/dashboard/school-management/school/${this.schoolId}/subjects/new-subject`}
       ],
        'mainTitle':{main: this.translate.instant('dashboard.Subjects.Add New Subject')}
        }
      );
   
   }


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

  get minmumDegree() {
    return this.subjectFormGrp.controls['minmumDegree'] as FormControl;
  }
  get maximumDegree() {
    return this.subjectFormGrp.controls['maximumDegree'] as FormControl;
  }
  get SubjectCode() {
    return this.subjectFormGrp.controls['SubjectCode'] as FormControl;
  }

  get evaluationType() {
    return this.subjectFormGrp.controls['evaluationType'] as FormControl;
  }
  get oldEvaluation() {
    return this.subjectFormGrp.controls['oldEvaluation'] as FormControl;
  }
  get descriptionArr():FormArray {
    return this.subjectFormGrp.controls['descriptionArr'] as FormArray;
  }
  get description() {
    return this.subjectFormGrp.controls['description'] as FormControl;
  }
  get meaning() {
    return this.subjectFormGrp.controls['meaning'] as FormControl;
  }
  get successfulRetry() {
    return this.subjectFormGrp.controls['successfulRetry'] as FormControl;
  }


  isToggleLabel(e)
  {
    if(e.checked)
    {
      if(this.urlParameter)
      {
        this.subject.isExemptableToLeave=true;
      
      }
      else
      {
        this.isLabelShown=true;
      }
  
    }
    else{
      if(this.urlParameter)
      {
        this.subject.isExemptableToLeave=false;
     
      }
      else
      {
        this.isLabelShown=false;
      }
     
    }
  }

  checkEvaluationType(e)
  {
    

    if(e==AssessmentsEnum.Evaluation)
    {
      this.showDegree=false;
      this.showIpPoints=false;
      this.showDescription=false;
      this.showEvaluation=true;

      this.oldEvaluation.setValidators([Validators.required]);
      this.minmumDegree.clearValidators();
      this.minmumDegree.updateValueAndValidity(); 
      this.maximumDegree.clearValidators();
      this.maximumDegree.updateValueAndValidity(); 

    }
    else if(e==AssessmentsEnum.Grades)
    {
      this.showIpPoints=false;
      this.showDescription=false;
      this.showEvaluation=false;
      this.showDegree=true;

      this.minmumDegree.setValidators([Validators.required,Validators.min(0)]);
      this.maximumDegree.setValidators([Validators.required,Validators.min(0)]);
   

    }
    else if(e==AssessmentsEnum.IPpoints)
    {
      this.showDescription=false;
      this.showDegree=false;
      this.showEvaluation=false;
      this.showIpPoints=true;

      this.minmumDegree.setValidators([Validators.required,Validators.min(0)]);
      this.maximumDegree.setValidators([Validators.required,Validators.min(0)]);
      



    }
    else if(e==AssessmentsEnum.Discription)
    {
      this.showEvaluation=false;
      this.showDegree=false;
      this.showIpPoints=false;
      this.showDescription=true;

    
       let descriptionArrGrp= this.descriptionArr.controls[0] as FormGroup 
       descriptionArrGrp.controls['meaning'].setValidators([Validators.required]);
       descriptionArrGrp.controls['description'].setValidators([Validators.required]);
       descriptionArrGrp.controls['successfulRetry'].setValidators([Validators.required]);

        this.minmumDegree.clearValidators();
        this.minmumDegree.updateValueAndValidity(); 
        this.maximumDegree.clearValidators();
        this.maximumDegree.updateValueAndValidity(); 
  

    }
    else
    {}
  }

  addNew() {
    var availableadd = 1;


 
    for(let i in this.descriptionArr.controls)
    {

      if ((this.descriptionArr.controls[i].value.meaning=='' ) || (this.descriptionArr.controls[i].value.successfulRetry=='' ) || (this.descriptionArr.controls[i].value.description==''))


        { 
         
          availableadd = 0;
         
        }
      
   }
    if (availableadd == 1) {
      this.descriptionArr.push(this.fb.group({
        description: [''],
        meaning: [''],
        successfulRetry: ['']
      }));
   
    }
    availableadd == 1


  }

  succeeded()
  {
    
    this.addedSubject={};
    this.addedSubject.isExemptableToLeave=this.subjectFormGrp.value.exemptableStatus!=''?true:false;
   
    this.isBtnLoading = true;
    this.addedSubject={
      id:Number(this.urlParameter),
      name:{ar:this.subjectFormGrp.value.subjectNameInArabic,en:this.subjectFormGrp.value.subjectNameInEnglish },
      nameOnScoreScreen:{ar:this.subjectFormGrp.value.nameInResultsScreenInArabic,en:this.subjectFormGrp.value.nameInResultsScreenInEnglish},
      evaluationSystem:this.subjectFormGrp.value.evaluationType,
      subjectCode:this.subjectFormGrp.value.subjectCode,
      isExemptableToLeave:this.addedSubject.isExemptableToLeave
     };
     if( this.addedSubject.evaluationSystem==AssessmentsEnum.IPpoints||this.addedSubject.evaluationSystem==AssessmentsEnum.Grades)
     {
      this.addedSubject.maximumDegree=this.subjectFormGrp.value.maximumDegree;
      this.addedSubject.minimumDegree=this.subjectFormGrp.value.minmumDegree;
      this.addedSubject.subjectDescriptions=[];
      this.addedSubject.rateId=null;
     }
     else if( this.addedSubject.evaluationSystem==AssessmentsEnum.Evaluation)
     {
      this.addedSubject.rateId=this.subjectFormGrp.value.oldEvaluation;
      this.addedSubject.maximumDegree=null;
      this.addedSubject.minimumDegree=null;
      this.addedSubject.subjectDescriptions=[];
     }
     else if( this.addedSubject.evaluationSystem==AssessmentsEnum.Discription)
     {
      this.addedSubject.subjectDescriptions=[];
      this.subjectFormGrp.value.descriptionArr.forEach((element,i) => {
          if(element.meaning==''&&element.description==''&&element.successfulRetry=='')
          { }
          else
          {
            element.code=i;
            this.addedSubject.subjectDescriptions.push(element);
          }
      });
      
      this.addedSubject.rateId=null;
      this.addedSubject.maximumDegree=null;
      this.addedSubject.minimumDegree=null;
     }

     if(this.schoolId)
    {
    
     this.gradeId=Number(localStorage.getItem("gradeId"))
     if(localStorage.getItem("trackId"))
     {this.trackId=Number(localStorage.getItem("trackId"))}
     this.subjectServise.addSubjectBySchool({schoolId:this.schoolId,gradeId:this.gradeId,trackId:this.trackId,subject:this.addedSubject}).subscribe((res)=>{
      this.isBtnLoading = false;
      this.toastService.success(this.translate.instant('dashboard.Subjects.Subject added Successfully'));
      if(this.userScope.SPEA==this.currentUserScope)
      {this.router.navigate([`dashboard/schools-and-students/schools/school/${this.schoolId}`]);}
      else if(this.userScope.Employee==this.currentUserScope)
      {this.router.navigate([`dashboard/school-management/school/${this.schoolId}/subjects`]);}
      localStorage.removeItem("gradeId");
      if(localStorage.getItem("trackId"))
      {localStorage.removeItem("trackId");}
    },(err)=>{
      this.isBtnLoading = false;
      this.toastService.error(this.translate.instant('dashboard.Subjects.error,please try again'));

    })
    }
    else{
     
          if(this.urlParameter)
            {
              this.subjectServise.updateSubject(this.addedSubject).subscribe((res)=>{
                this.isBtnLoading = false;
                this.toastService.success(this.translate.instant('dashboard.Subjects.Subject edited Successfully'));
                this.router.navigate(['/dashboard/educational-settings/subject/subjects-list']);
              },(err)=>{
                this.isBtnLoading = false;
                this.toastService.error(this.translate.instant('dashboard.Subjects.error,please try again'));
              });
            }
            else
            { 
                this.subjectServise.addSubject(this.addedSubject).subscribe((res)=>{
                this.isBtnLoading = false;
                this.toastService.success(this.translate.instant('dashboard.Subjects.Subject added Successfully'));
                this.router.navigate(['/dashboard/educational-settings/subject/subjects-list']);
              },(err)=>{
                this.isBtnLoading = false;
                this.toastService.error(this.translate.instant('dashboard.Subjects.error,please try again'));

              })
            }
    }

  }
  bindOldSubject(subject)
  {
   
    if(this.urlParameter)
    {  
    
        this.subjectFormGrp.patchValue({subjectNameInArabic:subject.name.ar,
          subjectNameInEnglish:subject.name.en,
          nameInResultsScreenInArabic:subject.nameOnScoreScreen.ar,
          nameInResultsScreenInEnglish:subject.nameOnScoreScreen.en,
          evaluationType:subject.evaluationSystem,
          exemptableStatus:subject.isExemptableToLeave,
          subjectCode:subject.subjectCode,
          maximumDegree:subject.maximumDegree
          ,minmumDegree:subject.minimumDegree,
          oldEvaluation:subject.rateId
        });
        
        if(subject.subjectDescriptions.length)
        {subject.subjectDescriptions.forEach(element => {
            this.descriptionArr.push(this.fb.group({
              description: [element.description],
              meaning: [element.meaning],
              successfulRetry: [element.successfulRetry]
            }));
          });
       }
       else if(!subject.subjectDescriptions.length)
        {  
          this.addFieldsinFormArray();
        }


     this.checkEvaluationType(subject.evaluationSystem);

      }

  }
  addFieldsinFormArray()
  {
    this.descriptionArr.push(this.fb.group({
      description: [''],
      meaning: [''],
      successfulRetry: ['']
    }));
  }



}

