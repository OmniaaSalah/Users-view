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

@Component({
  selector: 'app-users-reports',
  templateUrl: './users-reports.component.html',
  styleUrls: ['./users-reports.component.scss']
})
export class UsersReportsComponent implements OnInit {

 
  filtration = {
    ...Filtration, 
    rolesId: [],
    DateFrom:null,
    DateTo:null
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
     private _report:UsersReportsService
   ) {
    this.tableColumns = this._report.tabelColumns
   }


  ngOnInit(): void {
    this.headerService.Header.next(
      {
        'breadCrump': [
          { label: this.translate.instant('dashboard.reports.generateEmployeesReport'), routerLink: '/dashboard/reports-managment/users-reports' ,routerLinkActiveOptions:{exact: true}},
        ],
      }
    );
    this.getUsersList();
    this.getRolesList();
    this.filterationForm = this.formbuilder.group({
      DateFrom: '',
      DateTo: '',
    });


    this.filterationForm.get('DateFrom').valueChanges.subscribe(res => {
      this.filterationForm.value.DateFrom = new Date(res[0]).toISOString()
      this.filtration.DateFrom = this.filterationForm.value.DateFrom
      if (res[1]) {
        this.filterationForm.value.DateTo = new Date(res[1]).toISOString()
        this.filtration.DateTo = this.filterationForm.value.DateTo
      }
    })
  }

  getUsersList(){
    this.isSkeletonVisible = true;
    this.users.loading=true
    this.users.list =[];
    this.userInformation.getUsersList(this.filtration).subscribe(response => {
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
    this.filtration.rolesId = null
    this.filtration.DateFrom = null
    this.filtration.DateTo = null
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

  checkVlaueOfSelect(event){
    this.filtration.rolesId = event.value
  }


}
