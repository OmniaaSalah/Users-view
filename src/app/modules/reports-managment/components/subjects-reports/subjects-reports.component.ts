
import { StudentsService } from 'src/app/modules/students/services/students/students.service';
import { Component, OnInit ,inject} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IHeader } from 'src/app/core/Models/header-dashboard';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { Filtration } from 'src/app/core/classes/filtration';
import { paginationInitialState } from 'src/app/core/classes/pagination';
import { FileTypeEnum } from 'src/app/shared/enums/file/file.enum';
import { Table } from 'primeng/table';
import { ExportService } from 'src/app/shared/services/export/export.service';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import {  faAngleLeft, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { SchoolsService } from '../../../schools/services/schools/schools.service';
import { SubjectsService } from '../../services/subjects/subjects.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';




@Component({
  selector: 'app-subjects-reports',
  templateUrl: './subjects-reports.component.html',
  styleUrls: ['./subjects-reports.component.scss']
})
export class SubjectsReportsComponent implements OnInit {
  componentHeaderData: IHeader = {
    breadCrump: [
      { label: this.translate.instant('dashboard.reports.generateSubjectsReport'),routerLink: '/reports-managment/subjects-reports' },
    ],
  }
  filtration = {
    ...Filtration,
    schoolIds: null,
  };
  lang = inject(TranslationService).lang
  paginationState = { ...paginationInitialState };
  subjectsReport = {
    total: 0,
    totalAllData: 0,
    list: [],
    loading: false
  }
  schools$ = inject(SchoolsService).getSchoolsDropdown()


  tableColumns = []
  faAngleLeft = faAngleLeft
  faAngleDown = faAngleDown
  isCollapsed = true



  constructor(
    private sharedService:SharedService,
    private translate: TranslateService,
    private headerService: HeaderService,
    private exportService: ExportService,
    private subjectReportService: SubjectsService,
    private schoolsService: SchoolsService) {
    this.tableColumns = this.subjectReportService.tabelColumns
    console.log(this.tableColumns);
  }

  ngOnInit(): void {

    this.headerService.changeHeaderdata(this.componentHeaderData)
    this.getSubjects()
  }


  getSubjects() {
    console.log(this.filtration)
    this.subjectsReport.loading = true
    this.subjectsReport.list = []
    this.subjectReportService.getAllSubjects(this.filtration)
      .subscribe(res => {
        this.sharedService.filterLoading.next(false);
        this.subjectsReport.loading = false
        this.subjectsReport.list = res.data
        this.subjectsReport.totalAllData = res.totalAllData
        this.subjectsReport.total = res.total


      }, err => {
        this.subjectsReport.loading = false
        this.subjectsReport.total = 0
        this.sharedService.filterLoading.next(false);
      })
  }



  checkValueOfCheckbox(item, event) {
    this.tableColumns.forEach((report, i) => {
      if (report.header == item.header && event.checked == true) {
        report.isSelected == true
      }
      if (report.header == item.header && event.checked == false) {
        report.isSelected == false
      }

    })
  }

  onExport(fileType: FileTypeEnum, table: Table) {
    let filter = {...this.filtration, PageSize:this.subjectsReport.totalAllData}
    this.subjectReportService.subjectsToExport(filter).subscribe( (res) =>{

      this.exportService.exportFile(fileType, res, this.translate.instant('sideBar.reportsManagment.chidren.subjectsReport'))
    })

  }

  clearFilter() {
    this.filtration.KeyWord = ''
    this.filtration.schoolIds = null
    this.filtration.Page=1;
    this.getSubjects()
  }

  onSort(e) {
    console.log(e);
    if (e.order == 1) this.filtration.SortBy = 'old'
    else if (e.order == -1) this.filtration.SortBy = 'update'
    this.filtration.Page=1;
    this.getSubjects()
  }

  paginationChanged(event: paginationState) {
    this.filtration.Page = event.page
    this.getSubjects()

  }


}
