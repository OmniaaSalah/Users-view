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
import { UserInformationService } from '../../../user-information/service/user-information.service';
import { UsersReportsService } from '../../services/users/users-reports.service';
import { faAngleLeft, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { Table } from 'primeng/table';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { SchoolsService } from '../../../schools/services/schools/schools.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { DivisionService } from '../../../schools/services/division/division.service';
import { map } from 'rxjs';
import { StudentsService } from '../../../students/services/students/students.service';
import { AttendanceReportsServicesService } from '../../services/attendance/attendance-reports-services.service';

@Component({
  selector: 'app-attendance-reports',
  templateUrl: './attendance-reports.component.html',
  styleUrls: ['./attendance-reports.component.scss']
})
export class AttendanceReportsComponent implements OnInit {
  date;
  shownTable:boolean=false;
  isCollapsed=true;
  faAngleLeft = faAngleLeft
  faAngleDown = faAngleDown
  filtration = {
    ...Filtration, 
    schoolId: null,
    currclaumId: null,
    gradeId: null,
    divisionId: null,
    date:null,
  }
  isSchoolSelected = false
  isGradeSelected = false


  curriculums$ = this.sharedService.getAllCurriculum()
  schools$ = this.schoolsService.getAllSchools()
  AllGrades$= this.sharedService.getAllGrades('')
  schoolDivisions;
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
     private attendanceReportsServices:AttendanceReportsServicesService,
     private sharedService: SharedService,
     private schoolsService: SchoolsService,
     private userService: UserService,
     private divisionService: DivisionService,
     private students: StudentsService,


   ) {
    this.tableColumns = this.attendanceReportsServices.tabelColumns
   }


  ngOnInit(): void {
   
    this.headerService.Header.next(
      {
        'breadCrump': [
          { label: this.translate.instant('dashboard.reports.generateAttendenceReport'), routerLink: '/dashboard/reports-managment/attendance-reports' ,routerLinkActiveOptions:{exact: true}},
        ],
      }
    );
    this.getAllAbbsenceAndAttendance();

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
     this.divisionService.getSchoolDivisions(SchoolId).subscribe((res)=>{this.schoolDivisions=res.data});

  }

 



 

  onTableDataChange(event: paginationState) {
    this.filtration.Page = event.page;
    this.getAllAbbsenceAndAttendance();
  }

  clearFilter() {
    this.filtration.KeyWord = ''
    this.filtration.schoolId = null
    this.filtration.currclaumId = null
    this.filtration.gradeId = null
    this.filtration.divisionId = ''
    this.filtration.date = null
    this.filtration.Page=1;
    this.getAllAbbsenceAndAttendance();
  }

  onExport(fileType: FileEnum, table: Table) {
    let filter = {...this.filtration, PageSize:null}
    this.attendanceReportsServices.attendanceAndAbbsenceToExport(filter).subscribe( (res) =>{
      
      this.exportService.exportFile(fileType, res, this.translate.instant('sideBar.reportsManagment.chidren.attendanceReport'))
    })
    
    
  }

  onSort(e) {
    console.log(e);
    if (e.order == 1) this.filtration.SortBy = 'old'
    else if (e.order == -1) this.filtration.SortBy = 'update'
    this.filtration.Page=1;
    this.getAllAbbsenceAndAttendance()
  }

  paginationChanged(event: paginationState) {
    this.filtration.Page = event.page
    this.getAllAbbsenceAndAttendance()

  }

  getAllAbbsenceAndAttendance()
  {
    if(this.date)
    {this.filtration.date=this.formateDate(this.date)}
    this.studentsReport.loading = true
    this.studentsReport.list = []
    this.attendanceReportsServices.getAllAbbsenceAndAttendance(this.filtration)
      .subscribe(res => {
        this.studentsReport.loading = false
        this.studentsReport.list = res.result.data
        this.studentsReport.totalAllData =res.result.totalAllData
        this.studentsReport.total = res.result.total
        this.shownTable=true;

      }, err => {
        this.studentsReport.loading = false
        this.studentsReport.total = 0
      })
  }
  
  formateDate(date :Date)
  {
    let d = new Date(date.setHours(date.getHours() - (date.getTimezoneOffset()/60) )).toISOString() 
    return d.split('.')[0]
  }

}
