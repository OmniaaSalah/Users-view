import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { HeaderService } from 'src/app/core/services/header/header.service';
import { passwordMatchValidator } from './password-validators';
import { faArrowRight, faExclamationCircle, faCheck, faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/core/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-user-information',
  templateUrl: './edit-new-user-information.component.html',
  styleUrls: ['./edit-new-user-information.component.scss']
})
export class AddEditUserInformationComponent implements OnInit {
  value1: string;
  checkicon = faCheck;
  Eyeicon = faEye;
  SlashEyeicon = faEyeSlash;
  exclamationicon = faExclamationCircle;
  cities: string[];
  selectedCities: string[];
  righticon = faArrowRight;
  userformgrp: FormGroup;
  typeInputpass: string = 'password';
  typeInputconfirmpass: string = 'password';
  IsUnique: number = 0;
  constructor(private fb: FormBuilder, private router: Router, private headerService: HeaderService, private translate: TranslateService, private userInformation: UserService) {
    const formOptions: AbstractControlOptions = {
      validators: passwordMatchValidator

    };

    this.userformgrp = fb.group({

      fullname: ['', [Validators.required, Validators.maxLength(65)]],
      phonenumber: ['', [Validators.required, Validators.required, Validators.pattern('[05]{1}[0-9]{10}')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{1,30}')]],
      confirmpassword: ['', [Validators.required, Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{1,30}')]],
      nickname: ['', [Validators.required, Validators.maxLength(65)]],
      identitynumber: ['', [Validators.required]],
      privaterole: ['', [Validators.required]],
      userstatus: ['', [Validators.required]]

    }, formOptions);
  }

  ngOnInit(): void {
    this.headerService.Header.next(
      {
        'breadCrump': [
          { label: this.translate.instant('dashboard.UserInformation.List Of Users'), routerLink: '/dashboard/manager-tools/user-information/users-list' },
          { label: this.translate.instant('dashboard.UserInformation.Add User') }],
        mainTitle: { main: this.translate.instant('dashboard.UserInformation.Add User') }
      }
    );
    this.cities = this.userInformation.cities;

    this.selectedCities = this.userInformation.selectedCities;


  }
  get fullname() {
    return this.userformgrp.controls['fullname'];
  }

  get phonenumber() {
    return this.userformgrp.controls['phonenumber'];
  }
  get userstatus() {
    return this.userformgrp.controls['userstatus'];
  }

  get email() {
    return this.userformgrp.controls['email'];
  }

  get password() {
    return this.userformgrp.controls['password'];
  }
  get confirmpassword() {
    return this.userformgrp.controls['confirmpassword'];
  }

  get nickname() {
    return this.userformgrp.controls['nickname'];
  }
  get identitynumber() {
    return this.userformgrp.controls['identitynumber'];
  }

  get privaterole() {
    return this.userformgrp.controls['privaterole'];
  }
  CheckUniqueemail(e) {
    this.IsUnique = 0;

    this.userInformation.userslist.forEach(element => {

      if (element.email == e) {
        this.IsUnique = 1;
        return;
      }

    });
    this.IsUnique = 0;
  }
  CheckUniquephoneNumber(e) {
    this.IsUnique = 0;

    this.userInformation.userslist.forEach(element => {

      if (element.phonenumber == e) {
        this.IsUnique = 1;
        return;
      }

    });
    this.IsUnique = 0;

  }



}
