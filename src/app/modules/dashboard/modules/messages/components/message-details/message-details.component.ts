import { Component, HostBinding, HostListener, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { MessageStatus } from 'src/app/shared/enums/status/status.enum';
import { MessageService } from '../../service/message.service';

@Component({
  selector: 'app-message-details',
  templateUrl: './message-details.component.html',
  styleUrls: ['./message-details.component.scss']
})
export class MessageDetailsComponent implements OnInit {
  uploadedFiles: any[] = [];
  imagesResult = []
  attachmentList = [];
  files: any = [];
  replayForm: FormGroup;
  attachmentsName = []
  display: boolean = false;
  routeSub
  messageDetails;
  messagesReplies: any[] = []

  onSubmit

  constructor(private headerService: HeaderService, private route: ActivatedRoute, private messageService: MessageService, private toastr: ToastrService, private formbuilder: FormBuilder, private router: Router, private translate: TranslateService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.routeSub = params['MessageId'] //log the entire params object
      console.log(this.routeSub);

    });
    this.replayForm = this.formbuilder.group({
      messegeText: ['', [Validators.required, Validators.maxLength(512)]],
    });
    this.getMessageDetail()


    // this.attachmentList.forEach(file => {
    //   //  this.visit.addVisit(newAdHocVisit).pipe(
    //   //    mergeMap((res1) => this.visit.sendAttachment(file,res1.id))
    //   //  ).subscribe(res2=>{})
    //   console.log(file);

    //  })

    this.headerService.Header.next(
      {
        'breadCrump': [
          { label: this.translate.instant('dashboard.Messages.messages'), routerLink: '/dashboard/messages/messages', routerLinkActiveOptions: { exact: true } },
          { label: this.translate.instant('dashboard.Messages.MessageDetails') }
        ],
        mainTitle: { main: this.translate.instant('dashboard.Messages.Chat Details') }
      }
    );
  }

//   onSearch(e) {
//     this.searchModel2.keyword = e.target.value
//     this.searchModel2.page = 1
//     this.getMessageDetail()
// }

  getMessageDetail(){
    this.messageService.getMessageDetailsById(this.routeSub).subscribe(res=>{
      if(res.messageSatus ==MessageStatus.Pending) this.changeMessageStatus(res.id)
      this.messageDetails = res
      this.messagesReplies = res.messageReplies || []
      let unique: any[] = [...new Set(this.messagesReplies.map(item => item.userName.ar))];
      this.messagesReplies.map(element => {
        element.color = "first-message"
        if (unique.length > 1 && element.userName.ar == unique[1]) {
            element.color = "second-message"
        }
      })

    })
  }

  showDialog() {
    this.display = true;
  }

  onUpload(event) {

    for (let file of event.files) {

      this.uploadedFiles.push(file);

    }

  }
  messageUpload(files) {
    this.imagesResult = files
    // console.log(this.imagesResult);

  }

  messageDeleted(event) {
    this.imagesResult = event
    // console.log(event);
    // console.log(this.imagesResult);

  }
  sendReply() {
    this.onSubmit=true
    const form = {
      "userId": Number(localStorage.getItem('$AJ$userId')),
      // "roleId": JSON.parse(localStorage.getItem('$AJ$user')).roles[0].id,
      "messegeText": this.replayForm.value.messegeText,
      'attachment': this.imagesResult || null
    }

    this.messageService.sendReply(this.routeSub, form).subscribe(res => {
      this.toastr.success(this.translate.instant('dashboard.issue of certificate.success message'))
      this.replayForm.reset();
      this.display = false
       this.onSubmit=false

       this.getMessageDetail()
    }, err => {
       this.onSubmit=false
      this.toastr.error(err)
    })

  }



  changeMessageStatus(id){
    this.messageService.changeMessageStatus({messageIds:[id]}).subscribe()
  }


}
