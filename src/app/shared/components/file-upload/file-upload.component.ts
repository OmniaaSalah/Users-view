import { Component, EventEmitter, HostBinding, HostListener, Input, OnInit, Output } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  faXmark = faXmark

  @Input('label') label = ''
  @Input('view') view: 'list' | 'box' | 'rows' = 'box'
  @Output() onFileUpload= new EventEmitter<any>();

  @Output() onFileDropped = new EventEmitter<any>();
  @HostBinding('style.background-color') private background = '#f5fcff'
  @HostBinding('style.opacity') private opacity = '1'

  // //Dragover listener
  @HostListener('dragover', ['$event']) onDragOver(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#9ecbec';
    this.opacity = '0.8'
  }

  // //Dragleave listener
  @HostListener('dragleave', ['$event']) public onDragLeave(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#f5fcff'
    this.opacity = '1'
  }

  // //Drop listener
  @HostListener('drop', ['$event']) public ondrop(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#f5fcff'
    this.opacity = '1'
    let files = evt.dataTransfer.files;
    if (files.length > 0) {
      this.onFileDropped.emit(files)
    }
  }

  selectedImage
  files:Partial<File>[] =[{name:' ملف المرفقات.pdf'},{name:' ملف المرفقات.pdf'},{name:' ملف المرفقات.pdf'}]


  constructor() { }

  ngOnInit(): void {
  }



  
	async uploadFile(event) {
		console.log(event);
    this.files.push(event.target.files[0]);


		let url = await this.imageStream(event)
		this.selectedImage = url

    this.onFileUpload.emit({url, name: event.target.files[0].name})
		console.log(url);


	}

  imageStream(e, maxSize = 10) {
		let image: any;
		let file = e.target.files[0];
		console.log(file);


		  if (e.target.files && e.target.files[0]) {
			const reader = new FileReader();
			image = new Promise(resolve => {
				reader.onload = (event: any) => {
					resolve(event.target.result);
				}
				reader.readAsDataURL(e.target.files[0]);
			}
			)
		}
		return Promise.resolve(image);

	}

	removeImage() {
		this.selectedImage = null
	}


  removeFile(index){
    this.files.splice(index, 1)
  }


  // uploadFile(event) {
  //   for (let index = 0; index < event.length; index++) {
  //     const element = event[index];
  //     this.files.push(element.name)
  //   }
  // }
  deleteAttachment(index) {
    this.files.splice(index, 1)
  }


}
