import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {  faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { AnnualHolidayService } from '../../service/annual-holiday.service';
@Component({
  selector: 'app-holiday-model',
  templateUrl: './holiday-model.component.html',
  styleUrls: ['./holiday-model.component.scss']
})
export class HolidayModelComponent implements OnInit {
   isOpened:boolean=false;
  @Input('Title')  Title:string;
  @Output() onSave = new EventEmitter();

  exclamationIcon = faExclamationCircle;
  annualHolidayFormGrp:FormGroup;


  constructor(private fb: FormBuilder,private holidayService:AnnualHolidayService) { 
    this.  annualHolidayFormGrp = fb.group({
    
          arabicName: ['', [Validators.required, Validators.maxLength(256)]],
          flexibilityStatus: ['', [Validators.required]],
          curriculumName: ['', [Validators.required]],
          dateFrom: ['', [Validators.required]],
          dateTo: ['', [Validators.required]],
          year: ['', [Validators.required]],
          smester: ['', [Validators.required, Validators.maxLength(256)]]

    });
  }

  ngOnInit(): void {
    this.holidayService.openModel.subscribe((res)=>{this.isOpened=res;})
  }

  get  annualHolidayFormGrpControl() {
    return this. annualHolidayFormGrp.controls;
  }

  get arabicName() {
    return this. annualHolidayFormGrp.controls['arabicName'] as FormControl;
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
  get curriculumName() {
    return this. annualHolidayFormGrp.controls['curriculumName'] as FormControl;
  }

  get dateFrom() {
    return this. annualHolidayFormGrp.controls['dateFrom'] as FormControl;
  }
  get dateTo() {
    return this. annualHolidayFormGrp.controls['dateTo'] as FormControl;
  }



  saveMe()
  {
    this.holidayService.openModel.next(false);
    this.onSave.emit()
  }
}
