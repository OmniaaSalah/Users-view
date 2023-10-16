import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  inject,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { IHeader } from 'src/app/core/Models/header-dashboard';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { NotificationService } from '../../service/notification.service';
import { delay, switchMap, take } from 'rxjs';
import { BaseSearchModel } from 'src/app/core/models/filter-search/base-search-model';

@Component({
  selector: 'app-view-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss'],
})
export class NotificationListComponent implements OnInit {
  notificationName = null;
  sender;
  unreadNotificationNumbers;
  notificationsNames = [];
  receivers = [];
  lang = inject(TranslationService).lang;
  @ViewChild('readBtn', { read: ElementRef, static: false })readBtn: ElementRef;
  @ViewChild('notReadBtn', { read: ElementRef, static: false }) notReadBtn: ElementRef;
  notificationsList = [];
  notificationTotal!: number;
  currentNotifications;
  iteration: number = 0;
  loading: boolean = false;
  checkLanguage: boolean = false;
  showSpinner: boolean = false;
  skeletonLoading: boolean = false;
  searchModel = {
    keyword: null,
    sortBy: null,
    page: 1,
    pageSize: 3,
    isRead: null,
    senderIds: null,
    arabicNotificationName: null,
    englishNotificationName: null,
  };
  componentHeaderData: IHeader = {
    breadCrump: [
      {
        label: this.translate.instant('breadcrumb.Notifications'),
        routerLink: '/notifications/notifications-list',
      },
    ],
    mainTitle: {
      main: this.translate.instant('breadcrumb.Notifications'),
      sub: this.notificationTotal,
    },
  };

  constructor(
    private headerService: HeaderService,
    private toastr: ToastrService,
    private translate: TranslateService,
    private notificationService: NotificationService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.notificationService.unReadNotificationNumber.pipe(take(1)).subscribe((response) => {
      this.unreadNotificationNumbers = response;
    });
    this.notificationService.notificationNumber.subscribe((response) => {
      this.componentHeaderData.mainTitle.sub = `(${response})`;
      this.headerService.changeHeaderdata(this.componentHeaderData);
      this.notificationTotal = response;
    });
    this.getNotifications();

    if (localStorage.getItem('preferredLanguage') == 'ar') {
      this.checkLanguage = true;
    } else {
      this.checkLanguage = false;
    }
    this.getSendersName();
    this.getReceivers();
  }

  getSendersName() {
    this.notificationService.getNotificationsNames().subscribe((res) => {
      this.notificationsNames = res.result;
    });
  }

  filtration = { ...BaseSearchModel, PageSize:100, emiretesId: '', schoolId: null, gradeId: null };
  getReceivers() {
    this.notificationService.getSendersNames(this.filtration)
    .pipe(switchMap(res=>{
      this.receivers = res.result;
      return this.notificationService.getSendersNames({...this.filtration, PageSize: res.totalAllData ||70000}).pipe( delay(5000))
    }))
    .subscribe((res) => {
      this.receivers = res.result;
    });
  }


  getNotifications() {
    this.notificationsList = [];
    this.searchModel.arabicNotificationName =
    this.lang == 'ar' ? this.notificationName : null;
    this.searchModel.englishNotificationName =
    this.lang == 'en' ? this.notificationName : null;
    this.skeletonLoading = true;
    this.showSpinner = false;
    this.notificationService.getAllNotifications(this.searchModel).subscribe(
      (res) => {
        this.skeletonLoading = false;
        this.notificationsList = res.data;
        this.currentNotifications = res.total;
        this.showSpinner = true;
        this.sharedService.filterLoading.next(false);
      },
      (err) => {
        this.sharedService.filterLoading.next(false);
        this.showSpinner = true;
        this.skeletonLoading = false;
      }
    );
  }

  getNotReadable() {
    this.readBtn.nativeElement.classList.remove('activeBtn');
    this.notReadBtn.nativeElement.classList.add('activeBtn');
    this.searchModel.keyword = null;
    this.searchModel.page = 1;
    this.searchModel.pageSize = 3;
    this.searchModel.isRead = false;
    this.getNotifications();
  }
  getReadable() {
    this.readBtn.nativeElement.classList.add('activeBtn');
    this.notReadBtn.nativeElement.classList.remove('activeBtn');
    this.searchModel.keyword = null;
    this.searchModel.page = 1;
    this.searchModel.pageSize = 3;
    this.searchModel.isRead = true;
    this.getNotifications();
  }
  onSearch(e) {
    this.searchModel.keyword = e.target.value;
    this.searchModel.page = 1;
    setTimeout(() => {
      this.getNotifications();
    }, 1500);
    if (this.notificationsList.length == 0) {
      this.skeletonLoading = false;
    }
  }

  showDetails(pageLink, id, isRead) {
    if (pageLink) window.open(pageLink, '_blank');
    if (!isRead) {
      this.notificationService.unReadNotificationNumber.next(
        this.unreadNotificationNumbers--
      );
      this.notificationService
      .updateNotifications({ NotificationId: [id] })
      .subscribe(
        (res) => {

          this.getNotifications();
          },
          (err) => {
            this.toastr.error(
              this.translate.instant('Request cannot be processed, Please contact support.'));
          }
        );
    }
  }

  onScroll() {
    if (this.notificationsList.length == 0) {
      this.skeletonLoading = false;
    } else {
      this.loadMore();
    }
  }

  loadMore() {
    this.searchModel.page = 1;
    this.searchModel.pageSize += 3;
    this.getNotifications();
  }
  clearFilter() {
    this.searchModel.keyword = '';
    this.sender = null;
    this.notificationName = null;
    this.searchModel.arabicNotificationName = null;
    this.searchModel.englishNotificationName = null;
    this.searchModel.senderIds = null;
    this.searchModel.page = 1;
    this.getNotifications();
  }
}
