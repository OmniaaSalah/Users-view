import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TranslationService } from './core/services/translation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private translationService: TranslationService) { }
  title = 'daleel-system';

  searchText=''


  firstChildHoverd = false
  lastChildHoverd = false



  ngOnInit(): void {
    this.translationService.init(environment.defaultLang)
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
