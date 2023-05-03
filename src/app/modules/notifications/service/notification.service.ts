import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  unReadNotificationNumber=new BehaviorSubject(0);
  notificationNumber=new BehaviorSubject(0);
  constructor(private http:HttpHandlerService) { }

  getAllNotifications(searchModel?){
    return this.http.get('/Notification',searchModel)
  }

  updateNotifications(searchModel){
    return this.http.patch('/Notification/isread',searchModel)
  }

  getNotificationsNames()
  {
    return this.http.get('/Notification/names')
    
  }

  getSendersNames()
  {
    return this.http.get('/Notification/senders')
    
  }
}
