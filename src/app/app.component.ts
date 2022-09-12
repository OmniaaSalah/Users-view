import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TranslationService } from './core/services/translation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'daleel-system';
  hideToolPanal:boolean =false
  searchText=''
  
  constructor(private translationService: TranslationService, private router:Router) { }

  firstChildHoverd = false
  lastChildHoverd = false



  ngOnInit(): void {
    this.translationService.init(environment.defaultLang)

    this.router.events
    .pipe(
      filter(event =>event instanceof NavigationEnd ),
      tap(console.log)
      )
    .subscribe((event: NavigationEnd) => event.url=='/auth/login' ? this.hideToolPanal = false : this.hideToolPanal = true)

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
}
