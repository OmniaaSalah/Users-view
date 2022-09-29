import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FileEnum } from '../../enums/file/file.enum';

@Component({
  selector: 'app-table-caption',
  templateUrl: './table-caption.component.html',
  styleUrls: ['./table-caption.component.scss']
})
export class TableCaptionComponent implements OnInit {
  @Input('filterFormControls') formControls:string[] =[];
  @Output() onExport = new EventEmitter();


  showFilesModel:boolean=false;
  showFilterBox = false
  searchText=""

  showFilterModel=false

  filterForm
  
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {

    this.initForm()

  }

  initForm(){
    this.filterForm= this.fb.group(()=>{
      let formGroup={}
      this.formControls.forEach(item =>{
  
        formGroup[item] =[]
      })
      console.log(formGroup);
      return formGroup
    })

    // let formGroup={}
    // this.formControls.forEach(item =>{

    //   formGroup[item] =[]
    // })
    // console.log(formGroup);
    // return formGroup
  }


  submitForm(){
    this.showFilterModel = false
  }

  clearForm(){
    this.showFilterModel = false

  }

  exportCsv(){
    this.onExport.emit(FileEnum.CSV)
    
  }


  exportXslx(){
    this.onExport.emit(FileEnum.XLSX)

  }

}
