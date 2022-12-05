import { Injectable } from '@angular/core';
import { finalize, take } from 'rxjs';
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
        {id:1, name :{ar:'ادبى', en:''}, isMandatory:true, isAddToFinalScore:false, studyHour:{ticks:2},haveGpa:true, weekClassRoomNumber:6}
,       ]
    },
    {
      id:2,
      name:{ar:'ادبى', en:''},
      subjects:[
        {id:1, name :{ar:'ادبى', en:''}, isMandatory:true, isAddToFinalScore:false,  studyHour:{ticks:2},haveGpa:true, weekClassRoomNumber:6 },
        {id:1, name :{ar:'ادبى', en:''}, isMandatory:true, isAddToFinalScore:false,  studyHour:{ticks:2},haveGpa:true, weekClassRoomNumber:6 }
      ]
    },
    {
      id:3,
      name:{ar:'علمى', en:''},
      subjects:[
        {id:1, name :{ar:'ادبى', en:''}, isMandatory:true, isAddToFinalScore:false,  studyHour:{ticks:2},haveGpa:true, weekClassRoomNumber:6 },
        {id:1, name :{ar:'ادبى', en:''}, isMandatory:true, isAddToFinalScore:false,  studyHour:{ticks:2}, haveGpa:true, weekClassRoomNumber:6},
        {id:1, name :{ar:'ادبى', en:''}, isMandatory:true, isAddToFinalScore:false,  studyHour:{ticks:2}, haveGpa:true, weekClassRoomNumber:6}
      ]
    },
  ];

  subjects=[
    {id:1, name :{ar:"الرياضيات", en:''}, isMandatory:true, isAddToFinalScore:false,  studyHour:{ticks:2}, haveGpa:true, weekClassRoomNumber:6},
    {id:1, name :{ar:"الاحياء", en:''}, isMandatory:true, isAddToFinalScore:false,  studyHour:{ticks:2},haveGpa:true, weekClassRoomNumber:6 },
    {id:1, name :{ar:"العلوم", en:''}, isMandatory:true, isAddToFinalScore:false,  studyHour:{ticks:2}, haveGpa:true, weekClassRoomNumber:6}
  ]

  constructor(private http:HttpHandlerService, private tableLoaderService:LoaderService) {

   }
   
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
    return this.http.get(`/Grade/${gradeId}`,)
  }

  updateGrade(gradeData){
    return this.http.put(`/Grade`,gradeData)
  }


  getGradeDivision(schoolId, gradeId){
    return this.http.get(`/Division/school/${schoolId}/grade/${gradeId}`).pipe(take(1))
  }


  getGradeTracks(schoolId,gradeId){

    return this.http.get(`/School/${schoolId}/grade/${gradeId}/tracks`).pipe(take(1))
  }


}
