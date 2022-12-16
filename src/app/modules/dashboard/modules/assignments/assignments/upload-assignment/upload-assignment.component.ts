import { AssignmentServiceService } from './../../service/assignment-service.service';
import { Component, EventEmitter, HostBinding, HostListener, OnInit, Output } from '@angular/core';
import { faAngleLeft, faCalendar, faHouse, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { formatDate } from '@angular/common';

import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { MessageService } from 'primeng/api';

import { Icurriculum } from 'src/app/core/Models/Icurriculum';
import { Ischool } from 'src/app/core/Models/Ischool';
import { Igrade } from 'src/app/core/Models/Igrade';
import { ISubject } from 'src/app/core/Models/isubject';
import { IuploadAssignment } from 'src/app/core/Models/IuploadAssignment';
import { ToastrService } from 'ngx-toastr';
import { CustomFile } from 'src/app/shared/components/file-upload/file-upload.component';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
@Component({
  selector: 'app-upload-assignment',
  templateUrl: './upload-assignment.component.html',
  styleUrls: ['./upload-assignment.component.scss']
})
export class UploadAssignmentComponent implements OnInit {
  faCoffee = faHouse;
  faAngleLeft = faAngleLeft
  calendericon = faCalendar;
  checkIcon = faCheck;
  displayMaximizable: boolean;
  rightIcon = faArrowRight;
  date3: Date;
  minDateValue=new Date();
  assignmentFormGrp: FormGroup;
  CurriculumSelected: Icurriculum;
  SchoolSelected: Ischool;
  GradeSelected: Igrade;
  SubjectSelected: ISubject;
  schools: Ischool[] = [];
  curriculumId:number;
  gradesList: Igrade[] = [];
  subjectsList: ISubject[] = [];
  curriculums: Icurriculum[] = [];
  exclamationIcon = faExclamationCircle;
//attachment
  attachmentList = [];
  assignmentModel : IuploadAssignment= <IuploadAssignment>{};
  files: any = [];
  currentDate = new Date();
  attachmentsName=[];
  @Output() onFileDropped = new EventEmitter<any>();
  isBtnLoading:boolean=false;


  @HostBinding('style.background-color') private background = '#f5fcff'

  @HostBinding('style.opacity') private opacity = '1'



  //Dragover listener

  @HostListener('dragover', ['$event']) onDragOver(evt) {

    evt.preventDefault();

    evt.stopPropagation();

    this.background = '#9ecbec';

    this.opacity = '0.8'

  }



  //Dragleave listener

  @HostListener('dragleave', ['$event']) public onDragLeave(evt) {

    evt.preventDefault();

    evt.stopPropagation();

    this.background = '#f5fcff'

    this.opacity = '1'

  }



  //Drop listener

  @HostListener('drop', ['$event']) public ondrop(evt) {

    evt.preventDefault();

    evt.stopPropagation();

    this.background = '#f5fcff'

    this.opacity = '1'

    let files = evt.dataTransfer.files;

    if (files.length > 0) {

      this.onFileDropped.emit(files)

    }

  }
//////////////
  constructor(private headerService: HeaderService, private router: Router,
    private toastr: ToastrService,
    private sharedService:SharedService,
     private translate: TranslateService, private fb: FormBuilder, private assignmentService: AssignmentServiceService,
    private messageService: MessageService) {
    this.assignmentFormGrp = fb.group({
      curriculum: ['',Validators.required],
      schools:[''],
      grades:['',Validators.required],
      subjects:['',Validators.required],
      ExamName:['',[Validators.required,Validators.maxLength(256)]],
      ExamDuration:['',Validators.required],
      ExamDate:['',Validators.required],
      ExamTime:['',Validators.required],
      examPdfPath: ['',Validators.required],
      examAudioPath: ['',Validators.required]
    });
  }

  //#region "Get All List"
  deleteAttachment(index) {

    this.attachmentList.splice(index, 1)

    this.attachmentsName.splice(index,1)


  }
  onLogoDeleted(){
		// const file={id:this.schoolId, schoolLogoPath: ''}
		// this.schoolsService.updateSchoolLogo(this.schoolId,file).subscribe()
	}
  upload = (event) => {

    let fileList = event.target.files;

    let fileSize = event.target.files[0].size;

    if(fileSize > 2e+6){

      // this.toastr.error('The File Size Must be Less Than 5MB')

      return;

    }else{




        [...fileList].forEach((file) => {

      let reader = new FileReader();

      reader.onload = () => {

        let x = reader.result.toString().split(',')[1];

        this.attachmentsName.push(file.name)

        // let data = file.data

        let convertedFile = { url: x };

        this.attachmentList.push(convertedFile);

        this.files.push(convertedFile) // remove it if it error

      };

      reader.readAsDataURL(file);



    console.log(this.attachmentList);

      console.log(this.attachmentsName);



  }

    )}}

 sendMessage(){
      const form ={
//         "userId": Number(localStorage.getItem('$AJ$userId')),
//         "roleId": JSON.parse(localStorage.getItem('$AJ$user')).roles[0].id,
//         "guardian": this.schoolEmpForm.value.guardian,
//         "title": this.schoolEmpForm.value.title,
//         "switch1": this.schoolEmpForm.value.switch1,
//         "switch2": this.schoolEmpForm.value.switch2,
//         "description": this.schoolEmpForm.value.description,
//         'attachment': this.attachmentList || null
      }

    }


  ///////////////////////////////////////
  getGradeList(){
    this.sharedService.getAllGrades('').subscribe(response => {
		  this.gradesList = response;
		})
  }


  getSubjectList(){
    this.assignmentService.GetSubjectList().subscribe(response => {
     
		  this.subjectsList= response.data;
		})
  }

  // getSchoolList() {
  //   this.assignmentService.GetSchoolsList(this.curriculumId).subscribe(response => {
  //     this.schools = response.data;
  //   })
  // }


  getCurriculumList() {
    this.assignmentService.GetCurriculumList('', '', 1, 1000, '', '').subscribe(response => {
      this.curriculums = response.data;
    })
  }

//#endregion "My Region"




  ngOnInit(): void {
    this.getCurriculumList();
   // this.getSchoolList();
    this.getGradeList();
    this.getSubjectList();
    this.headerService.Header.next(
      {
        'breadCrump': [
          { label: this.translate.instant('breadcrumb.Assignments List'), routerLink: '/dashboard/performance-managment/assignments/assignments-list', routerLinkActiveOptions: { exact: true } },
          { label: this.translate.instant('breadcrumb.Upload Assignment') , routerLink: '/dashboard/performance-managment/assignments/upload-assignment', routerLinkActiveOptions: { exact: true } }
        ],
        mainTitle: { main: this.translate.instant('breadcrumb.Upload Assignment') }
      }
    );

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
  get ExamName() {
    return this.assignmentFormGrp.controls['ExamName'] as FormControl;
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

  showMaximizableDialog() {
    this.displayMaximizable = true;
  }

  onChange(event: any ) {
    this.curriculumId = event.value.id;
    // this.getSchoolList();

}
uploadedFiles: any[] = [];
onUpload(event) {
  for(let file of event.files) {
      this.uploadedFiles.push(file);
  }
  this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
}

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
    this.assignmentModel.arabicName = this.assignmentFormGrp.value.ExamName ;
    this.assignmentModel.englishName= this.assignmentFormGrp.value.ExamName ;
    let _examDuration = `00:${this.assignmentFormGrp.value.ExamDuration}:00 `;
    this.assignmentModel.examduration = _examDuration;
    this.assignmentModel.examShowTime = "00:08:00";
    const date = new Date(this.assignmentFormGrp.value.ExamDate);
    this.assignmentModel.examShowDate= date.toISOString().slice(0,10);
    this.assignmentModel.gradeId = this.assignmentFormGrp.value.grades.id;
   // this.assignmentModel.subjectId= this.content.value.subjects.id;
    this.assignmentModel.subjectId= 4;
    this.assignmentModel.curriculumId= this.assignmentFormGrp.value.curriculum.id;

    if (this.assignmentModel.examShowDate.slice(0, 10) === formatDate(this.currentDate, 'yyyy-MM-dd', 'en-US')) {
      this.assignmentModel.examStatus=1;
    } else {
      this.assignmentModel.examStatus=2;
    }

    this.assignmentModel.examPdfPath = this.assignmentFormGrp.value.examPdfPath ;
    this.assignmentModel.examAudioPath = this.assignmentFormGrp.value.examAudioPath ;
    this.assignmentService.AddAssignment(this.assignmentModel).subscribe(res => {
      this.isBtnLoading=false;
      console.log(res);
      this.toastr.success(this.translate.instant('Add Successfully'),'');
     },(err)=>{ this.isBtnLoading=false;});
  }
}
