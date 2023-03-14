import { Component, EventEmitter, inject, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { forkJoin, share, shareReplay } from 'rxjs';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { SchoolsService } from 'src/app/modules/dashboard/modules/schools/services/schools/schools.service';
import { StudentsService } from 'src/app/modules/dashboard/modules/students/services/students/students.service';
import { SettingsService } from 'src/app/modules/dashboard/modules/system-setting/services/settings/settings.service';
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
  @Input() choosenStudents;
  @Output() onCancel : EventEmitter<string> = new EventEmitter();
  @Output() onBack : EventEmitter<string> = new EventEmitter();

  lang =inject(TranslationService).lang;
  studentId = +this.route.snapshot.paramMap.get('studentId')

  isBtnLoading

  isLoading

  showAttchments ={}
  showError=false

  schoolYears$ = this.sharedService.getSchoolYearsList().pipe(shareReplay())
  allGrades$ = this.sharedService.getAllGrades().pipe(shareReplay())
  allSchools$ = this.schoolsService.getAllSchoolNames().pipe(shareReplay())

  studentsSchoolYears=[]

  stdAcademicForm =this.fb.group({
    studentEducationCertificates :this.fb.array([])
  })

  get StudenstArrCtr(){ return this.stdAcademicForm.controls['studentEducationCertificates'] as FormArray}
  getStudentCtr(index) {return this.StudenstArrCtr.controls[index] as FormGroup}
  getStudentCertifictesArrCtr(index) { return this.getStudentCtr(index).controls['certificates'] as FormArray}
  getStudentCertificteCtr(index) { return this.getStudentCertifictesArrCtr(index).controls[index] as FormGroup}


  
  constructor(
    private fb: FormBuilder,
    private toastr:ToastrService,
    private translate:TranslateService,
    private certificatesService:IssuanceCertificaeService,
    private route:ActivatedRoute,
    private studentService: StudentsService,
    private sharedService:SharedService,
    private schoolsService: SchoolsService,
    private st:SettingsService
  ) { }

  ngOnInit(): void {
    this.getStudentsSchoolYears(this.choosenStudents.map(el=> el.id))
    // this.schoolsService.getSchoolGardes('').subscribe()
    // this.st.getGracePeriodList().subscribe()
  }


  getStudentsSchoolYears(studentsIds:[]){
    this.isLoading =true

    let requests = forkJoin(studentsIds.map(id => this.studentService.getCetificateManually(id)))

    requests.subscribe((res: any[])=>{
      console.log(res);
      this.isLoading=false

      this.studentsSchoolYears =this.studentsSchoolYearsMapped(this.choosenStudents, res)
     this.fillStudentsFormArr([...this.studentsSchoolYears])
      
    })
  }


  studentsSchoolYearsMapped(students: any[], schoolYears: any[]){
    return students.map((student, i) =>{
      return {
        id: student.id,
        certificatedType : CertificatesEnum.AcademicSequenceCertificate,
        certificates : schoolYears[i].map(el => ({gradeId: el.gradeName?.id, yearId: el.schoolYearName?.id,  schoolId: el.schoolName?.id,}))
      }
    })
  }


  fillStudentsFormArr(students){
    students.forEach(el=>{
      this.StudenstArrCtr.push(this.fb.group({
        id: el.id,
        certificatedType: CertificatesEnum.AcademicSequenceCertificate,
        attachments:[[]],
        certificates: this.fillStudentCertificates(el.certificates)
      }))
    })
  }


  fillStudentCertificates(certificates:any[]):FormArray{
    let formArr = this.fb.array([]) as FormArray
    certificates.forEach(el =>{
      formArr.push(this.fb.group({...el}))
    })

    return formArr
  }
  






  validationStep(){

    let studentsSchoolYearsToCompare = this.stdAcademicForm.value.studentEducationCertificates
    studentsSchoolYearsToCompare.forEach((el:any, studentIndex ) =>{

      el.certificates = el.certificates.filter((schoolYear, index)=>{
        return JSON.stringify(schoolYear) != JSON.stringify(this.studentsSchoolYears[studentIndex].certificates[index])
      })

    })

    return studentsSchoolYearsToCompare
  }

  sendAcademiccertificateReq(){
    this.isBtnLoading=true;

    // let body= this.stdAcademicForm.value.studentEducationCertificates.map((student: any[]) => {
    //   return {...student, certificates:[]}
    // })

    let body =this.validationStep()

    this.certificatesService.postSequenceCertificate({studentEducationCertificates: body}).subscribe(result=>{
      this.isBtnLoading=false;
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
      this.isBtnLoading=false;
      this.toastr.error(this.translate.instant('error happened'))
    })

  }




  onAttachmentSelected(attachment, index) {
    let urlParts =attachment.url?.split(".")
    let isImage = ['jpge','jpg','png'].includes(urlParts[urlParts.length-1]?.toLowerCase())


    if(!isImage){
      this.showError =true; 
      return
    }else this.showError =false; 

    let i = this.getStudentCtr(index).value.attachments.indexOf(attachment.id);
    if (i >= 0) {
      // this.getStudentCtr(index).controls['attachments'].setValue([])

    } else {
      this.choosenStudents[index].attachments = this.choosenStudents[index].attachments.map(el=> {
        if(el.id != attachment.id) return {...el, isSelected:false}
        else return {...el, isSelected:true}
      })
      this.getStudentCtr(index).controls['attachments'].setValue([attachment.id])
    }
  }


  attachLoading=false

  getAttachments(studentId, index) {
    if(this.showAttchments[index]){
      this.showAttchments[index] =false ;
      return
    }
    else {this.showAttchments[index] =true}
    
    this.attachLoading =true

    this.studentService
    .getStudentAttachment(studentId)
    .subscribe((attachments) => {
      this.choosenStudents[index]['attachments'] = attachments.map((attach) => ({
        ...attach,
        isSelected: false,
      }));
      this.attachLoading =false
    });

    // this.choosenStudents.forEach((student) => {
   
    // });
  }


}
