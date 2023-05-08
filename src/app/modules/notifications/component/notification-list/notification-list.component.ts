import { Component, OnInit,ViewChild,ElementRef,inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Filtration } from 'src/app/core/classes/filtration';
import { IHeader } from 'src/app/core/Models/header-dashboard';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { UserInformationService } from 'src/app/modules/user-information/service/user-information.service';
import { NotificationService } from '../../service/notification.service';

@Component({
  selector: 'app-view-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss']
})
export class NotificationListComponent implements OnInit {
  notificationName;
  sender;
  unreadNotificationNumbers;
  notificationsNames=[];
  receivers=[];
  lang = inject(TranslationService).lang
  @ViewChild('readBtn', { read: ElementRef, static:false }) readBtn: ElementRef;
  @ViewChild('notReadBtn', { read: ElementRef, static:false }) notReadBtn: ElementRef;
  notificationsList=[]
  notificationTotal!:number;
  currentNotifications;
  iteration:number=0;
  loading:boolean = false;
  checkLanguage:boolean = false
  showSpinner:boolean=false;
  skeletonLoading:boolean = false
  searchModel = {
    "keyword": null,
    "sortBy": null,
    "page": 1,
    "pageSize": 3,
    "isRead": null,
    "senderIds":null,
    "arabicNotificationName":null,
    "englishNotificationName":null
  }
  componentHeaderData: IHeader={
		breadCrump: [
			{label: this.translate.instant('breadcrumb.Notifications'), routerLink:'/notifications/notifications-list' }

		],
		mainTitle:{ main:this.translate.instant('breadcrumb.Notifications'),sub:this.notificationTotal}	}

  constructor( private headerService: HeaderService,
                private userInformation:UserInformationService,
               private router: Router,
               private toastr:ToastrService,
               private translate: TranslateService,
               private notificationService: NotificationService,
               ) { }

  ngOnInit(): void {
    this.notificationService.unReadNotificationNumber.subscribe((response) => {
      this.unreadNotificationNumbers=response
    })
     this.notificationService.notificationNumber.subscribe((response) =>
     {
      this.componentHeaderData.mainTitle.sub = `(${response})`;
      this.headerService.changeHeaderdata(this.componentHeaderData); this. notificationTotal=response
     });
    this.getNotifications(this.searchModel)

    if(localStorage.getItem('preferredLanguage')=='ar'){
      this.checkLanguage = true
    }else{
      this.checkLanguage = false
    }
    this.getSendersName();
    this.getReceivers();
  }

  getSendersName()
  {

    this.notificationService.getNotificationsNames().subscribe((res)=>{this.notificationsNames=res.result})

  }

  getReceivers()
  {
    this.notificationService.getSendersNames().subscribe((res)=>{this.receivers=res.result})
  }

  getNotifications(searchModel){

   this.searchModel.arabicNotificationName= this.lang=='ar' ? this.notificationName:''
   this.searchModel.englishNotificationName= this.lang=='en' ? this.notificationName:''
    this.skeletonLoading = true
    this.showSpinner = false
    this.loading=true
    this.notificationService.getAllNotifications(this.searchModel).subscribe(res=>{
 
      this.skeletonLoading= false
      this.loading=false
      this.notificationsList = res.data  ;
      this.currentNotifications=res.total;
      this.showSpinner = true
    })

  }

  getNotReadable()
  {
    this.readBtn.nativeElement.classList.remove('activeBtn')
    this.notReadBtn.nativeElement.classList.add('activeBtn')
    this.searchModel.keyword = null
    this.searchModel.page = 1
    this.searchModel.pageSize = 3
    this.searchModel.isRead = false
    this.getNotifications(this.searchModel)
  }
  getReadable()
  {
    this.readBtn.nativeElement.classList.add('activeBtn')
    this.notReadBtn.nativeElement.classList.remove('activeBtn')
    this.searchModel.keyword = null
    this.searchModel.page = 1
    this.searchModel.pageSize = 3
    this.searchModel.isRead = true
    this.getNotifications(this.searchModel)
  }
  onSearch(e) {
    this.searchModel.keyword = e.target.value
    this.searchModel.page = 1
    setTimeout(() => {
    this.getNotifications(this.searchModel)
    }, 1500);
    if(this.notificationsList.length == 0){
      this.skeletonLoading = false
    }
  }


  showDetails(pageLink,id,isRead){
    if(pageLink) window.open(pageLink, '_blank')
    if(!isRead)
    {
      this.notificationService.unReadNotificationNumber.next(this.unreadNotificationNumbers--)
      this.getNotifications(this.searchModel)
      this.notificationService.updateNotifications({'NotificationId' : [id]}).subscribe(res=>{
      },err=>{
        this.toastr.error(this.translate.instant('Request cannot be processed, Please contact support.'))
      })
    }
       
  }







  onScroll()
  {

    // if(this.notificationsList.length)
    // {
    //     this.showSpinner=false;
    // }
    // else
    // { this.showSpinner=true;}
    if(this.notificationsList.length==0){
      this.skeletonLoading = false
    }else{
        this.loadMore();
    }
  }

  loadMore()
  {
    this.searchModel.page = 1
    this.searchModel.pageSize += 3
    this.getNotifications(this.searchModel)
  }
  clearFilter()
  {
    this.searchModel.keyword =''
    this.sender= null;
    this.notificationName= null;
    this.searchModel.arabicNotificationName= null;
    this.searchModel.englishNotificationName= null;
    this.searchModel.senderIds= null;
    this.searchModel.page=1;
    this.getNotifications(this.searchModel)

  }
  }
