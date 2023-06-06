import { Component, EventEmitter, inject, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faAngleDown, faPlus } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { forkJoin, share, shareReplay, switchMap } from 'rxjs';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { SystemRequestService } from 'src/app/modules/request-list/services/system-request.service';
import { SchoolsService } from 'src/app/modules/schools/services/schools/schools.service';
import { StudentsService } from 'src/app/modules/students/services/students/students.service';
import { SettingsService } from 'src/app/modules/system-setting/services/settings/settings.service';
import { CertificatesEnum } from 'src/app/shared/enums/certficates/certificate.enum';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { IssuanceCertificaeService } from '../../services/issuance-certificae.service';

@Component({
  selector: 'app-academic-sequence',
  templateUrl: './academic-sequence.component.html',
  styleUrls: ['./academic-sequence.component.scss']
})
export class AcademicSequenceComponent implements OnInit {
  faAngleDown=faAngleDown
  faPlus=faPlus
  @Input() choosenStudents;
  @Output() onCancel : EventEmitter<string> = new EventEmitter();
  @Output() onBack : EventEmitter<string> = new EventEmitter();

  lang =inject(TranslationService).lang;
  studentId = +this.route.snapshot.paramMap.get('studentId')

// incase the request is returned from Spea
  requestId = +this.route.snapshot.queryParamMap.get('requestId')
  requestInstance = +this.route.snapshot.queryParamMap.get('requestInstance')
  studentAcademicSequence = [JSON.parse(localStorage.getItem('returnedRequest'))?.academicSequence]

  isBtnLoading
  isLoading

  // showAttchments ={}
  // showError=false

  schoolYears$ = this.sharedService.getSchoolYearsList().pipe(shareReplay())
  allSchools$ = this.schoolsService.getAllSchoolNames().pipe(shareReplay())
  allGrades$ = this.sharedService.getAllGrades().pipe(shareReplay())

  oldSchoolYears$ = this.sharedService.getOldSchoolYearsList().pipe(shareReplay())
  OldSchools$ = this.schoolsService.getOldSchools().pipe(shareReplay())

  academicSequence=[]

  stdAcademicForm =this.fb.group({
    studentEducationCertificates :this.fb.array([])
  })

  get StudenstArrCtr(){ return this.stdAcademicForm.controls['studentEducationCertificates'] as FormArray}
  getStudentCtr(index) {return this.StudenstArrCtr.controls[index] as FormGroup}
  getStudentCertifictesArrCtr(index) { return this.getStudentCtr(index).controls['academicSequence'] as FormArray}
  getStudentNewAccademicArrCtr(index) { return this.getStudentCtr(index).controls['addedAcademicSequence'] as FormArray}

  getStudentCertificteCtr(index) { return this.getStudentCertifictesArrCtr(index).controls[index] as FormGroup}


  actions


  constructor(
    private fb: FormBuilder,
    private toastr:ToastrService,
    private translate:TranslateService,
    private certificatesService:IssuanceCertificaeService,
    private route:ActivatedRoute,
    private studentService: StudentsService,
    private sharedService:SharedService,
    private schoolsService: SchoolsService,
    private requestsService:SystemRequestService,
    private router:Router
  ) { }

  ngOnInit(): void {
    // this.schoolsService.getSchoolGardes('').subscribe()
    // this.st.getGracePeriodList().subscribe()
    if(this.requestInstance) {
      this.getRequestOptions()
      this.academicSequence =this.studentsSchoolYearsMapped(this.choosenStudents, this.studentAcademicSequence)
      this.fillStudentsFormArr([...this.academicSequence])
    }else{

      this.getStudentsSchoolYears(this.choosenStudents.map(el=> el.id))
    }
  }


  getRequestOptions(){
    this.requestsService.getRequestOptions(this.requestInstance).subscribe(res=>{
      this.actions = res?.options
    })
  }


  getStudentsSchoolYears(studentsIds:[]){
    this.isLoading =true

    let requests = forkJoin(studentsIds.map(id => this.studentService.getCetificateManually(id)))

    requests.subscribe((stdAcademicSequence: any[])=>{
      this.isLoading=false

      this.academicSequence = this.studentsSchoolYearsMapped(this.choosenStudents, stdAcademicSequence)
      this.fillStudentsFormArr([...this.academicSequence])

    })
  }


  studentsSchoolYearsMapped(students: any[], stdAcademicSequence: any[]){
    return students.map((student, i) =>{
      return {
        id: student.id,
        certificatedType : CertificatesEnum.AcademicSequenceCertificate,
        academicSequence : stdAcademicSequence[i].map(el => ({gradeId: el.gradeName?.id, yearId: el.schoolYearName?.id,  schoolId: el.schoolName?.id,})),
        addedAcademicSequence : []
      }
    })
  }


  fillStudentsFormArr(students){
    students.forEach(el=>{
      this.StudenstArrCtr.push(this.fb.group({
        studentId: el.id,
        certificatedType: CertificatesEnum.AcademicSequenceCertificate,
        attachments:[[]],
        academicSequence: this.fillStudentstdAcademicSequence(el.academicSequence),
        addedAcademicSequence : this.fb.array([])
      }))
    })
  }


  fillStudentstdAcademicSequence(academicSequence:any[]):FormArray{
    let formArr = this.fb.array([]) as FormArray
    academicSequence.forEach(el =>{
      formArr.push(this.fb.group({...el}))
    })

    return formArr
  }



  sendAcademiccertificateReq(){
    this.isBtnLoading=true;

    // let body= this.stdAcademicForm.value.studentEducationCertificates.map((student: any[]) => {
    //   return {...student, certificates:[]}
    // })

    // let body =this.validationStep()
    let body=this.stdAcademicForm.value.studentEducationCertificates

    this.certificatesService.postSequenceCertificate({studentEducationCertificates: body}).subscribe(result=>{
      this.isBtnLoading=false;
      this.toastr.success(this.translate.instant('dashboard.issue of certificate.success message'));
      this.onCancel.emit();

      },(err:Error)=>{
        this.isBtnLoading=false;
        this.onBack.emit();
      this.toastr.error( err.message || this.translate.instant('toasterMessage.error'))
    })

  }



  resendAcademicSequesnceReq(optionId){

    this.isBtnLoading = true

    let body={
      requestId: this.requestId,
      academicSequence: (this.stdAcademicForm.value.studentEducationCertificates[0] as any).academicSequence
    }


    this.certificatesService.resendSequenceCertificate(body)
    .pipe(
      switchMap(()=>{
        let reqActionsForm={
          comments:'',
          optionId: optionId,
          rejectionReasonId: 0,
          rejectionReason:'',
          attachments:[]
        }
        return this.requestsService.changeRequestState(reqActionsForm)
      })
    ).subscribe(res=>{

      this.isBtnLoading = false
      this.toastr.success(this.translate.instant('toasterMessage.requestResend'));
      this.router.navigate(['/requests-list/details/', this.requestInstance])

    }, ()=>{
      this.toastr.error(this.translate.instant('toasterMessage.error'))
      this.isBtnLoading = false
    })
  }


  addNewAccademicYear(index){
    this.getStudentNewAccademicArrCtr(index).push(
      this.fb.group({
        yearId:[, Validators.required],
        schoolId:[, Validators.required],
        gradeId:[, Validators.required],
      })
    )
  }

  deleteNewAcc(index, ctrIndex){
    this.getStudentNewAccademicArrCtr(index).removeAt(ctrIndex)
  }

  // validationStep(){

  //   let studentsSchoolYearsToCompare = this.stdAcademicForm.value.studentEducationCertificates
  //   studentsSchoolYearsToCompare.forEach((el:any, studentIndex ) =>{

  //     el.certificates = el.certificates.filter((schoolYear, index)=>{
  //       return JSON.stringify(schoolYear) != JSON.stringify(this.studentsSchoolYears[studentIndex].certificates[index])
  //     })

  //   })

  //   return studentsSchoolYearsToCompare
  // }


  // onAttachmentSelected(attachment, index) {
  //   let urlParts =attachment.url?.split(".")
  //   let isImage = ['jpge','jpg','png'].includes(urlParts[urlParts.length-1]?.toLowerCase())


  //   if(!isImage){
  //     this.showError =true;
  //     return
  //   }else this.showError =false;

  //   let i = this.getStudentCtr(index).value.attachments.indexOf(attachment.id);
  //   if (i >= 0) {
  //     // this.getStudentCtr(index).controls['attachments'].setValue([])

  //   } else {
  //     this.choosenStudents[index].attachments = this.choosenStudents[index].attachments.map(el=> {
  //       if(el.id != attachment.id) return {...el, isSelected:false}
  //       else return {...el, isSelected:true}
  //     })
  //     this.getStudentCtr(index).controls['attachments'].setValue([attachment.id])
  //   }
  // }


  // attachLoading=false

  // getAttachments(studentId, index) {
  //   if(this.showAttchments[index]){
  //     this.showAttchments[index] =false ;
  //     return
  //   }
  //   else {this.showAttchments[index] =true}

  //   this.attachLoading =true

  //   this.studentService
  //   .getStudentAttachment(studentId)
  //   .subscribe((attachments) => {
  //     this.choosenStudents[index]['attachments'] = attachments.map((attach) => ({
  //       ...attach,
  //       isSelected: false,
  //     }));
  //     this.attachLoading =false
  //   });


  // }


}
