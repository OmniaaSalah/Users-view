import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HeaderObj } from 'src/app/core/models/header-obj';
import { HeaderService } from 'src/app/core/services/header/header.service';

@Component({
  selector: 'app-register-student',
  templateUrl: './register-student.component.html',
  styleUrls: ['./register-student.component.scss']
})
export class RegisterStudentComponent implements OnInit {

  componentHeaderData: HeaderObj = {
    breadCrump: [
      { label: 'قائمه الطلاب ' },
    ],
  }

  constructor(
    private translate: TranslateService,
    private headerService: HeaderService
  ) { }

  ngOnInit(): void {
    this.headerService.changeHeaderdata(this.componentHeaderData)

  }

}
