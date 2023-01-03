import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable,inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { finalize, of, take,map } from 'rxjs';

import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { StatusEnum } from 'src/app/shared/enums/status/status.enum';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';

@Injectable({
  providedIn: 'root'
})
export class DivisionService {

  lang = inject(TranslationService).lang;
  constructor(private http:HttpHandlerService,private translate:TranslateService, private tableLoaderService:LoaderService,private httpClient:HttpClient) { }

  divisionsToExport(schoolId,filter){
    return this.http.get(`/School/${schoolId}/divisions`,filter)
    .pipe(
      map(res=>{
        return res.data.map(division =>{
          return {
            [this.translate.instant('dashboard.schools.sectionName')]:division?.name[this.lang],
            [this.translate.instant('dashboard.schools.gradeName')]: division?.gradeName[this.lang],
            [this.translate.instant('dashboard.schools.roomNumber')]:division?.classRoomNumber,
            [this.translate.instant('dashboard.schools.studentsNumber')]: division?.studentCount,
            [this.translate.instant('dashboard.students.withDisabilities')]:division?.isSpecialAbilities?this.translate.instant('true'):this.translate.instant('false'),
            [this.translate.instant('dashboard.schools.sectionManager')]: division?.teacherName[this.lang],

          }
        })
      }))
  }
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


  // <<<<<<<<<<<<<<<<<<<<<<<<<<< Division degrees>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  getDivisionDegrees(schoolId,divisionId,filter){
    this.tableLoaderService.isLoading$.next(true)
    return this.http.get(`/school/${schoolId}/division/${divisionId}/division-subject`,filter)
    .pipe(
      take(1),
      finalize(()=> {
        this.tableLoaderService.isLoading$.next(false)
      }))
  }

  checkSubjectDegreesExist(schoolId,divisionId,queryParms: {subjectid:number,semester:number}){
    return this.http.get(`/school/${schoolId}/division/${divisionId}/check-subject-degreee-exist`,queryParms).pipe(take(1))

  }

  getSubjectDegreesExcel(schoolId,divisionId,subjectid){
    return this.http.get(`/school/${schoolId}/division/${divisionId}/get-excel`,{subjectid},{'content-type':'file'}).pipe(take(1))
  }

  addSubjectDegrees(schoolId,divisionId,formData,queryParms: {subjectid:number,semester:number}){
    return this.http.post(`/school/${schoolId}/division/${divisionId}/add-student-degrees`,formData,queryParms,{'content-type': 'attachment'}).pipe(take(1))
  }

  // <<<<<<<<<<<<<<<<<<<<<<<<<<< Division subjects>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  
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
    // return of(data)
    this.tableLoaderService.isLoading$.next(true)
    return this.http.get(`/school/${schoolId}/division/${divisionId}/division-subject`,filter)
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
