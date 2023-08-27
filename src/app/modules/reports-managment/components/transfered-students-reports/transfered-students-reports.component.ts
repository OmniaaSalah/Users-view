import { Component, OnInit,inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IHeader } from 'src/app/core/Models/header-dashboard';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { Filtration } from 'src/app/core/helpers/filtration';
import { paginationInitialState } from 'src/app/core/helpers/pagination';
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
import { TransferedStudentsService } from '../../services/transfered-students-service/transfered-students.service';
import { TransferType } from 'src/app/shared/enums/school/school.enum';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-transfered-students-reports',
  templateUrl: './transfered-students-reports.component.html',
  styleUrls: ['./transfered-students-reports.component.scss']
})
export class TransferedStudentsReportsComponent implements OnInit {
  emptyTable:boolean=false;
  lang = inject(TranslationService).lang
  isBtnLoading: boolean=false;
  get statusEnum(){ return StatusEnum }
  nationalityList=[];
  studentCategoryList=[];
  schoolYearsList=[];
  birthDate;
  acceptanceDate;
  componentHeaderData: IHeader = {
    breadCrump: [
      { label: this.translate.instant('dashboard.reports.generateTransferedStudentsReport'),routerLink:"/reports-managment/transfered-students-reports" },
    ],
  }
  filtration = {
    ...Filtration,
    OldCurriculumId:null,
    NewCurriculumId:null,
    SchoolYearId:null,
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
    StudentCategory:null,
    ...JSON.parse(this.route.snapshot.queryParams['searchQuery'] || 'null')

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
  transferType= [
    {name:this.translate.instant('dashboard.students.insideEmara'), value: TransferType.TransferWithinTheEmirate},
    {name:this.translate.instant('dashboard.students.outSideEmara'), value: TransferType.TransferOutsideTheEmirate},
    {name:this.translate.instant('dashboard.students.outsideCountry'), value: TransferType.TransferOutOfTheCountry},
  ]


  constructor(
    private translate: TranslateService,
    private headerService: HeaderService,
    private exportService: ExportService,
    private transferedStudentsReportService: TransferedStudentsService,
    private sharedService: SharedService,
    private schoolsService: SchoolsService,
    private route:ActivatedRoute,
    private router:Router
  ) {
    this.tableColumns = this.transferedStudentsReportService.tabelColumns
  }

  ngOnInit(): void {
    this.genderList = this.sharedService.genderOptions
    this.studentsStatus = this.transferedStudentsReportService.studentsStatus
    this.headerService.changeHeaderdata(this.componentHeaderData)
    this.getStudents()
    this.sharedService.getAllNationalities().subscribe((res)=>{this.nationalityList=res});
    this.studentCategoryList=this.sharedService.studentCategoryList;
    this.getSchoolYearsList();
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

    if(this.filtration.BirthDateFrom || this.filtration.BirthDateTo){
      this.birthDate=[new Date(this.filtration.BirthDateFrom), new Date(this.filtration.BirthDateTo)]
    }

    if(this.acceptanceDate)
    {
      this.filtration.AcceptanceDateFrom=this.formateDate(this.acceptanceDate[0])
      this.filtration.AcceptanceDateTo=this.formateDate(this.acceptanceDate[1])
    }

    if(this.filtration.AcceptanceDateFrom || this.filtration.AcceptanceDateTo){
      this.acceptanceDate=[new Date(this.filtration.AcceptanceDateFrom), new Date(this.filtration.AcceptanceDateTo)]
    }

    if(this.route.snapshot.queryParams['searchQuery']){
      this.filtration = {...JSON.parse(this.route.snapshot.queryParams['searchQuery']), ...this.filtration}
    }
    this.router.navigate([], {
      queryParams: {searchQuery : JSON.stringify(this.filtration)},
      relativeTo: this.route,

    });

    this.studentsReport.loading = true
    this.studentsReport.list = []
    this.transferedStudentsReportService.getAllStudents(this.filtration)
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
    var selectedItems=[]
    this.tableColumns.forEach((report, i) => {
      if (report.header == item.header && event.checked == true) {
        report.isSelected == true
      }
      if (report.header == item.header && event.checked == false) {
        report.isSelected == false
      }
      if(report.isSelected) selectedItems.push(report)
    })
    !selectedItems.length? this.emptyTable=true : this.emptyTable=false
  }

  onExport(fileType: FileTypeEnum, table: Table) {
    this.exportService.showLoader$.next(true)
    let exportedTable = []
    const myColumns = this.tableColumns.filter(el => el.isSelected)
    let filter = {...this.filtration, PageSize:this.studentsReport.totalAllData,Page:1}
    this.transferedStudentsReportService.studentsToExport(filter).subscribe( (res) =>{

      res.forEach((student) => {
        let myObject = {}
        for (let property in student) {
          let selected = myColumns.find((column) => column.name == property);

          if (selected)
            myObject = {
              ...myObject,
              [selected?.name]: student[selected?.name],
            };
        }

        exportedTable.push(myObject)
      })
      this.exportService.exportFile(fileType,exportedTable, this.translate.instant('sideBar.reportsManagment.chidren.studentsReport'))
    })

  }

  clearFilter() {

    this.filtration.KeyWord = ''
    this.filtration.SchoolId = null;
    this.birthDate=null
    this.filtration.NationalityId=null
    this.filtration.GradeId = null
    this.filtration.DivisionId = null
    this.filtration.IsChildOfAMartyr = null
    this.filtration.IsSpecialAbilities = null
    this.acceptanceDate=null;
    this.filtration.TalentId=null;
    this.filtration.OldCurriculumId=null;
    this.filtration.NewCurriculumId=null;
    this.filtration.SchoolYearId=null;
    this.filtration.BirthDateTo = null
    this.filtration.BirthDateFrom = null
    this.filtration.CurriculumId = null
    this.filtration.Gender = null
    this.filtration.AgeFrom = null
    this.filtration.AgeTo = null
    this.filtration.IsTopStudent = null
    this.filtration.StudentStatus= null
    this.filtration.AcceptanceDateFrom = null
    this.filtration.AcceptanceDateTo = null
    this.filtration.IsActive=null;
    this.filtration.StudentCategory=null,
    this.filtration.Page=1;
    this.getStudents()
  }

  onSort(e) {
    if (e.order == 1) this.filtration.SortBy = 'old'
    else if (e.order == -1) this.filtration.SortBy = 'update'
    this.filtration.Page=1;
    this.getStudents()
  }

  paginationChanged(event: paginationState) {
    this.filtration.Page = event.page
    this.getStudents()

  }

  getSchoolYearsList(){
    this.sharedService.getSchoolYearsList().subscribe((res)=>{ this.schoolYearsList = res })
  }

  formateDate(date :Date)
  {
    let d = new Date(date.setHours(date.getHours() - (date.getTimezoneOffset()/60) )).toISOString()
    return d.split('.')[0]
  }
}
