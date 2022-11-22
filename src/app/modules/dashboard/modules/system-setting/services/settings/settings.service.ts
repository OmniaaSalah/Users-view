import { Injectable } from '@angular/core';
import { RequestCondition } from 'src/app/core/models/settings/settings.model';
import { StatusEnum } from 'src/app/shared/enums/status/status.enum';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  filesSettings :RequestCondition[]=[
    {
      requestName:'طلب تعديل اجازه مرنه',
      maxCount: 1,
      status: StatusEnum.Active,
      files:[
        {
          name:{ar:'', en:''},
          type:'',
          size: 2
        }
      ]
    },
    {
      requestName:'طلب تسجيل ابن',
      maxCount: 2,
      status: StatusEnum.Active,
      files:[
        {
          name:{ar:'', en:''},
          type:'',
          size: 2
        },
        {
          name:{ar:'', en:''},
          type:'',
          size: 2
        }
      ]
    },
    {
      requestName:'طلب رفع الدرجات',
      maxCount: 1,
      status: StatusEnum.Active,
      files:[
        {
          name:{ar:'', en:''},
          type:'',
          size: 2
        }
      ]
    },
  ]

  constructor() { }
  

  getSchoolInGracePeriod(){
    let arr={
      name:{ar:'', en:''},
      grades:[
        {
          name:{ar:'الصف الرابع', en:''},
          isActive:false,
          divisions:[],
        },
        {
          name:{ar:'الصف الرابع', en:''},
          isActive:false,
          divisions:[],
        },
        {
          name:{ar:'الصف الرابع', en:''},
          isActive:false,
          divisions:[],
        },
      ],
    }
  return arr

  }
}
