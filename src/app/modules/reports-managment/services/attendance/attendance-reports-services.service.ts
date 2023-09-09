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

      name:this.translate.instant('shared.division'),
      isSelected: true,
      sortField: this.lang =='ar'? 'DevisionName.ar': 'DevisionName.en'
    },
    {

      name: this.translate.instant('shared.grade'),
      isSelected: true,
      sortField: this.lang =='ar'? 'GradeName.ar': 'GradeName.en'
    },

    {
      name: this.translate.instant('dashboard.reports.AttendanceNumbers'),
      isSelected: true,
      sortField:'AttendantCount'
    },
    {
      name: this.translate.instant('dashboard.reports.AbsenceNumbers'),
      isSelected: true,
      sortField:'AbsenceCount'
    },
    {
      name: this.translate.instant('dashboard.parents.attendancePercentage'),
      isSelected: true,
      sortField:'AttendantPersentage'
    },
    {
      name: this.translate.instant('dashboard.parents.absencePercentage'),
      isSelected: true,
      sortField:'AbsencePersentage'
    },
    {

      name: this.translate.instant('dashboard.schools.student') ,
      isSelected: false,
      sortField: this.lang =='ar'? 'StudentName.ar': 'StudentName.en'
    },
    {
      name: this.translate.instant('shared.Identity Number'),
      isSelected: false,
      sortField:'EmiratesId'
    },
    {
      name: this.translate.instant('dashboard.parents.ChildWithoutNationality'),
      isSelected: false,
      sortField: ''
    },
    {

      name:this.translate.instant('dashboard.students.daleelNumber1'),
      isSelected: false,
      sortField:'DaleelId'
    },
    {

      name:this.translate.instant('dashboard.students.daleelNumber2'),
      isSelected: false,
      sortField:'DaleelId'
    },
    {

      name:this.translate.instant('dashboard.students.manhalNumber'),
      isSelected: false,
      sortField:'ManhalNumber'
    },
    {

      name:this.translate.instant('dashboard.parents.parentName'),
      isSelected: false,
      sortField: this.lang =='ar'? 'GuardianName.ar': 'GuardianName.en'
    },
  ];

  getAllAbbsenceAndAttendance(filter?:Partial<Filter>){
    this.tableLoaderService.isLoading$.next(true)

    return this.http.post('/Student/student-abbsent-report',filter)
    .pipe(
      take(1),
      finalize(()=> {
        this.tableLoaderService.isLoading$.next(false)
      }))
  }

  attendanceAndAbbsenceToExport(filter?:Partial<Filter>)
  {
    return this.http.post('/Student/student-abbsent-report',filter)
    .pipe(
      map(res=>{
        return res.result.data.map(student =>{
          return {
            [this.translate.instant('shared.division')]:student?.devisionName ? student?.devisionName[this.lang] : this.translate.instant('shared.notFound'),
            [this.translate.instant('shared.grade')]:student?.gradeName ? student?.gradeName[this.lang] : this.translate.instant('shared.notFound'),
            [this.translate.instant('dashboard.reports.AttendanceNumbers')]: student?.attendantCount ,
            [this.translate.instant('dashboard.reports.AbsenceNumbers')]:student?.absenceCount,
            [this.translate.instant('dashboard.parents.attendancePercentage')]:student?.attendantPersentage +'%',
            [this.translate.instant('dashboard.parents.absencePercentage')]: student?.absencePersentage +'%',
            [this.translate.instant('dashboard.schools.student')]: student?.student?.name ? student?.student?.name[this.lang] : this.translate.instant('shared.notFound'),
            [this.translate.instant('shared.Identity Number')]:student?.emiratesId ? student?.emiratesId : this.translate.instant('shared.notFound'),
            [this.translate.instant('dashboard.parents.ChildWithoutNationality')]: student?.reasonForNotHavingEmiratesId[this.lang] ? student?.reasonForNotHavingEmiratesId[this.lang] : this.translate.instant('shared.notFound'),
            [this.translate.instant('dashboard.students.daleelNumber1')]: student?.daleelId ? student?.daleelId : this.translate.instant('shared.notFound'),
            [this.translate.instant('dashboard.students.daleelNumber2')]: student?.student?.id ? student?.student?.id : this.translate.instant('shared.notFound'),
            [this.translate.instant('dashboard.students.manhalNumber')]: student?.manhalNumber ? student?.manhalNumber : this.translate.instant('shared.notFound'),
            [this.translate.instant('dashboard.parents.parentName')]: student?.guardianName ? student?.guardianName[this.lang] : this.translate.instant('shared.notFound'),

          }
        })
      }))
  }
}
