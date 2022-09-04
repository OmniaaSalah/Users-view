import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';


import { TranslateService } from '@ngx-translate/core';

import { UserRoles } from 'src/app/core/Models/user-roles';
import { HeaderService } from 'src/app/core/services/Header/header.service';
import { UserRolesService } from '../../service/user-roles.service';


@Component({
  selector: 'app-view-user-roles',
  templateUrl: './view-user-roles.component.html',
  styleUrls: ['./view-user-roles.component.scss']
})
export class ViewUserRolesComponent implements OnInit {
  faEllipsisVertical=faEllipsisVertical;
  page: number = 1;
  tableSize: number = 7;
  UserRolesList: UserRoles[]=[];
  displayPosition: boolean;
  position: string;
  constructor(private headerservice:HeaderService,private UserRoleService:UserRolesService,private translate:TranslateService,private router:Router) { }

  ngOnInit(): void {
   

    this.headerservice.Header.next(
      {'breadCrump': [
        {label: this.translate.instant('dashboard.UserRole.List Of Job Roles')}],
        'home':{icon: 'pi pi-home', routerLink: '/'},
        'mainTittle':""
      }
      );
    this.UserRolesList=this.UserRoleService.UserRolesList;
  }
  onTableDataChange(event: number) {
    this.page = event;
    
  }
  gotoAddRole()
  {
    this.router.navigate(['/dashboard/manager-tools/UserRoles/NewRole']);
  }


}
