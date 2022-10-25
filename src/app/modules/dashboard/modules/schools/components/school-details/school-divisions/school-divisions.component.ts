import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { Filtration } from 'src/app/core/classes/filtration';
import { paginationState } from 'src/app/core/Models';
import { FileEnum } from 'src/app/shared/enums/file/file.enum';
import { ExportService } from 'src/app/shared/services/export/export.service';
import { DivisionService } from '../../../services/division/division.service';

@Component({
  selector: 'app-school-divisions',
  templateUrl: './school-divisions.component.html',
  styleUrls: ['./school-divisions.component.scss']
})
export class SchoolDivisionsComponent implements OnInit {

  @Input('students') students=[]

  schoolId = this.route.snapshot.paramMap.get('schoolId')
  filtration={...Filtration}
 
 
  divisions={
    totalAllData:0,
    total:0,
    list:[],
    loading:true
  }
 
  menuItems: MenuItem[]=[
   {label: this.translate.instant('shared.edit'), icon:'assets/images/shared/pen.svg',routerLink:'division/1'},
   {label: this.translate.instant('dashboard.schools.raseAttendance'), icon:'assets/images/shared/clock.svg',routerLink:'division/1/absence-records'},
   {label: this.translate.instant('dashboard.schools.defineSchedule'), icon:'assets/images/shared/list.svg',routerLink:''},
   {label: this.translate.instant('dashboard.schools.enterGrades'), icon:'assets/images/shared/edit.svg',routerLink:''},
 ];
   constructor(
     public translate: TranslateService,
     private exportService :ExportService,
     private route: ActivatedRoute,
     private divisionService:DivisionService) { }
 
   ngOnInit(): void {
     this.getSchoolDivisions()
   }
 
   getSchoolDivisions(){
    this.divisions.loading=true
    this.divisions.list=[]
     this.divisionService.getSchoolDivisions(this.schoolId, this.filtration).subscribe(res=>{
      this.divisions.loading = false
      this.divisions.list = res.data
      this.divisions.totalAllData = res.totalAllData
      this.divisions.total =res.total
     })
   }
 
 
   onSort(e){
    if(e.order==1) this.filtration.SortBy= 'old'
    else if(e.order == -1) this.filtration.SortBy= 'update'
     this.getSchoolDivisions()
   }
 
   clearFilter(){
     this.filtration.KeyWord =''
     this.getSchoolDivisions()
   }
 
 
   onExport(fileType: FileEnum, table:Table){
     this.exportService.exportFile(fileType, table, this.students)
   }
 
   paginationChanged(event: paginationState) { 
     this.filtration.Page = event.page
     this.getSchoolDivisions()
 
   }

}
