import { Component, OnInit } from '@angular/core';


import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faCalendar, faExclamationCircle, faCheck } from '@fortawesome/free-solid-svg-icons';
import { AbstractControlOptions, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateValidator } from './date-validators';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { Router } from '@angular/router';
import { AnnualHolidayService } from '../../service/annual-holiday.service';


@Component({
  selector: 'app-edit-new-annual-holiday',
  templateUrl: './edit-new-annual-holiday.component.html',
  styleUrls: ['./edit-new-annual-holiday.component.scss']
})
export class EditNewAnnualHolidayComponent implements OnInit {
  cities: string[];
  isEqualYear: number = 0;
  schoolYear: number = 0;
  subYear: number = 0;
  plusIcon = faPlus;
  checkIcon= faCheck;
 
  exclamationIcon = faExclamationCircle;
  rightIcon = faArrowRight;

   annualHolidayFormGrp: FormGroup;
  


  constructor(private fb: FormBuilder, private router: Router, private annualHolidayService: AnnualHolidayService, private headerService: HeaderService, private toastr: ToastrService, private translate: TranslateService) {


    const formOptions: AbstractControlOptions = {
      validators: DateValidator

    };

    this.  annualHolidayFormGrp = fb.group({
      holiday: fb.array([
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
          { label: this.translate.instant('dashboard.AnnualHoliday.Define Annual Holidays Calendar') ,routerLinkActiveOptions:{exact: true} }
        ],
        mainTitle: { main: this.translate.instant('dashboard.AnnualHoliday.Define Annual Holidays Calendar') }
      }
    );
    this.cities = this.annualHolidayService.cities;
  }
  getYear(e) {
    console.log(e);
    this.schoolYear = e;
    if (this.subYear == this.schoolYear) { this.isEqualYear = 1; }
    else { this.isEqualYear = 0; }
  }
  getCalendar(e, i) {

    console.log(i.value);
    console.log(e);
    this.subYear = i.value.toString().substring(11, 15);
    console.log(this.subYear);
    if (this.subYear == this.schoolYear) { this.isEqualYear= 1; }
    else {
      this.isEqualYear = 0; i.setValue("");
      this.toastr.error(this.translate.instant('dashboard.AnnualHoliday.Date Must be during the school year'));
    }
  }


  get  annualHolidayFormGrpControl() {
    return this. annualHolidayFormGrp.controls;
  }

  get name() {
    return this. annualHolidayFormGrp.controls['name'] as FormControl;
  }
  get holiday(): FormArray {
    return this. annualHolidayFormGrp.controls['holiday'] as FormArray;
  }
  get year() {
    return this. annualHolidayFormGrp.controls['year'] as FormControl;
  }
  get smester() {
    return this. annualHolidayFormGrp.controls['smester'] as FormControl;
  }
  get flexibilityStatus() {
    return this. annualHolidayFormGrp.controls['flexibilityStatus'] as FormControl;
  }
  get curriculum() {
    return this. annualHolidayFormGrp.controls['curriculum'] as FormControl;
  }

  get dateFrom() {
    return this. annualHolidayFormGrp.controls['dateFrom'] as FormControl;
  }
  get dateTo() {
    return this. annualHolidayFormGrp.controls['dateTo'] as FormControl;
  }




  addNew() {
    var availableadd = 1;
    for (let i of this.holiday.controls) {
      if ((i.value.name == "") || (i.value.flexibilityStatus == "") || (i.value.dateTo == "") || (i.value.dateTo == "") || (i.value.curriculum == ""))

        availableadd = 0;
    }
    if (availableadd == 1) {
      this.holiday.push(this.fb.group({
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

