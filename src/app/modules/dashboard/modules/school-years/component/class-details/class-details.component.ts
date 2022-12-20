import { Component, OnInit,OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { SchoolYearsService } from '../../service/school-years.service';
import { faExclamationCircle ,faPlus} from '@fortawesome/free-solid-svg-icons';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { Subscription } from 'rxjs';
import { SubjectService } from '../../../subjects/service/subject.service';
@Component({
  selector: 'app-class-details',
  templateUrl: './class-details.component.html',
  styleUrls: ['./class-details.component.scss']
})
export class ClassDetailsComponent implements OnInit,OnDestroy {
  addSubjectModelOpened:boolean=false;
  tittle:string;
  exclamtionIcon=faExclamationCircle;
  faPlus=faPlus;
  schoolYearUrlParameter: string='';
  classUrlParameter: string='';
  isLabelShown:boolean=false;
  schoolYearName;
  classSubjectsList;
  schoolYearStatus;
  schoolYearClassFormGrp:FormGroup;
  schoolYearSubjectFormGrp:FormGroup;
  subTittle;
  urlTittle;
  curriculumClassList;
  curriculumList;
  classList=[];
  subjectList;
  subjectObj;
  class;
  subscription:Subscription;
  constructor(private fb:FormBuilder, private subjectService: SubjectService,private router: Router,private location: Location, private sharedService: SharedService,private headerService:HeaderService,private translate:TranslateService,private route: ActivatedRoute,private schoolYearService:SchoolYearsService) 
  { 

    this.schoolYearClassFormGrp = fb.group({
      classId:[''],
      relatedCurriculumId: ['',[Validators.required]],
      minmumSubjectNumbers:[''],
      minAgeInsideCountryFrom: [''],
      minAgeInsideCountryTo: [''],
      maxAgeOutsideCountryFrom: [''],
      maxAgeOutsideCountryTo: [''],
      activateAge: [''],
  
  

    });

    
    this.schoolYearSubjectFormGrp= fb.group({

      subject:[''],
      subjectHours: ['',[Validators.required]],
      numberOfCoursesPerWeek:[''],
      inFinalResult:[null],
      isMandatory: [null],
      isThereGPA: [null],
      maxGPA: [''],
  
  

    });
  }

  ngOnInit(): void {
    this.classList=this.schoolYearService.classList;
    this.sharedService.getAllCurriculum().subscribe((res)=>{this.curriculumList=res;});
   this.subjectService.getAllSubjects().subscribe((res)=>{this.subjectList=res.data;})
    this.schoolYearService.schoolYearName.subscribe((res)=>{this.schoolYearName=res;})
    this.schoolYearService.schoolYearStatus.subscribe((res)=>{this.schoolYearStatus=res;})
    this.route.paramMap.subscribe(param => {
     
      this.schoolYearUrlParameter = param.get('schoolyearId');
      this.classUrlParameter=param.get('classId');
      
     
      if(this.schoolYearUrlParameter&&!this.classUrlParameter)
      {
        this.subTittle='dashboard.SchoolYear.Add Class';
        this.urlTittle='/dashboard/educational-settings/school-year/display-school-year/'+this.schoolYearUrlParameter+'/class-details'
      }
      else if(!this.schoolYearUrlParameter&&!this.classUrlParameter)
      {
        this.subTittle='dashboard.SchoolYear.Add Class';
        this.urlTittle='/dashboard/educational-settings/school-year/new-school-year/class-details'
      }
      else if(this.schoolYearUrlParameter&&this.classUrlParameter)
      {
        this.subTittle='breadcrumb.class details';
        this.urlTittle='/dashboard/educational-settings/school-year/display-school-year/'+this.schoolYearUrlParameter+'/class-details/'+this.classUrlParameter
      }
      else if(!this.schoolYearUrlParameter&&this.classUrlParameter)
      {
        this.subTittle='breadcrumb.class details';
        this.urlTittle='/dashboard/educational-settings/school-year/new-school-year/class-details/'+this.classUrlParameter
      }
      if(this.classUrlParameter)
   {
   this.class={};
   if(localStorage.getItem('curriculumClassList'))
   {
     this.schoolYearService.curriculumClassList.next(JSON.parse(localStorage.getItem('curriculumClassList')));
   }
    this.schoolYearService.curriculumClassList.subscribe((res)=>{

      this.curriculumClassList=res;
    
      this.curriculumClassList.forEach(element => {
        element.class.forEach(item => {
          if(item.id==this.classUrlParameter)
          {
            this.class=item;
            console.log(item);
            this.bindOldClass(item);
          }
        });
      });
   
    })
   
    
  }

  if(localStorage.getItem('classSubjectsList'))
  {
    console.log("heloooomnia")
    this.schoolYearService.classSubjectsList.next(JSON.parse(localStorage.getItem('classSubjectsList')));
  }
   this.schoolYearService.classSubjectsList.subscribe((res)=>{
    this.classSubjectsList=res;console.log(res);
   
    if(localStorage.getItem('classSubjectsList'))
    {
   
      localStorage.removeItem('classSubjectsList');
      localStorage.setItem('classSubjectsList', JSON.stringify(this.classSubjectsList));
      this.classSubjectsList=JSON.parse(localStorage.getItem('classSubjectsList'));
    }
    else
    {
      localStorage.setItem('classSubjectsList', JSON.stringify(this.classSubjectsList));
      this.classSubjectsList=JSON.parse(localStorage.getItem('classSubjectsList'));
   }
   
  })
    });
    this.headerService.Header.next(

      {'breadCrump':[
        {label: this.translate.instant('breadcrumb.School Years List'),routerLink:'/dashboard/educational-settings/school-year/school-years-list',routerLinkActiveOptions:{exact: true}},
        {
        label: (this.schoolYearUrlParameter==null||this.schoolYearUrlParameter.toString()=='')? this.translate.instant('breadcrumb.Add New School Year'):this.translate.instant('breadcrumb.School Year Details'),
        routerLink: (this.schoolYearUrlParameter==null||this.schoolYearUrlParameter.toString()=='')? '/dashboard/educational-settings/school-year/new-school-year':'/dashboard/educational-settings/school-year/display-school-year/'+this.schoolYearUrlParameter
        ,routerLinkActiveOptions:{exact: true}
        },
        {
          label:this.translate.instant(this.subTittle),
          routerLink: this.urlTittle
        },
       
      
      ],
      mainTitle:{main:(this.schoolYearUrlParameter==null||this.schoolYearUrlParameter.toString()=='')? this.translate.instant('breadcrumb.Add New School Year'):this.translate.instant('breadcrumb.School Year Details')}
      }
      );
      
  }
  get classId() {
    return this.schoolYearClassFormGrp.controls['classId'] ;
  }
  get relatedCurriculumId() {
    return this.schoolYearClassFormGrp.controls['relatedCurriculumId'] ;
  }
  get minmumSubjectNumbers() {
    return this.schoolYearClassFormGrp.controls['minmumSubjectNumbers'] ;
  }
  get minAgeInsideCountryFrom() {
    return this.schoolYearClassFormGrp.controls['minAgeInsideCountryFrom'] ;
  }
  get minAgeInsideCountryTo() {
    return this.schoolYearClassFormGrp.controls['minAgeInsideCountryTo'] ;
  }
  get maxAgeOutsideCountryFrom() {
    return this.schoolYearClassFormGrp.controls['maxAgeOutsideCountryFrom'] ;
  }
  get maxAgeOutsideCountryTo() {
    return this.schoolYearClassFormGrp.controls['maxAgeOutsideCountryTo'] ;
  }
  get activateAge() {
    return this.schoolYearClassFormGrp.controls['activateAge'] ;
  }

  get subject() {
    return this.schoolYearSubjectFormGrp.controls['subject'] ;
  }
  get subjectHours() {
    return this.schoolYearSubjectFormGrp.controls['subjectHours'] ;
  }
  get numberOfCoursesPerWeek() {
    return this.schoolYearSubjectFormGrp.controls['numberOfCoursesPerWeek'] ;
  }
  get maxGPA() {
    return this.schoolYearSubjectFormGrp.controls['maxGPA'] ;
  }
  get inFinalResult() {
    return this.schoolYearSubjectFormGrp.controls['inFinalResult'] ;
  }
  get isMandatory() {
    return this.schoolYearSubjectFormGrp.controls['isMandatory'] ;
  }

  get isThereGPA() {
    return this.schoolYearSubjectFormGrp.controls['isThereGPA'] ;
  }



  isToggleLabel(e)
  {
    if(e.checked)
    {
      if(this.classUrlParameter)
      {
        this.class.activateAge=true;
      
      }
      else
      {
        this.isLabelShown=true;
      }
  
    }
    else{
      if(this.classUrlParameter)
      {
        this.class.activateAge=false;
     
      }
      else
      {
        this.isLabelShown=false;
      }
     
    }
  }
  saveClass()
  {
 let availabe=0;

    this.classSubjectsList=JSON.parse(localStorage.getItem('classSubjectsList'));
   
    this.class={
      'id':this.classList.find(c=>c.id==this.schoolYearClassFormGrp.value.classId).id,
      'name':this.classList.find(c=>c.id==this.schoolYearClassFormGrp.value.classId).name,
      'relatedCurriculum':this.curriculumList.find(c=>c.id==this.schoolYearClassFormGrp.value.relatedCurriculumId),
      'minmumSubjectNumbers':this.schoolYearClassFormGrp.value.minmumSubjectNumbers,
      'minAgeInsideCountryFrom': this.schoolYearClassFormGrp.value.minAgeInsideCountryFrom,
      'minAgeInsideCountryTo': this.schoolYearClassFormGrp.value.minAgeInsideCountryTo,
      'maxAgeOutsideCountryFrom': this.schoolYearClassFormGrp.value.maxAgeOutsideCountryFrom,
      'maxAgeOutsideCountryTo':this.schoolYearClassFormGrp.value.maxAgeOutsideCountryTo,
      'activateAge': this.schoolYearClassFormGrp.value.activateAge,
      'subjectList': this.classSubjectsList,
      'TopStudentsNumber':0

     };
    
     
   
     this.subscription=this.schoolYearService.curriculumClassList.subscribe((res)=>{this.curriculumClassList=res;
     this.curriculumClassList.forEach(element => {
      if(element.curriculmName.id==this.class.relatedCurriculum.id)
      {
        if(this.classUrlParameter)
        {

          this.curriculumClassList.find(c=>c.curriculmName.id==element.curriculmName.id).class.find(c=>c.id==this.classUrlParameter).name=this.class.name;
          this.curriculumClassList.find(c=>c.curriculmName.id==element.curriculmName.id).class.find(c=>c.id==this.classUrlParameter).relatedCurriculum=this.class.relatedCurriculum;
          this.curriculumClassList.find(c=>c.curriculmName.id==element.curriculmName.id).class.find(c=>c.id==this.classUrlParameter).minmumSubjectNumbers=this.class.minmumSubjectNumbers;
          this.curriculumClassList.find(c=>c.curriculmName.id==element.curriculmName.id).class.find(c=>c.id==this.classUrlParameter).minAgeInsideCountryFrom=this.class.minAgeInsideCountryFrom;
          this.curriculumClassList.find(c=>c.curriculmName.id==element.curriculmName.id).class.find(c=>c.id==this.classUrlParameter).minAgeInsideCountryTo=this.class.minAgeInsideCountryTo;
          this.curriculumClassList.find(c=>c.curriculmName.id==element.curriculmName.id).class.find(c=>c.id==this.classUrlParameter).maxAgeOutsideCountryFrom=this.class.maxAgeOutsideCountryFrom;
          this.curriculumClassList.find(c=>c.curriculmName.id==element.curriculmName.id).class.find(c=>c.id==this.classUrlParameter).maxAgeOutsideCountryTo=this.class.maxAgeOutsideCountryTo;
          this.curriculumClassList.find(c=>c.curriculmName.id==element.curriculmName.id).class.find(c=>c.id==this.classUrlParameter).activateAge=this.class.activateAge;
          this.curriculumClassList.find(c=>c.curriculmName.id==element.curriculmName.id).class.find(c=>c.id==this.classUrlParameter).subjectList= this.class.subjectList;
         
        }
        else
        {
          element.class.push(this.class);
         
        }
        availabe=1;
      }
     });
     if(availabe==0)
     {
      this.curriculumClassList.push({'id':this.class.relatedCurriculum.id,'curriculmName':this.class.relatedCurriculum,'class':[this.class]})
     }

     if(localStorage.getItem('curriculumClassList'))
     {
      
       localStorage.removeItem('curriculumClassList');
       localStorage.setItem('curriculumClassList', JSON.stringify(this.curriculumClassList));
       this.curriculumClassList=JSON.parse(localStorage.getItem('curriculumClassList'));
     }
     else
     {
     
       localStorage.setItem('curriculumClassList', JSON.stringify(this.curriculumClassList));
       this.curriculumClassList=JSON.parse(localStorage.getItem('curriculumClassList'));
   }
   });
  
     this.location.back();
 }

bindOldClass(item)
{
  this.schoolYearClassFormGrp.patchValue({
      classId:item.id,
      relatedCurriculumId:item.relatedCurriculum.id,
      minmumSubjectNumbers:item.minmumSubjectNumbers,
      minAgeInsideCountryFrom: item.minAgeInsideCountryFrom,
      minAgeInsideCountryTo: item.minAgeInsideCountryTo,
      maxAgeOutsideCountryFrom:  item.maxAgeOutsideCountryFrom,
      maxAgeOutsideCountryTo: item.maxAgeOutsideCountryTo,
      activateAge: item.activateAge,
  })
  this.classSubjectsList=item.subjectList;
  this.schoolYearService.classSubjectsList.next(this.classSubjectsList);
}
bindOldSubject(item)
{
  this.schoolYearSubjectFormGrp.patchValue({

    subject:item.id,
    subjectHours:item.subjectHours,
    numberOfCoursesPerWeek:item.numberOfCoursesPerWeek,
    inFinalResult:item.inFinalResult,
    isMandatory: item.isMandatory,
    isThereGPA: item.isThereGPA,
    maxGPA:item.maxGPA
  })
  
}
saveSubjectList()
{
  let availableAdd=1;

  this.subjectObj={};
  this.subjectObj={
    'id':this.subjectList.find(c=>c.id==this.schoolYearSubjectFormGrp.value.subject).id,
    'name':this.subjectList.find(c=>c.id==this.schoolYearSubjectFormGrp.value.subject).subjectName,
    'subjectHours':this.schoolYearSubjectFormGrp.value.subjectHours,
    'numberOfCoursesPerWeek':this.schoolYearSubjectFormGrp.value.numberOfCoursesPerWeek,
    'inFinalResult': this.schoolYearSubjectFormGrp.value.inFinalResult,
    'isMandatory': this.schoolYearSubjectFormGrp.value.isMandatory,
    'isThereGPA': this.schoolYearSubjectFormGrp.value.isThereGPA,
    'maxGPA':this.schoolYearSubjectFormGrp.value.maxGPA
   };
   
   this.classSubjectsList.forEach(element => {
      if(this.subjectObj.id==element.id)
      {
        availableAdd=0
      }
    });
  if( availableAdd==1)
   {this.classSubjectsList.push(this.subjectObj);}
   else
   {
    
    this.classSubjectsList.find(s=>s.id==this.subjectObj.id).name= this.subjectObj.name;
    this.classSubjectsList.find(s=>s.id==this.subjectObj.id).subjectHours= this.subjectObj.subjectHours;
    this.classSubjectsList.find(s=>s.id==this.subjectObj.id).numberOfCoursesPerWeek= this.subjectObj.numberOfCoursesPerWeek;
    this.classSubjectsList.find(s=>s.id==this.subjectObj.id).inFinalResult= this.subjectObj.inFinalResult;
    this.classSubjectsList.find(s=>s.id==this.subjectObj.id).isMandatory= this.subjectObj.isMandatory;
    this.classSubjectsList.find(s=>s.id==this.subjectObj.id).isThereGPA= this.subjectObj.isThereGPA;
    this.classSubjectsList.find(s=>s.id==this.subjectObj.id).maxGPA= this.subjectObj.maxGPA;
 
   }
  
   this.schoolYearService.classSubjectsList.next(this.classSubjectsList);
   
   this.addSubjectModelOpened=false;
   
  this.clearSubjectForm();
  
}
clearSubjectForm()
{

  this.schoolYearSubjectFormGrp.reset();
  Object.keys( this.schoolYearSubjectFormGrp.controls).forEach((key) => {
    const control = this.schoolYearSubjectFormGrp.controls[key];
    control.markAsPristine();
    control.markAsUntouched();
  });
}
ngOnDestroy(): void {
  
  this.subscription?.unsubscribe();
  this.schoolYearService.classSubjectsList.next([]);
  localStorage.removeItem('classSubjectsList');
}
editSubject(item)
{
  this.addSubjectModelOpened=true;
  this.bindOldSubject(item);

}
checkEvaluationType(e)
{
}
}
