import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { map, switchMap } from 'rxjs';
import { ArrayOperations } from 'src/app/core/classes/array';
import { Filtration } from 'src/app/core/classes/filtration';
import { paginationInitialState } from 'src/app/core/classes/pagination';
import { DateValidators } from 'src/app/core/classes/validation';
import { IHeader } from 'src/app/core/Models';
import { MenuItem } from 'src/app/core/models/dropdown/menu-item';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { ClaimsEnum } from 'src/app/shared/enums/claims/claims.enum';
import { FileTypeEnum } from 'src/app/shared/enums/file/file.enum';
import { HttpStatusCodeEnum } from 'src/app/shared/enums/http-status-code/http-status-code.enum';
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
  lang = inject(TranslationService).lang
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

			{ label: this.translate.instant('dashboard.schools.annualHolidays'), routerLink: `/school-management/school/${this.schoolId}/annual-holidays`},
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
          this.currentSchool= JSON.parse(res);
          this.componentHeaderData.mainTitle.main=this.currentSchool[this.lang];
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
    this.requestsService.getRequestOptions(this.reqInstance).subscribe(res=>{
      this.actions = res?.options
    })
  }

  patchReturnedRequestData(reqData){

    this.editHolidayForm.patchValue({...reqData,dateFrom:new Date(reqData.dateFrom),dateTo:new Date(reqData.dateTo)})

  }


  getHolidays(){
    this.sharedService.appliedFilterCount$.next(ArrayOperations.filledObjectItemsCount(this.filtration))
    this.holidays.loading=true
    this.holidays.list=[]
    this.schoolsService.getSchoolAnnualHolidays(this.schoolId,this.filtration)
    .subscribe(res=>{
      this.sharedService.filterLoading.next(false);
      this.holidays.loading = false
      this.holidays.list = res.data
      this.holidays.totalAllData = res.totalAllData
      this.holidays.total =res.total
    },err=> {
      this.holidays.loading=false
      this.holidays.total=0
      this.sharedService.filterLoading.next(false);
    })
  }

  editFlexableHoliday(holiday){
      this.selectedHoliday= holiday
      this.openHolidaytModel=true
  }

  editAnnualHoliday(holidayId){
    this.router.navigate(['/educational-settings/annual-holiday/edit-holiday/',holidayId])

  }

  updateFlexableHoliday(){
    this.submitted = true
      this.schoolsService.sendFlexableHolidayReq(this.selectedHoliday.id,this.editHolidayForm.value)
      .subscribe(res =>{
        this.submitted = false
        this.openHolidaytModel= false
        this.toastr.success(this.translate.instant('toasterMessage.requestSendSuccessfully'))

      },(error:Error)=>{
        this.toastr.error(error?.message || this.translate.instant('toasterMessage.error'))
        this.submitted = false
      })
  }


  resendFlexabelHolidayReq(optionId){
    this.submitted = true
    let updatedData={
      ...this.returnedReqData,
      dateFrom: this.editHolidayForm.value.dateFrom,
      dateTo: this.editHolidayForm.value.dateTo,
      reason: this.editHolidayForm.value.description
    }
    this.schoolsService.reSendFlexableHolidayReq(updatedData)
    .pipe(
      switchMap(()=>{
        let reqActionsForm={
          comments:'',
          optionId: optionId,
          rejectionReasonId: 0,
          rejectionReason:'',
          attachments:[]
        }
        return this.requestsService.changeRequestState(reqActionsForm)
      })
    )
    .subscribe(res =>{
      this.submitted = false
      this.openHolidaytModel= false
      this.toastr.success(this.translate.instant('toasterMessage.requestResend'));
      this.router.navigate(['/performance-managment/RequestList/details', this.reqInstance])

    },(error:Error)=>{
      this.toastr.error(error.message || this.translate.instant('toasterMessage.error'))
      this.submitted = false
    })
  }


  onSort(e){

    if(e.order==-1)
    {this.filtration.SortBy="ASC"}
    else
    {this.filtration.SortBy="desc"}
    this.filtration.SortColumnName=e.field;
    this.filtration.Page=1;
    this.getHolidays()
  }

  clearFilter(){
    this.filtration.KeyWord ='',
    this.filtration.flexibilityStatus='',
    this.filtration.Page=1;
    this.getHolidays()
  }


  onExport(fileType: FileTypeEnum){
    let filter = {...this.filtration,PageSize:this.holidays.totalAllData,Page:1}
    this.schoolsService.holidaysToExport(this.schoolId,filter).subscribe( (res) =>{

      this.exportService.exportFile(fileType, res, this.translate.instant('dashboard.schools.annualHolidays'))
    })
  }

  paginationChanged(event: paginationState) {
    this.filtration.Page = event.page
    this.getHolidays()

  }

}
