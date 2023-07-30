import { query } from '@angular/animations';
import { Component,  OnInit, ViewChild, ElementRef, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { IHeader } from 'src/app/core/Models';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { MessageStatus } from 'src/app/shared/enums/status/status.enum';
import { UserScope } from 'src/app/shared/enums/user/user.enum';
import { MessageService } from '../../service/message.service';
import moment from 'moment';

@Component({
  selector: 'app-messages-main',
  templateUrl: './messages-main.component.html',
  styleUrls: ['./messages-main.component.scss']
})
export class MessagesMainComponent implements OnInit {
  currentUserScope = inject(UserService).getScope()
  @ViewChild('readBtn', { read: ElementRef, static:false }) readBtn: ElementRef;
  @ViewChild('notReadBtn', { read: ElementRef, static:false }) notReadBtn: ElementRef;

  lang=inject(TranslationService).lang
  get messageStatusEnum() { return MessageStatus}

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

  useId=this.userService.getCurrentUserId()
  scope=this.userService.getScope()

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
			{label: this.translate.instant('dashboard.Messages.messages'), routerLink:'/messages/messages' }

		],
		mainTitle:{ main:this.translate.instant('dashboard.Messages.messages'),sub:this.messages.total},
	}

  constructor(
    private headerService: HeaderService,private formbuilder:FormBuilder,
    private toastr:ToastrService,private router: Router, private translate: TranslateService,
    private messageService: MessageService,
    private userService:UserService
    ) {
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

    this.filterationForm.get('DateFrom').valueChanges.subscribe((res) => {
      let utc = moment.utc(res[0]).toDate()
      this.searchModel.DateFrom = moment(utc).local().format()
      // this.filterationForm.value.DateFrom = new Date(res[0]).toISOString();
      // this.searchModel.DateFrom = this.filterationForm.value.DateFrom;
      if (res[1]) {
        let utc = moment.utc(res[1]).toDate()
        this.searchModel.DateTo = moment(utc).local().format()
        this.getMessages(this.searchModel);
        // this.filterationForm.value.DateTo = new Date(res[1]).toISOString();
        // this.searchModel.DateTo = this.filterationForm.value.DateTo;
      }else{
        this.searchModel.DateTo =null
      }
    });


  }

  resetDateFilter(){
    this.filterationForm.reset()
    this.searchModel.DateTo=null
    this.searchModel.DateFrom=null
    this.getMessages(this.searchModel);
  }

  getMessages(searchModel){
    this.showSpinner = false
    this.messages.loading=true
    if(this.scope == UserScope.Guardian){
    this.messageService.getMessagesGuardian(this.useId,searchModel).subscribe(res=>{
      this.messages.loading=false
     this.messages.list = res.result.data
      this.messages.total = res.result.total
      this.messages.totalAllData = res.result.totalAllData
      this.componentHeaderData.mainTitle.sub = `(${res.result.total})`
      this.headerService.changeHeaderdata(this.componentHeaderData);
    })
  }

  if(this.scope == UserScope.Employee){
    this.messageService.getMessagesSchoolEmp(this.useId,searchModel).subscribe(res=>{
      this.messages.loading=false
     this.messages.list = res.result.data
      this.messages.total = res.result.total
      this.messages.totalAllData = res.result.totalAllData
      this.componentHeaderData.mainTitle.sub = `(${res.result.total})`
      this.headerService.changeHeaderdata(this.componentHeaderData);
    })
  }

  if(this.scope == UserScope.SPEA){
    this.messageService.getMessagesSpea(this.useId,searchModel).subscribe(res=>{
      this.messages.loading=false
     this.messages.list = res?.result.data
      this.messages.total = res?.result.total
      this.messages.totalAllData = res?.result.totalAllData
      this.componentHeaderData.mainTitle.sub = `(${res?.result.total})`
      this.headerService.changeHeaderdata(this.componentHeaderData);
    })
  }

  }





  showDialog() {
    if(this.scope == UserScope.SPEA){
      this.router.navigate(['/messages/add-message'])
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


  changeMessageStatus(id){
    this.messageService.changeMessageStatus([id]).subscribe()
  }



}
