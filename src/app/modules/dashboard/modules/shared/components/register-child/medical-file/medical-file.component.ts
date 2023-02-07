import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs';
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

  get claimsEnum() {return ClaimsEnum}

  isSpeaNurse =  this.userService.isUserAllowedTo(this.claimsEnum.S_N_U_StudentHeightAndWeight)
  
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
      listOfChronicDiseases: [['أمراض القلب','السكرى']],
      listOfAllergicDiseases: [['سيلان الأنف التحسسي ']],
      disabilities: ['dff'],
      isTheSonOfDetermination: [true],
      fats: [''],
      iq:[''],
      bloc:[5],
      raise: [''],
      shortage: [4],
      dietFollowed: ['اكتب النظام الغذائي المتبع لوريم ايبسوم هو نموذج افتراضي يوضع في التصاميم لتعرض على العميل ليتصور طريقه وضع النصوص بالتصاميم سواء '],
      isAthletic: [''],
      weight: [''],
      height:[''],

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
    private sharedService:SharedService) { }


  ngOnInit(): void {
    this.getMedicalFile(this.studentId || this.childId)

    this.childService.submitBtnClicked$
    .pipe(filter(val=> val))
    .subscribe(val =>{
      if(val) this.updateMedicalFile(this.studentId||this.childId)
      this.childService.submitBtnClicked$.next(null)
      
    },(err)=>{this.childService.submitBtnClicked$.next(null)})
  }

  getMedicalFile(studentId){
    this.isLoading =true
    this.studentsService.getStudentMedicalfile(studentId)
    .subscribe(res =>{
      this.medicalFileForm.patchValue(res)
      this.isLoading =false
      this.medicalFile = res
    })
  }
  
  updateMedicalFile(studentId){
    this.studentsService.updateStudentMedicalfile(studentId,this.medicalFileForm.value)
    .subscribe(res =>{
      // this.mode = 'view'
      this.heightEditMode=false
      this.weightEditMode=false
      this.childService.onMedicalFileEditMode$.next(false)
      this.toaster.success('تم التعديل بنجاح')
      this.getMedicalFile(this.studentId)
    },err=>{
      this.heightEditMode=false
      this.weightEditMode=false
      this.childService.onMedicalFileEditMode$.next(false)
      this.toaster.error('حدث خطأ فالتعديل يرجى اعادة المحاوله')
    })
  }

  ngOnDestroy(): void {
    this.childService.onMedicalFileEditMode$.next(false)
  }

}
