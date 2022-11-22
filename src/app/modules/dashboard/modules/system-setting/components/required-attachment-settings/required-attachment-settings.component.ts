import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FileCondition, RequestCondition } from 'src/app/core/models/settings/settings.model';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { SettingsService } from '../../services/settings/settings.service';

@Component({
  selector: 'app-required-attachment-settings',
  templateUrl: './required-attachment-settings.component.html',
  styleUrls: ['./required-attachment-settings.component.scss']
})
export class RequiredAttachmentSettingsComponent implements OnInit {

  faPlus=faPlus



  filesTypesOptions = [...this.sharedService.fileTypesOptions]


  requestsSettingsForm=this.fb.group({
    requests : this.fb.array([])
  })
  get requestsCtr() { return this.requestsSettingsForm.controls['requests'] as FormArray}
  reqCtr(index) {return this.requestsCtr.controls[index] as FormGroup}
  reqFilesCtr(index) { return this.reqCtr(index).controls['files'] as FormArray}



  constructor(
    private fb :FormBuilder, 
    private settingsService:SettingsService,
    private sharedService: SharedService) { }


  ngOnInit(): void {
    this.getRequiredFilesSettings()
    
  }



  getRequiredFilesSettings(){
    this.settingsService.filesSettings.forEach((el:RequestCondition)=>{
      this.requestsCtr.push(this.fb.group({
        maxCount:[el.maxCount, Validators.required],
        requestName: [el.requestName, Validators.required],
        status:[el.status, Validators.required],
        files: this.fillReqFilesConditions(el.files),
      }))

    })

  }


  fillReqFilesConditions(filesList:FileCondition[]): FormArray{
    let files = this.fb.array([]) as FormArray
    filesList.forEach(item=>{
      files.push(this.fileConditionFormGroup(item))
    })

    return files
  }


  fileConditionFormGroup(file?:FileCondition):FormGroup{
    return this.fb.group({
        name: this.fb.group({
          ar: [file?.name.ar ?? '', Validators.required],
          en: [file?.name.ar ??'', Validators.required],
        }),
        type: [file?.type ?? ''],
        size:[file?.size?? 2]

    })

  }

  filesCountChange(reqFilesCount, reqIndex){
    
    let filesLength = this.reqFilesCtr(reqIndex).length
    if(filesLength === reqFilesCount) return
    
    let subtractRes = Math.abs(reqFilesCount - filesLength)
    console.log(subtractRes);

    if(reqFilesCount < filesLength ){
      // slice
      for(let i=0; i<subtractRes; i++){
        this.deleteFileConditionFromReq(reqIndex, filesLength-1)
      }
    }
    if(reqFilesCount > filesLength){
      // add
      for(let i=0; i<subtractRes; i++){
        this.addNewFileConditionToReq(reqIndex)
      }
    }
  }

  addNewFileConditionToReq(reqIndex){
    this.reqFilesCtr(reqIndex).push(this.fileConditionFormGroup())
  }

  deleteFileConditionFromReq(reqIndex, fileIndex){    
    this.reqFilesCtr(reqIndex).removeAt(fileIndex)
  }


  addFileRole(){

  }


}
