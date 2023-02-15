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

  constructor(private translate : TranslateService,private http: HttpHandlerService, private tableLoaderService: LoaderService) {

   
   }
   getAllDegrees(filter?){
    this.tableLoaderService.isLoading$.next(true)

    return this.http.get('/Student/degrees-report',filter)
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
      name:this.translate.instant('dashboard.SchoolYear.school year'),
      isSelected: true,
      isDisabled: true,
    },
    {
     
      name:this.translate.instant('dashboard.reports.SchoolYearStudentResult'),
      isSelected: true,
      isDisabled: true,
    },
    {
 
      name:this.translate.instant('dashboard.reports.semester'),
      isSelected: true,
      isDisabled: true,
    },
    {
     
      name:this.translate.instant('dashboard.reports.SemesterStudentResult'),
      isSelected: true,
      isDisabled: true,
    },
    {
      
      name:this.translate.instant('dashboard.reports.subjectCount'),
      isSelected: false,
      isDisabled: false,
    },
    {
  
      name: this.translate.instant('dashboard.issue of certificate.student name') ,
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
   
      name: this.translate.instant('dashboard.reports.successPercentage'),
      isSelected: false,
      isDisabled: false,
    },
    {
   
      name: this.translate.instant('dashboard.reports.failPercentage'),
      isSelected: false,
      isDisabled: false,
    },
    {
   
      name:this.translate.instant('dashboard.reports.subjectName'),
      isSelected: false,
      isDisabled: false,
    },
    {
   
      name: this.translate.instant('dashboard.Subjects.Subject Minimum grade'),
      isSelected: false,
      isDisabled: false,
    },
    {
   
      name: this.translate.instant('dashboard.Subjects.Subject Maximum grade'),
      isSelected: false,
      isDisabled: false,
    },
    {
     
      name:this.translate.instant('dashboard.reports.StudentDegree'),
      isSelected: false,
      isDisabled: false,
    },
    {
     
      name:this.translate.instant('dashboard.reports.SubjectStudentResult'),
      isSelected: false,
      isDisabled: false,
    }
   
  ];
}
}
