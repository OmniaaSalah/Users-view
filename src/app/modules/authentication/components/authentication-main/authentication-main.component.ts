import { Component, OnInit,inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { faArrowRight ,faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import {MessageService} from 'primeng/api';
import { UserService } from 'src/app/core/services/user/user.service';
import { UserScope } from 'src/app/shared/enums/user/user.enum';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { SurveyService } from 'src/app/modules/dashboard/modules/surveys/service/survey.service';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-authentication-main',
  templateUrl: './authentication-main.component.html',
  styleUrls: ['./authentication-main.component.scss'],
  providers: [MessageService]

})
export class AuthenticationMainComponent implements OnInit {
  languge= inject(TranslationService).lang;
  returnUrl=this.activatedRoute.snapshot.queryParamMap.get('returnUrl')||'/';
  isEmail:boolean=false;
  urlOtp;
  urlEmail;
  openForgetPasswordModel:boolean=false;
  openResetModel:boolean=false;
  openNewAccountModel:boolean=false;
  exclamationIcon=faExclamationCircle;
  loading: boolean = false;
  token: any;
  setPasswordForm: any;
  isBtnLoading: boolean=false;

  loginForm: FormGroup;
  code=this.activatedRoute.snapshot.queryParamMap.get('code');
  error_description=this.activatedRoute.snapshot.queryParamMap.get('error');
  constructor(
    private formbuilder: FormBuilder,
    private authService: AuthenticationService,
    private translationService: TranslationService,
    private userService: UserService,
    private router: Router,
    public translate: TranslateService,
    private toastService: ToastService,
    private activatedRoute:ActivatedRoute,
    private sharedService:SharedService,
    public surveyService:SurveyService

  ) {




  }

  ngOnInit(): void {

     this.checkUAEPassLogin();
     this.initLoginForm();

     this.authService.isNewAccountOpened.subscribe((res)=>{this.openNewAccountModel=res})
     this.authService.isForgetModelOpened.subscribe((res)=>{this.openForgetPasswordModel=res})
     this.checkOpenResetPasswoedForm();
     
  }


  checkUAEPassLogin(){
    localStorage.setItem('Query', JSON.stringify(this.activatedRoute.snapshot.queryParamMap))
    if(this.error_description)
      {

         this.toastService.error(this.translate.instant('login.user not complete Login with UEA pass'));
        this.router.navigate(['/auth/login']);
      }
     else if(this.code)
     {
        this.authService.getUAEUSER(this.code).subscribe((res:any)=>{
          this.userService.setToken(res)
          this.userService.setUser(res.user);
          this.userService.setScope(res.scope)
          localStorage.setItem('$AJ$token',res.token)
          localStorage.setItem('UaeLogged','true')
          this.userService.isUserLogged$.next(true);
          if(res.scope==UserScope.Employee)
          {
           this.getCurrentEmployeeData();
           }
           else if(res.scope==UserScope.Guardian)
           {
             this.getCurrentGuardianData();
           }

          this.getCurrentYear();
        },err=>{
          
          this.toastService.error(this.languge=='ar'? err?.Ar : err?.En)
          setTimeout(() => {
            window.location.href =`https://stg-id.uaepass.ae/idshub/logout?redirect_uri=${environment.logoutRedirectUrl}`;
           },2500);
       
          // this.router.navigate(['/auth/login']);
        });
     }
  }


  initLoginForm() {
    this.loginForm = this.formbuilder.group({
      account: [null, [Validators.required,Validators.minLength(4)]],
      password: [null, [Validators.required,Validators.pattern('(?=\\D*\\d)(?=.*?[#?!@$%^&*-])(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}')]],
    })
  }


  get account() {
    return this.loginForm.controls['account'] as FormControl;
  }
  get password() {
    return this.loginForm.controls['password'] as FormControl;
  }





  onNext() {


    this.login();

  }

  get getLoginForm() {
    return this.loginForm.controls
  }


  initSetPasswordForm() {
    this.setPasswordForm = this.formbuilder.group({
      password: [null, [Validators.required, Validators.pattern('(?=\\D*\\d)(?=.*?[#?!@$%^&*-])(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}')]],
      otp: [null, [Validators.required]],
      passwordConfirmation: [null, [Validators.required, this.matchValues('password'), Validators.pattern('(?=\\D*\\d)(?=.*?[#?!@$%^&*-])(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}')]],
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
      this.userService.isUserLogged$.next(true);

     if(res.user.scope==UserScope.Employee)
     {

      this.getCurrentEmployeeData();

      }
      else if(res.user.scope==UserScope.Guardian)
      {

        this.getCurrentGuardianData();
      }


      if(res.user.scope==UserScope.SPEA){
        this.userService.currentUserName.next(res.user.fullName)
      }

      this.getCurrentYear()

      this.showSuccess();


    },err=>{this.isBtnLoading = false;this.showError()})
  }


  validate() {

    this.authService.validateUsername(this.account.value).subscribe((res: any) => {
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
    this.authService.signInWithIdentity(this.languge).subscribe(res=>{
      window.location.href = res.massege

    })
  }

openNewAccount()
{

  this.authService.isNewAccountOpened.next(true)
}
openForgetModel()
{

  this.authService.isForgetModelOpened.next(true)

}

checkOpenResetPasswoedForm()
{

  this.urlOtp=this.activatedRoute.snapshot.queryParamMap.get('otp');
  this.urlEmail=this.activatedRoute.snapshot.queryParamMap.get('email');

  if(this.urlOtp&&this.urlEmail)
  {
    this.openResetModel=true;
  }
}

checkValidators(event)
{

  var input=event;
  this.account.setValidators([Validators.required,Validators.pattern('[05]{1}[0-9]{9}')]);
  this.isEmail=false;

  for (let index = 0; index < input.length; index++) {
   if( input[index]!=0&&input[index]!=1&&input[index]!=2&&input[index]!=3&&input[index]!=4&&input[index]!=5&&input[index]!=6&&input[index]!=7&&input[index]!=8&&input[index]!=9)
   {

       this.isEmail=true;

   }
 }
 if(this.isEmail)
 {

 this.account.clearValidators();
 this.account.setValidators([Validators.required,Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]);
 }
}

changeLanguage(): void {
  this.translationService.handleLanguageChange();
}

getCurrentEmployeeData()
{

  this.authService.schoolIDOfCurrentSchoolEmployee().subscribe((schoolId)=>{
    if(schoolId)
    {
      this.userService.currentUserSchoolId$.next(schoolId)
      this.userService.setSchoolId(schoolId);
    }


  });
  this.authService.getSchoolNameRelatedToCurrentEmployee().subscribe((schoolName)=>{
    if(schoolName)
    {
      this.userService.currentUserSchoolName$.next(schoolName);
      this.userService.setSchoolName(schoolName);
    }


  });
}
getCurrentGuardianData()
{
  this.authService.getCurrentGuardian().subscribe((guardian)=>{
    this.userService.currentGuardian.next(guardian)
    this.userService.setCurrentGuardian(guardian);

  });
}

getCurrentYear()
{
  this.sharedService.getCurrentYear().subscribe((res)=>{
    this.userService.persist('yearId',res?.id);
   this.router.navigateByUrl(this.returnUrl);
  })
}
}
