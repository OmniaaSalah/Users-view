import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { delay, finalize, map, Observable, of, take } from 'rxjs';
import { getLocalizedValue } from 'src/app/core/helpers/helpers';
import { Filter } from 'src/app/core/Models/filter/filter';
import { GenericResponse } from 'src/app/core/models/global/global.model';
import { Student } from 'src/app/core/models/student/student.model';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';
import { UserService } from 'src/app/core/services/user/user.service';

import { CertificatesEnum } from 'src/app/shared/enums/certficates/certificate.enum';
import { SemesterEnum } from 'src/app/shared/enums/global/global.enum';
import { HttpStatusCodeEnum } from 'src/app/shared/enums/http-status-code/http-status-code.enum';
import { StatusEnum } from 'src/app/shared/enums/status/status.enum';
import { UserScope } from 'src/app/shared/enums/user/user.enum';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  certificatesList;
  constructor(
    private http:HttpHandlerService,
    private translate:TranslateService,
    private loaderService: LoaderService,
    private userService:UserService) {

    this.certificatesList = [

      {
        "value": CertificatesEnum.AcademicSequenceCertificate,
        "name": {
          "en": this.translate.instant("dashboard.issue of certificate.AcademicSequenceCertificate"),
          "ar": this.translate.instant("dashboard.issue of certificate.AcademicSequenceCertificate")
        }
      },
      {
        "value": CertificatesEnum.GradesCertificate,
        "name": {
          "en": this.translate.instant("dashboard.issue of certificate.GradesCertificate"),
          "ar": this.translate.instant("dashboard.issue of certificate.GradesCertificate")
        }
      }
    ];

   }

  // << Students CRUD >> //
  getAllStudents(filter?){
    this.loaderService.isLoading$.next(true)

    return this.http.post('/Student/Search',filter)
    .pipe(
      take(1),
      finalize(()=> {
        this.loaderService.isLoading$.next(false)
      }))
  }


  getAllStudentsInSpecificSchool(filter,schoolId){
    this.loaderService.isLoading$.next(true)

    return this.http.post(`/Student/students/${schoolId}`,filter)
    .pipe(
      take(1),
      finalize(()=> {
        this.loaderService.isLoading$.next(false)
      }))
    }

  studentsToExport(filter, schoolId?){
    let api = this.userService.getScope() ===UserScope.Employee ? `/Student/students/${schoolId}` : '/Student/Search'
    return this.http.post(api , filter)
    .pipe(
      map(res=>{
        let data = res?.data ? res?.data : res?.result?.data
        return data.map(student =>{
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
    return this.http.get(`/Student/${id}`).pipe(take(1))
  }

  updateStudent(id, studentData){
    return this.http.put(`/Student/${id}`, studentData)
    .pipe(
      map(res=>{
        if(res?.statusCode ===HttpStatusCodeEnum.BadRequest) throw new Error()
        else return res
      }),
      take(1)
    )
  }
  deleteStudent(data){
    return this.http.post(`/Student/delete-request`,data).pipe(take(1))
  }

  getSchools(filter?:Partial<Filter>){
    this.loaderService.isLoading$.next(true)

    return this.http.post('/School/dropdowen',filter)
    .pipe(
      take(1),
      finalize(()=> {
        this.loaderService.isLoading$.next(false)
      }))
  }

  getStudentEditHistory(id, filter){

    this.loaderService.isLoading$.next(true)
    return this.http.get(`/Modification?entityId=${id}&entityName=Student`,filter)
    .pipe(
      take(1),
      finalize(()=> {
        this.loaderService.isLoading$.next(false)
      }))

  }

  getStudentEditHistoryItem(id){
    return this.http.get(`/Modification/${id}`)
  }

  postTransferGroup(data){
    return this.http.post('/Student/mass-transfer-request',data)
    .pipe(
      map(res=>{
        if(res.statusCode ==HttpStatusCodeEnum.BadRequest) throw new Error(getLocalizedValue(res?.errorLocalized))
        return res
      }),
      take(1)
    )
  }



// مواد الطالب القابله للاعفاء
getStudentSubjectsThatAllowedToExemption(query:{schoolId:number,gradeId:number,studentId:number|string}){
  return this.http.get(`/Subject/exempt-subjects`,query).pipe(take(1))
}

  // << Transfer Students >> //
  transferStudent(data){
    return this.http.put('/Student/transfer', data)
    .pipe(
      map(res=>{
        if(res?.statusCode ===HttpStatusCodeEnum.BadRequest) throw new Error(getLocalizedValue(res?.errorLocalized))
        else return res
      }),
      take(1)
    )
  }

  // NOTE : ارسال طلب اعاده مرحله دراسيه -------------------------------------------------
  repeateStudyPhaseReq(data){
      return this.http.post('/Student/regrading-request', data)
      .pipe(
        map(res=>{
          if(res?.statusCode ===HttpStatusCodeEnum.BadRequest) throw new Error(getLocalizedValue(res?.errorLocalized) || res?.error)
          else return res
        }),
        take(1)
      )
  }

      // NOTE : ارسال طلب اعفاء من ماده دراسيه -------------------------------------------------
  exemptionFromStudySubjectReq(data){
    return this.http.post('/Student/exemption-from-subject-request', data).pipe(take(1))
  }

  // NOTE : ارسال طلب انسحاب من المدرسه الحاليه -------------------------------------------------
  sendWithdrawalReq(data){
    return this.http.post('/Student/withdrawal-request', data)
    .pipe(
      map(res=>{
        if(res?.statusCode ===HttpStatusCodeEnum.BadRequest) throw new Error(getLocalizedValue(res?.errorLocalized))
        else return res
      }
    ),
    take(1))
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
    .pipe(
      map(res=>{
        if(res?.statusCode ===HttpStatusCodeEnum.BadRequest) throw new Error(getLocalizedValue(res?.errorLocalized))
        else return res
      })
    )
  }

  updateStudentIdentityInfo(data){
    return this.http.post(`/Student/modify-identity-request-not-have-id`, data)
  }



   // << Students Attachment >> //
  getStudentAttachment(studentId){
    // return of([
    //   {
    //     titel: {en: "new attach",ar: "مرفق جديد"},
    //     indexId:null,
    //     files:[
    //         {
    //          id: 1583,
    //          url: "https://valsquad.blob.core.windows.net/daleel/f9dceaeb-744e-43be-91eb-ab10305c1a80.png",
    //          name: "bip3.png",
    //          uploader: { en: "Mohamed Kamal",ar: "محمد كمال"},
    //          isActive: true,
    //          comment: "",
    //          createdDate:""
    //        },
    //        {
    //         id: 1585,
    //         url: "https://valsquad.blob.core.windows.net/daleel/f9dceaeb-744e-43be-91eb-ab10305c1a80.png",
    //         name: "bip3.png",
    //          uploader: { en: "Mohamed Kamal",ar: "محمد كمال"},
    //          isActive: true,

    //          comment: "",
    //         createdDate:""
    //       },
    //     ]
    //   },

    //   {
    //       titel: {en: "identity",ar: "الهويه"},
    //       indexId:null,
    //       files:[
    //           {
    //               id: 1581,
    //               url: "https://valsquad.blob.core.windows.net/daleel/f9dceaeb-744e-43be-91eb-ab10305c1a80.png",
    //               name: "bip3.png",
    //               uploader: { en: "Mohamed Kamal",ar: "محمد كمال"},
    //               isActive: true,
    //               comment: "",
    //               createdDate:""
    //           },
    //       ]
    //   },
    // ])
    return this.http.get(`/Student/attachment/${studentId}`)
    .pipe(take(1))
  }

  updateStudentAttachment(studentId, data){
    return this.http.put(`/Student/attachment/${studentId}`, data).pipe(take(1))
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
  }1812

  getStudentSubjects(studentId,semester,filter){
    this.loaderService.isLoading$.next(true)

    return this.http.get(`/Student/student-subjects/${studentId}/${semester}`,filter)
    .pipe(
      take(1),
      finalize(()=> {
        this.loaderService.isLoading$.next(false)
      }))
  }

  studentSubjectsToExport(studentId,semester,filter){
    return this.http.get(`/Student/student-subjects/${studentId}/${semester}`,filter)
    .pipe(
      map(res=>{
        return res.result?.data.map(subject =>{
          return {
            [this.translate.instant('dashboard.parents.subjectName')]: getLocalizedValue(subject.subject),
            [this.translate.instant('dashboard.parents.Mandatory/Optional')]: subject.isElective ? this.translate.instant('dashboard.Subjects.optional') : this.translate.instant('dashboard.Subjects.mandatory'),
            [this.translate.instant('dashboard.parents.Evaluation')]: this.translate.instant(''+subject.evaluationSystem),
            [this.translate.instant('dashboard.parents.Result')]: subject.studentDegree,
            [this.translate.instant('dashboard.parents.studentperformance')]: subject?.studentPerformance || 'لايوجد',
            [this.translate.instant('dashboard.parents.GPA')]: subject.studentGPA ,
            [this.translate.instant('dashboard.parents.Credithour')]: subject.studentHour,

          }

        })
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

  recordesToExport( filter){
    return this.http.get('/Student/school-record',filter)
    .pipe(
      map(res=>{
        return res?.result?.data.map(record =>{
          return {
            [this.translate.instant('dashboard.schools.SchoolYear')]: getLocalizedValue(record.schoolYear),
            [this.translate.instant('dashboard.schools.schoolName')]: getLocalizedValue(record.grade),
            [this.translate.instant('shared.grade')]: record.finalResult==StatusEnum.Passed? this.translate.instant('shared.allStatus.Passed'): this.translate.instant('shared.allStatus.Failed'),
            [this.translate.instant('shared.divisionName')]: getLocalizedValue(record.division),
            [this.translate.instant('dashboard.students.finalScore')]: this.translate.instant('shared.allStatus.' + record.finalResult),
          }
        })
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

  certificatesToExport(studentId, filter){
    return this.http.get(`/Student/student-certificates/${studentId}`,filter)
    .pipe(
      map(res=>{
        return res.data.map(certificate =>{
          return {
            [this.translate.instant('dashboard.schools.Typeofcertificate')]: getLocalizedValue(certificate.certificate),
            [this.translate.instant('dashboard.schools.SchoolYear')]: getLocalizedValue(certificate.schoolYear),
            [this.translate.instant('dashboard.schools.Dateofapplicationforthecertificate')]: certificate.issuanceDate,
            '':certificate?.url,

          }
        })
      }))
  }


   // << Others >> //
  getTalents(){
    return this.http.get(`/Student/talent`).pipe(take(1))
  }

  getStudentNatioaniliteCategories()
  {
    return this.http.get(`/Student/nationality-categories/dropdown`).pipe(take(1))
  }

  // << issuance of a certificate >> //


    getCetificateManually(id){
      return this.http.get(`/Student/${id}/certificatemanually`)
    }
    postCertificate(obj){
      return this.http.post('/student/sentCertificate',obj)
    }

    postGradeCertificate(certificate)
    {
      return this.http.post('/Certificate/org/grades-certificate-request',certificate)
    }
    postAcademicCertificate(certificate)
    {
      return this.http.post('/Certificate/org/academic-sequencen-certificate-request',certificate)
    }
}
