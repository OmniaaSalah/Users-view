import { Component, OnInit ,inject} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Filtration } from 'src/app/core/classes/filtration';
import { paginationInitialState } from 'src/app/core/classes/pagination';
import { IHeader } from 'src/app/core/Models/header-dashboard';
import { ToastrService } from 'ngx-toastr';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { faAngleLeft, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { DegreeReportService } from '../../services/degree-report-service/degree-report.service';
import { SchoolsService } from '../../../schools/services/schools/schools.service';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { SubjectService } from '../../../subjects/service/subject.service';
import { StudentsService } from '../../../students/services/students/students.service';
import { Table } from 'primeng/table';
import { FileTypeEnum } from 'src/app/shared/enums/file/file.enum';
import { ExportService } from 'src/app/shared/services/export/export.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-degrees-reports',
  templateUrl: './degrees-reports.component.html',
  styleUrls: ['./degrees-reports.component.scss']
})
export class DegreesReportsComponent implements OnInit {
  isBtnLoading: boolean=false;
  shownTable:boolean=false;
  lang = inject(TranslationService).lang
  tableColumns = [];
  schoolYearsList=[];
  subjectList;
  studentList =inject(StudentsService).getAllStudents();
  AllSemesters=inject(SharedService).semesterTypes;
  schools$ = inject(SchoolsService).getSchoolsDropdown()
  AllGrades$ =inject(SharedService).getAllGrades('');
  schoolDivisions$ =inject(SharedService).getAllDivisions('')
  isCollapsed=true;
  faAngleLeft = faAngleLeft
  faAngleDown = faAngleDown
  componentHeaderData: IHeader = {
    breadCrump: [
      { label: this.translate.instant('dashboard.reports.generateDegreesReport') ,routerLink:"/reports-managment/degrees-reports"},
    ],
  }
  filtration = {
    ...Filtration,
    StudentId:null,
    SchoolId:null,
    GradeId:null,
    DivisionlId:null,
    SubjectId:null,
    SchoolYearId:null,
    Semester:null,
    ...JSON.parse(this.route.snapshot.queryParams['searchQuery'] || 'null')
  }
  paginationState = { ...paginationInitialState };

  degreessReport = {
    total: 0,
    totalAllData: 0,
    list: [],
    loading: false
  }

  constructor(
    private toastr:ToastrService,
    private translate: TranslateService,
    private headerService: HeaderService,
    private degreesReportService:DegreeReportService,
    private subjectService:SubjectService,
    private exportService:ExportService,
    private sharedService:SharedService,
    private route:ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit(): void {

    this.headerService.changeHeaderdata(this.componentHeaderData);
    this.tableColumns=this.degreesReportService.getTableColumns();
    this.getDegreesList();
    this.subjectService.getAllSPEASubjects().subscribe((res)=>{this.subjectList=res;})
    this.sharedService.getSchoolYearsList().subscribe((res)=>{ this.schoolYearsList = res })

  }

  clearFilter(){

    this.filtration.KeyWord =''
    this.filtration.SubjectId=null;
    this.filtration.DivisionlId=null;
    this.filtration.GradeId=null;
    this.filtration.SchoolYearId=null;
    this.filtration.Semester= null;
    this.filtration.StudentId= null;
    this.filtration.SchoolId= null;
    this.filtration.Page=1;
    this.getDegreesList();
  }

  onSort(e) {
    console.log(e);
    if (e.order == 1) this.filtration.SortBy = 'old'
    else if (e.order == -1) this.filtration.SortBy = 'update'
    this.filtration.Page=1;
    this.getDegreesList();
  }

  paginationChanged(event: paginationState) {
    this.filtration.Page = event.page;
    this.getDegreesList();

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

  getDegreesList(){

    if(this.route.snapshot.queryParams['searchQuery']){
      this.filtration = {...JSON.parse(this.route.snapshot.queryParams['searchQuery']), ...this.filtration}
    }
    this.router.navigate([], {
      queryParams: {searchQuery : JSON.stringify(this.filtration)},
      relativeTo: this.route,
    });

    this.isBtnLoading=true;
    this.degreessReport.loading=true
    this.degreessReport.list =[];
    this.degreesReportService.getAllDegrees(this.filtration).subscribe(res => {
      this.isBtnLoading=false;
      this.degreessReport.list = res.data;
      this.degreessReport.totalAllData = res.totalAllData
      this.degreessReport.total =res.total;
      this.degreessReport.loading = false;
      this.shownTable=true;
    },err=> {
      this.degreessReport.loading=false
      this.degreessReport.total=0;
      this.isBtnLoading=false;
    })
  }

  onExport(fileType: FileTypeEnum, table: Table) {
    let filter = {...this.filtration, PageSize:this.degreessReport.totalAllData,Page:1}
    this.degreesReportService.degreesToExport(filter).subscribe( (res) =>{

      this.exportService.exportFile(fileType, res, this.translate.instant('sideBar.reportsManagment.chidren.gradesReport'))
    })

  }

  checkAvalibility()
  {
    if(this.filtration.SchoolId &&this.filtration.GradeId && this.filtration.SchoolYearId)
    {
      this.filtration.Page=1;
      this.getDegreesList()
    }
    else
    {
      this.toastr.warning(this.translate.instant('dashboard.reports.you should choose the school , schoolYear and grade that you need view it’s degrees data first'));
    }
  }
}
