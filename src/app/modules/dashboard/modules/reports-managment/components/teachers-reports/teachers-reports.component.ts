import { Component, OnInit,inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Table } from 'primeng/table';
import { Filtration } from 'src/app/core/classes/filtration';
import { paginationInitialState } from 'src/app/core/classes/pagination';
import { Filter } from 'src/app/core/models/filter/filter';
import { IHeader } from 'src/app/core/Models/header-dashboard';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { FileEnum } from 'src/app/shared/enums/file/file.enum';
import { ExportService } from 'src/app/shared/services/export/export.service';
import { SchoolsService } from '../../../schools/services/schools/schools.service';
import { SubjectService } from '../../../subjects/service/subject.service';
import { TeachersReportsService } from '../../services/teachers-reports/teachers-reports.service';

@Component({
  selector: 'app-teachers-reports',
  templateUrl: './teachers-reports.component.html',
  styleUrls: ['./teachers-reports.component.scss']
})
export class TeachersReportsComponent implements OnInit {
  tableColumns = [];
  schools$ = inject(SchoolsService).getAllSchools()
  subjects$ = inject(SubjectService).getAllSubjects()
  filtration = {...Filtration,SchoolsIds:null,SubjectsIds:null,}
  paginationState = { ...paginationInitialState };
  teachersReport = {
    total: 0,
    totalAllData: 0,
    list: [],
    loading: false
  }
  componentHeaderData: IHeader = {
    breadCrump: [
      { label: this.translate.instant('dashboard.reports.generateteachersReport'),routerLink:'/dashboard/reports-managment/teachers-reports' },
    ],
  }
  constructor( private exportService: ExportService,private translate:TranslateService,private headerService: HeaderService,private teachersReportService:TeachersReportsService) { }

  ngOnInit(): void {
    this.headerService.changeHeaderdata(this.componentHeaderData)
    this.tableColumns=this.teachersReportService.getTableColumns();
    this.getTeachersReportList();
  }
  getTeachersReportList()
  {
    console.log(this.filtration)
    this.teachersReport.loading = true
    this.teachersReport.list = []
    this.teachersReportService.getAllTeachers(this.filtration)
      .subscribe(res => {
        this.teachersReport.loading = false
        this.teachersReport.list = res.data
        this.teachersReport.totalAllData = res.totalAllData
        this.teachersReport.total = res.total


      }, err => {
        this.teachersReport.loading = false
        this.teachersReport.total = 0
      })
  }
  clearFilter(){

    this.filtration.KeyWord =''
    this.filtration.SchoolsIds= null;
    this.filtration.SubjectsIds= null;
    this.getTeachersReportList();
  }


  onExport(fileType: FileEnum, table:Table){
    let filter = {...this.filtration, PageSize:0}
    this.teachersReportService.teachersToExport(filter).subscribe( (res) =>{
      
      this.exportService.exportFile(fileType, res, this.translate.instant('sideBar.reportsManagment.chidren.TeachersReport'))
    })
  }

  

  paginationChanged(event: paginationState) {
    this.filtration.Page = event.page;
    this.getTeachersReportList();

  }
}
