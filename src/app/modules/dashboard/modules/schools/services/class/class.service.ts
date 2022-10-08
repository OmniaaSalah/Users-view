import { Injectable } from '@angular/core';
import { HttpHandlerService } from 'src/app/core/services/http-handler.service';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  constructor(private http:HttpHandlerService) { }

  getAllClasses(schoolId, filter){
    this.http.get(`${schoolId}`,filter)
  }

  getclass(schoolId, id){
    this.http.get(`${id}`,)
  }

  editClass(schoolId, classId, classData){
    this.http.post(`${classId}`,classData)
  }
}
