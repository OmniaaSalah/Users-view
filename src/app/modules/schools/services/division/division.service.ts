
import { Injectable,inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { finalize, take,map, BehaviorSubject } from 'rxjs';
import { getLocalizedValue } from 'src/app/core/helpers/helpers';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { HttpStatusCodeEnum } from 'src/app/shared/enums/http-status-code/http-status-code.enum';
import { StatusEnum } from 'src/app/shared/enums/status/status.enum';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';

@Injectable({
  providedIn: 'root'
})
export class DivisionService {
  lang = inject(TranslationService).lang;
  constructor(private http:HttpHandlerService,private translate:TranslateService, private tableLoaderService:LoaderService) { }

  divisionsToExport(filter){
    return this.http.post(`/School/divisions/Search`,filter)
    .pipe(
      map(res=>{
        return res.data.map(division =>{
          return {
            [this.translate.instant('schools.sectionName')]:division?.name[this.lang],
            [this.translate.instant('schools.gradeName')]: division?.gradeName[this.lang],
            [this.translate.instant('schools.roomNumber')]:division?.classRoomNumber,
            [this.translate.instant('schools.studentsNumber')]: division?.studentCount,
            [this.translate.instant('students.withDisabilities')]:division?.isSpecialAbilities?this.translate.instant('true'):this.translate.instant('false'),
            [this.translate.instant('schools.sectionManager')]: division?.teacherName[this.lang],

          }
        })
      }))
  }
  // << SCHOOL DIVISIONS >> //
  getSchoolDivisions(filter={}){
    this.tableLoaderService.isLoading$.next(true)
    return this.http.post(`/School/divisions/Search`,filter)
    .pipe(
      take(1),
      finalize(()=> {
        this.tableLoaderService.isLoading$.next(false)
      }))

  }


  addDivision(divisionData){
    return this.http.post(`/Division`,divisionData).pipe(take(1))
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
    return this.http.get(`/Division/${divisionId}/teacher`)
  }

  updateDivisionTeachers(divisionId,data){
    return this.http.put(`/Division/${divisionId}/teacher`,data)
  }

  getSchoolTeachers(schoolId){
    return this.http.get(`/School/${schoolId}/teacher`)
  }






  // << Division STUDENTS >> //
  getDivisionStudents(schoolId, divisionId,filter?){
    this.tableLoaderService.isLoading$.next(true)
    return this.http.get(`/school/${schoolId}/division/${divisionId}/student`,filter)
    .pipe(
      take(1),
      finalize(()=> {
        this.tableLoaderService.isLoading$.next(false)
      }))
  }

  divisionStudentsToExport(schoolId, divisionId,filter?){
    return this.http.get(`/school/${schoolId}/division/${divisionId}/student`,filter)
    .pipe(
      map(res=>{
        return res.result.data.map(student =>{
          return {
            [this.translate.instant('schools.studentId')]: student.id,
            [this.translate.instant('students.studentName')]: getLocalizedValue(student.name),
            [this.translate.instant('students.studentNickname')]: getLocalizedValue(student.surname),
            [this.translate.instant('shared.track')]: getLocalizedValue(student.track?.name),
            [this.translate.instant('shared.personalId')]: student.nationalityId,
          }
        })
      }))
  }


  getStudentsWithoutDivision( schoolId, gradeId){
    return this.http.get(`/Student/${schoolId}/students-without-division?gradeid=${gradeId}`).pipe(take(1))
  }


  addStudentsTodivision(schoolId,gradeId, divisionId, students){
    return this.http.post(`/School/${schoolId}/grade/${gradeId}/division/${divisionId}/add-student-division`,students).pipe(take(1))
  }

  getDivisionTracks( divisionId){
    return this.http.get(`/Track/${divisionId}/division-tracks`).pipe(take(1))
  }


  transferStudentToAnotherDivision(data){
    return this.http.put('/Division/transfer/student', data)
    .pipe(
      map(res=>{
        if(res?.statusCode ===HttpStatusCodeEnum.BadRequest) throw new Error(getLocalizedValue(res?.errorLocalized))
        else return res
      }),
      take(1)
    )
  }

  changeStudentTrack(schoolId,gradeId, divisionId, reqBody){
    return this.http.put(`/school/${schoolId}/division/${divisionId}/change-track`, reqBody, {gradeId})
  }


  // << ABSENCE RECORDS >> //
  getAbsenceRecords(schoolId, divisionId, filter){
    this.tableLoaderService.isLoading$.next(true)
    return this.http.get(`/school/${schoolId}/division/${divisionId}/student-absence`,filter)
    .pipe(
      take(1),
      finalize(()=> {
        this.tableLoaderService.isLoading$.next(false)
      }))

  }

  getLastAbsenceDate(divisionId){
    return this.http.get(`/Student/last-date-of-absence/${divisionId}`)
  }

  absenceRecordToExport(schoolId, divisionId, filter){
    return this.http.get(`/school/${schoolId}/division/${divisionId}/student-absence`,filter)
    .pipe(
      map(res=>{
        return res.data.map(student =>{
          return {
            [this.translate.instant('schools.studentId')]: student.studentNumber,
            [this.translate.instant('students.studentName')]: student.name.ar,
            [this.translate.instant('students.studentNickname')]: student.surname.ar,
            [this.translate.instant('parents.track')]: student.withCause=='withCause' ? this.translate.instant("parents.withCause") : this.translate.instant("parents.withoutCause"),
            [this.translate.instant('parents.absenceCause')]: student.cause ||'-----',
          }
        })
      }))
  }

  addAbsentStudents(schoolId, divisionId, students){
    return this.http.post(`/school/${schoolId}/division/${divisionId}/add-student-absence?yearid=1`,students).pipe(take(1))

  }

  deleteAbsentStudent(schoolId,divisionId, id, date){
    return this.http.delete(`/school/${schoolId}/division/${divisionId}/student/${id}/student-absence?yearid=1&date=${date}`).pipe(take(1))
  }


  // <<<<<<<<<<<<<<<<<<<<<<<<<<< Division degrees >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  getDivisionDegrees(schoolId,divisionId,filter){
    this.tableLoaderService.isLoading$.next(true)
    return this.http.get(`/school/${schoolId}/division/${divisionId}/division-allsubject-degree`,filter)
    .pipe(
      take(1),
      finalize(()=> {
        this.tableLoaderService.isLoading$.next(false)
      }))
  }

  degreesToExport(schoolId,divisionId,filter){
    return this.http.get(`/school/${schoolId}/division/${divisionId}/division-allsubject-degree`,filter)
    .pipe(
      map(res=>{
        return res.result?.data.map(student =>{
          let obj= {
            [this.translate.instant('schools.studentId')]: student.studentNumber,
            [this.translate.instant('students.studentName')]: getLocalizedValue(student?.name),
            [this.translate.instant('parents.subjectName')]: getLocalizedValue(student.subjectName),
            [this.translate.instant('schools.optionalOrmandatory')]: student.isElective ? this.translate.instant("Subjects.optional") : this.translate.instant("Subjects.mandatory"),
            [this.translate.instant('schools.evaluation')]: student.evaluationSystem,
            [this.translate.instant('parents.Result')]: student.studentDegree,
            [this.translate.instant('parents.studentperformance')]: student?.studentPerformance || this.translate.instant('shared.notFound'),
            [this.translate.instant('parents.GPA')]: student.studentGPA,
            [this.translate.instant('parents.Credithour')]: student.studentHour,
          }
          if(student.isHaveStudentPerformance) obj[this.translate.instant('parents.studentperformance')] = student.studentPerformance

          return obj
        })
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

  approveOrRejectSubjectDegrees(schoolId,divisionId,gradeId,queryParms: {subjectid:number,status:number,semester:number}){
    return this.http.patch(`/school/${schoolId}/grade/${gradeId}/division/${divisionId}/division-subject`,{},queryParms).pipe(take(1))

  }

  // <<<<<<<<<<<<<<<<<<<<<<<<<<< Division subjects>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  // /all-division-subject-dropdown

  getAllSubjects(divisionId){
    return this.http.get(`/division/${divisionId}/all-division-subject-dropdown`)
    .pipe(map(res =>{
      return res.result
      // return res.result.map(el => ({id:el.id, name:{ar:el.arabicName, en:el.englishName}} ))
    }),
    take(1))
  }

  // Subjects that thair degrees are Uploaded
  getDivisionSubjects(schoolId,divisionId,filter?){
    // return of(data)
    this.tableLoaderService.isLoading$.next(true)
    return this.http.get(`/school/${schoolId}/division/${divisionId}/division-subject`,filter)
    .pipe(
      take(1),
      finalize(()=> {
        this.tableLoaderService.isLoading$.next(false)
      }))
  }


  subjectsToExport(schoolId,divisionId,filter){
    return this.http.get(`/school/${schoolId}/division/${divisionId}/division-subject`,filter)
    .pipe(
      map(res=>{
        return res?.result?.data.map(subject =>{
          return {
            [this.translate.instant('schools.subjectNumber')]: subject.subjectCode,
            [this.translate.instant('parents.subjectName')]: subject.subjectName.ar,
            [this.translate.instant('shared.track')]: subject.trackName.ar || this.translate.instant('shared.notFound'),
            [this.translate.instant('schools.speaSubjects')]: subject.isAcdmicSubject ? this.translate.instant("shared.no") : this.translate.instant("shared.yes"),
            [this.translate.instant('schools.subjectDegreesStatus')]: this.translatedStatus(subject.subjecttStatus),
          }

        })
      }))

  }

  translatedStatus(status){
    let text
    switch (status) {
      case StatusEnum.Rejected:
        text = this.translate.instant('shared.allStatus.rejected')
        break;
      case StatusEnum.Pending:
        text = this.translate.instant('shared.allStatus.pending')
        break;
      case StatusEnum.Accepted:
        text = this.translate.instant('shared.allStatus.accepted')
        break;
    }
    return text
  }


  getDivisionSubjectsDegrees(schoolId,divisionId,filter){
    this.tableLoaderService.isLoading$.next(true)
    return this.http.get(`/school/${schoolId}/division/${divisionId}/division-subject-degree`,filter)
    .pipe(
      take(1),
      finalize(()=> {
        this.tableLoaderService.isLoading$.next(false)
      }))
  }

  getDegreesExel(schoolId, divisionId,subjectId){
    return this.http.get(`/school/${schoolId}/division/${divisionId}/get-excel-with-degree?subjectid=${subjectId}`, {},{'content-type':'file'}).pipe(take(1))
  }

  subjectsDegreesToExport(schoolId,divisionId,filter){
    return this.http.get(`/school/${schoolId}/division/${divisionId}/division-subject-degree`,filter)
    .pipe(
      map(res=>{
        return res.data.map(student =>{
          return {
            [this.translate.instant('schools.studentId')]: student.studentNumber,
            [this.translate.instant('students.studentName')]: student.name.ar,
            [this.translate.instant('parents.evaluation')]: student.evaluationSystem,
            [this.translate.instant('parents.Result')]: student.studentDegree,
            [this.translate.instant('parents.GPA')]: student.studentGPA,
            [this.translate.instant('parents.Credithour')]: student.studentHour,
          }

        })
      }))
  }


  getDivisionStudentsRate(schoolId,divisionId,filter){
    this.tableLoaderService.isLoading$.next(true)
    return this.http.get(`/school/${schoolId}/division/${divisionId}/division-final-degree`,filter)
    .pipe(
      take(1),
      finalize(()=> {
        this.tableLoaderService.isLoading$.next(false)
      }))
  }

  studentsRateToExport(schoolId,divisionId,filter){
    return this.http.get(`/school/${schoolId}/division/${divisionId}/division-final-degree`,filter)
    .pipe(
      map(res=>{
        return res.result.data.map(student =>{
          return {
            [this.translate.instant('schools.studentId')]: student.studentNumber,
            [this.translate.instant('students.studentName')]: student.name.ar,
            [this.translate.instant('schools.studentDegree')]: student.isFinalPass ? this.translate.instant('shared.allStatus.Passed') : this.translate.instant('shared.allStatus.notPassed'),
            [this.translate.instant('schools.failedSubjecteNumber')]: student.numberOfFaildSubject,
          }

        })
      }))
  }


  updateStudentRate(divisionId, studentId, data){
    return this.http.patch(`/division/${divisionId}/student/${studentId}/change-final-degree`,{},data).pipe(take(1))
  }


  improvementStudentDegree(schoolId,divisionId,studentId, subjectId , data){
    return this.http.post(`/school/${schoolId}/division/${divisionId}/student/${studentId}/subject/${subjectId}`, data).pipe(take(1))
  }
}
