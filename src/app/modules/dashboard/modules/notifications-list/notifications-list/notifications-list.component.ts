import { Component, inject, OnInit } from "@angular/core"
import { FormBuilder } from "@angular/forms"
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import { TranslateService } from "@ngx-translate/core"
import { ToastrService } from "ngx-toastr"
import { Filtration } from "src/app/core/classes/filtration"
import { paginationInitialState } from "src/app/core/classes/pagination"
import { NotificationChannels } from "src/app/shared/enums/settings/settings.enum"
import { SettingsService } from "../../system-setting/services/settings/settings.service"
import {Notification} from "../../../../../core/models/settings/settings.model"
import { HeaderService } from "src/app/core/services/header-service/header.service"
import { TranslationService } from "src/app/core/services/translation/translation.service"
import { paginationState } from "src/app/core/models/pagination/pagination.model"


@Component({
  selector: 'app-notifications-list',
  templateUrl: './notifications-list.component.html',
  styleUrls: ['./notifications-list.component.scss']
})
export class NotificationsListComponent implements OnInit {
  lang = inject(TranslationService).lang
  faChevronLeft=faChevronLeft
  get channelEnum(){ return NotificationChannels}


  dashboardHeaderData ={'breadCrump':[{ label: this.translate.instant('breadcrumb.Notifications'),routerLink: '/dashboard/performance-managment/notifications/',routerLinkActiveOptions:{exact: true} }]}


  selectedValue='val1'
  
  filtration={...Filtration,}
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
     private headerService:HeaderService,
     private toaster:ToastrService) { }

  ngOnInit(): void {
    this.headerService.Header.next(this.dashboardHeaderData);
    this.getNotifications()
  }

  

  getNotifications(){
    this.settingService.getNotificationsList(this.filtration).subscribe((res:Notification[])=>{
      this.notifications.list=res.slice(0,5)
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


  paginationChanged(event: paginationState) {
    this.filtration.Page = event.page
    this.getNotifications()

  }

}
