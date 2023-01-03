import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { finalize, map, take } from 'rxjs';
import { GradeTrack } from 'src/app/core/models/schools/school.model';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';
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


  getGradeDivision(schoolId, gradeId){
    return this.http.get(`/Division/school/${schoolId}/grade/${gradeId}`).pipe(take(1))
  }


  getGradeTracks(schoolId,gradeId){

    return this.http.get(`/School/${schoolId}/grade/${gradeId}/tracks`).pipe(take(1))
  }



  // <<<<<<<<<<<<<<<<<<<<<< Grade calender Events >>>>>>>>>>>>>>>>>>>>>>>>>>>>

  getGradeClassEvents(schoolId, gradeId){
    return this.http.get(`/lecture/events/current-week/${gradeId}/${schoolId}`).pipe(take(1))
  }

  addClassEvent(schoolId, gradeId, classData){
    
    return this.http.post(`/lecture/${gradeId}/${schoolId}`,classData).pipe(take(1))
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

}
