
import { Component, OnInit,inject } from '@angular/core';
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
import { SchoolsService } from '../../../schools/services/schools/schools.service';
import { StudentsReportsService } from '../../services/student-reports-service/students-reports.service';
import { StudentsService } from '../../../students/services/students/students.service';
import { StatusEnum } from 'src/app/shared/enums/status/status.enum';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { IndexesService } from '../../../indexes/service/indexes.service';
import { IndexesEnum } from 'src/app/shared/enums/indexes/indexes.enum';

@Component({
  selector: 'app-students-reports',
  templateUrl: './students-reports.component.html',
  styleUrls: ['./students-reports.component.scss']
})
export class StudentsReportsComponent implements OnInit {
  lang = inject(TranslationService).lang
  isBtnLoading: boolean=false;
  get statusEnum(){ return StatusEnum }
  nationalityList=[];
  studentCategoryList=[];
  birthDate;
  acceptanceDate;
  componentHeaderData: IHeader = {
    breadCrump: [
      { label: this.translate.instant('dashboard.reports.generatestudentsReport'),routerLink:"/dashboard/reports-managment/students-reports" },
    ],
  }
  filtration = {
    ...Filtration,
    IsActive:true,
    SchoolId: null,
    CurriculumId: null,
    GradeId: null,
    DivisionId: null,
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
    IsTopStudent: false,
    NationalityId:null,
    TalentId: null,
    StudentCategory:null
  };
  rangeValues: number[];
  felmaleStudentCount;
  maleStudentCount;
  studentCount;
  emiratesStudentsCounts;
  paginationState = { ...paginationInitialState };
  studentsReport = {
    total: 0,
    totalAllData: 0,
    list: [],
    loading: false
  }
  isSchoolSelected = false
  isGradeSelected = false
  talents$ = inject(IndexesService).getIndext(IndexesEnum.TheTypeOfTalentOfTheStudent);
  curriculums$ = this.sharedService.getAllCurriculum()
  schools$ = this.schoolsService.getSchoolsDropdown()
  AllTracks$ = this.sharedService.getAllTraks()
  AllGrades$ =this.sharedService.getAllGrades('');
  schoolDivisions$ =inject(SharedService).getAllDivisions('')
  booleanOptions = this.sharedService.booleanOptions
  studentsStatus = []

  tableColumns = []
  faAngleLeft = faAngleLeft
  faAngleDown = faAngleDown
  isCollapsed = true
  genderList = []

  specialClassOptions = [
    { name: this.translate.instant('shared.specialClass'), value: 'specialClass' },
    { name: this.translate.instant('shared.fusionClass'), value: 'fusionClass' }
  ]


  constructor(
    private translate: TranslateService,
    private headerService: HeaderService,
    private exportService: ExportService,
    private studentsReportService: StudentsReportsService,
    private sharedService: SharedService,
    private schoolsService: SchoolsService,
    private studentService:StudentsService
  ) {
    this.tableColumns = this.studentsReportService.tabelColumns
    console.log(this.tableColumns);
  }

  ngOnInit(): void {
    this.genderList = this.sharedService.genderOptions
    this.studentsStatus = this.studentsReportService.studentsStatus
    this.headerService.changeHeaderdata(this.componentHeaderData)
    this.getStudents()
    this.sharedService.getAllNationalities().subscribe((res)=>{this.nationalityList=res});
    this.studentCategoryList=this.sharedService.studentCategoryList;
  }



  onSpecialClassSelected(val) {
    if (val === 'specialClass') { this.filtration.IsSpecialClass = true; this.filtration.IsInFusionClass = false }
    else if (val === 'fusionClass') { this.filtration.IsInFusionClass = true; this.filtration.IsSpecialClass = false }
    else { this.filtration.IsInFusionClass = null; this.filtration.IsSpecialClass = null }
  }

  getStudents() {
    this.isBtnLoading=true;
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
        this.isBtnLoading=false;
        this.felmaleStudentCount=res.felmaleStudentCount;
        this.maleStudentCount=res.maleStudentCount;
        this.emiratesStudentsCounts=res.emiratesStudents;
        this.studentCount=res.studentCount;
        this.studentsReport.loading = false
        this.studentsReport.list = res.studentDetails.data
        this.studentsReport.totalAllData =res.studentDetails.totalAllData
        this.studentsReport.total =res.studentDetails.total

      }, err => {
        this.studentsReport.loading = false
        this.studentsReport.total = 0
         this.isBtnLoading=false;
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
    let filter = {...this.filtration, PageSize:this.studentsReport.totalAllData}
    this.studentsReportService.studentsToExport(filter).subscribe( (res) =>{

      this.exportService.exportFile(fileType, res, this.translate.instant('sideBar.reportsManagment.chidren.studentsReport'))
    })

  }

  clearFilter() {

    this.filtration.KeyWord = ''
    this.filtration.SchoolId = null
    this.filtration.CurriculumId = null
    this.filtration.GradeId = null
    this.filtration.DivisionId = null
    this.filtration.IsChildOfAMartyr = null
    this.filtration.IsSpecialAbilities = null
    this.filtration.BirthDateTo = null
    this.filtration.BirthDateFrom = null
    this.birthDate=null
    this.filtration.NationalityId=null
    this.filtration.Gender = null
    this.filtration.AgeFrom = null
    this.filtration.AgeTo = null
    this.filtration.IsTopStudent = null
    this.filtration.StudentStatus= null
    this.filtration.AcceptanceDateFrom = null
    this.filtration.AcceptanceDateTo = null
    this.filtration.IsActive=null;
    this.acceptanceDate=null,
    this.filtration.TalentId=null,
    this.filtration.StudentCategory=null,
    this.filtration.Page=1;
    this.getStudents()
  }

  onSort(e) {
    console.log(e);
    if (e.order == 1) this.filtration.SortBy = 'old'
    else if (e.order == -1) this.filtration.SortBy = 'update'
    this.filtration.Page=1;
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
