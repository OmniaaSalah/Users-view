import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import { CertificatesEnum } from 'src/app/shared/enums/certficates/certificate.enum';
import { MediaService } from 'src/app/shared/services/media/media.service';

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
    private mediaSevice:MediaService,
    private translate :TranslateService) { }

  ngOnInit(): void {
    console.log(this.certificate);
    this.generateQRC()
  }

  hidePdf=true
  pageRendered() {
    this.pdfComponent.pdfViewer.currentScaleValue = 'page-fit';
    setTimeout(() => { this.hidePdf = false;  } , 100 );
  }


   generateQRC(){
    this.generatePdf().then(async (pdf)=>{
      
      let blob =pdf.output("dataurl") as any

      // let file = this.blobToFile(blob,'file.pdf')
      // URL..createObjectURL(pdf.output("blob"))
      // const contentDataURL = pdf.toDataURL('image/png')  
      // let binaryFile  = await this.blobToBinary(blob)

      
      // let file =new File([blob], "certificate.pdf")
      // console.log(file);

      let formData = new FormData()

      formData.append(this.translate.instant('dashboard.issue of certificate.' +this.certificateType), blob)


      this.mediaSevice.uploadBinaryFile(formData).subscribe(res=> {console.log(res) })

    })
  }



//   blobToFile(theBlob: Blob, fileName:string): File {
//     var b: any = theBlob;
//     //A Blob() is almost a File() - it's just missing the two properties below which we will add
//     b.lastModifiedDate = new Date();
//     b.name = fileName;
//     // b.type="application/pdf"

//     //Cast to a File() type
//     return <File>theBlob;
// }

  async blobToBinary (blob){
    const buffer = await blob.arrayBuffer();
    
    // Window.toDataURL()
    const view = new Int8Array(buffer);
    
    return [...view].map((n) => n.toString(2)).join(' ');
  };
  
  // const blob = new Blob(["Example"], { type: "text/plain" });
  
  // blobToBinary(blob).then(console.log);


  print() { 
    this.generatePdf().then(pdf=>{
      pdf.save(this.translate.instant('dashboard.issue of certificate.' +this.certificateType));  
    })
  }


 generatePdf():Promise<jsPDF>{
  var data = document.getElementById('certificate');
  
  return html2canvas(data,{useCORS: true,})
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

}
