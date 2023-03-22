import { Component, OnInit,ViewChild,ElementRef,inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {  NgxSpinnerService } from 'ngx-spinner';
import { IHeader } from 'src/app/core/Models/header-dashboard';
import { INotification } from 'src/app/core/Models/inotification';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { NotificationService } from '../../service/notification.service';

@Component({
  selector: 'app-view-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss']
})
export class NotificationListComponent implements OnInit {
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
    "isRead": null
  }
  componentHeaderData: IHeader={
		breadCrump: [
			{label: this.translate.instant('breadcrumb.Notifications'), routerLink:'/notifications/notifications-list' }
			
		],
		mainTitle:{ main:this.translate.instant('breadcrumb.Notifications'),sub:this.notificationTotal}	}

  constructor( private headerService: HeaderService, 
               private router: Router, 
               private translate: TranslateService,
               private notificationService: NotificationService,
               private spinner:NgxSpinnerService ) { }

  ngOnInit(): void {
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
  }

  getNotifications(searchModel){   
    this.skeletonLoading = true
    this.showSpinner = false
    this.loading=true
    this.notificationService.getAllNotifications(searchModel).subscribe(res=>{
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
 
  
  showDetails(pageLink){
 
           window.open(pageLink, '_blank')
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
  }
