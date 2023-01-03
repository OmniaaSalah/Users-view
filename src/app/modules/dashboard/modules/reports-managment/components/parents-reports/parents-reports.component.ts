import { Component, OnInit,inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Filtration } from 'src/app/core/classes/filtration';
import { paginationInitialState } from 'src/app/core/classes/pagination';
import { Filter } from 'src/app/core/models/filter/filter';
import { IHeader } from 'src/app/core/Models/header-dashboard';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { ParentService } from '../../../parants/services/parent.service';
import { ParentsReportsService } from '../../services/parents-reports-service/parents-reports.service';
import { faAngleLeft, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { Table } from 'primeng/table';
import { FileEnum } from 'src/app/shared/enums/file/file.enum';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { SchoolsService } from '../../../schools/services/schools/schools.service';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
@Component({
  selector: 'app-parents-reports',
  templateUrl: './parents-reports.component.html',
  styleUrls: ['./parents-reports.component.scss']
})
export class ParentsReportsComponent implements OnInit {
  tableColumns = [];
  schools$ = inject(SchoolsService).getAllSchools();
  AllGrades$ =inject(SharedService).getAllGrades('')
  schoolDivisions$ =inject(SharedService).getAllDivisions('')
  booleanOptions = inject(SharedService).booleanOptions
  faAngleLeft = faAngleLeft
  faAngleDown = faAngleDown
  isCollapsed=true
  filtration :Filter = {...Filtration,date:'',curriculumId:'',SchoolId:'',GradeId:'',DivisionId:'',}
  paginationState = { ...paginationInitialState };
  parentsReport = {
    total: 0,
    totalAllData: 0,
    list: [],
    loading: false
  }
  componentHeaderData: IHeader = {
    breadCrump: [
      { label: this.translate.instant('dashboard.reports.generateparentsReport'),routerLink:'/dashboard/reports-managment/parents-reports' },
    ],
  }

  constructor(private parentService:ParentService,private translate:TranslateService, private headerService: HeaderService,private parentReportService:ParentsReportsService) { }

  ngOnInit(): void {
    this.headerService.changeHeaderdata(this.componentHeaderData)
    this.tableColumns=this.parentReportService.getTableColumns();
    this.getParentReportList(); 
  }


  getParentReportList() {
		this.parentsReport.loading=true
		this.parentsReport.list=[]
		this.parentService.getAllParents(this.filtration).subscribe(res => {
         if(res.data){

			this.parentsReport.list = res.data
			this.parentsReport.totalAllData = res.totalAllData
			this.parentsReport.total =res.total
      this.parentsReport.loading = false

      }
		},err=> {
			this.parentsReport.loading=false
			this.parentsReport.total=0;

		  })
	  }

    sortMe(e)
    {
      if(e.order==-1)
      {this.filtration.SortBy="update "+e.field;}
      else
      {this.filtration.SortBy="old "+e.field;}
  
      this.getParentReportList();
    }
    clearFilter(){

      this.filtration.KeyWord =''
      this.filtration.date= null;
      this.filtration.curriculumId= null;
      this.filtration.date= null;
      this.filtration.SchoolId= null;
      this.filtration.GradeId= null;
      this.filtration.DivisionId= null;
      this.getParentReportList();
    }
  
  
    onExport(fileType: FileEnum, table:Table){
      let filter = {...this.filtration, PageSize:null}
      // this.indexesService.indexesToExport(filter).subscribe( (res) =>{
        
      //   this.exportService.exportFile(fileType, res, this.translate.instant('sideBar.managerTools.children.System List'))
      // })
    }
  
  
  
    paginationChanged(event: paginationState) {
      this.filtration.Page = event.page;
      this.getParentReportList();
  
    }
  

}
