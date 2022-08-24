import { Component, EventEmitter, HostBinding, HostListener, OnInit, Output } from '@angular/core';
import { faAngleLeft, faCalendar, faHouse } from '@fortawesome/free-solid-svg-icons';

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

  constructor() { }

  ngOnInit(): void {
  }
  // onUpload(event) {
  //   for (let file of event.files) {
  //     this.uploadedFiles.push(file);
  //   }
  // }
}
