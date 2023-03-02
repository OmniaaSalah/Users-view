import { Component, OnInit,inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { Filtration } from 'src/app/core/classes/filtration';
import { paginationInitialState } from 'src/app/core/classes/pagination';
import { IHeader } from 'src/app/core/Models';

import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { UserScope } from 'src/app/shared/enums/user/user.enum';
import { ExportService } from 'src/app/shared/services/export/export.service';
import { SystemRequestService } from '../../services/system-request.service';
import {StatusEnum, UserRequestsStatus} from 'src/app/shared/enums/status/status.enum'
import { requestTypeEnum } from 'src/app/shared/enums/system-requests/requests.enum';
import { FileEnum } from 'src/app/shared/enums/file/file.enum';
import { ArrayOperations } from 'src/app/core/classes/array';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';


@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.scss']
})
export class RequestListComponent implements OnInit {
  currentUserScope = inject(UserService).getCurrentUserScope()
  lang = inject(TranslationService).lang
  get userScope() { return UserScope }
  get requestStatusEnum(){return UserRequestsStatus}
  faEllipsisVertical = faEllipsisVertical

  componentHeaderData: IHeader={ 
		breadCrump: []
	}

  statusOptions=[
    {name:this.translate.instant('dashboard.Requests.Accepted'), value: UserRequestsStatus.Accepted},
    {name:this.translate.instant('dashboard.Requests.TentativelyAccepted'), value: UserRequestsStatus.TentativelyAccepted},
    {name:this.translate.instant('dashboard.Requests.Pending'), value: UserRequestsStatus.Pending},
    {name:this.translate.instant('dashboard.Requests.Returned'), value: UserRequestsStatus.Returned},
    {name:this.translate.instant('dashboard.Requests.Rejected'), value: UserRequestsStatus.Rejected},
    {name:this.translate.instant('dashboard.Requests.Canceled'), value: UserRequestsStatus.Canceled},
  ]

  reqsTypes=[
    {name:this.translate.instant('dashboard.Requests.FlexibleHolidayRequest'), value: requestTypeEnum.FlexibleHolidayRequest},
    {name:this.translate.instant('dashboard.Requests.StudentRegradingRequest'), value: requestTypeEnum.StudentRegradingRequest},
    {name:this.translate.instant('dashboard.Requests.DeleteStudentRequest'), value: requestTypeEnum.DeleteStudentRequest},
    {name:this.translate.instant('dashboard.Requests.RegestrationApplicationRequest'), value: requestTypeEnum.RegestrationApplicationRequest},
    {name:this.translate.instant('dashboard.Requests.MassTransferRequest'), value: requestTypeEnum.MassTransferRequest},
    {name:this.translate.instant('dashboard.Requests.ModifyIdentityRequest'), value: requestTypeEnum.ModifyIdentityRequest},
    {name:this.translate.instant('dashboard.Requests.BoardCertificateRequest'), value: requestTypeEnum.BoardCertificateRequest},
    {name:this.translate.instant('dashboard.Requests.GradesCertificateRequest'), value: requestTypeEnum.GradesCertificateRequest},

    {name:this.translate.instant('dashboard.Requests.AcademicSequenceCertificateRequest'), value: requestTypeEnum.AcademicSequenceCertificateRequest},
    {name:this.translate.instant('dashboard.Requests.ModifyIdentityRequestCaseStudentNotHaveId'), value: requestTypeEnum.ModifyIdentityRequestCaseStudentNotHaveId},
    {name:this.translate.instant('dashboard.Requests.RegestrationRequestForWithrawan'), value: requestTypeEnum.RegestrationRequestForWithrawan},
    {name:this.translate.instant('dashboard.Requests.WithdrawalRequest'), value: requestTypeEnum.WithdrawalRequest},
    {name:this.translate.instant('dashboard.Requests.RelinkChildToGuardianRequestToScool'), value: requestTypeEnum.RelinkChildToGuardianRequestToScool},
    {name:this.translate.instant('dashboard.Requests.RelinkChildToGuardianRequestToSPEA'), value: requestTypeEnum.RelinkChildToGuardianRequestToSPEA},
  
  ]
    // openResponsesModel = false

    filtration = {...Filtration,RequestStatus: [UserRequestsStatus.Pending], RequestType:null};

    paginationState= {...paginationInitialState};
    // showMyReqs={
    //   prevValue:null,
    //   currentValue:null
    // }

    requests={
      totalAllData:0,
      total:0,
      list:[],
      loading:true
    }

    isMyRequests=  this.route.snapshot.queryParamMap.get('isMyRequests')

    constructor(
      private translate: TranslateService,
      private headerService: HeaderService,
      private systemRequestService: SystemRequestService,
      private exportService: ExportService,
      private sharedService: SharedService,
      private route :ActivatedRoute
    ) { 
    }

    ngOnInit(): void {      
      this.setDashboardHeaderData();
  
      if(this.currentUserScope == UserScope.Guardian) this.getMyRequests()
      if(this.currentUserScope == UserScope.SPEA ) this.getRequests()
      if(this.currentUserScope == UserScope.Employee){
        if(this.isMyRequests) this.getMyRequests()
        else this.getRequests()
      }

      // this.getRequests()
    }

    getRequests(){
      this.sharedService.appliedFilterCount$.next(ArrayOperations.filledObjectItemsCount(this.filtration))
        this.requests.loading=true;
        this.requests.list=[];
        this.systemRequestService.getUserRequests(this.filtration).subscribe((res)=>{
            this.requests.loading = false;
            this.requests.total=res.total;
            this.requests.totalAllData = res.totalAllData;
            this.requests.list=res.data;
          },(err)=>{
            this.requests.loading = false;
            this.requests.total=0
          });
    }

    
    applyFilter(){
      if(this.currentUserScope == UserScope.Guardian) this.getMyRequests()
      if(this.currentUserScope == UserScope.SPEA ) this.getRequests()
      if(this.currentUserScope == UserScope.Employee){
        if(this.isMyRequests) this.getMyRequests()
        else this.getRequests()
      }

    }

    getMyRequests(){
      this.sharedService.appliedFilterCount$.next(ArrayOperations.filledObjectItemsCount(this.filtration))
      this.requests.loading=true;
      this.requests.list=[];
      this.systemRequestService.getMyRequests(this.filtration).subscribe(res=>{
        this.requests.loading = false;
        this.requests.total=res.total;
        this.requests.totalAllData = res.totalAllData;
        this.requests.list=res.data;
      },(err)=>{
        this.requests.loading = false;
        this.requests.total=0

      })
    }

    clearFilter(){
      this.filtration.Page=1
      this.filtration.KeyWord =''
      this.filtration.RequestStatus= null;
      this.filtration.RequestType= null;

      this.applyFilter()
    }
  
  
    sortMe(e){
      if(e.order==1) this.filtration.SortBy= 'old'
      else if(e.order == -1) this.filtration.SortBy= 'update'
      this.filtration.Page=1;
  
      this.applyFilter()
    }


    onExport(fileType: FileEnum){
      
      let filter = {...this.filtration, PageSize:0}
      
      let requestsList$

      if(this.currentUserScope == UserScope.Guardian)  requestsList$ = this.systemRequestService.myReqsToExport(filter)
      if(this.currentUserScope == UserScope.SPEA ) requestsList$ = this.systemRequestService.userRequestsToExport(filter)
      if(this.currentUserScope == UserScope.Employee){
        if(this.isMyRequests)  requestsList$ = this.systemRequestService.myReqsToExport(filter)
        else requestsList$ = this.systemRequestService.userRequestsToExport(filter)
      }

      requestsList$.subscribe( (res: any[]) =>{
        this.exportService.exportFile(fileType, res, this.translate.instant('dashboard.Requests.RequestList'))
      })
    }

    paginationChanged(event: paginationState) {
      this.filtration.Page = event.page;
     this.applyFilter()
      
    }

    setDashboardHeaderData(){

      if(this.currentUserScope==UserScope.Employee){
        let label = this.isMyRequests ? this.translate.instant('dashboard.Requests.myRequests') : this.translate.instant('dashboard.Requests.requestsToMe')
        let link = this.isMyRequests ? '/dashboard/school-management/requests-list/my-requests' : '/dashboard/school-management/requests-list'
        this.componentHeaderData.breadCrump= [{label: label, routerLink: link,queryParams:{isMyRequests:this.isMyRequests} }]
      }
      else if (this.currentUserScope==UserScope.SPEA){
        this.componentHeaderData.breadCrump= [{label: this.translate.instant('dashboard.Requests.RequestList'), routerLink:'/dashboard/performance-managment/RequestList' }]
      }
      else if (this.currentUserScope==UserScope.Guardian){
        this.componentHeaderData.breadCrump= [{label: this.translate.instant('dashboard.myRequest.My requests'), routerLink:'/parent/requests-list' }]
      }

      this.headerService.changeHeaderdata(this.componentHeaderData)
      
    }


  }




