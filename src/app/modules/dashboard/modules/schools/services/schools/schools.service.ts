import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Filter } from 'src/app/core/Models/filter/filter';
import { HttpHandlerService } from 'src/app/core/services/http-handler.service';
import { ISchoolChart } from '../../components/school-list/school-list.models';

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
  getCharts(): Observable<ISchoolChart> {
    // TODO => Need to implement interceptor
    return this.http.get('/School/Statistics', {}, {
      'Authorization':  `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBdXRoZW50aWNhdGUiOiJ0cnVlIiwibmFtZSI6ImFkbWluQHNwZWEuY29tIiwiZW1haWwiOiJhZG1pbkBzcGVhLmNvbSIsIm5hbWVpZCI6IjEiLCJTY29wZSI6IlNQRUEiLCJuYmYiOjE2NjQ1NjUxMzcsImV4cCI6MTY2NDY1MTUzNywiaWF0IjoxNjY0NTY1MTM3fQ.FXIOywLftOBW-ZSM-7ep-YNXWpD3ZXFJHeT_H7EHk1U`
    });
  }
}
