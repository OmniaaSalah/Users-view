import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { UserRolesService } from '../../service/user-roles.service';

@Component({
  selector: 'app-role-details',
  templateUrl: './role-details.component.html',
  styleUrls: ['./role-details.component.scss']
})
export class RoleDetailsComponent implements OnInit {
  dataRestrictionLevelList;
  roleRestrictionLevel:string="";
  jobRole;
  noDetails:boolean=false;
  userRoleTittle:string="";
  urlParameter: string='';
  lang =inject(TranslationService).lang;
  checkedStatus:boolean=false;
  notCheckedStatus:boolean=true;
  constructor(private route: ActivatedRoute, private userRolesService: UserRolesService, private translate: TranslateService, private headerService:HeaderService) { }

  ngOnInit(): void {
 
    this.dataRestrictionLevelList=this.userRolesService.dataRestrictionLevelList;
    this.route.paramMap.subscribe(param => {
      this.urlParameter=param.get('roleId');

      this.userRolesService.getRoleByID(Number(this.urlParameter)).subscribe((res)=>{
        this.noDetails=true;
        this.jobRole=res;this.userRolesService.userTittle.next(res?.jobRoleName[this.lang])
        
        this.dataRestrictionLevelList.forEach(element => {
          if(element.name.en==this.jobRole?.restrictionLevelId)
          {
            this.roleRestrictionLevel=element.name.ar;
          }
        });
       
       })
    
  });
  this.userRolesService.userTittle.subscribe((res)=>{
    if(res)
    {this.userRoleTittle=res;}
    else
    {this.userRoleTittle=''}
  this.headerService.Header.next(
      {
        'breadCrump': [
          { label: this.translate.instant('dashboard.UserRole.List Of Job Roles'), routerLink: '/dashboard/manager-tools/user-roles/user-roles-list',routerLinkActiveOptions:{exact: true} },
          { label: this.translate.instant('breadcrumb.Job Role Details') +" ("+this.userRoleTittle+")" ,routerLink:'/dashboard/manager-tools/user-roles/role-details/'+this.urlParameter}],
        'mainTitle': { main: this.userRoleTittle}
      }
    );
  });
   
  }

}
