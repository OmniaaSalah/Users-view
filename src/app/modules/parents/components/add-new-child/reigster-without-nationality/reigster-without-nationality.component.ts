import { IndexesEnum } from './../../../../../shared/enums/indexes/indexes.enum';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SelectItem } from 'primeng/api';
import { IHeader } from 'src/app/core/Models';
import { IunregisterChild } from 'src/app/core/Models/IunregisterChild';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { CustomFile } from 'src/app/modules/dashboard/modules/assignments/assignments/exam-upload/exam-upload.component';
import { IndexesService } from 'src/app/modules/dashboard/modules/indexes/service/indexes.service';
import { ParentService } from 'src/app/modules/dashboard/modules/parants/services/parent.service';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { AddChildService } from '../../../services/add-child.service';
import { ToastrService } from 'ngx-toastr';
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
  gender =[
      {name:{en:'Male',ar:'ذكر'},id:0},
      {name:{en:'Female',ar:'انثي'},id:1},
  ]
  relatives=[]
  indexes=[]
  currentLang = localStorage.getItem('preferredLanguage')
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
  minimumDate = new Date();


  constructor(private fb:FormBuilder, private translate: TranslateService, 
    private addChild:AddChildService,
    private headerService: HeaderService,
    private sharedService:SharedService,
    private toastr:ToastrService,
    private index:IndexesService) { 
    // this.gender =   Object.keys(genderEnum).map((key,i) => ({ label: genderEnum[key], value: i }));
    // this.gender =this.sharedService.genderOptions 
    // this.religions = this.sharedService.religions
  }

  ngOnInit(): void {
    this.headerService.changeHeaderdata(this.componentHeaderData);
    this.getNationalites()
    this.getReligions()
    this.getRelative()
    this.getNoIdentityReason()
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

  charactersOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return true;
    }
    return false;

  }

  numbersOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  getNoIdentityReason(){
    this.index.getIndext(IndexesEnum.TheReasonForLackOfIdentification).subscribe(res=>{
      this.indexes = res
      
    })
  }

  getRelative(){
    this.addChild.getRelative().subscribe(res=>{
      this.relatives = res.data
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
    let name = {en:"",ar:""}
    let surName = {en:"",ar:""}
    if(this.currentLang == 'ar'){
      name.ar = this.registerWithoutIdentityForm.value.name
    }else{
      name.en = this.registerWithoutIdentityForm.value.name
    }

    if(this.currentLang == 'ar'){
      surName.ar = this.registerWithoutIdentityForm.value.nickname
    }else{
      surName.en = this.registerWithoutIdentityForm.value.nickname
    }
    
    this.imageResult1.map(er=>{
        er.comment = this.registerWithoutIdentityForm.value.note
    })

    this.imageResult3.map(er=>{
      er.comment = this.registerWithoutIdentityForm.value.note2
  })

    let data = {
      'imagePath': this.imageResult2.map(er=>er.url).toString(),
      'childAttachments':[...this.imageResult1,...this.imageResult3],
      'reasonForNotHavingEmiratesId': this.registerWithoutIdentityForm.value.reason,
      'name': name,
      'surName': surName,
      'gender': this.registerWithoutIdentityForm.value.gender,
      'nationlityId': this.registerWithoutIdentityForm.value.nationality,
      'relativeRelationId':  this.registerWithoutIdentityForm.value.relativity,
      'passportNumber': this.registerWithoutIdentityForm.value.travelId,
      'religionId': this.registerWithoutIdentityForm.value.religion,
      'birthDate': new Date(this.registerWithoutIdentityForm.value.birthdate).toISOString(),
      'passportNumberExpirationDate': new Date(this.registerWithoutIdentityForm.value.PassportNumberExpirationDate).toISOString(),
      'guardianId': Number(localStorage.getItem('$AJ$userId'))
    }
    this.addChild.postChildWithoudIdentity(data).subscribe(res=>{      
      this.toastr.success(res.message);
    },err=>{
      this.toastr.error(err);
    })
   }

}
