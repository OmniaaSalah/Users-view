import { Component,OnChanges, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {faFileCircleExclamation, faXmark } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { catchError, filter, finalize, forkJoin, Observable, of, take, tap } from 'rxjs';
import { Localization } from 'src/app/core/models/global/global.model';
import { MediaService } from '../../services/media/media.service';

export interface CustomFile{
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
 
  @Input() title = ''
  @Input() label = ' انقر لإرفاق ملف'
  @Input() accept = 'application/*'
  @Input() imgUrl=''
  @Input() extractFormData=false // include dormData object in output event "@Output() onFileUpload"
  @Input() multiple = false
  @Input() hasComment = false
  @Input() maxFilesToUpload = 1
  @Input() maxFileSize =3
  @Input() files: CustomFile[] =[]  // files to view
  @Input('view') view: 'list' | 'box' | 'rows' | 'full'  // file uploader theme variants
  @Output() onFileUpload= new EventEmitter<any>();
  @Output() onFileDelete= new EventEmitter<any>();

  // For File Comment Edit Mode
  editMode=false

  inProgress=false
  uploaded =false
  hideCheck=true
  faFileCircleExclamation =faFileCircleExclamation


  constructor(private media: MediaService, private toaster:ToastrService) { }

  ngOnChanges(){
    this.files.forEach((file, index)=>{
      console.log(file);
      
      if(!file.url) this.files.splice(index,1)
    })
  }

  ngOnInit(): void {}


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
      if(this.fileSizeMB(file.size) > this.maxFileSize){
        this.toaster.error(`يجب ان لا يزيد حجم الملف عن ${this.maxFileSize}MB`, file.name)

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
        if(this.extractFormData) file = {url: res.url, name: res.fileName, formData: this.uploadedFilesFormData[index]}
        else file = {url: res.url, name: res.fileName}

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

}
