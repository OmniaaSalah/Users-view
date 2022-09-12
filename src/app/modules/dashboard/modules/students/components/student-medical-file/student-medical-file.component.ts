import { Component, OnInit } from '@angular/core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { HeaderObj } from 'src/app/core/models/header-obj';
import { HeaderService } from 'src/app/core/services/header/header.service';

@Component({
  selector: 'app-student-medical-file',
  templateUrl: './student-medical-file.component.html',
  styleUrls: ['./student-medical-file.component.scss']
})
export class StudentMedicalFileComponent implements OnInit {

  faCheck = faCheck

  componentHeaderData: HeaderObj = {
    breadCrump: [
      { label: this.translate.instant('dashboard.students.studentsList') },
      { label: this.translate.instant('dashboard.students.defineMedicalFile') }
    ],
    mainTitle: { main: this.translate.instant('dashboard.students.defineMedicalFile') }
  }

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

  chronicDiseases = ['أمراض القلب', 'السكرى']
  feelingDiseases = ['سيلان الأنف التحسسي ']

  constructor(
    private translate: TranslateService,
    private headerService: HeaderService
  ) { }

  ngOnInit(): void {
    this.headerService.changeHeaderdata(this.componentHeaderData)

  }

}
