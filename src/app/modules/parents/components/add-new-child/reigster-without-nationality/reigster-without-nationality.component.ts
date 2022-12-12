import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SelectItem } from 'primeng/api';
import { IHeader } from 'src/app/core/Models';
import { IunregisterChild } from 'src/app/core/Models/IunregisterChild';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { CustomFile } from 'src/app/modules/dashboard/modules/assignments/assignments/exam-upload/exam-upload.component';
import { ParentService } from 'src/app/modules/dashboard/modules/parants/services/parent.service';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { AddChildService } from '../../../services/add-child.service';
   enum genderEnum{
      Female="Female",
      Male="Male"
  }
@Component({
  selector: 'app-reigster-without-nationality',
  templateUrl: './reigster-without-nationality.component.html',
  styleUrls: ['./reigster-without-nationality.component.scss']
})
export class ReigsterWithoutNationalityComponent implements OnInit {

  registerWithoutIdentityForm: FormGroup
  imageResult1 = []
  imageResult2 = []
  imageResult3 = []
  relativeityTypes = 
  [
   { name:{en:"son",ar:"ابن"},id:1},
   { name:{en:"daughter",ar:"بنت"},id:2},
   { name:{en:"cousen",ar:"ابن عم"},id:3}
  ]
  Nationalities = []
  religions = []
  gender =[]

  componentHeaderData: IHeader = {
    breadCrump: [
      {
        label: this.translate.instant(
          'dashboard.parentHome.Add New Child'
        ),
        routerLink: '/parent/AddChild/Addchild-WithoutNationality',
        routerLinkActiveOptions: { exact: true },
      },
    ],
    mainTitle: {
      main: this.translate.instant('dashboard.parentHome.Add New Child'),
    },
  };

  constructor(private fb:FormBuilder, private translate: TranslateService, private addChild:AddChildService,private headerService: HeaderService,private sharedService:SharedService) { 
    // this.gender =   Object.keys(genderEnum).map((key,i) => ({ label: genderEnum[key], value: i }));
    this.gender =this.sharedService.genderOptions 
    // this.religions = this.sharedService.religions
  }

  ngOnInit(): void {
    this.headerService.changeHeaderdata(this.componentHeaderData);
    this.getNationalites()
    this.getReligions()
    this.registerWithoutIdentityForm = this.fb.group({
      reason:['',Validators.required],
      note:null,
      note2:null,
      PassportNumberExpirationDate:['',Validators.required],
      name:['',Validators.required],
      nickname:['',Validators.required],
      gender:['',Validators.required],
      nationality:['',Validators.required],
      relativity:['',Validators.required],
      travelId:['',Validators.required],
      religion:['',Validators.required],
      birthdate:['',Validators.required],
    })
  }

  getNationalites(){
    this.addChild.getNationality().subscribe(res=>{
      this.Nationalities = res.data
    })
  }

  getReligions(){
    this.addChild.getReligions().subscribe(res=>{
      this.religions = res
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
      'childImg': this.imageResult2.map(er=>er.url).toString(),
      'childAttachment':[...this.imageResult1,...this.imageResult3],
      'reason': this.registerWithoutIdentityForm.value.reason,
      'identityNote': this.registerWithoutIdentityForm.value.note,
      'name': this.registerWithoutIdentityForm.value.name,
      'nickname': this.registerWithoutIdentityForm.value.nickname,
      'gender': this.registerWithoutIdentityForm.value.gender,
      'nationality': this.registerWithoutIdentityForm.value.nationality,
      'relativity':  this.registerWithoutIdentityForm.value.relativity,
      'travelId': this.registerWithoutIdentityForm.value.travelId,
      'religion': this.registerWithoutIdentityForm.value.religion,
      'birthdate': new Date(this.registerWithoutIdentityForm.value.birthdate).toISOString(),
      'attachmentNote': this.registerWithoutIdentityForm.value.note2,
      'PassportNumberExpirationDate': new Date(this.registerWithoutIdentityForm.value.PassportNumberExpirationDate).toISOString()
    }
    console.log(data);
   }

}
