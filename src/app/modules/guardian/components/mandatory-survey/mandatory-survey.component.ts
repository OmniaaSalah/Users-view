import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-mandatory-survey',
  templateUrl: './mandatory-survey.component.html',
  styleUrls: ['./mandatory-survey.component.scss']
})
export class MandatorySurveyComponent implements OnInit {
  surveys=[];
openReply:boolean=false;
  constructor(private userService:UserService,private router: Router) {
    
   }

  ngOnInit(): void {
  this.getMandatorySurveys()
    
  }
  getMandatorySurveys(){

        JSON.parse( this.userService.load("serviesNumbers")).forEach(element => {
        this.surveys.push(element);
      });
  }

 
}
