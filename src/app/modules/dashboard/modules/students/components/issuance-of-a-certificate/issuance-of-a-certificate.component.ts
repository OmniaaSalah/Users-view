import { Location } from '@angular/common';
import {  ChangeDetectorRef, Component, OnInit,inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { IHeader } from 'src/app/core/Models';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { IssuanceCertificaeService } from 'src/app/modules/issuance-of-a-certificate-pages/services/issuance-certificae.service';
import { CertificatesEnum } from 'src/app/shared/enums/certficates/certificate.enum';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { StudentsService } from '../../services/students/students.service';

@Component({
  selector: 'app-issuance-of-a-certificate',
  templateUrl: './issuance-of-a-certificate.component.html',
  styleUrls: ['./issuance-of-a-certificate.component.scss'],
})
export class IssuanceOfACertificateComponent implements OnInit  {
  lang = inject(TranslationService).lang
  isBtnLoading:boolean=false;
  schoolYearsList =[];
  degreescertificates;
  get certificateType() { return CertificatesEnum }
  certificatesList ;
  studentId = +this.route.snapshot.paramMap.get('id');
  studentName;
  schoolNames;
  grades=[];
  certificates = [];

 
  certificateFormGrp: FormGroup;
  componentHeaderData: IHeader = {
    breadCrump: [
      {
        label: this.translate.instant('dashboard.students.studentsList'),
        routerLink: '/dashboard/schools-and-students/students/',
        routerLinkActiveOptions: { exact: true },
      },
      {
        label: this.translate.instant(
          'dashboard.students.Issuing the certificate manually'
        ),
        routerLink: `/dashboard/schools-and-students/students/student/${this.studentId}/IssuanceOfACertificateComponent`,
      },
    ],
    mainTitle: {
      main: this.translate.instant(
        'dashboard.students.Issuance of certificate'
      ),
    },
  };

  constructor(
    private location: Location,
    private sharedService:SharedService,
    private translate: TranslateService,
    private headerService: HeaderService,
    private std: StudentsService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private toastr:ToastrService,
    private changeDetector: ChangeDetectorRef,
    private certificateService:IssuanceCertificaeService
  ) {
    this.certificateFormGrp = fb.group({
      certificateName:['',[Validators.required]],
      academicCertificates:this.fb.array([]),
      gradeCertificateType:[''],
      yearId:['']
     
    });
  }

  get certificateName() {
    return this.certificateFormGrp?.get('certificateName');
  }

  get gradeCertificateType() {
    return this.certificateFormGrp?.get('gradeCertificateType');
  }
  
  get yearId() {
    return this.certificateFormGrp?.get('yearId');
  }

  get academicCertificates():FormArray {
    return this.certificateFormGrp?.get('academicCertificates') as FormArray;
  }

  ngOnInit(): void {
    this.getSchoolYearsList();
    this.certificatesList=this.std.certificatesList;
    this.getStudentName();
    this.getSchoolNames();
    this.headerService.changeHeaderdata(this.componentHeaderData);
   
  }
  

  getAcademicCertificateData() {
   
   if(!this.academicCertificates.value.length)
   {
    this.std.getCetificateManually(this.studentId).subscribe((res) => {
     
      res.forEach((element,i) => {
       
          this.academicCertificates.push(this.fb.group({ 
          schoolYearId:[element.schoolYearName.id],
          schoolId: [element.schoolName.id],
          gradeId:[element.gradeName.id]})
          )
        
        this.takeSchoolId(element.schoolName.id);
      });

    });
   }
}

  // ngAfterContentChecked(): void {
  //   this.changeDetector.detectChanges();
  // }

  getStudentName() {
    this.std.getStudentInfo(this.studentId).subscribe((res) => {
      this.studentName = res.result.name.ar;
    });
  }

  getSchoolNames() {
    this.std.getAllSchoolNames().subscribe((res) => {
      this.schoolNames = res;
    });
  }
  schoolId
  // getGrades() {        
  //   this.std.getAllGrades().subscribe((res) => {
  //     this.grades = res.data;
  //   });
  // }

  takeSchoolId(schoolId){
    
    this.grades = []
    this.std.getGradeBySchoolId(schoolId).subscribe((res)=>{
     
      this.grades.push(res.data)
    })
    this.checkRequiredAcademic();
  }
  getCertificates() {
    this.std.getAllCertificate().subscribe((res) => {
      this.certificates = res;
    });
  }

  sendData() {
    var certificate;
    this.isBtnLoading=true;
    
    if(this.certificateFormGrp.value.certificateName==CertificatesEnum.AcademicSequenceCertificate)
    {
      certificate={
      "studentId": this.studentId,
      "certificates": this.certificateFormGrp.value.academicCertificates.map((item,i)=>{return { 
          "yearId": item.schoolYearId,
          "schoolId": item.schoolId,
          "gradeId": item.gradeId
      }})
      
      }

       this.std.postAcademicCertificate(certificate).subscribe(result=>{
        this.isBtnLoading=false;
        if(result.statusCode != 'BadRequest'){
        this.toastr.success(this.translate.instant('dashboard.issue of certificate.success message'));
        this.goBack();
     
        }else{
        this.toastr.error(result.errorLocalized[this.lang]);
        
        }
      },err=>{
        this.isBtnLoading=false;
        this.toastr.error(this.translate.instant('error happened'))
      })
    }
   else if(this.certificateFormGrp.value.certificateName==CertificatesEnum.GradesCertificate)
   {

    certificate={
      "studentId": this.studentId,
       "yearId": this.certificateFormGrp.value.yearId,
       "gradeCertificateType": this.certificateFormGrp.value.gradeCertificateType
      }

      this.std.postGradeCertificate(certificate).subscribe(result=>{
        this.isBtnLoading=false;
        if(result.statusCode != 'BadRequest'){
        this.toastr.success(this.translate.instant('dashboard.issue of certificate.success message'));
        this.goBack();
     
        }else{
        this.toastr.error(result.errorLocalized[this.lang]);
        
        }
      },err=>{
        this.isBtnLoading=false;
        this.toastr.error(this.translate.instant('error happened'))
      })
   }

  
   
  }

  getSchoolYearsList(){
    this.sharedService.getSchoolYearsList().subscribe((res)=>{ this.schoolYearsList = res })
   }

   checkCertificateType()
   {
    
    if(this.certificateName.value==CertificatesEnum.AcademicSequenceCertificate)
    {
      this.getAcademicCertificateData();
      this.gradeCertificateType.clearValidators();
      this.gradeCertificateType.updateValueAndValidity(); 
      this.yearId.clearValidators();
      this.yearId.updateValueAndValidity();
     
    }
    else if(this.certificateName.value==CertificatesEnum.GradesCertificate)
    {
      this.degreescertificates=this.certificateService.degreescertificates;
      this.gradeCertificateType.setValidators([Validators.required]);
      this.gradeCertificateType.updateValueAndValidity(); 
      this.yearId.setValidators([Validators.required]);
      this.yearId.updateValueAndValidity(); 
      for(let i in this.academicCertificates.controls)
      {
        this.academicCertificates.controls[i].get('gradeId').clearValidators();
        this.academicCertificates.controls[i].get('gradeId').updateValueAndValidity(); 
  
      }
      
    }
   }

   checkRequiredAcademic()
   {
    for(let i in this.academicCertificates.controls)
    {
      this.academicCertificates.controls[i].get('gradeId').setValidators([Validators.required]);
      this.academicCertificates.controls[i].get('gradeId').updateValueAndValidity(); 

    }
   }

   goBack()
   {
    this.location.back();
   }

  //  checkDisabilityOfBtn()
  //  {
  //   console.log("kkk")
  
  //   setTimeout(() => {certificateFormGrp.invalid||isBtnLoading }, );
  //  }
 
}
