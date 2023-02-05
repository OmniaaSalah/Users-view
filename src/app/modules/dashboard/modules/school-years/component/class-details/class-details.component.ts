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
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { AssessmentsEnum } from 'src/app/shared/enums/subjects/assessment-type.enum';
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
  curriculumUrlParameter: string='';
  isLabelShown:boolean=false;
  schoolYearName;
  classSubjectsList;
  isBtnLoading:boolean=false;
  schoolYearStatus;
  schoolYearClassFormGrp:FormGroup;
  schoolYearSubjectFormGrp:FormGroup;
  subTittle;
  urlTittle;
  currentId;
  curriculumClassList;
  curriculumList;
  classList=[];
  subjectList;
  subjectObj;
  class;
  schoolYear;
  subscription:Subscription;
  constructor(private fb:FormBuilder,private toastService:ToastService, private subjectService: SubjectService,private router: Router,private location: Location, private sharedService: SharedService,private headerService:HeaderService,private translate:TranslateService,private route: ActivatedRoute,private schoolYearService:SchoolYearsService) 
  { 

    this.schoolYearClassFormGrp = fb.group({
      classId:['',[Validators.required]],
      relatedCurriculumId: ['',[Validators.required]],
      minmumSubjectNumbers:[''],
      minAgeInsideCountryFrom: [1],
      minAgeInsideCountryTo: [1],
      minAgeOutsideCountryFrom: [1],
      minAgeOutsideCountryTo: [1],
      activateAge: [false],
  
  

    });

    
    this.schoolYearSubjectFormGrp= fb.group({

      subject:['',[Validators.required]],
      subjectHours: [null,[Validators.required]],
      numberOfCoursesPerWeek:[null],
      inFinalResult:[true,[Validators.required]],
      isMandatory: [null,[Validators.required]],
      isThereGPA: [null,[Validators.required]],
      maxGPA: [null],
  
  

    });
  }

  ngOnInit(): void {
    this.classId.disable();
   
    this.schoolYearService.classSubjectsList.subscribe((res)=>{this.classSubjectsList=res;console.log(res)});
    this.sharedService.getAllCurriculum().subscribe((res)=>{this.curriculumList=res;});
   this.subjectService.getAllSubjects().subscribe((res)=>{this.subjectList=res.data;})

   
    this.route.paramMap.subscribe(param => {
     
      this.schoolYearUrlParameter = param.get('schoolyearId');
      this.classUrlParameter=param.get('classId');
      this.curriculumUrlParameter=param.get('curriculumId');
     
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
        this.urlTittle='/dashboard/educational-settings/school-year/display-school-year/'+this.schoolYearUrlParameter+'/curriculum/'+this.curriculumUrlParameter+'/class-details/'+this.classUrlParameter
      }
      else if(!this.schoolYearUrlParameter&&this.classUrlParameter)
      {
        this.subTittle='breadcrumb.class details';
        this.urlTittle='/dashboard/educational-settings/school-year/new-school-year/curriculum/'+this.curriculumUrlParameter+'/class-details/'+this.classUrlParameter
      }
     
      if(this.classUrlParameter)
   {
 
   this.schoolYearService.getClassDetails(Number(this.curriculumUrlParameter),Number(this.schoolYearUrlParameter),
   Number(this.classUrlParameter)).subscribe((res)=>{
    this.class=res;
  
    this.bindOldClass(res);
    this.class.grade=res.grade.name;
    this.class.curriculum=res.relatedCurriculum.name;
   });
  }
   this.schoolYearService.getCurriculumsInSchoolYear(Number(this.schoolYearUrlParameter)).subscribe((res)=>{
    
     this.curriculumClassList=res;
   });

  this.schoolYearService.getSchoolYearByID(Number(this.schoolYearUrlParameter)).subscribe((res)=>{
    this.schoolYear=res.result;
    this.schoolYearName=this.schoolYear?.schoolYearName;
    this.schoolYearStatus=this.schoolYear?.schoolYearStatus.name;
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
  get minAgeOutsideCountryFrom() {
    return this.schoolYearClassFormGrp.controls['minAgeOutsideCountryFrom'] ;
  }
  get minAgeOutsideCountryTo() {
    return this.schoolYearClassFormGrp.controls['minAgeOutsideCountryTo'] ;
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
    if(e)
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
    this.isBtnLoading=true;

 
    this.class={
      'gradeId':this.schoolYearClassFormGrp.value.classId,
      'relatedCurriculum':this.schoolYearClassFormGrp.value.relatedCurriculumId,
      'minmumSubjectNumbers':Number(this.schoolYearClassFormGrp.value.minmumSubjectNumbers),
      'minAgeInsideCountryFrom': Number(this.schoolYearClassFormGrp.value.minAgeInsideCountryFrom),
      'minAgeInsideCountryTo': Number(this.schoolYearClassFormGrp.value.minAgeInsideCountryTo),
      'minAgeOutsideCountryFrom':Number( this.schoolYearClassFormGrp.value.minAgeOutsideCountryFrom),
      'minAgeOutsideCountryTo':Number(this.schoolYearClassFormGrp.value.minAgeOutsideCountryTo),
      'activateAge': this.schoolYearClassFormGrp.value.activateAge,
      'subjectList': this.classSubjectsList
     };
  
    if(this.classUrlParameter)
    {
   
    this.schoolYearService.editGradeToCurriculum(this.class,this.classUrlParameter,this.schoolYearUrlParameter).subscribe((res)=>{
        this.isBtnLoading=false;
        this.toastService.success(this.translate.instant('dashboard.SchoolYear.old Class edited Successfully'));
        this.location.back();

    },(err)=>{
      
      this.isBtnLoading=false;
      this.toastService.error(this.translate.instant('dashboard.SchoolYear.error,please try again'));
    })
    }
    else
    {
    this.schoolYearService.addGradeToCurriculum(this.class,this.schoolYearUrlParameter).subscribe((res)=>{
      this.isBtnLoading=false;
      this.toastService.success(this.translate.instant('dashboard.SchoolYear.New Class added Successfully'));
      this.location.back();
    
    },(err)=>{
      this.isBtnLoading=false;
      this.toastService.error(this.translate.instant('dashboard.AnnualHoliday.error,please try again'));
    })
    }

 }

bindOldClass(item)
{
  this.classId.enable();
  this.schoolYearClassFormGrp.patchValue({
      classId:item.grade.id,
      relatedCurriculumId:item.relatedCurriculum.id,
      minmumSubjectNumbers:item.minmumSubjectNumbers,
      minAgeInsideCountryFrom: item.minAgeInsideCountryFrom,
      minAgeInsideCountryTo: item.minAgeInsideCountryTo,
      minAgeOutsideCountryFrom:  item.minAgeOutsideCountryFrom,
      minAgeOutsideCountryTo: item.minAgeOutsideCountryTo,
      activateAge: item.activateAge,
  })
  this.onCurriculumChange(item.relatedCurriculum.id,item.grade.id);
  this.isToggleLabel(item.activateAge);

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
  this.subjectObj.subject=this.subjectList.find(c=>c.id==this.schoolYearSubjectFormGrp.value.subject);
  this.subjectObj={
    'id':this.subjectObj.subject.id,
    'name':this.subjectObj.subject.subjectName,
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
   {
   
    if(this.currentId)
    {

      
      this.classSubjectsList.find(s=>s.id==this.currentId).name= this.subjectObj.name;
      this.classSubjectsList.find(s=>s.id==this.currentId).subjectHours= this.subjectObj.subjectHours;
      this.classSubjectsList.find(s=>s.id==this.currentId).numberOfCoursesPerWeek= this.subjectObj.numberOfCoursesPerWeek;
      this.classSubjectsList.find(s=>s.id==this.currentId).inFinalResult= this.subjectObj.inFinalResult;
      this.classSubjectsList.find(s=>s.id==this.currentId).isMandatory= this.subjectObj.isMandatory;
      this.classSubjectsList.find(s=>s.id==this.currentId).isThereGPA= this.subjectObj.isThereGPA;
      this.classSubjectsList.find(s=>s.id==this.currentId).maxGPA= this.subjectObj.maxGPA;
      this.classSubjectsList.find(s=>s.id==this.currentId).id= this.subjectObj.id;
    }
    else
    {
     
      this.classSubjectsList.push(this.subjectObj);
      
    }
  }
   else
   {

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
  this.currentId='';
  this.schoolYearService.classSubjectsList.subscribe((res)=>{this.classSubjectsList=res;});
  localStorage.setItem('classSubjectsList', JSON.stringify(this.classSubjectsList));
  this.classSubjectsList=JSON.parse(localStorage.getItem('classSubjectsList'));
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

  this.schoolYearService.classSubjectsList.next([]);
  localStorage.removeItem('classSubjectsList');
}
editSubject(item)
{
   this.currentId=item.id;
  this.addSubjectModelOpened=true;
  this.bindOldSubject(item);

}
checkEvaluationType(e)
{
}
onCurriculumChange(curriculumId,gradeid)
{
  
   if(curriculumId)
    { 
      this.classId.enable();
      this.schoolYearService.getClassesInSpecificCurriculum(curriculumId).subscribe((res)=>{this.classList=res;})
    }
    else{
      this.classId.disable();
    }
}


checkExistInGPA(valueChecked)
{
 
  if(valueChecked)
  {
    console.log(valueChecked)
  this.maxGPA.setValidators([Validators.required]);
  this.maxGPA.updateValueAndValidity(); 
  }
  else
  {
  this.maxGPA.clearValidators();
  this.maxGPA.updateValueAndValidity(); 
  }

 
}
  checkMandatory(valueChecked)
  {
    if(valueChecked)
    {
      console.log(valueChecked)
    this.numberOfCoursesPerWeek.setValidators([Validators.required]);
    this.numberOfCoursesPerWeek.updateValueAndValidity(); 
    }
    else
    {
    this.numberOfCoursesPerWeek.clearValidators();
    this.numberOfCoursesPerWeek.updateValueAndValidity(); 
    }
  }
  goBack()
  {
    this.location.back()
  }

  openSubjectModel()
  {
   this.tittle='dashboard.SchoolYear.Add subject to this class';
   this.addSubjectModelOpened=true
   this.inFinalResult.setValue(true);
  }

  checkSubjectSelected(event)
  {
    console.log(event)
  
  }
}
