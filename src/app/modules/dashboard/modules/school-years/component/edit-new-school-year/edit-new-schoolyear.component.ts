import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { HeaderService } from 'src/app/core/services/header/header.service';
import { SchoolYearsService } from '../../service/school-years.service';
import { faArrowRight ,faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-edit-new-schoolyear',
  templateUrl: './edit-new-schoolyear.component.html',
  styleUrls: ['./edit-new-schoolyear.component.scss']
})
export class EditNewSchoolyearComponent implements OnInit {

  cities: string[];
  schoolyearformgrp:FormGroup;
  righticon=faArrowRight;
  exclamationicon=faExclamationCircle;
  constructor(private headerService:HeaderService,private translate:TranslateService,private schoolyearservise:SchoolYearsService,private router:Router,private fb: FormBuilder) { 

    this.schoolyearformgrp= fb.group({
     
      schoolyearname:['',[Validators.required,Validators.maxLength(32)]],
      schoolyearstartdate:['',[Validators.required]],
      schoolyearenddate:['',[Validators.required]],
      weekenddays:['',[Validators.required]],
      agedeterminationdate:['',[Validators.required]],
      annualholidayname:['',[Validators.required]],
      curriculum:['',[Validators.required]],
      activateage:['',[Validators.required]],
      agerequirementtoregisterfrominsidecountry:['',[Validators.min(1),Validators.max(32)]],
      agerequirementtoregisterfromoutsidecountry:['',[Validators.min(1),Validators.max(32)]],
      class:[''],
      knownsubjectlist:['',[Validators.required]],
      subjectstatusinfinaltotal:['',[Validators.required]],
      subjectstatus:['',[Validators.required]]
  
      });
  }

  ngOnInit(): void {
    this.headerService.Header.next(
      {'breadCrump':[
          {label: this.translate.instant('breadcrumb.School Years List'),routerLink:'/dashboard/educational-settings/school-year/school-years-list'},
          {label: this.translate.instant('breadcrumb.Add New School Year')}
        ],
        mainTitle:{main: this.translate.instant('breadcrumb.Add New School Year')}
      }
      );
      this.cities=this.schoolyearservise.cities;
  }

  get schoolyearname() {
    return this.schoolyearformgrp.controls['schoolyearname'] as FormControl;
  }

  get schoolyearstartdate() {
    return this.schoolyearformgrp.controls['schoolyearstartdate'] as FormControl;
  }

  get schoolyearenddate() {
    return this.schoolyearformgrp.controls['schoolyearenddate'] as FormControl;
  }

  get weekenddays() {
    return this.schoolyearformgrp.controls['weekenddays'] as FormControl;
  }

  get agedeterminationdate() {
    return this.schoolyearformgrp.controls['agedeterminationdate'] as FormControl;
  }
  get annualholidayname() {
    return this.schoolyearformgrp.controls['annualholidayname'] as FormControl;
  }

  get curriculum() {
    return this.schoolyearformgrp.controls['curriculum'] as FormControl;
  }
  get activateage() {
    return this.schoolyearformgrp.controls['activateage'] as FormControl;
  }
  get agerequirementtoregisterfrominsidecountry() {
    return this.schoolyearformgrp.controls['agerequirementtoregisterfrominsidecountry'] as FormControl;
  }
  get agerequirementtoregisterfromoutsidecountry() {
    return this.schoolyearformgrp.controls['agerequirementtoregisterfromoutsidecountry'] as FormControl;
  }

  get class() {
    return this.schoolyearformgrp.controls['class'] as FormControl;
  }
  get knownsubjectlist() {
    return this.schoolyearformgrp.controls['knownsubjectlist'] as FormControl;
  }
  get subjectstatusinfinaltotal() {
    return this.schoolyearformgrp.controls['subjectstatusinfinaltotal'] as FormControl;
  }
  get subjectstatus() {
    return this.schoolyearformgrp.controls['subjectstatus'] as FormControl;
  }

}
