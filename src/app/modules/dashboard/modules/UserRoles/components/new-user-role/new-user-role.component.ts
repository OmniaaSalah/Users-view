import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faArrowRight ,faExclamationCircle,faCheck } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { HeaderService } from 'src/app/core/services/Header/header.service';
import { UserRolesService } from '../../service/user-roles.service';
@Component({
  selector: 'app-new-user-role',
  templateUrl: './new-user-role.component.html',
  styleUrls: ['./new-user-role.component.scss']
})
export class NewUserRoleComponent implements OnInit {
  checkicon=faCheck;
  Exclamationicon=faExclamationCircle;
  righticon=faArrowRight;
  RoleFormgrp:FormGroup;
  cities: string[];
  constructor(private fb: FormBuilder,private UserRoleService:UserRolesService,private router:Router,private translate:TranslateService,private headerservice:HeaderService) {
    this.RoleFormgrp= fb.group({
     
      JobRoleName:['',[Validators.required,Validators.maxLength(65)]],
      Description:['',[Validators.maxLength(256)]],
      RolePowers:['',[Validators.required]],
      DataRestrictionLevel:[''],
      Status:['']
      
  
      });
   }

  ngOnInit(): void {
 
    this.headerservice.Header.next(
      {'breadCrump':[
        {label: this.translate.instant('dashboard.UserRole.List Of Job Roles')},
        {label: this.translate.instant('dashboard.UserRole.Add New Role')}],
        'mainTitle':{main: this.translate.instant('dashboard.UserRole.Add Roles in The System')}
      }
      );
      this.cities=this.UserRoleService.cities;
  }
  get JobRoleName() {
    return this.RoleFormgrp.controls['JobRoleName'] as FormControl;
  }

  get Description() {
    return this.RoleFormgrp.controls['Description'] as FormControl;
  }

  get RolePowers() {
    return this.RoleFormgrp.controls['RolePowers'] as FormControl;
  }

  get Status() {
    return this.RoleFormgrp.controls['Status'] as FormControl;
  }

  get DataRestrictionLevel() {
    return this.RoleFormgrp.controls['DataRestrictionLevel'] as FormControl;
  }
  GoBack(){
    this.router.navigate(['/dashboard/manager-tools/UserRoles/ViewUserRoles']);
  }

}
