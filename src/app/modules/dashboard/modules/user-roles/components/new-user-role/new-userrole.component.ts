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
  checkIcon = faCheck;
  exclamationIcon = faExclamationCircle;
  rightIcon = faArrowRight;
  roleFormGrp: FormGroup;
  cities: string[];
  constructor(private fb: FormBuilder, private userRolesService: UserRolesService, private router: Router, private translate: TranslateService, private headerService: HeaderService) {
    this.roleFormGrp = fb.group({

      jobRoleName: ['', [Validators.required, Validators.maxLength(65)]],
      description: ['', [Validators.maxLength(256)]],
      rolePowers: ['', [Validators.required]],
      datarestrictionLevel: [''],
      status: ['']


    });
  }

  ngOnInit(): void {

    this.headerService.Header.next(
      {
        'breadCrump': [
          { label: this.translate.instant('dashboard.UserRole.List Of Job Roles'), routerLink: '/dashboard/manager-tools/user-roles/user-roles-list' },
          { label: this.translate.instant('dashboard.UserRole.Add New Role') }],
        'mainTitle': { main: this.translate.instant('dashboard.UserRole.Add Roles in The System') }
      }
    );
    this.cities = this.userRolesService.cities;
  }
  get jobRoleName() {
    return this.roleFormGrp.controls['jobRoleName'] as FormControl;
  }

  get description() {
    return this.roleFormGrp.controls['description'] as FormControl;
  }

  get rolePowers() {
    return this.roleFormGrp.controls['rolePowers'] as FormControl;
  }

  get status() {
    return this.roleFormGrp.controls['status'] as FormControl;
  }

  get datarestrictionLevel() {
    return this.roleFormGrp.controls['datarestrictionLevel'] as FormControl;
  }


}
