import { Component, HostBinding, HostListener, OnInit, EventEmitter, Output ,inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { FileTypeEnum } from 'src/app/shared/enums/file/file.enum';
import { MessageStatus } from 'src/app/shared/enums/status/status.enum';
import { MessageService } from '../../service/message.service';

@Component({
  selector: 'app-message-details',
  templateUrl: './message-details.component.html',
  styleUrls: ['./message-details.component.scss']
})
export class MessageDetailsComponent implements OnInit {
  get fileTypesEnum () {return FileTypeEnum}
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
  currentUserScope = inject(UserService).getScope()
  onSubmit

  constructor(private headerService: HeaderService,private userService:UserService, private route: ActivatedRoute, private messageService: MessageService, private toastr: ToastrService, private formbuilder: FormBuilder, private router: Router, private translate: TranslateService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.routeSub = params['MessageId'] //log the entire params object
      console.log(this.routeSub);

    });
    this.replayForm = this.formbuilder.group({
      messegeText: ['', [Validators.required, Validators.maxLength(512)]],
    });
    this.getMessageDetailAfterReply();

    this.headerService.Header.next(
      {
        'breadCrump': [
          { label: this.translate.instant('dashboard.Messages.messages'), routerLink: '/messages/messages', routerLinkActiveOptions: { exact: true } },
          { label: this.translate.instant('dashboard.Messages.MessageDetails') }
        ],
        mainTitle: { main: this.translate.instant('dashboard.Messages.Chat Details') }
      }
    );
  }


  getMessageDetail(){
    this.messageService.getMessageDetailsById(this.routeSub).subscribe(res=>{
      this.messageDetails = res
      this.messagesReplies = res.messageReplies || []
      let unique: any[] = [...new Set(this.messagesReplies.map(item => item.userName.ar))];
      this.messagesReplies.map(element => {
        element.color = "first-message"
        if (unique.length > 1 && element.userName.ar == unique[1]) {
            element.color = "second-message"
        }
      })
      if(res.messageSatus ==MessageStatus.Pending&&(this.messageDetails.scope!=this.currentUserScope)) this.changeMessageStatus(res.id)
    })
  }

  getMessageDetailAfterReply(){
    this.messageService.reduceReplyCount(this.routeSub).subscribe((res)=>{})
    this.getMessageDetail();
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
    this.imagesResult=files;

  }

  sendReply() {
    this.onSubmit=true
    const form = {
      "userId": Number(localStorage.getItem('$AJ$userId')),
      // "roleId": JSON.parse(localStorage.getItem('$AJ$user')).roles[0].id,
      "messegeText": this.replayForm.value.messegeText,
      'attachments':  this.imagesResult,
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
