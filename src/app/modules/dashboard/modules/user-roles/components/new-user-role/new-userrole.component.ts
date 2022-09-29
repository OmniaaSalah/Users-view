import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faArrowRight, faExclamationCircle, faCheck } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { LayoutService } from 'src/app/layout/services/layout/layout.service';
import { UserRolesService } from '../../service/user-roles.service';
@Component({
  selector: 'app-new-user-role',
  templateUrl: './new-userrole.component.html',
  styleUrls: ['./new-userrole.component.scss']
})
export class NewUserRoleComponent implements OnInit,OnDestroy {
  checkIcon = faCheck;
  exclamationIcon = faExclamationCircle;
  rightIcon = faArrowRight;
  roleFormGrp: FormGroup;
  cities: string[];
  constructor(private fb: FormBuilder, private userRolesService: UserRolesService,private layoutService:LayoutService, private router: Router, private translate: TranslateService, private headerService: HeaderService) {
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
          { label: this.translate.instant('dashboard.UserRole.List Of Job Roles'), routerLink: '/dashboard/manager-tools/user-roles/user-roles-list',routerLinkActiveOptions:{exact: true} },
          { label: this.translate.instant('breadcrumb.Add Roles in The System'),routerLink:'/dashboard/manager-tools/user-roles/new-role'}],
        'mainTitle': { main: this.translate.instant('breadcrumb.Add Roles in The System') }
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


  succeeded(){
  // if duplicated
  // this.layoutService.message.next('dashboard.UserRole.JobRole already exist ,Pleaze change JobRole and try again');
  // this.layoutService.messageBackGroundColor.next("#FF3D6B");

  //if added
  this.layoutService.message.next('dashboard.UserRole.JobRole added Successfully');
  this.layoutService.messageBackGroundColor.next("green");
  }
  ngOnDestroy(){

    this.layoutService.message.next('');
    this.layoutService.messageBackGroundColor.next("");
  }


}
