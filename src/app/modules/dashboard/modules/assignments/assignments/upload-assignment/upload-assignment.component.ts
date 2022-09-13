import { Component, EventEmitter, HostBinding, HostListener, OnInit, Output } from '@angular/core';
import { faAngleLeft, faCalendar, faHouse } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { HeaderService } from 'src/app/core/services/header/header.service';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';


import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
@Component({
  selector: 'app-upload-assignment',
  templateUrl: './upload-assignment.component.html',
  styleUrls: ['./upload-assignment.component.scss']
})
export class UploadAssignmentComponent implements OnInit {
  faCoffee = faHouse;
  faAngleLeft = faAngleLeft
  calendericon = faCalendar;
  checkicon = faCheck;

  righticon = faArrowRight;
  cities: string[];
  date3: Date;
  // uploadedFiles: any[] = [];

  constructor(private headerService: HeaderService, private router: Router, private translate: TranslateService) {
    this.cities = [
      "New York",
      "Rome",
      "London",
      "Istanbul",
      "Paris"
    ];
  }

  ngOnInit(): void {
    this.headerService.Header.next(
      {
        'breadCrump': [
          { label: this.translate.instant('Assignments List') },
          { label: this.translate.instant('Upload Assignment') }
        ]
      }
    );

  }
  GoBack() {
    this.router.navigate(['/dashboard/assignments']);

  }
  // onUpload(event) {
  //   for (let file of event.files) {
  //     this.uploadedFiles.push(file);
  //   }
  // }
}
