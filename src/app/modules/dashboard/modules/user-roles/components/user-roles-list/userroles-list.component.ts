import { Component, OnInit,OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { faEllipsisVertical,faClose } from '@fortawesome/free-solid-svg-icons';


import { TranslateService } from '@ngx-translate/core';
import { paginationState } from 'src/app/core/models/pagination/pagination';

import { IUserRoles } from 'src/app/core/Models/iuser-role';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import {UserRolesService } from '../../service/user-roles.service';
import { ToastrService } from 'ngx-toastr';
import { LayoutService } from 'src/app/layout/services/layout/layout.service';


@Component({
  selector: 'app-user-roles',
  templateUrl: './userroles-list.component.html',
  styleUrls: ['./userroles-list.component.scss']
})
export class UserRolesListComponent implements OnInit,OnDestroy {
  faEllipsisVertical = faEllipsisVertical;

  first = 0;
  rows = 4;
  userRolesList:IUserRoles[] = [];
  displayPosition: boolean;
  position: string;
  cities: string[];
  constructor(private headerService: HeaderService, private layoutService:LayoutService,private toastr: ToastrService, private userRolesService: UserRolesService, private translate: TranslateService, private router: Router) { }

  ngOnInit(): void {


    this.headerService.Header.next(
      {
        'breadCrump': [
          { label: this.translate.instant('dashboard.UserRole.List Of Job Roles'),routerLink:'/dashboard/manager-tools/user-roles/user-roles-list'}],
      }
    );
    this.cities = this.userRolesService.cities;
    this.userRolesService.userRolesList.subscribe((res)=>{this. userRolesList=res;});
   
  }
  onTableDataChange(event: paginationState) {
    this.first = event.first
    this.rows = event.rows

  }
  gotoAddRole() {
    this.router.navigate(['/dashboard/manager-tools/user-roles/new-role']);
  }
  deleteRole(id:number)
  {
    this.userRolesList.forEach(element => {
      if(element.roleUsers>0&&element.id==id)
      {
        this.layoutService.message.next('dashboard.UserRole.error, you can’t delete this JobRole');
        this.layoutService.messageBackGroundColor.next("#FF3D6B");
       
      }
      else if(element.roleUsers==0&&element.id==id)
      {
        if(confirm("Are you sure to delete "+element?.jobRoleName)) {

        
          this.layoutService.message.next('dashboard.UserRole.Job Role deleted Successfully');
          this.layoutService.messageBackGroundColor.next("green");
         
        }
         
      }
      
    });
  }

  ngOnDestroy(){
    this.layoutService.message.next('');
    this.layoutService.messageBackGroundColor.next("");
  }



}
