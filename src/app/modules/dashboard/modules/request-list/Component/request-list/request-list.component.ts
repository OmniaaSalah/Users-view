import { Component, OnInit,inject } from '@angular/core';
import { Router } from '@angular/router';
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
import {StatusEnum} from 'src/app/shared/enums/status/status.enum'
import { RequestsEnum } from 'src/app/shared/enums/system-requests/requests.enum';


@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.scss']
})
export class RequestListComponent implements OnInit {
  currentUserScope = inject(UserService).getCurrentUserScope()
  get userScope() { return UserScope }
  get statusEnum(){return StatusEnum}
  faEllipsisVertical = faEllipsisVertical

  componentHeaderData: IHeader={ 
		breadCrump: []
	}

  statusOptions=[
    {name:this.translate.instant('dashboard.Requests.Accepted'), value: StatusEnum.Accepted},
    {name:this.translate.instant('dashboard.Requests.rejected'), value: StatusEnum.Rejected},
    {name:this.translate.instant('dashboard.Requests.Pending'), value: StatusEnum.Pending},
    {name:this.translate.instant('dashboard.Requests.returned'), value: StatusEnum.TentativeAccepted},
  ]

  reqsTypes=[
    {name:this.translate.instant('dashboard.Requests.FlexibleHolidayRequest'), value: RequestsEnum.FlexibleHolidayRequest},
    {name:this.translate.instant('dashboard.Requests.StudentRegradingRequest'), value: RequestsEnum.StudentRegradingRequest},
    {name:this.translate.instant('dashboard.Requests.DeleteStudentRequest'), value: RequestsEnum.DeleteStudentRequest},
    {name:this.translate.instant('dashboard.Requests.RegestrationApplicationRequest'), value: RequestsEnum.RegestrationApplicationRequest},
    {name:this.translate.instant('dashboard.Requests.MassTransferRequest'), value: RequestsEnum.MassTransferRequest},
    {name:this.translate.instant('dashboard.Requests.ModifyIdentityRequest'), value: RequestsEnum.ModifyIdentityRequest},
    {name:this.translate.instant('dashboard.Requests.BoardCertificateRequest'), value: RequestsEnum.BoardCertificateRequest},
    {name:this.translate.instant('dashboard.Requests.GradesCertificateRequest'), value: RequestsEnum.GradesCertificateRequest},

    {name:this.translate.instant('dashboard.Requests.AcademicSequenceCertificateRequest'), value: RequestsEnum.AcademicSequenceCertificateRequest},
    {name:this.translate.instant('dashboard.Requests.ModifyIdentityRequestCaseStudentNotHaveId'), value: RequestsEnum.ModifyIdentityRequestCaseStudentNotHaveId},
    {name:this.translate.instant('dashboard.Requests.RegestrationRequestForWithrawan'), value: RequestsEnum.RegestrationRequestForWithrawan},
    {name:this.translate.instant('dashboard.Requests.WithdrawalRequest'), value: RequestsEnum.WithdrawalRequest},
    {name:this.translate.instant('dashboard.Requests.RelinkChildToGuardianRequestToScool'), value: RequestsEnum.RelinkChildToGuardianRequestToScool},
    {name:this.translate.instant('dashboard.Requests.RelinkChildToGuardianRequestToSPEA'), value: RequestsEnum.RelinkChildToGuardianRequestToSPEA},
  
  ]
    // openResponsesModel = false
    filtration = {...Filtration,RequestStatus: ''};
    paginationState= {...paginationInitialState};
    requests={
      totalAllData:0,
      total:0,
      list:[],
      loading:true
    }

    constructor(
      private translate: TranslateService,
      private headerService: HeaderService,
      private systemRequestService: SystemRequestService,
      private exportService: ExportService,
    ) { 
    }

    ngOnInit(): void {      
      this.checkDashboardHeader();
  
      if(this.currentUserScope == UserScope.Guardian) this.getGardianRequests()
      if(this.currentUserScope == UserScope.SPEA || this.currentUserScope == UserScope.Employee) this.getRequests()

      // this.getRequests()
    }

    getRequests(){
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



    getGardianRequests(){
      this.requests.loading=true;
      this.requests.list=[];
      this.systemRequestService.getGardianRequests(this.filtration).subscribe(res=>{
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
      this.filtration.Page=1
      this.filtration.KeyWord =''
      this.filtration.RequestStatus= null;
      this.getRequests();
    }
  
  

    // onExport(fileType: FileEnum){
    //   let filter = {...this.filtration, PageSize:null}
    //   this.userInformation.usersToExport(filter).subscribe((res:any) =>{      
    //     this.exportService.exportFile(fileType, res, this.translate.instant('dashboard.UserInformation.List Of Users'))
    //   })
    // }
  
    sortMe(e)
    {
      if(e.order==-1)
      {this.filtration.SortBy="update "+e.field;}
      else
      {this.filtration.SortBy="old "+e.field;}
  
      this.getRequests();
    }

    paginationChanged(event: paginationState) {
      this.filtration.Page = event.page;
      this.getRequests();
    }

    checkDashboardHeader()
    {
        if(this.currentUserScope==UserScope.Employee)
      {
     
      this.componentHeaderData.breadCrump= [
          {label: this.translate.instant('dashboard.Requests.RequestList'), routerLink:'/dashboard/performance-managment/RequestList' }
        ]
     
    
      }
      else if (this.currentUserScope==UserScope.SPEA)
      {
      this.componentHeaderData.breadCrump= [
          {label: this.translate.instant('dashboard.Requests.RequestList'), routerLink:'/dashboard/performance-managment/RequestList' }
        ]
      
      }
      
      else if (this.currentUserScope==UserScope.Guardian)
      {
      this.componentHeaderData.breadCrump= [
          {label: this.translate.instant('dashboard.myRequest.My requests'), routerLink:'/parent/requests-list' }
        ]
    
      }
      this.headerService.changeHeaderdata(this.componentHeaderData)
      
    }


  }




