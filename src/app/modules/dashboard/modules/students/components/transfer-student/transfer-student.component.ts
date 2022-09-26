import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {faPlus } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { IHeader } from 'src/app/core/Models/iheader';
import { HeaderService } from 'src/app/core/services/header-service/header.service';

type transeferBy = 'parent' | 'commission';
type Mode = 'transfer' | 'register'

@Component({
  selector: 'app-transfer-student',
  templateUrl: './transfer-student.component.html',
  styleUrls: ['./transfer-student.component.scss']
})
export class TransferStudentComponent implements OnInit {
  faPlus = faPlus
  componentHeaderData: IHeader

  transeferBy: transeferBy
  mode:Mode

  selectedScoolIndex = 0
  student =
    {
      name: 'محمد على',
      age: 15,
      regestered: false,
      regesteredSchool: 'مدرسه الشارقه الابتدائيه',
      school: 'مدرسه الشارقه',
      class: 'الصف الرابع',
      relativeRelation: 'ابن الاخ',
      src: 'assets/images/avatar.png'
    }


  constructor(
    private translate: TranslateService,
    private headerService: HeaderService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.mode = this.route.snapshot.data['mode']
    console.log(this.mode);
    

    this.setHeaderData()

  }

  setHeaderData() {
    this.componentHeaderData = {
      breadCrump: [
        { label: 'قائمه الطلاب ' ,routerLink:'/dashboard/schools-and-students/students/'},
        {
          label: this.mode == 'transfer' ? this.translate.instant('dashboard.students.transferStudent') : this.translate.instant('dashboard.students.registerChildByCommission'),routerLinkActiveOptions:{exact: true}
        }
      ],
      mainTitle: {
        main: this.mode == 'transfer' ? this.translate.instant('dashboard.students.transferStudent') : this.translate.instant('dashboard.students.registerChildByCommission')
      }
    }

    this.headerService.changeHeaderdata(this.componentHeaderData)

  }


  onSelectSchool(index) {
    this.selectedScoolIndex = index
  }

  paginationChanged(e) {

  }

}
