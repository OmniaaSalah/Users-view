import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import en from 'src/translations/en.json';
import ar from 'src/translations/ar.json';

declare var $: any;

/**
 * Pass-through function to mark a string for translation extraction.
 * Running `npm translations:extract` will include the given string by using this.
 * @param s The string to extract for translation.
 * @return The same string.
 */
export function extract(s: string) {
  return s;
}
@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  defaultLanguage!: string;
  supportedLanguages!: string[];
  public language: string;
  public languageKey = 'preferredLanguage';

  constructor(private translateService: TranslateService) {
    // Embed languages to avoid extra HTTP requests
    translateService.setTranslation('en', en);
    translateService.setTranslation('ar', ar);
  }

  /**
   * Initializes i18n for the application.
   * Loads language from local storage if present, or sets default language.
   * @param defaultLanguage The default language to use.
   * @param supportedLanguages The list of supported languages.
   */
  init(defaultLanguage: string) {
    this.defaultLanguage = defaultLanguage;
    this.language = localStorage.getItem(this.languageKey) || defaultLanguage;
    // this.language = this.language.substr(0, 2);
    console.log(this.language);
    
    this.translateService.use(this.language);
    let dir = this.language == 'ar' ? 'rtl' : 'ltr';
    document.querySelector('html')?.setAttribute('dir', dir)
    document.documentElement.setAttribute('lang', this.language);

    // localStorage.setItem(this.languageKey, this.language);
  }


  handleLanguageChange() {
    localStorage.setItem(this.languageKey, this.language == 'ar' ? 'en' : 'ar')
    // localStorage.setItem(this.languageKey, lang)
    this.init(this.language)
    // location.reload();
  }
}
