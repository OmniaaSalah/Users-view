import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { filter, forkJoin } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TranslationService } from './core/services/translation/translation.service';
import { UserService } from './core/services/user/user.service';
import { MessageService } from './modules/dashboard/modules/messages/service/message.service';
import { UserScope } from './shared/enums/user/user.enum';
import { RouteListenrService } from './shared/services/route-listenr/route-listenr.service';
import { SharedService } from './shared/services/shared/shared.service';
import { PermissionsEnum } from './shared/enums/permissions/permissions.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit ,AfterViewInit{
  version= environment.version
  currentUserScope = inject(UserService).getCurrentUserScope()
  lang = inject(TranslationService).lang

  get PermissionsEnum() {return PermissionsEnum}
  hideHeader:boolean =true

  title = 'daleel-system';
  hideToolPanal:boolean =false

  searchText='';

  scope;



  display: boolean = false;
  searchModel = {
    "keyword": null,
    "sortBy": null,
    "page": 1,
    "pageSize": 6,
    "SortColumn": null,
    "SortDirection": null,
    "curricuulumId": null,
    "StateId": null
  }
  messagesTypes = []
  imagesResult =[]
  isShown1:boolean=false;
  constructor(
    private translationService: TranslationService,
    private router:Router,
    private userService:UserService,
    private routeListenrService:RouteListenrService,
    private translate: TranslateService,
    private formbuilder:FormBuilder, private toastr:ToastrService,
    private sharedService: SharedService,
    private messageService: MessageService) {
    }


  ngAfterViewInit(): void {
    this.translationService.init();
  }

  firstChildHoverd = false
  lastChildHoverd = false

  parentForm = this.formbuilder.group({
    title: ['', [Validators.required,Validators.maxLength(32)]],
    description: ['', [Validators.required,Validators.maxLength(512)]],
    messageType: ['', [Validators.required]],
    switch2: [false, [Validators.required]],
  })

  get elform(){
    return this.parentForm.controls
  }

  ngOnInit(): void {

  
    this.sharedService.scope.subscribe(res=>{
      this.scope = res
    })
    if(localStorage.getItem('$AJ$user')){
     
    }
 this.getMessagesTypes()

    this.translationService.init();

    let url = this.router.url
    this.routeListenrService.initRouteListner(url)

    this.router.events
    .pipe(
      filter(event =>event instanceof NavigationEnd ),
      )
      .subscribe((event: NavigationEnd) => {

        window.scrollTo(0, 0);
        event.url.includes('/auth/login') ? this.hideToolPanal = false : this.hideToolPanal = true;
        event.url.includes('/auth/login') ? this.hideHeader = false : this.hideHeader = true;
        if(this.currentUserScope == UserScope.Guardian)   this.hideToolPanal = false

    })
}

showDialog() {
  this.display = true;
}
getMessagesTypes(){
  this.messageService.getmessagesTypes().subscribe(res=>{
    this.messagesTypes = res.data
  })
}

uploadedFiles: any[] = [];
messageUpload(files){
  this.imagesResult = files
  // console.log(this.imagesResult);

 }

  messageDeleted(event){
    this.imagesResult = event
    // console.log(event);
  // console.log(this.imagesResult);

 }

  isToggleLabel1(e)
  {
    if(e.checked)
    {
        this.isShown1=true;

    }
    else{
        this.isShown1=false;
    }
  }
  sendMessage(){

      const form ={
        "senderId": Number(localStorage.getItem('$AJ$userId')),
        // "roleId": JSON.parse(localStorage.getItem('$AJ$user')).roles[0].id,
        "title": this.parentForm.value.title,
        "messegeText": this.parentForm.value.description,
        "messageTypeId": this.parentForm.value.messageType,
        "replyPossibility": this.parentForm.value.switch2,
        'attachment': this.imagesResult || null
      }
      console.log(form);
      this.messageService.sendDataFromEmployeeTOSPEA(form).subscribe(res=>{
        this.toastr.success('Message Sent Successfully')
        this.isShown1=false;
        this.parentForm.reset();
      },err=>{
        this.toastr.error(err)
      })
  }
  logout(){
    if(localStorage.getItem('UaeLogged')){
       this.userService.clear();
       localStorage.removeItem('UaeLogged')
       localStorage.removeItem('schoolId')
       window.location.href = `https://stg-id.uaepass.ae/idshub/logout?redirect_uri=${environment.logoutRedirectUrl}`
    }else{
      this.userService.clear();
      this.router.navigate(['/auth/login']);
    }

    // this.router.navigate(['/auth/login']);

  }


  onFirstChildHoverd(){
    this.firstChildHoverd = true
  }

  onFirstChildLeaved(){
      this.firstChildHoverd = false
  }

  onLastChildHoverd(){
    this.lastChildHoverd = true
  }

  onLastChildLeaved(){

    this.lastChildHoverd = false
  }

  changeLanguage(): void {
    this.translationService.handleLanguageChange();
  }

}
