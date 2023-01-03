import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup } from '@angular/forms';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { paginationInitialState } from 'src/app/core/classes/pagination';
import { Filtration } from 'src/app/core/classes/filtration';
import { FileEnum } from 'src/app/shared/enums/file/file.enum';
import { ExportService } from 'src/app/shared/services/export/export.service';
import { UserInformationService } from '../../../../user-information/service/user-information.service';
import { UsersReportsService } from '../../../services/users/users-reports.service';
import { Table } from 'primeng/table';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { SchoolsService } from '../../../../schools/services/schools/schools.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { DivisionService } from '../../../../schools/services/division/division.service';
import { map } from 'rxjs';
import { StudentsService } from '../../../../students/services/students/students.service';
import { AttendanceReportsServicesService } from '../../../services/attendance/attendance-reports-services.service';

@Component({
  selector: 'app-attendance-reports',
  templateUrl: './attendance-reports.component.html',
  styleUrls: ['./attendance-reports.component.scss']
})
export class AttendanceReportsComponent implements OnInit {


  filtration = {
    ...Filtration, 
    schoolYearId: 1,
    SchoolId: "",
    curriculumId: "",
    GradeId: "",
    DivisionId: "",
    date:null,
  }
  isSchoolSelected = false
  isGradeSelected = false


  curriculums$ = this.sharedService.getAllCurriculum()
  schools$ = this.schoolsService.getAllSchools()
  AllGrades$;
  schoolDivisions$
  AllDivisions$;


  schoolId

  
  paginationState= {...paginationInitialState}
  faEllipsisVertical = faEllipsisVertical;
  filterationForm: FormGroup

  studentsReport={
	totalAllData:0,
		total:0,
		list:[],
		loading:true
  }
  tableColumns = []
  isSkeletonVisible = true;

  constructor(   
     private exportService: ExportService,
    private headerService: HeaderService, 
    private translate: TranslateService,
     private formbuilder: FormBuilder,
     private _report:AttendanceReportsServicesService,
     private sharedService: SharedService,
     private schoolsService: SchoolsService,
     private userService: UserService,
     private divisionService: DivisionService,
     private students: StudentsService,


   ) {
    this.tableColumns = this._report.tabelColumns
   }


  ngOnInit(): void {
    this.headerService.Header.next(
      {
        'breadCrump': [
          { label: this.translate.instant('dashboard.UserInformation.List Of Users'), routerLink: '/dashboard/manager-tools/user-information/users-list' ,routerLinkActiveOptions:{exact: true}},
        ],
      }
    );
    this.getStudents();
    this.filterationForm = this.formbuilder.group({
      date: '',
    });


    this.filterationForm.get('date').valueChanges.subscribe(res => {      
      this.filterationForm.value.date = new Date(res).toISOString()
      this.filtration.date =  this.filterationForm.value.date
    })

    this.userService.currentUserSchoolId$.subscribe(id => {
      this.schoolId = id;
      if (id) { this.schoolSelected(id); }
      else { id = '' }
      this.AllDivisions$ = this.sharedService.getAllDivisions(id)
      this.AllGrades$ = this.sharedService.getAllGrades(id)
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
  
  schoolSelected(SchoolId) {
    this.schoolId = SchoolId
    this.isSchoolSelected = true
    this.schoolDivisions$ = this.divisionService.getSchoolDivisions(SchoolId, { gradeid: this.filtration.GradeId || null }).pipe(map(res => res.data))
    this.onGradeSelected(this.filtration.GradeId || null)
  }

  onGradeSelected(GradeId) {
    if (!GradeId) return

    this.isGradeSelected = true
    if (this.isGradeSelected && this.isSchoolSelected) {
      this.schoolDivisions$ = this.divisionService.getSchoolDivisions(this.schoolId, { gradeid: this.filtration.GradeId || null }).pipe(map(res => res.data))

    }
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

 

  onTableDataChange(event: paginationState) {
    this.filtration.Page = event.page;
    this.getStudents();
  }

  clearFilter() {
    this.filtration.KeyWord = ''
    this.filtration.SchoolId = null
    this.filtration.curriculumId = null
    this.filtration.GradeId = null
    this.filtration.DivisionId = ''
    this.filtration.date = null
    this.getStudents();
  }

  onExport(fileType: FileEnum, table: Table) {
    let filter = {...this.filtration, PageSize:null}
    this.students.getAllStudents(filter).subscribe( (res:any[]) =>{
      
      this.studentsReport.list = res['data']
      
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

    this.exportService.exportFile(fileType,exportedTable, '')
    })
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


}
