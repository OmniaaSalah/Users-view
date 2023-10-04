import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseSearchModel } from 'src/app/core/models/filter-search/base-search-model';
import { paginationInitialState } from 'src/app/core/helpers/pagination';
import { UserService } from 'src/app/core/services/user/user.service';
import { UserRequestsStatus } from 'src/app/shared/enums/status/status.enum';
import { UserScope } from 'src/app/shared/enums/user/user.enum';
import { SystemRequestService } from '../../../../request-list/services/system-request.service';

@Component({
  selector: 'app-child-requests',
  templateUrl: './child-requests.component.html',
  styleUrls: ['./child-requests.component.scss']
})
export class ChildRequestsComponent implements OnInit {
  currentUserScope = inject(UserService).getScope()
  get userScope() { return UserScope }
  get requestStatusEnum(){return UserRequestsStatus}

  childId = +this._route.snapshot.paramMap.get('childId');


  filtration = {...BaseSearchModel,RequestStatus: '', RequestType:''};
  paginationState= {...paginationInitialState};


  requests={
    totalAllData:0,
    total:0,
    list:[],
    loading:true
  }

  constructor(
    private _route: ActivatedRoute,
    private systemRequestService: SystemRequestService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.getChildRequests()
  }


  getChildRequests(){
    this.requests.loading=true;
    this.requests.list=[];
    this.systemRequestService.getChildRequests(this.childId,this.filtration, ).subscribe((res)=>{
        this.requests.loading = false;
        this.requests.total=res.total;
        this.requests.totalAllData = res.totalAllData;
        this.requests.list=res.data;
      },(err)=>{
        this.requests.loading = false;
        this.requests.total=0
      });
  }

  navigateTo(id){
    if(this.currentUserScope==this.userScope.Guardian) this.router.navigateByUrl(`/parent/requests-list/details/${id}`)
    else this.router.navigateByUrl(`/performance-managment/RequestList/details/${id}`)
  }


}
