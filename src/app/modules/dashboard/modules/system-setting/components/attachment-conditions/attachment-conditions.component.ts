import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { FileEnum } from 'src/app/shared/enums/file/file.enum';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { SettingsService } from '../../services/settings/settings.service';

@Component({
  selector: 'app-attachment-conditions',
  templateUrl: './attachment-conditions.component.html',
  styleUrls: ['./attachment-conditions.component.scss']
})
export class AttachmentConditionsComponent implements OnInit {

  faPlus=faPlus

  schoolTypesOptions = [...this.sharedService.fileTypesOptions]
  parentsTypesOptions = [...this.sharedService.fileTypesOptions]

  onSubmitForm
  loading
  
  attachementConditionsForm=this.fb.group({
    guardians:this.fb.array([]),
    employees:this.fb.array([]),

  })

  get guardiansCtr(){ return this.attachementConditionsForm.controls['guardians'] as FormArray}
  get employeesCtr(){ return this.attachementConditionsForm.controls['employees'] as FormArray}


  constructor( 
    private fb: FormBuilder, 
    private sharedService:SharedService,
    private settingsService:SettingsService,
    private toastr:ToastrService,
    private translate:TranslateService,) { }

  ngOnInit(): void {
    this.getAttachedFilesSettings()
  }


  getAttachedFilesSettings(){
    this.loading = true
    this.settingsService.getAttachedFileRules().subscribe(res=>{
      this.loading = false
      this.fillGuardianRoles(res.guardians)
      this.fillEmployeesRoles(res.employees)
    })

  }

  updateAttachedFiles(){
    this.onSubmitForm=true;
    this.settingsService.updateAttachedFileRules(this.attachementConditionsForm.value).subscribe(rs=>{
      this.toastr.success(this.translate.instant('toasterMessage.successUpdate'))
      this.getAttachedFilesSettings()
      this.onSubmitForm=false
    },()=>{
      this.onSubmitForm=false
      this.toastr.error(this.translate.instant('toasterMessage.error'))
    })
  }


  fillGuardianRoles(roles){
    this.guardiansCtr.clear()
    roles.forEach((el)=>{
      this.guardiansCtr.push(this.fb.group({
        ruleFileId:[el.ruleFileId??0],
        fileSize:[el.fileSize, Validators.required],
        fileType: [FileEnum[el.fileType], Validators.required],
      }))

    })
  }

  fillEmployeesRoles(roles){
    this.employeesCtr.clear()
    roles.forEach((el)=>{
      this.employeesCtr.push(this.fb.group({
        ruleFileId:[el.ruleFileId??0],
        fileSize:[el.fileSize, Validators.required],
        fileType: [FileEnum[el.fileType] , Validators.required],
      }))

    })
  }

  addConditionToEmployees(){
    this.employeesCtr.push(this.fb.group({
      ruleFileId:[0],
      fileType : [3],
      fileSize :[3]
    }))
  }

  deleteConditionFromSchool(index){
    this.employeesCtr.removeAt(index)
  }


  addConditionToParents(){
    this.guardiansCtr.push(this.fb.group({
      ruleFileId:[0],
      fileType : [3],
      fileSize :[3]
    }))
  }
 
  deleteConditionFromParents(index){
    this.guardiansCtr.removeAt(index)
  }

    
}
