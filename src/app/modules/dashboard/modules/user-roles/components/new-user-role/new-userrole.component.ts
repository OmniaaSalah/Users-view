import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faArrowRight, faExclamationCircle, faCheck } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { UserRolesService } from '../../service/user-roles.service';
@Component({
  selector: 'app-new-user-role',
  templateUrl: './new-userrole.component.html',
  styleUrls: ['./new-userrole.component.scss']
})
export class NewUserRoleComponent implements OnInit {

  exclamationIcon = faExclamationCircle;
  rightIcon = faArrowRight;
  roleFormGrp: FormGroup;
  cities: string[];
  constructor(private fb: FormBuilder, private userRolesService: UserRolesService, private router: Router, private translate: TranslateService, private headerService: HeaderService) {
    this.roleFormGrp = fb.group({

      jobrolename: ['', [Validators.required, Validators.maxLength(65)]],
      description: ['', [Validators.maxLength(256)]],
      rolepowers: ['', [Validators.required]],
      datarestrictionlevel: [''],
      status: ['']


    });
  }

  ngOnInit(): void {

    this.headerService.Header.next(
      {
        'breadCrump': [
          { label: this.translate.instant('dashboard.UserRole.List Of Job Roles'), routerLink: '/dashboard/manager-tools/UserRoles/user-roles-list' },
          { label: this.translate.instant('dashboard.UserRole.Add New Role') }],
        'mainTitle': { main: this.translate.instant('dashboard.UserRole.Add Roles in The System') }
      }
    );
    this.cities = this.userRolesService.cities;
  }
  get jobrolename() {
    return this.roleFormGrp.controls['jobrolename'] as FormControl;
  }

  get description() {
    return this.roleFormGrp.controls['description'] as FormControl;
  }

  get rolepowers() {
    return this.roleFormGrp.controls['rolepowers'] as FormControl;
  }

  get status() {
    return this.roleFormGrp.controls['status'] as FormControl;
  }

  get datarestrictionlevel() {
    return this.roleFormGrp.controls['datarestrictionlevel'] as FormControl;
  }


}
