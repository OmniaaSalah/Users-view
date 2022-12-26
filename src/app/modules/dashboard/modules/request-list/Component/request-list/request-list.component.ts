import { Component, OnInit,inject } from '@angular/core';
import { Router } from '@angular/router';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { Filtration } from 'src/app/core/classes/filtration';
import { paginationInitialState } from 'src/app/core/classes/pagination';
import { IHeader } from 'src/app/core/Models';

import { ISurvey } from 'src/app/core/Models/ISurvey';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { FileEnum } from 'src/app/shared/enums/file/file.enum';
import { UserScope } from 'src/app/shared/enums/user/user.enum';
import { ExportService } from 'src/app/shared/services/export/export.service';
import { ParentRequestService } from '../../services/parent-request.service';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.scss']
})
export class RequestListComponent implements OnInit {
  currentUserScope = inject(UserService).getCurrentUserScope()
  faEllipsisVertical = faEllipsisVertical
  surveyList: ISurvey[] = [];
  componentHeaderData: IHeader={ 
		breadCrump: []
	}

    // openResponsesModel = false
    filtration = {...Filtration,evaluation: ''};
    paginationState= {...paginationInitialState};
    requests={
      totalAllData:0,
      total:0,
      list:[],
      loading:true
    }
  
    // first = 0
    // rows = 6

    constructor(
      private translate: TranslateService,
      private headerService: HeaderService,
      private parentService: ParentRequestService,
      private exportService: ExportService,
      private router:Router
    ) { 
    }

    ngOnInit(): void {
      this.checkDashboardHeader();
      this.headerService.changeHeaderdata(this.componentHeaderData)
      this.getRequests()
    }

    getRequests(){
        this.requests.loading=true;
        this.requests.list=[];
        this.parentService.getRequests(this.filtration).subscribe((res)=>{
            this.requests.loading = false;
            this.requests.total=res.total;
            this.requests.totalAllData = res.totalAllData;
            this.requests.list=res.data;
          },(err)=>{
            this.requests.loading = false;
            this.requests.total=0
          });
    }


    // openResponsesModal() {
    //   this.openResponsesModel = true
    // }

    // paginationChanged(event: paginationState) {
    //   console.log(event);
    //   // this.first = event.first
    //   // this.rows = event.rows
    // }

    clearFilter(){
      this.filtration.KeyWord =''
      this.filtration.evaluation= null;
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
          {label: this.translate.instant('dashboard.myRequest.My requests'), routerLink:'/dashboard/performance-managment/RequestList' }
        ]
    
      }
      
    }
    get userScope() 
    { 
      return UserScope 
    }

    routeToDetails(requestId){
      this.router.navigate([`/dashboard/performance-managment/RequestList/Requestdetails/${requestId}`])
    }

  }




