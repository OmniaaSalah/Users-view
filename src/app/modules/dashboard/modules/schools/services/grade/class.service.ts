import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';

@Injectable({
  providedIn: 'root'
})
export class GradesService {

  constructor(private http:HttpHandlerService) { }

  getAllClasses(schoolId, filter = {}){
    return this.http.get(`/Grade/school-grades/${schoolId}`,filter)
  }

  getclass(schoolId, id){
    this.http.get(`${id}`,)
  }

  editClass(schoolId, classId, classData){
    this.http.post(`${classId}`,classData)
  }

  getGradeTracks(gradeId){
    return this.http.get(`/SchoolTrack/school-tracks/${gradeId}`).pipe(take(1))
  }
}
