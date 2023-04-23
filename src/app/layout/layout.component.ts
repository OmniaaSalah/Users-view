import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { routeSlide } from '../shared/animation/animation';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],

})
export class LayoutComponent implements OnInit {
  sideBarOpen = true;
  currentLang: string;




  constructor(public translate: TranslateService) {
    this.currentLang = localStorage.getItem('currentLang') || 'ar'
    this.translate.use(this.currentLang)
  }

  ngOnInit(): void {

  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  changeCurrentLang(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('currentLang', lang)
  }

  prepareRoute(outlet){
    return outlet && outlet.activatedRouteData
  }

}
