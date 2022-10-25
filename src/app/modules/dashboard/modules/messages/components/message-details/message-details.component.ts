import { Component, HostBinding, HostListener, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { HeaderService } from 'src/app/core/services/header-service/header.service';

@Component({
  selector: 'app-message-details',
  templateUrl: './message-details.component.html',
  styleUrls: ['./message-details.component.scss']
})
export class MessageDetailsComponent implements OnInit {

  attachmentList = [];
  files: any = [];
  replayForm: FormGroup;
  attachmentsName=[]
  display: boolean = false;

  constructor(private headerService: HeaderService,private toastr:ToastrService,private formbuilder:FormBuilder, private router: Router, private translate: TranslateService) { }

  ngOnInit(): void {
    this.replayForm = this.formbuilder.group({
      description: ['', [Validators.required,Validators.maxLength(512)]],
    });

    // this.attachmentList.forEach(file => {
    //   //  this.visit.addVisit(newAdHocVisit).pipe(
    //   //    mergeMap((res1) => this.visit.sendAttachment(file,res1.id))
    //   //  ).subscribe(res2=>{})
    //   console.log(file);
      
    //  })

    this.headerService.Header.next(
      {
        'breadCrump': [
          { label: this.translate.instant('dashboard.Messages.messages'),routerLink:'/dashboard/messages/messages',routerLinkActiveOptions:{exact: true} },
          { label: this.translate.instant('dashboard.Messages.Chat Details') }
        ],
        mainTitle: { main: this.translate.instant('dashboard.Messages.Chat Details') }
      }
    );
  }


  showDialog() {
    this.display = true;
}
  
  
@Output() onFileDropped = new EventEmitter<any>();

@HostBinding('style.background-color') private background = '#f5fcff'
@HostBinding('style.opacity') private opacity = '1'

//Dragover listener
@HostListener('dragover', ['$event']) onDragOver(evt) {
  evt.preventDefault();
  evt.stopPropagation();
  this.background = '#9ecbec';
  this.opacity = '0.8'
}

//Dragleave listener
@HostListener('dragleave', ['$event']) public onDragLeave(evt) {
  evt.preventDefault();
  evt.stopPropagation();
  this.background = '#f5fcff'
  this.opacity = '1'
}

//Drop listener
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

deleteAttachment(index) {
  this.attachmentList.splice(index, 1)
  this.attachmentsName.splice(index,1)
  console.log(this.attachmentList);
  
}

upload = (event) => {
  let fileList = event.target.files;
  let fileSize = event.target.files[0].size;
  if(fileSize > 2e+6){
    this.toastr.error('The File Size Must be Less Than 5MB')
    return;
  }else{
    console.log(fileList);
    
      [...fileList].forEach((file) => {
    let reader = new FileReader();
    reader.onload = () => {
      let x = reader.result.toString().split(',')[1];  
      this.attachmentsName.push(file.name)    
      // let data = file.data
      let convertedFile = { url: x };
      this.attachmentList.push(convertedFile);
      this.files.push(convertedFile) // remove it if it error
    };
    reader.readAsDataURL(file);
 
  console.log(this.attachmentList);
    console.log(this.attachmentsName);
    
}
  )}}
  sendReply(){
    const form = {
      "userId": Number(localStorage.getItem('$AJ$userId')),
      "roleId": JSON.parse(localStorage.getItem('$AJ$user')).roles[0].id,
      "description": this.replayForm.value.description,
      'attachment': this.attachmentList || null
    }    
    console.log(form);
    
    // this._dashboard.getTotalBookings(formDate).subscribe(res => {
      
    //   })
    }
  }


