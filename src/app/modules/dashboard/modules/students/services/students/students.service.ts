import { Injectable } from '@angular/core';
import { Filter } from 'src/app/core/Models/filter/filter';
import { HttpHandlerService } from 'src/app/core/services/http-handler.service';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private http:HttpHandlerService) { }

  getAllStudents(filter:Partial<Filter>){
    return this.http.get('/Student',filter)
  }

  getStudent(id){
    return this.http.get(`/Student${id}`)
  }

  editStudent(id, studentData){
    return this.http.put(`/Student${id}`, studentData)
  }

  transferStudent(id){

  }

  getStudentMedicalfile(id){

  }

  editStudentMedicalfile(id, data){
    this.http.post(`${id}`,data)
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


}
