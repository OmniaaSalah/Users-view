import { Component, OnInit,inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BaseSearchModel } from 'src/app/core/models/filter-search/base-search-model';
import { paginationInitialState } from 'src/app/core/helpers/pagination';
import { SearchModel } from 'src/app/core/models/filter-search/filter-search.model';
import { IHeader } from 'src/app/core/Models/header-dashboard';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { ParentsReportsService } from '../../services/parents-reports-service/parents-reports.service';
import { faAngleLeft, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { Table } from 'primeng/table';
import { FileTypeEnum } from 'src/app/shared/enums/file/file.enum';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { SchoolsService } from '../../../schools/services/schools/schools.service';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { ExportService } from 'src/app/shared/services/export/export.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-parents-reports',
  templateUrl: './parents-reports.component.html',
  styleUrls: ['./parents-reports.component.scss']
})
export class ParentsReportsComponent implements OnInit {
  emptyTable:boolean=false;
  lang = inject(TranslationService).lang
  isBtnLoading: boolean=false;
  date;
  tableColumns = [];
  schools$ = inject(SchoolsService).getSchoolsDropdown()
  AllGrades$ =inject(SharedService).getAllGrades('');
  curriculums$ = inject(SharedService).getAllCurriculum()
  schoolDivisions$ =inject(SharedService).getAllDivisions('')
  booleanOptions = inject(SharedService).booleanOptions
  faAngleLeft = faAngleLeft
  faAngleDown = faAngleDown
  isCollapsed=true

  filtration :SearchModel = {
    ...BaseSearchModel,
    IsChildOfAMartyr:null,
    IsSpecialAbilities:null,
    RegisterationEndDate:'',
    RegisterationStartDate:'',
    curriculumId:null,
    SchoolId:null,
    GradeId:null,
    DivisionId:null,
    ...JSON.parse(this.route.snapshot.queryParams['searchQuery'] || 'null')
  }
  paginationState = { ...paginationInitialState };

  parentsReport = {
    total: 0,
    totalAllData: 0,
    list: [],
    loading: false
  }
  componentHeaderData: IHeader = {
    breadCrump: [
      { label: this.translate.instant('reports.generateparentsReport'),routerLink:'/reports-managment/parents-reports' },
    ],
  }

  constructor(
    private exportService: ExportService,
    private translate:TranslateService,
    private headerService: HeaderService,
    private parentReportService:ParentsReportsService,
    private route:ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {
    this.headerService.changeHeaderdata(this.componentHeaderData)
    this.tableColumns=this.parentReportService.getTableColumns();

    this.getParentReportList();
  }


  getParentReportList() {
    if(this.filtration.RegisterationStartDate || this.filtration.RegisterationEndDate){
      this.date=[new Date(this.filtration.RegisterationStartDate), new Date(this.filtration.RegisterationEndDate)]
    }

    if(this.date){
      this.filtration.RegisterationStartDate=this.formateDate(this.date[0])
      this.filtration.RegisterationEndDate=this.formateDate(this.date[1])
    }

    if(this.route.snapshot.queryParams['searchQuery']){
      this.filtration = {...JSON.parse(this.route.snapshot.queryParams['searchQuery']), ...this.filtration}
    }
    this.router.navigate([], {
      queryParams: {searchQuery : JSON.stringify(this.filtration)},
      relativeTo: this.route,

    });

    this.isBtnLoading=true;
		this.parentsReport.loading=true
		this.parentsReport.list=[]
		this.parentReportService.getAllParents(this.filtration).subscribe(res => {
      this.isBtnLoading=false;
         if(res.data){
			this.parentsReport.list = res.data
			this.parentsReport.totalAllData = res.totalAllData
			this.parentsReport.total =res.total
      this.parentsReport.loading = false

      }
		},err=> {
			this.parentsReport.loading=false
			this.parentsReport.total=0;
      this.isBtnLoading=false;

		  })
	  }

    onSort(e)
    {
      this.filtration.SortColumnName=e.field
      if(e.order==1) this.filtration.SortBy= 'Asc'
      else if(e.order == -1) this.filtration.SortBy= 'Desc'
      this.filtration.Page=1;
      this.getParentReportList();
    }
    clearFilter(){

      this.filtration.KeyWord =''
      this.filtration.RegisterationEndDate=null;
      this.filtration.RegisterationStartDate=null;
      this.filtration.IsChildOfAMartyr=null;
      this.filtration.IsSpecialAbilities=null;
      this.filtration.curriculumId= null;
      this.filtration.date= null;
      this.filtration.SchoolId= null;
      this.filtration.GradeId= null;
      this.filtration.DivisionId= null;
      this.filtration.Page=1;

      this.date=null
      this.getParentReportList();
    }


    onExport(fileType: FileTypeEnum, table:Table){
      this.exportService.showLoader$.next(true)
      let exportedTable = []
      const myColumns = this.tableColumns.filter(el => el.isSelected)
      let filter = {...this.filtration, PageSize:this.parentsReport.totalAllData,Page:1}
      this.parentReportService.parentsToExport(filter).subscribe( (res) =>{
        res.forEach((parent) => {
          let myObject = {}
          for (let property in parent)
          {
           var selected= myColumns.find(column => column.name==property)

           if(selected)   myObject = { ...myObject, [selected?.name] :parent[selected?.name]}

          }

          exportedTable.push(myObject)
        })


        this.exportService.exportFile(fileType, exportedTable, this.translate.instant('sideBar.reportsManagment.chidren.gurdiansReport'))
      })
    }



    paginationChanged(event: paginationState) {
      this.filtration.Page = event.page;
      this.filtration.PageSize = event.rows
      this.getParentReportList();

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

  formateDate(date :Date)
  {
    let d = new Date(date.setHours(date.getHours() - (date.getTimezoneOffset()/60) )).toISOString()
    return d.split('.')[0]
  }
}
