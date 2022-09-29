import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Table } from 'primeng/table';
import { MenuItem } from 'src/app/core/models/dropdown/menu-item';
import { paginationState } from 'src/app/core/models/pagination/pagination';
import { FileEnum } from 'src/app/shared/enums/file/file.enum';
import { ExportService } from 'src/app/shared/services/export/export.service';

@Component({
  selector: 'app-division-students',
  templateUrl: './division-students.component.html',
  styleUrls: ['./division-students.component.scss']
})
export class DivisionStudentsComponent implements OnInit {
 @Input('students') students=[]


 cols=[
  { field: 'code', header: 'Code', customExportHeader: 'Product Code' },
  { field: 'name', header: 'Name' },
  { field: 'category', header: 'Category' },
  { field: 'quantity', header: 'Quantity' }
 ]


 first = 0
 rows = 4

 menuItems: MenuItem[]=[
  {label: this.translate.instant('shared.edit'), icon:'assets/images/shared/pen.svg',routerLink:'division/1'},
  {label: this.translate.instant('dashboard.schools.raseAttendance'), icon:'assets/images/shared/clock.svg',routerLink:'division/1/absence-records'},
  {label: this.translate.instant('dashboard.schools.defineSchedule'), icon:'assets/images/shared/list.svg',routerLink:''},
  {label: this.translate.instant('dashboard.schools.enterGrades'), icon:'assets/images/shared/edit.svg',routerLink:''},
];
  constructor(
    public translate: TranslateService,
    private exportService :ExportService) { }

  ngOnInit(): void {
  }


  onExport(fileType: FileEnum, table:Table){
    this.exportService.exportFile(fileType, table, this.students)
  }

  paginationChanged(event: paginationState) {
		console.log(event);
		this.first = event.first
		this.rows = event.rows

	}

}
