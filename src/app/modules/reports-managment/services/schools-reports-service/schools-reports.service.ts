import { Injectable,inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { finalize, map, Observable, take } from 'rxjs';
import { SearchModel } from 'src/app/core/models/filter-search/filter-search.model';
import { TranslationService } from 'src/app/core/services/translation/translation.service';

@Injectable({
  providedIn: 'root'
})
export class SchoolsReportsService {

  lang = inject(TranslationService).lang;
  constructor(private translate:TranslateService,private http: HttpHandlerService,
    private tableLoaderService: LoaderService) { }

  getAllSchools(filter?:Partial<SearchModel>){
    this.tableLoaderService.isLoading$.next(true)

    return this.http.post('/School/report',filter)
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
        name:this.translate.instant('School'),
        isSelected: true,
        sortField: this.lang =='ar'? 'SchoolArabicName': 'SchoolEnglishName'
      },
      {
        name:this.translate.instant('shared.state'),
        isSelected: true,
        sortField: this.lang =='ar'? 'StatesEnglishName': 'StatesArabicName'
      },
      {
        name: this.translate.instant('dashboard.schools.TeachersNumbers'),
        isSelected: true,
        sortField: 'SchoolTeachersCount'
      },
      {
        name:  this.translate.instant('dashboard.schools.StudentsNumbers'),
        isSelected: true,
        sortField: 'SchoolStudentCount'
      },
      {
        name:this.translate.instant('dashboard.schools.SchoolStudentsPercentge'),
        isSelected: true,
        sortField: 'SchoolStudentPercentage'
      },
      {
        name:this.translate.instant('dashboard.schools.SchoolCurriculum'),
        isSelected: true,
        sortField: this.lang =='ar'? 'CurriculumArabicName': 'CurriculumsEnglishName'
      },
      {
        name:this.translate.instant('shared.grade'),
        isSelected: false,
        sortField: this.lang =='ar'? 'GradeArabicName': 'GradeEnglishName'
      },
      {
        name:this.translate.instant('shared.division'),
        isSelected: false,
        sortField: this.lang =='ar'? 'DivisionArabicName': 'DivisionEnglishName'
      },
      {
        name:this.translate.instant('dashboard.schools.studentPercentgeInDivision'),
        isSelected: false,
        sortField:'DivisionStudentCount'
      },
      {
        name:this.translate.instant('dashboard.schools.EnrolledStudentNumbers'),
        isSelected: false,
        sortField:'WithdrawalStudentCount'
      },
      {
        name:this.translate.instant('dashboard.schools.SpecialClassesNumbers'),
        isSelected: false,
        sortField:'SpecialClassesCountPerSchool'
      },
      {
        name:this.translate.instant('dashboard.schools.fusionStudentNumbers'),
        isSelected: false,
        sortField:'SchoolFusionStudentCount  '
      }


    ];
  }

  schoolsToExport(filter?:Partial<SearchModel>)
  {
    return this.http.post('/School/report',filter)
    .pipe(
      map(res=>{
        return res.data.map(school =>{

          return {
            [this.translate.instant('School')]: school?.schoolName[this.lang],
            [this.translate.instant('shared.state')]: school?.state[this.lang],
            [this.translate.instant('dashboard.schools.TeachersNumbers')]: school?.teachersNumbers,
            [this.translate.instant('dashboard.schools.StudentsNumbers')]: school?.studentsNumber,
            [this.translate.instant('dashboard.schools.SchoolStudentsPercentge')]: school?.studentsCountInSchool,
            [this.translate.instant('dashboard.schools.SchoolCurriculum')]: school?.curriculumName[this.lang],
            [this.translate.instant('shared.grade')]: school?.gradeName[this.lang],
            [this.translate.instant('shared.division')]: school?.divisionName[this.lang],
            [this.translate.instant('dashboard.schools.studentPercentgeInDivision')]: school?.studentsCountInDivision,
            [this.translate.instant('dashboard.schools.EnrolledStudentNumbers')]: school?.withdrawalStudentCount,
            [this.translate.instant('dashboard.schools.SpecialClassesNumbers')]: school?.specialClassesCountPerSchool,
            [this.translate.instant('dashboard.schools.fusionStudentNumbers')]: school?.fusionStudentsCountInSchool

          }
        })
      }))
  }
}
