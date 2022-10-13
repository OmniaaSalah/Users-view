import { Injectable } from '@angular/core';
import { delay, finalize, take } from 'rxjs';
import { Filter } from 'src/app/core/Models/filter/filter';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private http:HttpHandlerService, private loaderService: LoaderService) { }
  
  getAllStudents(filter){
    this.loaderService.isLoading$.next(true)
    
    return this.http.get('/Student',filter)
    .pipe(
      take(1),
      finalize(()=> {
        this.loaderService.isLoading$.next(false)
      }))
  }

  getStudent(id){
    return this.http.get(`/Student${id}`)
  }

  updateStudent(id, studentData){
    return this.http.put(`/Student${id}`, studentData)
  }

  transferStudent(id){

  }

  getStudentMedicalfile(id){
    return this.http.get(`/Student/${id}/medicalRecord`).pipe(take(1))
  }

  updateStudentMedicalfile(id, data){
    return this.http.post(`/Student/medical-record`,data).pipe(take(1))
  }

  deleteStudent(id){
    this.http.delete(`${id}`)
  }


  sendStudentAttachment(attachmentData){
    return this.http.post(`/Student/Attachment`, attachmentData)

  }

  deleteStudentAttachment(id){
    return this.http.delete(`/Student/Attachment`, {attachmentId:id})

  }

  getTalents(){
    return this.http.get(`/Student/talent`).pipe(take(1))
  }

}
