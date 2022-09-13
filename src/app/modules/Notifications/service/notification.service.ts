import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { inotification } from 'src/app/core/Models/inotification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  NotificationsAPIList:inotification[]=[];
  public NotificationsList= new BehaviorSubject<inotification[]>([]);
  public NotificationNumber= new BehaviorSubject<number>(0);
  constructor() { 
    this.NotificationsAPIList=[
      {'notificationname':'طلب تعديل الأجازة المرنة',
      'description':'يُعدُّ طلب الإجازة من أكثر الخطابات الرسمية استخدامًا على نطاق واسع في المؤسسات من مختلف التخصصات، إذا رغب الموظف في أخذ إجازة',
      'receivedtime':'ساعتين','sendername':'محمد كمال','datefrom':'12/02','dateto':'24/08','notreadable':false,'id':0},
      {'notificationname':'طلب تعديل الأجازة المرنة',
      'description':'يُعدُّ طلب الإجازة من أكثر الخطابات الرسمية استخدامًا على نطاق واسع في المؤسسات من مختلف التخصصات، إذا رغب الموظف في أخذ إجازة',
      'receivedtime':'ساعتين','sendername':'علي محمد','datefrom':'12/02','dateto':'24/08','notreadable':false,'id':1},
      {'notificationname':'طلب تعديل الأجازة المرنة',
      'description':'يُعدُّ طلب الإجازة من أكثر الخطابات الرسمية استخدامًا على نطاق واسع في المؤسسات من مختلف التخصصات، إذا رغب الموظف في أخذ إجازة',
      'receivedtime':'ساعتين','sendername':'سليم محمود','datefrom':'12/02','dateto':'24/08','notreadable':true,'id':2},
      {'notificationname':'طلب تعديل الأجازة المرنة',
      'description':'يُعدُّ طلب الإجازة من أكثر الخطابات الرسمية استخدامًا على نطاق واسع في المؤسسات من مختلف التخصصات، إذا رغب الموظف في أخذ إجازة',
      'receivedtime':'ساعتين','sendername':'محمد صلاح','datefrom':'12/02','dateto':'24/08','notreadable':true,'id':3},
      {'notificationname':'طلب تعديل الأجازة المرنة',
      'description':'يُعدُّ طلب الإجازة من أكثر الخطابات الرسمية استخدامًا على نطاق واسع في المؤسسات من مختلف التخصصات، إذا رغب الموظف في أخذ إجازة',
      'receivedtime':'ساعتين','sendername':'مصطفي راضي','datefrom':'12/02','dateto':'24/08','notreadable':true,'id':5}
    ];
    this.NotificationsList.next(this.NotificationsAPIList);
  }
}
