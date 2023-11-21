
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { paginationInitialState } from 'src/app/core/helpers/pagination';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { BaseSearchModel } from 'src/app/core/models/filter-search/base-search-model';
import { FileTypeEnum } from 'src/app/shared/enums/file/file.enum';
import { ExportService } from 'src/app/shared/services/export/export.service';
import { UserInformationService } from '../../service/user-information.service';
import { ArrayOperations } from 'src/app/core/helpers/array';
import { ClaimsEnum } from 'src/app/shared/enums/claims/claims.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { ConfirmModelService } from 'src/app/shared/services/confirm-model/confirm-model.service';



@Component({
  selector: 'app-view-list-of-users',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],

})
export class ViewListOfUsersComponent implements OnInit {
  get ClaimsEnum(){return ClaimsEnum}
  lang = this.translationService.lang

  currentUserId = this.userService.getCurrentUserId()

  filtration = {
    ...BaseSearchModel,
    roleId:[],
    isactive:true,
    ...JSON.parse(this.route.snapshot.queryParams['searchQuery'] || 'null')
  }
  paginationState= {...paginationInitialState}

  roles: any[] = [];
  usersStatus= this.sharedService.usersStatusList;
  users={
	  totalAllData:0,
		total:0,
		list:[],
		loading:true
  }


  constructor(
    private exportService: ExportService,
    private headerService: HeaderService,
    private translate: TranslateService,
    private userInformation: UserInformationService,
    private sharedService: SharedService,
    public translationService: TranslationService,
    private route:ActivatedRoute,
    private userService:UserService,
    private toastr:ToastService,
    private router:Router) {}



  ngOnInit(): void {
    this.getRoleList();


    this.headerService.Header.next(
      {
        'breadCrump': [
          { label: this.translate.instant('UserInformation.List Of Users'), routerLink: '/manager-tools/user-information/users-list' ,routerLinkActiveOptions:{exact: true}},

        ],
      }
    );



  }
  selectedUsersStatus:any;
  getUsersList(){

    if(this.route.snapshot.queryParams['searchQuery']){
      this.filtration = {...JSON.parse(this.route.snapshot.queryParams['searchQuery']), ...this.filtration}
    }
    this.router.navigate([], {
      queryParams: {searchQuery : JSON.stringify(this.filtration)},
      relativeTo: this.route,

    });

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

  paginationChanged(event: paginationState) {
    this.filtration.Page = event.page
    this.filtration.PageSize = event.rows
    this.getUsersList();
  }


  deleteUser(id){
    this.userInformation.deleteUser(id).subscribe(res=>{
      this.toastr.success(this.translate.instant('toasterMessage.deletedSuccessfully'))
      this.getUsersList()
    },err=>{
      this.toastr.error(this.translate.instant('toasterMessage.error'))
      this.getUsersList()
    })
  }


  getRoleList(){

    this.userInformation.GetRoleList().subscribe(response => {
		  this.roles = response;
      this.filtration.roleId=[this.roles.find(role=>role?.code=='Admin')?.id]
      this.getUsersList();
		})
  }

  clearFilter() {
    this.filtration.KeyWord = ''
    this.filtration.roleId = null
    this.filtration.isactive = null
    this.filtration.Page=1;
    this.getUsersList();
  }

  onExport(fileType: FileTypeEnum){
    this.exportService.showLoader$.next(true)
    let filter = {...this.filtration, PageSize:this.users.totalAllData,Page:1}
    this.userInformation.usersToExport(filter).subscribe((res:any) =>{
      this.exportService.exportFile(fileType, res, this.translate.instant('UserInformation.List Of Users'))
    })
  }
  sortMe(e){
    if(e.order==-1)
    {this.filtration.SortBy="ASC"}
    else
    {this.filtration.SortBy="desc"}
    this.filtration.SortColumnName=e.field;
    this.filtration.Page=1;
    this.getUsersList();
  }

}
