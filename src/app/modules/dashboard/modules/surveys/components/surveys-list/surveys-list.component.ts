
import { ISurvey } from 'src/app/core/Models/ISurvey';
import { Router } from '@angular/router';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { Component, ElementRef, OnInit, ViewChild,inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { paginationInitialState } from 'src/app/core/classes/pagination';
import { Filtration } from 'src/app/core/classes/filtration';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { StatusEnum } from 'src/app/shared/enums/status/status.enum';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { IHeader } from 'src/app/core/Models/header-dashboard';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { SurveyService } from '../../service/survey.service';
import { FileEnum } from 'src/app/shared/enums/file/file.enum';
import { Table } from 'primeng/table';
import { ExportService } from 'src/app/shared/services/export/export.service';
import { Filter } from 'src/app/core/models/filter/filter';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { ArrayOperations } from 'src/app/core/classes/array';


@Component({
  selector: 'app-surveys-list',
  templateUrl: './surveys-list.component.html',
  styleUrls: ['./surveys-list.component.scss']
})
export class SurveysListComponent implements OnInit {
  lang = inject(TranslationService).lang
  surveyType;
  surveyStatus ;
 
  page: number = 1;
  first = 1
  rows = 6
  pagesArrOptions = []
  totalItems: number = 1;
  currentActivePage = { page: 1 }
  paginationState: paginationState = { ...paginationInitialState }
  assignmentList: ISurvey[] = [];
  pageNum = 1;
  pageSize = 50;
  searchKey: string = '';
  faEllipsisVertical = faEllipsisVertical;
  indexListType;
  indexStatusList;
  get StatusEnum() { return StatusEnum }
  filtration  = {...Filtration, SurveyType: '', SurveyStatus:null}
  surveyList={
    totalAllData:0,
    total:0,
    list:[],
    loading:true
    }
  componentHeaderData: IHeader = {

      'breadCrump': [
        { label: this.translate.instant('dashboard.surveys.surveyList'),routerLink:'/dashboard/educational-settings/surveys' }],

  };
  constructor(
    private headerService: HeaderService,
    public translationService: TranslationService,
    private translate: TranslateService,
    private router: Router,
    private sharedService:SharedService,
    private Surveyservice: SurveyService,
    private toastrService:ToastService,
    private exportService: ExportService) { }
   
   


  ngOnInit(): void {
    this.surveyStatus=this.Surveyservice.surveyStatus;
    this.surveyType=this.Surveyservice.surveyType;
    this.getSurveyList();
  
    this.headerService.Header.next(
      {
        'breadCrump': [
          { label: this.translate.instant('dashboard.surveys.surveyList'), routerLink: '/dashboard/educational-settings/surveys', routerLinkActiveOptions: { exact: true } }],
      }
    );
  }
  getSurveyList(){
    
    this.sharedService.appliedFilterCount$.next(ArrayOperations.filledObjectItemsCount(this.filtration));
    this.surveyList.loading=true
    this.surveyList.list=[]
    this.Surveyservice.getSurveyList(this.filtration).subscribe((res)=>{
      this.surveyList.loading = false
      this.surveyList.total =res.result.total
      this.surveyList.totalAllData = res.result.totalAllData
      this.surveyList.list = res.result.data
  
  }  ,err=> {
      this.surveyList.loading=false
      this.surveyList.total=0
  })
  }
  onSort(e){
    console.log(e);
    if(e.order==1) this.filtration.SortBy= 'old'
    else if(e.order == -1) this.filtration.SortBy= 'update'
    this.getSurveyList()
  }



  onTableDataChange(event: paginationState) {
    this.filtration.Page = event.page
    this.getSurveyList();


  }


   notAvailable(): void {
    this.toastrService.warning(this.translate.instant('noURLFound'));
   }

   onExport(fileType: FileEnum, table:Table){
    let filter = {...this.filtration, PageSize:0}
    this.Surveyservice.surveyToExport(filter).subscribe( (res) =>{
      
      this.exportService.exportFile(fileType, res, this.translate.instant('dashboard.surveys.surveyList'))
    })
  }
  clearFilter(){
    this.filtration.KeyWord =''
    this.filtration.SurveyStatus= null
    this.filtration.SurveyType= null
    this.getSurveyList()
  }
  
}
