import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { HeaderObj } from 'src/app/core/Models/header-obj';
import { HeaderService } from 'src/app/core/services/Header/header.service';

@Component({
  selector: 'app-student-medical-file',
  templateUrl: './student-medical-file.component.html',
  styleUrls: ['./student-medical-file.component.scss']
})
export class StudentMedicalFileComponent implements OnInit {

  faCheck= faCheck
  
  componentHeaderData: HeaderObj={
		breadCrump: [
      {label:this.translate.instant('dashboard.students.studentsList')},
      {label: this.translate.instant('dashboard.students.defineMedicalFile')}
		],
    mainTitle: {main: this.translate.instant('dashboard.students.defineMedicalFile')}
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

  chronicDiseases=['أمراض القلب','السكرى']
  feelingDiseases=['سيلان الأنف التحسسي ']


  // << FORMS >> //
  medicalFileForm= this.fb.group({
    id:[],
    chronicDiseases: [['أمراض القلب','السكرى']],
    allergicDiseases: [['سيلان الأنف التحسسي ']],
    disabilities: [],
    isTheSonOfDetermination: [],
    fats: [],
    iq:[],
    intelligencePercentage:[],
    bloc:[],
    increase: [],
    decrease: [],
    dietFollowed: [],
    isAthletic: [],
    weight: [],
    height:[],
    otherNotes: []
  })


  constructor(
    private translate: TranslateService,
    private headerService:HeaderService,
    private fb:FormBuilder,
  ) { }

  ngOnInit(): void {
    this.headerService.changeHeaderdata(this.componentHeaderData)

  }

}
