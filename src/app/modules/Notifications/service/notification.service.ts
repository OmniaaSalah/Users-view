import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Notification } from 'src/app/core/models/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  NotificationsAPIList:Notification[]=[];
  public NotificationsList= new BehaviorSubject<Notification[]>([]);
  public NotificationNumber= new BehaviorSubject<number>(0);
  constructor() { 
    this.NotificationsAPIList=[
      {'NotificationName':'طلب تعديل الأجازة المرنة',
      'Description':'يُعدُّ طلب الإجازة من أكثر الخطابات الرسمية استخدامًا على نطاق واسع في المؤسسات من مختلف التخصصات، إذا رغب الموظف في أخذ إجازة، فإنه عادة ما يملأ استمارة طلب الإجازة، والتي يجب ملاحظة أن أسباب هذا الطلب تختلف من شخص لآخرد',
      'ReceivedTime':'ساعتين','SenderName':'محمد كمال','Datefrom':'12/02','Dateto':'24/08','NotReadable':false,'id':0},
      {'NotificationName':'طلب تعديل الأجازة المرنة',
      'Description':'يُعدُّ طلب الإجازة من أكثر الخطابات الرسمية استخدامًا على نطاق واسع في المؤسسات من مختلف التخصصات، إذا رغب الموظف في أخذ إجازة، فإنه عادة ما يملأ استمارة طلب الإجازة، والتي يجب ملاحظة أن أسباب هذا الطلب تختلف من شخص لآخرد',
      'ReceivedTime':'ساعتين','SenderName':'علي محمد','Datefrom':'12/02','Dateto':'24/08','NotReadable':false,'id':1},
      {'NotificationName':'طلب تعديل الأجازة المرنة',
      'Description':'يُعدُّ طلب الإجازة من أكثر الخطابات الرسمية استخدامًا على نطاق واسع في المؤسسات من مختلف التخصصات، إذا رغب الموظف في أخذ إجازة، فإنه عادة ما يملأ استمارة طلب الإجازة، والتي يجب ملاحظة أن أسباب هذا الطلب تختلف من شخص لآخرد',
      'ReceivedTime':'ساعتين','SenderName':'سليم محمود','Datefrom':'12/02','Dateto':'24/08','NotReadable':true,'id':2},
      {'NotificationName':'طلب تعديل الأجازة المرنة',
      'Description':'يُعدُّ طلب الإجازة من أكثر الخطابات الرسمية استخدامًا على نطاق واسع في المؤسسات من مختلف التخصصات، إذا رغب الموظف في أخذ إجازة، فإنه عادة ما يملأ استمارة طلب الإجازة، والتي يجب ملاحظة أن أسباب هذا الطلب تختلف من شخص لآخرد',
      'ReceivedTime':'ساعتين','SenderName':'محمد صلاح','Datefrom':'12/02','Dateto':'24/08','NotReadable':true,'id':3},
      {'NotificationName':'طلب تعديل الأجازة المرنة',
      'Description':'يُعدُّ طلب الإجازة من أكثر الخطابات الرسمية استخدامًا على نطاق واسع في المؤسسات من مختلف التخصصات، إذا رغب الموظف في أخذ إجازة، فإنه عادة ما يملأ استمارة طلب الإجازة، والتي يجب ملاحظة أن أسباب هذا الطلب تختلف من شخص لآخرد',
      'ReceivedTime':'ساعتين','SenderName':'مصطفي راضي','Datefrom':'12/02','Dateto':'24/08','NotReadable':true,'id':5}
    ];
    this.NotificationsList.next(this.NotificationsAPIList);
  }
}
