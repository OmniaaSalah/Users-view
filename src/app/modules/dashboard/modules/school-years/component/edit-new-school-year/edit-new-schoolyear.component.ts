import { Component, OnInit,OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { SchoolYearsService } from '../../service/school-years.service';
import { faArrowRight ,faExclamationCircle,faCheck,faPlus } from '@fortawesome/free-solid-svg-icons';
import { IHeader, ISchoolYear } from 'src/app/core/Models';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-edit-new-schoolyear',
  templateUrl: './edit-new-schoolyear.component.html',
  styleUrls: ['./edit-new-schoolyear.component.scss']
})
export class EditNewSchoolyearComponent implements OnInit,OnDestroy {
  checkIcon= faCheck;
  plusIcon=faPlus;
  cities: string[];
  curriculumClassList;
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
  studentsList;
  nationalityList;
  schoolYearClass;
  weekendsList;
  annualCalendersList;
  schoolYearCurriculum;
  ngUnSubscribe =new Subject();
  searchInput = new FormControl('');
  constructor(private headerService:HeaderService, private sharedService: SharedService,private schoolYearService:SchoolYearsService,private route: ActivatedRoute,private translate:TranslateService,private router:Router,private fb: FormBuilder) { 

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
            this.schoolYearService.curriculumClassList.next(JSON.parse(localStorage.getItem('curriculumClassList')));
          }
        this.schoolYearService.curriculumClassList.subscribe((res)=>{
        
          this.curriculumClassList=res;
          this.curriculumClassList.forEach(curriculumClass => {
            this.curriculumsList.forEach(curriculum=> {
              if(curriculumClass.curriculmName.id==curriculum.id)
              {
                curriculum.isSelected=true;
              }
            });
            this.getCurriculumsAdded();
          });
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
    this.studentsList=this.schoolYearService.studentsList;
    this.studentsList=this.studentsList.map(student=>{return {
      'id':student.id,
      'studentName':student.studentName,
      'nationality':student.nationality,
      'precantage':student.precantage,
      'isSelected':false
      }});
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
        this.schoolYearService.schoolYearName.next(this.schoolYear.schoolYearName);
        this.schoolYearService.schoolYearStatus.next(this.schoolYear.status);
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
  this.schoolYearService.getCurriculumsInSchoolYear(this.urlParameter).subscribe((res)=>{this.curriculumClassList=res})
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
 }

 saveCurriculum()
 {


  this.curriculumsList.forEach(item => {
          if(item.isSelected)
          {
            let available=1;
            
            this.curriculumClassList.forEach(element => {
              if(element.curriculmName.id==item.id)
              {
                      available=0;
                     
              }
            
            });
            if(available==1)
            {
           
              this.curriculumClassList.push({'id':item.id,'curriculmName':item,'class':[]})
            }
          }
          else
          {
          
            this.curriculumClassList.forEach(element => {
              if(element.curriculmName.id==item.id)
              {
         
                if(this.curriculumClassList.length>1)
                   {this.curriculumClassList.splice(element.id-1, 1);}
                else
                  {this.curriculumClassList=[];}
              }
            
            });
          }
  });

  this.curriculumClassList=this.curriculumClassList.map((curriculam,i)=>{return {
    'id':i+1,
    'curriculmName':curriculam.curriculmName,
    'class':curriculam.class
    }});
 
    this.schoolYearService.curriculumClassList.next(this.curriculumClassList);
    this.schoolYearService.curriculumClassListLength.next(this.curriculumClassListLength);
  
  
 }
 sendSchoolYear()
 {
  this.schoolYearService.curriculumClassList.next([]);
  localStorage.removeItem('curriculumClassList');
  this.schoolYearService.classSubjectsList.next([]);
  localStorage.removeItem('classSubjectsList');
 }
 selectTopStudents()
 {
     //caling api to get all stuudents in class by id of class
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
 saveTopStudent()
 {
  this.topStudentsList=[];

  this.studentsList.forEach(student => {
    if(student.isSelected==true)
    {
      this.topStudentsList.push(student)
    }

   });
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
}
