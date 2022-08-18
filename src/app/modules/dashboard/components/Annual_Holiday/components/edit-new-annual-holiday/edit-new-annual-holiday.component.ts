import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { AnnualHoliday } from 'src/app/core/Models/annual-holiday';
import { AnnualHolidayService } from 'src/app/core/services/Annual-Holiday Service/annual-holiday.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faCalendar,faExclamationCircle,faCheckCircle} from '@fortawesome/free-solid-svg-icons';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HolidayObj } from 'src/app/core/Models/holiday-obj';
import { DateValidator } from './DateValidators';

@Component({
  selector: 'app-edit-new-annual-holiday',
  templateUrl: './edit-new-annual-holiday.component.html',
  styleUrls: ['./edit-new-annual-holiday.component.scss']
})
export class EditNewAnnualHolidayComponent implements OnInit {
  value1: Date;
  value2: Date;
  value3: Date;
  value4: Date;
  plusicon=faPlus;
  calendericon=faCalendar;
  checkicon=faCheckCircle;
  Exclamationicon=faExclamationCircle;
  Homeicon = faHome  ;
  righticon=faArrowRight;
  currentHolidayid:number=0;
  newHoliday:AnnualHoliday={} as AnnualHoliday;
  currentHoliday:AnnualHoliday|undefined=undefined;
  calenderallowed:number=0;
  availableadd:number=0;
  AnnualHolidayFormgrp:FormGroup
  
  constructor(private fb: FormBuilder,private  AnnualHolidayAPIservice:AnnualHolidayService,private router:Router,private activatedroute:ActivatedRoute) { 
    this.AnnualHolidayFormgrp= fb.group({
      holobj:fb.array([
      fb.group({
      name: ['', [Validators.required, Validators.minLength(4),Validators.maxLength(256)]],
      flexibilityStatus: ['', [Validators.required, Validators.minLength(4)]],
      curriculum: ['', [Validators.required, Validators.minLength(4)]],
      dateFrom: ['',[Validators.required]],
      dateTo: ['',[Validators.required]]
    }) ])
    ,
    year:['',[Validators.required]],
    smester:['',[Validators.required, Validators.minLength(4),Validators.maxLength(256)]]
    
    },{validators:DateValidator});
  }

  ngOnInit(): void {

  }

  get AnnualHolidayFormgrpControl(){
    return this.AnnualHolidayFormgrp.controls;
  }
 

  get name() {
    return this.AnnualHolidayFormgrp.controls['name'] as FormControl;
  }
  get holobj() : FormArray {
    return this.AnnualHolidayFormgrp.controls['holobj'] as FormArray ;
  }
  get year() {
    return this.AnnualHolidayFormgrp.controls['year'] as FormControl;
  }
  get smester() {
    return this.AnnualHolidayFormgrp.controls['smester'] as FormControl;
  }
  get flexibilityStatus() {
    return this.AnnualHolidayFormgrp.controls['flexibilityStatus'] as FormControl;
  }
  get curriculum() {
    return this.AnnualHolidayFormgrp.controls['curriculum'] as FormControl;
  }

  get dateFrom() {
    return this.AnnualHolidayFormgrp.controls['dateFrom'] as FormControl;
  }
  get dateTo() {
    return this.AnnualHolidayFormgrp.controls['dateTo'] as FormControl;
  }

  


  addnew()
  {
   var availableadd=1;
    for(let i of  this.holobj.controls)
    {
      if ((i.value.name=="") ||(i.value.flexibilityStatus=="")||(i.value.dateTo=="")||(i.value.dateTo=="")||(i.value.curriculum==""))

       availableadd=0;
    }
   if(availableadd==1)
   {  
    this.holobj.push(this.fb.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
    flexibilityStatus: ['', [Validators.required, Validators.minLength(4)]],
    curriculum: ['', [Validators.required, Validators.minLength(4)]],
    dateFrom: [''],
    dateTo: ['']
  }) );}
  availableadd==1
 
  }

 


}
