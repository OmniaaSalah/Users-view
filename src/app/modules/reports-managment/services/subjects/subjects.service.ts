import { Injectable ,inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SearchModel } from 'src/app/core/models/filter-search/filter-search.model';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { finalize, map, Observable, take } from 'rxjs';
import { TranslationService } from 'src/app/core/services/translation/translation.service';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {
  lang = inject(TranslationService).lang;
  constructor(private translate : TranslateService,private http: HttpHandlerService, private tableLoaderService: LoaderService) { }

  getAllSubjects(filter?:Partial<SearchModel>){
    this.tableLoaderService.isLoading$.next(true)
    return this.http.post('/School/subject-report',filter)
    .pipe(
      take(1),
      finalize(()=> {
        this.tableLoaderService.isLoading$.next(false)
      }))
  }

  tabelColumns = [
    {
      name:this.translate.instant('School'),
      isSelected: true,
      sortField: this.lang=='ar' ?  'SchoolNameAr': 'SchoolNameEn'
    },
    {
      name:this.translate.instant('schools.schoolNumber'),
      isSelected: true,
      sortField:'SchoolNumber'
    },
    {

      name:this.translate.instant('shared.state'),
      isSelected: true,
      sortField:this.lang=='ar' ?  'StateNameAr': 'StateNameEn'
    },
    {

      name:this.translate.instant('reports.subjectCount'),
      isSelected: true,
      sortField:'SubjectsCountPerSchool'
    },
    {
      name:this.translate.instant('schools.SchoolCurriculum'),
      isSelected: true,
      sortField:this.lang=='ar' ?  'CurriculumNameAr': 'CurriculumNameEn'
    },
    {
      name:this.translate.instant('shared.grade'),
      isSelected: true,
      sortField:this.lang=='ar' ?  'GradeNameAr': 'GradeNameEn'
    },
    {
      name:this.translate.instant('shared.division'),
      isSelected: true,
      sortField:this.lang=='ar' ?  'DivisionNameAr': 'DivisionNameEn'
    },
    {
      name:this.translate.instant('shared.track'),
      isSelected: true,
      sortField:this.lang=='ar' ?  'TrackNameAr': 'TrackNameEn'
    }

  ];

  subjectsToExport(filter?:Partial<SearchModel>)
  {
    return this.http.post('/School/subject-report',filter)
    .pipe(
      map(res=>{
        return res.data.map(subject =>{
          return {
            [this.translate.instant('School')]: subject?.school[this.lang],
            [this.translate.instant('schools.schoolNumber')]: subject?.schoolCode,
            [this.translate.instant('shared.state')]: subject?.state[this.lang],
            [this.translate.instant('reports.subjectCount')]: subject?.subjectsCountPerSchool,
            [this.translate.instant('shared.grade')]: subject?.grade[this.lang],
            [this.translate.instant('shared.division')]: subject?.division[this.lang],
            [this.translate.instant('shared.track')]: subject?.track[this.lang]



          }
        })
      }))
  }
}
