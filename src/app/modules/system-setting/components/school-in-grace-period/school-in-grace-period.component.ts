import { Component, OnInit ,inject} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { map, take } from 'rxjs';
import { IHeader } from 'src/app/core/Models/header-dashboard';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { SettingsService } from '../../services/settings/settings.service';

@Component({
  selector: 'app-school-in-grace-period',
  templateUrl: './school-in-grace-period.component.html',
  styleUrls: ['./school-in-grace-period.component.scss']
})
export class SchoolInGracePeriodComponent implements OnInit {

  gracePeriodId= this.route.snapshot.paramMap.get('id')
  schoolId= this.route.snapshot.paramMap.get('schoolId')
  lang = inject(TranslationService).lang;
  dashboardHeaderData:IHeader ={
    breadCrump:[
      { label: this.translate.instant('sideBar.managerTools.children.systemSettings'),routerLink: '/manager-tools/settings',routerLinkActiveOptions:{exact: true} },
      { label: this.translate.instant('dashboard.SystemSetting.gracePeriodDetails'),routerLink: '/manager-tools/settings/grace-period/new' }

    ],
    mainTitle: {main:this.translate.instant('dashboard.SystemSetting.gracePeriodDetails')}
  }

  schoolDetails

  divisionsInputs=[]
  gradesDivisions={}

  schoolForm= this.fb.group({
    schoolId: [this.schoolId],
    gracePeriodId: [this.gracePeriodId],
    grades: this.fb.array([])
  })

  getGradesCtr() {return this.schoolForm.controls['grades'] as FormArray}
  getGradeCtr(index) {return this.getGradesCtr().at(index) as FormGroup}
  getDivisionsCtr(gradeIndex){ return this.getGradeCtr(gradeIndex).controls['allowedDivisions'] }

  constructor(
    private headerService:HeaderService,
    private translate:TranslateService,
    private fb:FormBuilder,
    private route:ActivatedRoute,
    private settingService :SettingsService,
    private toasterService:ToastrService,
    private router:Router
  ) { }

  ngOnInit(): void {
    if(this.gracePeriodId) this.dashboardHeaderData.breadCrump[1].routerLink =`/manager-tools/settings/grace-period/${this.gracePeriodId}/school/${this.schoolId}`
    this.headerService.Header.next(this.dashboardHeaderData);
    this.getSchoolGrades()
  }

  getSchoolGrades(){

    this.settingService.getGracePeriodSchoolDetails(this.gracePeriodId, this.schoolId).subscribe(res=>{
      this.schoolDetails=res.result
      this.fillForm(res.result.grades)
    })

    // let gradesArr = this.settingService.getSchoolInGracePeriod().grades

  }

  fillForm(gradesArr:any[]){
    gradesArr.forEach((el , index)=> {
      this.getGradesCtr().push(this.fb.group({
        gradeId: el.gradeId ,
        isAllowed : el.isAllowed,
        name: this.fb.group({
          ar: el.name.ar,
          en: el.name.en
        }),
        allowedDivisions: [el.allowedDivisions],
        divisions:[[]]
      }))

      // if there is division Selected in any Grade then we should get the list of All availiable Grade's Divisions
      if(el.allowedDivisions.length) this.getGradeDivisions(el.gradeId, index)
    });
  }


  getGradeDivisions(gradeId,index){
  this.settingService.getGradeDivision(this.schoolId,gradeId)
  .pipe(map(res => res.data))
    .subscribe(res=>{
      this.gradesDivisions[index] =res
    })
  }

  onSubmitted
  onSubmit(){
    this.onSubmitted =true
    this.settingService.updateGracePeriodSchoolDetails(this.schoolForm.value).subscribe(res=>{
        this.toasterService.success(this.translate.instant('toasterMessage.successUpdate'))
        // this.router.navigate(['../../'],{relativeTo: this.route})
        this.onSubmitted =false
    },()=>{
      this.onSubmitted =false
      this.toasterService.error(this.translate.instant('toasterMessage.error'))

    })
  }

  isOpenForSelection(i){ return this.divisionsInputs.includes(i)}

}
