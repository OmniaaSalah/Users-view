import { Component, EventEmitter, HostBinding, HostListener, OnInit, Output } from '@angular/core';
import { faAngleLeft, faCalendar, faHouse } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { HeaderService } from 'src/app/core/services/Header/header.service';

@Component({
  selector: 'app-upload-assignment',
  templateUrl: './upload-assignment.component.html',
  styleUrls: ['./upload-assignment.component.scss']
})
export class UploadAssignmentComponent implements OnInit {
  faCoffee = faHouse;
  faAngleLeft = faAngleLeft
  calendericon = faCalendar;
  date3: Date;
  // uploadedFiles: any[] = [];

  constructor(private headerService:HeaderService,private translate:TranslateService) { }

  ngOnInit(): void {
    this.headerService.buildheader({
      'breadCrump': [
        {label: this.translate.instant('Assignments List')},
        {label: this.translate.instant('Upload Assignment')}
    ],
      'home':{icon: 'pi pi-home', routerLink: '/'},
      'mainTittle':""
    });
  }
  // onUpload(event) {
  //   for (let file of event.files) {
  //     this.uploadedFiles.push(file);
  //   }
  // }
}
