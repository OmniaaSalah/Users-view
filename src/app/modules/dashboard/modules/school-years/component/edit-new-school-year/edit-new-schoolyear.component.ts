import { Component, OnInit,OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take, map } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { SchoolYearsService } from '../../service/school-years.service';
import { faArrowRight ,faExclamationCircle,faCheck,faPlus,faClose } from '@fortawesome/free-solid-svg-icons';
import { IHeader, ISchoolYear } from 'src/app/core/Models';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { debounceTime, distinctUntilChanged, Subject, Subscription, takeUntil } from 'rxjs';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { Filtration } from 'src/app/core/classes/filtration';
import { paginationInitialState } from 'src/app/core/classes/pagination';
import { ArrayOperations } from 'src/app/core/classes/array';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { FileEnum } from 'src/app/shared/enums/file/file.enum';
import { Table } from 'primeng/table';
import { ExportService } from 'src/app/shared/services/export/export.service';

@Component({
  selector: 'app-edit-new-schoolyear',
  templateUrl: './edit-new-schoolyear.component.html',
  styleUrls: ['./edit-new-schoolyear.component.scss']
})
export class EditNewSchoolyearComponent implements OnInit,OnDestroy {
  curriculumsIds=[];
  topStudentIds=null;
  plusIcon=faPlus;
  rightIcon=faArrowRight;
  exclamtionIcon=faExclamationCircle;
  urlParameter: number=0;
  step:number = 1;
  addCurriculumsModelOpened:boolean=false;
  TopStudentsModelOpened:boolean=false;
  sendModelOpened:boolean=false;
  addClassModelOpened:boolean=false;
  isBtnLoading:boolean=false;
  isCurriculumBtnLoading:boolean=false;
  isSentYearBtnLoading:boolean=false;
  schoolYearObj;
  curriculumClassList=[];
  curriculumClassListLength=0;
  schoolYear;
  curriculumsList;
  topStudentsList;
  topStudantsListLength;
  precentageList=[];
  studentsList;
  nationalityList=[];
  schoolYearClass;
  weekendsList=[];
  annualCalendersList=[];
  schoolYearCurriculum;
  ngUnSubscribe =new Subject();
  searchInput = new FormControl('');
  nationalityId='';
  perecentge='';
  schoolYearFormGrp:FormGroup;
  subscription:Subscription;
  constructor(private headerService:HeaderService,private exportService: ExportService,private toastService: ToastService, private sharedService: SharedService,private schoolYearService:SchoolYearsService,private route: ActivatedRoute,private translate:TranslateService,private router:Router,private fb: FormBuilder) { 

    this.schoolYearFormGrp= fb.group({
      schoolYearArabicName:['',[Validators.required,Validators.maxLength(32)]],
      schoolYearEnglishName:['',[Validators.required,Validators.maxLength(32)]],
      schoolYearStartDate:['',[Validators.required]],
      schoolYearEndDate:['',[Validators.required]],
      weekendDays:['',[Validators.required]],
      ageDeterminationDate:['',[Validators.required]],
      annualHolidays:['',[Validators.required]],
     
      });
  }

  ngOnInit(): void {
 
  
    this.seachListener();
    this.schoolYearService.studentsList.subscribe((res)=>{this.studentsList=res})
    this.weekendsList= this.sharedService.weekDays;
    this.schoolYearService.getAnnualCalenders().subscribe((res)=>{this.annualCalendersList=res})
    this.schoolYearService.topStudantsListLength.subscribe((res)=>{this.topStudantsListLength=res;})
    this.sharedService.getAllNationalities().subscribe((res)=>{ this.nationalityList=res;})
    this.sharedService.getAllCurriculum().subscribe((res)=>{
      this.curriculumsList=res
      this.schoolYearService.curriculumList.next(this.curriculumsList)
    });
  
  
 
    this.route.paramMap.subscribe(param => {
      this.urlParameter = Number(param.get('schoolyearId'));
      if(this.urlParameter)
      { 
        this.getCurrentSchoolYear(this.urlParameter);

      if(localStorage.getItem('addedSchoolYear'))
      {
        this.step=2;
      }

      }
  
      
    });


    this.headerService.Header.next(

      {'breadCrump':[
        {label: this.translate.instant('breadcrumb.School Years List'),routerLink:'/dashboard/educational-settings/school-year/school-years-list',routerLinkActiveOptions:{exact: true}},
        {
        label: (this.urlParameter==0||this.urlParameter.toString()=='')? this.translate.instant('breadcrumb.Add New School Year'):this.translate.instant('breadcrumb.School Year Details'),
        routerLink: (this.urlParameter==0||this.urlParameter.toString()=='')? '/dashboard/educational-settings/school-year/new-school-year':'/dashboard/educational-settings/school-year/display-school-year/'+this.urlParameter
        }
      ],
      mainTitle:{main:(this.urlParameter==0||this.urlParameter.toString()=='')? this.translate.instant('breadcrumb.Add New School Year'):this.translate.instant('breadcrumb.School Year Details')}
      }
      );
      
   
     
  }

  get neededSchoolYear(){
    return this.schoolYearFormGrp.controls['neededSchoolYear'] as FormControl;
  }

  get schoolYearArabicName() {
    return this.schoolYearFormGrp.controls['schoolYearArabicName'] as FormControl;
  }
  get schoolYearEnglishName() {
    return this.schoolYearFormGrp.controls['schoolYearEnglishName'] as FormControl;
  }

  get schoolYearStartDate() {
    return this.schoolYearFormGrp.controls['schoolYearStartDate'] as FormControl;
  }

  get schoolYearEndDate() {
    return this.schoolYearFormGrp.controls['schoolYearEndDate'] as FormControl;
  }

  get weekendDays() {
    return this.schoolYearFormGrp.controls['weekendDays'] as FormControl;
  }

  get ageDeterminationDate() {
    return this.schoolYearFormGrp.controls['ageDeterminationDate'] as FormControl;
  }
  get annualHolidays() {
    return this.schoolYearFormGrp.controls['annualHolidays'] as FormControl;
  }

  get curriculum() {
    return this.schoolYearFormGrp.controls['curriculum'] as FormControl;
  }
  get activateAge() {
    return this.schoolYearFormGrp.controls['activateAge'] as FormControl;
  }
  get ageRequirementToRegisterFromInsideCountry() {
    return this.schoolYearFormGrp.controls['ageRequirementToRegisterFromInsideCountry'] as FormControl;
  }
  get ageRequirementToRegisterFromOutsideCountry() {
    return this.schoolYearFormGrp.controls['ageRequirementToRegisterFromOutsideCountry'] as FormControl;
  }

  get class() {
    return this.schoolYearFormGrp.controls['class'] as FormControl;
  }
  get knownSubjectList() {
    return this.schoolYearFormGrp.controls['knownSubjectList'] as FormControl;
  }
  get subjectStatusInFinalTotal() {
    return this.schoolYearFormGrp.controls['subjectStatusInFinalTotal'] as FormControl;
  }
  get subjectStatus() {
    return this.schoolYearFormGrp.controls['subjectStatus'] as FormControl;
  }
  save()
  {
  }

  getCurrentSchoolYear(urLParameter)
  {
    this.schoolYearService.getSchoolYearByID(urLParameter).subscribe((res)=>{
      this.schoolYear=res.result;
      if(this.schoolYear)
      {this.bindOldSchoolYear(this.schoolYear);}
      })
  }

 bindOldSchoolYear(schoolYear)
 {
   
  this.schoolYearFormGrp.patchValue({
    schoolYearArabicName:schoolYear?.schoolYearName.ar, 
    schoolYearEnglishName:schoolYear?.schoolYearName.en, 
    schoolYearStartDate: new Date(schoolYear?.schoolYearStartDate),
    schoolYearEndDate:new Date(schoolYear?.schoolYeaEndDate),
    ageDeterminationDate:schoolYear?.ageDeterminationDate.split('T')[0],
    weekendDays:schoolYear?.weekendDays,
    annualHolidays:schoolYear?.annualCalenders
  });
  this.getCurriculumsInSchoolYear();

 }

  getCurriculumsInSchoolYear()
  {
    
    this.schoolYearService.getCurriculumsInSchoolYear(this.urlParameter).subscribe((res)=>{
   
       this.curriculumClassList=res;
      
       this.curriculumClassList.forEach(element => {
       this.curriculumsIds.push(element.curriculumId)
     });
       
     
    })
  }

 sendSchoolYear()
 {
        this.isSentYearBtnLoading=true;

        this.schoolYearService.editSchoolYearStatus(Number(this.urlParameter)).subscribe((res)=>{
            this.getCurrentSchoolYear(this.urlParameter);
            this.isSentYearBtnLoading=false;
            this.toastService.success(this.translate.instant('dashboard.SchoolYear.old SchoolYear edited Successfully'));

        },(err)=>{
          this.isSentYearBtnLoading=false;
          this.toastService.error(this.translate.instant('dashboard.SchoolYear.error,please try again'));
        })
     

 }

 saveDraftYear()
 {
 
  this.schoolYearObj={
    'schoolYearName':{ar:this.schoolYearFormGrp.value.schoolYearArabicName,en:this.schoolYearFormGrp.value.schoolYearEnglishName},
    'schoolYearStartDate':this.schoolYearFormGrp.value.schoolYearStartDate,
    'schoolYearEndDate': this.schoolYearFormGrp.value.schoolYearEndDate,
    'annualHoliday': this.schoolYearFormGrp.value.annualHolidays,
    'ageDeterminationDate': this.schoolYearFormGrp.value.ageDeterminationDate,
    'weekendDays':this.schoolYearFormGrp.value.weekendDays,
   };
      if(this.urlParameter)
    {
      this.schoolYearObj.id=this.urlParameter;
    this.schoolYearService.editSchoolYear(this.schoolYearObj).subscribe((res)=>{
      this.isBtnLoading=false;
      if(res.statusCode!='BadRequest')
      {
        this.step=2;
        this.toastService.success(this.translate.instant('dashboard.SchoolYear.old SchoolYear edited Successfully'));

      }
      else if(res.statusCode=='BadRequest')
      {
        this.toastService.error(this.translate.instant('dashboard.SchoolYear.SchoolYear already exist'));
      }
    },(err)=>{
      this.isBtnLoading=false;
      this.toastService.error(this.translate.instant('dashboard.SchoolYear.error,please try again'));
    })
    }
    else
    {
    this.schoolYearService.addDraftSchoolYear(this.schoolYearObj).subscribe((res)=>{
    
      this.isBtnLoading=false;

      if(res.statusCode!='BadRequest')
      {
   
        localStorage.setItem('addedSchoolYear',JSON.stringify(res.result));
        this.urlParameter=res.result.id;
        this.toastService.success(this.translate.instant('dashboard.SchoolYear.New SchoolYear added Successfully'));
        this.router.navigate(['/dashboard/educational-settings/school-year/display-school-year/'+this.urlParameter]);
        // this.step=2; 

      }
      else if(res.statusCode=='BadRequest')
      {
        this.toastService.error(this.translate.instant('dashboard.SchoolYear.SchoolYear already exist'));
      }
    },(err)=>{
      this.isBtnLoading=false;
      this.toastService.error(this.translate.instant('dashboard.AnnualHoliday.error,please try again'));
    })
    }

 }
 selectTopStudents(schoolYearId,curriculumId,gradeId)
 {
  this.topStudentIds=[];

    this.schoolYearService.getTopStudentsInSpecificGrade(schoolYearId,curriculumId,gradeId).subscribe((res)=>{
  

      res.forEach(element => {
        this.topStudentIds.push(element.id)
      });
      this.schoolYearService.getAllStudentsInSpecificGrade(schoolYearId,gradeId).subscribe((res)=>{
        this.studentsList=res;
        this.schoolYearService.studentsList.next(this.studentsList);
        this.studentsList.forEach(element => {
          this.precentageList.push(element.percentage)
        });
  
     });

  });



 }
 getTopStudentsNumber()
 {
 
  if(this.topStudentIds.length>10)
  {
    this.topStudentIds.pop();
    this.toastService.error(this.translate.instant('dashboard.SchoolYear.you can select 10 top students at max'));
  }
  
 }
 saveTopStudent(curriculmId,gardeId)
 {
 

   this.schoolYearService.addTopStudentsToSpecificGrade(
    {'schoolYearId':this.urlParameter,'curriculumId':curriculmId,'gradeId':gardeId,'students':this.topStudentIds}
    ).subscribe((res)=>{
        this.toastService.success(this.translate.instant('dashboard.SchoolYear.Top Students added Successfully'));
        this.openRow(this.schoolYearCurriculum.curriculumId)
      },(err)=>{ this.toastService.error(this.translate.instant('dashboard.AnnualHoliday.error,please try again'));})


 }
 seachListener(){
  this.searchInput.valueChanges
  .pipe(
    debounceTime(1200),
    distinctUntilChanged(),
    takeUntil(this.ngUnSubscribe)
  )
  .subscribe(val =>{
    this.onSearch();
  })
}
 onSearch()
 {
  if(this.schoolYear?.schoolYearStatus.name.en=='Finished')
  {
  
    this.schoolYearService.studentsList.subscribe((res)=>{this.studentsList=res;})
    let keyWord=this.searchInput.value;
    if(keyWord)
    {

      this.studentsList = this.studentsList.filter((val) =>
      val.name.ar.toLowerCase().includes(keyWord)
      );
    }
    else{
      this.schoolYearService.studentsList.subscribe((res)=>{this.studentsList=res})
    }
  }
  else
  {
    this.schoolYearService.curriculumList.subscribe((res)=>{this.curriculumsList=res})
    let keyWord=this.searchInput.value;
    if(keyWord)
    {

      this.curriculumsList = this.curriculumsList.filter((val) =>
      val.name.ar.toLowerCase().includes(keyWord)
      );
    }
    else{
      this.schoolYearService.curriculumList.subscribe((res)=>{this.curriculumsList=res})
    }
  }

 }
 getStudentsFiltration()
 {
  this.schoolYearService.studentsList.subscribe((res)=>{this.studentsList=res})

  if(this.nationalityId&&this.perecentge)
  {
    this.studentsList = this.studentsList.filter((val) =>

    val.nationality.id==this.nationalityId && val.percentage==this.perecentge

   );
  }
  else if(!this.nationalityId&&this.perecentge)
  {
    this.studentsList = this.studentsList.filter((val) =>

    val.percentage==this.perecentge

   );
  }
  else if(this.nationalityId&&!this.perecentge)
  {
    this.studentsList = this.studentsList.filter((val) =>

    val.nationality.id==this.nationalityId

   );
  }
  else
  {
  this.schoolYearService.studentsList.subscribe((res)=>{this.studentsList=res})
  }
   
 }
 ngOnDestroy(): void {



 }
 openRow(curriculumId)
 {

    this.curriculumClassList.find(c=>c.curriculumId==curriculumId).classTopStudentList=[];
    this.curriculumClassList.find(c=>c.curriculumId==curriculumId).loading=true;
    this.schoolYearService.getClassesInCurriculumsInSchoolYear(this.urlParameter,curriculumId).subscribe((res)=>{
    this.curriculumClassList.find(c=>c.curriculumId==curriculumId).loading=false;
    this.curriculumClassList.find(c=>c.curriculumId==curriculumId).classTopStudentList=res;
   },(err)=>{ this.curriculumClassList.find(c=>c.curriculumId==curriculumId).loading=false;})

 }
closeRow()
{

}



  saveCurriculumsIds()
  {
      this.isCurriculumBtnLoading=true;
      this.schoolYearService.saveCurriculumsToSchoolYear(this.urlParameter,this.curriculumsIds).subscribe((res)=>{
        this.isCurriculumBtnLoading=false;
        this.addCurriculumsModelOpened=false;
        this.toastService.success(this.translate.instant('dashboard.SchoolYear.Curriculums added Successfully'));
        this.getCurriculumsInSchoolYear(); 
      },(err)=>{
        this.isCurriculumBtnLoading=false;
        this.toastService.error(this.translate.instant('dashboard.AnnualHoliday.error,please try again'));
      })
  
  
  }

  saveSchoolYear()
  {
    this.isBtnLoading=true;
   this.saveDraftYear();
  }
 
  checkSchoolYearStatus()
  {
    if(this.schoolYear?.schoolYearStatus.name.en=='Finished'||this.schoolYear?.schoolYearStatus.name.en=='Current'||this.urlParameter)
    {
      this.step=2;
    }
  }

}
