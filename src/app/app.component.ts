import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TranslationService } from './core/services/translation.service';
import { LayoutService } from './layout/services/layout/layout.service';
import { RouteListenrService } from './shared/services/route-listenr/route-listenr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'daleel-system';
  hideToolPanal:boolean =false
  hideHeader:boolean =false
  searchText=''
  message:string="";

  constructor(
    private translationService: TranslationService,
    private router:Router,
    private layoutService:LayoutService,
    private routeListenrService:RouteListenrService) { }

  firstChildHoverd = false
  lastChildHoverd = false



  ngOnInit(): void {
    this.layoutService.message.subscribe((res)=>{this.message=res;});
    this.translationService.init();

    let url = this.router.url
    this.routeListenrService.initRouteListner(url)

    this.router.events
    .pipe(
      filter(event =>event instanceof NavigationEnd ),
      tap(console.log)
      )
    .subscribe((event: NavigationEnd) => {event.url=='/auth/login'||event.url=='/auth/digital-identity' ? this.hideToolPanal = false : this.hideToolPanal = true;
    event.url=='/auth/login'||event.url=='/auth/digital-identity' ? this.hideHeader = false : this.hideHeader = true;
  })
   

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

  changeLanguage(lang: string): void {
    this.translationService.handleLanguageChange(lang);
  }
}
