import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class SchoolsReportsService {

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
        name:this.translate.instant('shared.gradeName'),
        isSelected: true,
        isDisabled: true,
      },
      {
        name:this.translate.instant('shared.divisionName'),
        isSelected: true,
        isDisabled: true,
      },
      {
        name:this.translate.instant('dashboard.schools.studentPercentgeInDivision'),
        isSelected: false,
        isDisabled: false,
      },
      {
        name:this.translate.instant('shared.curriculumName'),
        isSelected: false,
        isDisabled: false,
      }
      // {
      //   name: this.translate.instant('dashboard.parents.parentNationality'),
      //   isSelected: true,
      //   isDisabled: true,
      // },
      // {
      //   name: this.translate.instant('dashboard.parents.parentEmail'),
      //   isSelected: true,
      //   isDisabled: true,
      // }
    ];
  }
}
