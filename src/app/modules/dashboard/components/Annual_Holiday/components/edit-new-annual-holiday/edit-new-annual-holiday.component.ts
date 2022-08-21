import { Component, OnInit } from '@angular/core';

import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faCalendar,faExclamationCircle,faCheckCircle} from '@fortawesome/free-solid-svg-icons';
import { AbstractControlOptions, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { DateValidator } from './DateValidators';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-edit-new-annual-holiday',
  templateUrl: './edit-new-annual-holiday.component.html',
  styleUrls: ['./edit-new-annual-holiday.component.scss']
})
export class EditNewAnnualHolidayComponent implements OnInit{
  Isequalyear:number=0;
  schoolyear:number=0;
  subyear:number=0;

  plusicon=faPlus;
  calendericon=faCalendar;
  checkicon=faCheckCircle;
  Exclamationicon=faExclamationCircle;
  Homeicon = faHome  ;
  righticon=faArrowRight;
  calenderallowed:number=0;
  availableadd:number=0;
  AnnualHolidayFormgrp:FormGroup;
   Selectedyear:number=0;

  constructor(private fb: FormBuilder, private toastr: ToastrService,private translate:TranslateService) { 


    const formOptions: AbstractControlOptions = {
      validators: DateValidator
      
   };
   
    this.AnnualHolidayFormgrp= fb.group({
      holobj:fb.array([
      fb.group({
      name: ['', [Validators.required, Validators.maxLength(256)]],
      flexibilityStatus: ['', [Validators.required]],
      curriculum: ['', [Validators.required]],
      dateFrom: ['',[Validators.required]],
      dateTo: ['',[Validators.required]]
    }) ])
    ,
    year:['',[Validators.required]],
    smester:['',[Validators.required, Validators.maxLength(256)]]
    
    },formOptions);
  }

  ngOnInit(): void {
   
  }
  getYear(e)
  {
     console.log(e);
     this.schoolyear=e;
     if(this.subyear==this.schoolyear)
     {this.Isequalyear=1;}
     else
     {this.Isequalyear=0;}
  }
  getcalendar(e,i)
  {
    
         console.log(i.value);
         console.log(e);
         this.subyear=i.value.toString().substring(11,15)  ;
         console.log(this.subyear);
         if(this.subyear==this.schoolyear)
         {this.Isequalyear=1;}
         else
         {this.Isequalyear=0;i.setValue(""); 
         this.toastr.error(this.translate.instant('Date Must be during the school year'));
        }
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
