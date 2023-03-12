import { Component,  OnInit } from '@angular/core';
import {  FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import {  faExclamationCircle, faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import Validation from '../../models/utils/validation';
import { IRole } from 'src/app/core/Models/IRole';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { UserInformationService } from '../../service/user-information.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-new-user-information',
  templateUrl: './add-new-user-information.component.html',
  styleUrls: ['./add-new-user-information.component.scss']
})
export class AddNewUserInformationComponent implements OnInit {
  accountModel;
  roles: IRole[] = [];
  isBtnLoading:boolean=false;
  openPasswordModel:boolean=false
  eyeIcon = faEye;
  slashEyeIcon = faEyeSlash;
  exclamationIcon = faExclamationCircle;
  userFormGrp: FormGroup;
  userId = this.route.snapshot.paramMap.get('userId')
  constructor(
    private route: ActivatedRoute,
     private fb: FormBuilder,
     private toastr: ToastrService,
     private userService:UserInformationService,
     private router: Router,
     private headerService: HeaderService,
     private  translate: TranslateService,
     public translationService: TranslationService,
     private userInformation: UserInformationService) {

    this.userFormGrp = fb.group({

      arabicFullName: ['', [Validators.required, Validators.maxLength(65)]],
      englishFullName: ['', [Validators.required, Validators.maxLength(65)]],
      phoneNumber: ['', [Validators.required, Validators.pattern('[05]{1}[0-9]{9}')]],
      email: ['', [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      password: ['', [Validators.required, Validators.pattern('(?=\\D*\\d)(?=.*?[#?!@$%^&*-])(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}')]],
      confirmPassword: ['', [Validators.required, Validators.pattern('(?=\\D*\\d)(?=.*?[#?!@$%^&*-])(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}')]],
      arabicNickName: ['', [Validators.required, Validators.maxLength(65)]],
      englishNickName: ['', [Validators.required, Validators.maxLength(65)]],
      identityNumber: ['', [Validators.required, Validators.pattern('[784]{1}[0-9]{14}')]],
      privateRole: ['', [Validators.required]],
      userStatus: [false]

    }, {
      validators: [Validation.match('password', 'confirmPassword')]
    });
  }


  ngOnInit(): void {
    
 
    this.headerService.Header.next(
      {
        'breadCrump': [
          { label: this.translate.instant('dashboard.UserInformation.List Of Users'), routerLink: '/dashboard/manager-tools/user-information/users-list' ,routerLinkActiveOptions:{exact: true}},
          { 
           
            label: (this.userId==null||this.userId=='')?  this.translate.instant('dashboard.UserInformation.Add User'):this.translate.instant('dashboard.UserInformation.Edit User'),
            routerLink: (this.userId==null||this.userId=='')? '/dashboard/manager-tools/user-information/new-user': `/dashboard/manager-tools/user-information/edit-user/${this.userId}`
          }
       ],
        'mainTitle':{main:(this.userId==null||this.userId=='')? this.translate.instant('dashboard.UserInformation.Add User'):this.translate.instant('dashboard.UserInformation.Edit User')}
      }
     
    );
    this.getRoleList();
    if(this.userId)
    {
      this.getUserById();
      this.clearPasswordModel();
    }

  }
  get englishFullName() {
    return this.userFormGrp.controls['englishFullName'];
  }
  get arabicFullName() {
    return this.userFormGrp.controls['arabicFullName'];
  }

  get phoneNumber() {
    return this.userFormGrp.controls['phoneNumber'];
  }
  get userStatus() {
    return this.userFormGrp.controls['userStatus'];
  }

  get email() {
    return this.userFormGrp.controls['email'];
  }

  get password() {
    return this.userFormGrp.controls['password'];
  }
  get confirmPassword() {
    return this.userFormGrp.controls['confirmPassword'];
  }

  get arabicNickName() {
    return this.userFormGrp.controls['arabicNickName'];
  }
  get englishNickName() {
    return this.userFormGrp.controls['englishNickName'];
  }
  get identityNumber() {
    return this.userFormGrp.controls['identityNumber'];
  }

  get privateRole() {
    return this.userFormGrp.controls['privateRole'] as FormControl;
  }

  getRoleList(){
    this.userInformation.GetRoleList().subscribe(response => {
		  this.roles = response;
		})
  }

AddAccount(){
 
  this.accountModel={};
  this.accountModel.roles = [];
  this.isBtnLoading=true;

  this.accountModel.arabicFullName = this.userFormGrp.value.arabicFullName;
  this.accountModel.fullName = this.userFormGrp.value.englishFullName;
  this.accountModel.phoneNumber = this.userFormGrp.value.phoneNumber;
  this.accountModel.email = this.userFormGrp.value.email;
  this.accountModel.arabicSurname = this.userFormGrp.value.arabicNickName;
  this.accountModel.englishSurname =this.userFormGrp.value.englishNickName;
  this.accountModel.isActive= this.userFormGrp.value.userStatus;
  this.accountModel.emiratesIdNumber =this.userFormGrp.value.identityNumber;
  this.accountModel.password = this.userFormGrp.value.password;
  this.accountModel.roles.push(Number(this.userFormGrp.value.privateRole));

  if(!this.userId)
  {
        this.userService.AddAccount(this.accountModel).subscribe(res => {
        this.isBtnLoading=false;
        if(res.statusCode=='BadRequest')
        {
          this.toastr.error(this.translate.instant(res.error));
        }
        else
        {
          this.toastr.success(this.translate.instant('Add Successfully'),'');
          this.router.navigate(['/dashboard/manager-tools/user-information/users-list']);
        }
        
         },(err)=>{
         
              this.toastr.error(this.translate.instant('dashboard.AnnualHoliday.error,please try again'));    
               this.isBtnLoading=false;
      
      });
  }
  else{
    this.accountModel.id=this.userId;
    this.userService.EditAccount(this.accountModel).subscribe(res => {
      this.isBtnLoading=false;
     
      if(res.statusCode=='BadRequest')
      {
        this.toastr.error(this.translate.instant(res.error));
      }
      else
      {
        this.toastr.success(this.translate.instant('Updated Successfully'),'');
        this.router.navigate(['/dashboard/manager-tools/user-information/users-list']);
      }
     },(err)=>{

      this.toastr.error(this.translate.instant('dashboard.AnnualHoliday.error,please try again'));
      this.isBtnLoading=false;
    
    });
  }

}

getUserById(){

  this.userInformation.getUsersById(Number(this.userId)).subscribe(response => {
    
    this.accountModel= response;
    this.userFormGrp.patchValue({
      arabicFullName: this.accountModel.arabicFullName,
      englishFullName:this.accountModel.fullName,
      phoneNumber: this.accountModel.phoneNumber,
      email: this.accountModel.email,
      password :  this.accountModel.password,
      confirmPassword :  this.accountModel.password,
      arabicNickName : this.accountModel.arabicSurname,
      englishNickName:this.accountModel.englishSurname,
      identityNumber : this.accountModel.emiratesIdNumber,
      userStatus : this.accountModel.isActive,
      privateRole:this.accountModel.roles[0]
    })
   
  })
}
clearPasswordModel()
{
 
  this.password.clearValidators();
  this.password.updateValueAndValidity();  
  this.confirmPassword.clearValidators();
  this.confirmPassword.updateValueAndValidity();
  this.password.reset();
  this.confirmPassword.reset();

}


}
