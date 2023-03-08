import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IHeader } from 'src/app/core/Models/header-dashboard';
import { HeaderService } from 'src/app/core/services/header-service/header.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  parent={
    name:{ar:'محمد سمير'},
    nickName:{ar:'محمد سمير'},
    birthday: '12/5/1905',
    nationality: 'قطرى',
    gender: 'ذكر',
    releatedPendingRequestNumber: 3,
    email: 'ahmed@12gmail.component',
    emiratesId: 122255552,
    phone: 12522333335,
    registrationDate: 12/5/2022,
    releatedChildreensNumber: 12
  }



  
  // students = [
  //   {
  //     name: 'محمد على',
  //     age: 15,
  //     regestered: true,
  //     regesteredSchool: 'مدرسه الشارقه الابتدائيه',
  //     school: 'مدرسه الشارقه',
  //     class: 'الصف الرابع',
  //     relativeRelation: 'ابن الاخ',
  //     src: 'assets/images/avatar.png'
  //   },
  //   {
  //     name: 'محمد على',
  //     age: 12,
  //     regestered: false,
  //     regesteredSchool: 'مدرسه الشارقه الابتدائيه',
  //     school: 'مدرسه الشارقه',
  //     class: 'الصف الرابع',
  //     relativeRelation: 'ابن الاخ',
  //     src: 'assets/images/avatar.png'

  //   },
  //   {
  //     name: 'محمد على',
  //     age: 13,
  //     regestered: true,
  //     regesteredSchool: 'مدرسه الشارقه الابتدائيه',
  //     school: 'مدرسه الشارقه',
  //     class: 'الصف الرابع',
  //     relativeRelation: 'ابن الاخ',
  //     src: 'assets/images/avatar.png'
  //   },
  //   {
  //     name: 'محمد على',
  //     age: 12,
  //     regestered: true,
  //     regesteredSchool: 'مدرسه الشارقه الابتدائيه',
  //     school: 'مدرسه الشارقه',
  //     class: 'الصف الرابع',
  //     relativeRelation: 'ابن الاخ',
  //     src: 'assets/images/avatar.png'
  //   }
  // ]


  componentHeaderData: IHeader = {
    breadCrump: [
      { label: this.translate.instant('dashboard.parents.parentInfo') ,routerLink:'/parent/profile',routerLinkActiveOptions:{exact: true}},
    ],
    mainTitle: { main: this.translate.instant('dashboard.parents.parentInfo') }
  }

  
  constructor(
    private translate: TranslateService,
    private headerService: HeaderService
  ) { }

  ngOnInit(): void {
    this.headerService.changeHeaderdata(this.componentHeaderData)
  }

}
