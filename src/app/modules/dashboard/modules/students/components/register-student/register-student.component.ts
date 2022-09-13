import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { iheader } from 'src/app/core/Models/iheader';
import { HeaderService } from 'src/app/core/services/header/header.service';

@Component({
  selector: 'app-register-student',
  templateUrl: './register-student.component.html',
  styleUrls: ['./register-student.component.scss']
})
export class RegisterStudentComponent implements OnInit {

  componentHeaderData: iheader = {
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
