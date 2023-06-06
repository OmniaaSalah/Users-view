import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { shareReplay } from 'rxjs';
import { IssuanceCertificaeService } from 'src/app/modules/issuance-of-a-certificate-pages/services/issuance-certificae.service';
import { SchoolsService } from 'src/app/modules/schools/services/schools/schools.service';
import { requestTypeEnum } from 'src/app/shared/enums/system-requests/requests.enum';
import { SharedService } from 'src/app/shared/services/shared/shared.service';

@Component({
  selector: 'app-certificates-request-details',
  templateUrl: './certificates-request-details.component.html',
  styleUrls: ['./certificates-request-details.component.scss']
})
export class CertificatesRequestDetailsComponent implements OnInit {

  @Input() requestDetails
  @Output() refresh = new EventEmitter()


  requestInstance = this.route.snapshot.paramMap.get('id')
  get requestTypeEnum(){return requestTypeEnum}


  allGrades$ = this.sharedService.getAllGrades().pipe(shareReplay())

  oldSchoolYears$ = this.sharedService.getOldSchoolYearsList()
  OldSchools$ = this.schoolsService.getOldSchools()

  stdAcademicForm =this.fb.group({
    requestId:[],
    academicSequence :this.fb.array([]),
    addedAcademicSequence :this.fb.array([])
  })

  getStudentNewAccademicArrCtr() { return this.stdAcademicForm.controls['addedAcademicSequence'] as FormArray}
  getStudentAccademicArrCtr() { return this.stdAcademicForm.controls['academicSequence'] as FormArray}

  academicSequence = []

  constructor(
    private fb:FormBuilder,
    private sharedService:SharedService,
    private schoolsService: SchoolsService,
    private certificatesService:IssuanceCertificaeService,
    private toastr:ToastrService,
    private translate:TranslateService,
    private route:ActivatedRoute) { }

  ngOnInit(): void {

    let academicSequence: any[] = this.academicYearsMapped(this.requestDetails.schoolYears.filter(el => !el.newSequence))
    let addAcademicSequence: any[] = this.academicYearsMapped(this.requestDetails.schoolYears.filter(el => el.newSequence))

    this.fillAccademicYears(academicSequence)
    this.fillAddAccademicYears(addAcademicSequence)
  }


  fillAccademicYears(years:any[]){
    years.forEach(el=>{
      this.getStudentAccademicArrCtr().push(this.fb.group({
        yearId: [el.yearId],
        schoolId: [el.schoolId],
        gradeId: [el.gradeId]
      }))
    })
  }

  fillAddAccademicYears(years: any[]){
    years.forEach(el=>{
      this.getStudentNewAccademicArrCtr().push(this.fb.group({
        yearId: [el.yearId],
        schoolId: [el.schoolId],
        gradeId: [el.gradeId]
      }))
    })
  }





  academicYearsMapped(AcademicSequence: any[]){
    return AcademicSequence.map(el=>{
      return {
        gradeId: el.gradeName?.id,
        yearId: el.schoolYear?.id,
        schoolId: el.schoolName?.id
      }
    })

  }

  isBtnLoading

  updateAcademicSequesnceReq(){

    this.isBtnLoading = true

    let body={
      ...this.stdAcademicForm.value,
      requestId: this.requestDetails?.requestNumber,
    }


    this.certificatesService.resendSequenceCertificate(body)
    .subscribe(res=>{

      this.isBtnLoading = false
      this.toastr.success(this.translate.instant('toasterMessage.successUpdate'));
      this.refresh.emit()

    }, ()=>{
      this.toastr.error(this.translate.instant('toasterMessage.error'))
      this.isBtnLoading = false
    })
  }




}
