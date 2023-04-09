import { Component,OnChanges, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {faFileCircleExclamation, faXmark } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, filter, finalize, forkJoin, Observable, of, take, tap } from 'rxjs';
import { Localization } from 'src/app/core/models/global/global.model';
import { SettingsService } from 'src/app/modules/dashboard/modules/system-setting/services/settings/settings.service';
import { FileEnum, FileExtentions } from '../../enums/file/file.enum';
import { MediaService } from '../../services/media/media.service';

export interface CustomFile{
  id?:number
  url:string,
  name: string,
  comment?:string
  Titel?:Localization
}
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit,OnChanges {
  faXmark = faXmark
  filesRules
  @Input() theme :'chat' | 'default' = 'default'
  @Input() title = ''
  @Input() label = this.translate.instant('shared.clickToUploadFile')
  @Input() imgUrl=''
  @Input() extractFormData=false // include FormData object in output event "@Output() onFileUpload"
  @Input() multiple = false
  @Input() hasComment = false
  @Input() maxFilesToUpload = 1
  @Input() files: CustomFile[] =[]  // files to view
  @Input('view') view: 'list' | 'box' | 'rows' | 'full'  // file uploader theme variants
  @Output() onFileUpload= new EventEmitter<any>();
  @Output() onFileDelete= new EventEmitter<any>();

  // @Input() accept:FileEnum | FileEnum[] = FileEnum.Pdf
  @Input() set accept (value: FileEnum | FileEnum[]) {
    if(!value) {
      this.allowedFilesExtentions = FileExtentions.Pdf;
      this.allowedFilesType= FileEnum.Pdf
      return;
    }

    this.allowedFilesType = value

    if(value instanceof Array){
      this.allowedFilesExtentions= value.map(el => FileExtentions[el]).join(',')
    }else{
      this.allowedFilesExtentions = FileExtentions[value]
    }

  }

  @Input() set maxFileSize(size){
    if(size) this.fileSize= size
    else this.setMaxFileSizeAllowed()
  }

  fileSize
  private allowedFilesType: FileEnum | FileEnum[] = FileEnum.Pdf
  allowedFilesExtentions:string = FileExtentions.Pdf


  // For File Comment Edit Mode
  editMode=false

  inProgress=false
  uploaded =false
  hideCheck=true
  faFileCircleExclamation =faFileCircleExclamation


  constructor(
    private media: MediaService,
    private toaster:ToastrService,
    private translate:TranslateService,
    private settingService:SettingsService) { }


  ngOnChanges(){
    this.files.forEach((file, index)=>{
      if(!file.url) this.files.splice(index,1)
    })

  }

  ngOnInit(): void {



    this.settingService.fileRules$.subscribe(res=> {
      this.filesRules =res

      if(!this.fileSize && this.filesRules) this.setMaxFileSizeAllowed()
    })
  }


  setMaxFileSizeAllowed(){
    if(this.allowedFilesType instanceof Array){
      this.fileSize = Math.max(...this.allowedFilesType.map(el => this.filesRules[el]?.size))
    }else{
      this.fileSize = this.filesRules[this.allowedFilesType].size
      console.log(this.filesRules);

    }
  }



 uploadedFilesName:string[]=[]
 uploadedFilesFormData:FormData[]=[]

  validateSelectedFiles(event) {
    let files: File[]=[...event.target.files]


    // Validation Condition 1
    if((files.length + this.files.length) > this.maxFilesToUpload) {
      this.toaster.error(` يجب ان لا يزيد عدد الملفات عن  عدد ${this.maxFilesToUpload} ملف`)
      return;
    }

    let streams:Observable<any>[]=[]

    files.forEach((file, index)=>{

      // Validation Condition 2
      if(this.fileSizeMB(file.size) > this.fileSize){
        this.toaster.error(`يجب ان لا يزيد حجم الملف عن ${this.fileSize}MB`, file.name)

      }else{
        const FORM_DATA = new FormData()
        FORM_DATA.append('file', file)

        this.uploadedFilesName.push(file.name)
        this.uploadedFilesFormData.push(FORM_DATA)

        let httpCall = this.media.uploadMedia(FORM_DATA)
        .pipe(
          catchError(err=> {
            this.uploadedFilesName.splice(index,1)
            this.uploadedFilesFormData.splice(index,1)
            this.toaster.error(`عذرا حدث خطأ فى رفع الملف ${file.name} يرجى المحاوله مره اخرى`)
            return of(null)
        }))

        streams.push(httpCall)
      }

    })

    if(streams.length) this.uploadFiles(streams);

	}



  uploadFiles(httpArr){

    this.inProgress=true

    forkJoin(httpArr)
    .pipe(
      take(1),
      filter((res:any) => res !=null),
      finalize(()=> setTimeout(()=> this.hideCheck=true, 1500) ),
    )
    .subscribe((res:any[]) =>{


      // special Case for for viewing school logo
      this.imgUrl =res[0]?.url

      let uploadedFiles = res.map((res, index)=> {
        // let file = {url: res.url, name: this.uploadedFilesName[index]}
        let file
        if(this.extractFormData) file = {url: res?.url, name: res?.fileName, formData: this.uploadedFilesFormData[index]}
        else file = {url: res?.url, name: res?.fileName}

        if(this.hasComment) file['comment']=''
        return file
      });

      if(uploadedFiles.length){
        this.files = [...this.files, ...uploadedFiles ]
        this.onFileUpload.emit(this.files)
        this.toaster.success(`تم رفع الملف ${this.uploadedFilesName.join(' | ')} بنجاح`)

      }

        this.inProgress=false;
        this.uploaded=true
        this.hideCheck=false

        this.uploadedFilesName=[]

    },err =>{

      this.inProgress=false;
      this.uploaded=false
      this.hideCheck=false
      this.toaster.error('حدث خطأ يرجاء المحاوله مره اخرى')
    })
  }



  removeFile(index){

    this.files.splice(index, 1)
    this.onFileDelete.emit(this.files)
    this.onFileUpload.emit(this.files)
    this.imgUrl=''
  }


  fileSizeMB = (size: string | number) => {
    return +size / 1024 / 1024
  }

  openFile(fileUrl : string)
  {
   console.log("open")
      if (fileUrl) {
        window.open(fileUrl, '_blank').focus();
      }

  }

}
