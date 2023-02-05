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
import { ClaimsEnum } from './shared/enums/claims/claims.enum';
import { HttpHandlerService } from './core/services/http/http-handler.service';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './core/services/authentication/authentication.service';
import { IndexesEnum } from './shared/enums/indexes/indexes.enum';
import { IndexesService } from './modules/dashboard/modules/indexes/service/indexes.service';
import { SettingsService } from './modules/dashboard/modules/system-setting/services/settings/settings.service';
import { FileEnum } from './shared/enums/file/file.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit ,AfterViewInit{
  get fileTypesEnum () {return FileEnum}
  currentUserName="";
  version= environment.version
  currentUserScope ;
  lang = inject(TranslationService).lang

  claimsLoaded = false
  showLogin = false

  get ClaimsEnum() {return ClaimsEnum}
  get userScope() { return UserScope }

  hideHeader:boolean =true
  hideToolPanal:boolean =false

  searchText='';





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
    private http :HttpClient,
    private userService:UserService,
    private routeListenrService:RouteListenrService,
    private translate: TranslateService,
    private formbuilder:FormBuilder, private toastr:ToastrService,
    private sharedService: SharedService,
    private authService:AuthenticationService,
    private messageService: MessageService,
    private index:IndexesService,
    private settingsService:SettingsService,) {
    }


  ngAfterViewInit(): void {
    
    
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
    
    this.translationService.init();
    this.userService.isUserLogged$.subscribe((res)=>{
      
      if(res)
      {
          this.settingsService.initializeFileRules()
          this.currentUserScope=this.userService.getCurrentUserScope();
          this.userService.getUserClaims().subscribe(res =>this.claimsLoaded = true)
          if(this.currentUserScope == this.userScope.Employee) 
          {
          this.getMessagesTypes()
          }
          this.userService.currentUserName.subscribe((res)=>{this.currentUserName=res;})
        }
   
    
    })
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
  this.index.getIndext(IndexesEnum.TtypeOfCommunicationMessage).subscribe(res=>{
    this.messagesTypes = res
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
        'attachment': this.imagesResult.map(attachment=>{
          return attachment.url
        }) || null
      }
      console.log(form);
      this.messageService.sendDataFromEmployeeTOSPEA(form).subscribe(res=>{
        this.toastr.success('Message Sent Successfully')
        this.isShown1=false;
        this.parentForm.reset();
        this.display = false
      },err=>{
        this.toastr.error(err)
      })
  }
  logout(){

   this.authService.logOut();
   this.userService.isUserLogged$.next(false);
  

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
