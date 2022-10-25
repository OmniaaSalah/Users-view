import { Component, OnInit,OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { faEllipsisVertical,faClose } from '@fortawesome/free-solid-svg-icons';
import { Table } from 'primeng/table';
import {ConfirmationService, MessageService} from 'primeng/api';
import { Filtration } from 'src/app/core/classes/filtration';
import { paginationInitialState } from 'src/app/core/classes/pagination';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { TranslateService } from '@ngx-translate/core';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { ExportService } from 'src/app/shared/services/export/export.service';
import { FileEnum } from 'src/app/shared/enums/file/file.enum';
import { IUserRoles } from 'src/app/core/Models/iuser-role';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import {UserRolesService } from '../../service/user-roles.service';
import { ToastrService } from 'ngx-toastr';
import { LayoutService } from 'src/app/layout/services/layout/layout.service';
import { UserService } from 'src/app/core/services/user/user.service';


@Component({
  selector: 'app-user-roles',
  templateUrl: './userroles-list.component.html',
  styleUrls: ['./userroles-list.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class UserRolesListComponent implements OnInit {
  filtration = {...Filtration,isactive:''};
  faEllipsisVertical = faEllipsisVertical;
  userListForSpecificRole:string[]=[];
  allRolesLength:number=1;
  first:boolean=true;
  fixedLength:number=0;
  message:string="";
  displayUserList: boolean;
  roleStatusList;
  userRolesList:IUserRoles[] = [];
  displayPosition: boolean;
  paginationState= {...paginationInitialState};
  roles={
    total:0,
    list:[],
    loading:true
  }
  constructor(private exportService: ExportService,private userInformation: UserService,private toastr:ToastrService,private confirmationService: ConfirmationService,private headerService: HeaderService, private layoutService:LayoutService, private userRolesService: UserRolesService, private translate: TranslateService, private router: Router) { }

  ngOnInit(): void {
    this.getAllRole();

    this.layoutService.message.subscribe((res)=>{console.log("init");this.message=res;});
    this.headerService.Header.next(
      {
        'breadCrump': [
          { label: this.translate.instant('dashboard.UserRole.List Of Job Roles'),routerLink:'/dashboard/manager-tools/user-roles/user-roles-list'}],
      }
    );
   
    this.roleStatusList = this.userRolesService. roleStatusList;
 
  }


  deleteRole(role:IUserRoles)
  { 
    this.confirmationService.confirm({
      message: this.translate.instant('dashboard.UserRole.Are you sure that you want to delete JobRole')+" \" "+role.jobRoleName+" \" "+this.translate.instant('shared.?'),
      header: this.translate.instant('shared.Delete Confirmation'),
      icon: 'pi pi-exclamation-circle',
      accept:() => { 
        this.userRolesService.deleteRole(role.id).subscribe((res)=>{
          console.log("suc"+res);
          this.getAllRole();
          this.toastr.clear();
          this.layoutService.message.next('dashboard.UserRole.Job Role deleted Successfully');
          this.layoutService.message.subscribe((res)=>{this.message=res;});
          this.toastr.success( this.translate.instant(this. message));
          },(err)=>{
            console.log("err"+err);
            this.getAllRole();
            this.toastr.clear();
            this.layoutService.message.next( 'dashboard.UserRole.error,please try again');
            this.layoutService.message.subscribe((res)=>{this.message=res;});
            this.toastr.error( this.translate.instant(this. message));

          })
      
      }
   
    });
  
   
    
  }
  getAllRole()
  {

    console.log(this.filtration);
   
    this.userRolesService.getAllRoles(this.filtration).subscribe((res)=>{
        this.roles.loading = false;
      console.log(this.filtration)
      this.userRolesList=res.data;
   
     if(this.first)
     {
      this.fixedLength=this.allRolesLength;
      this.roles.total=this.fixedLength;
    }
    
   
      

    
      },(err)=>{this.roles.loading = false;
        this.roles.total=0
      });

  }
  clearFilter(){
    
    this.filtration.KeyWord =''
    this.filtration.isactive= null;
    this.getAllRole();
  }
  sortMe(e)
  {
    if(e.order==-1)
    {this.filtration.SortBy="update "+e.field;}
    else
    {this.filtration.SortBy="old "+e.field;}

    this.getAllRole();
  }


  onExport(fileType:FileEnum, table:Table){
    this.exportService.exportFile(fileType, table,this.userRolesList)
  }



  paginationChanged(event: paginationState) {
    this.filtration.Page = event.page;
    this.getAllRole();

  }
  showUserList(roleId:number) {
   

    this.userRolesService.getRoleByID(roleId).subscribe((res)=>{
      this.userListForSpecificRole=res.users;
      console.log(res.users)

    });
     this.displayUserList = true;
}

 



}
