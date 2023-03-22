
import { Component, inject, OnInit, } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { el } from 'date-fns/locale';
import { ToastrService } from 'ngx-toastr';
import {IHeader } from 'src/app/core/Models/header-dashboard';
import { RequestRule } from 'src/app/core/models/settings/settings.model';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { FileEnum } from 'src/app/shared/enums/file/file.enum';
import { IndexesEnum } from 'src/app/shared/enums/indexes/indexes.enum';
import { requestTypeEnum } from 'src/app/shared/enums/system-requests/requests.enum';
import { IndexesService } from '../../../indexes/service/indexes.service';
import { RegisterChildService } from '../../../shared/services/register-child/register-child.service';
import { SettingsService } from '../../../system-setting/services/settings/settings.service';
import { StudentsService } from '../../services/students/students.service';
@Component({
  selector: 'app-deleted-student',
  templateUrl: './deleted-student.component.html',
  styleUrls: ['./deleted-student.component.scss']
})
export class DeletedStudentComponent implements OnInit {
  lang = inject(TranslationService).lang
  studentId = +this.route.snapshot.paramMap.get('id');
  get fileTypesEnum () {return FileEnum}

  deletsCauseOptions$ = this.IndexService.getIndext(IndexesEnum.TheMainReasonsForStudentDeletion)

  componentHeaderData:IHeader = {
    breadCrump: [
      { label: this.translate.instant('Students List'),routerLink:'/dashboard/schools-and-students/students/',routerLinkActiveOptions:{exact: true}},
      { label: this.translate.instant('dashboard.students.deletStudentFromSchool'),routerLink:`/dashboard/student-management/students/delete-student/${this.studentId}` }
    ],
    mainTitle: { main: this.translate.instant('dashboard.students.deletStudentFromSchool'), sub: '(محمود عامر)' }
  }

  loading=false

  requiredFiles:RequestRule

  // << FORMS >> //
  deleteStudentForm = this.fb.group({
    studentId:[this.studentId],
    deleteRequestReasonId: ['', Validators.required],
    attachments:[[]],
    instanceId:[null]
  })

  get attachmentCtr(){ return this.deleteStudentForm.controls.attachments as FormControl}
  get uploadedFiles(){ return [].concat(...this.requiredFiles.files.map(el => el.uploadedFiles))}


  constructor(
    private translate: TranslateService,
    private headerService:HeaderService,
    private fb:FormBuilder,
    private studentService:StudentsService,
    private IndexService : IndexesService,
    private route:ActivatedRoute,
    private router:Router,
    private toasterService: ToastrService,
    private registerChildService:RegisterChildService,
    private settingServcice:SettingsService
  ) { }

  ngOnInit(): void {
    this.registerChildService.Student$.subscribe(res=>{
      this.componentHeaderData.mainTitle.sub = `(${res.name[this.lang]})`
      this.headerService.changeHeaderdata(this.componentHeaderData)
    })

    this.getDeleteRequestRequiresFiles()
  }


  getDeleteRequestRequiresFiles(){
    this.settingServcice.getRequestRquiredFiles(requestTypeEnum.DeleteStudentRequest).subscribe(res=>{
      this.requiredFiles = res.result || {filesCount: 0, isRequired: false, files:[]}
      this.requiredFiles.files = this.requiredFiles.files.map(el =>({...el, uploadedFiles:[]}))
    })
  }

  deleteStudentReq(data){
    this.loading = true
    
    this.studentService.deleteStudent(data).subscribe(res=>{
      this.loading = false
      this.toasterService.success(this.translate.instant('toasterMessage.requestSendSuccessfully'))
      this.router.navigate(['../../student',this.studentId],{relativeTo:this.route})
    },err=>{
      this.toasterService.error(this.translate.instant('toasterMessage.error'))
      this.loading = false
    })
  }

  // uploadedFiles: File[] = []

  // uploadFile(e) {
  //   let file = e.target.files[0];

  //   if (file) this.uploadedFiles.push(file)
  // }

  // deleteFile(index) {
  //   this.uploadedFiles.splice(index, 1)
  // }


  onFileUpload(files, fileTitle, index){
    this.requiredFiles.files[index].uploadedFiles = files.length ? files.map(el=>({...el, title:fileTitle})) : files
    this.attachmentCtr.setValue(this.uploadedFiles)
  }
}
