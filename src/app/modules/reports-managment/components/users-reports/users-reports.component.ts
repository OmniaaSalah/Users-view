import { Component, OnInit ,inject} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { paginationInitialState } from 'src/app/core/helpers/pagination';
import { BaseSearchModel } from 'src/app/core/models/filter-search/base-search-model';
import { FileTypeEnum } from 'src/app/shared/enums/file/file.enum';
import { ExportService } from 'src/app/shared/services/export/export.service';
import { UserInformationService } from '../../../user-information/service/user-information.service';
import { UsersReportsService } from '../../services/users/users-reports.service';
import { Table } from 'primeng/table';
import { SystemRequestService } from '../../../request-list/services/system-request.service';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { faAngleLeft, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-users-reports',
  templateUrl: './users-reports.component.html',
  styleUrls: ['./users-reports.component.scss']
})
export class UsersReportsComponent implements OnInit {
  allRequestsNumbers;
  shownTable:boolean=false;
  isBtnLoading:boolean=false;
  isCollapsed=true;
  faAngleLeft = faAngleLeft
  faAngleDown = faAngleDown
  requestsNumbersBasedOnRequestType;
  lang = inject(TranslationService).lang
  requestTypes:any[]=[]
  date;
  requestsList=[];
  filtration = {
    ...BaseSearchModel,
    roleIds: [],
    dateFrom:null,
    dateTo:null,
    requestType:null,
    ...JSON.parse(this.route.snapshot.queryParams['searchQuery'] || 'null')
  }

  paginationState= {...paginationInitialState}
  faEllipsisVertical = faEllipsisVertical;

  users={
	totalAllData:0,
		total:0,
		list:[],
		loading:true
  }
  roles = []
  tableColumns = []

  constructor(
    private toastr:ToastrService,
     private exportService: ExportService,
    private headerService: HeaderService,
    private translate: TranslateService,
     private userInformation: UserInformationService,
     private _report:UsersReportsService,
     private requestService:SystemRequestService,
     private sharedService:SharedService,
     private route:ActivatedRoute,
     private router:Router
   ) {
    this.tableColumns = this._report.tabelColumns
   }


  ngOnInit(): void {
    this.requestsList=this.requestService.getReqsTypes();

    this.headerService.Header.next(
      {
        'breadCrump': [
          { label: this.translate.instant('reports.generateEmployeesReport'), routerLink: '/reports-managment/users-reports' ,routerLinkActiveOptions:{exact: true}},
        ],
      }
    );
    this.getUsersList();
    this.getRolesList();



  }

  getUsersList(){
    if(this.date){
      this.filtration.dateFrom=this.formateDate(this.date[0])
      this.filtration.dateTo=this.formateDate(this.date[1])
    }

    if(this.filtration.dateFrom || this.filtration.dateTo){
      this.date=[new Date(this.filtration.dateFrom), new Date(this.filtration.dateTo)]
    }

    if(this.route.snapshot.queryParams['searchQuery']){
      this.filtration = {...JSON.parse(this.route.snapshot.queryParams['searchQuery']), ...this.filtration}
    }
    this.router.navigate([], {
      queryParams: {searchQuery : JSON.stringify(this.filtration)},
      relativeTo: this.route,

    });

    this.users.loading=true
    this.isBtnLoading=true;
    this.users.list =[];
    this._report.getAllEmployees({...this.filtration, requestType: this.filtration.requestType?.flat()}).subscribe(res => {
      this.sharedService.filterLoading.next(false);
      this.allRequestsNumbers=res.result?.rquestTotalNumber;
      this.requestsNumbersBasedOnRequestType=res.result?.rquestNumberByRequestType;

      this.requestTypes=this.getMappedModel(res.result?.countPerReuestTypes)
      this.users.list = res.result.employeesPerformance.data;
      this.users.totalAllData = res.result.employeesPerformance.totalAllData
      this.users.total =res.result.employeesPerformance.total;
      this.users.loading = false;
      this.shownTable=true;
      this.isBtnLoading=false;
    },err=> {
      this.isBtnLoading=false;
      this.users.loading=false
      this.users.total=0;
      this.sharedService.filterLoading.next(false);
    })
  }


  getMappedModel(model:any[]){
    let count=0
    let arr = []
    model.forEach(item =>{
      if(item?.requestType=='RegestrationApplicationRequest' || item?.requestType=='RegestrationRequestForWithrawan'){
        count += item?.count
      }else {
        arr.push(item)
      }
    });

    arr.unshift({requestType:'RegestrationApplicationRequest', count:count})
    return arr
  }
  getRolesList(){
    this.userInformation.GetRoleList().subscribe(res=>
      this.roles = res.filter(el => el.code!='Guardian')

    )}

  onTableDataChange(event: paginationState) {
    this.filtration.Page = event.page;
    this.getUsersList();

  }
  onSort(e) {
    this.filtration.SortColumnName=e.field
    if(e.order==1) this.filtration.SortBy= 'Asc'
    else if(e.order == -1) this.filtration.SortBy= 'Desc'
    this.filtration.Page=1;
    this.getUsersList();
  }

  clearFilter() {
    this.filtration.KeyWord = ''
    this.filtration.roleIds = null
    this.filtration.dateFrom = null
    this.filtration.dateTo = null
    this.filtration.requestType = null
    this.date='';
    this.filtration.Page=1;
    this.filtration.SortColumnName=''
    this.getUsersList();
  }

  onExport(fileType: FileTypeEnum, table: Table) {
    this.exportService.showLoader$.next(true)
    let filter = {...this.filtration, PageSize:this.users.total,Page:1}
    this._report.employeesToExport(filter).subscribe( (res) =>{

      this.exportService.exportFile(fileType, res, this.translate.instant('sideBar.reportsManagment.chidren.EmployeesReport'))
    })

  }


  formateDate(date :Date)
  {
    let d = new Date(date.setHours(date.getHours() - (date.getTimezoneOffset()/60) )).toISOString()
    return d.split('.')[0]
  }

  checkAvalibility()
  {
    if(this.date)
    {
      this.filtration.Page=1;
      this.getUsersList()
    }
    else
    {
      this.toastr.warning(this.translate.instant('reports.you should choose the Date that you need view Employee Performance During It'));
    }
  }
}
