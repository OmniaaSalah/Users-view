import { query } from '@angular/animations';
import { Component, HostBinding, HostListener, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { tap, forkJoin, debounceTime, distinctUntilChanged, startWith, switchMap, takeUntil } from 'rxjs';
import { IHeader, INotification } from 'src/app/core/Models';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { NotificationService } from 'src/app/modules/notifications/service/notification.service';
import { MessageService } from '../../service/message.service';

@Component({
  selector: 'app-messages-main',
  templateUrl: './messages-main.component.html',
  styleUrls: ['./messages-main.component.scss']
})
export class MessagesMainComponent implements OnInit {

  @ViewChild('readBtn', { read: ElementRef, static:false }) readBtn: ElementRef;
  @ViewChild('notReadBtn', { read: ElementRef, static:false }) notReadBtn: ElementRef;

  messagetSearchText = new FormControl('')

  searchModel = {
    "keyword": null,
    "sortBy": null,
    "page": 1,
    "pageSize": 8,
    "SortColumn": null,
    "SortDirection": null,
    "curricuulumId": null,
    "StateId": null,
    "MessageStatus":null,
    "DateFrom": null,
    "DateTo": null
  }
  useId=Number(localStorage.getItem('$AJ$userId'))

  scope=JSON.parse(localStorage.getItem('$AJ$user')).scope

  display: boolean = false;
  activeLoadBtn:boolean=false;
  showSpinner:boolean=false;

  messages={
    list:[],
    total:0,
    totalAllData:0,
    loading:false
  }


  btnGroupItems=[
    {label:this.translate.instant('dashboard.Messages.answered'), active: false, value:1},
    {label:this.translate.instant('dashboard.Messages.pending'), active: false, value:0},
  ]


  loading:boolean = false;
  iteration:number=0;
  checkLanguage:boolean = false
  filterationForm: FormGroup
  componentHeaderData: IHeader={
		breadCrump: [
			{label: this.translate.instant('المحادثات'), routerLink:'/dashboard/messages/messages' }

		],
		mainTitle:{ main:this.translate.instant('المحادثات'),sub:this.messages.total},
	}

  constructor(private headerService: HeaderService,private formbuilder:FormBuilder, private toastr:ToastrService,private router: Router, private translate: TranslateService, private messageService: MessageService,private spinner:NgxSpinnerService) {
   }

  ngOnInit(): void {

    this.getMessages(this.searchModel)
    if(localStorage.getItem('preferredLanguage')=='ar'){
      this.checkLanguage = true
    }else{
      this.checkLanguage = false
    }


    this.filterationForm = this.formbuilder.group({
      DateFrom : '',
      DateTo : ''
    });

    this.filterationForm.get('DateFrom').valueChanges.subscribe(res=>{
      this.filterationForm.value.DateFrom = new Date(res[0]).toISOString()
      this.searchModel.DateFrom =  this.filterationForm.value.DateFrom
      if(res[1]){
      this.filterationForm.value.DateTo = new Date(res[1]).toISOString()
      this.searchModel.DateTo =  this.filterationForm.value.DateTo
      }
      if(this.searchModel.DateTo != null){
      this.getMessages(this.searchModel)
      }
    })


  }

  getMessages(searchModel){
    this.showSpinner = false
    this.messages.loading=true
    if(this.scope == "Guardian"){
    this.messageService.getMessagesGuardian(this.useId,searchModel).subscribe(res=>{
      this.messages.loading=false
     this.messages.list = res.data
      this.messages.total = res.total
      this.componentHeaderData.mainTitle.sub = `(${res.total})`
      this.headerService.changeHeaderdata(this.componentHeaderData);
    })
  }

  if(this.scope == "Employee"){
    this.messageService.getMessagesSchoolEmp(this.useId,searchModel).subscribe(res=>{
      this.messages.loading=false
     this.messages.list = res.data
      this.messages.total = res.total
      this.componentHeaderData.mainTitle.sub = `(${res.total})`
      this.headerService.changeHeaderdata(this.componentHeaderData);
    })
  }

  if(this.scope == "SPEA"){
    this.messageService.getMessagesSpea(this.useId,searchModel).subscribe(res=>{
      this.messages.loading=false
     this.messages.list = res.data
      this.messages.total = res.total
      this.componentHeaderData.mainTitle.sub = `(${res.total})`
      this.headerService.changeHeaderdata(this.componentHeaderData);
    })
  }

  }





  showDialog() {
    if(this.scope =="SPEA"){
      this.router.navigate(['/dashboard/messages/add-message'])
    }else{
      this.display = true;
    }
}

  closeDialog(){
    this.display = false;
  }
  // getNotReadable()
  // {
  //   this.readBtn.nativeElement.classList.remove('activeBtn')
  //   this.notReadBtn.nativeElement.classList.add('activeBtn')
  //   this.searchModel.keyword = null
  //   this.searchModel.page = 1
  //   this.searchModel.pageSize = 8
  //   this.searchModel.MessageStatus = 0
  //   this.getMessages(this.searchModel)

  // }
  // getReadable()
  // {
  //   this.readBtn.nativeElement.classList.add('activeBtn')
  //   this.notReadBtn.nativeElement.classList.remove('activeBtn')
  //   this.searchModel.keyword = null
  //   this.searchModel.page = 1
  //   this.searchModel.pageSize = 8
  //   this.searchModel.MessageStatus = 1
  //   this.getMessages(this.searchModel)
  // }


  onScroll()
  {

    if(this.messages.list.length==0){
      this.messages.loading = false
    }else{
        this.loadMore();
    }

  }

  loadMore(){
    this.searchModel.page = 1
    this.searchModel.pageSize += 8
    this.getMessages(this.searchModel)

  }


//   onSearch(e) {

//     this.searchModel.keyword = e.target.value
//     this.searchModel.page = 1
//     setTimeout(()=>{
//     this.getMessages(this.searchModel)
//     },1500)
//     if(this.messages.list.length == 0){
//       this.skeletonLoading = false
//     }
// }

// onSearchMessagesChanged(){
//   this.messagetSearchText.valueChanges
//   .pipe(
//     debounceTime(800),
//     distinctUntilChanged()
//     )
//   .subscribe(keyword=>{
//     this.searchModel.keyword = keyword
//     this.searchModel.page = 1
//     this.getMessages(this.searchModel)


//   })
// }



}
