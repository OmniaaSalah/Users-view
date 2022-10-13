import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { StudentsService } from '../../../../students/services/students/students.service';
import { RegisterChildService } from '../../../services/register-child/register-child.service';

@Component({
  selector: 'app-medical-file',
  templateUrl: './medical-file.component.html',
  styleUrls: ['./medical-file.component.scss']
})
export class MedicalFileComponent implements OnInit,OnDestroy {
  // @Input('student') student
  @Input('mode') mode : 'edit'| 'view'= 'view'
  @Output() onEdit = new EventEmitter()

  step=0
  booleanOptions = this.sharedService.booleanOptions
  diseases=[{name:'أمراض القلب'},{name:'فوبيا'},{name:'حساسيه'},{name:'السكرى'}];


    // << DATA PLACEHOLDER >> /


    // << FORMS >> //
    medicalFileForm= this.fb.group({
      id:[1],
      // chronicDiseases: [[{name:'أمراض القلب'},{name:'السكرى'}]],
      // allergicDiseases: [['سيلان الأنف التحسسي ']],
      chronicDiseases: [['أمراض القلب','السكرى']],
      allergicDiseases: [['سيلان الأنف التحسسي ']],
      disabilities: ['dff'],
      isTheSonOfDetermination: [true],
      fats: [1],
      iq:[54],
      intelligencePercentage:[],
      bloc:[21],
      // increase: [],
      // decrease: [],
      raise: [4],
      shortage: [4],
      dietFollowed: ['kjhg,'],
      isAthletic: [true],
      weight: [300],
      height:[300],
      otherNotes: ['kjyhg'],
    })

  constructor(
    private fb:FormBuilder,
    private studentsService: StudentsService,
    public childService:RegisterChildService,
    private sharedService:SharedService) { }


  ngOnInit(): void {
  }

  getMedicalFile(){

    this.studentsService.updateStudentMedicalfile(1,this.medicalFileForm.value).subscribe()
  }

  updateMedicalFile(){

  }

  ngOnDestroy(): void {
    this.childService.onEditMode$.next(false)
  }

}
