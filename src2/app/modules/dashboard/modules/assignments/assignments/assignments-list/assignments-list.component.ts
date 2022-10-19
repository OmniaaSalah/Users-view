import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faAngleRight, faAngleLeft, faHouse, faSearch, faFilter, faHome } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { SortEvent } from 'primeng/api';
import { IAssesment, IHeader, paginationState } from 'src/app/core/Models';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { AssessmentService } from '../../../assessment/service/assessment.service';
import { Iassignments } from '../model/Iassignments';


@Component({
  selector: 'app-assignments-list',
  templateUrl: './assignments-list.component.html',
  styleUrls: ['./assignments-list.component.scss']
})
export class AssignmentsListComponent implements OnInit {
  faHome = faHome
  faFilter = faFilter
  faSearch = faSearch
  faCoffee = faHouse;
  faAngleLeft = faAngleLeft
  faAngleRight = faAngleRight
  page: number = 1;
  is_Available: boolean;
  tableSize: number = 7;
  first = 0
  rows = 4
  isLoaded = false;
  componentHeaderData: IHeader = {
    'breadCrump': [
      { label: this.translate.instant('sideBar.educationalSettings.children.Subjects Assessments'), routerLink: '/dashboard/educational-settings/assessments/assements-list/', routerLinkActiveOptions: { exact: true } }],

  };

  constructor(
    private headerService: HeaderService,
    private translate: TranslateService,
    private router: Router,
    private assignmentservice: AssessmentService) { }

  assignmentList: Iassignments[] = [];

  pageNum =1;
  pageSize=50;
  getAssignmentList(search= '', sortby ='', pageNum = 1, pageSize = 100, sortColumn = '', sortDir = '') {
    this.assignmentservice.getAssignmentList(search, sortby, pageNum, pageSize, sortColumn, sortDir).subscribe(response => {

      this.assignmentList = response?.data;
      this.isLoaded = true;
    })
  }

  pageChanged(event: any) {
    this.pageNum = event.page;
  }

  ngOnInit(): void {
    this.getAssignmentList();
    this.headerService.Header.next(
      {
        'breadCrump': [
          { label: this.translate.instant('Assignments List'), routerLink: '/dashboard/performance-managment/assignments/assignments-list', routerLinkActiveOptions: { exact: true } }],
      }
    );
  }

  customSort(event: SortEvent) {
    event?.data?.sort((data1, data2) => {
      let value1 = data1[event.field!];
      let value2 = data2[event.field!];
      let result = null;

      if (value1 == null && value2 != null)
        result = -1;
      else if (value1 != null && value2 == null)
        result = 1;
      else if (value1 == null && value2 == null)
        result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string')
        result = value1.localeCompare(value2);
      else
        result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

      return (event.order! * result);
    });
  }

  onTableDataChange(event: paginationState) {
    this.first = event.first
    this.rows = event.rows

  }
  searchKey: string = '';
  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }
  applyFilter() {
    let searchData = this.searchKey.trim().toLowerCase();
    this.getAssignmentList(searchData, '', 1, 50, '', "asc");
  }


}
