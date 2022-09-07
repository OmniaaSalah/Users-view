import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { HeaderService } from 'src/app/core/services/Header/header.service';
import { passwordMatchValidator } from './Password-Validators';
import { faArrowRight ,faExclamationCircle,faCheck,faEyeSlash,faEye } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/core/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-user-information',
  templateUrl: './add-edit-user-information.component.html',
  styleUrls: ['./add-edit-user-information.component.scss']
})
export class AddEditUserInformationComponent implements OnInit {
  value1: string;
  checkicon=faCheck;
  Eyeicon=faEye;
  SlashEyeicon=faEyeSlash;
  Exclamationicon=faExclamationCircle;
  cities: string[];
  selectedCities: string[];
  righticon=faArrowRight;
  UserFormgrp:FormGroup;
  typeInputpass: string = 'password';
  typeInputconfirmpass: string = 'password';
  IsUnique:number=0;
  constructor(private fb: FormBuilder,private router:Router,private headerService:HeaderService,private translate:TranslateService,private userInformation:UserService) {
    const formOptions: AbstractControlOptions = {
      validators: passwordMatchValidator
      
   };

   this.UserFormgrp= fb.group({
     
    fullName:['',[Validators.required,Validators.maxLength(65)]],
    phoneNumber:['',[Validators.required,Validators.required,Validators.pattern('[05]{1}[0-9]{10}')]],
    email:['',[Validators.required,Validators.email]],
    Password:['',[Validators.required,Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{1,30}')]],
    ConfirmPassword:['',[Validators.required,Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{1,30}')]],
    NickName:['',[Validators.required,Validators.maxLength(65)]],
    IdentityNumber:['',[Validators.required]],
    PrivateRole:['',[Validators.required]],
    UserStatus:['',[Validators.required]]

    },formOptions);
   }

  ngOnInit(): void {
    this.headerService.Header.next(
      {'breadCrump':[
        {label: this.translate.instant('dashboard.UserInformation.List Of Users'),routerLink:'/dashboard/manager-tools/UserInformation/ViewUsersList'},
        {label: this.translate.instant('dashboard.UserInformation.Add User')}],
        'home':{icon: 'pi pi-home', routerLink: '/'},
        'mainTittle':this.translate.instant('dashboard.UserInformation.Add User')
      }
      );
      this.cities=this.userInformation.cities;

      this.selectedCities=this.userInformation.selectedCities;
      

  }
  get fullName()
  {
    return this.UserFormgrp.controls['fullName'] ;
  }

  get phoneNumber()
  {
    return this.UserFormgrp.controls['phoneNumber'] ;
  }
  get UserStatus(){
    return this.UserFormgrp.controls['UserStatus'] ;
  }

  get email()
  {
    return this.UserFormgrp.controls['email'] ;
  }

  get Password()
  {
    return this.UserFormgrp.controls['Password'] ;
  }
  get ConfirmPassword()
  {
    return this.UserFormgrp.controls['ConfirmPassword'] ;
  }

  get NickName()
  {
    return this.UserFormgrp.controls['NickName'] ;
  }
  get IdentityNumber()
  {
    return this.UserFormgrp.controls['IdentityNumber'] ;
  }

  get PrivateRole()
  {
    return this.UserFormgrp.controls['PrivateRole'] ;
  }
  CheckUniqueemail(e){
    this.IsUnique=0;
    
    this.userInformation.UsersList.forEach(element => {
     
     if(element.email==e)
     {
       this.IsUnique=1;
       return;
     }
     
    });
    this.IsUnique=0;
  }
  CheckUniquephoneNumber(e){
    this.IsUnique=0;
    
    this.userInformation.UsersList.forEach(element => {
     
     if(element.phoneNumber==e)
     {
       this.IsUnique=1;
       return;
     }
     
    });
    this.IsUnique=0;

  }
  
  GoBack(){
    this.router.navigate(['/dashboard/manager-tools/UserInformation/ViewUsersList']);
  }

}
