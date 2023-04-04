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
import { FileEnum } from 'src/app/shared/enums/file/file.enum';
import { IndexesEnum } from 'src/app/shared/enums/indexes/indexes.enum';
import { requestTypeEnum } from 'src/app/shared/enums/system-requests/requests.enum';
import { IndexesService } from '../../../../indexes/service/indexes.service';
import { StudentsService } from '../../../../students/services/students/students.service';
import { SettingsService } from '../../../../system-setting/services/settings/settings.service';
import { RegisterChildService } from '../../../services/register-child/register-child.service';

@Component({
  selector: 'app-withdrawal-request',
  templateUrl: './withdrawal-request.component.html',
  styleUrls: ['./withdrawal-request.component.scss']
})
export class WithdrawalRequestComponent implements OnInit {
  student
  lang= inject(TranslationService).lang
  get fileTypesEnum () {return FileEnum}

  studentId = +this.route.snapshot.paramMap.get('id') //in case the page reached throw students route
  childId = +this.route.snapshot.paramMap.get('childId') //in case the page reached throw child (registered) route

  reasonForRepeateStudyPhase$ = this.indexesService.getIndext(IndexesEnum.ReasonsForWithdrawingTheStudentFromTheCurrentSchool)


  componentHeaderData:IHeader = {
    breadCrump: [
      { label: this.translate.instant('Students List'),routerLink:'/dashboard/schools-and-students/students/',routerLinkActiveOptions:{exact: true}},
      { label: this.translate.instant('dashboard.students.withdrawalReq'),routerLink:`/dashboard/schools-and-students/students/student/${this.studentId}/withdraw-request` }
    ],
    mainTitle: { main: this.translate.instant('dashboard.students.withdrawalReq'), sub: '' }
  }


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
    attachments: []
  }

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
    private headerService:HeaderService,
    private studentService:StudentsService) { }

  ngOnInit(): void {

    this.registerChildService.Student$
    .pipe(
      switchMap(res=>{
        console.log(res);

        if(!res) return this.studentService.getStudent(this.studentId).pipe(map(res => res?.result))
        return of(res)
      })
    )
    .subscribe((res:Student)=>{
      this.student=res
      this.componentHeaderData.mainTitle.sub = `(${res.name[this.lang]})`
      this.headerService.changeHeaderdata(this.componentHeaderData)
    })

    this.getWithdrawRequestRequiresFiles()
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
    .pipe(
      map(res=>{
        if(res.error) throw new Error()
        else return res
      }
    ))
    .subscribe(()=>{
      this.isLoading=false
      this.toastr.success(this.translate.instant('toasterMessage.requestSendSuccessfully'))
      this.router.navigate(['/dashboard/schools-and-students/students/student', this.studentId])

    },()=>{

      this.isLoading=false
      this.toastr.error(this.translate.instant('toasterMessage.This student is prohibited from withdrawing'))
    })
  }

  // onFileUpload(file:CustomFile[]){
  //   if(!file.length) {
  //     this.reqForm.attachment = null
  //     return
  //   }
  //   this.reqForm.attachment = file[0].url
  // }

  onFileUpload(files, fileTitle, index){
    this.requiredFiles.files[index].uploadedFiles = files.length ? files.map(el=>({...el, title:fileTitle})) : files
    this.reqForm.attachments = this.uploadedFiles
  }

}
