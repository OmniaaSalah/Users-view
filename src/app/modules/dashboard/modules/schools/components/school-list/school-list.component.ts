import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { IHeader } from 'src/app/core/Models/iheader';
import { Table } from 'primeng/table';
import { ExportService } from 'src/app/shared/services/export/export.service';
import { FileEnum } from 'src/app/shared/enums/file/file.enum';
import { SchoolsService } from '../../services/schools/schools.service';
import { Filtration } from 'src/app/core/classes/filtration';
import { StatusEnum } from 'src/app/shared/enums/status/status.enum';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { CountriesService } from 'src/app/shared/services/countries/countries.service';
import { Filter } from 'src/app/core/models/filter/filter';
import { paginationInitialState } from 'src/app/core/classes/pagination';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';



@Component({
  selector: 'app-school-list',
  templateUrl: './school-list.component.html',
  styleUrls: ['./school-list.component.scss']
})
export class SchoolListComponent implements OnInit  {

  curriculums$ = this.sharedService.getAllCurriculum()
  cities = this.CountriesService.cities
  states$ = this.CountriesService.getAllStates()

  public userAppData: any;
  public seconduserAppData: any;
  public appUserCount1: any;
  public appUserCount2: any;
  public appUserCount3: any;
  public appUserCount4: any;
  public appUserCount5: any;
  public userLabel: any;
  public options: any;
  public userUsageHoursData;


  get StatusEnum() { return StatusEnum }
  filtration :Filter = {...Filtration, Status: '', City:'', curricuulumId:'', StateId: ''}
  paginationState= {...paginationInitialState}

  schoolStatus = this.sharedService.statusOptions

  componentHeaderData: IHeader = {
    breadCrump: [
      { label: 'قائمه المدارس ' ,routerLink: '/dashboard/schools-and-students/schools'},
    ],
  }

  schools={
    total:0,
    list:[],
    loading:true
  }


  employeeOrgData; orgCount1;
  orgCount2; orgCount3; orgCount4; orgCount5; employeeLabel: any;
  employeeJIRAHoursData;

  appUsageData = [
    { name: 'user1', country: 'USA', appname: 'app-1' },
    { name: 'user2', country: 'UK', appname: 'app-1' },
    { name: 'user3', country: 'Canada', appname: 'app-1' },
    { name: 'user4', country: 'Germany', appname: 'app-1' },
    { name: 'user5', country: 'Poland', appname: 'app-2' },
    { name: 'user6', country: 'USA', appname: 'app-2' },
    { name: 'user7', country: 'Canada', appname: 'app-2' },
    { name: 'user8', country: 'Germany', appname: 'app-3' },
    { name: 'user9', country: 'USA', appname: 'app-3' },
    { name: 'user10', country: 'Germany', appname: 'app-3' },
    { name: 'user11', country: 'Canada', appname: 'app-3' },
    { name: 'user12', country: 'USA', appname: 'app-3' },
    { name: 'user13', country: 'India', appname: 'app-3' },
    { name: 'user14', country: 'India', appname: 'app-3' },
    { name: 'user15', country: 'Canada', appname: 'app-4' },
    { name: 'user16', country: 'USA', appname: 'app-4' },
    // { name: 'user17', country: 'India', appname: 'app-5' },
    // { name: 'user18', country: 'India', appname: 'app-5' },
    { name: 'user19', country: 'Canada', appname: 'app-5' },
    { name: 'user20', country: 'USA', appname: 'app-5' },
    { name: 'user21', country: 'manager', appname: 'app-5' },
  ];

  constructor(
    private headerService: HeaderService,
    private exportService: ExportService,
    private schoolsService:SchoolsService,
    private sharedService: SharedService,
    private CountriesService:CountriesService,
    public loaderService:LoaderService
  ) { }

  ngOnInit(): void {
    this.headerService.changeHeaderdata(this.componentHeaderData);
    this.getSchools()
  }


  getSchools(){
    this.schools.loading=true
    this.schools.list=[]
    this.schoolsService.getAllSchools(this.filtration).subscribe((res)=>{
      this.schools.loading = false
      this.schools.list = res.data
      this.schools.total =res.total 
      
    },err=> {
      this.schools.loading=false
      this.schools.total=0
    })
  }



  onSort(e){
    console.log(e);
    this.filtration.SortBy=e.field
    this.filtration.SortColumn = e.field
    this.filtration.SortDirection = e.order
    this.getSchools()
  }

  clearFilter(){
    this.filtration.KeyWord =''
    this.filtration.City= null
    this.filtration.StateId= null
    this.filtration.Status =''
    this.filtration.curricuulumId = null
    this.getSchools()
  }


  onExport(fileType: FileEnum, table:Table){
    this.exportService.exportFile(fileType, table, this.schools.list)
  }

  paginationChanged(event: paginationState) {
    this.filtration.Page = event.page
    this.getSchools()

  }
}
