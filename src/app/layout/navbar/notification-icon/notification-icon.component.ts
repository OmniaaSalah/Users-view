import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from 'src/app/modules/notifications/service/notification.service';

@Component({
  selector: 'app-notification-icon',
  templateUrl: './notification-icon.component.html',
  styleUrls: ['./notification-icon.component.scss']
})
export class NotificationIconComponent implements OnInit {


  notificationsList = [];
  isChecked: boolean = false;
  notificationNumber;

  searchModel = {
    keyword: null,
    sortBy: 'update',
    page: 1,
    pageSize: null,
    isRead: null,
    senderIds: null,
    arabicNotificationName: null,
    englishNotificationName: null,
  };


  constructor(
    private notificationService: NotificationService,
    private toastr: ToastrService,
    private translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this.getNotficationNumber();

    this.notificationService.unReadNotificationNumber.subscribe(
      (response) => {
        if (response != 0) {
          this.notificationNumber = response;
        } else {
          this.notificationNumber = '';
        }
      }
    );
  }

  getNotifications(searchModel) {
    if (this.searchModel.pageSize == null) {
      this.searchModel.pageSize = 3;
    }
    this.notificationService
      .getAllNotifications(searchModel)
      .subscribe((res) => (this.notificationsList = res.data));
  }

  getNotReadable() {
    this.searchModel.keyword = null;
    this.searchModel.page = 1;
    this.searchModel.pageSize = 3;
    this.searchModel.isRead = false;
    this.getNotifications(this.searchModel);
  }
  getReadable() {
    this.searchModel.keyword = null;
    this.searchModel.page = 1;
    this.searchModel.pageSize = 3;
    this.searchModel.isRead = true;
    this.getNotifications(this.searchModel);
  }

  getNotficationNumber() {
    this.searchModel.pageSize = 8;
    this.searchModel.isRead = null;

    this.notificationService.getAllNotifications().subscribe((res) => {
      let unReadCount = 0;
      this.notificationService.notificationNumber.next(res.total);
      res.data.forEach((element) => {
        if (!element.isRead) {
          unReadCount++;
        }
      });
      this.notificationService.unReadNotificationNumber.next(unReadCount);
    });


  }

  loadMore() {
    this.searchModel.page = 1;
    this.searchModel.pageSize += 3;
    this.getNotifications(this.searchModel);
  }


  onScroll() {
    this.loadMore();
  }



  changeStatus(value) {
    if (value == '0') {
      this.isChecked = false;
      this.getNotifications(
        (this.searchModel = {
          keyword: null,
          sortBy: null,
          page: 1,
          pageSize: 3,
          isRead: null,
          senderIds: null,
          arabicNotificationName: null,
          englishNotificationName: null,
        })
      );
    }
    if (value == '1') {
      this.isChecked = false;
      this.getReadable();
    }
    if (value == '2') {
      this.isChecked = true;
      this.getNotReadable();
    }
  }

  goToNotificationDetails(pageLink, id, isRead) {
    if (pageLink) window.open(pageLink, '_blank');
    if (!isRead) {
      this.notificationService.unReadNotificationNumber.subscribe(
        (response) => {
          this.notificationNumber = response - 1;
        }
      );
      this.notificationService
        .updateNotifications({ NotificationId: [id] })
        .subscribe(
          (res) => {},
          (err) => {
            this.toastr.error(
              this.translate.instant(
                'Request cannot be processed, Please contact support.'
              )
            );
          }
        );
    }
  }

  markAsRead() {
    let sentData = {
      NotificationId: [],
    };
    this.notificationsList.map((res) => {
      {
        return sentData.NotificationId.push(res.id);
      }
    });

    this.notificationService.updateNotifications(sentData).subscribe(
      (res) => {
        // this.toastr.success(res.message)
        this.getNotficationNumber();
        this.getNotReadable();
      },
      (err) => {
        this.toastr.error(
          this.translate.instant(
            'Request cannot be processed, Please contact support.'
          )
        );
      }
    );
  }


}
