import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import { CertificatesEnum } from 'src/app/shared/enums/certficates/certificate.enum';

@Component({
  selector: 'app-certificate-details',
  templateUrl: './certificate-details.component.html',
  styleUrls: ['./certificate-details.component.scss']
})
export class CertificateDetailsComponent implements OnInit {

  @ViewChild(PdfViewerComponent, {static: false})
  private pdfComponent: PdfViewerComponent;
  
  get certificateTypeEnum() { return CertificatesEnum }
  
  location="https://www.google.com/maps/place/25%C2%B004'53.8%22N+55%C2%B012'59.2%22E/@25.0816221,55.216448,17z/data=!4m4!3m3!8m2!3d25.0816221!4d55.216448"


  certificateType = this.route.snapshot.queryParamMap.get('type')
  // certificate=localStorage.getItem('certificate')
  certificate = JSON.parse(localStorage.getItem('certificate'))

  constructor(
    private route:ActivatedRoute,
    private translate :TranslateService) { }

  ngOnInit(): void {
    console.log(this.certificate);
    
  }

  hidePdf=true
  pageRendered() {
    this.pdfComponent.pdfViewer.currentScaleValue = 'page-fit';
    setTimeout(() => { this.hidePdf = false;  } , 100 );
  }

  print() { 

   var data = document.getElementById('certificate');
   html2canvas(data,{useCORS: true,}).then(canvas => {    
     console.log(canvas.height);
     
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
    
     pdf.save(this.translate.instant('dashboard.issue of certificate.' +this.certificateType));  
   });  
 }

}
