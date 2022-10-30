import { Component, HostBinding, HostListener, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { IHeader, INotification } from 'src/app/core/Models';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { NotificationService } from 'src/app/modules/notifications/service/notification.service';
import { MessageService } from '../../service/message.service';

@Component({
  selector: 'app-messages-main',
  templateUrl: './messages-main.component.html',
  styleUrls: ['./messages-main.component.scss']
})
export class MessagesMainComponent implements OnInit {

  attachmentList = [];
  files: any = [];
  attachmentsName=[]
  cities=[]
  speaEmpForm: FormGroup;
  parentForm: FormGroup;
  schoolEmpForm: FormGroup
  isShown:boolean=false;
  isShown1:boolean=false;
  isShown2:boolean=false;
  text: string;
  results: string[];


  iteration:number=0;
  display: boolean = false;
  currentNotificationNumber:number=0;
  allNotificationNumber:number=0;
  activeLoadBtn:boolean=false;
  messagesList:INotification[]=[];
  showSpinner:boolean=false;
  componentHeaderData: IHeader={ 
		breadCrump: [
			{label: this.translate.instant('dashboard.Messages.messages') }
			
		],
		mainTitle:{ main:this.translate.instant('dashboard.Messages.messages')},
    showNoOfMessages: true
	}

  constructor(private headerService: HeaderService,private formbuilder:FormBuilder, private toastr:ToastrService,private router: Router, private translate: TranslateService, private messageService: MessageService,private spinner:NgxSpinnerService) {
    this.cities = [
      {name: 'New York', id: 1},
      {name: 'Rome', id: 2},
      {name: 'London', id: 3},
      {name: 'Istanbul', id: 4},
      {name: 'Paris', id: 5}
  ];
   }

  ngOnInit(): void {
    this.messageService.messagesList.subscribe((res)=>{this.messagesList=res.slice(this.iteration,this.iteration+=2);this.currentNotificationNumber=this.messagesList.length;this.showSpinner=true; });
   
    this.headerService.changeHeaderdata(this.componentHeaderData);
    this.allNotificationNumber=this.messageService.messagesAPIList.length;
    this.messageService.messageNumber.next(this.messageService.messagesAPIList.length);
    console.log(this.messageService.messagesAPIList.length);


    this.speaEmpForm = this.formbuilder.group({
      curriculumId: ['', [Validators.required]],
      areaId: ['', [Validators.required]],
      schoolId: ['', [Validators.required]],
      title: ['', [Validators.required,Validators.maxLength(32)]],
      switch1: [false, [Validators.required]],
      switch2: [false, [Validators.required]],
      switch3: [false, [Validators.required]],
      description: ['', [Validators.required,Validators.maxLength(512)]],
    });

    this.parentForm = this.formbuilder.group({
      title: ['', [Validators.required,Validators.maxLength(32)]],
      description: ['', [Validators.required,Validators.maxLength(512)]],
    });


    this.schoolEmpForm = this.formbuilder.group({
      guardian: ['', [Validators.required]],
      title: ['', [Validators.required,Validators.maxLength(32)]],
      switch1: [false, [Validators.required]],
      switch2: [false, [Validators.required]],
      description: ['', [Validators.required,Validators.maxLength(512)]],
    });
  }
  

  search(event) {
    // this.mylookupservice.getResults(event.query).then(data => {
    //     this.results = data;
    // });
}

  showDialog() {
    this.display = true;
}
  getNotReadable()
  {
   

  }
  getReadable()
  {

  }
  onScroll()
  {

    if(this.messageService.messagesAPIList.length==this.messagesList.length)
    { this.showSpinner=false;}
    else
    { this.showSpinner=true;}  


    this.loadMore();
    
  }
 
  loadMore()
  {
    
    this.messageService.messagesList.subscribe((res)=>{this.messagesList.push(...res.slice(this.iteration,this.iteration+=2));this.currentNotificationNumber=this.messagesList.length;});
    console.log("loaded more");
    
  }

  showDetails(MessageId: number) {
    this.router.navigate(['/dashboard/messages/message-detail/', MessageId]);
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

isToggleLabel(e)
  {
    if(e.checked)
    {
        this.isShown=true;
    }
    else{
        this.isShown=false;
    }
  }
  isToggleLabel1(e)
  {
    if(e.checked)
    {
        this.isShown1=true;

    }
    else{
        this.isShown1=false;
    }
  }
  isToggleLabel2(e)
  {
    if(e.checked)
    {
        this.isShown2=true;

    }
    else{
        this.isShown2=false;
    }
  }
    sendMessage(){
      // const form = {
      //   "userId": Number(localStorage.getItem('$AJ$userId')),
      //   "roleId": JSON.parse(localStorage.getItem('$AJ$user')).roles[0].id,
      //   "curriculumId": this.speaEmpForm.value.curriculumId,
      //   "areaId": this.speaEmpForm.value.areaId,
      //   "schoolId": this.speaEmpForm.value.schoolId,
      //   "title": this.speaEmpForm.value.title,
      //   "switch1": this.speaEmpForm.value.switch1,
      //   "switch2": this.speaEmpForm.value.switch2,
      //   "switch3": this.speaEmpForm.value.switch3,
      //   "description": this.speaEmpForm.value.description,
      //   'attachment': this.attachmentList || null
      // }    
      // console.log(form);

      // const form ={
      //   "userId": Number(localStorage.getItem('$AJ$userId')),
      //   "roleId": JSON.parse(localStorage.getItem('$AJ$user')).roles[0].id,
      //   "title": this.parentForm.value.title,
      //   "description": this.parentForm.value.description,
      //   'attachment': this.attachmentList || null
      // }
      // console.log(form);


      const form ={
        "userId": Number(localStorage.getItem('$AJ$userId')),
        "roleId": JSON.parse(localStorage.getItem('$AJ$user')).roles[0].id,
        "guardian": this.schoolEmpForm.value.guardian,
        "title": this.schoolEmpForm.value.title,
        "switch1": this.schoolEmpForm.value.switch1,
        "switch2": this.schoolEmpForm.value.switch2,
        "description": this.schoolEmpForm.value.description,
        'attachment': this.attachmentList || null
      }
      console.log(form);
      
    }
    
    
}