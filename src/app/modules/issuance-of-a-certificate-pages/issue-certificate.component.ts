import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { map, Subscription } from 'rxjs';
import { IHeader } from 'src/app/core/Models';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { CertificatesEnum } from 'src/app/shared/enums/certficates/certificate.enum';
import { ConfirmModelService } from 'src/app/shared/services/confirm-model/confirm-model.service';
import { IssuanceCertificaeService } from './services/issuance-certificae.service';
import { Location } from '@angular/common';
import { CurriculumCodeEnum, GradeCodeEnum } from 'src/app/shared/enums/school/school.enum';


@Component({
  selector: 'app-issue-certificate',
  templateUrl: './issue-certificate.component.html',
  styleUrls: ['./issue-certificate.component.scss']
})
export class IssueCertificateComponent implements OnInit {

  guardian={id:'',name:{}}
  choosenStudents = []
  lang =inject(TranslationService).lang;
  get certificateType() { return CertificatesEnum }

  childList = []
  selectedCertificate;

  step = 1;

  display: boolean = false;
  subscription:Subscription;
  skeletonShown = true
  isBtnLoading:boolean=false;


  destination=""

  certificatesList$= this.issuance.getCetificatesTypes();
  certificatesFeesList;

  componentHeaderData: IHeader = {
    breadCrump: [
      {
        label: this.translate.instant('dashboard.parentHome.Request certificates'),
        routerLink: '/certificates/ask-certificate',
        routerLinkActiveOptions: { exact: true },
      },
    ],
    mainTitle: {
      main: this.translate.instant('dashboard.parentHome.Request certificates'),
    },
  };

  // NOTE :- -------------------------------
  requestInstance = this.route.snapshot.queryParamMap.get('requestInstance')
  returnedReqData = JSON.parse(localStorage.getItem('returnedRequest'))
  // actions
  studentId = +this.route.snapshot.paramMap.get('studentId')



  constructor(
    private location: Location,
    private headerService: HeaderService,
    private translate: TranslateService,
    private issuance: IssuanceCertificaeService,
    public confirmModelService: ConfirmModelService,
    private toastr:ToastrService,
    private userService:UserService,
    private route:ActivatedRoute,

  ) {
  }



  ngOnInit(): void {



    this.userService.currentGuardian.subscribe((res)=> {this.guardian=res;});

    if(this.requestInstance){
      // this.getRequestOptions()
      this.step =3
      this.choosenStudents.push(this.returnedReqData.student)
      this.selectedCertificate= {
        "value": CertificatesEnum.AcademicSequenceCertificate,
        "name": {
          "en": this.translate.instant("dashboard.issue of certificate.AcademicSequenceCertificate"),
          "ar": this.translate.instant("dashboard.issue of certificate.AcademicSequenceCertificate")
        }
      }

    }else this.goToFirst();




    this.headerService.changeHeaderdata(this.componentHeaderData);

  }




  // getRequestOptions(){
  //   this.requestsService.getRequestTimline(this.requestInstance).subscribe(res=>{
  //     this.actions = res?.task?.options
  //   })
  // }



  showChildreens(){
    if(this.studentId){
      this.choosenStudents=[];
      this.issuance.getParentsChild(this.guardian.id)
      .subscribe(res => {
        this.choosenStudents.push(res.students.find(s=>s.id==this.studentId))
        this.onStepChanged();
      })
    }
    else{
      this.step=2;
      this.getparentsChildren(this.guardian.id)
    }
  }



  goToFirst(){

    this.step=1;
    localStorage.removeItem('currentCertificate')
    this.selectedCertificate=null;
    this.choosenStudents=[];

  }



  getparentsChildren(id) {
    this.issuance.getParentsChild(id)
    .pipe(map(res =>{
      res.students = res.students.filter(el=> (!el.certificateFromSchool && !el.rCertificateFromSPEA) )
      return res
    }))
    .subscribe(res => {

      if(this.selectedCertificate.value == CertificatesEnum.TransferCertificate){
        this.childList =[...res.studentsWithdrawal ||[]]
        this.skeletonShown = false
        return;

      }
      else if(this.selectedCertificate.value == CertificatesEnum.DiplomaCertificate){

        this.childList =res.students.filter(el =>{
          if(el.curriculumCode== CurriculumCodeEnum.Philippines){
            return Number(el.gradeCode) >= GradeCodeEnum.ten
          }else if((el.curriculumCode== CurriculumCodeEnum.British)){
            return Number(el.gradeCode) >= GradeCodeEnum.thirteen
          }else{
            return Number(el.gradeCode) >= GradeCodeEnum.twelve
          }
        })
        this.skeletonShown = false
        return;

      }else if(this.selectedCertificate.value == CertificatesEnum.SchoolInternalSubjectsCertificate){
          this.childList =res.students.filter(el =>{
            return el.curriculumCode==CurriculumCodeEnum.British
          })
      }

      this.childList = res.students
      this.skeletonShown = false
    })
  }


  isNextStepRequired(){
    let arr = [CertificatesEnum.BoardCertificate, CertificatesEnum.AcademicSequenceCertificate, CertificatesEnum.GradesCertificate,CertificatesEnum.GoodBehaviorCertificate, CertificatesEnum.SchoolInternalSubjectsCertificate]
    return arr.includes(this.selectedCertificate.value)
  }

  selectedStudentsChanged(checked, student) {

    if (checked) {
      this.choosenStudents.push(student)
    } else {
      this.choosenStudents.forEach((item, index) => {
        if (student.id === item.id) {
          this.choosenStudents.splice(index, 1)
        }
      });
    }
  }



  //save other certificate
  onOtherCertificatesSubmitted(){
    this.isBtnLoading=true;
    let data = {
      "studentIds" :this.studentId? [this.studentId] :this.choosenStudents.map(er=>er.id),
      "certificateType": this.selectedCertificate.value,
      "destination":this.destination || ''
    }
      this.issuance.postOtherCertificate(data).subscribe(result=>{
      this.isBtnLoading=false;
      this.display=false;
      if(result.statusCode != 'BadRequest'){
      this.toastr.success(this.translate.instant('dashboard.issue of certificate.success message'));
      this.goToFirst();
      }else{
        if(result?.errorLocalized)
        {this.toastr.error( result?.errorLocalized[this.lang])}
        else
        {this.toastr.error(this.translate.instant('toasterMessage.error'))}
      }
    },err=>{
      this.display=false;
      this.isBtnLoading=false;
      this.toastr.error(this.translate.instant('toasterMessage.error'))
    })

  }


  onStepChanged() {
    let selectedCertificate = this.selectedCertificate.value

    if ( selectedCertificate== CertificatesEnum.AcademicSequenceCertificate) this.step=3

    if ( selectedCertificate== CertificatesEnum.BoardCertificate) this.step=4

    if ( selectedCertificate== CertificatesEnum.GradesCertificate || selectedCertificate== CertificatesEnum.SchoolInternalSubjectsCertificate) this.step=5

    // if ( selectedCertificate== CertificatesEnum.DiplomaCertificate) this.step=6


    if(selectedCertificate== CertificatesEnum.GoodBehaviorCertificate) this.display = true;


    let arr=[CertificatesEnum.BoardCertificate,CertificatesEnum.AcademicSequenceCertificate, CertificatesEnum.GradesCertificate, CertificatesEnum.GoodBehaviorCertificate, CertificatesEnum.SchoolInternalSubjectsCertificate]
    if (!arr.includes(selectedCertificate))  this.onOtherCertificatesSubmitted()

  }



getFees(certificate) { return Number(this.certificatesFeesList.find(c=>c.certificateType==certificate).fees) }




goBack() { this.location.back()}



}
