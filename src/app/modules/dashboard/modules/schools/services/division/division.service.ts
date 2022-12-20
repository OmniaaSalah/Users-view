import { Injectable } from '@angular/core';

import { finalize, of, take } from 'rxjs';

import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';
import { StatusEnum } from 'src/app/shared/enums/status/status.enum';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';

@Injectable({
  providedIn: 'root'
})
export class DivisionService {


  constructor(private http:HttpHandlerService, private tableLoaderService:LoaderService) { }


  // << SCHOOL DIVISIONS >> //
  getSchoolDivisions(schoolId, filter={}){
    this.tableLoaderService.isLoading$.next(true)
    return this.http.get(`/School/${schoolId}/divisions`,filter)
    .pipe(
      take(1),
      finalize(()=> {
        this.tableLoaderService.isLoading$.next(false)
      }))

  }

  // --------------------------------------------------------

  getDivisionInfo(schoolId, divisionId){
    return this.http.get(`/Division/school/${schoolId}/division/${divisionId}`,).pipe(take(1))
  }

  updateDivisionInfo(divisionId, divisionData){
    return this.http.put(`/Division/${divisionId}`,divisionData).pipe(take(1))
  }

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Division Teachers >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> //

  getDivisionTeachers(divisionId){
    return this.http.get(`/Division/${divisionId}/teacher?schoolyear=1`)
  }

  updateDivisionTeachers(divisionId,data){
    return this.http.put(`/Division/${divisionId}/teacher?schoolyear=1`,data)
  }

  getSchoolTeachers(schoolId){
    return this.http.get(`/School/${schoolId}/teacher`)
  }






  // << Division STUDENTS >> //
  getDivisionStudents(schoolId, divisionId,filter?){
    this.tableLoaderService.isLoading$.next(true)
    return this.http.get(`/school/${schoolId}/division/${divisionId}/student?schoolyear=1`,filter)
    .pipe(
      take(1),
      finalize(()=> {
        this.tableLoaderService.isLoading$.next(false)
      }))
  }

  getStudentsWithoutDivision( schoolId){
    return this.http.get(`/Student/${schoolId}/students-without-division`).pipe(take(1))
  }


  addStudentsTodivision(schoolId,gradeId, divisionId, students){
    return this.http.post(`/School/${schoolId}/grade/${gradeId}/division/${divisionId}/add-student-division`,students).pipe(take(1))
  }

  getDivisionTracks( divisionId){
    return this.http.get(`/Track/${divisionId}/division-tracks`).pipe(take(1))
  }
  

  transferStudentToAnotherDivision(data){
    return this.http.put('/Division/transfer/student', data).pipe(take(1))
  }


  // << ABSENCE RECORDS >> //
  getAbsenceRecords(schoolId, divisionId, filter){
    this.tableLoaderService.isLoading$.next(true)
    return this.http.get(`/school/${schoolId}/division/${divisionId}/student-absence?yearid=1`,filter)
    .pipe(
      take(1),
      finalize(()=> {
        this.tableLoaderService.isLoading$.next(false)
      }))

  }

  addAbsentStudents(schoolId, divisionId, students){
    return this.http.post(`/school/${schoolId}/division/${divisionId}/add-student-absence?yearid=1`,students).pipe(take(1))

  }

  deleteAbsentStudent(schoolId,divisionId, id, date){
    return this.http.delete(`/school/${schoolId}/division/${divisionId}/student/${id}/student-absence?yearid=1&date=${date}`).pipe(take(1))
  }


  // <<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  
  getDivisionSubjects(schoolId,divisionId,filter){
    let data = {
      result:{
        total:5,
        totalAllData:5,
        data:[{
          id:1,
          subjectNumder:15,
          name:{ar:'الصياد'},
          track:{id:2, name:{ar:'علمى'}},
          isSpeaSubjects:true,
          status: StatusEnum.Pending,
        },
        {
          id:2,
          subjectNumder:15,
          name:{ar:'الصياد'},
          track:{id:2, name:{ar:'علمى'}},
          isSpeaSubjects:false,
          status: StatusEnum.Rejected,
        }

        ]
      }
    }
    return of(data)
    this.tableLoaderService.isLoading$.next(true)
    return this.http.get(`/school/${schoolId}/division/${divisionId}/student-absence?yearid=1`,filter)
    .pipe(
      take(1),
      finalize(()=> {
        this.tableLoaderService.isLoading$.next(false)
      }))
  }

  getDivisionSubjectsDegrees(schoolId,divisionId,filter){
    let data = {
      result:{
        total:5,
        totalAllData:5,
        data:[{
          studentNumber:15,
          name:{ar:'الصياد'},
          rate:'درجات',
          result:'5-ناجح',
          gpa:1.5,
          studyHour:5
        },
        {
          studentNumber:15,
          name:{ar:'الصياد'},
          rate:'درجات',
          result:'5-ناجح',
          gpa:1.5,
          studyHour:5
        }

        ]
      }
    }
    return of(data)
    this.tableLoaderService.isLoading$.next(true)
    return this.http.get(`/school/${schoolId}/division/${divisionId}/student-absence?yearid=1`,filter)
    .pipe(
      take(1),
      finalize(()=> {
        this.tableLoaderService.isLoading$.next(false)
      }))
  }

  
  getDivisionStudentsRate(schoolId,divisionId,filter){
    let arr={
      total:5,
      totalAllData:5,
      list:[
        {
          studentNumber:12656,
          name:{ar:'اجمد الصياد',en:''},
          rate:0,
          subjectsNum:3
        },
        {
          studentNumber:12656,
          name:{ar:'اجمد الصياد',en:''},
          rate:1,
          subjectsNum:0
        }
      ],
    }

    return of(arr)
    this.tableLoaderService.isLoading$.next(true)
    return this.http.get(`/school/${schoolId}/division/${divisionId}/student-absence?yearid=1`,filter)
    .pipe(
      take(1),
      finalize(()=> {
        this.tableLoaderService.isLoading$.next(false)
      }))
  }

}
