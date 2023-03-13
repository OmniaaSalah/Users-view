import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { SchoolsService } from '../../../schools/services/schools/schools.service';
import { UserRolesService } from '../../service/user-roles.service';
import { Filtration } from 'src/app/core/classes/filtration';
import { Filter } from 'src/app/core/models/filter/filter';
import { paginationInitialState } from 'src/app/core/classes/pagination';
import { CountriesService } from 'src/app/shared/services/countries/countries.service';
import { ExportService } from 'src/app/shared/services/export/export.service';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { RestrictionLevelEnum } from 'src/app/shared/enums/user/restriction-level.enum';
import { ClaimsEnum } from 'src/app/shared/enums/claims/claims.enum';
@Component({
  selector: 'app-new-user-role',
  templateUrl: './new-userrole.component.html',
  styleUrls: ['./new-userrole.component.scss']
})
export class NewUserRoleComponent implements OnInit {
  get ClaimsEnum(){return ClaimsEnum}
  exclamationIcon = faExclamationCircle;
  schoolIds;
  curriculumIds;
  jobRole;
  dataRestrictionLevelList;
  rolePowersList=[];
  rolePowersAddedList=[];
  rolePowersIdList;
  curriculamList;
  schoolIsSelectedList;
  MarkedListLength:number=0;
  showCurriculamList:boolean=false;
  showSchoolList:boolean=false;
  isBtnLoading: boolean=false;
  selectSchoolModelOpened:boolean=false;
  isShown:boolean=false;
  notChecked:boolean=false;
  checked:boolean=true;
  urlParameter:string='';
  filtration :Filter = {...Filtration,curriculumId:'',StateId: ''};
  paginationState= {...paginationInitialState};
  schools={
    totalAllData:0,
    total:0,
    list:[],
    loading:true
  }
  rolesPowers;
  roleFormGrp: FormGroup;
  searchText = new FormControl('')
  constructor(private fb: FormBuilder,private CountriesService:CountriesService,  private exportService: ExportService, private sharedService: SharedService,private router: Router,  private schoolsService:SchoolsService,private toastService: ToastService,private route: ActivatedRoute, private userRolesService: UserRolesService, private translate: TranslateService, private headerService: HeaderService) {
    this.roleFormGrp = fb.group({

      jobRoleNameInArabic: ['', [Validators.required, Validators.maxLength(65)]],
      jobRoleNameInEnglish: ['', [Validators.required, Validators.maxLength(65)]],
      descriptionInArabic: ['', [Validators.maxLength(256)]],
      descriptionInEnglish: ['', [Validators.maxLength(256)]],
      datarestrictionLevel: ['',[Validators.required]],
      status: [false],
      curriculumSelected: fb.array([''])
  

    });
  }

  ngOnInit(): void {
    
    this.getCurriculums();
    this.sharedService.openSelectSchoolsModel.subscribe((res)=>{this.selectSchoolModelOpened=res;})
    this.userRolesService.schoolSelectedList.next([]);
    this.userRolesService.MarkedListLength.next(0);
    this.userRolesService.schoolSelectedList.subscribe((res)=>{
      this.schoolIsSelectedList=res;

    });
    this.userRolesService.MarkedListLength.subscribe((res)=>{this.MarkedListLength=res});
    this.dataRestrictionLevelList=this.userRolesService.dataRestrictionLevelList;
    this.userRolesService.getAllClaims().subscribe((res)=>{this.rolePowersList=res.result})
    this.route.paramMap.subscribe(param => {
      this.urlParameter =param.get('roleId');
      this.userRolesService.getRoleByID(Number(this.urlParameter)).subscribe((res)=>{
        this.jobRole=res; 
        this.getIsSelectedSchoolList();
      
      },(err)=>{this.getIsSelectedSchoolList();});
      
    });
    

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
  get curriculumSelectedArr(): FormArray {
    return this.roleFormGrp.get('curriculumSelected') as FormArray;
  }
  get curriculumSelected() {
    return this.roleFormGrp.controls['curriculumSelected'] ;
  }

  get jobRoleNameInArabic() {
    return this.roleFormGrp.controls['jobRoleNameInArabic'] as FormControl;
  }
  get jobRoleNameInEnglish() {
    return this.roleFormGrp.controls['jobRoleNameInEnglish'] as FormControl;
  }


  get descriptionInArabic() {
    return this.roleFormGrp.controls['descriptionInArabic'] as FormControl;
  }
  get descriptionInEnglish() {
    return this.roleFormGrp.controls['descriptionInEnglish'] as FormControl;
  }



  get status() {
    return this.roleFormGrp.controls['status'] as FormControl;
  }

  get datarestrictionLevel() {
    return this.roleFormGrp.controls['datarestrictionLevel'] as FormControl;
  }


  succeeded(){
    this.isBtnLoading = true;
    this.rolePowersList.forEach(element => {
    this.rolePowersIdList.forEach(roleId => {
      if(roleId==element.id)
      {
        this.rolePowersAddedList.push(element);
      }
    });
  
  });

  this.schoolIds=[];
  this.curriculumIds=[];
  if(this.roleFormGrp.value.datarestrictionLevel==RestrictionLevelEnum.AccessToInformationRelatedToSchool)
   {this.schoolIsSelectedList.forEach(element => {
    if(element.isSelected==true)
    {
     
      this.schoolIds.push(element.id);
    }
  });

  if(this.schoolIds.length==0)
  {
    this.toastService.error(this.translate.instant('dashboard.UserRole.error,please add one school at least')); 
    this.isBtnLoading = false;
  }
  else
  {
    this.saveMe();
  }
  }

  else if(this.roleFormGrp.value.datarestrictionLevel==RestrictionLevelEnum.AccessToInformationRelatedToCurriculums)
  {
    this.curriculamList.forEach(element => {
      if(element.isSelected==true)
      {
        this.curriculumIds.push(element.id);
      }
    });

    if(this.curriculumIds.length==0)
  {
    this.toastService.error(this.translate.instant('dashboard.UserRole.error,please add one curriculum at least')); 
    this.isBtnLoading = false;
  }
  else
  {
    this.saveMe();
  }
  }

  else
  {
    this.saveMe();
  }
 
  }

  saveMe()
  {
  
    this.jobRole={};
    this.jobRole.status=this.roleFormGrp.value.status?this.checked:this.notChecked;

    this.jobRole={ 
      jobRoleName:{ar:this.roleFormGrp.value.jobRoleNameInArabic,en:this.roleFormGrp.value.jobRoleNameInEnglish} ,
      description:{ar:this.roleFormGrp.value.descriptionInArabic,en:this.roleFormGrp.value.descriptionInEnglish},
      rolePowers:this.rolePowersAddedList,
      status:this.jobRole.status,
      schoolIds: this.schoolIds ,
      curriculumIds:this.curriculumIds,
      restrictionLevelId:this.roleFormGrp.value.datarestrictionLevel
     };
     
     if(this.urlParameter)
      {
        this.userRolesService.updateRole(this.jobRole,this.urlParameter).subscribe((res)=>{
          this.isBtnLoading = false;
       
          if(res.statusCode=='BadRequest')
          {
            this.toastService.error(this.translate.instant(res.error));
          }
          else
          {
            this.toastService.success(this.translate.instant('dashboard.UserRole.JobRole edited Successfully'));
            this.router.navigate(['/dashboard/manager-tools/user-roles/user-roles-list']);
          }
         },(err)=>{
         
          this.isBtnLoading = false;
          this.toastService.error(this.translate.instant('dashboard.AnnualHoliday.error,please try again')); 
         

        });
      }
      else
      { 
      
        this.userRolesService.addRole(this.jobRole).subscribe((res)=>{
          this.isBtnLoading = false;
        
          if(res.statusCode=='BadRequest')
          {
            this.toastService.error(this.translate.instant(res.error));
          }
          else
          {
            this.toastService.success(this.translate.instant('dashboard.UserRole.JobRole added Successfully'));
            this.router.navigate(['/dashboard/manager-tools/user-roles/user-roles-list']);
          }
         },(err)=>{
        
          this.isBtnLoading = false;
          this.toastService.error(this.translate.instant('dashboard.AnnualHoliday.error,please try again')); 
         
         
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
    if(this.urlParameter&&role)
     { this.rolePowersIdList=[];
    
      role.rolePowers.forEach(element => {
      
        this.rolePowersIdList.push(element.id);
     
        
      });
    
   
      role.indexStatus=role.status?this.checked:this.notChecked;

        this.roleFormGrp.patchValue({jobRoleNameInArabic:role.jobRoleName.ar, 
          jobRoleNameInEnglish:role.jobRoleName.en, 
          descriptionInArabic: role.description?.ar,
          descriptionInEnglish: role.description?.en,
          status:role?.indexStatus,
          datarestrictionLevel:role.restrictionLevelId
        });
        this.changedRestriction(role.restrictionLevelId);
        if(role.restrictionLevelId==RestrictionLevelEnum.AccessToInformationRelatedToSchool)
    
        {
         
          role.schoolIds.forEach(selectedSchoolId => {
     
           
          this.schoolIsSelectedList.forEach(school => {
           
          if(selectedSchoolId==school.id)
          {
         
            school.isSelected=true;
            this.userRolesService.MarkedListLength.next(this.MarkedListLength+=1); 
           
          }
          
          });
          
         
        });
     
       
      //  this.userRolesService.schoolSelectedList.next(this.schoolIsSelectedList);
  

      }
      else if(role.restrictionLevelId==RestrictionLevelEnum.AccessToInformationRelatedToCurriculums)
        {role.curriculumIds.forEach(selectedCurriculumId => {
          this.curriculamList.forEach(curriculam => {
          if(selectedCurriculumId==curriculam.id)
          {
            curriculam.isSelected=true;
         
          }
        
        
          });
          
        });
       
    
        this.roleFormGrp.value.curriculumSelected=[];
        this.curriculamList.forEach((curriculam,i)=> {
          if(curriculam.isSelected==true)
          { 
           
            this.curriculumSelectedArr.at(i).setValue(true);
          }
          else
          { 
           
          this.curriculumSelectedArr.at(i).setValue('');
        }
      
        });
   
      }
    
    }else
    {
      this.jobRole={}
    }
    this.userRolesService.schoolSelectedList.next(this.schoolIsSelectedList);
   
  }
  
 

  changedRestriction(e)
  {
    

    if(e==RestrictionLevelEnum.AccessToAllSchoolInformation)
    {
      this.showCurriculamList=false;
      this.showSchoolList=false;
    }
    else if(e==RestrictionLevelEnum.AccessToInformationRelatedToCurriculums)
    {
      this.showCurriculamList=true;
      this.showSchoolList=false;
    }
    else if(e==RestrictionLevelEnum.AccessToInformationRelatedToSchool)
    {
      this.showCurriculamList=false;
      this.showSchoolList=true;
    }
  }


  getCurriculumsAdded(e,id)
  {
   
    this.curriculamList.forEach(element => {
      if(id==element.id)
      {
        element.isSelected=e.checked;
      }
    });
    
  }

  getCurriculums(){

    this.sharedService.getAllCurriculum().subscribe(
      (res)=>{this.curriculamList=res.map(curriculam=>{return {
        'id':curriculam.id,
        'name':{'ar':curriculam.name.ar,'en':curriculam.name.en},
        'isSelected':false
        }});
        
        this.curriculamList.forEach(element => {
          
          {this.curriculumSelectedArr.push(this.fb.control(''));}
        });
      })
    
  
  }



  getIsSelectedSchoolList()
  {
    this.schoolIsSelectedList=[];
    // this.filtration.Page=null;
    this.filtration.PageSize=this.schools.totalAllData;
    this.schoolsService.getAllSchools(this.filtration).subscribe((res)=>{
      this.schoolIsSelectedList=res.data.map(school=>{return {
                'id':school.id,
                'name':{'ar':school.name?.ar,'en':school.name?.en},
                'state':{'ar':school.state?.ar,'en':school.state?.en},
                'curriculum':{'ar':school.curriculum?.ar,'en':school.curriculum?.en},
                'isSelected':false
      }});
      this.schools.list=res.data;
      
        this.schools.list.forEach(school => {
         
            school.isSelected=false;
         
        });
        this.bindOldRole(this.jobRole);
   
      });
 
  }


  unSelectMe(id)
  {
    this.schoolIsSelectedList.forEach(school => {
      if(school.id==id)
      {
 
        school.isSelected=false;
        this.userRolesService.MarkedListLength.next(this.MarkedListLength-=1);
      }
    });
    this.schools.list.forEach(element => {
      if(element.id==id)
      {
        element.isSelected=false;
      }
    });

    this.userRolesService.schoolSelectedList.next(this.schoolIsSelectedList);

  }
 
  openSelectSchoolsModel()
  {
    this.sharedService.openSelectSchoolsModel.next(true);
  }
}
