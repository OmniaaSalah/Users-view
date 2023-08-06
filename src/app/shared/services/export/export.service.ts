import { Injectable ,inject} from '@angular/core';
import { FileTypeEnum } from '../../enums/file/file.enum';
import * as FileSaver from 'file-saver';
import { Table } from 'primeng/table';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ExportService {
  lang = inject(TranslationService).lang
  showLoader$ = new BehaviorSubject(false)
  constructor() { }


  exportFile(extention : FileTypeEnum, items: any[], fileName){
    if(extention === FileTypeEnum.Pdf) this.exportPdf(items,fileName)
    else if(extention === FileTypeEnum.Xlsx) this.exportExcel(items,fileName)

  }


  // <<<<<<<<<<<<<<<<<<< EXCEL >>>>>>>>>>>>>>>>>>>>>>>
  exportExcel(items, fileName){
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(items);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, fileName)

    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION)
    this.showLoader$.next(false)
  }


  // <<<<<<<<<<<<<<<<<<< PDF >>>>>>>>>>>>>>>>>>>>>>>
  exportPdf(data:any[], fileName) {

    let exportColumns = this.getColsHead(data).reverse()
    data= data.map(el=>{
      return Object.values(el).reverse()
    })

    const doc = new jsPDF('l', 'pt', 'a2')

    doc.addFont("/assets/font/amiri/Amiri-Regular.ttf", "Amiri-Regular", "normal");
    doc.setFont("Amiri-Regular");

    autoTable(doc, {
      styles:{
        font:'Amiri-Regular',
        halign:'right',
        // overflow:'hidden',
        // cellWidth: "wrap"

      },
      columns: exportColumns,
      body: data,
      didDrawPage: (dataArg) => {
        doc.setFontSize(20);
        this.lang=='ar'? doc.text(fileName,doc.internal.pageSize.width-40,25,{align: 'right'}):doc.text(fileName,dataArg.settings.margin.right,30);
      }
    });

    doc.save(fileName+'.pdf');
    this.showLoader$.next(false)

  }

  getColsHead(tableData: any[]){
    return  tableData[0] ? Object.keys(tableData[0]) : []
  }

}
