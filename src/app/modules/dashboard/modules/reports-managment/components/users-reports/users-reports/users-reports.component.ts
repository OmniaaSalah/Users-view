import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup } from '@angular/forms';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { paginationInitialState } from 'src/app/core/classes/pagination';
import { Filtration } from 'src/app/core/classes/filtration';
import { FileEnum } from 'src/app/shared/enums/file/file.enum';
import { ExportService } from 'src/app/shared/services/export/export.service';
import { UserInformationService } from '../../../../user-information/service/user-information.service';
import { UsersReportsService } from '../../../services/users/users-reports.service';
import { Table } from 'primeng/table';
import { SystemRequestService } from '../../../../request-list/services/system-request.service';

@Component({
  selector: 'app-users-reports',
  templateUrl: './users-reports.component.html',
  styleUrls: ['./users-reports.component.scss']
})
export class UsersReportsComponent implements OnInit {
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
  filterationForm: FormGroup

  users={
	totalAllData:0,
		total:0,
		list:[],
		loading:true
  }
  roles = []
  tableColumns = []
  isSkeletonVisible = true;

  constructor(   
     private exportService: ExportService,
    private headerService: HeaderService, 
    private translate: TranslateService,
     private userInformation: UserInformationService,
     private formbuilder: FormBuilder,
     private _report:UsersReportsService,
     private requestService:SystemRequestService
   ) {
    this.tableColumns = this._report.tabelColumns
   }


  ngOnInit(): void {
    this.requestsList=this.requestService.requestList;
    this.headerService.Header.next(
      {
        'breadCrump': [
          { label: this.translate.instant('dashboard.reports.generateEmployeesReport'), routerLink: '/dashboard/reports-managment/users-reports' ,routerLinkActiveOptions:{exact: true}},
        ],
      }
    );
    this.getUsersList();
    this.getRolesList();
 

   
  }

  getUsersList(){
    if(this.date)
    { 
      this.filtration.RegisterationStartDate=this.formateDate(this.date[0])
      this.filtration.RegisterationEndDate=this.formateDate(this.date[1])
    }
    var body={
      keyword: this.filtration.KeyWord,
      "sortBy": this.filtration.SortBy,
      "page": this.filtration.Page,
      "pageSize": this.filtration.PageSize,
      "roleIds": this.filtration.roleIds,
      "dateFrom": this.filtration.dateFrom,
      "dateTo": this.filtration.dateTo,
      "requestType": 1
    }
    
    
    this.users.loading=true
    this.users.list =[];
    this._report.getAllEmployees(body).subscribe(response => {
      this.users.list = [...response?.data];
      this.users.totalAllData = response.totalAllData
      this.users.total =response.total;
      this.users.loading = false;
    },err=> {
      this.users.loading=false
      this.users.total=0;
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

  clearFilter() {
    this.filterationForm.reset()
    this.filtration.KeyWord = ''
    this.filtration.roleIds = null
    this.filtration.dateFrom = null
    this.filtration.dateTo = null
    this.filtration.requestType = null
    this.getUsersList();
  }

  onExport(fileType: FileEnum, table: Table) {
    let filter = {...this.filtration, PageSize:null}
    this.userInformation.getUsersList(filter).subscribe( (res:any[]) =>{
      
      this.users.list = res['data']
      
      let exportedTable = []
    const myColumns = this.tableColumns.filter(el => el.isSelected)
    this.users.list.forEach((el, index) => {
      let myObject = {}

      for (const property in el) {
        const filterColumn = myColumns.filter(column => column.key == property)
        const filteredObject = filterColumn && filterColumn.length ? filterColumn[0]['name'] : {}
        if(localStorage.getItem('preferredLanguage') == 'ar'){
          if(filteredObject && filteredObject.ar){
           myObject = { ...myObject, [filteredObject.ar]: el[property]?.ar || el[property] };
        }
        }
          if(localStorage.getItem('preferredLanguage') == 'en'){
          if(filteredObject && filteredObject.en){
           myObject = { ...myObject, [filteredObject.en]: el[property]?.en || el[property] };
        }
        }
        
      }
      exportedTable.push(
        myObject
      )
    })

    this.exportService.exportFile(fileType,exportedTable, '')
    })
    this.getUsersList()
    
  }


  formateDate(date :Date)
  {
    let d = new Date(date.setHours(date.getHours() - (date.getTimezoneOffset()/60) )).toISOString() 
    return d.split('.')[0]
  }

}
