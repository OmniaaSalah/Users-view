import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Filtration } from 'src/app/core/helpers/filtration';
import { paginationInitialState } from 'src/app/core/helpers/pagination';
import { IHeader } from 'src/app/core/Models/header-dashboard';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { FileTypeEnum } from 'src/app/shared/enums/file/file.enum';
import { UserScope } from 'src/app/shared/enums/user/user.enum';
import { GradesService } from '../../../services/grade/grade.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { SchoolsService } from '../../../services/schools/schools.service';
import { ExportService } from 'src/app/shared/services/export/export.service';
import { AssessmentsEnum } from 'src/app/shared/enums/subjects/assessment-type.enum';
import { finalize } from 'rxjs';
import { ClaimsEnum } from 'src/app/shared/enums/claims/claims.enum';

@Component({
  selector: 'app-school-subjects',
  templateUrl: './school-subjects.component.html',
  styleUrls: ['./school-subjects.component.scss'],
})
export class SchoolSubjectsComponent implements OnInit {
  currentSchool = '';
  currentUserScope = inject(UserService).getScope();
  get userScope() {
    return UserScope;
  }
  get assessmentsEnum() {
    return AssessmentsEnum;
  }
  get claimsEnum() {
    return ClaimsEnum;
  }
  lang = inject(TranslationService).lang;

  schoolId = this.route.snapshot.paramMap.get('schoolId');

  componentHeaderData: IHeader = {
    breadCrump: [
      {
        label: this.translate.instant(
          'dashboard.schools.schoolSubjectMangement'
        ),
        routerLink: `/school-management/school/${this.schoolId}/subjects`,
      },
    ],
    mainTitle: { main: this.currentSchool },
  };

  subjectsObj = {
    total: 0,
    list: [],
    loading: true,
    totalAllData: 0,
    isGradeSelected: false,
  };

  filterApplied = false;

  gardeId = this.route.snapshot.queryParamMap.get('gradeId');
  trackId = this.route.snapshot.queryParamMap.get('trackId');

  filtration = {
    ...Filtration,
    GradeId: this.gardeId,
    TrackId: this.trackId,
    SchoolId: this.schoolId,
    ...JSON.parse(localStorage.getItem('Subj-SearchQuery') || 'null'),
  };

  paginationState = { ...paginationInitialState };

  schoolGrades$ = this.schoolsService.getSchoolGardes(this.schoolId).pipe(
    finalize(() => {
      // this.filtration.GradeId = this.gardeId
      // this.filtration.TrackId = this.trackId
      // // if(this.gardeId) this.onGradeSelected()
    })
  );
  gradeTracks$;

  constructor(
    private translate: TranslateService,
    private schoolsService: SchoolsService,
    private route: ActivatedRoute,
    private gradesService: GradesService,
    private headerService: HeaderService,
    private router: Router,
    private toastService: ToastService,
    private userService: UserService,
    private exportService: ExportService
  ) {}

  ngOnInit(): void {
    localStorage.removeItem('gradeId');
    localStorage.removeItem('trackId');
    if (this.currentUserScope == this.userScope.Employee) {
      this.userService.currentUserSchoolName$?.subscribe((res) => {
        if (res) {
          this.currentSchool = res;
          this.componentHeaderData.mainTitle.main =
            this.currentSchool[this.lang];
        }
      });
    }

    if (this.currentUserScope == UserScope.Employee)
      this.headerService.changeHeaderdata(this.componentHeaderData);

    if (this.filtration.GradeId) {
      this.subjectsObj.isGradeSelected = true;
      this.getTracks();
      this.getSubjects();
    }

  }

  getSubjects() {
    if (localStorage.getItem('Subj-SearchQuery')) {
      this.filtration = {
        ...JSON.parse(localStorage.getItem('Subj-SearchQuery')),
        ...this.filtration,
      };
    }
    localStorage.setItem('Subj-SearchQuery', JSON.stringify(this.filtration));

    this.subjectsObj.loading = true;
    this.subjectsObj.list = [];
    this.schoolsService.getSchoolSubjects(this.filtration).subscribe(
      (res) => {
        this.subjectsObj.loading = false;
        this.subjectsObj.list = res.data;
        this.subjectsObj.total = res.total;
        this.subjectsObj.totalAllData = res.totalAllData;

        this.filterApplied = false;
      },
      (err) => {
        this.subjectsObj.loading = false;
        this.subjectsObj.total = 0;
        this.filterApplied = false;
      }
    );
  }

  onGradeSelected() {
    this.subjectsObj.isGradeSelected = true;
    this.filtration.TrackId = null;
    this.getSubjects();
    this.getTracks();
  }

  // getSchoolClasses(){
  //   this.gradesService.getSchoolGardes(this.schoolId,this.filtration).subscribe()
  // }

  getTracks() {
    if (this.filtration.GradeId) {
      this.gradeTracks$ = this.gradesService.getGradeTracks(
        [this.schoolId],
        [this.filtration.GradeId]
      );
    } else {
      this.gradeTracks$ = null;
    }
  }

  onSort(e) {
    if (e.order == 1) this.filtration.SortBy = 'old';
    else if (e.order == -1) this.filtration.SortBy = 'update';
    this.filtration.Page = 1;
    this.getSubjects();
  }

  clearFilter() {
    this.filtration.KeyWord = '';
    this.filtration.GradeId = null;
    this.filtration.TrackId = null;
    this.filtration.Page = 1;
    localStorage.removeItem('Subj-SearchQuery');
    this.getSubjects();
  }

  onExport(fileType: FileTypeEnum) {
    this.exportService.showLoader$.next(true);
    let filter = {
      ...this.filtration,
      PageSize: this.subjectsObj.totalAllData,
      Page: 1,
    };
    this.schoolsService.subjectsToExport(filter).subscribe((res) => {
      this.exportService.exportFile(
        fileType,
        res,
        this.translate.instant('dashboard.schools.schoolSubjectMangement')
      );
    });
  }

  paginationChanged(event: paginationState) {
    this.filtration.Page = event.page;
    this.getSubjects();
  }

  sendDataToAddSubject() {
    this.saveDataOfsubject();
    this.router.navigate([`/school-management/school/${this.schoolId}/subjects/new-subject`,]);

    // if (this.filtration.GradeId) {
    //   this.saveDataOfsubject();
    //   this.router.navigate([`/school-management/school/${this.schoolId}/subjects/new-subject`,]);
    // } else {
    //   this.toastService.error(this.translate.instant('dashboard.schools.pleaze select class firstly'));
    // }
  }

  saveDataOfsubject() {
    localStorage.setItem('gradeId', JSON.stringify(this.filtration.GradeId));
    if (this.filtration.TrackId) {
      localStorage.setItem('trackId', this.filtration.TrackId);
    }
  }
}
