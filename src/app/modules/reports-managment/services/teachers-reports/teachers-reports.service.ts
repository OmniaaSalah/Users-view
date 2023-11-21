import { Injectable,inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SearchModel } from 'src/app/core/models/filter-search/filter-search.model';
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
        sortField: this.lang=='ar' ?  'SchoolArabicName': 'SchoolEnglishName'
      },
      {
        name:this.translate.instant('SchoolYear.Subject'),
        isSelected: true,
        sortField:this.lang=='ar' ?  'SubjectArabicName': 'SubjectEnglishName'
      },
      {
        name: this.translate.instant('reports.SubjectsTeachersNumbers'),
        isSelected: true,
        sortField:'TeachersCount'
      },
      {
        name:  this.translate.instant('reports.TeacherName'),
        isSelected: true,
        sortField:this.lang=='ar' ?  'TeccherArabicName': 'TeccherEnglishName'
      },
      {
        name:this.translate.instant('reports.TeacherSpeciality'),
        isSelected: true,
        sortField:''
      },
      {
        name:this.translate.instant('reports.TeacherEquiivalent'),
        isSelected: true,
        sortField:''
      }

    ];
  }

  getAllTeachers(filter?:Partial<SearchModel>){
    this.tableLoaderService.isLoading$.next(true)

    return this.http.post('/School/teachers-report',filter)
    .pipe(
      take(1),
      finalize(()=> {
        this.tableLoaderService.isLoading$.next(false)
      }))
  }

  teachersToExport(filter?:Partial<SearchModel>)
  {
    return this.http.post('/School/teachers-report',filter)
    .pipe(
      map(res=>{
        return res.data.map(teacher =>{
          return {
            [this.translate.instant('School')]: teacher?.schoolName ? teacher?.schoolName[this.lang] : this.translate.instant('shared.notFound'),
            [this.translate.instant('SchoolYear.Subject')]: teacher?.subjectName ? teacher?.subjectName[this.lang] : this.translate.instant('shared.notFound'),
            [this.translate.instant('reports.SubjectsTeachersNumbers')]: teacher?.teachersCount,
            [this.translate.instant('reports.TeacherName')]:teacher?.teacherName ? teacher?.teacherName[this.lang] : this.translate.instant('shared.notFound'),
            [this.translate.instant('reports.TeacherSpeciality')]: teacher?.teacherField ? teacher?.teacherField[this.lang] : this.translate.instant('shared.notFound'),
            [this.translate.instant('reports.TeacherEquiivalent')]: teacher?.sbjectWeeklyHours

          }
        })
      }))
  }
}
