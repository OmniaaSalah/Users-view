import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faArrowRight, faExclamationCircle, faCheck } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { HeaderService } from 'src/app/core/services/header/header.service';
import { UserRolesService } from '../../service/user-roles.service';
@Component({
  selector: 'app-new-user-role',
  templateUrl: './new-userrole.component.html',
  styleUrls: ['./new-userrole.component.scss']
})
export class NewUserRoleComponent implements OnInit {
  checkicon = faCheck;
  exclamationicon = faExclamationCircle;
  righticon = faArrowRight;
  RoleFormgrp: FormGroup;
  cities: string[];
  constructor(private fb: FormBuilder, private userrolesservice: UserRolesService, private router: Router, private translate: TranslateService, private headerservice: HeaderService) {
    this.RoleFormgrp = fb.group({

      jobrolename: ['', [Validators.required, Validators.maxLength(65)]],
      description: ['', [Validators.maxLength(256)]],
      rolepowers: ['', [Validators.required]],
      datarestrictionlevel: [''],
      status: ['']


    });
  }

  ngOnInit(): void {

    this.headerservice.Header.next(
      {
        'breadCrump': [
          { label: this.translate.instant('dashboard.UserRole.List Of Job Roles'), routerLink: '/dashboard/manager-tools/UserRoles/user-roles-list' },
          { label: this.translate.instant('dashboard.UserRole.Add New Role') }],
        'mainTitle': { main: this.translate.instant('dashboard.UserRole.Add Roles in The System') }
      }
    );
    this.cities = this.userrolesservice.cities;
  }
  get jobrolename() {
    return this.RoleFormgrp.controls['jobrolename'] as FormControl;
  }

  get description() {
    return this.RoleFormgrp.controls['description'] as FormControl;
  }

  get rolepowers() {
    return this.RoleFormgrp.controls['rolepowers'] as FormControl;
  }

  get status() {
    return this.RoleFormgrp.controls['status'] as FormControl;
  }

  get datarestrictionlevel() {
    return this.RoleFormgrp.controls['datarestrictionlevel'] as FormControl;
  }


}
