import { Component, OnInit,OnDestroy } from '@angular/core';


import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { UserService } from 'src/app/core/services/user/user.service';

import {  faPlus,faCalendar, faExclamationCircle, faCheck } from '@fortawesome/free-solid-svg-icons';
import { AbstractControlOptions, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AnnualHolidayService } from '../../service/annual-holiday.service';
import { IAnnualHoliday } from 'src/app/core/Models';


@Component({
  selector: 'app-edit-new-annual-holiday',
  templateUrl: './edit-new-annual-holiday.component.html',
  styleUrls: ['./edit-new-annual-holiday.component.scss']
})
export class EditNewAnnualHolidayComponent implements OnInit,OnDestroy {
  isBtnLoading: boolean=false;
  openModel:boolean=false;
  cities: string[];
  isEqualYear: number = 0;
  schoolYear: number = 0;
  subYear: number = 0;
  plusIcon = faPlus;
  checkIcon= faCheck;
  message:string="";
  exclamationIcon = faExclamationCircle;
  rightIcon = faArrowRight;
   annualHolidayFormGrp: FormGroup;
   annualHolidayList: IAnnualHoliday[] = [];
   holidayAdded;
   availableAdded=1;
   holidayList;

   annualHolidayObj={};
   urlParameter: string='';
   parameterInAddHoliday='';
   yearList;
   curriculumList;
   holidayStatusList;
   dateFromConverted:string="";
   dateToConverted:string="";
   errorHappened:boolean=false;
   
  constructor(private userService: UserService,private fb: FormBuilder,private route: ActivatedRoute, private router: Router, private annualHolidayService: AnnualHolidayService, private headerService: HeaderService, private toastr: ToastrService, private translate: TranslateService) {

    this.annualHolidayFormGrp = fb.group({
      year: ['', [Validators.required]],
      englishSmester: ['', [Validators.required, Validators.maxLength(256)]],
      arabicSmester: ['', [Validators.required, Validators.maxLength(256)]]

    });
  }

  ngOnInit(): void {
  
    console.log("init")
    if(localStorage.getItem('holidayList'))
    { 
 
        this.holidayList=JSON.parse(localStorage.getItem('holidayList'));
    }
    else
    { 
      console.log("hello")
      this.holidayList=[];
    }
  
    this.annualHolidayService.holidayList.next(this.holidayList);
    this.annualHolidayService.holidayList.subscribe((res)=>{this.holidayList=res;});
    this.annualHolidayService.openModel.subscribe((res)=>{this.openModel=res;})

  this.route.paramMap.subscribe(param => {
    this.urlParameter = param.get('holidayId');
  });
    this.headerService.Header.next(
      {
        'breadCrump': [
          { label: this.translate.instant('dashboard.AnnualHoliday.List Of Annual Holidays'),routerLink:'/dashboard/educational-settings/annual-holiday/annual-holiday-list',routerLinkActiveOptions:{exact: true} },
          {label: (this.urlParameter==null||this.urlParameter=='')?  this.translate.instant('dashboard.AnnualHoliday.Define Annual Holidays Calendar'):this.translate.instant('dashboard.AnnualHoliday.Edit Annual Holidays Calendar'),
            routerLink: (this.urlParameter==null||this.urlParameter=='')? '/dashboard/educational-settings/annual-holiday/new-holiday':'/dashboard/educational-settings/annual-holiday/edit-holiday/'+this.urlParameter
          }
     
        ],
        'mainTitle':{main:(this.urlParameter==null||this.urlParameter=='')? this.translate.instant('dashboard.AnnualHoliday.Define Annual Holidays Calendar'):this.translate.instant('dashboard.AnnualHoliday.Edit Annual Holidays Calendar')}
     
      }
    );
   
  
    this.holidayStatusList=this.annualHolidayService.holidayStatusList;
    this.yearList=this.annualHolidayService.yearList;
   
   
   
  }
 



  get  annualHolidayFormGrpControl() {
    return this. annualHolidayFormGrp.controls;
  }

  get arabicName() {
    return this. annualHolidayFormGrp.controls['arabicName'] as FormControl;
  }
  get holiday(): FormArray {
    return this. annualHolidayFormGrp.controls['holiday'] as FormArray;
  }
  get year() {
    return this. annualHolidayFormGrp.controls['year'] as FormControl;
  }
  get englishSmester() {
    return this. annualHolidayFormGrp.controls['englishSmester'] as FormControl;
  }
  get arabicSmester() {
    return this. annualHolidayFormGrp.controls['arabicSmester'] as FormControl;
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





  
  getAllHolidays(){
    this.annualHolidayService.getAllHolidays({}).subscribe((res)=>{
  
      this.annualHolidayList=res.data;
     });

   
  }
   saveMe()
   {

    this.annualHolidayObj={ 
      annualCalendar:{ar:this.annualHolidayFormGrp.value.arabicSmester,en:this.annualHolidayFormGrp.value.englishSmester} ,
      yearId: this.annualHolidayFormGrp.value.year ,
      // holidayModels:this.curriculumIds
        };
    if(this.urlParameter)
    {
    //   this.annualHolidayAddedList.forEach(holiday => {
    //     this.annualHolidayObj={};
    //     this.convertDate(holiday);
    //     this.annualHolidayObj={'annualCalendarName':holiday.annualCalendar,
    //     'arabicName':holiday.arabicName,
    //     'flexibilityStatusId':holiday.flexibilityStatus,
    //     'curriculumId':holiday.curriculumName,
    //     'dateFrom':this.dateFromConverted,
    //     'dateTo':this.dateToConverted,
    //     'year':holiday.yearId
    //   }
    // }
    
        // this.annualHolidayService.updateAnnualHoliday(Number(this.urlParameter),this.annualHolidayObj).subscribe((res)=>{console.log(res);
        //   this.showSuccessedMessage();
        //   this.router.navigate(['/dashboard/educational-settings/annual-holiday/annual-holiday-list']);
        // },(err)=>{this.showErrorMessage();});
        
     
     
    }
    else
    { 
      // console.log(this.annualHolidayAddedList);
      // this.annualHolidayAddedList.forEach(holiday => {
      //   this.annualHolidayObj={};
      //   this.convertDate(holiday);
      //   this.annualHolidayObj={'annualCalendarName':this.annualHolidayAddedList[0].annualCalendar,
        // 'arabicName':holiday.arabicName,
        // 'flexibilityStatusId':holiday.flexibilityStatus,
        // 'curriculumId':holiday.curriculumName,
        // 'dateFrom':this.dateFromConverted,
        // 'dateTo':this.dateToConverted,
        // 'year':this.annualHolidayAddedList[0].yearId};
        // console.log(this.annualHolidayObj);
        
        // this.annualHolidayService.addAnnualHoliday(this.annualHolidayObj).subscribe((res)=>{
        //       this.showSuccessedMessage();
        //       this.router.navigate(['/dashboard/educational-settings/annual-holiday/annual-holiday-list']);
        // },(err)=>{this.errorHappened=true;this.showErrorMessage();});
        
   
      
    
       
    }
   }
   showSuccessedMessage()
  {
    this.toastr.success( this.translate.instant(this. message));
  }

  showErrorMessage()
  {
    this.toastr.error( this.translate.instant(this. message));
  }

 convertDate(holiday)
 {
  this.dateFromConverted=holiday.dateFrom.getDate()+"/"+(holiday.dateFrom.getMonth()+1);
  this.dateToConverted=holiday.dateTo.getDate()+"/"+(holiday.dateTo.getMonth()+1);
 }

 getHoliday(e)
 {
  
  this.availableAdded=1;
  this.annualHolidayService.holiday.subscribe((res)=>{
    this.holidayAdded=res;
    this.holidayList.forEach(holiday => {
      if(holiday.name.ar==this.holidayAdded.name.ar)
      {
          this.availableAdded=0;
      }
    });
    if(this.availableAdded==1)
    {
      console.log("dddddddd")
      if(this.holidayAdded.id==null||undefined)
      {
            this.holidayList.push(res);
            this.holidayList=this.holidayList.map((holiday,i)=>{return {
            'id':i+1,
            'name':{'ar':holiday.name.ar,'en':holiday.name.en },
            'dateFrom':holiday.dateFrom,
            'dateTo': holiday.dateTo,
            'flexibilityStatus':holiday.flexibilityStatus,
            'curriculums': holiday.curriculums,
            'createdDate': holiday.createdDate
            }});
        
          localStorage.setItem('holidayList', JSON.stringify(this.holidayList));
          this.annualHolidayService.holidayList.next(this.holidayList);
      }
     
    }
    if(this.holidayAdded.id)
    {
      console.log("gggg")
        this.holidayList.forEach(holiday => {
            if(holiday.id==this.holidayAdded.id)
            {
                 this.holidayList[this.holidayAdded.id].id=this.holidayAdded.id;
                 this.holidayList[this.holidayAdded.id].name.ar=this.holidayAdded.name.ar;
                 this.holidayList[this.holidayAdded.id].name.en=this.holidayAdded.name.en;
                 this.holidayList[this.holidayAdded.id].dateFrom=this.holidayAdded.dateFrom;
                 this.holidayList[this.holidayAdded.id].dateTo=this.holidayAdded.dateTo;
                 this.holidayList[this.holidayAdded.id].curriculums=this.holidayAdded.curriculums;
                 this.holidayList[this.holidayAdded.id].flexibilityStatus=this.holidayAdded.flexibilityStatus;
                  console.log(holiday)
                  console.log(this.holidayList)
            }
          });
          this.saveInlocalStorage();
          this.annualHolidayService.holidayList.next(this.holidayList);
    }

  });
  this.annualHolidayService.openModel.next(false);
 }

 newHoliday()
 {
  this.getHolidayNameAndYear();
  this.parameterInAddHoliday='';
  this.annualHolidayService.openModel.next(true);

 }
 ngOnDestroy(): void {
 
  localStorage.removeItem('holidayList')
  this.annualHolidayService.openModel.next(false);

}
editHoliday(holiday)
{
 this.getHolidayNameAndYear();
 
  this.parameterInAddHoliday=holiday.id;
  this.annualHolidayService.editedHoliday.next(holiday);
  this.annualHolidayService.openModel.next(true);
}
deleteHoliday(id)
{

  if(this.holidayList.length > 1)
     {this.holidayList.splice(id, 1);}
  else
     {this.holidayList =[];}
 
  this.saveInlocalStorage();
  this.annualHolidayService.holidayList.next(this.holidayList);
}
saveInlocalStorage()
{
 
  localStorage.removeItem('holidayList');
  console.log( localStorage.getItem('holidayList'))
  localStorage.setItem('holidayList', JSON.stringify(this.holidayList));
  console.log( localStorage.getItem('holidayList'))
}

getHolidayNameAndYear()
{
  this.annualHolidayService.annualCalendarName.next(this.annualHolidayFormGrp.value.arabicSmester);
  this.annualHolidayService.year.next(this.annualHolidayFormGrp.value.year);
}


}
