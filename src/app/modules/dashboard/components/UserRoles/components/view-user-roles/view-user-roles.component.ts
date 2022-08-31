import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faFilter,faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faSearch} from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { UserRoles } from 'src/app/core/Models/user-roles';
import { HeaderService } from 'src/app/core/services/Header/header.service';
import { UserRolesService } from '../../service/user-roles.service';


@Component({
  selector: 'app-view-user-roles',
  templateUrl: './view-user-roles.component.html',
  styleUrls: ['./view-user-roles.component.scss']
})
export class ViewUserRolesComponent implements OnInit {
  value1: string;
  filtericon=faFilter;
  Homeicon = faHome  ;
  faEllipsisVertical=faEllipsisVertical;
  searchicon =faSearch;
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
