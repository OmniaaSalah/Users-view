import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IHeader } from 'src/app/core/Models';
import { HeaderService } from 'src/app/core/services/header-service/header.service';

@Component({
  selector: 'app-ask-for-issuance-of-a-certificate',
  templateUrl: './ask-for-issuance-of-a-certificate.component.html',
  styleUrls: ['./ask-for-issuance-of-a-certificate.component.scss'],
})
export class AskForIssuanceOfACertificateComponent implements OnInit {
  choosenStudents=[]
  step = true;
  step1 = false;
  step2 = false
  cities=[]
  childList = [
    {
      name: "asfas",
      age:"12sfsa",
      class:"12515",
      shob3a:"sda",
      relaivity:"sadffasd"
    },
    {
      name: "asfas",
      age:"12sfsa",
      class:"12515",
      shob3a:"sda",
      relaivity:"sadffasd"
    }, {
      name: "asfas",
      age:"12sfsa",
      class:"12515",
      shob3a:"sda",
      relaivity:"sadffasd"
    }
  ]
  componentHeaderData: IHeader = {
    breadCrump: [
      {
        label: this.translate.instant(
          'breadcrumb.Request to issue a certificate'
        ),
        routerLink: '/Ask-for-certificate/Ask-For-Issuance-Of-A-Certificate',
        routerLinkActiveOptions: { exact: true },
      },
    ],
    mainTitle: {
      main: this.translate.instant('breadcrumb.Request to issue a certificate'),
    },
  };
  constructor(
    private headerService: HeaderService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.headerService.changeHeaderdata(this.componentHeaderData);
    this.cities = [
      {name: 'New York', code: 'NY'},
      {name: 'Rome', code: 'RM'},
      {name: 'London', code: 'LDN'},
      {name: 'Istanbul', code: 'IST'},
      {name: 'Paris', code: 'PRS'}
  ];
  }

  increaseOrDecrease(checked,student) {
      if(checked){
        this.choosenStudents.push(student)
      }else{
        this.choosenStudents.forEach((item,index) => {
          if(student.name === item.name){ // id instead of name
            this.choosenStudents.splice(index,1)
          }
        });
      }
  }

  changeRoute(){
    this.step = false
    this.step1 = true
  }
  changeRoute2(){
    this.step = false
    this.step1 = false
    this.step2 = true
  }
  prevroute(){
    this.step=true;  
      this.step1 = false  
      this.step2 = false
  }
  prevroute2(){
    this.step=false;  
      this.step1 = true  
      this.step2 = false
  }
}
