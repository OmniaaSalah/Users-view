import { Injectable,inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { finalize, map, Observable, take } from 'rxjs';
import { Filter } from 'src/app/core/models/filter/filter';
import { TranslationService } from 'src/app/core/services/translation/translation.service';

@Injectable({
  providedIn: 'root'
})
export class SchoolsReportsService {

  lang = inject(TranslationService).lang;
  constructor(private translate:TranslateService,private http: HttpHandlerService,
    private tableLoaderService: LoaderService) { }

  getAllSchools(filter?:Partial<Filter>){
    this.tableLoaderService.isLoading$.next(true)

    return this.http.get('/School/report',filter)
    .pipe(
      take(1),
      finalize(()=> {
        this.tableLoaderService.isLoading$.next(false)
      }))
  }

  getTableColumns()
  {
    return [
      {
        name:this.translate.instant('dashboard.issue of certificate.schoolName'),
        isSelected: true,
        isDisabled: true,
      },
      {
        name:this.translate.instant('shared.state'),
        isSelected: true,
        isDisabled: true,
      },
      {
        name: this.translate.instant('dashboard.schools.TeachersNumbers'),
        isSelected: true,
        isDisabled: true,
      },
      {
        name:  this.translate.instant('dashboard.schools.StudentsNumbers'),
        isSelected: true,
        isDisabled: true,
      },
      {
        name:this.translate.instant('dashboard.schools.SchoolStudentsPercentge'),
        isSelected: true,
        isDisabled: true,
      },
      {
        name:this.translate.instant('shared.curriculumName'),
        isSelected: true,
        isDisabled: true,
      },
      {
        name:this.translate.instant('shared.gradeName'),
        isSelected: false,
        isDisabled: false,
      },
      {
        name:this.translate.instant('shared.divisionName'),
        isSelected: false,
        isDisabled: false,
      },
      {
        name:this.translate.instant('dashboard.schools.studentPercentgeInDivision'),
        isSelected: false,
        isDisabled: false,
      }
     
    ];
  }

  schoolsToExport(filter?:Partial<Filter>)
  {
    return this.http.get('/School/report',filter)
    .pipe(
      map(res=>{
        return res.data.map(school =>{
          return {
            [this.translate.instant('dashboard.schools.schoolName')]: school.name[this.lang],
            [this.translate.instant('shared.state')]: school.state[this.lang],
            [this.translate.instant('dashboard.schools.TeachersNumbers')]: school.teachersNumbers,
            [this.translate.instant('dashboard.schools.studentsNumber')]: school.studentsNumber,
            [this.translate.instant('dashboard.schools.SchoolStudentsPercentge')]: school.studentsPercentageInSchool,
            [this.translate.instant('shared.curriculumName')]: school.CurriculumName[this.lang],
            [this.translate.instant('shared.gradeName')]: school.gradeName[this.lang],
            [this.translate.instant('shared.divisionName')]: school.divisionName[this.lang],
            [this.translate.instant('dashboard.schools.studentPercentgeInDivision')]: school.studentsPercentageInDivision

          }
        })
      }))
  }
}
