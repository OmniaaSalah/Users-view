import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { TranslationService } from 'src/app/core/services/translation.service';
import { UserService } from 'src/app/core/services/user.service';


@Component({
  selector: 'app-authentication-main',
  templateUrl: './authentication-main.component.html',
  styleUrls: ['./authentication-main.component.scss']
})
export class AuthenticationMainComponent implements OnInit {
  modes = {
    username: 'username_mode',
    password: 'password_mode',
    setPassword: 'setPassword_mode',
  }

  loginForm: FormGroup;
  typeInput: string = 'password';
  loading: boolean = false;
  currentLang: string;
  mode = this.modes.username;
  token: any;
  setPasswordForm: any;
  isBtnLoading: boolean;
  email = new FormControl(null, Validators.required)
  password = new FormControl(null, Validators.required)
  nextBtnText: string = "Next"


  constructor(
    private formbuilder: FormBuilder,
    private authService: AuthenticationService,
    private translationService: TranslationService,
    private userService: UserService,
    private router: Router,
    public translate: TranslateService
  ) {
  }

  ngOnInit(): void {
    this.initLoginForm()
  }

  initLoginForm() {
    this.loginForm = this.formbuilder.group({
      email: [null, [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      password: [null, [Validators.required]],
    })
  }

  onNext() {
    if (this.mode === this.modes.username) {
      this.validate()
      return
    }
    if (this.mode === this.modes.password) {
      this.authenticate()
      return
    }
    if (this.mode === this.modes.setPassword) {
      this.setPassword()
      return
    }

  }

  get getLoginForm() {
    return this.loginForm.controls
  }

  // onSubmit(form: FormGroup) {
  //   if (form.valid) {
  //     this.loading = true;
  //     this.authService.login(form.value).subscribe(result => {
  //       this.loading = false;
  //       localStorage.setItem('token', result.token);
  //       this.router.navigate(['/schools']);
  //     }, error => {
  //       this.loading = false;
  //     })
  //   }
  // }

  onSwitchLanguage() {
    this.translationService.handleLanguageChange()
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
        this.router.navigateByUrl('/schools')
      }, err => {
        this.isBtnLoading = false
        // this.toastr.error(err.message[this.lang])
      })
    }
  }

  authenticate() {
    this.isBtnLoading = true
    this.authService.authenticate(this.token, this.password.value).subscribe((res: any) => {
      this.router.navigateByUrl('/schools')
      this.userService.setUser(res.user)
      this.userService.setToken(res)
      this.isBtnLoading = false
    })
  }
  validate() {
    this.isBtnLoading = true
    this.authService.validateUsername(this.email.value).subscribe((res: any) => {
      this.token = res.token
      this.isBtnLoading = false
      if (res?.message === "Set password required!") {
        this.nextBtnText = "Set Password"
        this.mode = this.modes.setPassword
        this.initSetPasswordForm()
      } else {
        this.nextBtnText = "Login"
        this.mode = this.modes.password
      }
    })
  }






}
