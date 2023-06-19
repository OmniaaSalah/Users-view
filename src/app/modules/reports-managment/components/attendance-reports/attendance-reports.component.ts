import { Component, OnInit ,inject} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { paginationInitialState } from 'src/app/core/classes/pagination';
import { Filtration } from 'src/app/core/classes/filtration';
import { FileTypeEnum } from 'src/app/shared/enums/file/file.enum';
import { ExportService } from 'src/app/shared/services/export/export.service';
import { faAngleLeft, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { Table } from 'primeng/table';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { SchoolsService } from '../../../schools/services/schools/schools.service';
import { AttendanceReportsServicesService } from '../../services/attendance/attendance-reports-services.service';
import { ToastrService } from 'ngx-toastr';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-attendance-reports',
  templateUrl: './attendance-reports.component.html',
  styleUrls: ['./attendance-reports.component.scss']
})
export class AttendanceReportsComponent implements OnInit {
  emptyTable:boolean=false;
  isBtnLoading: boolean=false;
  lang = inject(TranslationService).lang
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
    ...JSON.parse(this.route.snapshot.queryParams['searchQuery'] || 'null')
  }
  isSchoolSelected = false
  isGradeSelected = false


  curriculums$ = this.sharedService.getAllCurriculum()
  schools$ = inject(SchoolsService).getSchoolsDropdown()
  AllGrades$= this.sharedService.getAllGrades('')
  schoolDivisions$ =inject(SharedService).getAllDivisions('')
  paginationState= {...paginationInitialState}
  faEllipsisVertical = faEllipsisVertical;
  studentsReport={
	totalAllData:0,
		total:0,
		list:[],
		loading:true
  }
  tableColumns = []
  constructor(
    private toastr:ToastrService,
     private exportService: ExportService,
    private headerService: HeaderService,
    private translate: TranslateService,
     private attendanceReportsServices:AttendanceReportsServicesService,
     private sharedService: SharedService,
     private route:ActivatedRoute,
     private router:Router
   ) {
    this.tableColumns = this.attendanceReportsServices.tabelColumns
   }


  ngOnInit(): void {

    this.headerService.Header.next(
      {
        'breadCrump': [
          { label: this.translate.instant('dashboard.reports.generateAttendenceReport'), routerLink: '/reports-managment/attendance-reports' ,routerLinkActiveOptions:{exact: true}},
        ],
      }
    );
    this.getAllAbbsenceAndAttendance();

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


  onTableDataChange(event: paginationState) {
    this.filtration.Page = event.page;
    this.getAllAbbsenceAndAttendance();
  }

  clearFilter() {
    this.filtration.KeyWord = ''
    this.filtration.schoolId = null
    this.filtration.currclaumId = null
    this.filtration.gradeId = null
    this.filtration.divisionId = null
    this.filtration.date = null
    this.date=null;
    this.filtration.Page=1;
    this.getAllAbbsenceAndAttendance();
  }

  onExport(fileType: FileTypeEnum, table: Table) {
    let exportedTable = []
    const myColumns = this.tableColumns.filter(el => el.isSelected)
    let filter = {...this.filtration, PageSize:this.studentsReport.totalAllData,Page:1}
    this.attendanceReportsServices.attendanceAndAbbsenceToExport(filter).subscribe( (res) =>{
      res.forEach((student) => {
        let myObject = {}
        for (let property in student)
        { 
         var selected= myColumns.find(column => column.name==property)

         if(selected)   myObject = { ...myObject, [selected?.name] :student[selected?.name]} 

        }

        exportedTable.push(myObject)
      })

      this.exportService.exportFile(fileType,exportedTable, this.translate.instant('sideBar.reportsManagment.chidren.attendanceReport'))
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
    if(this.date){
      this.filtration.date=this.formateDate(this.date)
    }

    if(this.route.snapshot.queryParams['searchQuery']){
      this.filtration = {...JSON.parse(this.route.snapshot.queryParams['searchQuery']), ...this.filtration}
    }
    this.router.navigate([], {
      queryParams: {searchQuery : JSON.stringify(this.filtration)},
      relativeTo: this.route,
    });


    this.isBtnLoading=true;
    this.studentsReport.loading = true
    this.studentsReport.list = []
    this.attendanceReportsServices.getAllAbbsenceAndAttendance(this.filtration)
      .subscribe(res => {
        this.isBtnLoading=false;
        this.studentsReport.loading = false
        this.studentsReport.list = res.result.data
        this.studentsReport.totalAllData =res.result.totalAllData
        this.studentsReport.total = res.result.total
        this.shownTable=true;

      }, err => {
        this.studentsReport.loading = false
        this.studentsReport.total = 0
        this.isBtnLoading=false;
      })
  }

  formateDate(date :Date)
  {
    let d = new Date(date.setHours(date.getHours() - (date.getTimezoneOffset()/60) )).toISOString()
    return d.split('.')[0]
  }

  checkAvalibility()
  {
    if(this.date)
    {
      this.filtration.Page=1;
      this.getAllAbbsenceAndAttendance()
    }
    else
    {
      this.toastr.warning(this.translate.instant('dashboard.reports.you should choose the date that you need view it’s absence and attendance data first'));
    }
  }

}
