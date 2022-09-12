
import { Component, OnInit, } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HeaderObj } from 'src/app/core/models/header-obj';
import { HeaderService } from 'src/app/core/services/header/header.service';
@Component({
  selector: 'app-deleted-student',
  templateUrl: './deleted-student.component.html',
  styleUrls: ['./deleted-student.component.scss']
})
export class DeletedStudentComponent implements OnInit {

  componentHeaderData: HeaderObj = {
    breadCrump: [
      { label: 'قائمه الطلاب ' },
      { label: this.translate.instant('dashboard.students.deletStudentFromSchool') }
    ],
    mainTitle: { main: this.translate.instant('dashboard.students.deletStudentFromSchool'), sub: '(محمود عامر)' }
  }

  constructor(
    private translate: TranslateService,
    private headerService: HeaderService
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

}
