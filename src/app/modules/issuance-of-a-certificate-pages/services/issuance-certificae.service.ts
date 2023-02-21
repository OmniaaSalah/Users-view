import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { Filter } from 'src/app/core/models/filter/filter';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';
import { CertificatesEnum } from 'src/app/shared/enums/certficates/certificate.enum';
import { DegreesCertificatesEnum } from 'src/app/shared/enums/certficates/degrees-certificates';

@Injectable({
  providedIn: 'root'
})
export class IssuanceCertificaeService {
  allCertificates;
  certificatesList;
  degreescertificates;
  constructor(private http: HttpHandlerService, private translate: TranslateService) {
    this.certificatesList = [
      {
        "value": CertificatesEnum.BoardCertificate,
        "name": {
          "en": this.translate.instant("dashboard.issue of certificate.BoardCertificate"),
          "ar": this.translate.instant("dashboard.issue of certificate.BoardCertificate")
        }
      },
      {
        "value": CertificatesEnum.AcademicSequenceCertificate,
        "name": {
          "en": this.translate.instant("dashboard.issue of certificate.AcademicSequenceCertificate"),
          "ar": this.translate.instant("dashboard.issue of certificate.AcademicSequenceCertificate")
        }
      },
      {
        "value": CertificatesEnum.GradesCertificate,
        "name": {
          "en": this.translate.instant("dashboard.issue of certificate.GradesCertificate"),
          "ar": this.translate.instant("dashboard.issue of certificate.GradesCertificate")
        }
      },
      {
        "value": CertificatesEnum.ContinuingEducationCertificate,
        "name": {
          "en": this.translate.instant("dashboard.issue of certificate.ContinuingEducationCertificate"),
          "ar": this.translate.instant("dashboard.issue of certificate.ContinuingEducationCertificate")
        }
      },
      {
        "value": CertificatesEnum.TransferCertificate,
        "name": {
          "en": this.translate.instant("dashboard.issue of certificate.TransferCertificate"),
          "ar": this.translate.instant("dashboard.issue of certificate.TransferCertificate")
        }
      },
      {
        "value": CertificatesEnum.GoodBehaviorCertificate,
        "name": {
          "en": this.translate.instant("dashboard.issue of certificate.GoodBehaviorCertificate"),
          "ar": this.translate.instant("dashboard.issue of certificate.GoodBehaviorCertificate")
        }

      },
      {
        "value": CertificatesEnum.DiplomaCertificate,
        "name": {
          "en": this.translate.instant("dashboard.issue of certificate.DiplomaCertificate"),
          "ar": this.translate.instant("dashboard.issue of certificate.DiplomaCertificate")
        }
      },
      {
        "value": CertificatesEnum.SchoolInternalSubjectsCertificate,
        "name": {
          "en": this.translate.instant("dashboard.issue of certificate.SchoolInternalSubjectsCertificate"),
          "ar": this.translate.instant("dashboard.issue of certificate.SchoolInternalSubjectsCertificate")
        }
      }
    ];

    this.degreescertificates = [
      {
        value:DegreesCertificatesEnum.MinisterialSubjects,
        name: {
          en: this.translate.instant("dashboard.issue of certificate.MinisterialSubjects"),
          ar: this.translate.instant("dashboard.issue of certificate.MinisterialSubjects")
        },
      },
      {
        value:DegreesCertificatesEnum.NonMinisterialSubjects,
        name: {
          en: this.translate.instant("dashboard.issue of certificate.NonMinisterialSubjects"),
          ar: this.translate.instant("dashboard.issue of certificate.NonMinisterialSubjects")
        }
      },
      {
        value: DegreesCertificatesEnum.AllSubjects,
        name: {
          en: this.translate.instant("dashboard.issue of certificate.AllSubjects"),
          ar: this.translate.instant("dashboard.issue of certificate.AllSubjects")
        }
      },
    ];
    this.allCertificates=[
      {"nameOfCertificate":"Board","fess":200,"studentName":"Omnia","status":"done","approved":"true"},
      {"nameOfCertificate":"Board","fess":200,"studentName":"Omnia","status":"closed","approved":"false"},
    ]
  }
  // boardsArray = 
  //   [
  //     {name:"a1",url:"a1"},
  //     {name:"a2",url:"a2"},
  //     {name:"a3",url:"a3"},
  //     {name:"a4",url:"a4"},
  //     {name:"a5",url:"a5"},
  //     {name:"a6",url:"a6"},

  //   ]


  studentArray = []

  
  getBoards(id) {

    return this.http.get(`/Student/attachment/${id}`)
    // return of(this.boardsArray) 
  }

  getParentsChild(id) {
    return this.http.get(`/Guardian/${id}/Children`)

  }
  // getCeritificateFeesList() {
  //   return this.http.get(`/Certificate/certificates`)
  // }

  postBoardCertificate(data){
    return this.http.post('/Certificate/board-certificate-request',data)
  }

  postOtherCertificate(data){
    return this.http.post('/Certificate/certificate-request',data)
  }

  postGradeCertificate(data){
    return this.http.post('/Certificate/grades-certificate-request',data)
  }

  postSequenceCertificate(data){
    return this.http.post('/Certificate/academic-sequencen-certificate-request',data)
  }
  getAllCertificateOfGurdian(filtration?:Partial<Filter>)
  {
    return this.http.get('/Certificate/certificate-requests',filtration)
  }
  deleteCertificate(id)
  {
    return this.http.delete(`/Certificate/request/${id}`)
  }

  payCertificates(obj)
  {
    return this.http.post(`/Certificate/payment-link`,obj)
  }

  completepaymentProcess(refId){
    return this.http.post(`/Certificate/payment-completed/${refId}`)
  }
}
