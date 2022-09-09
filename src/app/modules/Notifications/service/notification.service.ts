import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Notification } from 'src/app/core/Models/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  NotificationsList:Notification[]=[];
  public NotificationNumber= new BehaviorSubject<number>(0);
  constructor() { 


    this.NotificationsList=[
      {'NotificationName':'Change Holiday Request',
      'Description':'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
      'ReceivedTime':'ساعتين','SenderName':'Mohamed Kamel','Datefrom':'12/02','Dateto':'24/08','Readable':true,'id':0},
      {'NotificationName':'Change Holiday Request',
      'Description':'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
      'ReceivedTime':'ساعتين','SenderName':'Mohamed Kamel','Datefrom':'12/02','Dateto':'24/08','Readable':true,'id':1},
      {'NotificationName':'Change Holiday Request',
      'Description':'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
      'ReceivedTime':'ساعتين','SenderName':'Mohamed Kamel','Datefrom':'12/02','Dateto':'24/08','Readable':true,'id':2},
      {'NotificationName':'Change Holiday Request',
      'Description':'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
      'ReceivedTime':'ساعتين','SenderName':'Mohamed Kamel','Datefrom':'12/02','Dateto':'24/08','Readable':true,'id':3},
      
    ]
  }
}
