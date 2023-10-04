import { Component, OnInit,inject} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api';
import { BaseSearchModel } from 'src/app/core/models/filter-search/base-search-model';
import { paginationInitialState } from 'src/app/core/helpers/pagination';
import { IHeader } from 'src/app/core/Models';
import { Guardian } from 'src/app/core/models/guardian/guardian.model';

import { paginationState } from 'src/app/core/models/pagination/pagination.model';
// import { paginationState } from 'src/app/core/models/pagination/pagination';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { FileTypeEnum } from 'src/app/shared/enums/file/file.enum';
import { UserScope } from 'src/app/shared/enums/user/user.enum';
import { CountriesService } from 'src/app/shared/services/countries/countries.service';
import { ExportService } from 'src/app/shared/services/export/export.service';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { SharedService } from 'src/app/shared/services/shared/shared.service';

import { ParentService } from '../../services/parent.service';
// import { ParentService } from '../../services/parent.service';

@Component({
  selector: 'app-parants',
  templateUrl: './parants.component.html',
  styleUrls: ['./parants.component.scss'],
})
export class ParantsComponent implements OnInit {
  faEllipsisVertical = faEllipsisVertical;

  lang = inject(TranslationService).lang;
  countries$ = this.countriesService.getCountries();
  currentUserScope = inject(UserService).getScope();

  filtration = {
    ...BaseSearchModel,
    NationalityId: '',
    hasChildreen: true,
    ...JSON.parse(this.route.snapshot.queryParams['searchQuery'] || 'null'),
  };
  paginationState = { ...paginationInitialState };

  parent = {
    totalAllData: 0,
    total: 0,
    list: [],
    loading: true,
  };

  // breadCrumb
  items: MenuItem[] = [
    { label: this.translate.instant('dashboard.parents.parents') },
  ];
  booleanOptions = inject(SharedService).booleanOptions;
  componentHeaderData: IHeader;

  searchByList=[this.translate.instant('dashboard.addChild.name'), this.translate.instant('dashboard.addChild.Identification Number'), this.translate.instant('shared.phoneNumber'), this.translate.instant('shared.email')]

  constructor(
    private exportService: ExportService,
    private translate: TranslateService,
    private userService: UserService,
    private headerService: HeaderService,
    public parentService: ParentService,
    private countriesService: CountriesService,
    public loaderService: LoaderService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.checkDashboardHeader();
    this.checkParentList();
    this.headerService.changeHeaderdata(this.componentHeaderData);
  }
  getParentList() {
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

    this.parent.loading = true;
    this.parent.list = [];
    this.parentService.getAllParents(this.filtration).subscribe(
      (res) => {
        if (res.data) {
          this.sharedService.filterLoading.next(false);
          this.parent.list = res?.data;
          this.parent.totalAllData = res?.totalAllData;
          this.parent.total = res?.total;
          this.parent.loading = false;
        }
      },
      (err) => {
        this.parent.loading = false;
        this.parent.total = 0;
        this.sharedService.filterLoading.next(false);
      }
    );
  }

  getParentListInSpecificSchool(schoolId) {
    this.parent.loading = true;
    this.parent.list = [];
    this.parentService
      .getAllParentsInSpecificSchool(schoolId, this.filtration)
      .subscribe(
        (res) => {
          if (res.data) {
            this.sharedService.filterLoading.next(false);
            this.parent.list = res.data;
            this.parent.totalAllData = res.totalAllData;
            this.parent.total = res.total;
            this.parent.loading = false;
          }
        },
        (err) => {
          this.parent.loading = false;
          this.parent.total = 0;
          this.sharedService.filterLoading.next(false);
        }
      );
  }
  onSort(e) {
    if (e.order == -1) {
      this.filtration.SortBy = 'ASC';
    } else {
      this.filtration.SortBy = 'desc';
    }
    this.filtration.SortColumnName = e.field;
    this.filtration.Page = 1;
    this.checkParentList();
  }

  paginationChanged(event: paginationState) {
    this.filtration.Page = event.page;
    this.filtration.PageSize = event.rows
    this.checkParentList();
  }

  onSearchClear() {
    this.filtration.KeyWord = '';
    this.filtration.NationalityId = null;
    this.applyFilter();
  }

  applyFilter() {
    this.checkParentList();
  }

  onExport(fileType: FileTypeEnum) {
    this.exportService.showLoader$.next(true);
    let filter = {
      ...this.filtration,
      PageSize: this.parent.total,
      Page: 1,
    };
    this.parentService.parentsToExport(filter).subscribe((res: Guardian[]) => {
      this.exportService.exportFile(
        fileType,
        res,
        this.translate.instant('dashboard.parents.parents')
      );
    });
  }

  clearFilter() {
    this.filtration.KeyWord = '';
    this.filtration.NationalityId = null;
    this.filtration.hasChildreen = null;
    // this.filtration.StateId= null
    // this.filtration.Status =''
    // this.filtration.curricuulumId = null
    this.checkParentList();
  }

  showToastr(childrenCount: any) {
    if (childrenCount == 0)
      this.toastr.warning(this.translate.instant('emptyList.noChildren'));
  }

  navigatToChildren(parent) {
    this.router.navigate(['parent', parent.id, 'all-children'], {
      relativeTo: this.route,
    });
  }

  checkDashboardHeader() {
    if (this.currentUserScope == UserScope.Employee) {
      this.componentHeaderData = {
        breadCrump: [
          {
            label: this.translate.instant('dashboard.parents.parents'),
            routerLink: '/student-management/all-parents',
            routerLinkActiveOptions: { exact: true },
          },
        ],
      };
    } else if (this.currentUserScope == UserScope.SPEA) {
      this.componentHeaderData = {
        breadCrump: [
          {
            label: this.translate.instant('dashboard.parents.parents'),
            routerLink: '//schools-and-students/all-parents',
            routerLinkActiveOptions: { exact: true },
          },
        ],
      };
    }
  }

  get userScope() {
    return UserScope;
  }

  checkParentList() {
    if (this.currentUserScope == this.userScope.Employee) {
      this.userService.currentUserSchoolId$.subscribe((id) => {
        this.getParentListInSpecificSchool(id);
      });
    } else {
      this.getParentList();
    }
  }
}
