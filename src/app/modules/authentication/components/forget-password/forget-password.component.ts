import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import Validation from 'src/app/modules/dashboard/modules/user-information/models/utils/validation';
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  urlOtp;
  urlEmail;
  tittle;
  step=1;
  isEmail:boolean=false;
  exclamationIcon=faExclamationCircle;
  openForgetPasswordModel:boolean=false;
  openChangePasswordModel:boolean=false;
  openSendLinkModel:boolean=false;
  resetPasswordFormGrp: FormGroup;
  changePasswordFormGrp: FormGroup;
  @Input('openForgetPasswordModel')  openForgetModel:boolean;
  @Input('openResetModel')  openResetModel:boolean;
  constructor( private router: Router, private activatedRoute:ActivatedRoute,private toastService:ToastrService,private translate:TranslateService, private formbuilder: FormBuilder,private authService:AuthenticationService) { 
    this.resetPasswordFormGrp=formbuilder.group({

      resetPasswordWay:['', [Validators.required,Validators.minLength(4)]],
    
    });
    this.changePasswordFormGrp=formbuilder.group({

      newPassword:['',[Validators.required,Validators.pattern('(?=\\D*\\d)(?=.*?[#?!@$%^&*-])(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}')]],
      confirmedNewPassword:['',[Validators.required,Validators.pattern('(?=\\D*\\d)(?=.*?[#?!@$%^&*-])(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}')]]
    },{validators: [Validation.match('newPassword', 'confirmedNewPassword')]});
  }
  ngOnInit(): void {
    this.tittle=this.translate.instant('login.Are you Forget Password ?');

  }

  get resetPasswordWay() {
    return this.resetPasswordFormGrp.controls['resetPasswordWay'] as FormControl;
  }


  get newPassword() {
    return this.changePasswordFormGrp.controls['newPassword'] as FormControl;
  }
  get confirmedNewPassword() {
    return this.changePasswordFormGrp.controls['confirmedNewPassword'] as FormControl;
  }

  closeModel()
  {
  
    this.authService.isForgetModelOpened.next(false);
  
  }

  forgetPassword()
  {
    var account;
    if(this.isEmail)
   { 
     account={
      "userName": this.resetPasswordFormGrp.value.resetPasswordWay
    }
  }
  else{
    account={
      "phoneNumber": this.resetPasswordFormGrp.value.resetPasswordWay
    }
  }
    
    this.authService.forgotPassword(account).subscribe((res)=>{
      this.step=2;
      this.tittle=""
      this.toastService.success(this.translate.instant('sign up.confirmed successfully'));
    },(err)=>{

      this.toastService.error(this.translate.instant(err.message));
     
    })
  }

  checkValidators(event)
  {
   
    var input=event;
    this.resetPasswordWay.setValidators([Validators.required,Validators.pattern('[05]{1}[0-9]{9}')]);
   
    this.isEmail=false;
 
    for (let index = 0; index < input.length; index++) {
     if( input[index]!=0&&input[index]!=1&&input[index]!=2&&input[index]!=3&&input[index]!=4&&input[index]!=5&&input[index]!=6&&input[index]!=7&&input[index]!=8&&input[index]!=9)
     { 
     
         this.isEmail=true;

     }
   }
   if(this.isEmail)
   {
  
   this.resetPasswordWay.clearValidators();
   this.resetPasswordWay.setValidators([Validators.required,Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]);
   }
 }

 ResetPassword()
 {
  var account;
  this.urlOtp=this.activatedRoute.snapshot.queryParamMap.get('otp');
  this.urlEmail=this.activatedRoute.snapshot.queryParamMap.get('email');

  account={
    "otp": this.urlOtp,
    "password":this.changePasswordFormGrp.value.newPassword,
    "email": this.urlEmail
  }

  this.authService.resetPassword(account).subscribe((res)=>{
 
    this.toastService.success(this.translate.instant('Password changed successfully'));
    this.openResetModel=false;
    this.router.navigate(['/auth/login']);
  },(err)=>{
    this.toastService.error(this.translate.instant('Request cannot be processed, Please contact support.'));
  })
 }
}
