import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Filtration } from 'src/app/core/classes/filtration';
import { paginationInitialState } from 'src/app/core/classes/pagination';
import { SettingsService } from '../../services/settings/settings.service';
import {Notification} from "../../../../../../core/models/settings/settings.model"
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { NotificationChannels } from 'src/app/shared/enums/settings/settings.enum';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  faChevronLeft=faChevronLeft
  get channelEnum(){ return NotificationChannels}

  selectedValue='val1'
  
  filtration={...Filtration}
  paginationState= {...paginationInitialState}
  
  notificationModelOpend = true
  
  notifications={
    totalAllData:10,
    total:8,
    list:[],
    loading:false
  }

  selectedNotification:Notification

  onSubmit=false

  notificationForm =this.fb.group({
    id: [0],
    content: this.fb.group({
      en: [''],
      ar: ['']
    }),
    channelId: [null]
  })

  

  constructor(
    private settingService:SettingsService,
     private fb:FormBuilder,
     private translate:TranslateService,
     private toaster:ToastrService) { }

  ngOnInit(): void {
    this.getNotifications()
  }

  

  getNotifications(){
    this.settingService.getNotificationsList(this.filtration).subscribe((res:Notification[])=>{
      this.notifications.list=res
    })
  }

  openNotificationModel(notification:Notification){
    this.notificationForm.patchValue(notification)
    this.notificationForm.controls.channelId.setValue(notification.channal)
    this.selectedNotification = notification
    this.notificationModelOpend=true
  }

  updateNotification(){
    this.onSubmit=true

    this.settingService.updateNotification(this.notificationForm.value).subscribe(res=>{
      this.onSubmit=false
      this.notificationModelOpend=false
      this.toaster.success(this.translate.instant('toasterMessage.successUpdate'))
      this.getNotifications()
    },err=>{
      this.onSubmit=false
      this.toaster.error(this.translate.instant('toasterMessage.error'))
    })
  }

}
