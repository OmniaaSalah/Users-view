
import { Component, OnInit,inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IHeader } from 'src/app/core/Models/header-dashboard';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { BaseSearchModel } from 'src/app/core/models/filter-search/base-search-model';
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
import { ActivatedRoute, Router } from '@angular/router';
import { shareReplay } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-students-reports',
  templateUrl: './students-reports.component.html',
  styleUrls: ['./students-reports.component.scss']
})
export class StudentsReportsComponent implements OnInit {
  emptyTable:boolean=false;
  lang = inject(TranslationService).lang
  isBtnLoading: boolean=false;
  get statusEnum(){ return StatusEnum }
  nationalityList=[];
  prohibitionTypeList=[];
  studentCategoryList=[];
  schoolYearsList=[];
  birthDate;
  acceptanceDate;
  componentHeaderData: IHeader = {
    breadCrump: [
      { label: this.translate.instant('dashboard.reports.generatestudentsReport'),routerLink:"/reports-managment/students-reports" },
    ],
  }
  filtration = {
    ...BaseSearchModel,
    IsActive:true,
    SchoolYearId: this.userService.schoolYearId,
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
    RegistrationStatus:null,
    IsTopStudent: false,
    NationalityId:null,
    TalentId: null,
    StudentCategory:null,
    ProhibitedTypes:null,
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
  isSearching=false

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
  registrationStatus= []
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
    private studentsService:StudentsService,
    private route:ActivatedRoute,
    private toaster:ToastrService,
    private router:Router,
    private userService:UserService
  ) {
    this.tableColumns = this.studentsReportService.tabelColumns
  }

  ngOnInit(): void {
    this.genderList = this.sharedService.genderOptions
    this.studentsStatus = this.studentsReportService.studentsStatus
    this.registrationStatus=this.studentsReportService.registrationStatus
    this.headerService.changeHeaderdata(this.componentHeaderData)
    this.getStudents()
    this.sharedService.getAllNationalities().subscribe((res)=>{this.nationalityList=res});
    this.studentCategoryList=this.sharedService.studentCategoryList;
    this.prohibitionTypeList=this.studentsReportService.prohibitionTypeList;
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
    this.studentsReportService.getAllStudents(this.filtration)
      .subscribe(res => {
        this.initReportState(res)
        this.isBtnLoading=false;
        this.studentsReport.loading = false
        this.isSearching = false

      }, err => {
        this.studentsReport.loading = false
        this.studentsReport.total = 0
         this.isBtnLoading=false;
         this.isSearching = false
      })
  }

  initReportState(data){
    this.felmaleStudentCount=data.felmaleStudentCount;
    this.maleStudentCount=data.maleStudentCount;
    this.emiratesStudentsCounts=data.emiratesStudents;
    this.studentCount=data.studentCount;
    this.studentsReport.list = data.studentDetails.data
    this.studentsReport.totalAllData =data.studentDetails.totalAllData
    this.studentsReport.total =data.studentDetails.total
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


  onCurriculumSelected(ids){
    this.schools$ = this.studentsService.getSchools({curriculumId:ids}).pipe(shareReplay())

  }

  onExport(fileType: FileTypeEnum, table: Table) {
      this.exportService.showLoader$.next(true)

      if(this.studentsReport.total > 10000) {
        this.toaster.error('عذرا عدد العناصر المطلوب اصدارها اكبر من الحد المسموح .يرجى تغير معاير البحث لتقليل العناصر إلى اقل من 10 ألاف')
        this.exportService.showLoader$.next(false)
        return
      }
      let exportedTable = []
      const myColumns = this.tableColumns.filter(el => el.isSelected)
      let filter = {...this.filtration, PageSize:this.studentsReport.total,Page:1}
      this.studentsReportService.studentsToExport(filter).subscribe( (res) =>{
        res.forEach((student) => {
          let myObject = {};
          for (let property in student) {
            var selected = myColumns.find((column) => column.name == property);

            if (selected)
              myObject = {
                ...myObject,
                [selected?.name]: student[selected?.name],
              };
          }

          exportedTable.push(myObject);
        });

        this.exportService.exportFile(fileType, exportedTable, this.translate.instant('sideBar.reportsManagment.chidren.studentsReport'))
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
    this.filtration.SchoolYearId=null;
    this.filtration.NationalityId=null
    this.filtration.Gender = null
    this.filtration.AgeFrom = null
    this.filtration.AgeTo = null
    this.filtration.IsTopStudent = null
    this.filtration.StudentStatus= null
    this.filtration.RegistrationStatus= null
    this.filtration.AcceptanceDateFrom = null
    this.filtration.AcceptanceDateTo = null
    this.filtration.IsActive=null;
    this.acceptanceDate=null,
    this.filtration.TalentId=null,
    this.filtration.StudentCategory=null,
    this.filtration.ProhibitedTypes=null;
    this.filtration.Page=1;
    this.birthDate=null
    this.acceptanceDate=null
    this.getStudents()
  }

  onSort(e) {

    this.filtration.SortColumnName=e.field
    if(e.order==1) this.filtration.SortBy= 'Asc'
    else if(e.order == -1) this.filtration.SortBy= 'Desc'
    this.filtration.Page=1;
    this.getStudents()
  }

  paginationChanged(event: paginationState) {
    this.filtration.Page = event.page
    this.filtration.PageSize = event.rows
    this.getStudents()

  }

  getSchoolYearsList(){
    this.sharedService.getSchoolYearsList().subscribe((res)=>{
      this.schoolYearsList = res
      if(!this.filtration.SchoolYearId){
        res.forEach(el => {
          el.status='Current' ? this.filtration.SchoolYearId=el.id : null
        })
      }
    })
  }

  formateDate(date :Date)
  {
    let d = new Date(date.setHours(date.getHours() - (date.getTimezoneOffset()/60) )).toISOString()
    return d.split('.')[0]
  }

}
