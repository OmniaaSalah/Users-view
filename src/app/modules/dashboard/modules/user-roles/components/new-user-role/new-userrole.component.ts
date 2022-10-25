import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowRight, faExclamationCircle, faCheck } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { IUserRoles } from 'src/app/core/Models';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { LayoutService } from 'src/app/layout/services/layout/layout.service';
import { UserRolesService } from '../../service/user-roles.service';

@Component({
  selector: 'app-new-user-role',
  templateUrl: './new-userrole.component.html',
  styleUrls: ['./new-userrole.component.scss']
})
export class NewUserRoleComponent implements OnInit {
  jobRole:IUserRoles={} as IUserRoles;
  dataRestrictionLevelList;
  userRolesList:IUserRoles[] = [];
  rolePowersList;
  rolePowersAddedList=[];
  isShown:boolean=false;
  notChecked:boolean=false;
  checked:boolean=true;
  checkIcon = faCheck;
  rolePowersIdList:number[]=[];
  message:string="";
  exclamationIcon = faExclamationCircle;
  rightIcon = faArrowRight;
  roleFormGrp: FormGroup;
  urlParameter: string='';
  constructor(private fb: FormBuilder, private router: Router, private toastr:ToastrService,private route: ActivatedRoute, private userRolesService: UserRolesService,private layoutService:LayoutService,  private translate: TranslateService, private headerService: HeaderService) {
    this.roleFormGrp = fb.group({

      jobRoleName: ['', [Validators.required, Validators.maxLength(65)]],
      description: ['', [Validators.maxLength(256)]],
      rolePowers: ['', [Validators.required]],
      datarestrictionLevel: [''],
      status: ['']


    });
  }

  ngOnInit(): void {

    this.userRolesService.getAllDataRestrictionLevel().subscribe((res)=>{this.dataRestrictionLevelList=res;})
    this.userRolesService.getAllClaims().subscribe((res)=>{this.rolePowersList=res.result})
    this.route.paramMap.subscribe(param => {
      this.urlParameter =param.get('roleId');
      this.userRolesService.getRoleByID(Number(this.urlParameter)).subscribe((res)=>{
        this.jobRole=res; this.bindOldRole(this.jobRole);});
      
    });
    console.log("param"+this.urlParameter);
    
    this.layoutService.message.subscribe((res)=>{console.log("init");this.message=res;});

    this.headerService.Header.next(
      {
        'breadCrump': [
          { label: this.translate.instant('dashboard.UserRole.List Of Job Roles'), routerLink: '/dashboard/manager-tools/user-roles/user-roles-list',routerLinkActiveOptions:{exact: true} },
          { 
           
            label: (this.urlParameter==null||this.urlParameter=='')?  this.translate.instant('breadcrumb.Add Roles in The System'):this.translate.instant('breadcrumb.Edit Role'),
            routerLink: (this.urlParameter==null||this.urlParameter=='')? '/dashboard/manager-tools/user-roles/new-role':'/dashboard/manager-tools/user-roles/edit-role/'+this.urlParameter
          }
       ],
        'mainTitle':{main:(this.urlParameter==null||this.urlParameter=='')? this.translate.instant('breadcrumb.Add Roles in The System'):this.translate.instant('breadcrumb.Edit Role')}
      }
      
    );
   
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
  this.rolePowersList.forEach(element => {
    this.roleFormGrp.value.rolePowers.forEach(roleId => {
      if(roleId==element.id)
      {
        this.rolePowersAddedList.push(element);
      }
    });
  
  });
  this.jobRole.status=this.roleFormGrp.value.status?this.checked:this.notChecked;

  this.jobRole={ 
    id:Number(this.urlParameter),
    jobRoleName:this.roleFormGrp.value.jobRoleName, 
    description:this.roleFormGrp.value.description,
     rolePowers:this.rolePowersAddedList,
    status:this.jobRole.status,
   };
   console.log( this.jobRole);
   if(this.urlParameter)
    {
      this.userRolesService.updateRole(this.jobRole,Number(this.urlParameter)).subscribe((res)=>{
        this.toastr.clear();
        this.layoutService.message.next('dashboard.UserRole.JobRole edited Successfully');
        this.layoutService.message.subscribe((res)=>{this.message=res;});
        this.toastr.success( this.translate.instant(this. message));
        this.router.navigate(['/dashboard/manager-tools/user-roles/user-roles-list']);
       },(err)=>{
        if(err.message=="{"+'"message":'+'"Role with the same name exists for this owner."'+"}")
        {
       
          this.showDuplicatedError();
        }
        else{
       
         this.showError();
        }
      });
    }
    else
    { 
    
      this.userRolesService.addRole(this.jobRole).subscribe((res)=>{
        this.toastr.clear();
        this.layoutService.message.next('dashboard.UserRole.JobRole added Successfully');
        this.layoutService.message.subscribe((res)=>{this.message=res;});
        this.toastr.success( this.translate.instant(this. message));
        this.router.navigate(['/dashboard/manager-tools/user-roles/user-roles-list']);
       },(err)=>{
       
        
        if(err.message=="{"+'"message":'+'"Role with the same name exists for this owner."'+"}")
        {
       
          this.showDuplicatedError();
        }
        else{
          this.showError();
        }
       
      })
    }
  
 
  }
  isToggleLabel(e)
  {
    if(e.checked)
    {
      if(this.urlParameter)
      {
        this.jobRole.status=true;
      
      }
      else
      {
        this.isShown=true;
      }
  
    }
    else{
      if(this.urlParameter)
      {
        this.jobRole.status=false;
     
      }
      else
      {
        this.isShown=false;
      }
     
    }
  }

  bindOldRole(role)
  {
      role.rolePowers.forEach(element => {
        this.rolePowersIdList.push(element.id)
      });

       role.indexStatus=role.status?this.checked:this.notChecked;

        this.roleFormGrp.patchValue({jobRoleName:role.jobRoleName, 
          description:role.description,
           rolePowers:this.rolePowersIdList,
          status:role.indexStatus,
          // datarestrictionLevel:role.dataRestrictionLevel
        });
    
        // console.log( this.roleFormGrp.value); 
  }
  
  showDuplicatedError()
  {
    this.toastr.clear();
    this.layoutService.message.next('dashboard.UserRole.JobRole duplicated');
    this.layoutService.message.subscribe((res)=>{this.message=res;});
    this.toastr.error( this.translate.instant(this. message));
  }
  showError()
  {
    this.toastr.clear();
    this.layoutService.message.next('dashboard.UserRole.error,please try again');
    this.layoutService.message.subscribe((res)=>{this.message=res;});
    this.toastr.error( this.translate.instant(this. message));
  }

}
