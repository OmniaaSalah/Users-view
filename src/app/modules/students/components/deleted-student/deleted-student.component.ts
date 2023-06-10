
import { Component, inject, OnInit, } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { el } from 'date-fns/locale';
import { ToastrService } from 'ngx-toastr';
import { map, of, switchMap } from 'rxjs';
import {IHeader } from 'src/app/core/Models/header-dashboard';
import { RequestRule } from 'src/app/core/models/settings/settings.model';
import { Student } from 'src/app/core/models/student/student.model';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { FileTypeEnum } from 'src/app/shared/enums/file/file.enum';
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
  studentGUID = this.route.snapshot.paramMap.get('id');
  get fileTypesEnum () {return FileTypeEnum}

  student:Student

  deletsCauseOptions$ = this.IndexService.getIndext(IndexesEnum.TheMainReasonsForStudentDeletion)

  componentHeaderData:IHeader = {
    breadCrump: [
      { label: this.translate.instant('Students List'),routerLink:'//schools-and-students/students/',routerLinkActiveOptions:{exact: true}},
      { label: this.translate.instant('dashboard.students.deletStudentFromSchool'),routerLink:`/student-management/students/delete-student/${this.studentGUID}` }
    ],
    mainTitle: { main: this.translate.instant('dashboard.students.deletStudentFromSchool'), sub: '(محمود عامر)' }
  }

  loading=false

  requiredFiles:RequestRule

  // << FORMS >> //
  deleteStudentForm:FormGroup
  get attachmentCtr(){ return this.deleteStudentForm?.controls['attachments'] as FormControl}
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
    this.registerChildService.Student$
    .pipe(
      switchMap(res=>{
        if(!res) return this.studentService.getStudent(this.studentGUID).pipe(map(res => res?.result))
        return of(res)
      })
    )
    .subscribe((res:Student)=>{
      this.componentHeaderData.mainTitle.sub = `(${res.name[this.lang]})`
      this.headerService.changeHeaderdata(this.componentHeaderData)
      this.student =res
      this.initForm(res)
    })

    this.getDeleteRequestRequiresFiles()
  }

  initForm(student){
    this.deleteStudentForm = this.fb.group({
      studentId:[student.id],
      deleteRequestReasonId: ['', Validators.required],
      attachments:[[]],
      instanceId:[null]
    })
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
      this.router.navigate(['../../student',this.studentGUID],{relativeTo:this.route})
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


  isRequiredAttchmentsUploaded(){
    return !this.requiredFiles.files.filter(el => el.isMandatory).every(el=> el?.uploadedFiles?.length > 0)
  }

  onFileUpload(files, fileTitle, index){
    this.requiredFiles.files[index].uploadedFiles = files.length ? files.map(el=>({...el, title:fileTitle})) : files
    this.attachmentCtr.setValue(this.uploadedFiles)
  }
}
