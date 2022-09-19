import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { SchoolYearsService } from '../../service/school-years.service';
import { faArrowRight ,faExclamationCircle,faCheck } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-edit-new-schoolyear',
  templateUrl: './edit-new-schoolyear.component.html',
  styleUrls: ['./edit-new-schoolyear.component.scss']
})
export class EditNewSchoolyearComponent implements OnInit {
  checkIcon= faCheck;
  cities: string[];
  schoolYearFormGrp:FormGroup;
  rightIcon=faArrowRight;
  exclamtionIcon=faExclamationCircle;
  constructor(private headerService:HeaderService,private translate:TranslateService,private schoolYearServise:SchoolYearsService,private router:Router,private fb: FormBuilder) { 

    this.schoolYearFormGrp= fb.group({
     
      schoolYearName:['',[Validators.required,Validators.maxLength(32)]],
      schoolYearStartDate:['',[Validators.required]],
      schoolYearEndDate:['',[Validators.required]],
      weekendDays:['',[Validators.required]],
      ageDeterminationDate:['',[Validators.required]],
      annualHolidayName:['',[Validators.required]],
      curriculum:['',[Validators.required]],
      activateAge:['',[Validators.required]],
      ageRequirementToRegisterFromInsideCountry:['',[Validators.min(1),Validators.max(32)]],
      ageRequirementToRegisterFromOutsideCountry:['',[Validators.min(1),Validators.max(32)]],
      class:[''],
      knownSubjectList:['',[Validators.required]],
      subjectStatusInFinalTotal:['',[Validators.required]],
      subjectStatus:['',[Validators.required]]
  
      });
  }

  ngOnInit(): void {
    this.headerService.Header.next(
      {'breadCrump':[
          {label: this.translate.instant('breadcrumb.School Years List'),routerLink:'/dashboard/educational-settings/school-year/school-years-list',routerLinkActiveOptions:{exact: true}},
          {label: this.translate.instant('breadcrumb.Add New School Year')}
        ],
        mainTitle:{main: this.translate.instant('breadcrumb.Add New School Year')}
      }
      );
      this.cities=this.schoolYearServise.cities;
  }

  get schoolYearName() {
    return this.schoolYearFormGrp.controls['schoolYearName'] as FormControl;
  }

  get schoolYearStartDate() {
    return this.schoolYearFormGrp.controls['schoolYearStartDate'] as FormControl;
  }

  get schoolYearEndDate() {
    return this.schoolYearFormGrp.controls['schoolYearEndDate'] as FormControl;
  }

  get weekendDays() {
    return this.schoolYearFormGrp.controls['weekendDays'] as FormControl;
  }

  get ageDeterminationDate() {
    return this.schoolYearFormGrp.controls['ageDeterminationDate'] as FormControl;
  }
  get annualHolidayName() {
    return this.schoolYearFormGrp.controls['annualHolidayName'] as FormControl;
  }

  get curriculum() {
    return this.schoolYearFormGrp.controls['curriculum'] as FormControl;
  }
  get activateAge() {
    return this.schoolYearFormGrp.controls['activateAge'] as FormControl;
  }
  get ageRequirementToRegisterFromInsideCountry() {
    return this.schoolYearFormGrp.controls['ageRequirementToRegisterFromInsideCountry'] as FormControl;
  }
  get ageRequirementToRegisterFromOutsideCountry() {
    return this.schoolYearFormGrp.controls['ageRequirementToRegisterFromOutsideCountry'] as FormControl;
  }

  get class() {
    return this.schoolYearFormGrp.controls['class'] as FormControl;
  }
  get knownSubjectList() {
    return this.schoolYearFormGrp.controls['knownSubjectList'] as FormControl;
  }
  get subjectStatusInFinalTotal() {
    return this.schoolYearFormGrp.controls['subjectStatusInFinalTotal'] as FormControl;
  }
  get subjectStatus() {
    return this.schoolYearFormGrp.controls['subjectStatus'] as FormControl;
  }

}
