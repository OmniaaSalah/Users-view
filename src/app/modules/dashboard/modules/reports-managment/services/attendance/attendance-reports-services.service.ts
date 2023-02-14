import { Injectable ,inject} from '@angular/core';
import { Filter } from 'src/app/core/models/filter/filter';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { finalize, map, Observable, take } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from 'src/app/core/services/translation/translation.service';

@Injectable({
  providedIn: 'root'
})
export class AttendanceReportsServicesService {
  lang = inject(TranslationService).lang;

  constructor(private translate:TranslateService, private tableLoaderService: LoaderService ,private http: HttpHandlerService) { }
  tabelColumns = [ 
   
 
 
    {
 
      name:this.translate.instant('shared.divisionName'),
      isSelected: true,
      isDisabled: true,
    },
    {
   
      name: this.translate.instant('shared.gradeName'),
      isSelected: true,
      isDisabled: true,
    },
  
    {
      name: this.translate.instant('dashboard.reports.AttendanceNumbers'),
      isSelected: true,
      isDisabled: true,
    },
    {
      name: this.translate.instant('dashboard.reports.AbsenceNumbers'),
      isSelected: true,
      isDisabled: true,
    },
    {
      name: this.translate.instant('dashboard.parents.attendancePercentage'),
      isSelected: true,
      isDisabled: true,
    },
    {
      name: this.translate.instant('dashboard.parents.absencePercentage'),
      isSelected: true,
      isDisabled: true,
    },
    {
  
      name: this.translate.instant('dashboard.issue of certificate.student name') ,
      isSelected: false,
      isDisabled: false,
    },
    {
     
      name: this.translate.instant('Students nickname'),
      isSelected: false,
      isDisabled: false,
    },
    {
   
      name:this.translate.instant('dashboard.students.daleelNumber'),
      isSelected: false,
      isDisabled: false,
    },
    {
     
      name:this.translate.instant('dashboard.students.manhalNumber'),
      isSelected: false,
      isDisabled: false,
    },
    {
      
      name:this.translate.instant('dashboard.parents.parentName'),
      isSelected: false,
      isDisabled: false,
    },
  ];

  getAllAbbsenceAndAttendance(filter?:Partial<Filter>){
    this.tableLoaderService.isLoading$.next(true)

    return this.http.get('/Student/student-abbsent-report',filter)
    .pipe(
      take(1),
      finalize(()=> {
        this.tableLoaderService.isLoading$.next(false)
      }))
  }

  attendanceAndAbbsenceToExport(filter?:Partial<Filter>)
  {
    return this.http.get('/Student/student-abbsent-report',filter)
    .pipe(
      map(res=>{
        return res.result.data.map(student =>{
          return {
            [this.translate.instant('shared.divisionName')]:student?.devisionName ? student?.devisionName[this.lang] : this.translate.instant('shared.notFound'),
            [this.translate.instant('shared.gradeName')]:student?.gradeName ? student?.gradeName[this.lang] : this.translate.instant('shared.notFound'),
            [this.translate.instant('dashboard.reports.AttendanceNumbers')]: student?.attendantCount ,
            [this.translate.instant('dashboard.reports.AbsenceNumbers')]:student?.absenceCount,
            [this.translate.instant('dashboard.parents.attendancePercentage')]:student?.attendantPersentage +'%',
            [this.translate.instant('dashboard.parents.absencePercentage')]: student?.absencePersentage +'%',
            [this.translate.instant('dashboard.issue of certificate.student name')]: student?.studentName? student?.studentName[this.lang] : this.translate.instant('shared.notFound'),
            [this.translate.instant('Students nickname')]:student?.studentSurName ? student?.studentSurName[this.lang] : this.translate.instant('shared.notFound'),
            [this.translate.instant('dashboard.students.daleelNumber')]: student?.daleelId ? student?.daleelId : this.translate.instant('shared.notFound'),
            [this.translate.instant('dashboard.students.manhalNumber')]: student?.manhalNumber ? student?.manhalNumber : this.translate.instant('shared.notFound'),
            [this.translate.instant('dashboard.parents.parentName')]: student?.guardianName ? student?.guardianName[this.lang] : this.translate.instant('shared.notFound'),

          }
        })
      }))
  }
}
