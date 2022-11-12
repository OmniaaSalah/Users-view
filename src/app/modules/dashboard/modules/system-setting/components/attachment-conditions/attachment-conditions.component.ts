import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { SharedService } from 'src/app/shared/services/shared/shared.service';

@Component({
  selector: 'app-attachment-conditions',
  templateUrl: './attachment-conditions.component.html',
  styleUrls: ['./attachment-conditions.component.scss']
})
export class AttachmentConditionsComponent implements OnInit {

  faPlus=faPlus

  
  diseases=[{name:'أمراض القلب'},{name:'فوبيا'},{name:'حساسيه'},{name:'السكرى'}];
  schoolTypesOptions = [...this.sharedService.fileTypesOptions]
  parentsTypesOptions = [...this.sharedService.fileTypesOptions]

  attachementConditionsForm=this.fb.group({
    parents:this.fb.array([]),
    school:this.fb.array([]),

  })

  get schoolCtr(){ return this.attachementConditionsForm.controls['school'] as FormArray}
  get parentsCtr(){ return this.attachementConditionsForm.controls['parents'] as FormArray}


  constructor( private fb: FormBuilder, private sharedService:SharedService) { }

  ngOnInit(): void {
  }

  addConditionToSchool(){
    this.schoolCtr.push(this.fb.group({
      fileType : [5],
      size :[5]
    }))
  }

  deleteConditionFromSchool(index){
    this.schoolCtr.removeAt(index)
  }


  addConditionToParents(){
    this.parentsCtr.push(this.fb.group({
      fileType : [5],
      size :[5]
    }))
  }
 
  deleteConditionFromParents(index){
    this.parentsCtr.removeAt(index)
  }

    
}
