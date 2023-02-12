import { Component, Input, OnInit ,inject} from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IUser } from 'src/app/core/Models/iuser';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';


import { FormBuilder } from '@angular/forms';

import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { IRole } from 'src/app/core/Models/IRole';
import { IAccount } from 'src/app/core/Models/IAccount';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { paginationInitialState } from 'src/app/core/classes/pagination';
import { UserService } from 'src/app/core/services/user/user.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { Filtration } from 'src/app/core/classes/filtration';
import { Filter } from 'src/app/core/models/filter/filter';
import { FileEnum } from 'src/app/shared/enums/file/file.enum';
import { Table } from 'primeng/table';
import { ExportService } from 'src/app/shared/services/export/export.service';
import { filter } from 'rxjs';
import { UserInformationService } from '../../service/user-information.service';
import { ArrayOperations } from 'src/app/core/classes/array';



@Component({
  selector: 'app-view-list-of-users',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class ViewListOfUsersComponent implements OnInit {
  lang = inject(TranslationService).lang
  filtration :Filter = {...Filtration, roleId: '',isactive:null}
  selectedRole:any
  paginationState= {...paginationInitialState}
  roles: any[] = [];
  isLoaded = false;
  usersList: IUser[] = [];
  faEllipsisVertical = faEllipsisVertical;
  cities: string[];
  @Input('filterFormControls') formControls:string[] =[]
  
  usersStatus= this.userInformation.usersStatusList;

  users={
	totalAllData:0,
		total:0,
		list:[],
		loading:true
  }

  filterForm
  isSkeletonVisible = true;
  constructor(    private exportService: ExportService,
    private headerService: HeaderService, private translate: TranslateService,
     private router: Router, private userInformation: UserInformationService,private fb:FormBuilder,private sharedService: SharedService,
    public translationService: TranslationService) {}
  users_List: IAccount[] = [];


  ngOnInit(): void {
    this.getRoleList();
    this.initForm();

    this.headerService.Header.next(
      {
        'breadCrump': [
          { label: this.translate.instant('dashboard.UserInformation.List Of Users'), routerLink: '/dashboard/manager-tools/user-information/users-list' ,routerLinkActiveOptions:{exact: true}},
          // { label: this.translate.instant('dashboard.UserInformation.List Of Users') }
        ],
      }
    );
    // this.cities = this.userInformation.cities;
    this.getUsersList();

  }
  selectedUsersStatus:any;
  getUsersList(){
    this.sharedService.appliedFilterCount$.next(ArrayOperations.filledObjectItemsCount(this.filtration))
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
  onTableDataChange(event: paginationState) {
    this.filtration.Page = event.page;
    this.getUsersList();

  }

  initForm(){
    this.filterForm= this.fb.group(()=>{
      let formGroup={}
      this.formControls.forEach(item =>{

        formGroup[item] =[]
      })
      return formGroup
    })


  }


  getRoleList(){

    this.userInformation.GetRoleList().subscribe(response => {
		  this.roles = response;
		})
  }
  listOfRoles : IRole[] = [];
  selectedItems:IRole;
  listOfName : Array<string> ;
  onChange(event: any ) {
    this.selectedRole = event.value;
}
  clearFilter() {
    this.filtration.KeyWord = ''
    this.filtration.roleId = null
    this.filtration.isactive = null
    this.filtration.Page=1;
    this.getUsersList();
  }

  onExport(fileType: FileEnum){
    let filter = {...this.filtration, PageSize:null}
    this.userInformation.usersToExport(filter).subscribe((res:any) =>{      
      this.exportService.exportFile(fileType, res, this.translate.instant('dashboard.UserInformation.List Of Users'))
    })
  }
  sortMe(e)
  {
    
   
    if(e.order==-1)
    {this.filtration.SortBy="update "+e.field;}
    else
    {this.filtration.SortBy="old "+e.field;}
    this.filtration.Page=1;
    this.getUsersList();
  }

}
