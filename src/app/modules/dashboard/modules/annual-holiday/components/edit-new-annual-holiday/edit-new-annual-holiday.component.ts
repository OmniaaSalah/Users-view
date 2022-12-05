import { Component, OnInit,OnDestroy } from '@angular/core';

import { ConfirmModelService } from 'src/app/shared/services/confirm-model/confirm-model.service';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Table } from 'primeng/table';
import { FileEnum } from 'src/app/shared/enums/file/file.enum';
import { UserService } from 'src/app/core/services/user/user.service';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import {  faPlus,faCalendar, faExclamationCircle, faCheck } from '@fortawesome/free-solid-svg-icons';
import { AbstractControlOptions, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { TranslateService } from '@ngx-translate/core';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AnnualHolidayService } from '../../service/annual-holiday.service';
import { IAnnualHoliday, IHoliday } from 'src/app/core/Models';
import { ExportService } from 'src/app/shared/services/export/export.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-new-annual-holiday',
  templateUrl: './edit-new-annual-holiday.component.html',
  styleUrls: ['./edit-new-annual-holiday.component.scss']
})
export class EditNewAnnualHolidayComponent implements OnInit,OnDestroy {
  isBtnLoading: boolean=false;
  openModel:boolean=false;
  exclamationIcon = faExclamationCircle;
   annualHolidayFormGrp: FormGroup;
   holidayAdded;
   availableAdded=1;
   deletedHoliday;
   holidayList;
   annualHolidayObj;
   urlParameter: string='';
   parameterInAddHoliday='';
   yearList;
   curriculumList;
   curriculumAddedList;
   statusAdded;
   holidayStatusList;
   holidayFixedLength=0;
   first=0;
   rows=6;
   subscription:Subscription;

  constructor(private exportService: ExportService,public confirmModelService: ConfirmModelService,private sharedService: SharedService,private userService: UserService,private fb: FormBuilder,private route: ActivatedRoute, private router: Router, private annualHolidayService: AnnualHolidayService, private headerService: HeaderService, private toastService: ToastService, private translate: TranslateService) {

    this.annualHolidayFormGrp = fb.group({
      year: ['', [Validators.required]],
      englishSmester: ['', [Validators.required, Validators.maxLength(256)]],
      arabicSmester: ['', [Validators.required, Validators.maxLength(256)]],
      curriculum:[''],
      status:[''],
    });
  }

  ngOnInit(): void {
    this.confirmDeleteListener();

    this.sharedService.getAllCurriculum().subscribe((res)=>{this.curriculumList=res});
    if(localStorage.getItem('holidayList'))
    {

        this.holidayList=JSON.parse(localStorage.getItem('holidayList'));
    }
    else
    {

      this.holidayList=[];
    }

    this.annualHolidayService.holidayList.next(this.holidayList);
    this.annualHolidayService.holidayList.subscribe((res)=>{this.holidayList=res;
      if(localStorage.getItem('holidayList'))
      {this.holidayFixedLength=JSON.parse(localStorage.getItem('holidayList')).length;}
    });
    this.annualHolidayService.openModel.subscribe((res)=>{this.openModel=res;})

  this.route.paramMap.subscribe(param => {

    this.urlParameter = param.get('holidayId');

    this.annualHolidayService.getAnnualHolidayByID(Number(this.urlParameter)).subscribe((res)=>{
      this.annualHolidayObj=res;
      this.bindOldHoliday(this.annualHolidayObj);
    });

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
   


  }



  get status() {
    return this. annualHolidayFormGrp.controls['status'] as FormControl;
  }
  get curriculum() {
    return this. annualHolidayFormGrp.controls['curriculum'] as FormControl;
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









  getCurriculumIds(curriculums)
  {
    this.curriculumAddedList=[];
    curriculums.forEach(element => {
      this.curriculumAddedList.push(element.id);
    });
    return this.curriculumAddedList;
  }

   saveHoliday()
   {
    this.isBtnLoading = true;
    this.annualHolidayObj={} as IAnnualHoliday;

    this.annualHolidayObj={
      annualCalendar:{ar:this.annualHolidayFormGrp.value.arabicSmester,en:this.annualHolidayFormGrp.value.englishSmester} ,
      year: this.annualHolidayFormGrp.value.year,
      holidayModels:this.holidayList.map((holiday)=>{return {
        'name':{'ar':holiday.name.ar,'en':holiday.name.en },
        'dateFrom':holiday.dateFrom,
        'dateTo': holiday.dateTo,
        'flexibilityStatus':holiday.flexibilityStatus.id,
        'curriculumIds': this.getCurriculumIds(holiday.curriculums)
        }})
     };
    

    if(this.urlParameter)
    {
      this.annualHolidayService.updateAnnualHoliday(Number(this.urlParameter),this.annualHolidayObj).subscribe((res)=>{
        this.isBtnLoading = false;
        this.toastService.success(this.translate.instant('dashboard.AnnualHoliday.Holiday edited Successfully'));
        this.router.navigate(['/dashboard/educational-settings/annual-holiday/annual-holiday-list']);
      },(err)=>{ this.isBtnLoading = false;
        this.showErrorMessage();});

    }
    else
    {
        this.annualHolidayService.addAnnualHoliday(this.annualHolidayObj).subscribe((res)=>{
          this.isBtnLoading = false;
          this.toastService.success(this.translate.instant('dashboard.AnnualHoliday.Holiday added Successfully'));
          this.router.navigate(['/dashboard/educational-settings/annual-holiday/annual-holiday-list']);
        },(err)=>{ this.isBtnLoading = false;
          this.showErrorMessage();});
    }
   }
 

  showErrorMessage()
  {
    this.toastService.error(this.translate.instant('dashboard.AnnualHoliday.error,please try again'));
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
  });
    if(this.holidayAdded.id)
    {

        this.holidayList.forEach(holiday => {
            if(holiday.id==this.holidayAdded.id)
            {
                 this.holidayList[this.holidayAdded.id-1].id=this.holidayAdded.id;
                 this.holidayList[this.holidayAdded.id-1].name.ar=this.holidayAdded.name.ar;
                 this.holidayList[this.holidayAdded.id-1].name.en=this.holidayAdded.name.en;
                 this.holidayList[this.holidayAdded.id-1].dateFrom=this.holidayAdded.dateFrom;
                 this.holidayList[this.holidayAdded.id-1].dateTo=this.holidayAdded.dateTo;
                 this.holidayList[this.holidayAdded.id-1].curriculums=this.holidayAdded.curriculums;
                 this.holidayList[this.holidayAdded.id-1].flexibilityStatus=this.holidayAdded.flexibilityStatus;

            }
          });

          this.saveInlocalStorage();
          this.annualHolidayService.holidayList.next(this.holidayList);

    }


  this.annualHolidayService.openModel.next(false);
 }

 newHoliday()
 {
  this.getHolidayNameAndYear();
  this.parameterInAddHoliday='';
  this.annualHolidayService.openModel.next(true);

 }

editHoliday(holiday)
{
 this.getHolidayNameAndYear();

  this.parameterInAddHoliday=holiday.id;
  this.annualHolidayService.editedHoliday.next(holiday);
  this.annualHolidayService.openModel.next(true);
}
confirmDeleteListener(){
  this.subscription=this.confirmModelService.confirmed$.subscribe(val => {
    if (val) this.deleteHoliday(this.deletedHoliday)
    
  })
}
deleteHoliday(id)
{

  if(this.holidayList.length > 1)
     {this.holidayList.splice(id-1, 1);}
  else
     {this.holidayList =[];}

  this.toastService.success(this.translate.instant('dashboard.AnnualHoliday.Holiday deleted Successfully'));
  this.saveInlocalStorage();
  this.annualHolidayService.holidayList.next(this.holidayList);
}
saveInlocalStorage()
{

  localStorage.removeItem('holidayList');

  localStorage.setItem('holidayList', JSON.stringify(this.holidayList));
  this.annualHolidayService.holidayList.next(this.holidayList);

}

getHolidayNameAndYear()
{
  this.annualHolidayService.annualCalendarName.next(this.annualHolidayFormGrp.value.arabicSmester);
  this.annualHolidayService.year.next(this.annualHolidayFormGrp.value.year);
}


export(fileType:FileEnum, table:Table){
  this.exportService.exportFile(fileType, table,this.holidayList)
}
filter() {

  this.holidayList=JSON.parse(localStorage.getItem('holidayList'));
  if(this.annualHolidayFormGrp.value.status!=''||this.annualHolidayFormGrp.value.curriculum)
  {
    if(this.annualHolidayFormGrp.value.status!=''&&!this.annualHolidayFormGrp.value.curriculum)
    {

      this.holidayList = this.holidayList.filter((val) =>

     val.flexibilityStatus.name.ar==this.annualHolidayFormGrp.value.status

    );
    }
    else if (this.annualHolidayFormGrp.value.status==''&&this.annualHolidayFormGrp.value.curriculum)
    {

      this.holidayList = this.holidayList.filter((val) =>

         val.curriculums[0].id==this.annualHolidayFormGrp.value.curriculum

     );
    }

    else if (this.annualHolidayFormGrp.value.status!=''&&this.annualHolidayFormGrp.value.curriculum)
    {

      this.holidayList = this.holidayList.filter((val) =>

      val.curriculums[0].id==this.annualHolidayFormGrp.value.curriculum && val.flexibilityStatus.name.ar==this.annualHolidayFormGrp.value.status

     );
    }
  }
  else
  {
    this.holidayList=JSON.parse(localStorage.getItem('holidayList'))
  }
  this.annualHolidayService.holidayList.next(this.holidayList);
}
search(keyWord){
  this.holidayList=JSON.parse(localStorage.getItem('holidayList'));

  if(keyWord)
  {

    this.holidayList = this.holidayList.filter((val) =>
    val.name.ar.toLowerCase().includes(keyWord)
    );
  }
  else
  {
    this.holidayList=JSON.parse(localStorage.getItem('holidayList'))
  }
  this.annualHolidayService.holidayList.next(this.holidayList);
  this.holidayFixedLength=JSON.parse(localStorage.getItem('holidayList')).length;


}
clearFilter(){
  this.status.setValue('');
  this.curriculum.setValue('');
  this.holidayList=JSON.parse(localStorage.getItem('holidayList'));
  this.annualHolidayService.holidayList.next(this.holidayList);
}


bindOldHoliday(holiday)
{
  if(this.urlParameter)
  {  
     
      this.annualHolidayFormGrp.patchValue({year:holiday.year,
        englishSmester:holiday.annualCalendar.en,
        arabicSmester:holiday.annualCalendar.ar,
      });
      this.holidayList=holiday.holidayModels;
      this.holidayList=this.holidayList.map((holiday,i)=>{return {
        'id':i+1,
        'name':{'ar':holiday.name.ar,'en':holiday.name.en },
        'dateFrom':holiday.dateFrom.substring(5,7)+"/"+holiday.dateFrom.substring(8,10),
        'dateTo':holiday.dateTo.substring(5,7)+"/"+holiday.dateTo.substring(8,10),
        'flexibilityStatus':this.holidayStatusList.find(s=>s.name.en==holiday.flexibilityStatus),
        'curriculums': holiday.curriculums,
        'createdDate': holiday.createdDate
        }});
    
      this.saveInlocalStorage();
  }

}
ngOnDestroy(): void {

  localStorage.removeItem('holidayList')
  this.annualHolidayService.openModel.next(false);
  this.subscription.unsubscribe();
  this.confirmModelService.confirmed$.next(null);

}

}
