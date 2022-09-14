import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';


import { TranslateService } from '@ngx-translate/core';
import { paginationState } from 'src/app/core/models/pagination/pagination';

import { IUserRoles } from 'src/app/core/Models/iuser-role';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import {UserRolesService } from '../../service/user-roles.service';


@Component({
  selector: 'app-user-roles',
  templateUrl: './userroles-list.component.html',
  styleUrls: ['./userroles-list.component.scss']
})
export class UserRolesListComponent implements OnInit {
  faEllipsisVertical = faEllipsisVertical;
  first = 0;
  rows = 4;
  userRolesList:IUserRoles[] = [];
  displayPosition: boolean;
  position: string;
  cities: string[];
  constructor(private headerService: HeaderService, private userRolesService: UserRolesService, private translate: TranslateService, private router: Router) { }

  ngOnInit(): void {


    this.headerService.Header.next(
      {
        'breadCrump': [
          { label: this.translate.instant('dashboard.UserRole.List Of Job Roles') }],
      }
    );
    this.cities = this.userRolesService.cities;
    this. userRolesList = this.userRolesService. userRolesList;
  }
  onTableDataChange(event: paginationState) {
    this.first = event.first
    this.rows = event.rows

  }
  gotoAddRole() {
    this.router.navigate(['/dashboard/manager-tools/user-roles/new-role']);
  }


}
