
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { Component,  OnInit,inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { paginationInitialState } from 'src/app/core/helpers/pagination';
import { Filtration } from 'src/app/core/helpers/filtration';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { StatusEnum } from 'src/app/shared/enums/status/status.enum';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { IHeader } from 'src/app/core/Models/header-dashboard';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { SurveyService } from '../../service/survey.service';
import { FileTypeEnum } from 'src/app/shared/enums/file/file.enum';
import { Table } from 'primeng/table';
import { ExportService } from 'src/app/shared/services/export/export.service';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { ArrayOperations } from 'src/app/core/helpers/array';
import { ClaimsEnum } from 'src/app/shared/enums/claims/claims.enum';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-surveys-list',
  templateUrl: './surveys-list.component.html',
  styleUrls: ['./surveys-list.component.scss']
})
export class SurveysListComponent implements OnInit {
  lang = inject(TranslationService).lang
  get StatusEnum() { return StatusEnum }
  get ClaimsEnum(){return ClaimsEnum}
  surveyType;
  surveyStatus ;
  filtration  = {
    ...Filtration,
    SurveyType: '',
    SurveyStatus:null,
    ...JSON.parse(this.route.snapshot.queryParams['searchQuery'] || 'null')
  }
  paginationState: paginationState = { ...paginationInitialState }
  faEllipsisVertical = faEllipsisVertical;
  surveyList={
    totalAllData:0,
    total:0,
    list:[],
    loading:true
    }
  componentHeaderData: IHeader = {

      'breadCrump': [
        { label: this.translate.instant('dashboard.surveys.surveyList'),routerLink:'/educational-settings/surveys' }],

  };
  constructor(
    private headerService: HeaderService,
    public translationService: TranslationService,
    private translate: TranslateService,
    private sharedService:SharedService,
    private Surveyservice: SurveyService,
    private toastrService:ToastService,
    private exportService: ExportService,
    private route:ActivatedRoute,
    private router:Router) { }




  ngOnInit(): void {
    this.surveyStatus=this.Surveyservice.surveyStatus;
    this.surveyType=this.Surveyservice.surveyType;
    this.getSurveyList();

    this.headerService.Header.next(
      {
        'breadCrump': [
          { label: this.translate.instant('dashboard.surveys.surveyList'), routerLink: '/educational-settings/surveys', routerLinkActiveOptions: { exact: true } }],
      }
    );
    localStorage.removeItem('addedSurveyStatus');
  }
  getSurveyList(){

    if(this.route.snapshot.queryParams['searchQuery']){
      this.filtration = {...JSON.parse(this.route.snapshot.queryParams['searchQuery']), ...this.filtration}
    }
    this.router.navigate([], {
      queryParams: {searchQuery : JSON.stringify(this.filtration)},
      relativeTo: this.route,
      queryParamsHandling: "preserve"
    });
    this.sharedService.appliedFilterCount$.next(ArrayOperations.filledObjectItemsCount(this.filtration));
    this.surveyList.loading=true
    this.surveyList.list=[]
    this.Surveyservice.getSurveyList(this.filtration).subscribe((res)=>{
      this.sharedService.filterLoading.next(false);
      this.surveyList.loading = false
      this.surveyList.total =res.result.total
      this.surveyList.totalAllData = res.result.totalAllData
      this.surveyList.list = res.result.data

  }  ,err=> {
      this.surveyList.loading=false
      this.surveyList.total=0
      this.sharedService.filterLoading.next(false);
  })
  }
  onSort(e){

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

   onExport(fileType: FileTypeEnum, table:Table){
    this.exportService.showLoader$.next(true)
    let filter = {...this.filtration, PageSize:this.surveyList.totalAllData,Page:1}
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
