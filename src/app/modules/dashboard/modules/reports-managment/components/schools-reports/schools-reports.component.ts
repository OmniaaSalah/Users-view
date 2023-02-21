import { Component, OnInit ,inject} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Table } from 'primeng/table';
import { ArrayOperations } from 'src/app/core/classes/array';
import { Filtration } from 'src/app/core/classes/filtration';
import { paginationInitialState } from 'src/app/core/classes/pagination';
import { Filter } from 'src/app/core/models/filter/filter';
import { IHeader } from 'src/app/core/Models/header-dashboard';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { FileEnum } from 'src/app/shared/enums/file/file.enum';
import { CountriesService } from 'src/app/shared/services/countries/countries.service';
import { ExportService } from 'src/app/shared/services/export/export.service';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { SchoolsReportsService } from '../../services/schools-reports-service/schools-reports.service';

@Component({
  selector: 'app-schools-reports',
  templateUrl: './schools-reports.component.html',
  styleUrls: ['./schools-reports.component.scss']
})
export class SchoolsReportsComponent implements OnInit {
  tableColumns = [];
  filtration = {...Filtration,CurriculumId:null,StateId:null,HasSpecialEducationClasses:null}
  paginationState = { ...paginationInitialState };
  schoolsReport = {
    total: 0,
    totalAllData: 0,
    list: [],
    loading: false
  }
  booleanOptions = inject(SharedService).booleanOptions
  curriculums$ = this.sharedService.getAllCurriculum()
  states$ = this.countriesService.getAllStates()
  componentHeaderData: IHeader = {
    breadCrump: [
      { label: this.translate.instant('dashboard.reports.generateschoolsReport'),routerLink:'/dashboard/reports-managment/schools-reports' },
    ],
  }

  constructor(private exportService: ExportService,private sharedService:SharedService,private countriesService:CountriesService ,private translate:TranslateService, private headerService: HeaderService,private schoolReportService:SchoolsReportsService) { }

  ngOnInit(): void {
    this.headerService.changeHeaderdata(this.componentHeaderData)
    this.tableColumns=this.schoolReportService.getTableColumns();
    this.getschoolsReportList();
  }
  getschoolsReportList()
  {
    this.sharedService.appliedFilterCount$.next(ArrayOperations.filledObjectItemsCount(this.filtration))
   
    this.schoolsReport.loading=true
    this.schoolsReport.list=[]
    this.schoolReportService.getAllSchools(this.filtration).subscribe((res)=>{
      this.schoolsReport.loading = false
      this.schoolsReport.list = res.data
      this.schoolsReport.totalAllData = res.totalAllData
      this.schoolsReport.total =res.total

    },err=> {
      this.schoolsReport.loading=false
      this.schoolsReport.total=0
    })
  }
  clearFilter(){

    this.filtration.KeyWord =''
    this.filtration.StateId= null;
    this.filtration.CurriculumId= null;
    this.filtration.HasSpecialEducationClasses= null;
    this.filtration.Page=1;
    this.getschoolsReportList();
  }


  onExport(fileType: FileEnum, table:Table){
    let filter = {...this.filtration, PageSize:null}
    this.schoolReportService.schoolsToExport(filter).subscribe( (res) =>{
      
      this.exportService.exportFile(fileType, res, this.translate.instant('sideBar.reportsManagment.chidren.schoolsReport'))
    })
  }
  onSort(e)
  {
    if(e.order==-1)
    {this.filtration.SortBy="update "+e.field;}
    else
    {this.filtration.SortBy="old "+e.field;}
    this.filtration.Page=1;

    this.getschoolsReportList();
  }


  paginationChanged(event: paginationState) {
    this.filtration.Page = event.page;
    this.getschoolsReportList();

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

}
