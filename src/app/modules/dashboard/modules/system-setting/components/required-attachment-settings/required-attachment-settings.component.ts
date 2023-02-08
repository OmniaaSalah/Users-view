import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { FileRule, RequestRule } from 'src/app/core/models/settings/settings.model';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { SettingsService } from '../../services/settings/settings.service';

@Component({
  selector: 'app-required-attachment-settings',
  templateUrl: './required-attachment-settings.component.html',
  styleUrls: ['./required-attachment-settings.component.scss']
})
export class RequiredAttachmentSettingsComponent implements OnInit {
  @Input()step
  faPlus=faPlus



  filesTypesOptions = [...this.sharedService.fileTypesOptions]


  onSubmitForm

  requireFilesForm=this.fb.group({
    requestsFiles : this.fb.array([])
  })
  get requestsFilesCtr() { return this.requireFilesForm.controls['requestsFiles'] as FormArray}
  reqCtr(index) {return this.requestsFilesCtr.controls[index] as FormGroup}
  reqFilesCtr(index) { return this.reqCtr(index).controls['files'] as FormArray}



  constructor(
    private fb :FormBuilder, 
    private settingsService:SettingsService,
    private toastr:ToastrService,
    private translate:TranslateService,
    private sharedService: SharedService) { }


  ngOnInit(): void {
    this.getRequiredFilesSettings()
    
  }


  getRequiredFilesSettings(){
    this.settingsService.getRequiredFiles().subscribe(res=>{
      this.fillRequestFiles(res)
    })

  }

  updateRequiredFiles(){
    this.onSubmitForm=true;
    this.settingsService.updateRequiredFiles(this.requireFilesForm.value.requestsFiles).subscribe(rs=>{
      this.toastr.success(this.translate.instant('toasterMessage.successUpdate'))
      this.getRequiredFilesSettings()
      this.onSubmitForm=false
    },()=>{
      this.onSubmitForm=false
      this.toastr.error(this.translate.instant('toasterMessage.error'))
    })
  }

  fillRequestFiles(requestFiles:RequestRule[]){
    this.requestsFilesCtr.clear()
    requestFiles.forEach((el:RequestRule)=>{
      this.requestsFilesCtr.push(this.fb.group({
        ruleId:[el.ruleId??0],
        filesCount:[el.filesCount, Validators.required],
        requestType: [el.requestType, Validators.required],
        isRequired:[el.isRequired, Validators.required],
        files: this.fillReqFilesConditions(el.files),
      }))

    })
  }

  fillReqFilesConditions(filesList:FileRule[]): FormArray{
    let files = this.fb.array([]) as FormArray
    filesList.forEach(item=>{
      files.push(this.fileConditionFormGroup(item))
    })

    return files
  }


  fileConditionFormGroup(file?:FileRule):FormGroup{
    return this.fb.group({
        ruleFileId:[file?.ruleFileId??0],
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

  

  deleteRow(index){
  this.requestsFilesCtr.removeAt(index)
  }


}
