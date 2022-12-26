import { Injectable } from '@angular/core';
import { ISchoolYear } from 'src/app/core/Models/school-years/school-year';
import { take,finalize } from 'rxjs';
import { Filter } from 'src/app/core/Models/filter/filter';
import { BehaviorSubject } from 'rxjs';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';
import { TranslateService } from '@ngx-translate/core';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';

@Injectable({
  providedIn: 'root'
})
export class SchoolYearsService {
  curriculumList=new BehaviorSubject<[]>([]);
  schoolYearName=new BehaviorSubject<string>("");
  schoolYearStatus=new BehaviorSubject<string>("");
  schoolYearClass=new BehaviorSubject<string>("");
  schoolYearCurriculum=new BehaviorSubject<string>("");
  curriculumClassListLength=new BehaviorSubject<number>(0);
  curriculumClassList=new BehaviorSubject<[]>([]);
  classSubjectsList=new BehaviorSubject<[]>([]);
  topStudantsListLength=new BehaviorSubject<number>(0);
  cities: string[];
  schoolYearList:ISchoolYear[]=[];
 classList;
 precentage;
  // classSubjectsList;
  topStudentsList;
  studentsList;
  schoolYearsStatus;
  constructor(private http:HttpHandlerService,private translate:TranslateService, private loaderService: LoaderService) {


    // this.curriculumClassList=[
    //   {'id':1,'class':[{id:1,name:'أول أعدادي',TopStudentsNumber:3},{id:2,name:'ثاني أعدادي',TopStudentsNumber:9},{id:3,name:'ثالث أعدادي',TopStudentsNumber:0}],'curriculmName':{id:9 ,name:{ar:'الصيني',en:'chiness'}}},
    //   {'id':2,'class':[{id:1,name:'أول ثانوي',TopStudentsNumber:10},{id:2,name:'ثاني ثانوي',TopStudentsNumber:2}],'curriculmName':{id:8 ,name:{ar:'الاسترالي',en:'Iustrali'}}},
    //   {'id':3,'class':[{id:1,name:'أول أبتدائي',TopStudentsNumber:0},{id:2,name:'ثاني أبتدائي',TopStudentsNumber:4}],'curriculmName':{id:5 ,name:{ar:'الهندي',en:'indian'}}},
    // ];
    // this.classSubjectsList=[
    //   {'id':1,'subjectName':'علوم','subjectHours':12,'weekCoursesNumber':4,'inFinalResult':true,'inGPA':false,'maxGPA':70},
    //   {'id':2,'subjectName':'رياضة','subjectHours':21,'weekCoursesNumber':7,'inFinalResult':true,'inGPA':true,'maxGPA':80},
    //   {'id':3,'subjectName':'انجلش','subjectHours':9,'weekCoursesNumber':3,'inFinalResult':false,'inGPA':true,'maxGPA':60}
    // ];
    this.studentsList=[
      {'id':1,'studentName':'أمنية','nationality':{"id": 1,"name":{"en": "Egypt","ar": "مصر"}},'precantage':'80%'},
      {'id':2,'studentName':'نهي','nationality':{"id": 1,"name":{"en": "Egypt","ar": "مصر"}},'precantage':'90%'},
      {'id':3,'studentName':'مني','nationality': {"id": 3,"name":{"en": "UAE","ar": "الامارات العربية المتحدة"}},'precantage':'100%'},
      {'id':4,'studentName':'ميادة','nationality':{"id": 4,"name":{"en": "Moroco","ar": "المملكه المغربية"}},'precantage':'80%'},
      {'id':5,'studentName':'أروي','nationality':{"id": 1,"name":{"en": "Egypt","ar": "مصر"}},'precantage':'85%'},
      {'id':6,'studentName':'نورا','nationality':{"id": 3,"name":{"en": "UAE","ar": "الامارات العربية المتحدة"}},'precantage':'50%'}
    ];

    this.precentage=["50%","60%","70%","80%","85%","90%","100%"]
  
    this.cities = [
      "2022",
       "Rome",
       "London",
       "Istanbul",
       "Paris"
  ];
  this.classList=[{'id':1,'name':{'ar':'كيجي وان','en':'Kg1'}},{'id':2,'name':{'ar':'أولي أبتدائي','en':'primary1'}},{'id':3,'name':{'ar':'أولي أعدادي','en':'prep1'}}]

  this.schoolYearsStatus=[
    {'id':1,'name':{ar:this.translate.instant('Sent'),en:'Sent'}},
    {'id':2,'name':{ar:this.translate.instant('Draft'),en:'Draft'}},
    {'id':3,'name':{ar:this.translate.instant('Current'),en:'Current'}},
    {'id':4,'name':{ar:this.translate.instant('Finished'),en:'Finished'}}
  ]
   }

   getAllSchoolYears(filter?:Partial<Filter>)
   { 
     this.loaderService.isLoading$.next(true);
     return this.http.get('/SchoolYear',filter).pipe(take(1),finalize(()=> {
       this.loaderService.isLoading$.next(false)
     }));
     
   }
   getSchoolYearByID(SchoolYearId:number)
   {
     return this.http.get(`/SchoolYear/${SchoolYearId}`).pipe(take(1))
   }
   
   getAnnualCalenders()
   {
    return this.http.get(`/Holiday/annual-holiday/dropdown`).pipe(take(1))
   }
   
   getCurriculumsInSchoolYear(SchoolYearId:number)
   {
    return this.http.get(`/Curriculum/${SchoolYearId}`).pipe(take(1))
   }

  
}
