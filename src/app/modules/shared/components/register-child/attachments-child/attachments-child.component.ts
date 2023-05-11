import {  Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { filter, map } from 'rxjs';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { ClaimsEnum } from 'src/app/shared/enums/claims/claims.enum';
import { IndexesEnum } from 'src/app/shared/enums/indexes/indexes.enum';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { IndexesService } from '../../../../indexes/service/indexes.service';
import { StudentsService } from '../../../../students/services/students/students.service';
import { RegisterChildService } from '../../../services/register-child/register-child.service';

@Component({
  selector: 'app-attachments-child',
  templateUrl: './attachments-child.component.html',
  styleUrls: ['./attachments-child.component.scss']
})
export class AttachmentsChildComponent implements OnInit, OnDestroy {
  @Input('mode') mode : 'edit'| 'view'= 'view'

  lang = inject(TranslationService).lang
  get claimsEnum(){ return ClaimsEnum }

  addMode =false
  addAttachModelOpened=false
  studentId = this.route.snapshot.paramMap.get('id')
  childId = this.route.snapshot.paramMap.get('childId')

  filesTypesOptions = [...this.sharedService.fileTypesOptions]

  fileForm= this.fb.group({
    indexId:[],
    titel: this.fb.group({
      ar:[, Validators.required],
      en:[, Validators.required]
    }),
    fileType:[],
    attachments:[[], Validators.required]
  })

  attachments=[]
  loading
  onSubmit
  showErrMess = false

  gurdiansAttachmentsTypes$=this.indexsService.getIndext(IndexesEnum.TheTypeOfFileAttachmentForTheParent)

  constructor(
    private fb:FormBuilder,
    private translate:TranslateService,
    private studentService: StudentsService,
    public childService :RegisterChildService,
    private toaster:ToastrService,
    private sharedService:SharedService,
    private indexsService:IndexesService,
    private route: ActivatedRoute) { }



  ngOnInit(): void {
     this.getAttachment()
  }

  getAttachment(){
    this.loading =true
    this.studentService.getStudentAttachment(this.studentId || this.childId)
    .pipe(map(res => {
      return res.map(value=>{
        const {id, ...otherProps} = value;
        return otherProps;
      })
    }))
    .subscribe(res=>{
      this.loading =false
      this.attachments = res
    },()=>{
      this.loading =false
    })
  }

  updateStudentAttachment(studentId, attachments){
    // let att = attachments.splice(0,2)
    this.onSubmit=true
    this.studentService.updateStudentAttachment(studentId,attachments)
    .subscribe(res=>{

      // this.attachments = res
      this.mode='view'
      this.onSubmit=false
      this.getAttachment()
      this.toaster.success(this.translate.instant('toasterMessage.successUpdate'))

    },err=>{
      this.mode='view'
      this.onSubmit=false
      this.toaster.error(this.translate.instant('toasterMessage.error'))
    })
  }

  onFileUpload(file, i){

    file= file[0] ? file[0] : {url:"", name:"",comment:""}
    this.attachments[i] = {...this.attachments[i], url: file?.url,name:file?.name, comment: file?.comment}
  }

  fileTypeChanged(indexId){
    let isExist= this.attachments.findIndex(el => (el?.indexId && el?.indexId === indexId)) > -1 ? true : false

    if(isExist) this.showErrMess=true
    else this.showErrMess =false
  }

  // addNewAttachment(){
  //   let index = this.attachments.findIndex(el => el?.indexId === this.fileForm.value.indexId)
  //   if(index > -1) this.attachments.splice(index, 1)

  //   this.attachments.unshift({url: '', name: '', titel:this.fileForm.value.titel, comment:'', indexId:this.fileForm.value.indexId})
  //   this.addMode=false
  //   this.showErrMess =false
  //   this.fileForm.reset()
  // }

  addNewAttachment(){
    let index = this.attachments.findIndex(el => el?.indexId && (el?.indexId === this.fileForm.value.indexId))
    if(index > -1) this.attachments.splice(index, 1)

    console.log(index);

    let attach = this.fileForm.get('attachments' as any).value[0]

    this.attachments.unshift({url: attach?.url, name: attach?.name, titel:this.fileForm.value.titel, comment:'', indexId:this.fileForm.value.indexId})
    this.addAttachModelOpened=false
    this.showErrMess =false
    this.fileForm.reset()
    this.updateStudentAttachment(this.studentId|| this.childId, this.attachments)
  }


  onNewAttachmentUploaded(file){
    file= file[0]
    if(file){
      console.log(file);

      this.fileForm.get('attachments'  as any).setValue([{url: file?.url,name:file?.name, comment: file?.comment}])
    }else{
      this.fileForm.get('attachments'  as any).setValue(null)
    }
  }

  ngOnDestroy(): void {
    this.childService.onEditMode$.next(false)
  }
}
