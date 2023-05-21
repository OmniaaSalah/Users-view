import { Component,OnChanges, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import {faFileCircleExclamation, faXmark } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, filter, finalize, forkJoin, Observable, of, take, tap } from 'rxjs';
import { capitalizeFirstLetter } from 'src/app/core/classes/helpers';
import { Localization } from 'src/app/core/models/global/global.model';
import { MapedFileRule } from 'src/app/core/models/settings/settings.model';
import { SettingsService } from 'src/app/modules/system-setting/services/settings/settings.service';
import { FileTypeEnum, FileExtentions } from '../../enums/file/file.enum';
import { MediaService } from '../../services/media/media.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { UserService } from 'src/app/core/services/user/user.service';

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
  faFileCircleExclamation =faFileCircleExclamation
  lang = inject(TranslationService).lang
  currentUserScope = inject(UserService).getScope()

  @Input() theme :'chat' | 'default' = 'default'
  @Input() title = ''
  @Input() label = this.translate.instant('shared.clickToUploadFile')
  @Input() hasComment = false
  @Input() hideDeletedBy = true
  @Input() imgUrl=''

  @Input() dynamic
  @Input() extractFormData=false // include FormData object in output event "@Output() onFileUpload"
  @Input() multiple = false
  @Input() filesLimit = 1
  @Input() files: CustomFile[] =[]  // files to view
  @Input() view: 'box' | 'full' ='full'  // file uploader theme variants
  @Output() onFileUpload= new EventEmitter<any>();
  @Output() onFileDelete= new EventEmitter<any>();

  @Input() maxFileSize
  @Input() set accept (value: FileTypeEnum | FileTypeEnum[]) {

    if(!value || value==null)  return;

    this.allowedFilesType = value

    if(value instanceof Array){
      this.allowedFilesExtentions= value.map(el => FileExtentions[el]).join(',')
    }else{
      this.allowedFilesExtentions = FileExtentions[value]
    }

  }


  public filesRules

  public allowedFilesType: FileTypeEnum | FileTypeEnum[]
  public allowedFilesExtentions:string

  // private allowedFilesType: FileEnum | FileEnum[] = FileEnum.Pdf
  // allowedFilesExtentions:string = FileExtentions.Pdf

  // For File Comment Edit Mode
  editMode=false

  inProgress=false
  uploaded =false
  hideCheck=true



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

  allAllowedFilesType: FileTypeEnum[]

  ngOnInit(): void {

    this.settingService.fileRules$.subscribe((rules:MapedFileRule)=> {
      console.log(rules);

      this.filesRules =rules

      // set file Size Dynamically (depend on provided file type)
      if(!this.allowedFilesType){
        this.allAllowedFilesType =<FileTypeEnum[]> Object.keys(this.filesRules)
        // this.allAllowedFilesType = Object.keys(this.filesRules).map((key: FileTypeEnum) => {
        //   this.filesRules[key]?.type as FileTypeEnum
        // })
      }

      if(!this.maxFileSize && this.allowedFilesType){
        this.maxFileSize = this.getMaxAllowedSizeForFileType(this.allowedFilesType)
      }

    })
  }


  // setMaxFileSizeAllowed(showError = false){

  //   if(this.allowedFilesType instanceof Array){
  //     this.maxSize = Math.max(...this.allowedFilesType.map(el => this.filesRules[el]?.size))
  //   }else{
  //     // console.log(this.filesRules[this.allowedFilesType]);

  //     if(!this.filesRules || !this.filesRules[this.allowedFilesType]){
  //       if(showError) this.toaster.error(`عذرا الملف المرفق غير مسموح به `)
  //       this.maxSize = 3
  //       return
  //     }
  //     this.maxSize = this.filesRules[this.allowedFilesType]?.size || 3

  //   }
  // }



 uploadedFilesName:string[]=[]
 uploadedFilesFormData:FormData[]=[]

 getMaxAllowedSizeForFileType(fileType: FileTypeEnum | FileTypeEnum[]) : number | null{
  if(fileType instanceof Array){

    return  Math.max(...fileType.map(el => this.filesRules[el]?.size))
  }else{

    if(!this.filesRules || !this.filesRules[fileType])  return null

    return this.filesRules[fileType]?.size || 3

  }
 }


 getFileTypeEnum(fileName) :FileTypeEnum | null{
    const lastDot = fileName.lastIndexOf('.');
    const extention = fileName.substring(lastDot + 1);
     if(FileTypeEnum[capitalizeFirstLetter(extention)]) return FileTypeEnum[capitalizeFirstLetter(extention)]
     else return null
 }


  validateSelectedFiles(event) {
    let files: File[]=[...event.target.files]

    let maxFileSize = this.maxFileSize

    // // set file Size Dynamically (depend on provided file type)
    // if(!this.maxFileSize && this.allowedFilesType){
    //   maxFileSize = this.getMaxAllowedSizeForFileType(this.allowedFilesType)

    // }
    if(this.allowedFilesType && !maxFileSize) {
      this.toaster.error(`عذرا الملف المرفق غير مسموح به `)
      return;
    }

    // Dynamically Extract Uploaded File Type
    if(!this.allowedFilesType){

      const fileType : FileTypeEnum = this.getFileTypeEnum(files[0]?.name)
      maxFileSize = this.getMaxAllowedSizeForFileType(fileType)
      console.log(maxFileSize);


      if(!maxFileSize) {
        this.toaster.error(`عذرا الملف المرفق غير مسموح به `)
        return;
      }

    }


    // Validation Condition 1
    if((files.length + this.files.length) > this.filesLimit) {
      this.toaster.error(` يجب ان لا يزيد عدد الملفات عن  عدد ${this.filesLimit} ملف`)
      return;
    }

    let streams:Observable<any>[]=[]

    files.forEach((file, index)=>{

      // Validation Condition 2
      if(!maxFileSize) return

      if(this.fileSizeMB(file.size) > maxFileSize){
        this.toaster.error(`يجب ان لا يزيد حجم الملف عن ${maxFileSize} ميجابايت`, file.name)

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
      if (fileUrl) {
        window.open(fileUrl, '_blank').focus();
      }

  }

}
