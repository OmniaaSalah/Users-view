import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';

@Injectable({
  providedIn: 'root'
})
export class DivisionService {

  constructor(private http:HttpHandlerService) { }

  // << SCHOOL DIVISIONS >> //
  getSchoolDivisions(schoolId, filter={}){
    return this.http.get(`/School/${schoolId}/divisions`,filter).pipe(take(1))
  }

  // --------------------------------------------------------

  getDivisionInfo(schoolId, divisionId){
    return this.http.get(`/Division/school/${schoolId}/grade/0/division/${divisionId}`,).pipe(take(1))
  }

  updateDivisionInfo(divisionId, divisionData){
    return this.http.put(`/Division/${divisionId}`,divisionData).pipe(take(1))
  }

  // --------------------------------------------------------

  getDivisionTeachers(divisionId){
    return this.http.get(`/Division/${divisionId}/teacher?schoolyear=1`)
  }

  updateDivisionTeachers(divisionId,data){
    return this.http.put(`/Division/${divisionId}/teacher`,data)
  }

  //-------------------------------------------------------------

  getStudentsWithoutDivisions(schoolId){
    return this.http.get(`/Student/students-without-division`)
  }
  addStudentsTodivision(schoolId, divisionId, students){
    return this.http.post(`/Division/school/${schoolId}/grade/0/division/${divisionId}/add-student-division`,students).pipe(take(1))
  }


  // << Division STUDENTS >> //
  getDivisionStudents(schoolId, divisionId,filter){
    this.http.get(`${schoolId}`,filter).pipe(take(1))
  }

  getDivisionTracks( divisionId){
    return this.http.get(`/Track/${divisionId}/division-tracks`).pipe(take(1))
  }
  

  transferStudentToAnotherDivision(data){
    return this.http.put('/Division/transfer/student', data).pipe(take(1))
  }

  // << ABSENCE RECORDS >> //
  getAbsenceRecords(schoolId, TrackId){
    this.http.get(`${schoolId}`).pipe(take(1))

  }

  addAbsentStudents(schoolId, TrackId, students){
    this.http.post(`${TrackId}`,students).pipe(take(1))

  }

  deleteAbsentStudent(id){
    this.http.delete(`${id}`).pipe(take(1))
  }

}
