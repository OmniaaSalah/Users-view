import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IHeader } from 'src/app/core/Models';
import { HeaderService } from 'src/app/core/services/header-service/header.service';

@Component({
  selector: 'app-issuance-of-a-certificate',
  templateUrl: './issuance-of-a-certificate.component.html',
  styleUrls: ['./issuance-of-a-certificate.component.scss']
})
export class IssuanceOfACertificateComponent implements OnInit {

  cities: any[];

  selectedCity: any;
  componentHeaderData: IHeader={
		breadCrump: [
      {label: this.translate.instant('dashboard.students.studentsList'),routerLink:'/dashboard/schools-and-students/students/',routerLinkActiveOptions:{exact: true}},
      {label: this.translate.instant('dashboard.students.Issuing the certificate manually') }
		],
    mainTitle:{main: this.translate.instant('dashboard.students.Issuance of certificate')}
	}

  constructor(
    private translate: TranslateService,
    private headerService:HeaderService
  ) { 

    this.cities = [
      {name: 'New York', code: 'NY'},
      {name: 'Rome', code: 'RM'},
      {name: 'London', code: 'LDN'},
      {name: 'Istanbul', code: 'IST'},
      {name: 'Paris', code: 'PRS'}
  ];
  }

  ngOnInit(): void {
    this.headerService.changeHeaderdata(this.componentHeaderData)
  }

}
