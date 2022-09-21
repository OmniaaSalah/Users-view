import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { paginationState } from 'src/app/core/models/pagination/pagination';
import { ISubject } from 'src/app/core/Models/isubject';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { SubjectService } from '../../service/subject.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects-list.component.html',
  styleUrls: ['./subjects-list.component.scss']
})
export class SubjectsComponent implements OnInit {
  subjectsList: ISubject[] = [];
  first = 0;
  rows = 4;
  cities: string[];
  constructor(private headerService: HeaderService, private router: Router, private translate: TranslateService, private subjectService: SubjectService) {
  }

  ngOnInit(): void {

    this.headerService.Header.next(
      {
        'breadCrump': [
          { label: this.translate.instant('dashboard.Subjects.List Of Subjects'),routerLinkActiveOptions:{exact: true} }],
      }
    );
    this.cities = this.subjectService.cities;
    this.subjectsList = this.subjectService.subjectsList;

  }
  gotoAddSubject() {
    this.router.navigate(['/dashboard/educational-settings/subject/new-subject']);
  }

  onTableDataChange(event: paginationState) {
    this.first = event.first
    this.rows = event.rows

  }
}
