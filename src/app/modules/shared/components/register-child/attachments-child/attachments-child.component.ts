import {  Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import {  map } from 'rxjs';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { ClaimsEnum } from 'src/app/shared/enums/claims/claims.enum';
import { IndexesEnum } from 'src/app/shared/enums/indexes/indexes.enum';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { IndexesService } from '../../../../indexes/service/indexes.service';
import { StudentsService } from '../../../../students/services/students/students.service';
import { StudentService } from '../../../services/register-child/register-child.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { UserScope } from 'src/app/shared/enums/user/user.enum';

@Component({
  selector: 'app-attachments-child',
  templateUrl: './attachments-child.component.html',
  styleUrls: ['./attachments-child.component.scss']
})
export class AttachmentsChildComponent implements OnInit, OnDestroy {
  @Input('mode') mode : 'edit'| 'view'= 'view'

  lang = inject(TranslationService).lang
  get claimsEnum(){ return ClaimsEnum }
  currentUserScope = inject(UserService).getScope()

  addMode =false
  addAttachModelOpened=false
  studentId = this.route.snapshot.paramMap.get('id')
  childId = this.route.snapshot.paramMap.get('childId')

  filesTypesOptions = [...this.sharedService.fileTypesOptions]

  newAttachmentForm= this.fb.group({
    indexId:[],
    titel: this.fb.group({
      ar:[, Validators.required],
      en:[, Validators.required]
    }),
    fileType:[],
    attachments:[[], Validators.required]
  })

  attachments=[]
  attachmentsCopy
  loading
  onSubmit
  showErrMess = false

  allowedFilesFor = this.currentUserScope ==UserScope.Guardian ?IndexesEnum.TheTypeOfFileAttachmentForTheParent: IndexesEnum.TypesOfFileAttachmentsForSchoolStaff
  gurdiansAttachmentsTypes$=this.indexsService.getIndext(this.allowedFilesFor)

  constructor(
    private fb:FormBuilder,
    private translate:TranslateService,
    private studentService: StudentsService,
    public childService :StudentService,
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
    .pipe(
      map(res => {
        return res.map(attachment=>{
          // const {id, ...otherProps} = value;

          return {
            ...attachment,
            files : attachment.files.map(file =>{
              return {...file ,isActive: file?.isActive ?? true}
            })
          }
          // let attachments =  attachment.files.map(file =>{
          //   // files : file.files.map(el => ({...el, isActive: el?.isActive ?? true}) )
          //   return {...file ,isActive: file?.isActive ?? true}
          // })

          // return attachments
          // return ({...attachment , isActive:attachment.isActive ?? true});
       })
    }))
    .subscribe(res=>{
      this.loading =false
      this.attachments = res
      this.attachmentsCopy = [...res]
      console.log(this.attachments);

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
      this.getAttachment()
      this.toaster.error(this.translate.instant('toasterMessage.error'))
    })
  }



  onFileUpload(file, i){
    console.log(file);

    this.attachments[i].files = file.map(el => ({...el,isActive:true}))

    // if(this.currentUserScope==UserScope.Employee && !file[0]){
    //   file = {...this.attachments[i], isActive:false}
    // }else{
    //   file= file[0] ? file[0] : {url:"", name:"",comment:"",isActive:true}

    // }
    // this.attachments[i] = {...this.attachments[i], url: file?.url,name:file?.name, comment: file?.comment, isActive: file?.isActive}

    // this.attachments= [...this.attachments]
  }

  onFileDeleted(fileIndex, uploaderIndex){

    let files = this.attachments[uploaderIndex]?.files
    files[fileIndex] = {...files[fileIndex], isActive:false}

    if(this.currentUserScope==UserScope.SPEA){
      files[fileIndex] = {...files[fileIndex] ,url:'', name:''}
      // files.splice(fileIndex,1)
    }

  }

  fileTypeChanged(indexId){
    let isExist= this.attachments.findIndex(el => (el?.indexId && el?.indexId === indexId)) > -1 ? true : false

    if(isExist) this.showErrMess=true
    else this.showErrMess =false
  }



  addNewAttachment(){
    let index = this.attachments.findIndex(el => el?.indexId && (el?.indexId === this.newAttachmentForm.value.indexId))
    if(index > -1) this.attachments[index].files = this.attachments[index].files.map(file=> ({...file, url:'', name:''}))


    let attach = this.newAttachmentForm.get('attachments' as any).value[0]

    if(index > -1){
      this.attachments[index].titel = this.newAttachmentForm.value.titel
      this.attachments[index]?.files.unshift({
        id: 0,
        url: attach?.url,
        name: attach?.name,
        isActive:true,
        comment:''
      })
    }else{
      this.attachments.unshift({
        files:[{
          id: 0,
          url: attach?.url,
          name: attach?.name,
          isActive:true,
          comment:''
        }],
        titel : this.newAttachmentForm.value.titel,
        indexId : this.newAttachmentForm.value.indexId,
      })
    }

    // this.attachments.unshift({id: 0, url: attach?.url, name: attach?.name, titel:this.newAttachmentForm.value.titel, comment:'', indexId:this.newAttachmentForm.value.indexId, isActive:true})
    this.addAttachModelOpened=false
    this.showErrMess =false
    this.newAttachmentForm.reset()
    this.updateStudentAttachment(this.studentId|| this.childId, this.attachments)
  }


  onNewAttachmentUploaded(file){
    file= file[0]
    if(file){

      this.newAttachmentForm.get('attachments'  as any).setValue([{id:0, url: file?.url,name:file?.name, comment: file?.comment}])
    }else{
      this.newAttachmentForm.get('attachments'  as any).setValue(null)
    }
  }

  ngOnDestroy(): void {
  }
}
