import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';

@Injectable({
  providedIn: 'root'
})
export class GradesService {

  constructor(private http:HttpHandlerService) { }

  getSchoolGardes(schoolId, filter = {}){
    return this.http.get(`/Grade/school-grades/${schoolId}`,filter)
  }

  getGrade(schoolId, id){
    this.http.get(`${id}`,)
  }

  editGrade(schoolId, classId, classData){
    this.http.post(`${classId}`,classData)
  }

  getGradeTracks(schoolId){
    return this.http.get(`/SchoolTrack/school-tracks/${schoolId}`).pipe(take(1))
  }
}
