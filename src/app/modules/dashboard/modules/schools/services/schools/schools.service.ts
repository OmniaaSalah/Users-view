import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { Filter } from 'src/app/core/Models/filter/filter';
import { HttpHandlerService } from 'src/app/core/services/http-handler.service';

@Injectable({
  providedIn: 'root'
})
export class SchoolsService {

  constructor(private http:HttpHandlerService) { }

  // << SCHOOLS >>
  getAllSchools(filter:Partial<Filter>){
    return this.http.get('/School',filter).pipe(take(1))
  }

  getSchool(id){
    return this.http.get(`/School/${id}`,).pipe(take(1))
  }

  addSchoolSlogan(schoolId, slogan){
    this.http.post(`${schoolId}`,slogan)
  }


  // << SCHOOL EMPLOYEE >> 
  getEmployee(id){
    this.http.get(`${id}`).pipe(take(1))
  }

  editEmpoyee(id, employeeData){
    this.http.post(`${id}`,employeeData).pipe(take(1))

  }

}
