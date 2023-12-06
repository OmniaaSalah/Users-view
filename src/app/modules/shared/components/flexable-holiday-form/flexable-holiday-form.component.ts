import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { switchMap } from 'rxjs';
import { DateValidators } from 'src/app/core/helpers/validation';
import { SystemRequestService } from 'src/app/modules/request-list/services/system-request.service';
import { SchoolsService } from 'src/app/modules/schools/services/schools/schools.service';

@Component({
  selector: 'app-flexable-holiday-form',
  templateUrl: './flexable-holiday-form.component.html',
  styleUrls: ['./flexable-holiday-form.component.scss']
})
export class FlexableHolidayFormComponent implements OnInit {
  @Input() mode: 'correct'|'edit'
  @Input() selectedHoliday
  @Input() schoolId
  @Input() isOpen=false
  @Input() reqInstance
  @Output() onModelClosed = new EventEmitter()

  submitted
  editHolidayForm:FormGroup
  actions
  get holidayForm(){ return this.editHolidayForm?.controls}

  constructor(
    private schoolsService:SchoolsService,
    private toastr:ToastrService,
    private fb:FormBuilder,
    private requestsService:SystemRequestService,
    private router:Router,
    private translate:TranslateService) { }

  ngOnInit(): void {
    this.initForm()
    if(this.mode=='correct') this.getRequestOptions()
  }


  initForm(){
    if(this.mode=='edit'){
      this.editHolidayForm = this.fb.group({
        schoolId: [this.schoolId],
        dateFrom:[new Date(this.selectedHoliday?.dateFrom), Validators.required],
        dateTo:[new Date(this.selectedHoliday?.dateTo), Validators.required],
        description:[this.selectedHoliday?.description, Validators.maxLength(256)],
        requestStatus:[0]
      },{validators: [
        DateValidators.greaterThanOrEqual('dateFrom', 'dateTo')
      ]})
    }else if(this.mode=='correct'){
      console.log(this.selectedHoliday);

      let fromUtc = moment.utc(this.selectedHoliday?.dateFrom?.split('+')[0]).toDate()
      let dateFrom = moment(fromUtc).local().format('YYYY-MM-DD HH:mm:ss')

      let toUtc = moment.utc(this.selectedHoliday?.dateTo?.split('+')[0]).toDate()
      let dateTo = moment(toUtc).local().format('YYYY-MM-DD HH:mm:ss')

      this.editHolidayForm = this.fb.group({
        id:[this.selectedHoliday?.requestId],
        schoolId: [this.schoolId],
        dateFrom:[new Date(this.selectedHoliday?.dateFrom), Validators.required],
        dateTo:[new Date(this.selectedHoliday?.dateTo), Validators.required],
        description:[this.selectedHoliday.description, Validators.maxLength(256)],
      },{validators: [
        DateValidators.greaterThanOrEqual('dateFrom', 'dateTo')
      ]})
    }


  }

  getRequestOptions(){
    this.requestsService.getRequestOptions(this.reqInstance).subscribe(res=>{
      this.actions = res?.options
    })
  }


  onclose(){
    this.onModelClosed.emit()
  }
  updateFlexableHoliday(){
    this.submitted = true
      this.schoolsService.sendFlexableHolidayReq(this.selectedHoliday.holidayId || this.selectedHoliday.id ||1042,this.editHolidayForm.value)
      .subscribe(res =>{
        this.submitted = false
        this.onModelClosed.emit()
        this.toastr.success(this.translate.instant('toasterMessage.requestSendSuccessfully'))
        this.router.navigate(['/performance-managment/RequestList/my-requests'],{queryParams:{isMyRequests:true}})
      },(error:Error)=>{
        this.toastr.error(error?.message || this.translate.instant('toasterMessage.error'))
        this.submitted = false
      })
  }

  resendFlexabelHolidayReq(optionId){
    this.submitted = true
    // let updatedData={
    //   ...this.returnedReqData,
    //   dateFrom: this.editHolidayForm.value.dateFrom,
    //   dateTo: this.editHolidayForm.value.dateTo,
    //   reason: this.editHolidayForm.value.description
    // }
    this.schoolsService.reSendFlexableHolidayReq({...this.editHolidayForm.value,reason: this.editHolidayForm.value.description})
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
      this.toastr.success(this.translate.instant('toasterMessage.requestResend'));
      this.onModelClosed.emit()
      // this.router.navigate(['/performance-managment/RequestList/details', this.reqInstance])

    },(error:Error)=>{
      this.toastr.error(error.message || this.translate.instant('toasterMessage.error'))
      this.submitted = false
    })
  }


}
