import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Filter } from 'src/app/core/Models/filter/filter';
import { School } from 'src/app/core/models/schools/school.model';
import { HttpHandlerService } from 'src/app/core/services/http-handler.service';

@Injectable({
  providedIn: 'root'
})
export class SchoolsService {

  constructor(private http:HttpHandlerService) { }

  // << SCHOOLS >>
  getAllSchools(filter?:Partial<Filter>){
    return this.http.get('/School',filter).pipe(take(1))
  }

  getSchool(schoolId): Observable<School>{
    return this.http.get(`/School/${schoolId}`,).pipe(take(1))
  }




  getSchoolAnnualHolidays(schoolId){
    return this.http.get(`/Holiday/holiday/annual/${schoolId}`).pipe(take(1))
  }

  addSchoolSlogan(schoolId, slogan){
    return this.http.post(`School/attachment/${schoolId}`,slogan)
  }


  // << SCHOOL EMPLOYEE >> 
  getEmployee(id){
    this.http.get(`${id}`).pipe(take(1))
  }

  editEmpoyee(id, employeeData){
    this.http.post(`${id}`,employeeData).pipe(take(1))

  }


  // << SCHOOL SUBJECTS >>

  getSchoolSubjects(schoolId, filter){
    return this.http.get(`/Subject/school-subject/${schoolId}`,filter)
  }

  // << SCHOOL EDIT LIST>>

}
