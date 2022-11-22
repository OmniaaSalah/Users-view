import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faCheck, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';

import { IHeader } from 'src/app/core/Models/header-dashboard';
import { Student } from 'src/app/core/models/student/student.model';

import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { LayoutService } from 'src/app/layout/services/layout/layout.service';
import { StudentsService } from '../../services/students/students.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent implements OnInit {

  // << ICONS >> //
  faCheck= faCheck
  faChevronDown= faChevronDown
  studentId = +this.route.snapshot.paramMap.get('id')

  // << ICONS >> //
  componentHeaderData: IHeader={
		breadCrump: [
      {label: this.translate.instant('dashboard.students.studentsList'),routerLink:'/dashboard/schools-and-students/students/',routerLinkActiveOptions:{exact: true}},
      {label: this.translate.instant('dashboard.students.editStudentInfo'),routerLink:'/dashboard/schools-and-students/students/student/'+this.studentId }
		],
    mainTitle:{main: this.translate.instant('dashboard.students.editStudentInfo')}
	}


  // << DATA PLACEHOLDER >> //
  student=
  {
    name:'محمد على',
    age: 15,
    regestered: true,
    regesteredSchool: 'مدرسه الشارقه الابتدائيه',
    school:'مدرسه الشارقه',
    class: 'الصف الرابع',
    relativeRelation:'ابن الاخ',
    src:'assets/images/avatar.png'
  }



  // << CONDITIONS >> //
  step =1



  constructor(
    private translate: TranslateService,
    private headerService:HeaderService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.headerService.changeHeaderdata(this.componentHeaderData)

  }


}
