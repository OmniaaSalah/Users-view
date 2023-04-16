import { Component, inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { IRegistrationWay } from 'src/app/core/Models/account/registration-way';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import Validation from 'src/app/modules/dashboard/modules/user-information/models/utils/validation';
import { CustomFile } from 'src/app/shared/components/file-upload/file-upload.component';
import { RegistrationEnum } from 'src/app/shared/enums/registration/registration-ways.enum';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { IndexesService } from 'src/app/modules/dashboard/modules/indexes/service/indexes.service';
import { IndexesEnum } from 'src/app/shared/enums/indexes/indexes.enum';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { FileEnum } from 'src/app/shared/enums/file/file.enum';
import { Subscription, takeWhile, tap, timer } from 'rxjs';
@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.scss']
})
export class NewAccountComponent implements OnInit {
  showInputForm:boolean=true;
  lang = inject(TranslationService).lang
  isBtnLoading:boolean=false;
  currentDate=new Date();
  exclamationIcon=faExclamationCircle;
  @Input('openModel')  openModel:boolean;
  @ViewChild('ngOtpInput') ngOtpInputRef:any;
  account:IRegistrationWay={} as IRegistrationWay;
  signUpWaysList=[];
  nationalityList=[];
  noIdentityReasonList=[];
  genderList=inject(SharedService).genderOptions;
  otp:string;
  step:number = 1;
  timeLeft=60;
  enableSendOtpAgain:boolean=true
  interval;
  showPhoneField:boolean=false;
  showIdentityField:boolean=false;
  showEmailField:boolean=false;
  tittle;
  registrationWayFormGrp: FormGroup;
  passwordsFormGrp: FormGroup;
  accountFormGrp: FormGroup;

  get fileTypeEnum() {return FileEnum}

  constructor(
    private router:Router,
    private indexService:IndexesService,
    private translate:TranslateService,
    private sharedService:SharedService,
    private toastService: ToastService,
    private authService:AuthenticationService,
    private formbuilder: FormBuilder) {
    this.registrationWayFormGrp=formbuilder.group({
      registrationWay:['',Validators.required],
      phoneWay:[''],
      emairatesWay:[''],
      emailWay:['']
    });
    this.passwordsFormGrp=formbuilder.group({
      newUserPassword:['',[Validators.required,Validators.pattern('(?=\\D*\\d)(?=.*?[#?!@$%^&*-])(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}')]],
      newUserConfirmPassword:['',[Validators.required,Validators.pattern('(?=\\D*\\d)(?=.*?[#?!@$%^&*-])(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}')]],

    },{validators: [Validation.match('newUserPassword', 'newUserConfirmPassword')]
    });

    this.accountFormGrp=formbuilder.group({
      arabicName:['',[Validators.required,Validators.maxLength(100)]],
      englishName:['',[Validators.required,Validators.maxLength(100)]],
      arabicNickName:['',[Validators.required,Validators.maxLength(100)]],
      englishNickName:['',[Validators.required,Validators.maxLength(100)]],
      nationality:['',[Validators.required]],
      birthDay:['',[Validators.required]],
      gender:['',[Validators.required]],
      identityReasonId:['',[Validators.required]],
      identityReasonFile:['',[Validators.required]]
    });
  }

  ngOnInit(): void {
    this.tittle=this.translate.instant("login.Create New User Account");
    this.getAuthenticationWays();
  }
  get registrationWay() {
    return this.registrationWayFormGrp.controls['registrationWay'] as FormControl;
  }
  get phoneWay() {
    return this.registrationWayFormGrp.controls['phoneWay'] as FormControl;
  }

  get emairatesWay() {
    return this.registrationWayFormGrp.controls['emairatesWay'] as FormControl;
  }
  get emailWay() {
    return this.registrationWayFormGrp.controls['emailWay'] as FormControl;
  }
  get newUserPassword() {
    return this.passwordsFormGrp.controls['newUserPassword'] as FormControl;
  }
  get newUserConfirmPassword() {
    return this.passwordsFormGrp.controls['newUserConfirmPassword'] as FormControl;
  }


  get arabicName() {
    return this.accountFormGrp.controls['arabicName'] as FormControl;
  }
  get englishName() {
    return this.accountFormGrp.controls['englishName'] as FormControl;
  }

  get arabicNickName() {
    return this.accountFormGrp.controls['arabicNickName'] as FormControl;
  }
  get englishNickName() {
    return this.accountFormGrp.controls['englishNickName'] as FormControl;
  }

  get nationality() {
    return this.accountFormGrp.controls['nationality'] as FormControl;
  }
  get birthDay() {
    return this.accountFormGrp.controls['birthDay'] as FormControl;
  }

  get gender() {
    return this.accountFormGrp.controls['gender'] as FormControl;
  }
  get identityReasonFile() {
    return this.accountFormGrp.controls['identityReasonFile'] as FormControl;
  }
  get identityReasonId() {
    return this.accountFormGrp.controls['identityReasonId'] as FormControl;
  }
  closeModel()
  {

    this.authService.isNewAccountOpened.next(false)
    localStorage.removeItem('accountWay');
    localStorage.removeItem('notificationSource');
  }
  changeRegistrationField(e)
  {
    if(e==RegistrationEnum.PhoneNumber)
    {
      this.showEmailField=false;
      this.showPhoneField=true;
      this.showIdentityField=false;
      this.emairatesWay.clearValidators();
      this.emairatesWay.updateValueAndValidity();
      this.emailWay.clearValidators();
      this.emailWay.updateValueAndValidity();
      this.phoneWay.setValidators([Validators.required,Validators.pattern('(05)[0-9]{8}')]);
      this.account.notificationSource=this.registrationWayFormGrp.value.phoneWay

    }
    else if(e==RegistrationEnum.Email)
    {

      this.showEmailField=true;
      this.showPhoneField=false;
      this.showIdentityField=false;
      this.emairatesWay.clearValidators();
      this.emairatesWay.updateValueAndValidity();
      this.phoneWay.clearValidators();
      this.phoneWay.updateValueAndValidity();
      this.emailWay.setValidators([Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]);
      this.account.notificationSource=this.registrationWayFormGrp.value.emailWay
    }
    else if(e==RegistrationEnum.EmiratesId)
    {
      this.showEmailField=false;
      this.showPhoneField=false;
      this.showIdentityField=true;
      this.phoneWay.clearValidators();
      this.phoneWay.updateValueAndValidity();
      this.emailWay.clearValidators();
      this.emailWay.updateValueAndValidity();
      this.emairatesWay.setValidators([Validators.required,Validators.pattern('(784)[0-9]{12}')]);
      this.account.notificationSource=this.registrationWayFormGrp.value.emairatesWay
    }
    console.log(this.account)
  }
  saveRegistrationWay()
  {

   this.account.accountWay=this.registrationWayFormGrp.value.registrationWay;
   this.changeRegistrationField(this.registrationWayFormGrp.value.registrationWay);
   localStorage.setItem('accountWay', this.account.accountWay);
   localStorage.setItem('notificationSource', this.account.notificationSource);
   console.log(this.account)
    // this.openOTPModel=true;
    this.sendOtp();
  }

sendOtp()
{

  if(this.timeLeft)
  {this.isBtnLoading=true;}
  if(this.account.accountWay==RegistrationEnum.EmiratesId)
  {
    this.authService.createUAEPassAccount(this.account.notificationSource).subscribe((res)=>{
      this.isBtnLoading=false;
      this.closeModel();
      this.toastService.success(this.translate.instant('sign up.account saved successfully'));
    },(err)=>{
      this.isBtnLoading=false;
      this.toastService.error(this.translate.instant('dashboard.AnnualHoliday.error,please try again'));})
  }
  else
  {
    this.authService.sendOtpToUser(this.account).subscribe((res)=>{
    this.isBtnLoading=false;
    this.toastService.success(this.translate.instant('shared.Otp send successfully'));
    this.tittle=this.translate.instant('sign up.confirmed with OTP')
    this.step=2;
    this.startTimer();
    this.enableSendOtpAgain=true
  },(err)=>{
    this.isBtnLoading=false;
    this.toastService.error(this.translate.instant('dashboard.AnnualHoliday.error,please try again'));})
  }
}
sendOtpAgain()
{
  this.enableSendOtpAgain=false
  this.getCurrentRegistrationWay();
  this.sendOtp()
}
getCurrentRegistrationWay()
  {
    this.account.accountWay= localStorage.getItem('accountWay');
    this.account.notificationSource=localStorage.getItem('notificationSource');
  }
  savePassword()
{
  this.isBtnLoading=true;
  this.getCurrentRegistrationWay();
  var password={
    "registrationSource": this.account.notificationSource,
    "password": this.passwordsFormGrp.value.newUserPassword
  }

  this.sharedService.getAllNationalities().subscribe((res)=>{this.nationalityList=res});
  this.indexService.getIndext(IndexesEnum.TheReasonForLackOfIdentification).subscribe((res)=>{this.noIdentityReasonList=res});
  this.authService.savePassword(password).subscribe((res)=>{
    this.isBtnLoading=false;
    this.toastService.success(this.translate.instant('sign up.password saved successfully'));
    this.step=4;
    this.tittle=this.translate.instant('sign up.in case identity not exist')
  },(err)=>{this.isBtnLoading=false;
    this.toastService.error(this.translate.instant('Request cannot be processed, Please contact support.'));
  })

}
savePersonalInformation()
{
  this.isBtnLoading=true;
  this.getCurrentRegistrationWay();
  var information={
    "reasonForNotHavingEmiratesId":this.accountFormGrp.value.identityReasonId,
    "guardianAccountWay":this.account.accountWay,
    "name":{ar:this.accountFormGrp.value.arabicName,en:this.accountFormGrp.value.englishName},
    "surname":{ar:this.accountFormGrp.value.arabicNickName,en:this.accountFormGrp.value.englishNickName},
    "havingNoEmiratesIdAttachment":this.accountFormGrp.value.identityReasonFile,
    "gender":this.accountFormGrp.value.gender,
    "nationalityId":this.accountFormGrp.value.nationality,
    "birthDate":this.accountFormGrp.value.birthDay,
    "registrationSource":this.account.notificationSource,

  }

  this.authService.saveAccount(information).subscribe((res)=>{
    this.isBtnLoading=false;
  if(res.statusCode!="OK")
  {
    this.toastService.error(this.translate.instant(res.error));
    this.closeModel();
  }else
    {this.toastService.success(this.translate.instant('sign up.account saved successfully'));
      this.closeModel();
  }

  },(res)=>{
    this.isBtnLoading=false;
    this.toastService.error(this.translate.instant('Request cannot be processed, Please contact support.'));
  })

}

onFileUpload(file:CustomFile[]): void {
  if(file.length)
  {this.accountFormGrp.patchValue({identityReasonFile: file[0].url});}
  else
  {this.accountFormGrp.patchValue({identityReasonFile: ''});}
}

getAuthenticationWays()
{
  this.signUpWaysList=[
    {value:RegistrationEnum.PhoneNumber,name:this.translate.instant('sign up.phoneNumberInCaseNotHaveEmiratesID')},
    {value:RegistrationEnum.Email,name:this.translate.instant('sign up.emailInCaseNotHaveEmiratesID')},
    {value:RegistrationEnum.EmiratesId,name:this.translate.instant('sign up.digitalIdentity')}
   ]
}

startTimer() {
  this.timeLeft = 60;
  timer(1000, 1000) //Initial delay 1 seconds and interval countdown also 1 second
  .pipe(
    takeWhile( () => this.timeLeft  > 0 ),
    tap(() =>this.timeLeft --)
  ).subscribe( () => {

  } );


}
onOtpChange(userOtp)
 {
    this.otp=userOtp;
 }

confirmOTP()
{
  this.isBtnLoading=true;
  this.getCurrentRegistrationWay();
  this.authService.confirmOtp(this.account,this.otp).subscribe((res)=>{
    this.isBtnLoading=false;
    this.toastService.success(this.translate.instant('sign up.confirmed successfully'));
    this.step=3;
    this.tittle=this.translate.instant('Enter Your password')
  },(err)=>{
    this.isBtnLoading=false;
    this.toastService.error(this.translate.instant('dashboard.AnnualHoliday.error,please try again'));
    this.step=2;
    this.ngOtpInputRef.setValue('');
  })

}

}
