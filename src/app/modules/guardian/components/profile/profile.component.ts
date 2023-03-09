import { Component, OnInit ,inject} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { IHeader } from 'src/app/core/Models/header-dashboard';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import {  faExclamationCircle} from '@fortawesome/free-solid-svg-icons';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { ParentService } from 'src/app/modules/dashboard/modules/parants/services/parent.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  genderList=inject(SharedService).genderOptions;
  nationalityList=[];
  exclamationIcon = faExclamationCircle;
  onEditMode:boolean=false;
  parent;
  guardian;
  currentDate=new Date()
  guardianFormGrp: FormGroup;

  componentHeaderData: IHeader = {
    breadCrump: [
      { label: this.translate.instant('dashboard.parents.parentInfo') ,routerLink:'/parent/profile',routerLinkActiveOptions:{exact: true}},
    ],
    mainTitle: { main: this.translate.instant('dashboard.parents.parentInfo') }
  }

  
  constructor(
    private translate: TranslateService,
    private guardianService:ParentService,
    private sharedService:SharedService,
    private headerService: HeaderService,
    private userService:UserService,
    private fb: FormBuilder
  ) { 
    this.guardianFormGrp = fb.group({

      arabicName: ['', [Validators.required, Validators.maxLength(100)]],
      arabicNickName: ['', [Validators.required, Validators.maxLength(100)]],
      englishName: ['', [Validators.required, Validators.maxLength(100)]],
      englishNickName: ['', [Validators.required, Validators.maxLength(100)]],
      birthday: ['', [Validators.required]],
      nationality:['', [Validators.required]],
      gender: ['', [Validators.required]],
      email: ['',Validators.minLength(4)],
      emiratesId:['',Validators.minLength(4)],
      phone: ['',Validators.minLength(4)]

    });
  }

  ngOnInit(): void {
    this.headerService.changeHeaderdata(this.componentHeaderData);
    this.userService.currentGuardian.subscribe((res)=> {this.guardian=res;});
    this.sharedService.getAllNationalities().subscribe((res)=>{this.nationalityList=res});
    this.guardianService.getGuardianById(this.guardian.id).subscribe(response => {this.parent=response})
  }

  get arabicName() {
    return this.guardianFormGrp.controls['arabicName'] as FormControl;
  }
  get englishName() {
    return this.guardianFormGrp.controls['englishName'] as FormControl;
  }

  get arabicNickName() {
    return this.guardianFormGrp.controls['arabicNickName'] as FormControl;
  }
  get englishNickName() {
    return this.guardianFormGrp.controls['englishNickName'] as FormControl;
  }

  get nationality() {
    return this.guardianFormGrp.controls['nationality'] as FormControl;
  }
  get birthday() {
    return this.guardianFormGrp.controls['birthday'] as FormControl;
  }
  get gender() {
    return this.guardianFormGrp.controls['gender'] as FormControl;
  }

  get emiratesId() {
    return this.guardianFormGrp.controls['emiratesId'] as FormControl;
  }
  get phone() {
    return this.guardianFormGrp.controls['phone'] as FormControl;
  }
  get email() {
    return this.guardianFormGrp.controls['email'] as FormControl;
  }


  setPhoneValidators(event)
  {
    this.emiratesId.clearValidators();
    this.email.clearValidators();
    this.phone.setValidators([Validators.required,Validators.pattern('[05]{1}[0-9]{9}')]);
  }
  setEmairatesIdValidators(event)
  {
    this.email.clearValidators();
    this.phone.clearValidators();
    this.emiratesId.setValidators([Validators.pattern('[784]{1}[0-9]{14}')]);
  }

  setEmailValidators(event)
  {
   
  this.emiratesId.clearValidators();
   this.phone.clearValidators();
   this.email.setValidators([Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]);
   
 }

 saveChanges()
 {
  var guardian={  name:{ar:this.guardianFormGrp.value.arabicName,en:this.guardianFormGrp.value.englishName}, 
                  nickName:{ar:this.guardianFormGrp.value.arabicNickName,en:this.guardianFormGrp.value.englishNickName}, 
                  nationality:this.guardianFormGrp.value.englishNickName,
                  gender: this.guardianFormGrp.value.gender,
                  email:this.guardianFormGrp.value.email,
                  emiratesId:this.guardianFormGrp.value.emiratesId,
                  phone: this.guardianFormGrp.value.phone
    };
 }

 getGuardianById(){
 var guardian;
  this.guardianService.getGuardianById(this.guardian.id).subscribe(response => {
    
    guardian= response;
    this.guardianFormGrp.patchValue({
      arabicName: guardian?.name.ar,
      englishName:guardian?.name.en,
      phone:guardian?.phone,
      email: guardian?.email,
      arabicNickName: guardian?.arabicSurname,
      englishNickName:guardian?.englishSurname,
      gender : guardian?.gender,
      emiratesId:guardian?.emiratesId,
      nationality:guardian?.nationality
    })
   
  })
}

}
