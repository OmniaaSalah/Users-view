import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { ExportService } from 'src/app/shared/services/export/export.service';
import { FileTypeEnum } from 'src/app/shared/enums/file/file.enum';
import { SchoolsService } from '../../services/schools/schools.service';
import { BaseSearchModel } from 'src/app/core/models/filter-search/base-search-model';
import { StatusEnum } from 'src/app/shared/enums/status/status.enum';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { CountriesService } from 'src/app/shared/services/countries/countries.service';
import { paginationInitialState } from 'src/app/core/helpers/pagination';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { IHeader } from 'src/app/core/Models/header-dashboard';
import { TranslateService } from '@ngx-translate/core';
import { School } from 'src/app/core/models/schools/school.model';
import { GradesService } from '../../services/grade/grade.service';
import { SchoolChartsComponent } from './school-charts/school-charts.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterSearchService } from 'src/app/core/services/filter-search-service/filter-search.service';



@Component({
  selector: 'app-school-list',
  templateUrl: './school-list.component.html',
  styleUrls: ['./school-list.component.scss']
})
export class SchoolListComponent extends FilterSearchService implements OnInit  {
  @ViewChild('chartsComp')  chartsComp:SchoolChartsComponent

  lang =inject(TranslationService).lang
  displayGradesList:boolean=false
  showLoader:boolean=false
  gradesList=[];
  curriculums$ = this.sharedService.getAllCurriculum()
  cities$ = this.CountriesService.getCities()
  states$ = this.CountriesService.getAllStates()
  schoolCategory$ = this.schoolsService.getSchoolsCategory()

  searchByList=[this.translate.instant('shared.city'), this.translate.instant('dashboard.SystemSetting.Email')]
  get StatusEnum() { return StatusEnum }
  // filtration :ISearchState = {
  //   ...Filtration, Status: null,
  //   CityId:null,
  //   curriculumId:null,
  //   StateId: null,
  //   schoolName:'',
  //   schoolCategoryId :[],
  //   schoolNumber:null,
  //   ...JSON.parse(this.route.snapshot.queryParams['searchQuery'] || 'null')
  // }
  // paginationState= {...paginationInitialState}

  schoolStatus = this.sharedService.statusOptions

  componentHeaderData: IHeader = {
    breadCrump: [
      { label: this.translate.instant('dashboard.schools.schoolsList') ,routerLink: '/schools-and-students/schools'},
    ],
  }

  schools={
    totalAllData:0,
    total:0,
    list:[],
    loading:true
  }


  employeeOrgData; orgCount1;
  orgCount2; orgCount3; orgCount4; orgCount5; employeeLabel: any;
  employeeJIRAHoursData;

  get chartSearchModel(){
    return {...this.searchModel, PageSize:this.schools.total}
  }


  constructor(
    private gradeService:GradesService,
    private headerService: HeaderService,
    private exportService: ExportService,
    private schoolsService:SchoolsService,
    private sharedService: SharedService,
    private CountriesService:CountriesService,
    private translate:TranslateService,
    protected route:ActivatedRoute,
    protected router:Router
  ) {
    super(
      route,
      router,
      {...BaseSearchModel,
        Status: null,
        CityId:null,
        curriculumId:null,
        StateId: null,
        schoolName:'',
        schoolCategoryId :null,
        schoolNumber:null,
      })
  }


  ngOnInit(): void {
    this.headerService.changeHeaderdata(this.componentHeaderData);
    this.getSchools()
  }


  getSchools(){

    this.saveSearchQuery()
    this.schools.loading=true
    this.schools.list=[]
    this.schoolsService.getAllSchools(this.searchModel).subscribe((res)=>{
      this.sharedService.filterLoading.next(false);
      this.schools.loading = false
      this.schools.list = res.data
      this.schools.totalAllData = res.totalAllData
      this.schools.total =res.total

    },err=> {
      this.schools.loading=false
      this.schools.total=0
      this.sharedService.filterLoading.next(false);
    })
  }


  onExport(fileType: FileTypeEnum){
    this.exportService.showLoader$.next(true)
    let filter = {...this.searchModel, PageSize:this.schools.total,Page:1}
    this.schoolsService.schoolsToExport(filter).subscribe( (res: School[]) =>{

      this.exportService.exportFile(fileType, res, this.translate.instant('dashboard.schools.schoolsList'))
    })
  }

  showGrades(schoolId){
    this.gradesList=[];
    this.showLoader=true;
    this.displayGradesList = true;
    this.gradeService.getSchoolGardes(schoolId).subscribe((res)=>{
      this.showLoader=false;
      this.gradesList=res.data;
    });

  }

}
