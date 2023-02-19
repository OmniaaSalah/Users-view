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
import { SchoolsService } from '../../../schools/services/schools/schools.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { DivisionService } from '../../../schools/services/division/division.service';
import { GradesService } from '../../../schools/services/grade/grade.service';
import { map } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StudentsReportsService } from '../../services/student-reports-service/students-reports.service';

@Component({
  selector: 'app-students-reports',
  templateUrl: './students-reports.component.html',
  styleUrls: ['./students-reports.component.scss']
})
export class StudentsReportsComponent implements OnInit {
  birthDate;
  acceptanceDate;
  componentHeaderData: IHeader = {
    breadCrump: [
      { label: this.translate.instant('dashboard.reports.generatestudentsReport'),routerLink:"/dashboard/reports-managment/students-reports" },
    ],
  }
  filtration = {
    ...Filtration,
    SchoolId: "",
    CurriculumId: "",
    GradeId: "",
    DivisionId: "",
    AcceptanceDateFrom: null,
    AcceptanceDateTo: null,
    BirthDateFrom: null,
    BirthDateTo: null,
    Gender: null,
    AgeFrom: null,
    AgeTo: null,
    IsChildOfAMartyr: null,
    IsSpecialAbilities: null,
    StudentStatus: null,
    IsTopStudent: null,

  };
  rangeValues: number[];
  felmaleStudentCount;
  maleStudentCount;
  studentCount;
  paginationState = { ...paginationInitialState };
  studentsReport = {
    total: 0,
    totalAllData: 0,
    list: [],
    loading: false
  }
  schoolId
  isSchoolSelected = false
  isGradeSelected = false
  isShown = false
  curriculums$ = this.sharedService.getAllCurriculum()
  schools$ = this.schoolsService.getAllSchools()
  AllTracks$ = this.sharedService.getAllTraks()
  AllGrades$ =this.sharedService.getAllGrades('');
  AllDivisions$;
  schoolDivisions$
  booleanOptions = this.sharedService.booleanOptions
  studentsStatus = []

  tableColumns = []
  faAngleLeft = faAngleLeft
  faAngleDown = faAngleDown
  isCollapsed = true
  filterationForm: FormGroup
  genderList = []

  specialClassOptions = [
    { name: this.translate.instant('shared.specialClass'), value: 'specialClass' },
    { name: this.translate.instant('shared.fusionClass'), value: 'fusionClass' }
  ]


  constructor(
    private translate: TranslateService,
    private headerService: HeaderService,
    private layoutService: LayoutService,
    private students: StudentsService,
    private exportService: ExportService,
    private studentsReportService: StudentsReportsService,
    private studentsService: StudentsService,
    private sharedService: SharedService,
    private countriesService: CountriesService,
    private schoolsService: SchoolsService,
    private userService: UserService,
    private divisionService: DivisionService,
    private gradesService: GradesService,
    private formbuilder: FormBuilder
  ) {
    this.tableColumns = this.studentsReportService.tabelColumns
    console.log(this.tableColumns);
  }

  ngOnInit(): void {
    this.genderList = this.sharedService.genderOptions
    this.studentsStatus = this.studentsReportService.studentsStatus
    this.layoutService.changeTheme('dark')
    this.headerService.changeHeaderdata(this.componentHeaderData)
    this.getStudents()
    // this.userService.currentUserSchoolId$.subscribe(id => {
    //   this.schoolId = id;
    //   if (id) { this.schoolSelected(id); }
    //   else { id = '' }
    //   this.AllDivisions$ = this.sharedService.getAllDivisions(id)
    //   this.AllGrades$ = this.sharedService.getAllGrades(id)

    // });


    
    
  }


  schoolSelected(SchoolId) {
    this.schoolId = SchoolId
    this.isSchoolSelected = true
    this.divisionService.getSchoolDivisions(SchoolId).subscribe((res)=>{this.schoolDivisions$=res.data})
    // this.onGradeSelected(this.filtration.GradeId || null)
  }

  // onGradeSelected(GradeId) {
  //   if (!GradeId) return

  //   this.isGradeSelected = true
  //   if (this.isGradeSelected && this.isSchoolSelected) {
  //     this.schoolDivisions$ = this.divisionService.getSchoolDivisions(this.schoolId, { gradeid: this.filtration.GradeId || null }).pipe(map(res => res.data))

  //   }
  // }

  onSpecialClassSelected(val) {
    if (val === 'specialClass') { this.filtration.IsSpecialClass = true; this.filtration.IsInFusionClass = false }
    else if (val === 'fusionClass') { this.filtration.IsInFusionClass = true; this.filtration.IsSpecialClass = false }
    else { this.filtration.IsInFusionClass = null; this.filtration.IsSpecialClass = null }
  }

  getStudents() {
    if(this.birthDate)
    { 
      this.filtration.BirthDateFrom=this.formateDate(this.birthDate[0])
      this.filtration.BirthDateTo=this.formateDate(this.birthDate[1])
    }
    if(this.acceptanceDate)
    { 
      this.filtration.AcceptanceDateFrom=this.formateDate(this.acceptanceDate[0])
      this.filtration.AcceptanceDateTo=this.formateDate(this.acceptanceDate[1])
    }
   console.log(this.filtration) 
    this.studentsReport.loading = true
    this.studentsReport.list = []
    this.studentsReportService.getAllStudents(this.filtration)
      .subscribe(res => {
        this.felmaleStudentCount=res.felmaleStudentCount;
        this.maleStudentCount=res.maleStudentCount;
        this.studentCount=res.studentCount;
        this.studentsReport.loading = false
        this.studentsReport.list = res.studentDetails.data
        this.studentsReport.totalAllData =res.studentDetails.totalAllData
        this.studentsReport.total =res.studentDetails.total

      }, err => {
        this.studentsReport.loading = false
        this.studentsReport.total = 0
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

  onExport(fileType: FileEnum, table: Table) {
    let filter = {...this.filtration, PageSize:null}
    this.studentsReportService.studentsToExport(filter).subscribe( (res) =>{
      
      this.exportService.exportFile(fileType, res, this.translate.instant('sideBar.reportsManagment.chidren.studentsReport'))
    })

  }

  clearFilter() {
   
    this.filtration.KeyWord = ''
    this.filtration.SchoolId = null
    this.filtration.CurriculumId = null
    this.filtration.GradeId = null
    this.filtration.DivisionId = ''
    this.filtration.IsChildOfAMartyr = null
    this.filtration.IsSpecialAbilities = null
    this.filtration.BirthDateTo = null
    this.filtration.BirthDateFrom = null
    this.birthDate=null
    this.filtration.Gender = null
    this.filtration.AgeFrom = null
    this.filtration.AgeTo = null
    this.filtration.IsTopStudent = null
    this.filtration.StudentStatus= null
    this.filtration.AcceptanceDateFrom = null
    this.filtration.AcceptanceDateTo = null
    this.acceptanceDate=null
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

  formateDate(date :Date)
  {
    let d = new Date(date.setHours(date.getHours() - (date.getTimezoneOffset()/60) )).toISOString() 
    return d.split('.')[0]
  }

}
