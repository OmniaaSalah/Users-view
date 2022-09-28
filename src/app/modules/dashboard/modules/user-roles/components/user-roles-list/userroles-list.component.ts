import { Component, OnInit,OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { faEllipsisVertical,faClose } from '@fortawesome/free-solid-svg-icons';

import {ConfirmationService, MessageService} from 'primeng/api';

import { TranslateService } from '@ngx-translate/core';
import { paginationState } from 'src/app/core/models/pagination/pagination';

import { IUserRoles } from 'src/app/core/Models/iuser-role';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import {UserRolesService } from '../../service/user-roles.service';
import { ToastrService } from 'ngx-toastr';
import { LayoutService } from 'src/app/layout/services/layout/layout.service';
import { UserService } from 'src/app/core/services/user.service';


@Component({
  selector: 'app-user-roles',
  templateUrl: './userroles-list.component.html',
  styleUrls: ['./userroles-list.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class UserRolesListComponent implements OnInit,OnDestroy {
  faEllipsisVertical = faEllipsisVertical;
  userListForSpecificRole:string[]=[];
  first = 0;
  rows = 4;
  displayUserList: boolean;
  userRolesList:IUserRoles[] = [];
  displayPosition: boolean;
  position: string;
  cities: string[];
  constructor(private userInformation: UserService,private confirmationService: ConfirmationService,private headerService: HeaderService, private layoutService:LayoutService,private toastr: ToastrService, private userRolesService: UserRolesService, private translate: TranslateService, private router: Router) { }

  ngOnInit(): void {


    this.headerService.Header.next(
      {
        'breadCrump': [
          { label: this.translate.instant('dashboard.UserRole.List Of Job Roles'),routerLink:'/dashboard/manager-tools/user-roles/user-roles-list'}],
      }
    );
    this.cities = this.userRolesService.cities;
    this.userRolesService.userRolesList.subscribe((res)=>{this. userRolesList=res;});
    // this. userRolesList=[]
  }
  onTableDataChange(event: paginationState) {
    this.first = event.first
    this.rows = event.rows

  }
  gotoAddRole() {
    this.router.navigate(['/dashboard/manager-tools/user-roles/new-role']);
  }
  deleteRole(item:IUserRoles)
  { 
    
  
    this.userRolesList.forEach(element => {
      if(element.roleUsers>0&&element.id==item.id)
      {
       
        this.layoutService.message.next('dashboard.UserRole.error, you can’t delete this JobRole');
        this.layoutService.messageBackGroundColor.next("#FF3D6B");
       
      }
      else if(element.roleUsers==0&&element.id==item.id)
      {
       
          this.confirmationService.confirm({
          message: this.translate.instant('dashboard.UserRole.Are you sure that you want to delete JobRole')+" "+item.jobRoleName+" "+this.translate.instant('shared.?'),
          icon: 'pi pi-exclamation-circle',
          accept:() => { this.layoutService.message.next('dashboard.UserRole.Job Role deleted Successfully');
          this.layoutService.messageBackGroundColor.next("green");}
        });
   
      }
      
    });
    
  }
  showUserList(userRole:string) {
    this.userRolesService.userListForSpecificRoleApi=[];
    this.userInformation.usersList.forEach(element => {
      if(element.privateRole==userRole)
      {
        this.userRolesService.userListForSpecificRoleApi.push(element.fullName);
      }
    });
    this.userRolesService.userListForSpecificRole.next(this.userRolesService.userListForSpecificRoleApi);
    this.userRolesService.userListForSpecificRole.subscribe((res)=>{this.userListForSpecificRole=res;});
    this.displayUserList = true;
}

  ngOnDestroy(){
    this.layoutService.message.next('');
    this.layoutService.messageBackGroundColor.next("");
  }



}
