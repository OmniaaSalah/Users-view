import { Component, EventEmitter, HostBinding, HostListener, Input, OnInit, Output } from '@angular/core';
import { faCircleInfo, faFileCircleCheck, faFileCircleExclamation, faXmark } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { finalize, take } from 'rxjs';
import { MediaService } from '../../services/media/media.service';

export interface CustomFile{
  url:string,
  name: string
}
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  faXmark = faXmark
  // application/pdf
  @Input() title = ''
  @Input() label = ' انقر لإرفاق ملف'
  @Input() accept = 'image/*'
  @Input() url=''
  @Input() multiple = false
  @Input() maxFilesToUpload = 10
  @Input() files: CustomFile[] =[]
  @Input('view') view: 'list' | 'box' | 'rows' | 'full'
  @Output() onFileUpload= new EventEmitter<any>();
  @Output() onFileDelete= new EventEmitter<any>();

  inProgress=false
  uploaded =false
  hideCheck=true
  faFileCircleExclamation =faFileCircleExclamation
  // @Output() onFileDropped = new EventEmitter<any>();
  // @HostBinding('style.background-color') private background = '#f5fcff'
  // @HostBinding('style.opacity') private opacity = '1'

  // //Dragover listener
  // @HostListener('dragover', ['$event']) onDragOver(evt) {
  //   evt.preventDefault();
  //   evt.stopPropagation();
  //   this.background = '#9ecbec';
  //   this.opacity = '0.8'
  // }

  // // //Dragleave listener
  // @HostListener('dragleave', ['$event']) public onDragLeave(evt) {
  //   evt.preventDefault();
  //   evt.stopPropagation();
  //   this.background = '#f5fcff'
  //   this.opacity = '1'
  // }

  // // //Drop listener
  // @HostListener('drop', ['$event']) public ondrop(evt) {
  //   evt.preventDefault();
  //   evt.stopPropagation();
  //   this.background = '#f5fcff'
  //   this.opacity = '1'
  //   let files = evt.dataTransfer.files;
  //   if (files.length > 0) {
  //     this.onFileDropped.emit(files)
  //   }
  // }

  // files:Partial<File>[] =[
  //   // {name:' ملف المرفقات.pdf'},
  //   // {name:' ملف المرفقات.pdf'},
  //   // {name:' ملف المرفقات.pdf'}
  // ]


  constructor(private media: MediaService, private toaster:ToastrService) { }

  ngOnInit(): void {


  }



  
  async uploadFile(event) {
    let files: File[]=event.target.files
    let file: File=event.target.files[0]
    console.log(event);
    

    // incase their is More than one file uploaded
    if(files && files[0]){
      for(let i=0 ; i<files.length; i++){

        // this.onOtherFileUpload(files[i])
        this.inProgress=true

    const FORM_DATA = new FormData()
    FORM_DATA.append('file', files[i])

      await this.media.uploadMedia(FORM_DATA, 'file')
      .pipe(
        take(1),
        finalize(()=> setTimeout(()=> this.hideCheck=true, 1500) ))
        .toPromise().then(res =>{
        this.url =res.url
        this.files.push({url: res.url, name: file.name});
        this.onFileUpload.emit(this.files)

        this.inProgress=false;
        this.uploaded=true
        this.hideCheck=false
        this.toaster.success('تم رفع الملف بنجاج')
      },err =>{

          this.inProgress=false;
          this.uploaded=false
          this.hideCheck=false
        this.toaster.error('حدث خطأ يرجاء المحاوله مره اخرى')
      })
      }
      // files.forEach(file =>{
        // if(file.type.includes('image')){
        //   this.onImageUpload(file)
    
        // } else if(file.type.includes('application')){
        //   this.onOtherFileUpload(file)
        // }
      // })

    }else{
  // incase one file uploaded
  this.onOtherFileUpload(file)
      // if(file.type.includes('image')){
      //   this.onImageUpload(file)
  
      // } else if(file.type.includes('application')){
      //   this.onOtherFileUpload(file)
      // }
    }



	}



  // ========================================================
  // Files Upload Logic
  // ========================================================
  async onOtherFileUpload(file:File){
    console.log(file);
    
  }

  removeFile(index){
    this.files.splice(index, 1)
    this.onFileDelete.emit(this.files)
  }

  // =========================================================




  // ========================================================
  // Image Upload Logic
  // ========================================================
  // async onImageUpload(file:File){
  //   let dataURL = await this.imageStream(event)
  //   this.url = dataURL
    
  //   this.inProgress=true;

  //   const FORM_DATA = new FormData()

  //   FORM_DATA.append('file', file)
  //   this.media.uploadMedia(FORM_DATA).
  //   pipe(take(1),
  //   finalize(()=> setTimeout(()=> this.hideCheck=true, 2500) ))
  //   .subscribe(res =>{

  //     this.onFileUpload.emit({url: res.url, name: file.name})
  //     this.inProgress=false;
  //     this.uploaded=true
  //     this.hideCheck=false
  //   },err =>{
  //       this.inProgress=false;
  //       this.uploaded=false
  //       this.hideCheck=false
  //   })

  // }

  removeImage() {
		this.url = null
    this.onFileDelete.emit()
	}

// =========================================================





  // Helper Methods
  imageStream(e, maxSize = 10) {
		let image: any;
		let file = e.target.files[0];

		  if (e.target.files && e.target.files[0]) {
			const reader = new FileReader();
			image = new Promise(resolve => {
				reader.onload = (event: any) => {
          // let url= this.getBase64StringFromDataURL(event.target.result)
          
					resolve(event.target.result);
				}
				reader.readAsDataURL(e.target.files[0]);
			}
			)
		}
		return Promise.resolve(image);
	}

  getBase64StringFromDataURL(dataURL) {
    return dataURL.replace('data:', '').replace(/^.+,/, '');
  }


}
