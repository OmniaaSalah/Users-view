import { Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseSearchModel } from 'src/app/core/models/filter-search/base-search-model';
import { paginationInitialState } from 'src/app/core/helpers/pagination';
import { UserService } from 'src/app/core/services/user/user.service';
import { UserRequestsStatus } from 'src/app/shared/enums/status/status.enum';
import { UserScope } from 'src/app/shared/enums/user/user.enum';
import { SystemRequestService } from '../../../request-list/services/system-request.service';
import { StudentService } from 'src/app/modules/shared/services/register-child/register-child.service';
import { SharedService } from 'src/app/shared/services/shared/shared.service';

@Component({
  selector: 'app-child-requests',
  templateUrl: './child-requests.component.html',
  styleUrls: ['./child-requests.component.scss']
})
export class ChildRequestsComponent implements OnInit {
  @Input() requestsOwner : 'Child' | 'Student'
  currentUserScope = inject(UserService).getScope()
  get userScope() { return UserScope }
  get requestStatusEnum(){return UserRequestsStatus}

  childId = +this._route.snapshot.paramMap.get('childId');
  studentId

  filtration = {...BaseSearchModel,RequestStatus: [], RequestType:[]};
  paginationState= {...paginationInitialState};


  requests={
    totalAllData:0,
    total:0,
    list:[],
    loading:true
  }

  statusOptions = []
  reqsTypes = []

  constructor(
    private _route: ActivatedRoute,
    private systemRequestService: SystemRequestService,
    private router:Router,
    private StudentService:StudentService,
    private sharedService:SharedService
  ) { }

  ngOnInit(): void {
    this.statusOptions=this.systemRequestService.getStatusOptions()
    this.reqsTypes= this.systemRequestService.getReqsTypes()

    this.StudentService.Student$.subscribe(student => this.studentId = student?.id)

    this.getRequestsList()
  }

  getRequestsList(){
    this.requestsOwner =='Child' ? this.getChildRequests() :  this.getStudentRequests()

  }


  getChildRequests(){
    this.requests.loading=true;
    this.requests.list=[];
    let filter = {...this.filtration, RequestStatus: this.filtration.RequestStatus?.flat(), RequestType:this.filtration?.RequestType?.flat()}

    this.systemRequestService.getChildRequests(this.childId,filter ).subscribe((res)=>{
        this.requests.loading = false;
        this.requests.total=res.total;
        this.requests.totalAllData = res.totalAllData;
        this.requests.list=res.data;
        this.sharedService.filterLoading.next(false);
      },(err)=>{
        this.requests.loading = false;
        this.requests.total=0
        this.sharedService.filterLoading.next(false);
      });
  }

  getStudentRequests(){
    this.requests.loading=true;
    this.requests.list=[];
    let filter = {...this.filtration, RequestStatus: this.filtration.RequestStatus?.flat(), RequestType:this.filtration?.RequestType?.flat()}

    this.systemRequestService.getStudentRequests(this.studentId,filter ).subscribe((res)=>{
        this.requests.loading = false;
        this.requests.total=res.total;
        this.requests.totalAllData = res.totalAllData;
        this.requests.list=res.data;
        this.sharedService.filterLoading.next(false);
      },(err)=>{
        this.requests.loading = false;
        this.requests.total=0
        this.sharedService.filterLoading.next(false);
      });
  }

  clearFilter(){
    this.filtration.Page=1
    this.filtration.KeyWord =''
    this.filtration.RequestStatus= [];
    this.filtration.RequestType= [];
    this.getRequestsList()
  }

  navigateTo(id){
    if(this.currentUserScope==this.userScope.Guardian) this.router.navigateByUrl(`/requests-list/details/${id}`)
    else this.router.navigateByUrl(`/performance-managment/RequestList/details/${id}`)
  }


}
