import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { routeSlide } from '../shared/animation/animation';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations:[
    routeSlide
  ]

})
export class LayoutComponent implements OnInit {

  constructor(public translate: TranslateService) {
  }

  ngOnInit(): void {

  }

  routChange = true
  onActive($event, outlet){


     this.routChange =true

  }

  prepareRoute(outlet){
    return outlet && outlet.activatedRouteData
  }

}
