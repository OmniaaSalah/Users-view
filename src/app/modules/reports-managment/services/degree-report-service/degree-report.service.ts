import { Injectable ,inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Filter } from 'src/app/core/models/filter/filter';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { finalize, map, Observable, take } from 'rxjs';
import { TranslationService } from 'src/app/core/services/translation/translation.service';

@Injectable({
  providedIn: 'root'
})
export class DegreeReportService {

  lang = inject(TranslationService).lang;
  constructor(private translate : TranslateService,private http: HttpHandlerService, private tableLoaderService: LoaderService) {

   
   }
   getAllDegrees(filter?){
    this.tableLoaderService.isLoading$.next(true)

    return this.http.post('/Student/degrees-report',filter)
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
    },
    {
      name:this.translate.instant('dashboard.schools.SchoolCurriculum'),
      isSelected: true,
    },
    {
 
      name:this.translate.instant('shared.division'),
      isSelected: true,
    },
    {
   
      name: this.translate.instant('shared.grade'),
      isSelected: true,
    },
    {
      name:this.translate.instant('dashboard.SchoolYear.school year'),
      isSelected: true,
    },
    {
     
      name:this.translate.instant('dashboard.reports.SchoolYearStudentResult'),
      isSelected: true,
    },
    {
 
      name:this.translate.instant('dashboard.reports.semester'),
      isSelected: true,
    },
    {
     
      name:this.translate.instant('dashboard.reports.SemesterStudentResult'),
      isSelected: false,
    },
    {
      
      name:this.translate.instant('dashboard.reports.subjectCount'),
      isSelected: false,
    },
    {
  
      name: this.translate.instant('dashboard.schools.student') ,
      isSelected: false,
    },
    {
   
      name:this.translate.instant('dashboard.students.daleelNumber1'),
      isSelected: false,
    },
    {
   
      name:this.translate.instant('dashboard.students.daleelNumber2'),
      isSelected: false,
    },
    {
     
      name:this.translate.instant('dashboard.students.manhalNumber'),
      isSelected: false,
    },
    {
   
      name: this.translate.instant('dashboard.reports.successPercentage'),
      isSelected: false,
    },
    {
   
      name: this.translate.instant('dashboard.reports.failPercentage'),
      isSelected: false,
    },
    {
   
      name:this.translate.instant('dashboard.SchoolYear.Subject'),
      isSelected: false,
    },
    {
   
      name: this.translate.instant('dashboard.Subjects.Subject Minimum grade'),
      isSelected: false,
    },
    {
   
      name: this.translate.instant('dashboard.Subjects.Subject Maximum grade'),
      isSelected: false,
    },
    {
     
      name:this.translate.instant('dashboard.reports.StudentDegree'),
      isSelected: false,
    },
    {
     
      name:this.translate.instant('dashboard.reports.SubjectStudentResult'),
      isSelected: false,
    },
    {
   
      name:this.translate.instant('dashboard.reports.ImprovementType'),
      isSelected: false,
    },
    {
   
      name: this.translate.instant('dashboard.reports.ImprovementSchoolYear'),
      isSelected: false,
    },
    {
   
      name: this.translate.instant('dashboard.reports.ImprovementDate'),
      isSelected: false,
    },
    {
     
      name:this.translate.instant('dashboard.reports.ImprovementBy'),
      isSelected: false,
    }
   
  ];
}

degreesToExport(filter)
{
  return this.http.post('/Student/degrees-report',filter)
  .pipe(
    map(res=>{
      return res.data.map(e =>{
        return {
          [this.translate.instant('School')]: e?.schoolName ? e?.schoolName[this.lang] : this.translate.instant('shared.notFound'),
          [this.translate.instant('dashboard.schools.SchoolCurriculum')]: e?.curriculum ? e?.curriculum[this.lang] : this.translate.instant('shared.notFound'),
          [this.translate.instant('shared.division')]: e?.divisionName ? e?.divisionName[this.lang] : this.translate.instant('shared.notFound'),
          [this.translate.instant('shared.grade')]: e?.gradeName? e?.gradeName[this.lang] : this.translate.instant('shared.notFound'),
          [this.translate.instant('dashboard.SchoolYear.school year')]:e?.schoolYearName ? e?.schoolYearName[this.lang] : this.translate.instant('shared.notFound'),
          [this.translate.instant('dashboard.reports.SchoolYearStudentResult')]: e?.studentSchoolYearResult ? this.translate.instant('shared.allStatus.'+e?.studentSchoolYearResult) : this.translate.instant('shared.notFound'),
          [this.translate.instant('dashboard.schools.student')]: e?.student?.name ? e?.student?.name[this.lang] :this.translate.instant('shared.notFound'),
          [this.translate.instant('dashboard.students.daleelNumber1')]:e?.studentDaleelId ? e?.studentDaleelId : this.translate.instant('shared.notFound'),
          [this.translate.instant('dashboard.students.daleelNumber2')]:e?.student?.id ? e?.student?.id : this.translate.instant('shared.notFound'),
          [this.translate.instant('dashboard.students.manhalNumber')]:e?.studentManhalId ? e?.studentManhalId :this.translate.instant('shared.notFound'),
          [this.translate.instant('dashboard.reports.successPercentage')]: e?.sucessPercentagePerGrade ? e?.sucessPercentagePerGrade +'%' :this.translate.instant('shared.notFound'),
          [this.translate.instant('dashboard.reports.failPercentage')]: e?.failPercentagePerGrade ? e?.failPercentagePerGrade + '%' :this.translate.instant('shared.notFound'),
          [this.translate.instant('dashboard.SchoolYear.Subject')]: e?.subjectName ? e?.subjectName[this.lang] :this.translate.instant('shared.notFound'),
          [this.translate.instant('dashboard.Subjects.Subject Minimum grade')]: e?.minimumPassingScore ,
          [this.translate.instant('dashboard.Subjects.Subject Maximum grade')]: e?.maxPassingScore ,
          [this.translate.instant('dashboard.reports.StudentDegree')]: e?.studentDegree,
          [this.translate.instant('dashboard.reports.SubjectStudentResult')]: e?.studentSubjectResult ? this.translate.instant('shared.allStatus.'+e?.studentSubjectResult) :this.translate.instant('shared.notFound'),
          [this.translate.instant('dashboard.reports.ImprovementType')]: e?.improvementType[this.lang] ? e?.improvementType[this.lang] :this.translate.instant('shared.notFound'),
          [this.translate.instant('dashboard.reports.ImprovementSchoolYear')]: e?.improvementYear[this.lang] ? e?.improvementYear[this.lang] :this.translate.instant('shared.notFound') ,
          [this.translate.instant('dashboard.reports.ImprovementDate')]: e?.improvementDate ? e?.improvementDate :this.translate.instant('shared.notFound'),
          [this.translate.instant('dashboard.reports.ImprovementBy')]: e?.improvementBy ? e?.improvementBy[this.lang] :this.translate.instant('shared.notFound'),
          [this.translate.instant('dashboard.reports.semester')]: e?.semesterName ? this.translate.instant('shared.'+e?.semesterName) : this.translate.instant('shared.notFound'),
          [this.translate.instant('dashboard.reports.SemesterStudentResult')]:e?.studentSemesterResult ? this.translate.instant('shared.allStatus.'+e?.studentSemesterResult) : this.translate.instant('shared.notFound'),
          [this.translate.instant('dashboard.reports.subjectCount')]:e?.subjectsCount
        }
      })
    }))
}
}
