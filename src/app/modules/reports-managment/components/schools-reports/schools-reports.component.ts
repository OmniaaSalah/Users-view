import { Component, OnInit ,inject} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Table } from 'primeng/table';
import { ArrayOperations } from 'src/app/core/classes/array';
import { Filtration } from 'src/app/core/classes/filtration';
import { paginationInitialState } from 'src/app/core/classes/pagination';
import { IHeader } from 'src/app/core/Models/header-dashboard';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { FileTypeEnum } from 'src/app/shared/enums/file/file.enum';
import { CountriesService } from 'src/app/shared/services/countries/countries.service';
import { ExportService } from 'src/app/shared/services/export/export.service';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { SchoolsReportsService } from '../../services/schools-reports-service/schools-reports.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-schools-reports',
  templateUrl: './schools-reports.component.html',
  styleUrls: ['./schools-reports.component.scss']
})
export class SchoolsReportsComponent implements OnInit {
  emptyTable:boolean=false;
  lang = inject(TranslationService).lang
  tableColumns = [];

  filtration = {
    ...Filtration,
    CurriculumId:null,
    StateId:null,
    HasSpecialEducationClasses:null,
    ...JSON.parse(this.route.snapshot.queryParams['searchQuery'] || 'null')
  }

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
      { label: this.translate.instant('dashboard.reports.generateschoolsReport'),routerLink:'/reports-managment/schools-reports' },
    ],
  }

  constructor(private exportService: ExportService,
    private sharedService:SharedService,
    private countriesService:CountriesService ,
    private translate:TranslateService,
    private headerService: HeaderService,
    private schoolReportService:SchoolsReportsService,
    private route:ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {
    this.headerService.changeHeaderdata(this.componentHeaderData)
    this.tableColumns=this.schoolReportService.getTableColumns();
    this.getschoolsReportList();
  }
  getschoolsReportList()
  {
    if(this.route.snapshot.queryParams['searchQuery']){
      this.filtration = {...JSON.parse(this.route.snapshot.queryParams['searchQuery']), ...this.filtration}
    }
    this.router.navigate([], {
      queryParams: {searchQuery : JSON.stringify(this.filtration)},
      relativeTo: this.route,
    });

    this.sharedService.appliedFilterCount$.next(ArrayOperations.filledObjectItemsCount(this.filtration))
    this.schoolsReport.loading=true
    this.schoolsReport.list=[]
    this.schoolReportService.getAllSchools(this.filtration).subscribe((res)=>{
      this.sharedService.filterLoading.next(false);
      this.schoolsReport.loading = false
      this.schoolsReport.list = res.data
      this.schoolsReport.totalAllData = res.totalAllData
      this.schoolsReport.total =res.total

    },err=> {
      this.schoolsReport.loading=false
      this.schoolsReport.total=0
      this.sharedService.filterLoading.next(false);
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


  onExport(fileType: FileTypeEnum, table:Table){
    let exportedTable = []
    const myColumns = this.tableColumns.filter(el => el.isSelected)
    let filter = {...this.filtration, PageSize:this.schoolsReport.totalAllData,Page:1}
    this.schoolReportService.schoolsToExport(filter).subscribe( (res) =>{
      res.forEach((school) => {
        let myObject = {}
        for (let property in school)
        { 
         var selected= myColumns.find(column => column.name==property)

         if(selected)   myObject = { ...myObject, [selected?.name] :school[selected?.name]} 

        }

        exportedTable.push(myObject)
      })
      this.exportService.exportFile(fileType, exportedTable, this.translate.instant('sideBar.reportsManagment.chidren.schoolsReport'))
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

}
