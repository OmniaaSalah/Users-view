import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { HeaderService } from 'src/app/core/services/Header/header.service';

@Component({
  selector: 'app-add-edit-user-information',
  templateUrl: './add-edit-user-information.component.html',
  styleUrls: ['./add-edit-user-information.component.scss']
})
export class AddEditUserInformationComponent implements OnInit {
  UserFormgrp:FormGroup;
  constructor(private fb: FormBuilder,private headerService:HeaderService,private translate:TranslateService) {
    const formOptions: AbstractControlOptions = {
      // validators: 
      
   };

   this.UserFormgrp= fb.group({
     
    fullName:[''],
    mobile:[''],
    email:[''],
    Password:[''],
    ConfirmPassword:[''],
    NickName:[''],
    IdentificationNumber:[''],
    PrivateRole:['']

    });
   }

  ngOnInit(): void {
    this.headerService.Header.next(
      {'breadCrump':[
        {label: this.translate.instant('dashboard.UserInformation.List Of Users')},
        {label: this.translate.instant('dashboard.UserInformation.Add User')}],
        'home':{icon: 'pi pi-home', routerLink: '/'},
        'mainTittle':this.translate.instant('dashboard.UserInformation.Add User')
      }
      );
  }

}
