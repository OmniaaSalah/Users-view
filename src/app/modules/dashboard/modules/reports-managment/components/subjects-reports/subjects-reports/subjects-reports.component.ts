import { trigger } from '@angular/animations';
import { StudentsService } from 'src/app/modules/dashboard/modules/students/services/students/students.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IHeader } from 'src/app/core/Models/header-dashboard';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { LayoutService } from 'src/app/layout/services/layout/layout.service';
import { Filtration } from 'src/app/core/classes/filtration';
import { paginationInitialState } from 'src/app/core/classes/pagination';
import { FileEnum } from 'src/app/shared/enums/file/file.enum';
import { Table } from 'primeng/table';
import { ExportService } from 'src/app/shared/services/export/export.service';
import * as XLSX from "xlsx";
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { faAngleRight, faAngleLeft, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { CountriesService } from 'src/app/shared/services/countries/countries.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { map } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReportsManagmentService } from '../../../services/reports-managment.service';
import { SchoolsService } from '../../../../schools/services/schools/schools.service';
import { DivisionService } from '../../../../schools/services/division/division.service';
import { GradesService } from '../../../../schools/services/grade/grade.service';
import { SubjectsService } from '../../../services/subjects/subjects.service';


@Component({
  selector: 'app-subjects-reports',
  templateUrl: './subjects-reports.component.html',
  styleUrls: ['./subjects-reports.component.scss']
})
export class SubjectsReportsComponent implements OnInit {

  componentHeaderData: IHeader = {
    breadCrump: [
      { label: this.translate.instant('dashboard.reports.generatestudentsReport') },
    ],
  }
  filtration = {
    ...Filtration,
    yearId:1,
    SchoolsId: [],
  };

  paginationState = { ...paginationInitialState };
  studentsReport = {
    total: 0,
    totalAllData: 0,
    list: [],
    loading: false
  }

  isSchoolSelected = false

  isShown = false
  schools$ = this.schoolsService.getAllSchools()


  tableColumns = []
  faAngleLeft = faAngleLeft
  faAngleDown = faAngleDown
  isCollapsed = true



  constructor(
    private translate: TranslateService,
    private headerService: HeaderService,
    private layoutService: LayoutService,
    private students: StudentsService,
    private exportService: ExportService,
    private _report: SubjectsService,
    private studentsService: StudentsService,
    private sharedService: SharedService,
    private schoolsService: SchoolsService,
    private userService: UserService,

  ) {
    this.tableColumns = this._report.tabelColumns
    console.log(this.tableColumns);
  }

  ngOnInit(): void {
    this.layoutService.changeTheme('dark')
    this.headerService.changeHeaderdata(this.componentHeaderData)
    this.getStudents()
  }


  getStudents() {
    this.studentsReport.loading = true
    this.studentsReport.list = []
    this.students.getAllStudents(this.filtration)
      .subscribe(res => {
        this.studentsReport.loading = false
        this.studentsReport.list = res.data
        this.studentsReport.totalAllData = res.totalAllData
        this.studentsReport.total = res.total
        console.log(this.studentsReport.list);
        //-------------------------------------------------------------

      }, err => {
        this.studentsReport.loading = false
        this.studentsReport.total = 0
      })
  }

  checkVlaueOfSelect(event){
    this.filtration.SchoolsId = event.value
    console.log(this.filtration);
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

  onExport(fileType: FileEnum, table: Table) {
    let exportedTable = []
    const myColumns = this.tableColumns.filter(el => el.isSelected)
    this.studentsReport.list.forEach((el, index) => {
      let myObject = {}

      for (const property in el) {
        const filterColumn = myColumns.filter(column => column.key == property)
        const filteredObject = filterColumn && filterColumn.length ? filterColumn[0]['name'] : {}
        if(localStorage.getItem('preferredLanguage') == 'ar'){
          if(filteredObject && filteredObject.ar){
           myObject = { ...myObject, [filteredObject.ar]: el[property]?.ar || el[property] };
        }
        }
          if(localStorage.getItem('preferredLanguage') == 'en'){
          if(filteredObject && filteredObject.en){
           myObject = { ...myObject, [filteredObject.en]: el[property]?.en || el[property] };
        }
        }
        
      }
      exportedTable.push(
        myObject
      )
    })

    this.exportService.exportFile(fileType, exportedTable, '')
  }

  clearFilter() {
    this.filtration.KeyWord = ''
    this.filtration.SchoolsId = []
    this.getStudents()
  }

  onSort(e) {
    console.log(e);
    if (e.order == 1) this.filtration.SortBy = 'old'
    else if (e.order == -1) this.filtration.SortBy = 'update'
    this.getStudents()
  }

  paginationChanged(event: paginationState) {
    this.filtration.Page = event.page
    this.getStudents()

  }
  isToggleLabel1(e) {
    if (e.checked) {
      this.isShown = true;

    }
    else {
      this.isShown = false;
    }
  }


}
