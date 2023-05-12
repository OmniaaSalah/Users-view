import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs';
import { ClaimsService } from 'src/app/core/services/claims.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { ClaimsEnum } from 'src/app/shared/enums/claims/claims.enum';
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
  // @Input('mode') mode : 'edit'| 'view'= 'view'
  heightEditMode
  weightEditMode

  editMode=false

  get claimsEnum() {return ClaimsEnum}

  isSpeaNurse =  this.cliamsService.isUserAllowedTo(this.claimsEnum.S_N_U_StudentHeightAndWeight)

  step=0
  booleanOptions = this.sharedService.booleanOptions
  diseases=[{name:'أمراض القلب'},{name:'فوبيا'},{name:'حساسيه'},{name:'السكرى'}];


  // << DATA PLACEHOLDER >> /
  studentId = this.route.snapshot.paramMap.get('id')
  childId = this.route.snapshot.paramMap.get('childId')


  isLoading=true
  medicalFile


    // << FORMS >> //
    medicalFileForm= this.fb.group({
      listOfChronicDiseases: [[]],
      listOfAllergicDiseases: [[]],
      disabilities: ['dff'],
      isSpecialAbilities: ['', Validators.required],
      fats: ['', Validators.required],
      hasShadower:['', Validators.required],
      bloc:[5, Validators.required],
      raise: ['', Validators.required],
      shortage: [4,Validators.required],
      dietFollowed: ['',Validators.required],
      vaccinationBook:[''],
      isAthletic: ['',Validators.required],
      weight: ['',Validators.required],
      height:['',Validators.required],
      otherNotes:['', Validators.required]

    })

    getCtr(control){
      return this.medicalFileForm.controls[control] as FormControl
    }

  constructor(
    private fb:FormBuilder,
    private studentsService: StudentsService,
    private route: ActivatedRoute,
    public childService:RegisterChildService,
    private userService:UserService,
    private toaster:ToastrService,
    private cliamsService:ClaimsService,
    private sharedService:SharedService) { }


  ngOnInit(): void {
    this.getMedicalFile(this.studentId || this.childId)

  }

  getMedicalFile(studentId){
    this.isLoading =true
    this.studentsService.getStudentMedicalfile(studentId)
    .subscribe(res =>{
      this.medicalFileForm.patchValue(res)
      this.medicalFileForm.controls['listOfChronicDiseases'].setValue(res.chronicDiseases)
      this.medicalFileForm.controls['listOfAllergicDiseases'].setValue(res.allergicDiseases)

      this.isLoading =false
      this.medicalFile = res
    })
  }
  onSubmit=false
  updateMedicalFile(studentId){
    console.log(this.medicalFileForm.value)
    this.onSubmit=true
    this.studentsService.updateStudentMedicalfile(studentId,this.medicalFileForm.value)
    .subscribe(res =>{
      // this.mode = 'view'
      this.heightEditMode=false
      this.weightEditMode=false
      this.editMode=false
      this.toaster.success('تم التعديل بنجاح')
      this.getMedicalFile(this.studentId)
      this.onSubmit=false
    },err=>{
      this.heightEditMode=false
      this.weightEditMode=false
      this.onSubmit=false
      this.toaster.error('حدث خطأ فالتعديل يرجى اعادة المحاوله')
    })
  }

  ngOnDestroy(): void {
  }

}
