import { Component, OnInit ,inject} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { paginationInitialState } from 'src/app/core/classes/pagination';
import { Filtration } from 'src/app/core/classes/filtration';
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
  requestTypes=[]
  date;
  requestsList=[];
  filtration = {
    ...Filtration,
    roleIds: [],
    dateFrom:null,
    dateTo:null,
    requestType:null
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
     private sharedService:SharedService
   ) {
    this.tableColumns = this._report.tabelColumns
   }


  ngOnInit(): void {
    this.requestsList=this.requestService.requestList;
    this.headerService.Header.next(
      {
        'breadCrump': [
          { label: this.translate.instant('dashboard.reports.generateEmployeesReport'), routerLink: '/reports-managment/users-reports' ,routerLinkActiveOptions:{exact: true}},
        ],
      }
    );
    this.getUsersList();
    this.getRolesList();



  }

  getUsersList(){
    if(this.date)
    {
      this.filtration.dateFrom=this.formateDate(this.date[0])
      this.filtration.dateTo=this.formateDate(this.date[1])
    }
console.log(this.filtration.dateFrom,this.filtration.dateTo)
    this.users.loading=true
    this.isBtnLoading=true;
    this.users.list =[];
    this._report.getAllEmployees(this.filtration).subscribe(res => {
      this.sharedService.filterLoading.next(false);
      this.allRequestsNumbers=res.result?.rquestTotalNumber;
      this.requestsNumbersBasedOnRequestType=res.result?.rquestNumberByRequestType;
      this.requestTypes=res.result?.countPerReuestTypes;
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

  getRolesList(){
    this.userInformation.GetRoleList().subscribe(res=>
      this.roles = res

    )}

  onTableDataChange(event: paginationState) {
    this.filtration.Page = event.page;
    this.getUsersList();

  }
  onSort(e) {
    console.log(e);
    if (e.order == 1) this.filtration.SortBy = 'old'
    else if (e.order == -1) this.filtration.SortBy = 'update'
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
    this.getUsersList();
  }

  onExport(fileType: FileTypeEnum, table: Table) {
    let filter = {...this.filtration, PageSize:this.users.totalAllData,Page:1}
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
      this.toastr.warning(this.translate.instant('dashboard.reports.you should choose the Date that you need view Employee Performance During It'));
    }
  }
}
