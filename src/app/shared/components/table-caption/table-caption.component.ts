import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-table-caption',
  templateUrl: './table-caption.component.html',
  styleUrls: ['./table-caption.component.scss']
})
export class TableCaptionComponent implements OnInit {
  @Input('filterFormControls') formControls:string[] =[]
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
  openCsv()
  {

  }
  openXslx()
  {
    
  }
}
