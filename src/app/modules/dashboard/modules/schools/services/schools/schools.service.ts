import { Injectable } from '@angular/core';
import { delay, finalize, Observable, take } from 'rxjs';
import { Filter } from 'src/app/core/Models/filter/filter';
import { School } from 'src/app/core/models/schools/school.model';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';

@Injectable({
  providedIn: 'root'
})
export class SchoolsService {

  constructor(private http:HttpHandlerService, private loaderService: LoaderService) { }

  // << SCHOOLS >>
  getAllSchools(filter?:Partial<Filter>){
    this.loaderService.isLoading$.next(true)

    return this.http.get('/School',filter)
    .pipe(
      take(1),
      delay(3000),
      finalize(()=> {
        this.loaderService.isLoading$.next(false)
      }))
  }

  getSchool(schoolId): Observable<School>{
    return this.http.get(`/School/${schoolId}`,).pipe(take(1))
  }




  getSchoolAnnualHolidays(schoolId){
    return this.http.get(`/Holiday/holiday/annual/${schoolId}`).pipe(take(1))
  }

  updateSchoolLogo(schoolId, data){
    return this.http.post(`/School/school-logo`,data, {schoolId})
  }

  updateSchoolDiplomaLogo(schoolId, data){
    return this.http.post(`/School/school-diploma`,data, {schoolId})
  }


  // << SCHOOL EMPLOYEE >> 
  getEmployee(id){
    this.http.get(`${id}`)
  }

  editEmpoyee(id, employeeData){
    this.http.post(`${id}`,employeeData)

  }


  // << SCHOOL SUBJECTS >>

  getSchoolSubjects(schoolId, filter){
    return this.http.get(`/Subject/school-subject/${schoolId}`,filter)
  }

  // << SCHOOL EDIT LIST>>

}
