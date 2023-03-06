import { Injectable,inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { finalize, take ,map} from 'rxjs';
import { getLocalizedValue } from 'src/app/core/classes/helpers';
import { GradeTrack } from 'src/app/core/models/schools/school.model';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';

@Injectable({
  providedIn: 'root'
})
export class GradesService {
  days=[
    {name: 'السبت', index: 6},
    {name: 'الاحد', index: 0},
    {name: 'الاتنين', index: 1},
    {name: 'الثلاثاء', index: 2},
    {name: 'الاربعاء', index: 3},
    {name: 'الخميس', index: 4},
  ];

  tracks:GradeTrack[]= [
    {
      id:1,
      name:{ar:'علمى', en:''},
      subjects:[
        {id:1, name :{ar:'ادبى', en:''}, isOptional:true, maxGpa:0, isAddToFinalScore:false, studyHour:{ticks:2},haveGpa:true, weekClassRoomNumber:6}
,       ]
    },
    {
      id:2,
      name:{ar:'ادبى', en:''},
      subjects:[
        {id:1, name :{ar:'ادبى', en:''}, isOptional:true, maxGpa:0, isAddToFinalScore:false,  studyHour:{ticks:2},haveGpa:true, weekClassRoomNumber:6 },
        {id:1, name :{ar:'ادبى', en:''}, isOptional:true, maxGpa:0, isAddToFinalScore:false,  studyHour:{ticks:2},haveGpa:true, weekClassRoomNumber:6 }
      ]
    },
    {
      id:3,
      name:{ar:'علمى', en:''},
      subjects:[
        {id:1, name :{ar:'ادبى', en:''}, isOptional:true, maxGpa:0, isAddToFinalScore:false,  studyHour:{ticks:2},haveGpa:true, weekClassRoomNumber:6 },
        {id:1, name :{ar:'ادبى', en:''}, isOptional:true, maxGpa:0, isAddToFinalScore:false,  studyHour:{ticks:2}, haveGpa:true, weekClassRoomNumber:6},
        {id:1, name :{ar:'ادبى', en:''}, isOptional:true, maxGpa:0, isAddToFinalScore:false,  studyHour:{ticks:2}, haveGpa:true, weekClassRoomNumber:6}
      ]
    },
  ];

  subjects=[
    {id:1, name :{ar:"الرياضيات", en:''}, isOptional:true, maxGpa:0, isAddToFinalScore:false,  studyHour:{ticks:2}, haveGpa:true, weekClassRoomNumber:6},
    {id:1, name :{ar:"الاحياء", en:''}, isOptional:true, maxGpa:0, isAddToFinalScore:false,  studyHour:{ticks:2},haveGpa:true, weekClassRoomNumber:6 },
    {id:1, name :{ar:"العلوم", en:''}, isOptional:true, maxGpa:0, isAddToFinalScore:false,  studyHour:{ticks:2}, haveGpa:true, weekClassRoomNumber:6}
  ]

  constructor(
    private http:HttpHandlerService, 
    private tableLoaderService:LoaderService,
    private translate:TranslateService) {}
  lang = inject(TranslationService).lang;

   
   getSchoolSubjects(schoolId){
    return this.http.get(`/Subject/school-subject/${schoolId}`)
   }

  getSchoolGardes(schoolId, filter = {}){
    this.tableLoaderService.isLoading$.next(true)
    return this.http.get(`/School/${schoolId}/grade`,filter)
    .pipe(
      take(1),
      finalize(()=> {
        this.tableLoaderService.isLoading$.next(false)
      }))
  }

  getGrade(schoolId, gradeId){
    return this.http.get(`/Grade/${gradeId}`,{schoolid:schoolId})
  }

  updateGrade(schoolId,gradeData){
    return this.http.put(`/Grade`,gradeData,{schoolid:schoolId})
  }

  deleteGradeSubjets(subjects:number[]){
    return this.http.delete(`/Grade/grade-subject`,subjects).pipe(take(1))
  }


  getGradeSubjects(schoolId, gradeId){
    return this.http.get(`/Grade/subjects/${gradeId}`,{schoolid:schoolId})
    .pipe(
      map(res=> 
        res.map(el=> ({id:el.id, name:{ar: el.arabicName,en:el.englishName}}) )),
    take(1))
  }

  getGradeDivision(schoolId, gradeId){
    return this.http.get(`/Division/school/${schoolId}/grade/${gradeId}`).pipe(take(1))
  }


  getGradeTracks(schoolId,gradeId){

    return this.http.get(`/School/${schoolId}/grade/${gradeId}/tracks`).pipe(take(1))
  }


  getGradeStudents(schoolId, gradeId,filter?){
    this.tableLoaderService.isLoading$.next(true)
    return this.http.post(`/Student/school-grade-students/${schoolId}/${gradeId}/Search`,filter)
    .pipe(
      take(1),
      finalize(()=> {
        this.tableLoaderService.isLoading$.next(false)
      }))
  }

  
  gradeStudentsToExport(schoolId, gradeId,filter?){
    return this.http.get(`/Student/school-grade-students/${schoolId}/${gradeId}/Search`,filter)
    .pipe(
      map(res=>{
        return res.result.data.map(student =>{
          return {
            [this.translate.instant('dashboard.schools.studentId')]: student.studentNumber,
            [this.translate.instant('dashboard.students.studentName')]: getLocalizedValue(student.name),
            [this.translate.instant('shared.division')]: getLocalizedValue(student.divisionName),
            [this.translate.instant('dashboard.parents.ministerialNumber')]: student.ministerialNumber,
            [this.translate.instant('shared.personalId')]: student.nationalityId,
          }
        })
      }))
  }

  // <<<<<<<<<<<<<<<<<<<<<< Grade calender Events >>>>>>>>>>>>>>>>>>>>>>>>>>>>

  getGradeClassEvents(schoolId, gradeId){
    return this.http.get(`/lecture/events/current-week/${gradeId}/${schoolId}`).pipe(take(1))
  }

  getDivisionLecetureEvents(schoolId, gradeId,divisionId){
    return this.http.get(`/lecture/events/subjects/${gradeId}/${schoolId}`,{divisionId}).pipe(take(1))
  }

  addClassEvent(schoolId, gradeId, classData){
    return this.http.post(`/lecture/${gradeId}/${schoolId}`,classData).pipe(take(1))
  }

  addSubjectToClassEvent(lectureId, divisionId, subjects){
    return this.http.post(`/lecture/add-subjects/${lectureId}/${divisionId}`,subjects).pipe(take(1))
  }

  updateClassEvent(schoolId,eventId,classData){
    return this.http.put(`/lecture`,classData).pipe(take(1))
    return this.http.put(`/lecture/${eventId}/${schoolId}`,classData).pipe(take(1))
  }

  deleteClassEvent(eventId){
    return this.http.delete(`/lecture/${eventId}`).pipe(take(1))
  }

  getSchoolYearWorkingDays(){
    return this.http.get(`/schoolYear/working-days`)
    .pipe(
      map(res=>{
        return res.map((day, index) => ({name: this.translate.instant('shared.DaysEnum.'+index), day:index}))
      }),
      take(1))

  }

  gradesToExport(schoolId,filter){
    return this.http.get(`/School/${schoolId}/grade`,filter)
    .pipe(
      map(res=>{
        return res.data.map(grade =>{
          return {
            [this.translate.instant('dashboard.schools.gradeName')]:grade?.name[this.lang],
            [this.translate.instant('dashboard.schools.tracksNumber')]: grade?.trackCount,
            [this.translate.instant('dashboard.schools.sectionsNumber')]:grade?.divisionCount,
            [this.translate.instant('shared.students')]: grade?.studentCount,

          }
        })
    }))
  }
}
