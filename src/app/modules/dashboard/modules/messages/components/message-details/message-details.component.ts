import { Component, HostBinding, HostListener, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { MessageService } from '../../service/message.service';

@Component({
  selector: 'app-message-details',
  templateUrl: './message-details.component.html',
  styleUrls: ['./message-details.component.scss']
})
export class MessageDetailsComponent implements OnInit {
  uploadedFiles: any[] = [];
  imagesResult =[]
  attachmentList = [];
  files: any = [];
  replayForm: FormGroup;
  attachmentsName=[]
  display: boolean = false;

  constructor(private headerService: HeaderService,private messageService: MessageService,private toastr:ToastrService,private formbuilder:FormBuilder, private router: Router, private translate: TranslateService) { }

  ngOnInit(): void {
    this.replayForm = this.formbuilder.group({
      messegeText: ['', [Validators.required,Validators.maxLength(512)]],
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
  
onUpload(event) {

  for(let file of event.files) {

      this.uploadedFiles.push(file);

  }

  }
  onFileUpload(data: {files: Array<File>}): void {

    const requests = [];

    data.files.forEach(file => {

      const formData = new FormData();

      formData.append('file', file, file.name);

      requests.push(this.messageService.onFileUpload(formData));

    });

    forkJoin(requests).subscribe((res: Array<{url: string}>) => {
      console.log(res);
      
      if (res && res.length > 0) {

        res.forEach(item => {
          console.log(item);
          
          const extension = item.url.split('.').pop();
          console.log(extension);
          

            console.log(item.url);
            
              this.imagesResult.push(item.url)
            console.log(this.imagesResult);
        });

      }

    });

  }
  sendReply(){
    const form = {
      "userId": Number(localStorage.getItem('$AJ$userId')),
      "roleId": JSON.parse(localStorage.getItem('$AJ$user')).roles[0].id,
      "messegeText": this.replayForm.value.messegeText,
      'attachment': this.attachmentList || null
    }    
    console.log(form);
    this.messageService.sendReply(form.userId,form).subscribe(res=>{
      this.toastr.success('Message Sent Successfully')
      this.replayForm.reset();
      },err=>{
          this.toastr.error(err)
        })
    
    }
  

  }
