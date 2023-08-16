import { Component, OnInit,inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Table } from 'primeng/table';
import { Filtration } from 'src/app/core/helpers/filtration';
import { paginationInitialState } from 'src/app/core/helpers/pagination';
import { IHeader } from 'src/app/core/Models/header-dashboard';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { FileTypeEnum } from 'src/app/shared/enums/file/file.enum';
import { ExportService } from 'src/app/shared/services/export/export.service';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { SchoolsService } from '../../../schools/services/schools/schools.service';
import { SubjectService } from '../../../subjects/service/subject.service';
import { TeachersReportsService } from '../../services/teachers-reports/teachers-reports.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-teachers-reports',
  templateUrl: './teachers-reports.component.html',
  styleUrls: ['./teachers-reports.component.scss']
})
export class TeachersReportsComponent implements OnInit {
  tableColumns = [];
  lang = inject(TranslationService).lang
  schools$ = inject(SchoolsService).getSchoolsDropdown()
  subjects$ = inject(SubjectService).getAllSubjectsWithoutDuplicated()

  filtration = {
    ...Filtration,
    schoolIds:[],
    subjectIds:[],
    ...JSON.parse(this.route.snapshot.queryParams['searchQuery'] || 'null')
  }
  paginationState = { ...paginationInitialState };
  teachersReport = {
    total: 0,
    totalAllData: 0,
    list: [],
    loading: false
  }
  componentHeaderData: IHeader = {
    breadCrump: [
      { label: this.translate.instant('dashboard.reports.generateteachersReport'),routerLink:'/reports-managment/teachers-reports' },
    ],
  }
  constructor(
    private sharedService:SharedService,
    private exportService: ExportService,
    private translate:TranslateService,
    private headerService: HeaderService,
    private teachersReportService:TeachersReportsService,
    private route:ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {
    this.headerService.changeHeaderdata(this.componentHeaderData)
    this.tableColumns=this.teachersReportService.getTableColumns();
    this.getTeachersReportList();
  }


  getTeachersReportList(){
    if(this.route.snapshot.queryParams['searchQuery']){
      this.filtration = {...JSON.parse(this.route.snapshot.queryParams['searchQuery']), ...this.filtration}
    }
    this.router.navigate([], {
      queryParams: {searchQuery : JSON.stringify(this.filtration)},
      relativeTo: this.route,
      queryParamsHandling: "preserve"
    });

    this.teachersReport.loading = true
    this.teachersReport.list = []
    this.teachersReportService.getAllTeachers(this.filtration)
      .subscribe(res => {
        this.sharedService.filterLoading.next(false);
        this.teachersReport.loading = false
        this.teachersReport.list = res.data
        this.teachersReport.totalAllData = res.totalAllData
        this.teachersReport.total = res.total


      }, err => {
        this.sharedService.filterLoading.next(false);
        this.teachersReport.loading = false
        this.teachersReport.total = 0
      })
  }


  clearFilter(){

    this.filtration.KeyWord =''
    this.filtration.schoolIds= null;
    this.filtration.subjectIds= null;
    this.filtration.Page=1;
    this.getTeachersReportList();
  }


  onExport(fileType: FileTypeEnum, table:Table){
    this.exportService.showLoader$.next(true)
    let filter = {...this.filtration,PageSize:this.teachersReport.totalAllData,Page:1}
    this.teachersReportService.teachersToExport(filter).subscribe( (res) =>{

      this.exportService.exportFile(fileType, res, this.translate.instant('sideBar.reportsManagment.chidren.TeachersReport'))
    })
  }

  onSort(e) {
    console.log(e);
    if (e.order == 1) this.filtration.SortBy = 'old'
    else if (e.order == -1) this.filtration.SortBy = 'update'
    this.filtration.Page=1;
    this.getTeachersReportList();
  }



  paginationChanged(event: paginationState) {
    this.filtration.Page = event.page;
    this.getTeachersReportList();

  }
}
