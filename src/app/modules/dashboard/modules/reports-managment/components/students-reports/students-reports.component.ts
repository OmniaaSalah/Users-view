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
import { ReportsManagmentService } from '../../services/reports-managment.service';
import { faAngleRight, faAngleLeft, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { CountriesService } from 'src/app/shared/services/countries/countries.service';
import { SchoolsService } from '../../../schools/services/schools/schools.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { DivisionService } from '../../../schools/services/division/division.service';
import { GradesService } from '../../../schools/services/grade/grade.service';
import { map } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-students-reports',
  templateUrl: './students-reports.component.html',
  styleUrls: ['./students-reports.component.scss']
})
export class StudentsReportsComponent implements OnInit {

  componentHeaderData: IHeader = {
    breadCrump: [
      { label: this.translate.instant('dashboard.reports.generatestudentsReport') },
    ],
  }
  filtration = { 
    ...Filtration,
    schoolYearId:1, // care here okay we will get it from navbar!
    SchoolId:"", 
    curriculumId:"", 
    GradeId:"",
    DivisionId:"",
    TrackId:"",
    DateAndTimeOfRegistrationFrom:null,
    DateAndTimeOfRegistrationTo:null,
    birthDate:null,
    Gender:null,
    AgeFrom:null,
    AgeTo:null,
    IsChildrenOfFemaleCitizens:null,
    IsChildOfAMartyr: null, 
    IsSpecialAbilities:null,
    IsNonNative:null,
    StudentStatus:null,
    IsExcellentStudents:null,
    // انواع الفصول الخاصه
    IsInFusionClass:null,
    IsSpecialClass:null
   };
   rangeValues: number[];

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
  AllTracks$ =this.sharedService.getAllTraks()
  AllGrades$;
  AllDivisions$;
  schoolDivisions$ 
  booleanOptions = this.sharedService.booleanOptions
  studentsStatus = []

  tableColumns = []
  faAngleLeft = faAngleLeft
  faAngleDown = faAngleDown
  isCollapsed=true
  filterationForm: FormGroup

  specialClassOptions = [
    {name: this.translate.instant('shared.specialClass'), value:'specialClass'},
    {name: this.translate.instant('shared.fusionClass'), value:'fusionClass'}
  ]


  constructor(
    private translate: TranslateService,
    private headerService: HeaderService,
    private layoutService: LayoutService,
    private students: StudentsService,
    private exportService: ExportService,
    private _report:ReportsManagmentService,
    private studentsService: StudentsService,
    private sharedService: SharedService,
    private countriesService: CountriesService,
    private schoolsService: SchoolsService,
    private userService:UserService,
    private divisionService: DivisionService,
    private gradesService:GradesService,
    private formbuilder:FormBuilder
  ) { 
    this.tableColumns = this._report.tabelColumns
    console.log(this.tableColumns);
  }

  ngOnInit(): void {
    this.studentsStatus = this._report.studentsStatus
    this.layoutService.changeTheme('dark')
    this.headerService.changeHeaderdata(this.componentHeaderData)
    this.getStudents()
    this.userService.currentUserSchoolId$.subscribe(id =>{  
    this.schoolId=id;
    if(id)
    { this.schoolSelected(id);}
    else
    {id=''}
    this.AllDivisions$ =this.sharedService.getAllDivisions(id)
    this.AllGrades$ =this.sharedService.getAllGrades(id)




    this.filterationForm = this.formbuilder.group({
      DateFrom : '',
      DateTo : '',
      birthDate:''
    });    

    this.filterationForm.get('birthDate').valueChanges.subscribe(res=>{
      this.filterationForm.value.birthDate = new Date(res).toISOString()
      this.filtration.birthDate = this.filterationForm.value.birthDate
    })

    this.filterationForm.get('DateFrom').valueChanges.subscribe(res=>{
      this.filterationForm.value.DateFrom = new Date(res[0]).toISOString()
      this.filtration.DateAndTimeOfRegistrationFrom =  this.filterationForm.value.DateFrom
      if(res[1]){
      this.filterationForm.value.DateTo = new Date(res[1]).toISOString()
      this.filtration.DateAndTimeOfRegistrationTo =  this.filterationForm.value.DateTo
      }
    })
     
     
    })
  }
  
 
  schoolSelected(SchoolId){
    this.schoolId=SchoolId
    this.isSchoolSelected = true
    this.schoolDivisions$ = this.divisionService.getSchoolDivisions(SchoolId,{gradeid:this.filtration.GradeId||null}).pipe(map(res => res.data))
    this.onGradeSelected(this.filtration.GradeId||null)
  }

  onGradeSelected(GradeId){
    if(!GradeId) return

    this.isGradeSelected=true
    if( this.isGradeSelected && this.isSchoolSelected){
      this.schoolDivisions$ = this.divisionService.getSchoolDivisions(this.schoolId,{gradeid:this.filtration.GradeId||null}).pipe(map(res => res.data))

    }
  }

  onSpecialClassSelected(val){
    if(val === 'specialClass') {this.filtration.IsSpecialClass = true; this.filtration.IsInFusionClass = false}
    else if(val === 'fusionClass') {this.filtration.IsInFusionClass = true ; this.filtration.IsSpecialClass = false}
    else { this.filtration.IsInFusionClass =null; this.filtration.IsSpecialClass=null}
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

  checkValueOfCheckbox(item,event){
    this.tableColumns.forEach((report, i) => {
      if (report.header == item.header && event.checked == true) {
        report.isSelected == true
      }
      if (report.header == item.header  && event.checked == false) {        
        report.isSelected == false
      }
     
    })
  }

  onExport(fileType: FileEnum, table: Table) {
    this.exportService.exportFile(fileType, this.studentsReport.list, '')
  }
  gender =[
    {name:{en:'Male',ar:'ذكر'},id:0},
    {name:{en:'Female',ar:'انثي'},id:1},
]
  clearFilter() {
    this.filterationForm.reset()
    this.filtration.KeyWord =''
    this.filtration.SchoolId= null
    this.filtration.curriculumId= null
    this.filtration.GradeId= null
    this.filtration.DivisionId =''
    this.filtration.TrackId = null
    this.filtration.NationalityId= null
    this.filtration.IsChildOfAMartyr = null
    this.filtration.IsSpecialClass= null
    this.filtration.IsInFusionClass= null
    this.filtration.IsSpecialAbilities = null
    this.filtration.IsChildrenOfFemaleCitizens = null
    this.filtration.IsNonNative = null
    this.filtration.birthDate = null
    this.filtration.Gender = null
    this.filtration.AgeFrom =null
    this.filtration.AgeTo = null
    this.filtration.IsExcellentStudents = null
    this.filtration.StudentStatus = null
    this.filtration.DateAndTimeOfRegistrationFrom = null
    this.filtration.DateAndTimeOfRegistrationTo = null
    this.getStudents()
  }
  
  onSort(e){
    console.log(e);
    if(e.order==1) this.filtration.SortBy= 'old'
    else if(e.order == -1) this.filtration.SortBy= 'update'
    this.getStudents()
  }

  paginationChanged(event: paginationState) {
    this.filtration.Page = event.page
    this.getStudents()

  }
  isToggleLabel1(e)
  {
    if(e.checked)
    {
        this.isShown=true;

    }
    else{
        this.isShown=false;
    }
  }

}
