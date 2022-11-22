
import { Component, OnInit, } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {IHeader } from 'src/app/core/Models/header-dashboard';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { StudentsService } from '../../services/students/students.service';
@Component({
  selector: 'app-deleted-student',
  templateUrl: './deleted-student.component.html',
  styleUrls: ['./deleted-student.component.scss']
})
export class DeletedStudentComponent implements OnInit {

  studentId = +this.route.snapshot.paramMap.get('id');

  componentHeaderData:IHeader = {
    breadCrump: [
      { label: 'قائمه الطلاب ' ,routerLink:'/dashboard/schools-and-students/students/',routerLinkActiveOptions:{exact: true}},
      { label: this.translate.instant('dashboard.students.deletStudentFromSchool'),routerLink:`/dashboard/schools-and-students/students/delete-student/${this.studentId}` }
    ],
    mainTitle: { main: this.translate.instant('dashboard.students.deletStudentFromSchool'), sub: '(محمود عامر)' }
  }


  // << FORMS >> //
  deleteStudentForm = this.fb.group({
    caues: [],
    media:[]
  })

  constructor(
    private translate: TranslateService,
    private headerService:HeaderService,
    private fb:FormBuilder,
    private studentService:StudentsService,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.headerService.changeHeaderdata(this.componentHeaderData)


  }

  uploadedFiles: File[] = []

  uploadFile(e) {
    let file = e.target.files[0];

    if (file) this.uploadedFiles.push(file)
  }

  deleteFile(index) {
    this.uploadedFiles.splice(index, 1)
  }


  onFileUpload(e){}
}
