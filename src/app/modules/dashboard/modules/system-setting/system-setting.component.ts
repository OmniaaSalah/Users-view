import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { shareReplay } from 'rxjs';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { ToastrService } from 'ngx-toastr';
import { SettingsService } from './services/settings/settings.service';

@Component({
  selector: 'app-system-setting',
  templateUrl: './system-setting.component.html',
  styleUrls: ['./system-setting.component.scss']
})
export class SystemSettingComponent implements OnInit {

  lang=inject(TranslationService).lang

  dashboardHeaderData ={'breadCrump':[{ label: this.translate.instant('sideBar.managerTools.children.systemSettings'),routerLink: '/dashboard/manager-tools/settings',routerLinkActiveOptions:{exact: true} }]}
  
  currculums$ = this.sharedService.getAllCurriculum().pipe(shareReplay())
  allGrades$ = this.sharedService.getAllGrades('').pipe(shareReplay())

  faPlus= faPlus;

  step:number = 1;

  // << FORMS >> //
  rolesForm= this.fb.group({
    roles : this.fb.array([])
  })

  get rolesCtr(){ return this.rolesForm.controls['roles'] as FormArray}

  onSubmitForm



  constructor(private headerService:HeaderService,
    private sharedService:SharedService,
    private toastr:ToastrService,
    private translate:TranslateService,
    private settingService:SettingsService,
    private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.headerService.Header.next(this.dashboardHeaderData);
    this.currculums$.subscribe(res=>{

      this.getRegistrationRoles()
    })
  }

  getRegistrationRoles(){
    this.settingService.getRegistrationRoles().subscribe(res=>{
      this.fillRoles(res)
    })
  }


  fillRoles(roles:[]){
    this.rolesCtr.clear()
    roles.forEach((role:any) => {

      this.rolesCtr.push(this.fb.group({
        roleId:[role.roleId],
        oldCurriculums:[role.oldCurriculums??[]],
        newCurriculums:[role.newCurriculums??[]],
        grades:[role.grades??[]],
        isActive:[role.isActive??false]
      }))

    });
  }


  updateRoles(){
    this.settingService.updateRegistrationRoles(this.rolesForm.value.roles).subscribe(res=>{
      this.toastr.success(this.translate.instant('toasterMessage.successUpdate'))
      this.getRegistrationRoles()
      this.onSubmitForm=false
    },()=>{
      this.onSubmitForm=false
      this.toastr.error(this.translate.instant('toasterMessage.error'))
    })
  }
  
  addNewRole(){
    this.rolesCtr.push(this.fb.group({
      roleId:[0],
      oldCurriculums:[[]],
      newCurriculums:[[]],
      grades:[[]],
      isActive:[]
    }))

  }

  deleteRole(index){
    this.rolesCtr.removeAt(index)
  }






  onSubmit(step){
    
    if(step==3) {this.onSubmitForm=true; this.updateRoles()}
    if(step==4) {this.toastr.success('تم حفظ الاعدادات بنجاح')}
    if(step==5) {this.toastr.success('تم حفظ الاعدادات بنجاح')}
  }
}
