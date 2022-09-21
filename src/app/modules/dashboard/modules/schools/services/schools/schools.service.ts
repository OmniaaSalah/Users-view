import { Injectable } from '@angular/core';
import { Filter } from 'src/app/core/Models/filter/filter';
import { HttpHandlerService } from 'src/app/core/services/http-handler.service';

@Injectable({
  providedIn: 'root'
})
export class SchoolsService {

  constructor(private http:HttpHandlerService) { }

  // << SCHOOLS >>
  getAllSchools(filter:Filter){
    this.http.get('',filter)
  }

  getSchool(id){
    this.http.get(`${id}`,)
  }

  addSchoolSlogan(schoolId, slogan){
    this.http.post(`${schoolId}`,slogan)
  }


  // << SCHOOL EMPLOYEE >> 
  getEmployee(id){
    this.http.get(`${id}`)
  }

  editEmpoyee(id, employeeData){
    this.http.post(`${id}`,employeeData)

  }

}
