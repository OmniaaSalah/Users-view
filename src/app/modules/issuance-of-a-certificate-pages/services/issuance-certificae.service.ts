import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';

@Injectable({
  providedIn: 'root'
})
export class IssuanceCertificaeService {
  certificatesList;
  certificatesFeesList;
  constructor(private http:HttpHandlerService,private translate:TranslateService) {


    this.certificatesList=[
      {
        "value": 0,
        "name": {
          "en": "BoardCertificate",
          "ar": this.translate.instant("dashboard.issue of certificate.BoardCertificate")
        }
      },
      {
        "value": 1,
        "name": {
          "en": "AcademicSequenceCertificate",
          "ar": this.translate.instant("dashboard.issue of certificate.AcademicSequenceCertificate")
        }
      },
      {
        "value": 2,
        "name": {
          "en": "GradesCertificate",
          "ar": this.translate.instant("dashboard.issue of certificate.GradesCertificate")
        }
      },
      {
        "value": 3,
        "name": {
          "en": "ContinuingEducationCertificate",
          "ar": this.translate.instant("dashboard.issue of certificate.ContinuingEducationCertificate")
        }
      },
      {
        "value": 4,
        "name": {
          "en": "TransferCertificate",
          "ar": this.translate.instant("dashboard.issue of certificate.TransferCertificate")
        }
      },
      {
        "value": 5,
        "name": {
          "en": "GoodBehaviorCertificate",
          "ar":this.translate.instant("dashboard.issue of certificate.GoodBehaviorCertificate")
        }
      },
      {
        "value": 6,
        "name": {
          "en": "DiplomaCertificate",
          "ar": this.translate.instant("dashboard.issue of certificate.DiplomaCertificate")
        }
      },
      {
        "value": 7,
        "name": {
          "en": "SchoolInternalSubjectsCertificate",
          "ar": this.translate.instant("dashboard.issue of certificate.SchoolInternalSubjectsCertificate")
        }
      }
    ] ;
    this.certificatesFeesList=[
      {
        "certificateType": "BoardCertificate",
        "fees": 22
      },
      {
        "certificateType": "AcademicSequenceCertificate",
        "fees": 22
      },
      {
        "certificateType": "GradesCertificate",
        "fees": 30
      },
      {
        "certificateType": "ContinuingEducationCertificate",
        "fees": 25
      },
      {
        "certificateType": "TransferCertificate",
        "fees": 15
      },
      {
        "certificateType": "GoodBehaviorCertificate",
        "fees": 25
      },
      {
        "certificateType": "DiplomaCertificate",
        "fees": 35
      },
      {
        "certificateType": "SchoolInternalSubjectsCertificate",
        "fees": 35
      }
    ];
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
  getBoards(id){

   return this.http.get(`/Student/attachment/${id}`)
    // return of(this.boardsArray) 
  }
  getParentsChild(){
   return this.http.get('/Guardian/2/Children?yearId=1')
  }

  getCeritificateList()
  {
    return this.http.get(`/Certificate/certificates`)
  }
}
