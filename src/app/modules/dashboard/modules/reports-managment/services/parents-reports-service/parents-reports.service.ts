import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class ParentsReportsService {

  constructor(private translate:TranslateService) { }

  getTableColumns()
  {
    return [
 
      {
        name: this.translate.instant('dashboard.parents.parentName'),
        isSelected: true,
        isDisabled: true,
      },
      {
        name:this.translate.instant('dashboard.parents.parentNumber'),
        isSelected: true,
        isDisabled: true,
      },
      {
        name: this.translate.instant('dashboard.parents.parentNationality'),
        isSelected: true,
        isDisabled: true,
      },
      {
        name: this.translate.instant('dashboard.parents.parentEmail'),
        isSelected: true,
        isDisabled: true,
      },
      {
        name:  this.translate.instant('dashboard.parents.relatedType'),
        isSelected: true,
        isDisabled: true,
      },
      {
        name:this.translate.instant('dashboard.reports.studentidBydaleelSystem'),
        isSelected: true,
        isDisabled: true,
      },
      {
        name:this.translate.instant('dashboard.issue of certificate.student name'),
        isSelected: true,
        isDisabled: true,
      }
    ];
  }
}
