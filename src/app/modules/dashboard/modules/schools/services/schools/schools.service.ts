import { Injectable,inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { delay, finalize, Observable, take,BehaviorSubject,map } from 'rxjs';
import { Filter } from 'src/app/core/Models/filter/filter';
import { GenericResponse } from 'src/app/core/models/global/global.model';
import { School, SchoolEmployee } from 'src/app/core/models/schools/school.model';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { StatusEnum } from 'src/app/shared/enums/status/status.enum';
import { UserScope } from 'src/app/shared/enums/user/user.enum';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { ISchoolChart } from '../../components/school-list/school-charts/school-chart.models';

@Injectable({
  providedIn: 'root'
})
export class SchoolsService {

  currentSchoolName=this.userService.getCurrentSchoollName();
  currentUserScope = inject(UserService).getCurrentUserScope();
  get userScope() { return UserScope };
  constructor(private http:HttpHandlerService, 
    private tableLoaderService: LoaderService,
    private userService:UserService,
    private translate:TranslateService
    ) { 
    
  if(this.currentUserScope==this.userScope.Employee)
   {
   this.currentSchoolName= new BehaviorSubject(this.userService.getCurrentSchoollName())
  }
  

  }

  // << SCHOOLS >>
  getAllSchools(filter?:Partial<Filter>){
    this.tableLoaderService.isLoading$.next(true)

    return this.http.get('/School',filter)
    .pipe(
      take(1),
      finalize(()=> {
        this.tableLoaderService.isLoading$.next(false)
      }))
  }

  schoolsToExport(filter){
    return this.http.get('/School',filter)
    .pipe(
      map(res=>{
        return res.data.map(school =>{
          return {
            [this.translate.instant('dashboard.schools.schoolName')]: school.name.ar,
            [this.translate.instant('shared.city')]: school.city.ar,
            [this.translate.instant('shared.state')]: school.state.ar,
            [this.translate.instant('shared.curriculum')]: school.curriculum.ar,
            [this.translate.instant('dashboard.schools.studentsNumber')]: school.studentCount,
            [this.translate.instant('dashboard.schools.schoolStablishmentDate')]: school.establishmentDate,
            [this.translate.instant('dashboard.schools.schoolStatus')]: school.status == StatusEnum.Active? this.translate.instant('shared.allStatus.SchoolActive') : this.translate.instant('shared.allStatus.SchoolInactive')  ,

          }
        })
      }))
  }

  getSchoolsDropdown(filter?:Partial<Filter>){
    this.tableLoaderService.isLoading$.next(true)

    return this.http.get('/School/dropdowen',filter)
    .pipe(
      take(1),
      finalize(()=> {
        this.tableLoaderService.isLoading$.next(false)
      }))
  }

  getSchool(schoolId): Observable<School>{
 
    return this.http.get(`/School/${schoolId}`,).pipe(take(1))
  }

  getSchoolGardes(schoolId, filter = {}){
    return this.http.get(`/School/${schoolId}/grade`,filter).pipe(take(1))
  }

  getSchoolDivisions(schoolId, filter={}){
    return this.http.get(`/School/${schoolId}/division`,filter).pipe(take(1))
  }

  getSchoolsTracks(schoolId){
    return this.http.get(`/SchoolTrack/school-tracks/${schoolId}`).pipe(take(1))
  }
  

  getCharts(): Observable<ISchoolChart> {
    // TODO => Need to implement interceptor
    return this.http.get('/School/Statistics', {}, {

    });
  }


  getSchoolAnnualHolidays(schoolId, filter:Filter){
    this.tableLoaderService.isLoading$.next(true)
    return this.http.get(`/Holiday/holiday/annual/${schoolId}`,filter)
    .pipe(
      take(1),
      finalize(()=> {
        this.tableLoaderService.isLoading$.next(false)
      }))
  }

  updateFlexableHoliday(holidayId, data){
    return this.http.post(`/Holiday/holiday/flexible/request/${holidayId}`,data).pipe(take(1))
  }

  updateSchoolLogo(schoolId, data){
    return this.http.post(`/School/school-logo`,data, {schoolId})
  }

  updateSchoolDiplomaLogo(schoolId, data){
    return this.http.post(`/School/diploma-logo`,data, {schoolId})
  }


  // << SCHOOL EMPLOYEE >>

  getSchoolManager(schoolId): Observable<SchoolEmployee>{
    return this.http.get(`/School/${schoolId}/manager`).pipe(take(1))
  }

  getSchoolEmployees(schoolId, filter?:Filter): Observable<GenericResponse<SchoolEmployee[]>>{
    this.tableLoaderService.isLoading$.next(true)
    return this.http.get(`/School/${schoolId}/SchoolEmployee`, filter)
    .pipe(
      take(1),
      finalize(()=> {
        this.tableLoaderService.isLoading$.next(false)
      }))
  }

  updateEmpoyee(id, employeeData){
   
    return this.http.patch(`/School/update/employee/${id}`,employeeData)
  
  }

  getSchoolEmployeesJobTitle(){
    return this.http.get('/School/job-titel').pipe(take(1))
  }


  // << SCHOOL SUBJECTS >>

  getSchoolSubjects( filter){
    this.tableLoaderService.isLoading$.next(true)
    return this.http.get(`/School/Subject`,filter)
    .pipe(
      take(1),
      finalize(()=> {
        this.tableLoaderService.isLoading$.next(false)
      }))
  }

  // << SCHOOL EDIT LIST>>
  getSchoolEditList(filter){
    
    this.tableLoaderService.isLoading$.next(true)
    return this.http.get(`/Modification`,filter)
    .pipe(
      take(1),
      finalize(()=> {
        this.tableLoaderService.isLoading$.next(false)
      }))

  }

    // << SCHOOL EDIT LIST Detauls>>
    getDetailsOfEditItem(id){
    
  
      return this.http.get(`/Modification/${id}`)
    
  
    }

    getAllGrades(){
      return this.http.get('/Grade')
    }

}
