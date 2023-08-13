import { Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { map, of, switchMap } from 'rxjs';
import { IHeader } from 'src/app/core/Models/header-dashboard';
import { RequestRule } from 'src/app/core/models/settings/settings.model';
import { Student } from 'src/app/core/models/student/student.model';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { FileTypeEnum } from 'src/app/shared/enums/file/file.enum';
import { IndexesEnum } from 'src/app/shared/enums/indexes/indexes.enum';
import { requestTypeEnum } from 'src/app/shared/enums/system-requests/requests.enum';
import { IndexesService } from '../../../../indexes/service/indexes.service';
import { StudentsService } from '../../../../students/services/students/students.service';
import { SettingsService } from '../../../../system-setting/services/settings/settings.service';
import { RegisterChildService } from '../../../services/register-child/register-child.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-withdrawal-request',
  templateUrl: './withdrawal-request.component.html',
  styleUrls: ['./withdrawal-request.component.scss']
})
export class WithdrawalRequestComponent implements OnInit {
  student
  lang= inject(TranslationService).lang
  get fileTypesEnum () {return FileTypeEnum}

  currentGuardianId = this.userService.getCurrentGuardian()?.id
  // studentId = this.route.snapshot.paramMap.get('id') //in case the page reached throw students route
  childId = this.route.snapshot.paramMap.get('childId') //in case the page reached throw child (registered) route

  studentGUID=this.route.snapshot.paramMap.get('id')

  reasonForRepeateStudyPhase$ = this.indexesService.getIndext(IndexesEnum.ReasonsForWithdrawingTheStudentFromTheCurrentSchool)


  componentHeaderData:IHeader = {
    breadCrump: [
      { label: this.translate.instant('dashboard.parents.sonDetails'),routerLink:`/parent/${this.currentGuardianId}/child/${this.studentGUID || this.childId}`,routerLinkActiveOptions:{exact: true},queryParams:{registered:true}},
      { label: this.translate.instant('dashboard.students.withdrawalReq'),routerLink:`/parent/${this.currentGuardianId}/child/${this.studentGUID || this.childId}/withdraw-request` }
    ],
    mainTitle: { main: this.translate.instant('dashboard.students.withdrawalReq'), sub: '' }
  }


  transferType= [
    {name:this.translate.instant('dashboard.students.insideEmara'), value: 0},
    {name:this.translate.instant('dashboard.students.outSideEmara'), value: 1},
    {name:this.translate.instant('dashboard.students.outsideCountry'), value: 2},
  ]

  isLoading=false
  reqForm

  get uploadedFiles(){ return [].concat(...this.requiredFiles.files.map(el => el.uploadedFiles))}

  requiredFiles:RequestRule

  constructor(
    private translate: TranslateService,
    private indexesService:IndexesService,
    private route: ActivatedRoute,
    private toastr:ToastrService,
    public registerChildService:RegisterChildService,
    private settingServcice:SettingsService,
    private router:Router,
    private userService:UserService,
    private headerService:HeaderService,
    private studentService:StudentsService) { }

  ngOnInit(): void {

    this.registerChildService.Student$
    .pipe(
      switchMap(res=>{
        if(!res) return this.studentService.getStudent(this.studentGUID || this.childId).pipe(map(res => res?.result))
        return of(res)
      })
    )
    .subscribe((res:Student)=>{
      this.student=res
      this.componentHeaderData.mainTitle.sub = `(${res.name[this.lang]})`
      this.headerService.changeHeaderdata(this.componentHeaderData)
      this.initForm(res)
    })

    this.getWithdrawRequestRequiresFiles()
  }


  initForm(student){
    this.reqForm = {
      studentId: student?.id,
      withdrawalType: null,
      withdrawalReasonId: null,
      attachments: []
    }
  }

  getWithdrawRequestRequiresFiles(){
    this.settingServcice.getRequestRquiredFiles(requestTypeEnum.WithdrawalRequest).subscribe(res=>{
      this.requiredFiles = res.result || {filesCount: 0, isRequired: false, files:[]}
      this.requiredFiles.files = this.requiredFiles.files.map(el =>({...el, uploadedFiles:[]}))
    })
  }

  sendWithdrawalReq(){
    this.isLoading=true
    this.studentService
    .sendWithdrawalReq(this.reqForm)
    .subscribe(()=>{
      this.isLoading=false
      this.toastr.success(this.translate.instant('toasterMessage.requestSendSuccessfully'))
      this.router.navigate(['/parent', this.currentGuardianId,'child', this.studentGUID||this.childId], {queryParams:{registered:true}})
      // this.router.navigate(['/schools-and-students/students/student', this.studentGUID])

    },(error:Error)=>{

      this.isLoading=false
      this.toastr.error( error.message || this.translate.instant('toasterMessage.error'))
    })
  }

  // onFileUpload(file:CustomFile[]){
  //   if(!file.length) {
  //     this.reqForm.attachment = null
  //     return
  //   }
  //   this.reqForm.attachment = file[0].url
  // }


  isRequiredAttchmentsUploaded(){
    return !this.requiredFiles?.files.filter(el => el.isMandatory).every(el=> el?.uploadedFiles?.length > 0)
  }

  onFileUpload(files, fileTitle, index){
    this.requiredFiles.files[index].uploadedFiles = files.length ? files.map(el=>({...el, title:fileTitle})) : files
    this.reqForm.attachments = this.uploadedFiles
  }

}
