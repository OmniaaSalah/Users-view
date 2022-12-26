import { Injectable } from '@angular/core';
import { FileEnum } from '../../enums/file/file.enum';
import * as FileSaver from 'file-saver';
import { Table } from 'primeng/table';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor() { }


  exportFile(extention : FileEnum, items: any[], fileName){
    if(extention === FileEnum.Pdf) this.exportPdf(items,fileName)
    else if(extention === FileEnum.Xlsx) this.exportExcel(items,fileName)

  }


  // <<<<<<<<<<<<<<<<<<< EXCEL >>>>>>>>>>>>>>>>>>>>>>>
  exportExcel(items, fileName){
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(items);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, fileName);
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }


  // <<<<<<<<<<<<<<<<<<< PDF >>>>>>>>>>>>>>>>>>>>>>>
  exportPdf(data:any[], fileName) {
    let exportColumns = this.getColsHead(data).reverse()
    data= data.map(el=>{
      console.log(Object.values(el));
      
      return Object.values(el).reverse()
    })
    
    const doc = new jsPDF('l', 'pt', 'a4')
    doc.addFont("/assets/font/amiri/Amiri-Regular.ttf", "Amiri-Regular", "normal");
    doc.setFont("Amiri-Regular");

    autoTable(doc, {
      styles:{
        font:'Amiri-Regular',
        halign:'right',
      },
      columns: exportColumns,
      body: data,
      didDrawPage: (dataArg) => { 
        doc.text(fileName, dataArg.settings.margin.left, 10);
      }
    }); 
    
    doc.save(fileName+'.pdf');

  }

  getColsHead(tableData: any[]){
    return  Object.keys(tableData[0])
  }

}
