import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { CertificatesEnum } from 'src/app/shared/enums/certficates/certificate.enum';
import { environment } from 'src/environments/environment';
import { IssuanceCertificaeService } from '../../services/issuance-certificae.service';
import * as FileSaver from 'file-saver';
import { MediaService } from 'src/app/shared/services/media/media.service';
@Component({
  selector: 'app-certificate-details',
  templateUrl: './certificate-details.component.html',
  styleUrls: ['./certificate-details.component.scss']
})
export class CertificateDetailsComponent implements OnInit {

  get certificateTypeEnum() { return CertificatesEnum }

  reportingPeriods={
    ar:{
      FirstSemester:"الفصل الأول",
      LastSemester:"الفصل الأخير",
      FinalResult:"النتيجة النهائية",
    },
    en:{
      FirstSemester:"First Semester",
      LastSemester:"Last Semester",
      FinalResult:"Final Result",
    }
  }

  finalResult={
    ar:{
      Failed:"راسب",
      RetakeExam:"إعاده امتحان",
      Passed:"ناجح",
      FinalFaild:"راسب نهائى"
    },
    en:{
      Failed:"Failed",
      RetakeExam:"Retake Exam",
      Passed:"Passed",
      FinalFaild:"Final Faild"
    }
  }

  newDate = new Date()

  certificateType
  certificateId = this.route.snapshot.paramMap.get('id')
  showQRC = this.route.snapshot.queryParamMap.get('qrc') =='false' ? false :true
  certificate
  certificateQrc=""

  constructor(
    private route:ActivatedRoute,
    private issueCertificateService:IssuanceCertificaeService,
    private translate :TranslateService,
    private mediaService:MediaService) { }

    imgSrc

  ngOnInit(): void {
    this.getCertificate()
  }

  addSpaceBtwStrAndNum(string){
    return string.replace(/([0-9]+)/,(match)=>{
      return ` ${match} `
    })

  }

  getCertificate(){
    this.issueCertificateService.getCertificateDetails(this.certificateId).subscribe(res=>{
      this.certificateType = res.result.certificateType
      this.certificateQrc= `${environment.clientUrl}/certificate/${this.certificateId}`
      this.certificate = this.isJSON(res?.result?.jsonObj) ? JSON.parse(res.result.jsonObj) :"npt"

      if(this.certificate?.SchoolLogo){
        this.mediaService.getFTP_BlobFile(this.certificate?.SchoolLogo).subscribe(blob =>{
          this.mediaService.blobToBase64(blob).then(base64=> this.certificate.SchoolLogo =base64)
        })
      }

      if(this.certificate?.Attachments && this.certificate?.Attachments[0]){
        this.mediaService.getFTP_BlobFile(this.certificate?.Attachments[0]).subscribe(blob =>{
          this.mediaService.blobToBase64(blob).then(base64=> this.certificate.Attachments[0] =base64)
        })
      }

      if(this.certificate?.schoolStampPath){
        this.mediaService.getFTP_BlobFile(this.certificate?.schoolStampPath).subscribe(blob =>{
          this.mediaService.blobToBase64(blob).then(base64=> this.certificate.schoolStampPath =base64)
        })
      }

      if(this.certificate?.DiplomaLogoPath){
        this.mediaService.getFTP_BlobFile(this.certificate?.DiplomaLogoPath).subscribe(blob =>{
          this.mediaService.blobToBase64(blob).then(base64=> this.certificate.DiplomaLogoPath =base64)
        })
      }

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



  isLoading=false

  print() {
    this.isLoading=true
    this.generatePdf().then(pdf=>{
      pdf.save(this.translate.instant('dashboard.issue of certificate.' +this.certificateType))
      this.isLoading=false

    })
  }


 generatePdf():Promise<jsPDF>{
  var data = document.getElementById('certificate');
  data.style.fontFeatureSettings = '"liga" 0';

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
