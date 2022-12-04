import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { faArrowRight ,faExclamationCircle,faEyeSlash,faEye } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';

import {MessageService} from 'primeng/api';
import { ArrayOperations } from 'src/app/core/classes/array';
import { UserService } from 'src/app/core/services/user/user.service';
import { UserScope } from 'src/app/shared/enums/user/user.enum';

@Component({
  selector: 'app-authentication-main',
  templateUrl: './authentication-main.component.html',
  styleUrls: ['./authentication-main.component.scss'],
  providers: [MessageService]

})
export class AuthenticationMainComponent implements OnInit {
  modes = {
    username: 'username_mode',
    password: 'password_mode',
    setPassword: 'setPassword_mode',
  }
  resetPasswordFormGrp: FormGroup;
  changePasswordFormGrp: FormGroup;
  openChangePasswordModel:boolean=false;
  openSendLinkModel:boolean=false;
  openForgetPasswordModel:boolean=false;
  openLoginModel:boolean=false;
  openOTPModel:boolean=false;
  openPasswordModel:boolean=false;
  openNotIdentityModel:boolean=false;
  showPhoneField:boolean=false;
  showIdentityField:boolean=false;
  showEmailField:boolean=false;
  signUpWaysList;

  showMessage:boolean=false;
  eyeIcon=faEye;
  slashEyeIcon=faEyeSlash;
  exclamationIcon=faExclamationCircle;
  rightIcon=faArrowRight;
  typeInputPass: string = 'password';
  loginForm: FormGroup;
  typeInput: string = 'password';
  loading: boolean = false;
  currentLang: string;
  mode = this.modes.username;
  token: any;
  setPasswordForm: any;
  isBtnLoading: boolean=false;
  ValidateEmail:number=0;
  ValidatePassword:number=0;
  nextBtnText: string = "Next";
  message:string="";
  lang;
  mywindow
  constructor(
    private messageService: MessageService,
    private formbuilder: FormBuilder,
    private authService: AuthenticationService,
    private translationService: TranslationService,
    private userService: UserService,
    private router: Router,
    public translate: TranslateService,
    private toastService: ToastService,
    private activatedRoute:ActivatedRoute
  ) {
    activatedRoute.queryParams.subscribe(params =>{
    
      if(params['code'] == undefined){
        return
      }else{
        this.authService.getUAEUSER(params['code']).subscribe(res=>{
     
          this.userService.setUser(res);
          this.userService.setScope(res.user.scope)
          this.userService.userClaims = ArrayOperations.arrayOfStringsToObject(res.claims)
          localStorage.setItem('$AJ$token',res.token)
          localStorage.setItem('UaeLogged','true')
          this.router.navigateByUrl('');
        })
      }

    })

    this.resetPasswordFormGrp=formbuilder.group({

      emailInResetPassword:['', [Validators.required]],
      phoneNumberInResetPassword:['', [Validators.required]]
    });
    this.changePasswordFormGrp=formbuilder.group({

      newPassword:['', [Validators.required]],
      confirmedNewPassword:['', [Validators.required]]
    });
  }

  ngOnInit(): void {

     this.initLoginForm();
     this.signUpWaysList=this.authService.signUpWaysList;

  }

  initLoginForm() {
    this.loginForm = this.formbuilder.group({
      email: [null, [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      password: [null, [Validators.required,Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{1,30}')]],
    })
  }
  get email() {
    return this.loginForm.controls['email'] as FormControl;
  }
  get password() {
    return this.loginForm.controls['password'] as FormControl;
  }

  get emailInResetPassword() {
    return this.resetPasswordFormGrp.controls['emailInResetPassword'] as FormControl;
  }
  get phoneNumberInResetPassword() {
    return this.resetPasswordFormGrp.controls['phoneNumberInResetPassword'] as FormControl;
  }

  get newPassword() {
    return this.changePasswordFormGrp.controls['newPassword'] as FormControl;
  }
  get confirmedNewPassword() {
    return this.changePasswordFormGrp.controls['confirmedNewPassword'] as FormControl;
  }
  onNext() {
   

    this.login();

  }

  get getLoginForm() {
    return this.loginForm.controls
  }



  onSwitchLanguage() {
  
  }

  initSetPasswordForm() {
    this.setPasswordForm = this.formbuilder.group({
      password: [null, [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{6,}$')]],
      otp: [null, [Validators.required]],
      passwordConfirmation: [null, [Validators.required, this.matchValues('password'), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{6,}$')]],
    })
  }
  get getSetPasswordForm() {
    return this.setPasswordForm.controls
  }

  matchValues(
    matchTo: string // name of the control to match to
  ): (AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      return !!control.parent &&
        !!control.parent.value &&
        control.value !== control.parent.controls[matchTo].value
        ? { isMatching: true }
        : null;
    };
  }

  revalidatePasswordMatch() {
    this.setPasswordForm.controls.password.valueChanges.subscribe(() => {
      this.setPasswordForm.controls.passwordConfirmation.updateValueAndValidity();
    });
  }


  setPassword() {
    if (this.setPasswordForm.valid) {
      this.isBtnLoading = true
      this.authService.setPassword(this.token, this.setPasswordForm.value.password, this.setPasswordForm.value.otp).subscribe((res: any) => {
        this.isBtnLoading = false
        this.userService.setToken(res)
        this.router.navigateByUrl('/dashboard')
      }, err => {
        this.isBtnLoading = false
     
      })
    }
  }

  authenticate() {

    this.authService.authenticate(this.token, this.password.value).subscribe((res: any) => {
      this.isBtnLoading = false;
      this.userService.setUser(res.user);
      this.userService.setToken(res);
     
      this.userService.setScope(res.user.scope);
   
     if(res.user.scope=='Employee')
     {

      this.authService.schoolIDOfCurrentSchoolEmployee().subscribe((schoolId)=>{
        this.userService.currentUserSchoolId$.next(schoolId)
        this.userService.setSchoolId(schoolId);
        this.authService.getSchoolNameRelatedToCurrentEmployee(schoolId).subscribe((schoolname)=>{this.userService.setSchoolName(schoolname)})

      });
      
      
      }


      if(res.user.scope==UserScope.SPEA){
        this.userService.userClaims = ArrayOperations.arrayOfStringsToObject(this.userService.SpeaClaims)
      }else if(res.user.scope==UserScope.Employee){
        this.userService.userClaims = ArrayOperations.arrayOfStringsToObject(this.userService.EmployeeClaims)
      }else if (res.user.scope==UserScope.Guardian){
        this.userService.userClaims = ArrayOperations.arrayOfStringsToObject(this.userService.GardianClaims)
      }


      this.showSuccess();
      this.router.navigateByUrl('/');

    },err=>{this.isBtnLoading = false;this.showError()})
  }


  validate() {
  
    this.authService.validateUsername(this.email.value).subscribe((res: any) => {
      this.token = res.token
   
      this.authenticate();

    },err=>{this.isBtnLoading = false;this.showError(); })
  }

  login(){

    this.isBtnLoading=true;
    this.validate();

  }


  showSuccess() {

    this.toastService.success(this.translate.instant('login.Login Successfully'));
  }

  showError() {

    this.toastService.error(this.translate.instant('login.Something is wrong,Pleaze login again'));

  }


  onSubmit(form: FormGroup) {
    if (form.valid) {
      this.loading = true;
     
    }
  }

  changeCurrentLang(lang: string) {


  }
  signWithIdentity(){
    this.authService.signInWithIdentity(this.lang).subscribe(res=>{
      window.location.href = res.massege

    })
  }
  changeLoginField(e)
  {
    if(e==1)
    {
      this.showEmailField=false;
      this.showPhoneField=true;
      this.showIdentityField=false;

    }
    else if(e==2)
    {

      this.showEmailField=true;
      this.showPhoneField=false;
      this.showIdentityField=false;

    }
    else if(e==3)
    {
      this.showEmailField=false;
      this.showPhoneField=false;
      this.showIdentityField=true;
    }

  }
  closeLoginModel()
  {
   
    this.showEmailField=false;
    this.showPhoneField=false;
    this.showIdentityField=false;
  }

saveMe()
{
 
  this.openOTPModel=true;
}
returnMe(){
  this.openLoginModel=true;
  this.openOTPModel=false;
}
saveOTP()
{
  this.openPasswordModel=true;
}
savePassword()
{
  this.openNotIdentityModel=true;
}
savePersonalInformation()
{
   this.openLoginModel=false;
   this.openNotIdentityModel=false;
   this.openPasswordModel=false;
   this.openOTPModel=false;
}
}
