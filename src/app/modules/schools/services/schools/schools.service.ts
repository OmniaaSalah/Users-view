import { Injectable,inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { delay, finalize, Observable, take,BehaviorSubject,map } from 'rxjs';
import { Filter } from 'src/app/core/Models/filter/filter';
import { GenericResponse } from 'src/app/core/models/global/global.model';
import { School, SchoolEmployee } from 'src/app/core/models/schools/school.model';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { StatusEnum } from 'src/app/shared/enums/status/status.enum';
import { UserScope } from 'src/app/shared/enums/user/user.enum';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { ISchoolChart } from '../../components/school-list/school-charts/school-chart.models';
import { HttpStatusCodeEnum } from 'src/app/shared/enums/http-status-code/http-status-code.enum';
import { getLocalizedValue } from 'src/app/core/classes/helpers';

@Injectable({
  providedIn: 'root'
})
export class SchoolsService {

  lang = inject(TranslationService).lang;
  currentUserScope = inject(UserService).getCurrentUserScope();
  get userScope() { return UserScope };
  constructor(private http:HttpHandlerService,
    private tableLoaderService: LoaderService,
    private userService:UserService,
    private translate:TranslateService
    ) {}

  // << SCHOOLS >>
  getAllSchools(filter?:Partial<Filter>){
    this.tableLoaderService.isLoading$.next(true)

    return this.http.post('/School/Search',filter)
    .pipe(
      take(1),
      finalize(()=> {
        this.tableLoaderService.isLoading$.next(false)
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

  getAllSchoolNames(){
    return this.http.get('/School/school/name')
  }


  schoolsToExport(filter){
    return this.http.post('/School/Search',filter)
    .pipe(
      map(res=>{
        return res.data.map(school =>{
          return {
            [this.translate.instant('dashboard.schools.schoolName')]:school.name? school.name[this.lang]:'',
            [this.translate.instant('shared.city')]:school.city? school.city[this.lang]:'',
            [this.translate.instant('shared.state')]:school.state? school.state[this.lang]:'',
            [this.translate.instant('shared.curriculum')]:school.curriculum? school.curriculum[this.lang]:'',
            [this.translate.instant('dashboard.schools.studentsNumber')]: school.studentCount,
            [this.translate.instant('dashboard.schools.schoolStablishmentDate')]: school.establishmentDate,
            [this.translate.instant('dashboard.schools.schoolStatus')]: school.status == StatusEnum.Active? this.translate.instant('shared.allStatus.SchoolActive') : this.translate.instant('shared.allStatus.SchoolInactive')  ,

          }
        })
      }))
  }

  employeesToExport(schoolId,filter){
    return this.http.post(`/School/${schoolId}/SchoolEmployee/Search`,filter)
    .pipe(
      map(res=>{
        return res.data.map(employee =>{
          return {
            [this.translate.instant('dashboard.schools.employeeId')]: employee?.employeeIdNumber,
            [this.translate.instant('dashboard.schools.employeeName')]: employee?.name[this.lang],
            [this.translate.instant('dashboard.schools.employeeNickname')]:employee?.surName[this.lang],
            [this.translate.instant('dashboard.schools.jobTitle')]: employee?.jobTitle[this.lang],
            [this.translate.instant('shared.email')]:employee?.email,
            [this.translate.instant('shared.personalId')]: employee?.emiratesIdNumber,
            [this.translate.instant('dashboard.schools.employeeStatus')]:  this.getEmployeeStatusToExport(employee.status)  ,

          }
        })
      }))
  }
  editListToExport(filter){
    return this.http.get(`/Modification`,filter)
    .pipe(
      map(res=>{
        return res.data.map(item =>{
          return {
            [this.translate.instant('dashboard.schools.editBy')]:item?.createdBy[this.lang],
            [this.translate.instant('dashboard.schools.jobTitle')]: item?.jobTitle[this.lang],
            [this.translate.instant('dashboard.schools.editionDate')]: item?.createdDate,
            [this.translate.instant('dashboard.schools.editSummary')]: this.translate.instant(item?.type),

          }
        })
      }))
  }

  holidaysToExport(schoolId,filter){
    return this.http.get(`/Holiday/holiday/annual/${schoolId}`,filter)
    .pipe(
      map(res=>{
        return res.data.map(item =>{
          return {
            [this.translate.instant('dashboard.schools.annulCalendarName')]:item?.annualCalendarName[this.lang],
            [this.translate.instant('dashboard.AnnualHoliday.Year')]: item?.year,
            [this.translate.instant('dashboard.schools.holidayName')]: item?.name[this.lang],
            [this.translate.instant('shared.date' )]: this.translate.instant('shared.From')+" "+item?.dateFrom+" "+this.translate.instant('shared.To')+" "+item?.dateTo,
            [this.translate.instant('shared.Created Date')]: item?.createdDate,
            [this.translate.instant('dashboard.AnnualHoliday.Holiday Status')]: item?.flexibilityStatus==StatusEnum.Flexible?this.translate.instant('shared.allStatus.Flexible'):this.translate.instant('shared.allStatus.NotFlexible'),


          }
        })
      }))
  }
  subjectsToExport(filter){
    return this.http.get(`/School/Subject`,filter)
    .pipe(
      map(res=>{
        return res.data.map(item =>{
          return {
            [this.translate.instant('dashboard.Subjects.subjectName')]:item?.name[this.lang],
            [this.translate.instant('shared.grade')]: item?.gradeName[this.lang],
            [this.translate.instant('shared.division')]: item?.trackName[this.lang],
            [this.translate.instant('dashboard.schools.authoritySubjects')]: item?.speaSubject,
            [this.translate.instant('dashboard.Subjects.gpaReliable')]: item?.evaluationSystem ,
            [this.translate.instant('shared.optionalOrMandatory')]: item?.isElective ?this.translate.instant('shared.optional'):this.translate.instant('shared.mandatory'),


          }
        })
      }))
  }


  getEmployeeStatusToExport(status)
  {

    if(status==StatusEnum.Active)
    {
     return this.translate.instant('shared.allStatus.Active')
    }
    else if(status==StatusEnum.Inactive)
    {
      return this.translate.instant('shared.allStatus.Inactive')
    }
    else if(status==StatusEnum.Deleted)
    {
      return this.translate.instant('shared.allStatus.deleted')
    }

  }


  getSchool(schoolId){

    return this.http.get(`/School/${schoolId}`,).pipe(take(1))
  }

  getSchoolGardes(schoolId, filter = {}){
    return this.http.get(`/School/${schoolId}/grade`,filter).pipe(take(1))
  }

  getSchoolDivisions(filter={}){
    return this.http.get(`/School/division/Search`,filter).pipe(take(1))
  }

  // getSchoolsTracks(schoolId){
  //   return this.http.get(`/SchoolTrack/school-tracks/${schoolId}`).pipe(take(1))
  // }


  getCharts(filter?:Filter): Observable<ISchoolChart> {
    return this.http.post('/School/Statistics',filter );
  }


  getSchoolAnnualHolidays(schoolId, filter?:Filter){
    this.tableLoaderService.isLoading$.next(true)
    return this.http.get(`/Holiday/holiday/annual/${schoolId}`,filter)
    .pipe(
      take(1),
      finalize(()=> {
        this.tableLoaderService.isLoading$.next(false)
      }))
  }

  sendFlexableHolidayReq(holidayId, data){
    return this.http.post(`/Holiday/holiday/flexible/request/${holidayId}`,data)
    .pipe(
      map(res=>{
        if(res.statusCode ==HttpStatusCodeEnum.BadRequest) throw new Error(getLocalizedValue(res?.result))
        return res
      }),
      take(1)
    )
  }

  reSendFlexableHolidayReq(data){
    return this.http.put(`/Holiday/holiday-flexible-request`,data)
    .pipe(
      // map(res=>{
      //   if(res.statusCode ==HttpStatusCodeEnum.BadRequest) throw new Error(getLocalizedValue(res?.result))
      //   return res
      // }),
      take(1)
    )
  }

  updateSchoolLogo(schoolId, data){
    return this.http.post(`/School/school-logo`,data, {schoolId})
  }

  updateSchoolDiplomaLogo(schoolId, data){
    return this.http.post(`/School/diploma-logo`,data, {schoolId})
  }

  updateSchoolAttachments(data){
    return this.http.patch('/School', data)
  }


  // << SCHOOL EMPLOYEE >>

  getSchoolManager(schoolId): Observable<SchoolEmployee>{
    return this.http.get(`/School/${schoolId}/manager`).pipe(take(1))
  }

  getSchoolEmployees(schoolId, filter?:Filter): Observable<GenericResponse<SchoolEmployee[]>>{
    this.tableLoaderService.isLoading$.next(true)
    return this.http.post(`/School/${schoolId}/SchoolEmployee/Search`, filter)
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

    postTransferGroup(data){
      return this.http.post('/Student/mass-transfer-request',data)
      .pipe(
        map(res=>{
          if(res.statusCode ==HttpStatusCodeEnum.BadRequest) throw new Error(getLocalizedValue(res?.errorLocalized))
          return res
        }),
        take(1)
      )
    }

    getAllSchoolsInPopUp(filter?:Partial<Filter>){
      this.tableLoaderService.isLoading$.next(true)

      return this.http.post('/School/Custom-Search',filter)
      .pipe(
        take(1),
        finalize(()=> {
          this.tableLoaderService.isLoading$.next(false)
        }))
    }

}
