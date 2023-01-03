import { Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { CustomFile } from 'src/app/shared/components/file-upload/file-upload.component';
import { IndexesEnum } from 'src/app/shared/enums/indexes/indexes.enum';
import { TransferType } from 'src/app/shared/enums/school/school.enum';
import { IndexesService } from '../../../../indexes/service/indexes.service';
import { StudentsService } from '../../../../students/services/students/students.service';
import { RegisterChildService } from '../../../services/register-child/register-child.service';

@Component({
  selector: 'app-withdrawal-request',
  templateUrl: './withdrawal-request.component.html',
  styleUrls: ['./withdrawal-request.component.scss']
})
export class WithdrawalRequestComponent implements OnInit {
  @Input()student
  lang= inject(TranslationService).lang

  studentId = this.route.snapshot.paramMap.get('id') //in case the page reached throw students route
  childId = this.route.snapshot.paramMap.get('childId') //in case the page reached throw child (registered) route

  reasonForRepeateStudyPhase$ = this.indexesService.getIndext(IndexesEnum.TheReasonForWithdrawalRequest)

  transferType= [
    {name:this.translate.instant('dashboard.students.insideEmara'), value: 0},
    {name:this.translate.instant('dashboard.students.outSideEmara'), value: 1},
    {name:this.translate.instant('dashboard.students.outsideCountry'), value: 2},
  ]

  isLoading=false
  reqForm = {
    studentId: this.childId || this.studentId,
    withdrawalType: null,
    withdrawalReasonId: null,
    attachment: null
  }

  constructor(
    private translate: TranslateService,
    private indexesService:IndexesService,
    private route: ActivatedRoute,
    private toastr:ToastrService,
    public childService:RegisterChildService,
    private studentService:StudentsService) { }

  ngOnInit(): void {
  }

  sendWithdrawalReq(){
    this.isLoading=true
    this.studentService.sendWithdrawalReq(this.reqForm).subscribe(()=>{
      this.isLoading=false
      this.toastr.success(this.translate.instant('toasterMessage.requestSendSuccessfully'))
      this.childService.showWithdrawalReqScreen$.next(false)

    },()=>{
      this.isLoading=false
      this.toastr.error(this.translate.instant('toasterMessage.error'))
    })
  }

  onFileUpload(file:CustomFile[]){
    if(!file.length) {
      this.reqForm.attachment = null
      return
    }
    this.reqForm.attachment = file[0].url
  }

}
