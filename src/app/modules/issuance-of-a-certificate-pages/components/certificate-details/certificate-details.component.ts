import { Component, OnInit, Sanitizer, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { CertificatesEnum } from 'src/app/shared/enums/certficates/certificate.enum';
import { MediaService } from 'src/app/shared/services/media/media.service';
import { environment } from 'src/environments/environment';
import { IssuanceCertificaeService } from '../../services/issuance-certificae.service';

@Component({
  selector: 'app-certificate-details',
  templateUrl: './certificate-details.component.html',
  styleUrls: ['./certificate-details.component.scss']
})
export class CertificateDetailsComponent implements OnInit {
  
  get certificateTypeEnum() { return CertificatesEnum }
  
  location="https://www.google.com/maps/place/25%C2%B004'53.8%22N+55%C2%B012'59.2%22E/@25.0816221,55.216448,17z/data=!4m4!3m3!8m2!3d25.0816221!4d55.216448"


  certificateType
  certificateId = this.route.snapshot.paramMap.get('id')
  certificate
  certificateQrc=""

  constructor(
    private route:ActivatedRoute,
    private mediaSevice:MediaService,
    private issueCertificateService:IssuanceCertificaeService,
    private translate :TranslateService) { }

  ngOnInit(): void {
    this.getCertificate()
   
  }

  getCertificate(){
    this.issueCertificateService.getCertificateDetails(this.certificateId).subscribe(res=>{
      this.certificateType = res.result.certificateType 
      this.certificateQrc= `${environment.clientUrl}/certificate/${this.certificateId}`
      this.certificate = this.isJSON(res?.result?.jsonObj) ? JSON.parse(res.result.jsonObj) :"npt"
      
      console.log(this.certificate);
      // this.generateQRC()
    })
  }

  isJSON(str) {
      try {
          return (JSON.parse(str) && !!str);
      } catch (e) {
          return false;
      }
  }


  generateQRC(){

    this.generatePdf().then(async (pdf)=>{


      // this.mediaSevice.uploadBinaryFile(`"${dataurl}"`).subscribe(res=> {
      //   // window.open(res.url)

      // })

    })
  }





  print() { 
    this.generatePdf().then(pdf=>{
      pdf.save(this.translate.instant('dashboard.issue of certificate.' +this.certificateType))
      
      
    })
  }


 generatePdf():Promise<jsPDF>{
  var data = document.getElementById('certificate');
  
  return html2canvas(data,{useCORS: true})
  .then(canvas => {    
      
      let imgWidth = 208;  
      const pageHeight = 295;

      let imgHeight = canvas.height * imgWidth / canvas.width; 
  
      let heightLeft = imgHeight;
      let position = 0;  
      heightLeft -= pageHeight;

      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jsPDF('p', 'mm', 'a4');   

      pdf.addImage(canvas, 'PNG', 0, position, imgWidth, imgHeight,'', 'FAST')  
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(canvas, 'PNG', 0, position, imgWidth, imgHeight, '', 'FAST');
        heightLeft -= pageHeight;
      }

   
      return pdf
  });  
 }



   
  getBase64StringFromDataURL(dataURL) {
    return dataURL.replace('data:', '').replace(/^.+,/, '');
  }
}
