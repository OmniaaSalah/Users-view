import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IHeader } from 'src/app/core/Models/header-dashboard';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-mandatory-survey',
  templateUrl: './mandatory-survey.component.html',
  styleUrls: ['./mandatory-survey.component.scss']
})
export class MandatorySurveyComponent implements OnInit {
  surveys=[];
openReply:boolean=false;

componentHeaderData: IHeader = {
  breadCrump: [
    { label: this.translate.instant('dashboard.surveys.Mandatory Surveies') ,routerLink:'/parent/mandatory-survey',routerLinkActiveOptions:{exact: true}},
  ]
}
  constructor(private userService:UserService,private router: Router,private translate:TranslateService,private headerService:HeaderService) {
    
   }

  ngOnInit(): void {
    this.headerService.changeHeaderdata(this.componentHeaderData);
  this.getMandatorySurveys()
    
  }
  getMandatorySurveys(){

        JSON.parse( this.userService.load("serviesNumbers")).forEach(element => {
        this.surveys.push(element);
      });
  }

 
}
