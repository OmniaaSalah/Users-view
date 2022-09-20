import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  private languageKey = 'preferredLanguage';
  readonly html: HTMLElement;
  private currentLanguage: string;
  private readonly ar = 'ar';
  private readonly en = 'en';

  constructor(private translateService: TranslateService, @Inject(DOCUMENT) private document: Document) {
    this.html =  this.document.getElementsByTagName('html')[0];
    this.currentLanguage = localStorage.getItem(this.languageKey || environment.defaultLang);
  }


  init(): void {
    const lang = environment.defaultLang;
    this.translateService.setDefaultLang(lang);
    this.handleLanguageChange(lang);
  }


  handleLanguageChange(lang: string): void {
    this.translateService.use(lang);
    localStorage.setItem(this.languageKey, lang === this.ar ? this.ar : this.en);
    this.html.lang = lang;
    const currentDirection = lang === this.ar ? 'rtl' : 'ltr';
    this.document.body.dir = currentDirection;
  }
}
