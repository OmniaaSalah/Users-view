import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { shareReplay } from 'rxjs';
import { TranslationService } from 'src/app/core/services/translation/translation.service';

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

  get roles(){ return this.rolesForm.controls['roles'] as FormArray}

   



  constructor(private headerService:HeaderService,
    private translate:TranslateService,
    private sharedService:SharedService,
    private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.headerService.Header.next(this.dashboardHeaderData);
  }

  
  addNewRole(){
    this.roles.push(this.fb.group({
      oldCurriculum:[[]],
      newCurriculum:[[]],
      grades:[[]],
      status:[]
    }))

  }

  deleteRole(index){
    
  }




  onSubmit(step){
    if(step==3) {}
    if(step==4) {}
    if(step==5) {}
  }
}
