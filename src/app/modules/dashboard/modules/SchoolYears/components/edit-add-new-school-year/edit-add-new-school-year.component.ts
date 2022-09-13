import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { HeaderService } from 'src/app/core/services/Header/header.service';
import { faArrowRight ,faExclamationCircle,faCheck } from '@fortawesome/free-solid-svg-icons';
import { SchoolYearService } from '../../service/school-years.service';
import { validateEvents } from 'angular-calendar/modules/common/util';
@Component({
  selector: 'app-edit-add-new-school-year',
  templateUrl: './edit-add-new-school-year.component.html',
  styleUrls: ['./edit-add-new-school-year.component.scss']
})
export class EditAddNewSchoolYearComponent implements OnInit {
  cities: string[];
  SchoolyearFormgrp:FormGroup;
  righticon=faArrowRight;
  Exclamationicon=faExclamationCircle;
  constructor(private headerService:HeaderService,private translate:TranslateService,private schoolyearservise:SchoolYearService,private router:Router,private fb: FormBuilder) { 

    this.SchoolyearFormgrp= fb.group({
     
      SchoolYearName:['',[Validators.required,Validators.maxLength(32)]],
      SchoolYearStartDate:['',[Validators.required]],
      SchoolYearEndDate:['',[Validators.required]],
      WeekEndDays:['',[Validators.required]],
      AgeDeterminationDate:['',[Validators.required]],
      AnnualHolidayName:['',[Validators.required]],
      curriculum:['',[Validators.required]],
      ActivateAge:['',[Validators.required]],
      Agerequirementtoregisterfrominsidecountry:['',[Validators.min(1),Validators.max(32)]],
      Agerequirementtoregisterfromoutsidecountry:['',[Validators.min(1),Validators.max(32)]],
      Class:[''],
      KnownSubjectList:['',[Validators.required]],
      SubjectStatusInFinalTotal:['',[Validators.required]],
      SubjectStatus:['',[Validators.required]]
  
      });
  }

  ngOnInit(): void {
    this.headerService.Header.next(
      {'breadCrump':[
          {label: this.translate.instant('breadcrumb.School Years List'),routerLink: '/dashboard/educational-settings/SchoolYear/View-SchoolYears-List'},
          {label: this.translate.instant('breadcrumb.Add New School Year')}
        ],
        mainTitle:{main: this.translate.instant('breadcrumb.Add New School Year')}
      }
      );
      this.cities=this.schoolyearservise.cities;
  }

  get SchoolYearName() {
    return this.SchoolyearFormgrp.controls['SchoolYearName'] as FormControl;
  }

  get SchoolYearStartDate() {
    return this.SchoolyearFormgrp.controls['SchoolYearStartDate'] as FormControl;
  }

  get SchoolYearEndDate() {
    return this.SchoolyearFormgrp.controls['SchoolYearEndDate'] as FormControl;
  }

  get WeekEndDays() {
    return this.SchoolyearFormgrp.controls['WeekEndDays'] as FormControl;
  }

  get AgeDeterminationDate() {
    return this.SchoolyearFormgrp.controls['AgeDeterminationDate'] as FormControl;
  }
  get AnnualHolidayName() {
    return this.SchoolyearFormgrp.controls['AnnualHolidayName'] as FormControl;
  }

  get curriculum() {
    return this.SchoolyearFormgrp.controls['curriculum'] as FormControl;
  }
  get ActivateAge() {
    return this.SchoolyearFormgrp.controls['ActivateAge'] as FormControl;
  }
  get Agerequirementtoregisterfrominsidecountry() {
    return this.SchoolyearFormgrp.controls['Agerequirementtoregisterfrominsidecountry'] as FormControl;
  }
  get Agerequirementtoregisterfromoutsidecountry() {
    return this.SchoolyearFormgrp.controls['Agerequirementtoregisterfromoutsidecountry'] as FormControl;
  }

  get Class() {
    return this.SchoolyearFormgrp.controls['Class'] as FormControl;
  }
  get KnownSubjectList() {
    return this.SchoolyearFormgrp.controls['KnownSubjectList'] as FormControl;
  }
  get SubjectStatusInFinalTotal() {
    return this.SchoolyearFormgrp.controls['SubjectStatusInFinalTotal'] as FormControl;
  }
  get SubjectStatus() {
    return this.SchoolyearFormgrp.controls['SubjectStatus'] as FormControl;
  }


}
