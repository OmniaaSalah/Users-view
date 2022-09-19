import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { faCheck, faLocationDot, faPlus } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { IHeader } from 'src/app/core/Models/iheader';
import { HeaderService } from 'src/app/core/services/header-service/header.service';

type transeferBy = 'parent' | 'commission';

@Component({
  selector: 'app-transfer-student',
  templateUrl: './transfer-student.component.html',
  styleUrls: ['./transfer-student.component.scss']
})
export class TransferStudentComponent implements OnInit {
  faPlus = faPlus
  faCheck = faCheck
  faLocationDot = faLocationDot

  componentHeaderData: IHeader

  transeferBy: transeferBy
  selectedScoolIndex = 0
  student =
    {
      name: 'محمد على',
      age: 15,
      regestered: true,
      regesteredSchool: 'مدرسه الشارقه الابتدائيه',
      school: 'مدرسه الشارقه',
      class: 'الصف الرابع',
      relativeRelation: 'ابن الاخ',
      src: 'assets/images/avatar.svg'
    }


  constructor(
    private translate: TranslateService,
    private headerService: HeaderService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.transeferBy = <transeferBy>this.route.snapshot.paramMap.get('byWho').split('-')[1]
    this.setHeaderData()

  }

  setHeaderData() {
    this.componentHeaderData = {
      breadCrump: [
        { label: 'قائمه الطلاب ' ,routerLink:'/dashboard/schools-and-students/students/' ,routerLinkActiveOptions:{exact: true}},
        {
          label: this.transeferBy == 'parent' ? this.translate.instant('dashboard.students.transferStudent') : this.translate.instant('dashboard.students.registerChildByCommission')
        }
      ],
      mainTitle: {
        main: this.transeferBy == 'parent' ? this.translate.instant('dashboard.students.transferStudent') : this.translate.instant('dashboard.students.registerChildByCommission')
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
