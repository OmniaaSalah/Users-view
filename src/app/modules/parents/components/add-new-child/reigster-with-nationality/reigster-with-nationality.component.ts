import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IHeader } from 'src/app/core/Models';
import { IunregisterChild } from 'src/app/core/Models/IunregisterChild';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { ParentService } from 'src/app/modules/dashboard/modules/parants/services/parent.service';

@Component({
  selector: 'app-reigster-with-nationality',
  templateUrl: './reigster-with-nationality.component.html',
  styleUrls: ['./reigster-with-nationality.component.scss']
})

export class ReigsterWithNationalityComponent implements OnInit {
  registerWithIdentityForm: FormGroup
  imageResult1 = []
  imageResult2 = []
  imageResult3 = []
  relativeityTypes = 
  [
   { name:{en:"son",ar:"ابن"},id:1},
   { name:{en:"daughter",ar:"بنت"},id:2},
   { name:{en:"cousen",ar:"ابن عم"},id:3}
  ]


  componentHeaderData: IHeader = {
    breadCrump: [
      {
        label: this.translate.instant(
          'dashboard.parentHome.Add New Child'
        ),
        routerLink: '/parent/AddChild/Addchild-WithNationality',
        routerLinkActiveOptions: { exact: true },
      },
    ],
    mainTitle: {
      main: this.translate.instant('dashboard.parentHome.Add New Child'),
    },
  };

  constructor(private fb:FormBuilder, private translate: TranslateService,private headerService: HeaderService) { }

  ngOnInit(): void {
    this.headerService.changeHeaderdata(this.componentHeaderData);
    this.registerWithIdentityForm = this.fb.group({
      identityNumber:['',Validators.required],
      relativityType:['',Validators.required],
      EmiratesIdExpirationDate:['',Validators.required],
      note:null
    })
  }

  messageUpload1(files){
    this.imageResult1 = files    
   }
  
  messageDeleted1(event){
      this.imageResult1 = event
   }

  messageUpload2(files){
    this.imageResult2 = files    
   }
  
  messageDeleted2(event){
      this.imageResult2 = event
   }

   messageUpload3(files){
    this.imageResult3 = files    
   }
  
    messageDeleted3(event){
      this.imageResult3 = event
   }

   sendRegisterForm(){
    let data = {
      'identityNumber': this.registerWithIdentityForm.value.identityNumber,
      'relativityType': this.registerWithIdentityForm.value.relativityType,
      'note': this.registerWithIdentityForm.value.note,
      'childImg': this.imageResult2.map(er=>er.url).toString(),
      'childAttachment':[...this.imageResult1,...this.imageResult3],
      "EmiratesIdExpirationDate":new Date(this.registerWithIdentityForm.value.EmiratesIdExpirationDate).toISOString()
    }
    console.log(data);
   }

}
