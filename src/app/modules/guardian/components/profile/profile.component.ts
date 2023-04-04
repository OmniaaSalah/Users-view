import { Component, OnInit ,inject} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { IHeader } from 'src/app/core/Models/header-dashboard';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import {  faExclamationCircle} from '@fortawesome/free-solid-svg-icons';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { ParentService } from 'src/app/modules/dashboard/modules/parants/services/parent.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  isBtnLoading:boolean=false;
  lang = inject(TranslationService).lang;
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
    private toastr:ToastService,
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
      birthDate: ['', [Validators.required]],
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
    this.getGuardian();
  }
  getGuardian()
  {
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
  get birthDate() {
    return this.guardianFormGrp.controls['birthDate'] as FormControl;
  }
  get gender() {
    return this.guardianFormGrp.controls['gender'] as FormControl;
  }

 
  get phone() {
    return this.guardianFormGrp.controls['phone'] as FormControl;
  }
  get email() {
    return this.guardianFormGrp.controls['email'] as FormControl;
  }


  setPhoneValidators(event)
  {
    
    this.email.clearValidators();
    this.phone.setValidators([Validators.required,Validators.pattern('(05)[0-9]{8}')]);
  }
  setEmairatesIdValidators(event)
  {
    this.email.clearValidators();
    this.phone.clearValidators();
   
  }

  setEmailValidators(event)
  {
   
 
   this.phone.clearValidators();
   this.email.setValidators([Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]);
   
 }

 saveChanges()
 {
  this.isBtnLoading=true;
  var guardian={  
                 name:{ar:this.guardianFormGrp.value.arabicName,en:this.guardianFormGrp.value.englishName}, 
                  nickName:{ar:this.guardianFormGrp.value.arabicNickName,en:this.guardianFormGrp.value.englishNickName}, 
                  nationalityId:this.guardianFormGrp.value.nationality,
                  gender: this.guardianFormGrp.value.gender,
                  email:this.guardianFormGrp.value.email,
                  phone: this.guardianFormGrp.value.phone,
                  birthDate:this.formateDate(this.guardianFormGrp.value.birthDate)
    };
    this.guardianService.updateGuardian(this.guardian.id,guardian).subscribe((res)=>{
      this.isBtnLoading=false;
      this.toastr.success(this.translate.instant("Updated Successfully"));
      this.onEditMode=false;
      this.getGuardian();
    },(err)=>{
      this.isBtnLoading=false;
      this.toastr.error(this.translate.instant("Request cannot be processed, Please contact support."));
    })
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
      arabicNickName: guardian?.nickName.ar,
      englishNickName:guardian?.nickName.en,
      gender : guardian?.gender,
      nationality:guardian?.nationalityId,
      birthDate:new Date(guardian?.birthDate)
    })
   
  })
}
formateDate(date :Date)
{
  let d = new Date(date.setHours(date.getHours() - (date.getTimezoneOffset()/60) )).toISOString() 
  return d.split('.')[0]
}

}
