import { Component, OnInit } from '@angular/core';
import { routeSlide } from 'src/app/shared/animation/animation';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations:[
    routeSlide
  ]
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  prepareRoute(outlet){
    return outlet && outlet.activatedRouteData
  }

}
