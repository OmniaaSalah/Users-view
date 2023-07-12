import { Injectable,inject } from '@angular/core';
import { ISchoolYear } from 'src/app/core/Models/school-years/school-year';
import { take,finalize, map } from 'rxjs';
import { Filter } from 'src/app/core/Models/filter/filter';
import { BehaviorSubject } from 'rxjs';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';
import { TranslateService } from '@ngx-translate/core';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { SchoolYearEnum } from 'src/app/shared/enums/school-year/school-year.enum';

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
  studentsList=new BehaviorSubject<[]>([]);
  topStudantsListLength=new BehaviorSubject<number>(0);
  topStudentIdsList=new BehaviorSubject<[]>([]);
  cities: string[];
  schoolYearList:ISchoolYear[]=[];
  lang = inject(TranslationService).lang
 classList;
 precentage;
  // classSubjectsList;
  topStudentsList;
  schoolYearsStatus;
  constructor(private http:HttpHandlerService,private translate:TranslateService, private loaderService: LoaderService) {


  this.schoolYearsStatus=[
    {value:SchoolYearEnum.Sent,name:this.translate.instant('Sent')},
    {value:SchoolYearEnum.Draft,name:this.translate.instant('Draft')},
    {value:SchoolYearEnum.Current,name:this.translate.instant('Current')},
    {value:SchoolYearEnum.Finished,name:this.translate.instant('Finished')}
  ]
   }

   getAllSchoolYears(filter?:Partial<Filter>)
   {
     this.loaderService.isLoading$.next(true);
     return this.http.post('/SchoolYear/Search',filter).pipe(take(1),finalize(()=> {
       this.loaderService.isLoading$.next(false)
     }));

   }

   getSchoolYearByID(schoolYearId:number)
   {
     return this.http.get(`/SchoolYear/${schoolYearId}`).pipe(take(1))
   }

   getAnnualCalenders()
   {
    return this.http.get(`/Holiday/annual-holiday/dropdown`).pipe(take(1))
   }

   getCurriculumsInSchoolYear(schoolYearId:number)
   {
    return this.http.get(`/Curriculum/${schoolYearId}`).pipe(take(1))
   }
   getClassesInCurriculumsInSchoolYear(schoolYearId:number,curriculumId:number)
   {
    this.loaderService.isLoading$.next(true);
    return this.http.get(`/SchoolYear/grades/top-students?schoolYearId=${schoolYearId}&curriculmId=${curriculumId}`)
    .pipe(take(1),finalize(()=> {
      // this.loaderService.isLoading$.next(false)
    }))
   }

   getClassesInSpecificCurriculum(curriculumId:number)
   {
    return this.http.get(`/Curriculum/Grades/${curriculumId}`).pipe(take(1))
   }
   getClassDetails(curriculumId:number,schoolYearId:number,gradeId:number)
   {
     return this.http.get(`/SchoolYear/grade/${schoolYearId}/${curriculumId}/${gradeId}`).pipe(take(1))
   }

   addDraftSchoolYear(schoolYear)
   {
     return this.http.post(`/SchoolYear`,schoolYear).pipe(take(1))
   }
   editSchoolYear(schoolYear)
   {
     return this.http.put(`/SchoolYear`,schoolYear).pipe(take(1))
   }

   editSchoolYearStatus(schoolYearId)
   {
     return this.http.get(`/SchoolYear/${schoolYearId}/apply-sent`).pipe(take(1));
   }
  saveCurriculumsToSchoolYear(schoolYearId,curriculums)
  {
    return this.http.post(`/SchoolYear/${schoolYearId}/curriculums`,curriculums).pipe(take(1));
  }

   addGradeToCurriculum(grade,schoolYearId)
   {
    return this.http.post(`/SchoolYear/${schoolYearId}/curriculum-Grade`,grade).pipe(take(1))
   }

   editGradeToCurriculum(grade,oldGradeId,schoolYearId)
   {
    return this.http.put(`/SchoolYear/${schoolYearId}/curriculum-Grade/${oldGradeId}`,grade).pipe(take(1))
   }

   getAllStudentsInSpecificGrade(schoolYearId,gradeId)
   {
    return this.http.get(`/SchoolYear/${schoolYearId}/grades/${gradeId}/students`).pipe(take(1))
   }
   getTopStudentsInSpecificGrade(schoolYearId:number,curriculumId:number,gradeId:number)
   {
    return this.http.get(`/SchoolYear/grades/${gradeId}/top-students/${schoolYearId}/${curriculumId}`).pipe(take(1))
   }

  addTopStudentsToSpecificGrade(topStudents)
  {
    return this.http.post(`/SchoolYear/top-students`,topStudents).pipe(take(1))
  }

  getAllTopStudents(schoolYearId,filter?:Partial<Filter>)
  {
    this.loaderService.isLoading$.next(true);
    return this.http.post(`/Student/top-students/${schoolYearId}`,filter).pipe(take(1),finalize(()=> {
      this.loaderService.isLoading$.next(false)
    }));

  }
  getAllGradesInSchoolYear(schoolYearId)
  {
    return this.http.get(`/SchoolYear/${schoolYearId}/grades`).pipe(take(1))
  }
  schoolYearsToExport(filter){
    return this.http.post('/SchoolYear/Search',filter)
    .pipe(
      map(res=>{
        return res.data.map(schoolYear =>{
          return {
            [this.translate.instant('dashboard.SchoolYear.School Year Name')]: schoolYear?.name[this.lang],
            [this.translate.instant('dashboard.SchoolYear.curriculum Number')]: schoolYear?.curriculumCount,
            [this.translate.instant('dashboard.SchoolYear.School Year StartDate')]:  schoolYear?.startDate,
            [this.translate.instant('dashboard.SchoolYear.School Year EndDate')]: schoolYear?.endDate,
            [this.translate.instant('dashboard.SchoolYear.WeekEnd Days')]: this.convertWeekEnds(schoolYear?.weekEndDays).join(', '),
            [this.translate.instant('shared.Created Date')]: schoolYear?.createdDate,
            [this.translate.instant('dashboard.SchoolYear.Status')]: schoolYear?.status.name[this.lang],

          }
        })
      }))
  }
  convertWeekEnds(list)
  {
    var weekEndNames=[];
    list.forEach(element => {
      weekEndNames.push(this.translate.instant(element.name.en))
    });
    console.log(weekEndNames)
    return weekEndNames;
  }

  topStudentsToExport(schoolYearId,filter){
    return this.http.post(`/Student/top-students/${schoolYearId}`,filter)
    .pipe(
      map(res=>{
        return res.result.data.map(student =>{
          return {
            [this.translate.instant('dashboard.SchoolYear.StudentName')]: student?.student[this.lang],
            [this.translate.instant('dashboard.SchoolYear.Nationality')]: student?.nationality[this.lang],
            [this.translate.instant('dashboard.SchoolYear.Class')]:  student?.grade[this.lang],
            [this.translate.instant('dashboard.SchoolYear.Curriculum')]: student?.curricuulm[this.lang],
            [this.translate.instant('dashboard.SchoolYear.Precantage')]: student?.studentFinalPercentage

          }
        })
      }))
  }


  upgradeStudents(currYearId, nextYearId){
    return this.http.get(`/SchoolYear/Upgrade-Students?currentSchoolYear=${currYearId}&nextSchoolYear=${nextYearId}`).pipe(take(1))
  }

}
