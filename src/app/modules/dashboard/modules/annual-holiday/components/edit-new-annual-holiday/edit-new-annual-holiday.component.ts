import { Component, OnInit } from '@angular/core';


import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faCalendar, faExclamationCircle, faCheck } from '@fortawesome/free-solid-svg-icons';
import { AbstractControlOptions, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateValidator } from './date-validators';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { HeaderService } from 'src/app/core/services/header/header.service';
import { Router } from '@angular/router';
import { AnnualHolidayService } from '../../service/annual-holiday.service';


@Component({
  selector: 'app-edit-new-annual-holiday',
  templateUrl: './edit-new-annual-holiday.component.html',
  styleUrls: ['./edit-new-annual-holiday.component.scss']
})
export class EditNewAnnualHolidayComponent implements OnInit {
  cities: string[];
  isequalyear: number = 0;
  schoolyear: number = 0;
  subyear: number = 0;
  plusicon = faPlus;
  calendericon = faCalendar;
  checkicon = faCheck;
  Exclamationicon = faExclamationCircle;
  righticon = faArrowRight;
  calenderallowed: number = 0;
  availableadd: number = 0;
  annualholidayformgrp: FormGroup;
  Selectedyear: number = 0;


  constructor(private fb: FormBuilder, private router: Router, private AnnualHolidayAPIservice: AnnualHolidayService, private headerService: HeaderService, private toastr: ToastrService, private translate: TranslateService) {


    const formOptions: AbstractControlOptions = {
      validators: DateValidator

    };

    this.annualholidayformgrp = fb.group({
      holobj: fb.array([
        fb.group({
          name: ['', [Validators.required, Validators.maxLength(256)]],
          flexibilityStatus: ['', [Validators.required]],
          curriculum: ['', [Validators.required]],
          dateFrom: ['', [Validators.required]],
          dateTo: ['', [Validators.required]]
        })])
      ,
      year: ['', [Validators.required]],
      smester: ['', [Validators.required, Validators.maxLength(256)]]

    }, formOptions);
  }

  ngOnInit(): void {


    this.headerService.Header.next(
      {
        'breadCrump': [
          { label: this.translate.instant('dashboard.AnnualHoliday.List Of Annual Holidays'),routerLink:'/dashboard/educational-settings/annual-holiday/annual-holiday-list/:schoolId' },
          { label: this.translate.instant('dashboard.AnnualHoliday.Define Annual Holidays Calendar') }
        ],
        mainTitle: { main: this.translate.instant('dashboard.AnnualHoliday.Define Annual Holidays Calendar') }
      }
    );
    this.cities = this.AnnualHolidayAPIservice.cities;
  }
  getYear(e) {
    console.log(e);
    this.schoolyear = e;
    if (this.subyear == this.schoolyear) { this.isequalyear = 1; }
    else { this.isequalyear = 0; }
  }
  getcalendar(e, i) {

    console.log(i.value);
    console.log(e);
    this.subyear = i.value.toString().substring(11, 15);
    console.log(this.subyear);
    if (this.subyear == this.schoolyear) { this.isequalyear = 1; }
    else {
      this.isequalyear = 0; i.setValue("");
      this.toastr.error(this.translate.instant('dashboard.AnnualHoliday.Date Must be during the school year'));
    }
  }


  get annualholidayformgrpControl() {
    return this.annualholidayformgrp.controls;
  }

  get name() {
    return this.annualholidayformgrp.controls['name'] as FormControl;
  }
  get holobj(): FormArray {
    return this.annualholidayformgrp.controls['holobj'] as FormArray;
  }
  get year() {
    return this.annualholidayformgrp.controls['year'] as FormControl;
  }
  get smester() {
    return this.annualholidayformgrp.controls['smester'] as FormControl;
  }
  get flexibilityStatus() {
    return this.annualholidayformgrp.controls['flexibilityStatus'] as FormControl;
  }
  get curriculum() {
    return this.annualholidayformgrp.controls['curriculum'] as FormControl;
  }

  get dateFrom() {
    return this.annualholidayformgrp.controls['dateFrom'] as FormControl;
  }
  get dateTo() {
    return this.annualholidayformgrp.controls['dateTo'] as FormControl;
  }




  addnew() {
    var availableadd = 1;
    for (let i of this.holobj.controls) {
      if ((i.value.name == "") || (i.value.flexibilityStatus == "") || (i.value.dateTo == "") || (i.value.dateTo == "") || (i.value.curriculum == ""))

        availableadd = 0;
    }
    if (availableadd == 1) {
      this.holobj.push(this.fb.group({
        name: ['', [Validators.required, Validators.minLength(4)]],
        flexibilityStatus: ['', [Validators.required, Validators.minLength(4)]],
        curriculum: ['', [Validators.required, Validators.minLength(4)]],
        dateFrom: [''],
        dateTo: ['']
      }));
    }
    availableadd == 1

  }




}

