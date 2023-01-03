import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { delay, finalize, map, Observable, take } from 'rxjs';
import { Filter } from 'src/app/core/Models/filter/filter';
import { GenericResponse } from 'src/app/core/models/global/global.model';
import { Student } from 'src/app/core/models/student/student.model';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';
import { SemesterEnum } from 'src/app/shared/enums/global/global.enum';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private http:HttpHandlerService, private translate:TranslateService, private loaderService: LoaderService) { }
  
  // << Students CRUD >> //
  getAllStudents(filter){
    this.loaderService.isLoading$.next(true)
    
    return this.http.get('/Student',filter)
    .pipe(
      take(1),
      finalize(()=> {
        this.loaderService.isLoading$.next(false)
      }))
  }


  getAllStudentsInSpecificSchool(filter,schoolId){
    this.loaderService.isLoading$.next(true)
    
    return this.http.get(`/Student/students/${schoolId}`,filter)
    .pipe(
      take(1),
      finalize(()=> {
        this.loaderService.isLoading$.next(false)
      }))
    }

  studentsToExport(filter){
    return this.http.get('/Student',filter)
    .pipe(
      map(res=>{
        return res.data.map(student =>{
          return {
            [this.translate.instant('dashboard.students.daleelNumber')]: student.studentDaleelNumber,
            [this.translate.instant('dashboard.students.studentName')]: student.name.ar,
            [this.translate.instant('dashboard.students.studentNickname')]: student.surName.ar,
            [this.translate.instant('shared.nationality')]: student.nationality.ar,
            [this.translate.instant('dashboard.students.schoolName')]: student.currentSchoolName.ar,
            [this.translate.instant('dashboard.students.parent')]: student.guardianName.ar,
            [this.translate.instant('shared.grade')]: student.gradeName.ar  ,
            [this.translate.instant('shared.division')]: student.divisionName.ar,
          }
        })
      })
    )

  }

  getStudent(id): Observable<GenericResponse<Student>>{
    return this.http.get(`/Student/${id}`,{yearId:1})
  }

  updateStudent(id, studentData){
    return this.http.put(`/Student/${id}`, studentData)
  }
  deleteStudent(data){
    return this.http.post(`/Student/delete-request`,data)
  }

  

  // << Transfer Students >> //
  transferStudent(data){
    return this.http.put('/Student/transfer', data).pipe(take(1))
  }

  // NOTE : ارسال طلب اعاده مرحله دراسيه -------------------------------------------------
  repeateStudyPhaseReq(data){
      return this.http.post('/Student/regrading-request', data).pipe(take(1))
    }

  // NOTE : ارسال طلب انسحاب من المدرسه الحاليه -------------------------------------------------
  sendWithdrawalReq(data){
    return this.http.post('/Student/withdrawal-request', data).pipe(take(1))
  }
   

  // << Students Medical File >> //
  getStudentMedicalfile(id){
    return this.http.get(`/Student/${id}/medicalRecord`).pipe(take(1))
  }
  updateStudentMedicalfile(id, data){
    return this.http.post(`/Student/medical-record/${id}`,data).pipe(take(1))
  }



  updateStudentIdentityNum(data){
    return this.http.post(`/Student/modify-identity-request`, data)
  }

  updateStudentIdentityInfo(data){
    return this.http.post(`/Student/modify-identity-request-not-have-id`, data)
  }



   // << Students Attachment >> //
  getStudentAttachment(studentId){
    return this.http.get(`/Student/attachment/${studentId}`)
  }

  updateStudentAttachment(studentId, data){
    return this.http.put(`/Student/attachment/${studentId}`, data)
  }


  // <<<<<<<<<<<<< Student Absence Records>>>>>>>>>>
  getStudentAbsenceRecord(studentId,semester:SemesterEnum , filter){
    this.loaderService.isLoading$.next(true)
    return this.http.get(`/Student/student-attendence/${studentId}/${semester}`,filter)
    .pipe(
      take(1),
      finalize(()=> {
        this.loaderService.isLoading$.next(false)
      }))
  }

  getStudentSubjects(studentId,semester,filter){
    this.loaderService.isLoading$.next(true)
    
    return this.http.get(`/Student/student-subjects/${studentId}/${semester}`,filter)
    .pipe(
      take(1),
      finalize(()=> {
        this.loaderService.isLoading$.next(false)
      }))
  }

  
  getStudentRecord(filter){
    this.loaderService.isLoading$.next(true)
    
    return this.http.get('/Student/school-record',filter)
    .pipe(
      take(1),
      finalize(()=> {
        this.loaderService.isLoading$.next(false)
      }))
  }

  getCertificatesList(studentId, filter){
    this.loaderService.isLoading$.next(true)
    return this.http.get(`/Student/student-certificates/${studentId}`,filter)
    .pipe(
      take(1),
      finalize(()=> {
        this.loaderService.isLoading$.next(false)
      }))
  }


   // << Others >> //
  getTalents(){
    return this.http.get(`/Student/talent`).pipe(take(1))
  }



  // << issuance of a certificate >> //
  getStudentInfo(id){
    return this.http.get(`/Student/${id}`)
  }
    getAllGrades(){
      return this.http.get('/Grade')
    }

    getGradeBySchoolId(id){
      return this.http.get(`/School/${id}/grade`)
    }

    getAllSchoolNames(){
      return this.http.get('/School/school/name')
    }

    getAllCertificate(){ // no data :(
      return this.http.get('/Certificate')
    }

    getCetificateManually(id){
      return this.http.get(`/Student/${id}/certificatemanually`)
    }
    postCertificate(obj){
      return this.http.post('/student/sentCertificate',obj)
    }
}
