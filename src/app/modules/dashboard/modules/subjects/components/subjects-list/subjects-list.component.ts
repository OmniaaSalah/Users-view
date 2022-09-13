import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { paginationState } from 'src/app/core/models/pagination/pagination';
import { isubject } from 'src/app/core/Models/isubject';
import { HeaderService } from 'src/app/core/services/header/header.service';
import { SubjectService } from '../../service/subject.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects-list.component.html',
  styleUrls: ['./subjects-list.component.scss']
})
export class SubjectsComponent implements OnInit {
  subjectslist: isubject[] = [];
  first = 0;
  rows = 4;
  cities: string[];
  constructor(private headerService: HeaderService, private router: Router, private translate: TranslateService, private subjectapiservice: SubjectService) {
  }

  ngOnInit(): void {

    this.headerService.Header.next(
      {
        'breadCrump': [
          { label: this.translate.instant('dashboard.Subjects.List Of Subjects') }],
      }
    );
    this.cities = this.subjectapiservice.cities;
    this.subjectslist = this.subjectapiservice.subjectslist;

  }
  gotoAddSubject() {
    this.router.navigate(['/dashboard/educational-settings/subject/new-subject']);
  }

  onTableDataChange(event: paginationState) {
    this.first = event.first
    this.rows = event.rows

  }
}
