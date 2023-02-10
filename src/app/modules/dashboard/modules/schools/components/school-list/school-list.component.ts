import { AfterViewInit, Component, inject, OnInit,OnDestroy } from '@angular/core';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
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
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { IHeader } from 'src/app/core/Models/header-dashboard';
import { ArrayOperations } from 'src/app/core/classes/array';
import { TranslateService } from '@ngx-translate/core';
import { School } from 'src/app/core/models/schools/school.model';



@Component({
  selector: 'app-school-list',
  templateUrl: './school-list.component.html',
  styleUrls: ['./school-list.component.scss']
})
export class SchoolListComponent implements OnInit,AfterViewInit,OnDestroy  {
  lang =inject(TranslationService).lang

  curriculums$ = this.sharedService.getAllCurriculum()
  // cities = this.CountriesService.cities
  cities$ = this.CountriesService.getCities()
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
  filtration :Filter = {...Filtration, Status: null, CityId:null,curriculumId:'', StateId: ''}
  paginationState= {...paginationInitialState}

  schoolStatus = this.sharedService.statusOptions

  componentHeaderData: IHeader = {
    breadCrump: [
      { label: 'قائمه المدارس ' ,routerLink: '/dashboard/schools-and-students/schools'},
    ],
  }

  schools={
    totalAllData:0,
    total:0,
    list:[],
    loading:true
  }

  cols = [
    { field: 'name', header: this.translate.instant('dashboard.schools.schoolName'),},
    { field: 'city', header: this.translate.instant('shared.city') },
    { field: 'state', header: this.translate.instant('shared.state') },
    { field: 'curriculum', header: this.translate.instant('shared.curriculum') },
    { field: 'studentCount', header: this.translate.instant('dashboard.schools.studentsNumber') },
    { field: 'establishmentDate', header: this.translate.instant('dashboard.schools.schoolStablishmentDate') },
    { field: 'status', header: this.translate.instant('dashboard.schools.schoolStatus') }

];


  employeeOrgData; orgCount1;
  orgCount2; orgCount3; orgCount4; orgCount5; employeeLabel: any;
  employeeJIRAHoursData;


  constructor(
    private headerService: HeaderService,
    private exportService: ExportService,
    private schoolsService:SchoolsService,
    private sharedService: SharedService,
    private CountriesService:CountriesService,
    private translate:TranslateService
  ) { }

  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
    this.headerService.changeHeaderdata(this.componentHeaderData);
    this.getSchools()
  }


  getSchools(){
    this.sharedService.appliedFilterCount$.next(ArrayOperations.filledObjectItemsCount(this.filtration))
    // ArrayOperations.filledObjectItemsCount(this.filtration)
    this.schools.loading=true
    this.schools.list=[]
    this.schoolsService.getAllSchools(this.filtration).subscribe((res)=>{
      this.schools.loading = false
      this.schools.list = res.data
      this.schools.totalAllData = res.totalAllData
      this.schools.total =res.total

    },err=> {
      this.schools.loading=false
      this.schools.total=0
    })
  }



  onSort(e){
    console.log(e);
    this.filtration.CurriculumName=e.field

    if(e.field=='EstablishmentDate'){      
      if(e.order==1) this.filtration.SortBy= 'old'
      else if(e.order == -1) this.filtration.SortBy= 'update'
    }else{
      if(e.order==1) this.filtration.SortBy= 'ASC'
      else if(e.order == -1) this.filtration.SortBy= 'DESC'
    }


    this.filtration.Page=1;
    this.getSchools()
  }

  clearFilter(){
    this.filtration.KeyWord =''
    this.filtration.CityId= null
    this.filtration.StateId= null
    this.filtration.Status =null
    this.filtration.curriculumId = null
    this.filtration.Page=1;
    this.getSchools()
  }


  onExport(fileType: FileEnum){
    let filter = {...this.filtration, PageSize:null}
    this.schoolsService.schoolsToExport(filter).subscribe( (res: School[]) =>{
      
      this.exportService.exportFile(fileType, res, this.translate.instant('dashboard.schools.schoolsList'))
    })
  }

  paginationChanged(event: paginationState) {
    this.filtration.Page = event.page
    this.getSchools()

  }

  ngOnDestroy(): void {
    
  }
}
