import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './core/services/authentication.service';
import { TranslationService } from './core/services/translation.service';
import { UserService } from './core/services/user.service';
import { LayoutService } from './layout/services/layout/layout.service';
import { RouteListenrService } from './shared/services/route-listenr/route-listenr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  hideHeader:boolean =true

  title = 'daleel-system';
  hideToolPanal:boolean =false

  // hideHeader:boolean =false
  searchText='';


  isAr: boolean;
  isEn: boolean;
  arabic = 'العربية';
  english = 'English';

  constructor(
    private translationService: TranslationService,
    private router:Router,
    private layoutService:LayoutService,
    private userService:UserService,
    private routeListenrService:RouteListenrService) {
      this.isEn = this.translationService.isArabic;
    }

  firstChildHoverd = false
  lastChildHoverd = false



  ngOnInit(): void {

    this.translationService.init();

    let url = this.router.url
    this.routeListenrService.initRouteListner(url)

    this.router.events
    .pipe(
      filter(event =>event instanceof NavigationEnd ),
      )
    .subscribe((event: NavigationEnd) => {
      window.scrollTo(0, 0);
      event.url=='/auth/login' ? this.hideToolPanal = false : this.hideToolPanal = true;
      event.url=='/auth/login' ? this.hideHeader = false : this.hideHeader = true;
    })
   

  
}

  logOut(){
    this.userService.clear();
    this.router.navigate(['/auth/login']);
    
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
    const lang = this.isEn ? 'en' : 'ar';
    this.translationService.handleLanguageChange(lang);
    window.location.reload();
  }


  // title = 'daleel-system';
  // hideToolPanal:boolean =false
  // hideHeader:boolean =false
  // searchText='';

  // isAr: boolean;
  // arabic = 'العربية';
  // english = 'English';
  // firstChildHoverd = false;
  // lastChildHoverd = false;

  // constructor(
  //   private translationService: TranslationService,
  //   private router:Router,
  //   private layoutService:LayoutService,
  //   private routeListenrService:RouteListenrService) {
  //     this.isAr = this.translationService.isArabic;
  //   }






  // ngOnInit(): void {

  //   this.translationService.init();

  //   let url = this.router.url
  //   this.routeListenrService.initRouteListner(url)

  //   this.router.events
  //   .pipe(
  //     filter(event =>event instanceof NavigationEnd ),
  //     tap(console.log)
  //     )
  //   .subscribe((event: NavigationEnd) => {event.url=='/auth/login' ? this.hideToolPanal = false : this.hideToolPanal = true;
  //   event.url=='/auth/login' ? this.hideHeader = false : this.hideHeader = true;
  // })


  // }




  // onFirstChildHoverd(){
  //   this.firstChildHoverd = true
  // }

  // onFirstChildLeaved(){
  //     this.firstChildHoverd = false
  // }

  // onLastChildHoverd(){
  //   this.lastChildHoverd = true
  // }

  // onLastChildLeaved(){

  //   this.lastChildHoverd = false
  // }

  // changeLanguage(): void {
  //   const lang = this.isAr ? 'ar' : 'en';
  //   this.translationService.handleLanguageChange(lang);
  //   window.location.reload();
  // }
}
