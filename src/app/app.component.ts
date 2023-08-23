import { Component, inject, OnInit } from '@angular/core';
import {  NavigationEnd, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TranslationService } from './core/services/translation/translation.service';
import { UserService } from './core/services/user/user.service';
import { MessageService } from './modules/messages/service/message.service';
import { UserScope } from './shared/enums/user/user.enum';
import { RouteListenrService } from './shared/services/route-listenr/route-listenr.service';
import { ClaimsEnum } from './shared/enums/claims/claims.enum';
import { AuthenticationService } from './core/services/authentication/authentication.service';
import { IndexesEnum } from './shared/enums/indexes/indexes.enum';
import { IndexesService } from './modules/indexes/service/indexes.service';
import { SettingsService } from './modules/system-setting/services/settings/settings.service';
import { FileTypeEnum } from './shared/enums/file/file.enum';
import { UserInformationService } from './modules/user-information/service/user-information.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  get fileTypesEnum () {return FileTypeEnum}
  currentUserName;
  version= environment.version
  currentUserScope ;
  lang = inject(TranslationService).lang

  showLogin = false

  get ClaimsEnum() {return ClaimsEnum}
  get userScope() { return UserScope }

  hideHeader:boolean =true
  hideToolPanal:boolean =false

  searchText='';


  showContent$= this.translationService.showContent$


  display: boolean = false;

  messagesTypes$ = this.index.getIndext(IndexesEnum.TtypeOfCommunicationMessage)
  imagesResult =[]
  isShown1:boolean=false;

  constructor(
    private translationService: TranslationService,
    private router:Router,
    private userService:UserService,
    private routeListenrService:RouteListenrService,
    private translate: TranslateService,
    private formbuilder:FormBuilder, private toastr:ToastrService,
    private authService:AuthenticationService,
    private messageService: MessageService,
    private usersService:UserInformationService,
    private index:IndexesService,
    private settingsService:SettingsService,) {
    }


  firstChildHoverd = false
  lastChildHoverd = false

  parentForm = this.formbuilder.group({
    title: ['', [Validators.required,Validators.maxLength(32)]],
    description: ['', [Validators.required,Validators.maxLength(512)]],
    messageType: ['', [Validators.required]],
    switch2: [false, [Validators.required]],
  })

  ngOnInit(): void {

    // setTimeout(() => {
    //   this.showContent=true
    // }, 1000);
    this.translationService.init();
    this.settingsService.initializeFileRules()

    this.userService.isUserLogged$.subscribe((res)=>{
      if(res){
        // this.usersService.deleteUser(3081).subscribe()

          this.currentUserName=this.userService.getCurrentUserName();
          this.currentUserScope=this.userService.getScope();

        }


    })
    let url = this.router.url
    this.routeListenrService.initRouteListner(url)

    this.router.events
    .pipe(filter(event =>event instanceof NavigationEnd ))
      .subscribe((event: NavigationEnd) => {
        let prevUrl = this.routeListenrService.previousUrl.split('?')[0]
        let currUrl = event.url.split('?')[0]

        if(prevUrl !=currUrl) window.scrollTo(0, 0);
        event.url.includes('/auth/login') ? this.hideToolPanal = false : this.hideToolPanal = true;
        // event.url.includes('/auth/login') ? this.hideHeader = false : this.hideHeader = true;
        if(this.currentUserScope == UserScope.Guardian)   this.hideToolPanal = false
    })


}


  isToggleLabel1(e) {
    if(e.checked)  this.isShown1=true;
    else this.isShown1=false;

  }


  onSubmit

  sendMessage(){

      this.onSubmit =true
      const form ={
        "senderId": this.userService.getCurrentUserId(),
        // "roleId": JSON.parse(localStorage.getItem('$AJ$user')).roles[0].id,
        "title": this.parentForm.value.title,
        "messegeText": this.parentForm.value.description,
        "messageTypeId": this.parentForm.value.messageType,
        "replyPossibility": this.parentForm.value.switch2,
        'attachments': this.imagesResult
      }

      this.messageService.sendDataFromEmployeeTOSPEA(form).subscribe(res=>{
        this.toastr.success(this.translate.instant('toasterMessage.messageSend'))
        this.isShown1=false;
        this.parentForm.reset();
        this.display = false

        this.onSubmit =false
      },err=>{
        this.toastr.error(this.translate.instant('toasterMessage.error'))
        this.onSubmit =false
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
