import { Component, OnInit,OnDestroy,inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { Table } from 'primeng/table';
import {ConfirmationService, MessageService} from 'primeng/api';
import { Filtration } from 'src/app/core/classes/filtration';
import { paginationInitialState } from 'src/app/core/classes/pagination';
import { TranslateService } from '@ngx-translate/core';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { ExportService } from 'src/app/shared/services/export/export.service';
import { FileTypeEnum } from 'src/app/shared/enums/file/file.enum';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import {UserRolesService } from '../../service/user-roles.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { ConfirmModelService } from 'src/app/shared/services/confirm-model/confirm-model.service';
import { Subscription } from 'rxjs';
import { ArrayOperations } from 'src/app/core/classes/array';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { StatusEnum } from 'src/app/shared/enums/status/status.enum';
import { ClaimsEnum } from 'src/app/shared/enums/claims/claims.enum';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { MenuItem } from 'src/app/core/models/dropdown/menu-item';

@Component({
  selector: 'app-user-roles',
  templateUrl: './userroles-list.component.html',
  styleUrls: ['./userroles-list.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class UserRolesListComponent implements OnInit,OnDestroy {
  lang = inject(TranslationService).lang
  faEllipsisVertical = faEllipsisVertical;
  userListForSpecificRole:string[]=[];
  showLoader:boolean=false;
  displayUserList: boolean;
  roleStatusList;
  get statusEnum () {return StatusEnum}
  get ClaimsEnum(){return ClaimsEnum}
  selectedRole;
  subscription:Subscription;

  filtration = {
    ...Filtration,
    isactive:'',
    ...JSON.parse(this.route.snapshot.queryParams['searchQuery'] || 'null')
  };
  paginationState= {...paginationInitialState};

  roles={
    totalAllData:0,
    total:0,
    list:[],
    loading:true
  }
  items: MenuItem[]=[
    {label: this.translate.instant('shared.Show Details'), icon:'assets/images/shared/file.svg'},
    {label: this.translate.instant('dashboard.UserRole.Delete Job Role'), icon:'assets/images/shared/delete.svg'}
  ]
  constructor(
    private exportService: ExportService,
    private sharedService:SharedService,
    public confirmModelService: ConfirmModelService,
    private toastService: ToastService,
    private headerService: HeaderService,
    private userRolesService: UserRolesService,
    private translate: TranslateService,
    private router: Router,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.showLoader=true;
    this.confirmDeleteListener();
    this.getAllRole();
    this.headerService.Header.next(
      {
        'breadCrump': [
          { label: this.translate.instant('dashboard.UserRole.List Of Job Roles'),routerLink:'/manager-tools/user-roles/user-roles-list'}],
      }
    );

    this.roleStatusList = this.userRolesService.roleStatusList;

  }
  confirmDeleteListener(){
    this.subscription=this.confirmModelService.confirmed$.subscribe(val => {
      if (val) this.deleteRole(this.selectedRole)

    })
  }


  deleteRole(role)
  {


        this.userRolesService.deleteRole(role.id).subscribe((res)=>{
          if(res.statusCode!="OK")
          {
            this.toastService.error(res.errorLocalized[this.lang]);
          }
          else
            {
              this.getAllRole();
              this.toastService.success(this.translate.instant('dashboard.UserRole.Job Role deleted Successfully'));
            }

          this.confirmModelService.confirmed$.next(null);
          },(err)=>{

            this.getAllRole();
            this.toastService.error(this.translate.instant('dashboard.UserRole.error,please try again'));
            this.confirmModelService.confirmed$.next(null);

          });

 }

  getAllRole()
  {

    if(this.route.snapshot.queryParams['searchQuery']){
      this.filtration = {...JSON.parse(this.route.snapshot.queryParams['searchQuery']), ...this.filtration}
    }
    this.router.navigate([], {
      queryParams: {searchQuery : JSON.stringify(this.filtration)},
      relativeTo: this.route,
    });

    this.sharedService.appliedFilterCount$.next(ArrayOperations.filledObjectItemsCount(this.filtration));
    this.roles.loading=true;
    this.roles.list=[];
    this.userRolesService.getAllRoles(this.filtration).subscribe((res)=>{
      this.sharedService.filterLoading.next(false);
      this.roles.loading = false;
      this.roles.total=res.total;
      this.roles.totalAllData = res.totalAllData;
      this.roles.list=res.data;

      },(err)=>{this.roles.loading = false;
        this.roles.total=0
        this.sharedService.filterLoading.next(false);
      });

  }
  clearFilter(){

    this.filtration.KeyWord =''
    this.filtration.isactive= null;
    this.filtration.Page=1;
    this.getAllRole();
  }
  sortMe(e)
  {
    if(e.order==-1)
    {this.filtration.SortBy="ASC"}
    else
    {this.filtration.SortBy="desc"}
    this.filtration.SortColumnName=e.field;
    this.filtration.Page=1;
    this.getAllRole();
  }


  onExport(fileType: FileTypeEnum, table:Table){
    let filter = {...this.filtration,PageSize:this.roles.totalAllData,Page:1}
    this.userRolesService.rolesToExport(filter).subscribe( (res) =>{

      this.exportService.exportFile(fileType, res, this.translate.instant('dashboard.UserRole.List Of Job Roles'))
    })
  }


  paginationChanged(event: paginationState) {
    this.filtration.Page = event.page;
    this.getAllRole();

  }
  showUserList(roleId:number) {

    this.showLoader=true;
    this.userRolesService.getRoleByID(roleId).subscribe((res)=>{
      this.showLoader=false;
      this.userListForSpecificRole=res.users;
    });
     this.displayUserList = true;
}
dropdownItemClicked(index,role){
  if(index == 0)
   {
    this.router.navigate([`/manager-tools/user-roles/role-details/${role.id}`]);
  }
  if(index == 1)
   {
    this.confirmModelService.openModel();  this.selectedRole=role;
  }
}

ngOnDestroy(): void {
  this.subscription.unsubscribe();
}



}
