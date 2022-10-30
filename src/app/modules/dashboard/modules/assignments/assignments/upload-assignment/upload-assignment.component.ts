import { AssignmentServiceService } from './../../service/assignment-service.service';
import { Component, EventEmitter, HostBinding, HostListener, OnInit, Output } from '@angular/core';
import { faAngleLeft, faCalendar, faHouse } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';


import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Icurriculum } from '../model/Icurriculum';
import { Ischool } from '../model/Ischool';
import { Igrade } from '../model/Igrade';
import { Isubject } from '../model/Isubject';
import { MessageService } from 'primeng/api';
import { forkJoin } from 'rxjs';
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
  assignmentFormGrp: FormGroup;
  CurriculumSelected: Icurriculum;
  SchoolSelected: Ischool;
  GradeSelected: Igrade;
  SubjectSelected: Isubject;
  schools: Ischool[] = [];
  curriculumId:number;
  grades: Igrade[] = [];
  subjects: Isubject[] = [];
  curriculums: Icurriculum[] = [];


  constructor(private headerService: HeaderService, private router: Router,
     private translate: TranslateService, private fb: FormBuilder, private assignmentService: AssignmentServiceService,
    private messageService: MessageService) {
    this.assignmentFormGrp = fb.group({
      curriculum: [''],
      schools:[''],
      grades:[''],
      subjects:[''],
      ExamName:[''],
      ExamDuration:[''],
      ExamDate:[''],
      ExamTime:[''],
      examPdfPath: [''],
      examAudioPath: ['']
    });
  }

  //#region "Get All List"

  getGradeList(){
    this.assignmentService.GetGradeList().subscribe(response => {
		  this.grades = response.data;
		})
  }


  getSubjectList(){
    this.assignmentService.GetSubjectList().subscribe(response => {
		  this.subjects = response.data;
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

  onFileUpload(data: {files: Array<File>}): void {
    const requests = [];
    data.files.forEach(file => {
      const formData = new FormData();
      formData.append('file', file, file.name);
      requests.push(this.assignmentService.onFileUpload(formData));
    });
    forkJoin(requests).subscribe((res: Array<{url: string}>) => {
      if (res && res.length > 0) {
        res.forEach(item => {
          const extension = item.url.split('.').pop();
          if (extension === 'jpg' || extension === 'png' || extension === 'pdf') {
            this.assignmentFormGrp.patchValue({
              examPdfPath: item.url
            });
          } else if(extension === 'mp3') {
            this.assignmentFormGrp.patchValue({
              examAudioPath: item.url
            });
          }
        });
      }
    });
  }

}
