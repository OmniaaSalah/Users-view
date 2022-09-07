import { Component, OnInit } from '@angular/core';
import { faCheck, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { HeaderObj } from 'src/app/core/Models/header-obj';
import { HeaderService } from 'src/app/core/services/Header/header.service';
import { LayoutService } from 'src/app/layout/services/layout/layout.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent implements OnInit {

  faCheck= faCheck
  faChevronDown= faChevronDown

  componentHeaderData: HeaderObj={
		breadCrump: [
      {label: this.translate.instant('dashboard.students.studentsList')},
      {label: this.translate.instant('dashboard.students.editStudentInfo') }
		],
    mainTitle:{main: this.translate.instant('dashboard.students.editStudentInfo')}
	}


  student=
  {
    name:'محمد على',
    age: 15,
    regestered: true,
    regesteredSchool: 'مدرسه الشارقه الابتدائيه',
    school:'مدرسه الشارقه',
    class: 'الصف الرابع',
    relativeRelation:'ابن الاخ',
    src:'assets/images/avatar.svg'
  }

  step =1

  constructor(
    private translate: TranslateService,
    private headerService:HeaderService,
    private layoutService:LayoutService
  ) { }

  ngOnInit(): void {
    this.headerService.changeHeaderdata(this.componentHeaderData)
    this.layoutService.changeTheme('dark')
  }

  
  uploadedFiles: File[] = []

  uploadFile(e){
    let file = e.target.files[0];

    if(file) this.uploadedFiles.push(file)
  }

  deleteFile(index){
    this.uploadedFiles.splice(index,1)
  }
}
