import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

import { environment } from 'src/environments/environment';
import { PrimeNGConfig } from 'primeng/api';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  private languageKey = 'preferredLanguage';
  readonly html: HTMLElement;
  private currentLanguage: string;

    // will be emit atru value when translation [ar / en].json loaded
    showContent$ = new BehaviorSubject(false)

  get lang(): string |'ar'| 'en'{ return localStorage.getItem(this.languageKey) || environment.defaultLang}


  constructor(
    private translateService: TranslateService,
     @Inject(DOCUMENT) private document: Document,
     private config: PrimeNGConfig,) {
      this.html =  this.document.getElementsByTagName('html')[0];
  }


  init(): void {
    // const lang = environment.defaultLang;
    this.currentLanguage = localStorage.getItem(this.languageKey) || environment.defaultLang;
    localStorage.setItem(this.languageKey, this.currentLanguage);

    this.translateService.use(this.currentLanguage).subscribe(res=>[
      this.showContent$.next(true)
    ]);
    this.translateService.setDefaultLang(this.currentLanguage)
    this.translateService.get('primeng').subscribe(res => { this.config.setTranslation(res)});

    let dir = this.currentLanguage == 'ar' ? 'rtl' : 'ltr';
    document.querySelector('html')?.setAttribute('dir', dir)
    document.querySelector('html')?.setAttribute('lang', this.currentLanguage)

  }


  handleLanguageChange(): void {
    localStorage.setItem(this.languageKey, this.currentLanguage === 'ar' ? 'en' : 'ar');
    window.location.reload();
  }

}
