import { Component, Input, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ArrayOperations } from 'src/app/core/helpers/array';
import { paginationInitialState } from 'src/app/core/helpers/pagination';
import { BaseSearchModel } from 'src/app/core/models/filter-search/base-search-model';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { SubjectService } from 'src/app/modules/subjects/service/subject.service';
import { ConfirmModelService } from 'src/app/shared/services/confirm-model/confirm-model.service';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
@Component({
  selector: 'app-spea-subjects',
  templateUrl: './spea-subjects.component.html',
  styleUrls: ['./spea-subjects.component.scss'],
})
export class SpeaSubjectsComponent implements OnInit {
  @Input() gradeId=null
  lang = inject(TranslationService).lang;
  evaluationTypeList;
  filtration = {
    ...BaseSearchModel,
    schoolid: null,
    gradeid: null,
    evaluation: null,
    ...JSON.parse(this.route.snapshot.queryParams['searchQuery'] || 'null'),
  };
  paginationState = { ...paginationInitialState };
  subjects = {
    totalAllData: 0,
    total: 0,
    list: [],
    loading: true,
  };
  constructor(
    public confirmModelService: ConfirmModelService,
    private sharedService: SharedService,
    private headerService: HeaderService,
    private translate: TranslateService,
    private subjectService: SubjectService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.filtration.schoolid = +this.route.snapshot.paramMap.get('schoolId')
    this.filtration.gradeid = +this.route.snapshot.paramMap.get('gradeId') || this.gradeId
    this.getAllSubjects();
    this.evaluationTypeList = this.subjectService.evaluationTypeList;
    this.headerService.Header.next({
      breadCrump: [
        {
          label: this.translate.instant('dashboard.Subjects.List Of Subjects'),
          routerLink: '/educational-settings/subject/subjects-list',
        },
      ],
    });
  }
  getAllSubjects() {
    if (this.route.snapshot.queryParams['searchQuery']) {
      this.filtration = {
        ...JSON.parse(this.route.snapshot.queryParams['searchQuery']),
        ...this.filtration,
      };
    }
    this.router.navigate([], {
      queryParams: { searchQuery: JSON.stringify(this.filtration) },
      relativeTo: this.route,
    });
    this.sharedService.appliedFilterCount$.next(
      ArrayOperations.filledObjectItemsCount(this.filtration)
    );
    this.subjects.loading = true;
    this.subjects.list = [];
    this.subjectService.getAllSubjects(this.filtration).subscribe(
      (res) => {
        this.sharedService.filterLoading.next(false);
        this.subjects.loading = false;
        this.subjects.total = res.total;
        this.subjects.totalAllData = res.totalAllData;
        this.subjects.list = res.data;
      },
      (err) => {
        this.subjects.loading = false;
        this.subjects.total = 0;
        this.sharedService.filterLoading.next(false);
      }
    );
  }
  clearFilter() {
    this.filtration.KeyWord = '';
    this.filtration.evaluation = null;
    this.filtration.Page = 1;
    this.getAllSubjects();
  }
  onSort(e){
    this.filtration.SortColumnName=e.field
    if(e.order==1) this.filtration.SortBy= 'Asc'
    else if(e.order == -1) this.filtration.SortBy= 'Desc'
    this.filtration.Page=1;
    this.getAllSubjects()
  }
  paginationChanged(event: paginationState) {
    this.filtration.Page = event.page;
    this.getAllSubjects();
  }
}
