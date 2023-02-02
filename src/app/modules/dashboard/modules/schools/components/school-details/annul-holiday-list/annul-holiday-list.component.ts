import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ArrayOperations } from 'src/app/core/classes/array';
import { Filtration } from 'src/app/core/classes/filtration';
import { paginationInitialState } from 'src/app/core/classes/pagination';
import { DateValidators } from 'src/app/core/classes/validation';
import { IHeader } from 'src/app/core/Models';
import { MenuItem } from 'src/app/core/models/dropdown/menu-item';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { ClaimsEnum } from 'src/app/shared/enums/claims/claims.enum';
import { FileEnum } from 'src/app/shared/enums/file/file.enum';
import { StatusEnum } from 'src/app/shared/enums/status/status.enum';
import { UserScope } from 'src/app/shared/enums/user/user.enum';
import { ExportService } from 'src/app/shared/services/export/export.service';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { AnnualHolidayService } from '../../../../annual-holiday/service/annual-holiday.service';
import { SystemRequestService } from '../../../../request-list/services/system-request.service';
import { SchoolsService } from '../../../services/schools/schools.service';

@Component({
  selector: 'app-annul-holiday-list',
  templateUrl: './annul-holiday-list.component.html',
  styleUrls: ['./annul-holiday-list.component.scss']
})
export class AnnulHolidayListComponent implements OnInit {
	currentSchool="";
  get statusEnum () {return StatusEnum}
  get claimsEnum () {return ClaimsEnum}
  currentUserScope = inject(UserService).getCurrentUserScope()
  get userScope() { return UserScope }
  filtration = {...Filtration,flexibilityStatus: ''}
  schoolId = this.route.snapshot.paramMap.get('schoolId')
  reqInstance = this.route.snapshot.queryParamMap.get('requestInstance')
  returnedReqData = JSON.parse(localStorage.getItem('returnedRequest'))

  holidayStatusList;
  componentHeaderData: IHeader = {
		breadCrump: [
		
			{ label: this.translate.instant('dashboard.schools.annualHolidays'), routerLink: `/dashboard/school-management/school/${this.schoolId}/annual-holidays`},
		],
		mainTitle: { main: this.currentSchool}
	}

  actions

  paginationState={...paginationInitialState}

  selectedHoliday
  openHolidaytModel=false

  menuItems: MenuItem[]=[
    {label: this.translate.instant('shared.edit'), icon:'assets/images/shared/pen.svg',claims:ClaimsEnum.S_EditAnnualHoliday},
    {label: this.translate.instant('dashboard.schools.sendEditHolidayReq'), icon:'assets/images/shared/list.svg',claims:ClaimsEnum.E_EditFlexableHoliday},
  ];

  holidays={
    totalAllData: 0,
    total:0,
    list:[],
    loading:true
  }


  submitted=false
  editHolidayForm = this.fb.group({
    schoolId: [this.schoolId],
    dateFrom:["", Validators.required],
    dateTo:["", Validators.required],
    description:['', Validators.maxLength(256)],
    requestStatus:[0]
  },{validators: [
    DateValidators.greaterThan('dateFrom', 'dateTo')
  ]})

  get holidayForm(){ return this.editHolidayForm.controls}

  constructor(
   
    private route: ActivatedRoute,
    private schoolsService:SchoolsService,
    private translate: TranslateService,
    private fb:FormBuilder,
    private router:Router,
    private headerService: HeaderService,
    private annualHolidayService:AnnualHolidayService,
    private sharedService:SharedService,
    private userService:UserService,
    private toastr:ToastrService,
    private exportService :ExportService,
    private requestsService:SystemRequestService
  ) { }

  ngOnInit(): void {
    if(this.currentUserScope==this.userScope.Employee)
    {
      this.userService.currentUserSchoolName$?.subscribe((res)=>{
        if(res)  
        {
          this.currentSchool=res;
        
          this.componentHeaderData.mainTitle.main=this.currentSchool;
        }
      })
    }

    if(this.reqInstance){
      this.patchReturnedRequestData(this.returnedReqData)
      this.getRequestOptions()
      this.openHolidaytModel =true
    }

    if(this.currentUserScope==UserScope.Employee) this.headerService.changeHeaderdata(this.componentHeaderData)
    this.holidayStatusList=this.annualHolidayService.holidayStatusList;
    this.getHolidays()
  }


  getRequestOptions(){
    this.requestsService.getRequestTimline(this.reqInstance).subscribe(res=>{
      this.actions = res?.task?.options
    })
  }

  patchReturnedRequestData(reqData){

    this.editHolidayForm.patchValue(reqData)

  }


  getHolidays(){
    this.sharedService.appliedFilterCount$.next(ArrayOperations.filledObjectItemsCount(this.filtration))
    this.holidays.loading=true
    this.holidays.list=[]
    this.schoolsService.getSchoolAnnualHolidays(this.schoolId,this.filtration)
    .subscribe(res=>{
      this.holidays.loading = false
      this.holidays.list = res.data
      this.holidays.totalAllData = res.totalAllData
      this.holidays.total =res.total
    },err=> {
      this.holidays.loading=false
      this.holidays.total=0
    })
  }

  editFlexableHoliday(holiday){
      this.selectedHoliday= holiday
      this.openHolidaytModel=true
  }

  editAnnualHoliday(holidayId){
    this.router.navigate(['dashboard/educational-settings/annual-holiday/edit-holiday/',holidayId])

  }

  updateFlexableHoliday(){
    this.submitted = true
      this.schoolsService.sendFlexableHolidayReq(this.selectedHoliday.id,this.editHolidayForm.value)
      .subscribe(res =>{
        this.submitted = false
        this.openHolidaytModel= false
        this.toastr.success('تم ارسال الطلب بنجاح')

      },()=>{
        this.toastr.error('حدث حطأ يرجى المحاوله مره اخرى')
        this.submitted = false
      })
  }


  resendFlexabelHolidayReq(){
    this.submitted = true
    let updatedData={
      ...this.returnedReqData,
      dateFrom: this.editHolidayForm.value.dateFrom,
      dateTo: this.editHolidayForm.value.dateTo,
      reason: this.editHolidayForm.value.description
    }
    this.schoolsService.reSendFlexableHolidayReq(this.editHolidayForm.value)
    .subscribe(res =>{
      this.submitted = false
      this.openHolidaytModel= false
      this.toastr.success('تم  إعادةإرسال الطلب بنجاح')
      this.router.navigate(['/dashboard/performance-managment/RequestList/details', this.reqInstance])

    },()=>{
      this.toastr.error('حدث حطأ يرجى المحاوله مره اخرى')
      this.submitted = false
    })
  }


  onSort(e){
  
    if(e.order==1) this.filtration.SortBy= 'old'
    else if(e.order == -1) this.filtration.SortBy= 'update'
    this.filtration.Page=1;
    this.getHolidays()
  }

  clearFilter(){
    this.filtration.KeyWord ='',
    this.filtration.flexibilityStatus='',
    this.filtration.Page=1;
    this.getHolidays()
  }


  onExport(fileType: FileEnum){
    let filter = {...this.filtration, PageSize:null}
    this.schoolsService.holidaysToExport(this.schoolId,filter).subscribe( (res) =>{
      
      this.exportService.exportFile(fileType, res, this.translate.instant('dashboard.schools.annualHolidays'))
    })
  }

  paginationChanged(event: paginationState) {
    this.filtration.Page = event.page
    this.getHolidays()

  }

}
