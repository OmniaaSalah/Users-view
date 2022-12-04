import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IHeader } from 'src/app/core/Models';
import { IunregisterChild } from 'src/app/core/Models/IunregisterChild';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { ParentService } from '../../../parants/services/parent.service';
// import { IunregisterChild } from '../../models/IunregisterChild';


@Component({
  selector: 'app-requestdetails',
  templateUrl: './requestdetails.component.html',
  styleUrls: ['./requestdetails.component.scss']
})
export class RequestdetailsComponent implements OnInit {

  imagesResult = []
  commentForm:FormGroup;
  step=1
  componentHeaderData: IHeader={ 
		breadCrump: [
			{label: this.translate.instant('dashboard.myRequest.My requests')},
      {label: this.translate.instant('dashboard.myRequest.Order details')},
      {label: this.translate.instant('dashboard.myRequest.School enrollment application'),routerLink:'/dashboard/performance-managment/RequestList/Requestdetails'}
		],
	}


  requestDetails= {
    id:"#123456",
    requestType:{en:'',ar:'إعادة ربط الابن مع ولي الأمر'},
    createdBy:{en:'',ar:'محمد علي'},
    requestStatus:{en:'',ar:'موافقة مبدأية'},
    studentStatus:{en:'',ar:'منسحب'},
    date:"14-09-2022-09:38AM",
    parentName: {en:'',ar:'محمد علي'}
  }


  student =
  {
    name:{en:'',ar:'محمد على'},
    src: 'assets/images/requestdetails.png',
    age:12,
    regestered: false,
    grade:{en:'',ar:'الصف الرابع'},
    studentId:254535,
    date:"2002/07/04",
    nationality:{en:'',ar:'اماراتي'},
    gender:{en:'',ar:'ذكر'},
    parentName:{en:'',ar:'علي بن طلال'},
    relation:{en:'',ar:'ابن'},
    attachments:[
      {name:{en:'',ar:'1 ملف خلاصة القيد'},urlLink:"https://www.google.com"},
      {name:{en:'',ar:'2 ملف خلاصة القيد'},urlLink:"https://www.google.com"}
    ]
  }


  // events: any[];
  constructor(
    private translate: TranslateService,
    private headerService: HeaderService,
    private fb:FormBuilder
  ) { }

  ngOnInit(): void {
    this.headerService.changeHeaderdata(this.componentHeaderData)
    this.commentForm = this.fb.group({
      comment:['',Validators.required]
    })
  }

  messageUpload(files){
    this.imagesResult = files    
   }
  
  messageDeleted(event){
      this.imagesResult = event
   }

   sendData(){
    let data = {
      comment: this.commentForm.value.comment,
      attachment: this.imagesResult,
      id: JSON.parse(localStorage.getItem('$AJ$userId'))
    }
    console.log(data);
    this.commentForm.reset()
    this.imagesResult= []
   }
}
