import { Component, OnInit,OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { SchoolYearsService } from '../../service/school-years.service';
import { faArrowRight ,faExclamationCircle,faCheck,faPlus,faClose } from '@fortawesome/free-solid-svg-icons';
import { IHeader, ISchoolYear } from 'src/app/core/Models';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
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
  checkIcon= faCheck;
  faClose=faClose;
  plusIcon=faPlus;
  cities: string[];
  schoolYearObj;

  curriculumClassList;
  // classTopStudentList=[];
  curriculumClassListLength;
  schoolYearList:ISchoolYear[]=[];
  schoolYear;
  schoolYearFormGrp:FormGroup;
  rightIcon=faArrowRight;
  exclamtionIcon=faExclamationCircle;
  urlParameter: number=0;
  step:number = 1;
  addCurriculumsModelOpened:boolean=false;
  TopStudentsModelOpened:boolean=false;
  sendModelOpened:boolean=false;
  addClassModelOpened:boolean=false;
  curriculumsList;
  topStudentsList;

  topStudantsListLength;
  precentage;
  studentsList=[];
  nationalityList;
  schoolYearClass;
  weekendsList;
  annualCalendersList;
  schoolYearCurriculum;
  ngUnSubscribe =new Subject();
  searchInput = new FormControl('');
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
 
    this.curriculumClassList=[];
    this.seachListener();
    this.weekendsList= this.sharedService.weekDays;
    this.schoolYearService.getAnnualCalenders().subscribe((res)=>{this.annualCalendersList=res})
    this.schoolYearService.schoolYearClass.subscribe((res)=>{this.schoolYearClass=res});
    this.schoolYearService.schoolYearCurriculum.subscribe((res)=>{this.schoolYearCurriculum=res});
   this.schoolYearService.topStudantsListLength.subscribe((res)=>{this.topStudantsListLength=res;})
    this.sharedService.getAllCurriculum().subscribe((res)=>{
      this.curriculumsList=res.map(curriculam=>{return {
        'id':curriculam.id,
        'name':{'ar':curriculam.name.ar,'en':curriculam.name.en},
        'isSelected':false
        }});
       if(localStorage.getItem('curriculumClassList'))
          {
            console.log("yes")
            this.schoolYearService.curriculumClassList.next(JSON.parse(localStorage.getItem('curriculumClassList')));
          }
        this.schoolYearService.curriculumClassList.subscribe((res)=>{
        
          this.curriculumClassList=res;
          console.log(this.curriculumClassList)
          // this.curriculumClassList.forEach(curriculumClass => {
          //   this.curriculumsList.forEach(curriculum=> {
          //     if(curriculumClass.curriculumId==curriculum.id)
          //     {
          //       curriculum.isSelected=true;
          //     }
          //   });
          //   this.getCurriculumsAdded();
       
          // });
          this.checkCurriculums();
          //   if(localStorage.getItem('curriculumClassList'))
          //   {
          
          //     localStorage.removeItem('curriculumClassList');
          //     localStorage.setItem('curriculumClassList', JSON.stringify(this.curriculumClassList));
          //     this.curriculumClassList=JSON.parse(localStorage.getItem('curriculumClassList'));
          //   }
          //   else
          //   {
           
          //     localStorage.setItem('curriculumClassList', JSON.stringify(this.curriculumClassList));
          //     this.curriculumClassList=JSON.parse(localStorage.getItem('curriculumClassList'));
          // }
   
        });
        this.schoolYearService.curriculumClassListLength.subscribe((res)=>{this.curriculumClassListLength=res;})
        if(localStorage.getItem('curriculumsList'))
        {
        
          localStorage.removeItem('curriculumsList');
          localStorage.setItem('curriculumsList', JSON.stringify(this.curriculumsList));
          
        }
        else
        {
      
          localStorage.setItem('curriculumsList', JSON.stringify(this.curriculumsList));
        
       }
        this.schoolYearService.curriculumList.next(this.curriculumsList)
        this.schoolYearService.curriculumList.subscribe((res)=>{
          this.curriculumsList=res; 
        
        
        });
  });
 
 


  this.sharedService.getAllNationalities().subscribe((res)=>{ this.nationalityList=res;})

    this.precentage=this.schoolYearService.precentage;
  
    this.schoolYearList=this.schoolYearService.schoolYearList;
    this.route.paramMap.subscribe(param => {
      this.urlParameter = Number(param.get('schoolyearId'));
      // this.schoolYearList.forEach(element => {
      //   if(element.id==this.urlParameter)
      //   {
      //     this.schoolYear=element;
      //     this.schoolYearService.schoolYearName.next(this.schoolYear.schoolYearName);
      //     this.schoolYearService.schoolYearStatus.next(this.schoolYear.status);
      //     this.bindOldSchoolYear(this.schoolYear);

      //   }
        
      // });
      if(this.urlParameter)
     { this.schoolYearService.getSchoolYearByID(this.urlParameter).subscribe((res)=>{
        this.schoolYear=res.result;
        this.bindOldSchoolYear(this.schoolYear);
      })
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

 bindOldSchoolYear(schoolYear)
 {
   
  this.schoolYearFormGrp.patchValue({
    schoolYearArabicName:schoolYear.schoolYearName.ar, 
    schoolYearEnglishName:schoolYear.schoolYearName.en, 
    schoolYearStartDate:schoolYear.schoolYearStartDate.split('T')[0],
    schoolYearEndDate:schoolYear.schoolYeaEndDate.split('T')[0],
    ageDeterminationDate:schoolYear.ageDeterminationDate.split('T')[0],
    weekendDays:schoolYear.weekendDays,
    annualHolidays:schoolYear.annualCalenders
  });
  this.schoolYearService.getCurriculumsInSchoolYear(this.urlParameter).subscribe((res)=>{
    console.log(res)
    console.log(localStorage.getItem('curriculumClassList'))
    if(!localStorage.getItem('curriculumClassList'))
    {
       console.log(res)
      this.curriculumClassList=res.map(curriculumClass=>{return {
        'curriculumId':curriculumClass.curriculumId,
        'name':{'ar':curriculumClass.name?.ar,'en':curriculumClass.name?.en},
        'gradesCount':curriculumClass.gradesCount,
        'class':[],
        
         }});
         console.log(this.curriculumClassList)
        // this.curriculumClassList=res;
        localStorage.setItem('curriculumClassList', JSON.stringify(this.curriculumClassList));
        this.schoolYearService.curriculumClassList.next( this.curriculumClassList);
    }
    console.log(this.curriculumClassList)
    // this.checkCurriculums();
  })
 }
 getCurriculumsAdded()
 {
  this.curriculumClassListLength=0;
  this.curriculumsList.forEach(element => {
  if(element.isSelected==true)
  {
    this.curriculumClassListLength++;
  }
  });
  this.schoolYearService.curriculumClassListLength.next(this.curriculumClassListLength);
  localStorage.removeItem('curriculumsList');
  localStorage.setItem('curriculumsList', JSON.stringify(this.curriculumsList));
  console.log(this.curriculumsList)
 }

 saveCurriculum()
 {


  this.curriculumsList.forEach(item => {
          if(item.isSelected)
          {
            let available=1;
            console.log(this.curriculumClassList)
            this.curriculumClassList.forEach(element => {
              if(element.curriculumId==item.id)
              {
                      available=0;
                     console.log("no")
              }
            
            });
            if(available==1)
            {
           
              this.curriculumClassList.push({'curriculumId':item.id,'name':item.name,'gradesCount':0,'class':[]})
              console.log(this.curriculumClassList)
            }
          }
          else
          {
          
            this.curriculumClassList.forEach(element => {
              if(element.curriculumId==item.id)
              {
         
                if(this.curriculumClassList.length>1)
                   {this.curriculumClassList.splice(element.id-1, 1);}
                else
                  {this.curriculumClassList=[];}
              }
            
            });
          }
  });
console.log(this.curriculumClassList)
  // this.curriculumClassList=this.curriculumClassList.map((curriculam,i)=>{return {
  //   'curriculumId':curriculam.curriculumId,
  //   'name':curriculam.name,
  //   'gradeCount':curriculam.gradeCount
  //   }});
              localStorage.removeItem('curriculumClassList');
              localStorage.setItem('curriculumClassList', JSON.stringify(this.curriculumClassList));
              this.curriculumClassList=JSON.parse(localStorage.getItem('curriculumClassList'));
    this.schoolYearService.curriculumClassList.next(this.curriculumClassList);
    this.schoolYearService.curriculumClassListLength.next(this.curriculumClassListLength);
  
  
 }
 sendSchoolYear()
 {
  // this.schoolYearService.curriculumClassList.next([]);
  // localStorage.removeItem('curriculumClassList');
  // this.schoolYearService.classSubjectsList.next([]);
  // localStorage.removeItem('classSubjectsList');
      this.createSchoolYearObj();
      if(this.urlParameter)
      {
        console.log("edit")
        this.schoolYearObj.id=this.urlParameter;
        this.schoolYearService.editSentSchoolYear(this.schoolYearObj).subscribe((res)=>{
          if(res.statusCode!="BadRequest")
          {
            this.toastService.success(this.translate.instant('dashboard.SchoolYear.old SchoolYear edited Successfully'));
          // this.router.navigate(['/dashboard/educational-settings/school-year/school-years-list'])
          }
          else if(res.statusCode=="BadRequest")
          {
            this.toastService.error(this.translate.instant('dashboard.SchoolYear.SchoolYear already exist'));
          }
        },(err)=>{
          this.toastService.error(this.translate.instant('dashboard.SchoolYear.error,please try again'));
        })
      }
      else
      {
        this.schoolYearService.addSentSchoolYear(this.schoolYearObj).subscribe((res)=>{
          if(res.statusCode!="BadRequest")
          {
            this.toastService.success(this.translate.instant('dashboard.SchoolYear.New SchoolYear added Successfully'));
            // this.router.navigate(['/dashboard/educational-settings/school-year/school-years-list'])
          }
          else if(res.statusCode=="BadRequest")
          {
            this.toastService.error(this.translate.instant('dashboard.SchoolYear.SchoolYear already exist'));
          }
         
        },(err)=>{
          this.toastService.error(this.translate.instant('dashboard.SchoolYear.error,please try again'));
        })
      }
console.log(this.schoolYearObj)
 }

 saveDraftYear()
 {
      this.createSchoolYearObj();
      if(this.urlParameter)
      {
        this.schoolYearObj.id=this.urlParameter;
      this.schoolYearService.editDraftSchoolYear(this.schoolYearObj).subscribe((res)=>{
        if(res.statusCode!='BadRequest')
        {
          this.toastService.success(this.translate.instant('dashboard.SchoolYear.old SchoolYear edited Successfully'));
        // this.router.navigate(['/dashboard/educational-settings/school-year/school-years-list'])
        }
        else if(res.statusCode=='BadRequest')
        {
          this.toastService.error(this.translate.instant('dashboard.SchoolYear.SchoolYear already exist'));
        }
      },(err)=>{
        this.toastService.error(this.translate.instant('dashboard.SchoolYear.error,please try again'));
      })
      }
      else
      {
      this.schoolYearService.addDraftSchoolYear(this.schoolYearObj).subscribe((res)=>{
        console.log(res)
        if(res.statusCode!='BadRequest')
        {
          this.toastService.success(this.translate.instant('dashboard.SchoolYear.New SchoolYear added Successfully'));
          // this.router.navigate(['/dashboard/educational-settings/school-year/school-years-list'])
        }
        else if(res.statusCode=='BadRequest')
        {
          this.toastService.error(this.translate.instant('dashboard.SchoolYear.SchoolYear already exist'));
        }
      },(err)=>{
        this.toastService.error(this.translate.instant('dashboard.AnnualHoliday.error,please try again'));
      })
      }

 }
 selectTopStudents(schoolYearId,curriculumId,gradeId)
 {
     //caling api to get all stuudents in class by id of class

     this.schoolYearService.getAllStudentsInSpecificGrade(gradeId).subscribe((res)=>{
      this.studentsList=res;
      this.studentsList=this.studentsList?.map(student=>{return {
        'id':student.id,
        'name':student.name,
        'nationality':student.nationality,
        'precantage':student.percentage,
        'isSelected':false
        }});
      this.schoolYearService.getTopStudentsInSpecificGrade(schoolYearId,curriculumId,gradeId).subscribe((res)=>{
        console.log(res)
        res.forEach(top => {
          this.studentsList.forEach(student => {
            if(top.id==student.id)
            {
              student.isSelected=true;
            }
          });
        });
        this.getTopStudentsNumber();
      })  
    });

 }
 getTopStudentsNumber()
 {
  this.schoolYearService.schoolYearClass.next(this.schoolYearClass);
  this.schoolYearService.schoolYearCurriculum.next(this.schoolYearCurriculum);
  this.topStudantsListLength=0
  this.studentsList.forEach(student => {
    if(student.isSelected==true)
    {
        this.topStudantsListLength+=1;
    }
  });
  this.schoolYearService.topStudantsListLength.next(this.topStudantsListLength);
 }
 saveTopStudent(curriculmId,gardeId)
 {
  console.log(curriculmId,gardeId,this.urlParameter)
  this.topStudentsList=[];

  this.studentsList.forEach(student => {
    if(student.isSelected==true)
    {
      this.topStudentsList.push(student.id)
    }

   });
   console.log(this.topStudentsList)

   this.schoolYearService.addTopStudentsToSpecificGrade(
    {'schoolYearId':this.urlParameter,'curriculumId':curriculmId,'gradeId':gardeId,'students':this.topStudentsList}
    ).subscribe((res)=>{
        this.toastService.success(this.translate.instant('dashboard.SchoolYear.Top Students added Successfully'));
        this.curriculumClassList.find(c=>c.curriculumId==curriculmId).classTopStudentList.find(c=>c.gradeId==gardeId).topStudentsNumber=this.topStudentsList.length;
        localStorage.removeItem('curriculumClassList');
        localStorage.setItem('curriculumClassList', JSON.stringify(this.curriculumClassList));
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
  this.curriculumsList=JSON.parse(localStorage.getItem('curriculumsList'));
   let keyWord=this.searchInput.value;
   if(keyWord)
  {

    this.curriculumsList = this.curriculumsList.filter((val) =>
    val.name.ar.toLowerCase().includes(keyWord)
    );
  }
  else{
    this.curriculumsList=JSON.parse(localStorage.getItem('curriculumsList'));
  }
  this.schoolYearService.curriculumList.next(this.curriculumsList);
 }
 ngOnDestroy(): void {


 }
 openRow(curriculumId)
 {
  console.log(this.curriculumClassList.find(c=>c.curriculumId==curriculumId).classTopStudentList?.length)
  if(!this.curriculumClassList.find(c=>c.curriculumId==curriculumId).classTopStudentList?.length)
  {
    this.curriculumClassList.find(c=>c.curriculumId==curriculumId).classTopStudentList=[];
    this.curriculumClassList.find(c=>c.curriculumId==curriculumId).loading=true;
    this.schoolYearService.getClassesInCurriculumsInSchoolYear(this.urlParameter,curriculumId).subscribe((res)=>{
    this.curriculumClassList.find(c=>c.curriculumId==curriculumId).loading=false;
    this.curriculumClassList.find(c=>c.curriculumId==curriculumId).classTopStudentList=res;
    this.saveClassesInCurriculums(curriculumId);
   },(err)=>{ this.curriculumClassList.find(c=>c.curriculumId==curriculumId).loading=false;})
  }
  else
  {
    
  }

  
 }
closeRow()
{

}
checkCurriculums()
{
  console.log(this.curriculumClassList);
  console.log(this.curriculumsList);
  this.curriculumClassList.forEach(element => {
    this.curriculumsList.find(c=>c.id==element.curriculumId).isSelected=true;
    console.log(element.curriculumId)
  });
  localStorage.removeItem('curriculumsList');
  localStorage.setItem('curriculumsList', JSON.stringify(this.curriculumsList));
  this.getCurriculumsAdded();
  console.log(this.curriculumsList);
}

  saveClassesInCurriculums(curriculumId)
 {
  this.curriculumClassList.forEach(element => {
    if(element.curriculumId==curriculumId)
    {  if(element.class.length==0)
      {
        element.class.push(...this.curriculumClassList.find(c=>c.curriculumId==element.curriculumId).classTopStudentList);
        localStorage.setItem('curriculumClassList', JSON.stringify(this.curriculumClassList));
        this.schoolYearService.curriculumClassList.next( this.curriculumClassList);
        console.log(this.curriculumClassList)
      }
    }
  });


 }

 createSchoolYearObj()
 {
  this.curriculumsList=this.curriculumsList.map(curriculum=>{return {'id':curriculum.id,'name':curriculum.name}});
  this.schoolYearObj={}

  this.schoolYearObj={
    'schoolYearName':{ar:this.schoolYearFormGrp.value.schoolYearArabicName,en:this.schoolYearFormGrp.value.schoolYearEnglishName},
    'schoolYearStartDate':this.schoolYearFormGrp.value.schoolYearStartDate,
    'schoolYearEndDate': this.schoolYearFormGrp.value.schoolYearEndDate,
    'annualHoliday': this.schoolYearFormGrp.value.annualHolidays,
    'ageDeterminationDate': this.schoolYearFormGrp.value.ageDeterminationDate,
    'weekendDays':this.schoolYearFormGrp.value.weekendDays,
   };
   this.schoolYearObj.curriculumClassList=JSON.parse(localStorage.getItem('curriculumClassList'))?.map(curriculumClass=>{return {
    'curriculmName':{id:curriculumClass.curriculumId,name:curriculumClass.name},
    'classes':curriculumClass.class?.map(grade=>{return {
      'name':{id:grade.classId,name:grade.name},
      'relatedCurriculum':this.curriculumsList.find(c=>c.id==grade.relatedCurriculumId),
      'minmumSubjectNumbers':grade.minmumSubjectNumbers,
      'minAgeInsideCountryFrom': grade.minAgeInsideCountryFrom,
      'minAgeInsideCountryTo': grade.minAgeInsideCountryTo,
      'minAgeOutsideCountryFrom': grade.minAgeOutsideCountryFrom,
      'minAgeOutsideCountryTo':grade.minAgeOutsideCountryTo,
      'activateAge': grade.activateAge,
      'subjectList': grade.subjectList?.map(subject=>{return{
        'name':{id:subject.id,name:subject.name},
        'subjectHours':subject.subjectHours,
        // 'numberOfCoursesPerWeek':subject.numberOfCoursesPerWeek,
        'numberOfCoursesPerWeek':5,
        'inFinalResult': subject.inFinalResult,
        // 'isMandatory': subject.isMandatory,
        'isMandatory': false,
        'isThereGPA': subject.isThereGPA,
        'maxGPA':subject.maxGPA }})
       }})
     }});

     localStorage.removeItem('curriculumClassList');
     localStorage.removeItem('curriculumsList');
 }


}
