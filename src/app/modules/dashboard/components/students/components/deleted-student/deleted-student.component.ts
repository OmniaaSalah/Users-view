import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Component, EventEmitter, HostBinding, HostListener, OnInit, Output } from '@angular/core';
import { faAngleLeft, faCalendar, faHouse } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-deleted-student',
  templateUrl: './deleted-student.component.html',
  styleUrls: ['./deleted-student.component.scss']
})
export class DeletedStudentComponent implements OnInit {

  routeSub: string;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    return this.route.params.subscribe(params => {
      this.routeSub = params['id']
      console.log(this.routeSub);

    });
  }

  faCoffee = faHouse;
  faAngleLeft = faAngleLeft
  calendericon = faCalendar;
  date3: Date;
  // uploadedFiles: any[] = [];

}
