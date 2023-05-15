import { AssignmentServiceService } from './../../service/assignment-service.service';
import { Component, OnInit,inject } from '@angular/core';
import {  faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Icurriculum } from 'src/app/core/Models/Icurriculum';
import { Igrade } from 'src/app/core/Models/Igrade';
import { ISubject } from 'src/app/core/Models/isubject';
import { IuploadAssignment } from 'src/app/core/Models/IuploadAssignment';
import { ToastrService } from 'ngx-toastr';
import { CustomFile } from 'src/app/shared/components/file-upload/file-upload.component';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { FileTypeEnum } from 'src/app/shared/enums/file/file.enum';
import { SubjectService } from '../../../subjects/service/subject.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { UserScope } from 'src/app/shared/enums/user/user.enum';
import { IHeader } from 'src/app/core/Models/header-dashboard';
import { SchoolsService } from 'src/app/modules/schools/services/schools/schools.service';
@Component({
  selector: 'app-upload-assignment',
  templateUrl: './upload-assignment.component.html',
  styleUrls: ['./upload-assignment.component.scss']
})
export class UploadAssignmentComponent implements OnInit {
  get fileTypesEnum () {return FileTypeEnum}
  lang = inject(TranslationService).lang
  assignmentFormGrp: FormGroup;
  curriculumId:number;
  gradesList: Igrade[] = [];
  subjectsList: ISubject[] = [];
  curriculums: Icurriculum[] = [];
  exclamationIcon = faExclamationCircle;
  attachmentList = [];
  assignmentModel : IuploadAssignment= <IuploadAssignment>{};
  files: any = [];
  currentDate = new Date();
  isBtnLoading:boolean=false;
  currentUserScope = inject(UserService).getCurrentUserScope()
  get userScope() { return UserScope }
  componentHeaderData: IHeader={
    breadCrump: [],
    mainTitle: { main: this.translate.instant('breadcrumb.Upload Assignment') }
  }

  constructor(private headerService: HeaderService, private router: Router,
    private toastr: ToastrService,
    private subjectService:SubjectService,
    private sharedService:SharedService,
    private userService:UserService,
    private schoolService:SchoolsService,
     private translate: TranslateService, private fb: FormBuilder, private assignmentService: AssignmentServiceService) {
    this.assignmentFormGrp = fb.group({
      curriculum: ['',Validators.required],
      schools:[''],
      grades:['',Validators.required],
      subjects:['',Validators.required],
      ExamNameInArabic:['',[Validators.required,Validators.maxLength(256)]],
      ExamNameInEnglish:['',[Validators.required,Validators.maxLength(256)]],
      ExamDuration:[1,Validators.required],
      ExamDate:['',Validators.required],
      ExamTime:['',Validators.required],
      examPdfPath: ['',Validators.required],
      examAudioPath: ['',Validators.required]
    });
  }

  getGradeList(){
    this.sharedService.getAllGrades('').subscribe(response => {
		  this.gradesList = response;
		})
  }


  getSubjectList(){
    this.subjectService.getAllSubjectsWithoutDuplicated().subscribe(response => {

		  this.subjectsList= response;
		})

  }



  getCurriculumList() {
    this.sharedService.getAllCurriculum().subscribe(response => {
      this.curriculums = response;
    })
  }






  ngOnInit(): void {
    this.getCurriculumList();

    this.getGradeList();
    this.getSubjectList();
    this.checkDashboardHeader();
    if(this.currentUserScope==this.userScope.Employee)  this.userService.currentUserSchoolId$.subscribe(id => {this.schoolService.getSchool(id).subscribe((res)=>{this.curriculumId=res?.curriculum?.id;this.curriculum.setValue(this.curriculumId);this.curriculum.disable();})});

  }


  get curriculum() {
    return this.assignmentFormGrp.controls['curriculum'] as FormControl;
  }
  get grades() {
    return this.assignmentFormGrp.controls['grades'] as FormControl;
  }
  get subjects() {
    return this.assignmentFormGrp.controls['subjects'] as FormControl;
  }
  get ExamNameInArabic() {
    return this.assignmentFormGrp.controls['ExamNameInArabic'] as FormControl;
  }
  get ExamNameInEnglish() {
    return this.assignmentFormGrp.controls['ExamNameInEnglish'] as FormControl;
  }
  get ExamDuration() {
    return this.assignmentFormGrp.controls['ExamDuration'] as FormControl;
  }
  get ExamDate() {
    return this.assignmentFormGrp.controls['ExamDate'] as FormControl;
  }
  get ExamTime() {
    return this.assignmentFormGrp.controls['ExamTime'] as FormControl;
  }
  get examPdfPath() {
    return this.assignmentFormGrp.controls['examPdfPath'] as FormControl;
  }
  get examAudioPath() {
    return this.assignmentFormGrp.controls['examAudioPath'] as FormControl;
  }




uploadedFiles: any[] = [];


  onFileUpload(file:CustomFile[]): void {
    if(file.length)
    {this.assignmentFormGrp.patchValue({examPdfPath: file[0].url});}
    else
    {this.assignmentFormGrp.patchValue({examPdfPath: ''});}
  }

  onAudioUpload(audio:CustomFile[]): void {
    if(audio.length)
      {this.assignmentFormGrp.patchValue({examAudioPath: audio[0].url});}
    else
     {this.assignmentFormGrp.patchValue({examAudioPath: '' });}
}



  UploadAssignment(){
    this.isBtnLoading=true;
    this.assignmentModel.arabicName = this.assignmentFormGrp.value.ExamNameInArabic ;
    this.assignmentModel.englishName= this.assignmentFormGrp.value.ExamNameInEnglish;
    this.assignmentModel.examduration = this.convertMinutesToTime(Number(this.assignmentFormGrp.value.ExamDuration));
    this.assignmentModel.examShowTime =this.assignmentFormGrp.value.ExamTime;
    this.assignmentModel.examShowDate= this.assignmentFormGrp.value.ExamDate;
    this.assignmentModel.gradeId = this.assignmentFormGrp.value.grades;
    this.assignmentModel.subjectId=  this.assignmentFormGrp.value.subjects;
    this.assignmentModel.curriculumId=this.currentUserScope==this.userScope.Employee ? this.curriculumId:this.assignmentFormGrp.value.curriculum;
    this.assignmentModel.examPdfPath = this.assignmentFormGrp.value.examPdfPath ;
    this.assignmentModel.examAudioPath = this.assignmentFormGrp.value.examAudioPath ;
    this.assignmentService.AddAssignment(this.assignmentModel).subscribe(res => {
      this.isBtnLoading=false;
      this.router.navigate(['/performance-managment/assignments/assignments-list']);
      this.toastr.success(this.translate.instant('Add Successfully'),'');
     },(err)=>{ 
      this.toastr.error(err?.message||this.translate.instant('toasterMessage.error'));
      this.isBtnLoading=false;
    });
  }

  convertMinutesToTime(value)
  {
    console.log(value)
    const hours = Math.floor(value/60);
    const minutes= Math.floor(value%60);
    console.log(hours + ':' + minutes + ':' + 0)
    return hours + ':' + minutes + ':' + 0;
  }

  formateDate(date :Date){
    let d = new Date(date.setHours(date.getHours() - (date.getTimezoneOffset()/60) )).toISOString()
    return d.split('.')[0]
  
  }

  checkDashboardHeader()
  {
      if(this.currentUserScope==UserScope.Employee)
    {
      this.componentHeaderData.breadCrump=
      [

       { label: this.translate.instant('Assignments List'), routerLink: '/school-performance-managent/assignments/assignments-list', routerLinkActiveOptions: { exact: true } }
       , {label: this.translate.instant('breadcrumb.Upload Assignment') , routerLink: '/school-performance-managent/assignments/upload-assignment', routerLinkActiveOptions: { exact: true }}
      ]


    }
    else if (this.currentUserScope==UserScope.SPEA)
    {
      this.componentHeaderData.breadCrump=
         [
         { label: this.translate.instant('Assignments List'), routerLink: '/performance-managment/assignments/assignments-list', routerLinkActiveOptions: { exact: true } }
         , {label: this.translate.instant('breadcrumb.Upload Assignment') , routerLink: '/performance-managment/assignments/upload-assignment', routerLinkActiveOptions: { exact: true }}
         
        ]


    }

    this.headerService.changeHeaderdata(this.componentHeaderData)
  }
}
