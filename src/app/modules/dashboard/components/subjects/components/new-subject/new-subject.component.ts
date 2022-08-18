import { Component, OnInit } from '@angular/core';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-new-subject',
  templateUrl: './new-subject.component.html',
  styleUrls: ['./new-subject.component.scss']
})
export class NewSubjectComponent implements OnInit {

  Homeicon = faHome  ;
  righticon=faArrowRight;
  constructor() { }

  ngOnInit(): void {
  }

}
