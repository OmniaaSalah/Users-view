import { Injectable } from '@angular/core';
import { HttpHandlerService } from 'src/app/core/services/http-handler.service';

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  constructor(private http:HttpHandlerService) { }

  // << SCHOOL TRACKS >> //
  getAllTrackes(schoolId, filter){
    this.http.get(`${schoolId}`,filter)
  }

  getTrack(schoolId, id){
    this.http.get(`${id}`,)
  }

  editTrack(schoolId, TrackId, TrackData){
    this.http.post(`${TrackId}`,TrackData)
  }



  // << TRACK STUDENTS >> //
  getTrackStudents(schoolId, TrackId,filter){
    this.http.get(`${schoolId}`,filter)
  }

  addStudentsToTrack(schoolId, TrackId, students){
    this.http.post(`${TrackId}`,students)
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
