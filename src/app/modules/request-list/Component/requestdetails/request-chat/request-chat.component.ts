import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CustomFile } from 'src/app/shared/components/file-upload/file-upload.component';
import { UserRequestsStatus } from 'src/app/shared/enums/status/status.enum';
import { UserScope } from 'src/app/shared/enums/user/user.enum';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { SystemRequestService } from '../../../services/system-request.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-request-chat',
  templateUrl: './request-chat.component.html',
  styleUrls: ['./request-chat.component.scss']
})
export class RequestChatComponent implements OnInit {

  @Input() requestDetails
  @Output() refresh = new EventEmitter()

  get userScopeEnum(){return UserScope}
  currentUserScope = inject(UserService).getScope()

  comment=''
  isLoading =false
  filesToUpload:CustomFile[] =[]

  constructor(
    private requestsService:SystemRequestService,
    private toaster:ToastService,
    private translate:TranslateService) { }

  ngOnInit(): void {
  }


  isCommentAllowed(){
    let arr=[
      UserRequestsStatus.Approved,
      UserRequestsStatus.Accepted,
      UserRequestsStatus.Canceled,
      UserRequestsStatus.Rejected,
    ]
    return !arr.includes(this.requestDetails?.requestStatus)
  }


  addComment(){
    if(!this.requestDetails.requestComments.length) this.addFirstComment(this.requestDetails.commonRequestId)
    else this.replayToComment(this.requestDetails.requestComments[0].id)
  }

  addFirstComment(commonRequestId){
    this.isLoading =true
    let comment={
      commonRequestId: commonRequestId,
      comment: this.comment,
      attachments: this.filesToUpload
    }

    this.requestsService.AddFirstRequestComment(comment).subscribe(res=>{
      this.isLoading =false
      this.comment=''
      this.filesToUpload =[]
      this.refresh.emit()

      this.toaster.success(this.translate.instant('toasterMessage.messageSend'))
    },()=>{
      this.isLoading =false
       this.toaster.error(this.translate.instant('toasterMessage.sendingFailed'))
    })
  }

  replayToComment(commentId){
    this.isLoading =true
    let comment={
      commentId: commentId,
      reply: this.comment,
      attachments: this.filesToUpload
    }

    this.requestsService.replayToRequestComment(comment).subscribe(res=>{
      this.isLoading =false
      this.comment=''
      this.filesToUpload =[]
      this.refresh.emit()
      this.toaster.success(this.translate.instant('toasterMessage.messageSend'))
    },()=>{
      this.isLoading =false
       this.toaster.error(this.translate.instant('toasterMessage.sendingFailed'))
    })
  }



    deleteMainComment(id){
      this.requestsService.deleteMainComment(id).subscribe(res=>{
          this.toaster.success(this.translate.instant('toasterMessage.deletedSuccessfully'))
          this.refresh.emit()
          this.requestDetails=null

      },()=>{
          this.toaster.error(this.translate.instant('toasterMessage.error'))
      })
    }

    deleteReplay(id){
      this.requestsService.deleteMainComment(id).subscribe(res=>{
          this.toaster.success(this.translate.instant('toasterMessage.deletedSuccessfully'))
          this.refresh.emit()
          this.requestDetails=null

      },()=>{
          this.toaster.error(this.translate.instant('toasterMessage.error'))
      })
    }

}
