import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-authentication-main',
  templateUrl: './authentication-main.component.html',
  styleUrls: ['./authentication-main.component.scss']
})
export class AuthenticationMainComponent implements OnInit {
  loginForm: FormGroup;
  typeInput: string = 'password';
  loading: boolean = false;
  currentLang: string;


  constructor(
    private formbuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    public translate: TranslateService
  ) {
    this.currentLang = localStorage.getItem('currentLang') || 'ar'
    this.translate.use(this.currentLang)
  }

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      email: [null, [Validators.required, Validators.email, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$")]],
      password: [null, [Validators.required]],
    })
  }



  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      this.loading = true;
      this.authService.login(form.value).subscribe(result => {
        this.loading = false;
        localStorage.setItem('token', result.token);
        this.router.navigate(['/schools']);
      }, error => {
        this.loading = false;
      })
    }
  }

  changeCurrentLang(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('currentLang', lang)
  }



}
