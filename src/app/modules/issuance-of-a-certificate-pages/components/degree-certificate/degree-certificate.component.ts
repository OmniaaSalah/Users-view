import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { CertificatesEnum } from 'src/app/shared/enums/certficates/certificate.enum';
import { CurriculumCodeEnum, GradeCodeEnum } from 'src/app/shared/enums/school/school.enum';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { IssuanceCertificaeService } from '../../services/issuance-certificae.service';

@Component({
  selector: 'app-degree-certificate',
  templateUrl: './degree-certificate.component.html',
  styleUrls: ['./degree-certificate.component.scss']
})
export class DegreeCertificateComponent implements OnInit, OnChanges {
  faAngleDown=faAngleDown
  @Input() choosenStudents;
  @Output() onCancel: EventEmitter<string> = new EventEmitter();
  @Output() onBack: EventEmitter<string> = new EventEmitter();


  schoolYearsList$ = this.sharedService.getSchoolYearsList()

  lang = inject(TranslationService).lang;
  studentId = +this.route.snapshot.paramMap.get('studentId');

  degreescertificates = this.certificatesService.degreescertificates;

  onSubmit=false


  degreeCertificateForm = this.fb.group({
    students:this.fb.array([])
  })
  get studentsCtr() { return this.degreeCertificateForm.controls.students as FormArray}


  degreeForm = this.fb.group({
    yearId: '',
    certificateType: CertificatesEnum.GradesCertificate,
    gradeCertificateType:''
   });

  constructor(
    private fb:FormBuilder,
    private toastr: ToastrService,
    private translate: TranslateService,
    private certificatesService: IssuanceCertificaeService,
    private route: ActivatedRoute,
    private sharedService: SharedService
  ) {}

  ngOnChanges(): void {
    this.fillStudentFormArr(this.choosenStudents)
  }

  ngOnInit(): void {
  }


  fillStudentFormArr(students){
    students.forEach(student=>{
      this.studentsCtr.push(
        this.fb.group({
          studentId: student.id,
          yearId:[''],
          certificatedType: CertificatesEnum.BoardCertificate,
          gradeCertificateType:''
      })
      )
    })
  }


  //save degree certificate
  submitDegreeCertificate(){
    this.onSubmit=true;

    let data = this.degreeCertificateForm.value.students



    this.certificatesService.postGradeCertificate(data).subscribe(result=>{
      this.onSubmit=false;
      if(result.statusCode != 'BadRequest'){
      this.toastr.success(this.translate.instant('dashboard.issue of certificate.success message'));
      this.onCancel.emit();
      }else{
        if(result?.errorLocalized)
        {this.toastr.error( result?.errorLocalized[this.lang])}
        else
        {this.toastr.error(this.translate.instant('error happened'))}
        this.onBack.emit();
      }
    },err=>{
      this.onSubmit=false;
      this.toastr.error(this.translate.instant('error happened'))
    })


  }


  isTypeRequired(student){
    if(!(student.curriculumCode== CurriculumCodeEnum.British)) return

    if([GradeCodeEnum.ten, GradeCodeEnum.eleven, GradeCodeEnum.twelve].includes(student.gradeCode)) return true

    return false
  }



}
