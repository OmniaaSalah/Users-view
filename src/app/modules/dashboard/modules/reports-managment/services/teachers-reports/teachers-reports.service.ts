import { Injectable,inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Filter } from 'src/app/core/models/filter/filter';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { finalize, map, Observable, take } from 'rxjs';
import { TranslationService } from 'src/app/core/services/translation/translation.service';

@Injectable({
  providedIn: 'root'
})
export class TeachersReportsService {
  lang = inject(TranslationService).lang;

  constructor(private translate:TranslateService,private http: HttpHandlerService, private tableLoaderService: LoaderService) { }
  getTableColumns()
  {
    return [
      {
        name:this.translate.instant('School'),
        isSelected: true,
        isDisabled: true,
      },
      {
        name:this.translate.instant('dashboard.SchoolYear.Subject'),
        isSelected: true,
        isDisabled: true,
      },
      {
        name: this.translate.instant('dashboard.reports.SubjectsTeachersNumbers'),
        isSelected: true,
        isDisabled: true,
      },
      {
        name:  this.translate.instant('dashboard.reports.TeacherName'),
        isSelected: true,
        isDisabled: true,
      },
      {
        name:this.translate.instant('dashboard.reports.TeacherSpeciality'),
        isSelected: true,
        isDisabled: true,
      },
      {
        name:this.translate.instant('dashboard.reports.TeacherEquiivalent'),
        isSelected: true,
        isDisabled: true,
      }
  
    ];
  }

  getAllTeachers(filter?:Partial<Filter>){
    this.tableLoaderService.isLoading$.next(true)

    return this.http.post('/School/teachers-report',filter)
    .pipe(
      take(1),
      finalize(()=> {
        this.tableLoaderService.isLoading$.next(false)
      }))
  }

  teachersToExport(filter?:Partial<Filter>)
  {
    return this.http.post('/School/teachers-report',filter)
    .pipe(
      map(res=>{
        return res.data.map(teacher =>{
          return {
            [this.translate.instant('School')]: teacher?.schoolName ? teacher?.schoolName[this.lang] : this.translate.instant('shared.notFound'),
            [this.translate.instant('dashboard.SchoolYear.Subject')]: teacher?.subjectName ? teacher?.subjectName[this.lang] : this.translate.instant('shared.notFound'),
            [this.translate.instant('dashboard.reports.SubjectsTeachersNumbers')]: teacher?.teachersCount,
            [this.translate.instant('dashboard.reports.TeacherName')]:teacher?.teacherName ? teacher?.teacherName[this.lang] : this.translate.instant('shared.notFound'),
            [this.translate.instant('dashboard.reports.TeacherSpeciality')]: teacher?.teacherField ? teacher?.teacherField[this.lang] : this.translate.instant('shared.notFound'),
            [this.translate.instant('dashboard.reports.TeacherEquiivalent')]: teacher?.sbjectWeeklyHours

          }
        })
      }))
  }
}
