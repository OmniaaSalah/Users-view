import { Component, EventEmitter, inject, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { CertificatesEnum } from 'src/app/shared/enums/certficates/certificate.enum';
import { IssuanceCertificaeService } from '../../services/issuance-certificae.service';
import { AddStudentCertificateComponent } from './add-student-certificate/add-student-certificate.component';

@Component({
  selector: 'app-academic-sequence',
  templateUrl: './academic-sequence.component.html',
  styleUrls: ['./academic-sequence.component.scss']
})
export class AcademicSequenceComponent implements OnInit {
  @ViewChildren(AddStudentCertificateComponent) studentsCertificates: QueryList<AddStudentCertificateComponent>

  @Input() choosenStudents;
  @Output() onCancel : EventEmitter<string> = new EventEmitter();
  @Output() onBack : EventEmitter<string> = new EventEmitter();

  lang =inject(TranslationService).lang;
  studentId = +this.route.snapshot.paramMap.get('studentId')

  isBtnLoading

  constructor(
    private toastr:ToastrService,
    private translate:TranslateService,
    private certificatesService:IssuanceCertificaeService,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
  }


  sendAcademiccertificateReq(){
    this.isBtnLoading=true;
    let academicData =[]
    let data;
    this.studentsCertificates.forEach(x => {
      academicData.push(x.stdForm.value)
    }) 

    academicData=academicData.map(item=>{return{
      "studentId": item.id,
      "certificatedType": CertificatesEnum.AcademicSequenceCertificate,
      "certificates":item.certificates
    }});
    
     data={"studentEducationCertificates":academicData}

    this.certificatesService.postSequenceCertificate(data).subscribe(result=>{
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

}
