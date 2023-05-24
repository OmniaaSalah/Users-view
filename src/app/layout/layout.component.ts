import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { routeSlide } from '../shared/animation/animation';
import { UserService } from '../core/services/user/user.service';
import { UserScope } from '../shared/enums/user/user.enum';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations:[
    routeSlide
  ]

})
export class LayoutComponent implements OnInit {

  get name () { return 'jjjjjjjjjjjjjjjjjjjjj'}
  get currentUserScope() { return this.userService.getScope()}
  get scopeEnum () {return UserScope}

  constructor(private userService:UserService) {
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
