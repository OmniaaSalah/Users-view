import { Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { map, of, take } from 'rxjs';
import { getLocalizedValue } from 'src/app/core/helpers/helpers';
import { SearchModel } from 'src/app/core/models/filter-search/filter-search.model';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { CertificateStatusEnum } from 'src/app/shared/enums/certficates/certificate-status.enum';
import { CertificatesEnum } from 'src/app/shared/enums/certficates/certificate.enum';
import { DegreesCertificatesEnum } from 'src/app/shared/enums/certficates/degrees-certificates';
import { HttpStatusCodeEnum } from 'src/app/shared/enums/http-status-code/http-status-code.enum';

@Injectable({
  providedIn: 'root'
})
export class IssuanceCertificaeService {
  lang = inject(TranslationService).lang
  allCertificates;
  certificatesList;

  degreescertificates= [
    {
      value:DegreesCertificatesEnum.SpeaSubjects,
      name: this.translate.instant("issue of certificate.SpeaSubjects")

    },
    {
      value:DegreesCertificatesEnum.SchoolSubjects,
      name: this.translate.instant("issue of certificate.SchoolSubjects")
    },
    {
      value: DegreesCertificatesEnum.AllSubjects,
      name: this.translate.instant("issue of certificate.AllSubjects")
    },
    // {
    //   value:DegreesCertificatesEnum.OptionalSubjects,
    //   name: this.translate.instant("issue of certificate.OptionalSubjects")
    // },
    // {
    //   value: DegreesCertificatesEnum.MandatorySubjects,
    //   name: this.translate.instant("issue of certificate.MandatorySubjects")
    // },
  ];




certificateStatusList;
  constructor(private http: HttpHandlerService, private translate: TranslateService) {

    this.certificatesList = [
      {
        "value": CertificatesEnum.BoardCertificate,
        "name": {
          "en": this.translate.instant("issue of certificate.BoardCertificate"),
          "ar": this.translate.instant("issue of certificate.BoardCertificate")
        }
      },
      {
        "value": CertificatesEnum.AcademicSequenceCertificate,
        "name": {
          "en": this.translate.instant("issue of certificate.AcademicSequenceCertificate"),
          "ar": this.translate.instant("issue of certificate.AcademicSequenceCertificate")
        }
      },
      {
        "value": CertificatesEnum.GradesCertificate,
        "name": {
          "en": this.translate.instant("issue of certificate.GradesCertificate"),
          "ar": this.translate.instant("issue of certificate.GradesCertificate")
        }
      },
      {
        "value": CertificatesEnum.ContinuingEducationCertificate,
        "name": {
          "en": this.translate.instant("issue of certificate.ContinuingEducationCertificate"),
          "ar": this.translate.instant("issue of certificate.ContinuingEducationCertificate")
        }
      },
      {
        "value": CertificatesEnum.TransferCertificate,
        "name": {
          "en": this.translate.instant("issue of certificate.TransferCertificate"),
          "ar": this.translate.instant("issue of certificate.TransferCertificate")
        }
      },
      {
        "value": CertificatesEnum.GoodBehaviorCertificate,
        "name": {
          "en": this.translate.instant("issue of certificate.GoodBehaviorCertificate"),
          "ar": this.translate.instant("issue of certificate.GoodBehaviorCertificate")
        }

      },
      {
        "value": CertificatesEnum.DiplomaCertificate,
        "name": {
          "en": this.translate.instant("issue of certificate.DiplomaCertificate"),
          "ar": this.translate.instant("issue of certificate.DiplomaCertificate")
        }
      },
      {
        "value": CertificatesEnum.SchoolInternalSubjectsCertificate,
        "name": {
          "en": this.translate.instant("issue of certificate.SchoolInternalSubjectsCertificate"),
          "ar": this.translate.instant("issue of certificate.SchoolInternalSubjectsCertificate")
        }
      }
    ];


    this.allCertificates=[
      {"nameOfCertificate":"Board","fess":200,"studentName":"Omnia","status":"done","approved":"true"},
      {"nameOfCertificate":"Board","fess":200,"studentName":"Omnia","status":"closed","approved":"false"},
    ]

    this.certificateStatusList=[
      {name:this.translate.instant('issue of certificate.'+CertificateStatusEnum.Payed),value:CertificateStatusEnum.Payed},
      {name:this.translate.instant('issue of certificate.'+CertificateStatusEnum.PendingForApproval),value:CertificateStatusEnum.PendingForApproval},
      {name:this.translate.instant('issue of certificate.'+CertificateStatusEnum.PendingForPayment),value:CertificateStatusEnum.PendingForPayment},
      {name:this.translate.instant('issue of certificate.'+CertificateStatusEnum.Rejected),value:CertificateStatusEnum.Rejected},
    ]
  }



  getCetificatesTypes(){
    return this.http.get(`/Certificate/Certificates`)
    .pipe(
      map(res=>{

        return res.map(el => ({name: el.certificateName, value:el.certificateType, fees:el.fees}))
      }),
      take(1))
  }


  getParentsChild(id) {
    return this.http.get(`/Guardian/${id}/Children`).pipe(take(1))

  }
  // getCeritificateFeesList() {
  //   return this.http.get(`/Certificate/certificates`)
  // }

  // الفصول الدراسيه المنتهيه
  getAvailableReportingPeriods(studentId, schoolYear){
    return this.http.get(`/Certificate/check-available-degrees/${studentId}/${schoolYear}`)
    .pipe(
      map(res=>{
        return res.map(el=> ({value: el, name:this.translate.instant('shared.' + el)}) )
      }),
      take(1)
    )

  }

  postBoardCertificate(data, issuedBySpea){
    let url = issuedBySpea ? '/Certificate/org/board-certificate-request' : '/Certificate/board-certificate-request';
    return this.http.post(url ,data).pipe(take(1))
  }

  sendDiplomaCertificateReq(data, issuedBySpea){
    let url = issuedBySpea ? '/Certificate/org/diploma-certificate-request' :'/Certificate/diploma-certificate-request' ;
    return this.http.post(url ,data).pipe(take(1))
  }

  postOtherCertificate(data){
    return this.http.post('/Certificate/certificate-request',data).pipe(take(1))
  }

  submitOtherCertifiatesBySpea(data){
    return this.http.post('/Certificate/org/certificate-request',data).pipe(take(1))
  }

  postGradeCertificate(data, issuedBySpea){
    let url = issuedBySpea ? '/Certificate/org/grades-certificate-request' : '/Certificate/grades-certificate-request'

    return this.http.post(url ,data)
    .pipe(
      map(res=>{
        if(res.statusCode==HttpStatusCodeEnum.BadRequest) throw new Error(getLocalizedValue(res?.errorLocalized))
        else return res
      }),
      take(1)
      )
  }

  postInternalGradeCertificate(data, issuedBySpea){
    let url = issuedBySpea ? '/Certificate/org/internal-subjects-certificate-request' : '/certificate/internal-subjects-certificate-request'

    return this.http.post(url ,data)
    .pipe(
      map(res=>{
        if(res.statusCode==HttpStatusCodeEnum.BadRequest) throw new Error(getLocalizedValue(res?.errorLocalized))
        else return res
      }),
      take(1)
      )
  }

  postSequenceCertificate(data, issuedBySpea:boolean){
    let url = issuedBySpea ? '/Certificate/org/academic-sequencen-certificate-request' : '/Certificate/academic-sequencen-certificate-request'
    return this.http.post(url ,data)
    .pipe(
      map(res=>{
        if(res.statusCode==HttpStatusCodeEnum.BadRequest) throw new Error(getLocalizedValue(res?.errorLocalized))
        else return res
      }),
      take(1)
      )
  }

  resendSequenceCertificate(data){
    return this.http.put('/Certificate/academic-sequencen-certificate-request',data).pipe(take(1))
  }


  getAllCertificateOfGurdian(filtration)
  {
    return this.http.post('/Certificate/certificate-requests',filtration).pipe(take(1))
  }

  deleteCertificate(id)
  {
    return this.http.delete(`/Certificate/request/${id}`).pipe(take(1))
  }

  payCertificates(obj)
  {
    return this.http.post(`/Certificate/payment-link`,obj).pipe(take(1))
  }

  completepaymentProcess(refId,receiptNo,body){
    return this.http.post(`/Certificate/payment-completed/${refId}/${receiptNo}`,body,)
    .pipe(
      map(res=>{
        if(res.statusCode==HttpStatusCodeEnum.BadRequest) throw new Error(this.lang=='ar' ? res.Ar :res.En)
        else return res
      }),
      take(1)
      )
  }


  getCertificateDetails(id){
    return this.http.get(`/Certificate/certificate-details/${id}`)
  }

}
