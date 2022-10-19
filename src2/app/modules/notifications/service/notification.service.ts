import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { INotification } from 'src/app/core/Models/inotification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  notificationsAPIList:INotification[]=[];
  public notificationsList= new BehaviorSubject<INotification[]>([]);
  public notificationNumber= new BehaviorSubject<number>(0);
  constructor() { 
    this.notificationsAPIList=[
      {'notificationName':' تعديل الاجازه المرنة ',
      'description':'يُعدُّ طلب الإجازة من أكثر الخطابات الرسمية استخدامًا على نطاق واسع في المؤسسات من مختلف التخصصات، إذا رغب الموظف في أخذ إجازة',
      'receivedTime':' قبل ساعتين ','senderName':'محمد كمال','dateFrom':'12/02','dateTo':'24/08','notReadable':false,'id':0},
      {'notificationName':' تعديل الاجازه المرنة ',
      'description':'يُعدُّ طلب الإجازة من أكثر الخطابات الرسمية استخدامًا على نطاق واسع في المؤسسات من مختلف التخصصات، إذا رغب الموظف في أخذ إجازة',
      'receivedTime':' قبل ساعتين ','senderName':'علي محمد','dateFrom':'12/02','dateTo':'24/08','notReadable':false,'id':1},
      {'notificationName':' تعديل الاجازه المرنة ',
      'description':'يُعدُّ طلب الإجازة من أكثر الخطابات الرسمية استخدامًا على نطاق واسع في المؤسسات من مختلف التخصصات، إذا رغب الموظف في أخذ إجازة',
      'receivedTime':' قبل ساعتين ','senderName':'سليم محمود','dateFrom':'12/02','dateTo':'24/08','notReadable':true,'id':2},
      {'notificationName':' تعديل الاجازه المرنة ',
      'description':'يُعدُّ طلب الإجازة من أكثر الخطابات الرسمية استخدامًا على نطاق واسع في المؤسسات من مختلف التخصصات، إذا رغب الموظف في أخذ إجازة',
      'receivedTime':' قبل ساعتين ','senderName':'محمد صلاح','dateFrom':'12/02','dateTo':'24/08','notReadable':true,'id':3},
      {'notificationName':' تعديل الاجازه المرنة ',
      'description':'يُعدُّ طلب الإجازة من أكثر الخطابات الرسمية استخدامًا على نطاق واسع في المؤسسات من مختلف التخصصات، إذا رغب الموظف في أخذ إجازة',
      'receivedTime':' قبل ساعتين ','senderName':'مصطفي راضي','dateFrom':'12/02','dateTo':'24/08','notReadable':true,'id':5},
      {'notificationName':' تعديل الاجازه المرنة ',
      'description':'يُعدُّ طلب الإجازة من أكثر الخطابات الرسمية استخدامًا على نطاق واسع في المؤسسات من مختلف التخصصات، إذا رغب الموظف في أخذ إجازة',
      'receivedTime':' قبل ساعتين ','senderName':'محمد كمال','dateFrom':'12/02','dateTo':'24/08','notReadable':false,'id':0},
      {'notificationName':' تعديل الاجازه المرنة ',
      'description':'يُعدُّ طلب الإجازة من أكثر الخطابات الرسمية استخدامًا على نطاق واسع في المؤسسات من مختلف التخصصات، إذا رغب الموظف في أخذ إجازة',
      'receivedTime':' قبل ساعتين ','senderName':'علي محمد','dateFrom':'12/02','dateTo':'24/08','notReadable':false,'id':1},
      {'notificationName':' تعديل الاجازه المرنة ',
      'description':'يُعدُّ طلب الإجازة من أكثر الخطابات الرسمية استخدامًا على نطاق واسع في المؤسسات من مختلف التخصصات، إذا رغب الموظف في أخذ إجازة',
      'receivedTime':' قبل ساعتين ','senderName':'سليم محمود','dateFrom':'12/02','dateTo':'24/08','notReadable':true,'id':2},
      {'notificationName':' تعديل الاجازه المرنة ',
      'description':'يُعدُّ طلب الإجازة من أكثر الخطابات الرسمية استخدامًا على نطاق واسع في المؤسسات من مختلف التخصصات، إذا رغب الموظف في أخذ إجازة',
      'receivedTime':' قبل ساعتين ','senderName':'محمد صلاح','dateFrom':'12/02','dateTo':'24/08','notReadable':true,'id':3},
      {'notificationName':' تعديل الاجازه المرنة ',
      'description':'يُعدُّ طلب الإجازة من أكثر الخطابات الرسمية استخدامًا على نطاق واسع في المؤسسات من مختلف التخصصات، إذا رغب الموظف في أخذ إجازة',
      'receivedTime':' قبل ساعتين ','senderName':'مصطفي راضي','dateFrom':'12/02','dateTo':'24/08','notReadable':true,'id':5},
      {'notificationName':' تعديل الاجازه المرنة ',
      'description':'يُعدُّ طلب الإجازة من أكثر الخطابات الرسمية استخدامًا على نطاق واسع في المؤسسات من مختلف التخصصات، إذا رغب الموظف في أخذ إجازة',
      'receivedTime':' قبل ساعتين ','senderName':'محمد كمال','dateFrom':'12/02','dateTo':'24/08','notReadable':false,'id':0},
      {'notificationName':' تعديل الاجازه المرنة ',
      'description':'يُعدُّ طلب الإجازة من أكثر الخطابات الرسمية استخدامًا على نطاق واسع في المؤسسات من مختلف التخصصات، إذا رغب الموظف في أخذ إجازة',
      'receivedTime':' قبل ساعتين ','senderName':'علي محمد','dateFrom':'12/02','dateTo':'24/08','notReadable':false,'id':1},
      {'notificationName':' تعديل الاجازه المرنة ',
      'description':'يُعدُّ طلب الإجازة من أكثر الخطابات الرسمية استخدامًا على نطاق واسع في المؤسسات من مختلف التخصصات، إذا رغب الموظف في أخذ إجازة',
      'receivedTime':' قبل ساعتين ','senderName':'سليم محمود','dateFrom':'12/02','dateTo':'24/08','notReadable':true,'id':2},
      {'notificationName':' تعديل الاجازه المرنة ',
      'description':'يُعدُّ طلب الإجازة من أكثر الخطابات الرسمية استخدامًا على نطاق واسع في المؤسسات من مختلف التخصصات، إذا رغب الموظف في أخذ إجازة',
      'receivedTime':' قبل ساعتين ','senderName':'محمد صلاح','dateFrom':'12/02','dateTo':'24/08','notReadable':true,'id':3},
      {'notificationName':' تعديل الاجازه المرنة ',
      'description':'يُعدُّ طلب الإجازة من أكثر الخطابات الرسمية استخدامًا على نطاق واسع في المؤسسات من مختلف التخصصات، إذا رغب الموظف في أخذ إجازة',
      'receivedTime':' قبل ساعتين ','senderName':'مصطفي راضي','dateFrom':'12/02','dateTo':'24/08','notReadable':true,'id':5}
    ];
    this.notificationsList.next(this.notificationsAPIList);
  }
}
