import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { CertificatesEnum } from 'src/app/shared/enums/certficates/certificate.enum';
import { CurriculumCodeEnum, GradeCodeEnum } from 'src/app/shared/enums/school/school.enum';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { IssuanceCertificaeService } from '../../services/issuance-certificae.service';
import { SemesterEnum } from 'src/app/shared/enums/global/global.enum';
import { forkJoin} from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-degree-certificate',
  templateUrl: './degree-certificate.component.html',
  styleUrls: ['./degree-certificate.component.scss']
})
export class DegreeCertificateComponent implements OnInit, OnChanges {
  @Input() choosenStudents;
  @Input() activateSpeaView = false;
  @Input() certificateType!:CertificatesEnum
  @Output() onCancel: EventEmitter<string> = new EventEmitter();
  @Output() onBack: EventEmitter<string> = new EventEmitter();

  get certificateTypeEnum() { return CertificatesEnum}

  semesters=[
    {name:this.translate.instant('shared.firstSemester'), value:SemesterEnum.FirstSemester},
    {name:this.translate.instant('shared.lastSemester'), value:SemesterEnum.LastSemester},
    {name:this.translate.instant('shared.finalResult'), value:SemesterEnum.FinalResult}
  ]

  currentSchoolYear

  schoolYearsList

  lang = inject(TranslationService).lang;
  studentId = +this.route.snapshot.paramMap.get('studentId');

  degreescertificates = this.certificatesService.degreescertificates;

  onSubmit=false
  isLoading = false

  ReportingPeriods:[][]=[]

  degreeCertificateForm = this.fb.group({
    students:this.fb.array([])
  })
  get studentsCtr() { return this.degreeCertificateForm.controls.students as FormArray}


  constructor(
    private fb:FormBuilder,
    private toastr: ToastrService,
    private translate: TranslateService,
    private certificatesService: IssuanceCertificaeService,
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private location: Location,

  ) {}

  ngOnChanges(): void {
  }

  ngOnInit(): void {
    this.getScoolYears()

                    // .pipe(
                    //   tap(list => {
                    //     console.log(list.find(el => el.status=='Current')?.id);

                    //     this.currentSchoolYear = list.find(el => el.status=='Current')?.id
                    //   }),
                    //   share())
  }


  getScoolYears(){
    this.isLoading=true
    this.sharedService.getSchoolYearsList().subscribe(res=>{
      this.schoolYearsList = res
      this.currentSchoolYear = res.find(el => el.status=='Current')?.id
      this.fillStudentFormArr(this.choosenStudents)
      this.getAvailableReportingPeriods()
      this.isLoading=false

    })
  }

  getAvailableReportingPeriods(){
    let ReportingPeriods$ = forkJoin(this.choosenStudents.map(el => this.certificatesService.getAvailableReportingPeriods(el?.id , this.currentSchoolYear)))

    ReportingPeriods$.subscribe((res :[][])=>{
      this.ReportingPeriods = res || []
    })
  }

  onYearSelected(studentId, yearId, index){
    this.certificatesService.getAvailableReportingPeriods(studentId ,yearId).subscribe(res=>{
      this.ReportingPeriods[index]=res
    })
  }

  fillStudentFormArr(students){
    students.forEach(student=>{
      this.studentsCtr.push(
        this.fb.group({
          studentId: student.id,
          yearId:[this.currentSchoolYear,Validators.required],
          semester:[null,  Validators.required],
          certificatedType: this.certificateType,
          gradeCertificateType:''
      })
      )
    })
  }


  //save degree certificate
  submitDegreeCertificate(){
    this.onSubmit=true;

    let gardeData = this.degreeCertificateForm.value.students
    let internalGardeData = this.degreeCertificateForm.value.students.map((el:any) => {
      let {gradeCertificateType, certificatedType, ...rest } = el
      return rest
    })

    let httpReq$ = this.certificateType==CertificatesEnum.GradesCertificate ?
                  this.certificatesService.postGradeCertificate(gardeData, this.activateSpeaView) :
                  this.certificatesService.postInternalGradeCertificate(internalGardeData, this.activateSpeaView);

      httpReq$.subscribe(result=>{
      this.onSubmit=false;
      this.toastr.success(this.translate.instant('dashboard.issue of certificate.success message'));
      this.onCancel.emit();
      if(this.activateSpeaView) this.location.back()


    },(err: Error)=>{
      this.onSubmit=false;
      // this.onBack.emit();
      this.toastr.error(err.message || this.translate.instant('toasterMessage.error'))
    })


  }


  isTypeRequired(student){
    if(!(student.curriculumCode== CurriculumCodeEnum.British)) return

    if([GradeCodeEnum.nine,GradeCodeEnum.ten, GradeCodeEnum.eleven, GradeCodeEnum.twelve].includes(student.gradeCode)) return true

    return false
  }



}
