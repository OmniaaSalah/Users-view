import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IHeader } from 'src/app/core/Models/header-dashboard';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { SettingsService } from '../../services/settings/settings.service';

@Component({
  selector: 'app-school-in-grace-period',
  templateUrl: './school-in-grace-period.component.html',
  styleUrls: ['./school-in-grace-period.component.scss']
})
export class SchoolInGracePeriodComponent implements OnInit {

  gracePeriodId= this.route.snapshot.queryParamMap.get('id')
  schoolId= this.route.snapshot.queryParamMap.get('schoolId')

  dashboardHeaderData:IHeader ={
    breadCrump:[
      { label: this.translate.instant('sideBar.managerTools.children.systemSettings'),routerLink: '/dashboard/manager-tools/settings',routerLinkActiveOptions:{exact: true} },
      { label: this.translate.instant('dashboard.SystemSetting.manageGracePeriod'),routerLink: '/dashboard/manager-tools/settings/grace-period/new' }

    ],
    mainTitle: {main:this.translate.instant('dashboard.SystemSetting.manageGracePeriod')}
  }

  diseases=[{name:'أمراض القلب'},{name:'فوبيا'},{name:'حساسيه'},{name:'السكرى'}];

  schoolForm= this.fb.group({
    name: this.fb.group({
      en:[''],
      ar:['']
    }),
    grades: this.fb.array([])
  })

  get gradesCtr() {return this.schoolForm.controls['grades'] as FormArray}
  
  constructor(
    private headerService:HeaderService,
    private translate:TranslateService,
    private fb:FormBuilder,
    private route:ActivatedRoute,
    private settingService :SettingsService
  ) { }

  ngOnInit(): void {
    this.headerService.Header.next(this.dashboardHeaderData);
    this.getSchoolGrades()
  }

  getSchoolGrades(){
  
    let gradesArr = this.settingService.getSchoolInGracePeriod().grades
    this.fillForm(gradesArr)

  }

  fillForm(gradesArr){
    gradesArr.forEach(el => {
      
      this.gradesCtr.push(this.fb.group({
        id: el.id ,
        isActive : el.isActive,
        name: this.fb.group({
          ar: el.name.ar,
          en: el.name.en
        }),
        divisions: [el.divisions]
      }))

    });
  }

  onSubmit(){
    
  }


}
