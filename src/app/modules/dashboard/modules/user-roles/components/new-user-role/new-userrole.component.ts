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

  exclamationIcon = faExclamationCircle;
  rightIcon = faArrowRight;
  RoleFormGrp: FormGroup;
  cities: string[];
  constructor(private fb: FormBuilder, private userrolesservice: UserRolesService, private router: Router, private translate: TranslateService, private headerservice: HeaderService) {
    this.RoleFormGrp = fb.group({

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
    return this.RoleFormGrp.controls['jobrolename'] as FormControl;
  }

  get description() {
    return this.RoleFormGrp.controls['description'] as FormControl;
  }

  get rolepowers() {
    return this.RoleFormGrp.controls['rolepowers'] as FormControl;
  }

  get status() {
    return this.RoleFormGrp.controls['status'] as FormControl;
  }

  get datarestrictionlevel() {
    return this.RoleFormGrp.controls['datarestrictionlevel'] as FormControl;
  }


}
