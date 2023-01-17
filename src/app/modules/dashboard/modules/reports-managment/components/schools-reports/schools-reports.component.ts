import { Component, OnInit ,inject} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Table } from 'primeng/table';
import { Filtration } from 'src/app/core/classes/filtration';
import { paginationInitialState } from 'src/app/core/classes/pagination';
import { Filter } from 'src/app/core/models/filter/filter';
import { IHeader } from 'src/app/core/Models/header-dashboard';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { FileEnum } from 'src/app/shared/enums/file/file.enum';
import { CountriesService } from 'src/app/shared/services/countries/countries.service';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { SchoolsReportsService } from '../../services/schools-reports-service/schools-reports.service';

@Component({
  selector: 'app-schools-reports',
  templateUrl: './schools-reports.component.html',
  styleUrls: ['./schools-reports.component.scss']
})
export class SchoolsReportsComponent implements OnInit {
  tableColumns = [];
  filtration :Filter = {...Filtration,curriculumId:null,StateId:null,hasSpecial:null}
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

  constructor(private sharedService:SharedService,private countriesService:CountriesService ,private translate:TranslateService, private headerService: HeaderService,private schoolReportService:SchoolsReportsService) { }

  ngOnInit(): void {
    this.headerService.changeHeaderdata(this.componentHeaderData)
    this.tableColumns=this.schoolReportService.getTableColumns();
  }
  getschoolsReportList()
  {

  }
  clearFilter(){

    this.filtration.KeyWord =''
    this.filtration.StateId= null;
    this.filtration.curriculumId= null;
    this.filtration.hasSpecial= null;
    this.getschoolsReportList();
  }


  onExport(fileType: FileEnum, table:Table){
    let filter = {...this.filtration, PageSize:null}
    // this.indexesService.indexesToExport(filter).subscribe( (res) =>{
      
    //   this.exportService.exportFile(fileType, res, this.translate.instant('sideBar.managerTools.children.System List'))
    // })
  }



  paginationChanged(event: paginationState) {
    this.filtration.Page = event.page;
    this.getschoolsReportList();

  }

}
