import { Injectable } from '@angular/core';
import { HttpHandlerService } from 'src/app/core/services/http-handler.service';

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  constructor(private http:HttpHandlerService) { }

  // << SCHOOL DIVISIONS >> //
  getAllDivisions(schoolId, filter){
    this.http.get(`/Division/schooldivisions/${schoolId}`,filter)
  }

  getDivision(schoolId, id){
    this.http.get(`${id}`,)
  }

  editDivision(schoolId, divisionId, divisionData){
    this.http.post(`${divisionId}`,divisionData)
  }



  // << Division STUDENTS >> //
  getDivisionStudents(schoolId, divisionId,filter){
    this.http.get(`${schoolId}`,filter)
  }

  addStudentsTodivision(schoolId, divisionId, students){
    this.http.post(`${schoolId}`,students)
  }



  // << ABSENCE RECORDS >> //
  getAbsenceRecords(schoolId, TrackId){
    this.http.get(`${schoolId}`)

  }

  addAbsentStudents(schoolId, TrackId, students){
    this.http.post(`${TrackId}`,students)

  }

  deleteAbsentStudent(id){
    this.http.delete(`${id}`)
  }

}
