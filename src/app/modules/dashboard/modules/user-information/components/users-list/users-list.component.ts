
import { Component, inject, Input, OnInit } from '@angular/core';
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
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { Filtration } from 'src/app/core/classes/filtration';
import { FileEnum } from 'src/app/shared/enums/file/file.enum';
import { ExportService } from 'src/app/shared/services/export/export.service';
import { UserInformationService } from '../../service/user-information.service';
import { ArrayOperations } from 'src/app/core/classes/array';
import { ClaimsEnum } from 'src/app/shared/enums/claims/claims.enum';



@Component({
  selector: 'app-view-list-of-users',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class ViewListOfUsersComponent implements OnInit {
  get ClaimsEnum(){return ClaimsEnum}
  lang = this.translationService.lang
  filtration = {...Filtration, roleId: [1],isactive:true}
  paginationState= {...paginationInitialState}
  roles: any[] = [];
  usersStatus= this.userInformation.usersStatusList;
  users={
	  totalAllData:0,
		total:0,
		list:[],
		loading:true
  }


  constructor(    private exportService: ExportService,
    private headerService: HeaderService, private translate: TranslateService,
    private userInformation: UserInformationService,private sharedService: SharedService,
    public translationService: TranslationService) {}



  ngOnInit(): void {
    this.getRoleList();
 

    this.headerService.Header.next(
      {
        'breadCrump': [
          { label: this.translate.instant('dashboard.UserInformation.List Of Users'), routerLink: '/dashboard/manager-tools/user-information/users-list' ,routerLinkActiveOptions:{exact: true}},
        
        ],
      }
    );
  
    this.getUsersList();

  }
  selectedUsersStatus:any;
  getUsersList(){
    this.sharedService.appliedFilterCount$.next(ArrayOperations.filledObjectItemsCount(this.filtration))
    this.users.loading=true
    this.users.list =[];
    this.userInformation.getUsersList(this.filtration).subscribe(response => {
      this.sharedService.filterLoading.next(false);
      this.users.list = [...response?.data];
      this.users.totalAllData = response.totalAllData
      this.users.total =response.total;
      this.users.loading = false;
      this.sharedService.filterLoading.next(false);
   

    },err=> {
      this.users.loading=false
      this.users.total=0;
    })
  }
  onTableDataChange(event: paginationState) {
    this.filtration.Page = event.page;
    this.getUsersList();

  }




  getRoleList(){

    this.userInformation.GetRoleList().subscribe(response => {
		  this.roles = response;
		})
  }

  clearFilter() {
    this.filtration.KeyWord = ''
    this.filtration.roleId = null
    this.filtration.isactive = null
    this.filtration.Page=1;
    this.getUsersList();
  }

  onExport(fileType: FileEnum){
    let filter = {...this.filtration, PageSize:this.users.totalAllData}
    this.userInformation.usersToExport(filter).subscribe((res:any) =>{      
      this.exportService.exportFile(fileType, res, this.translate.instant('dashboard.UserInformation.List Of Users'))
    })
  }
  sortMe(e){   
    if(e.order==-1)
    {this.filtration.SortBy="update "+e.field;}
    else
    {this.filtration.SortBy="old "+e.field;}
    this.filtration.Page=1;
    this.getUsersList();
  }

}
