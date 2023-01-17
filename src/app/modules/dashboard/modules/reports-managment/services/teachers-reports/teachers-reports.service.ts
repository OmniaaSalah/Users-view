import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TeachersReportsService {

  constructor(private translate:TranslateService) { }
  getTableColumns()
  {
    return [
      {
        name:this.translate.instant('dashboard.issue of certificate.schoolName'),
        isSelected: true,
        isDisabled: true,
      },
      {
        name:this.translate.instant('dashboard.reports.subjectName'),
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
}
