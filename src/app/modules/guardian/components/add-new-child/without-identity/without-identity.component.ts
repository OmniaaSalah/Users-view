import { EMPTY, map, Subject, Subscription, take, takeUntil } from 'rxjs';
import { IndexesEnum } from '../../../../../shared/enums/indexes/indexes.enum';
import { Component, OnInit,inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { IHeader } from 'src/app/core/Models';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { IndexesService } from 'src/app/modules/dashboard/modules/indexes/service/indexes.service';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { AddChildService } from '../../../services/add-child.service';
import { ToastrService } from 'ngx-toastr';
import {  faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { HttpStatusCodeEnum } from 'src/app/shared/enums/http-status-code/http-status-code.enum';
import { getLocalizedValue } from 'src/app/core/classes/helpers';
import { ConfirmModelService } from 'src/app/shared/services/confirm-model/confirm-model.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { FileEnum } from 'src/app/shared/enums/file/file.enum';


@Component({
  selector: 'app-without-identity',
  templateUrl: './without-identity.component.html',
  styleUrls: ['./without-identity.component.scss']
})

export class WithoutIdentityComponent implements OnInit , OnDestroy{
  lang =inject(TranslationService).lang
  get fileTypesEnum () {return FileEnum}
  isBtnLoading:boolean=false;
  exclamationIcon = faExclamationCircle;

  componentHeaderData: IHeader = {
    breadCrump: [
      {
        label: this.translate.instant('dashboard.parentHome.Add New Child'),
        routerLink: '/parent/AddChild/Addchild-WithoutNationality',
        routerLinkActiveOptions: { exact: true },
      },
    ],
    mainTitle: {main: this.translate.instant('dashboard.parentHome.Add New Child')},
  };

  ngDestroy$ =new Subject()
  currentGuardianId = this.userService.getCurrentGuardian().id

  registerWithoutIdentityForm: FormGroup=this.fb.group({
    reason:['',Validators.required],
    note:[''],
    note2:[''],
    PassportNumberExpirationDate:['',Validators.required],
    arabicName:['',[Validators.required, Validators.maxLength(64)]],
    englishName:['',[Validators.required, Validators.maxLength(64)]],
    arabicNickName:['',[Validators.required, Validators.maxLength(64)]],
    englishNickName:['',[Validators.required, Validators.maxLength(64)]],
    gender:['',Validators.required],
    nationality:['',Validators.required],
    relativity:['',Validators.required],
    travelId:['',Validators.required],
    religion:['',Validators.required],
    birthdate:['',Validators.required],
  })

  imageResult1 = []
  imageResult2 = []
  imageResult3 = []
  
  genderList =this.sharedService.genderOptions;
  Nationalities$  = this.sharedService.getAllNationalities()
  religions$ = this.sharedService.getReligion()
  relatives$ = this.sharedService.getParentRelative()
  NoIdentityReason =this.index.getIndext(IndexesEnum.TheReasonForLackOfIdentification)


  minimumDate = new Date();
  subscription:Subscription;
  StudentId;

  constructor(private fb:FormBuilder, private translate: TranslateService, 
    private router:Router,
    private addChildService:AddChildService,
    private headerService: HeaderService,
    private sharedService:SharedService,
    private toastr:ToastrService,
    private index:IndexesService,
    private confirmModel:ConfirmModelService,
    private userService:UserService
    ) {  }


  ngOnInit(): void {
    this.headerService.changeHeaderdata(this.componentHeaderData);

  }
  get arabicName() {
    return this.registerWithoutIdentityForm.controls['arabicName'];
  }
  get englishName() {
    return this.registerWithoutIdentityForm.controls['englishName'];
  }
  get arabicNickName() {
    return this.registerWithoutIdentityForm.controls['arabicNickName'];
  }
  get englishNickName() {
    return this.registerWithoutIdentityForm.controls['englishNickName'];
  }

  get gender() {
    return this.registerWithoutIdentityForm.controls['gender'];
  }
  get nationality() {
    return this.registerWithoutIdentityForm.controls['nationality'];
  }
  get relativity() {
    return this.registerWithoutIdentityForm.controls['relativity'];
  }
  get birthdate() {
    return this.registerWithoutIdentityForm.controls['birthdate'];
  }

  get religion() {
    return this.registerWithoutIdentityForm.controls['religion'];
  }
  get travelId() {
    return this.registerWithoutIdentityForm.controls['travelId'];
  }
  get reason() {
    return this.registerWithoutIdentityForm.controls['reason'];
  }
  get PassportNumberExpirationDate() {
    return this.registerWithoutIdentityForm.controls['PassportNumberExpirationDate'];
  }

  charactersOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return true;
    }
    return false;

  }


  messageUpload1(files){
    this.imageResult1 = files    
   }
  
  messageDeleted1(event){
      this.imageResult1 = event
   }

  messageUpload2(files){
    this.imageResult2 = files    
   }
  
  messageDeleted2(event){
      this.imageResult2 = event
   }
   messageUpload3(files){
    this.imageResult3 = files    
   }
  
    messageDeleted3(event){
      this.imageResult3 = event
   }


   childToRelinkWithNewGuardian={

   }


   addNewChild(){
    
    this.isBtnLoading=true;
    this.imageResult1.map(er=>{
        er.comment = this.registerWithoutIdentityForm.value.note
    })

    this.imageResult3.map(er=>{er.comment = this.registerWithoutIdentityForm.value.note2})

    let data = {
      'relativeRelationId':  this.registerWithoutIdentityForm.value.relativity,
      'name': {ar:this.registerWithoutIdentityForm.value.arabicName,en:this.registerWithoutIdentityForm.value.englishName},
      'surName': {ar:this.registerWithoutIdentityForm.value.arabicNickName,en:this.registerWithoutIdentityForm.value.englishNickName},
      'passportNumber': this.registerWithoutIdentityForm.value.travelId,
      'passportNumberExpirationDate': new Date(this.registerWithoutIdentityForm.value.PassportNumberExpirationDate).toISOString(),
      'birthDate': new Date(this.registerWithoutIdentityForm.value.birthdate).toISOString(),
      'gender': this.registerWithoutIdentityForm.value.gender,
      'nationlityId': this.registerWithoutIdentityForm.value.nationality,
      'imagePath': this.imageResult2.map(er=>er.url).toString(),
      'guardianId': Number(JSON.parse(localStorage.getItem('$AJ$currentGuardian')).id),
      'reasonForNotHavingEmiratesId': this.registerWithoutIdentityForm.value.reason,
      'religionId': this.registerWithoutIdentityForm.value.religion,
      'childAttachments':[...this.imageResult1,...this.imageResult3],

    }
 
    this.addChildService.postChildWithoudIdentity(data)
    .pipe(
      map(res=>{
        if(res.statusCode!=HttpStatusCodeEnum.OK){
          if(res.statusCode==HttpStatusCodeEnum.NotAcceptable){
            this.confirmModel.openModel({message: this.translate.instant('toasterMessage.childExistForAnotherGaurdian')})
            this.confirmModelLister()
            this.isBtnLoading=false;  
            this.childToRelinkWithNewGuardian={
                  studentId: res.studentId,
                  childId: res.childId,
                  guardianId: this.currentGuardianId,
                  studentStatus: res.studentStatus
            }
            return EMPTY

          }else{
            throw  new Error(this.translate.instant('toasterMessage.childAlreadyRegisted',{value: res.name || data?.name}))
            // throw  new Error(`الأبن "${getLocalizedValue(res.name || data?.name)}" مسجل لديك بالفعل`)

          }
         
        }else{
          return res
        }
    }))
    .subscribe(res=>{  

      this.isBtnLoading=false;    
      this.toastr.success(this.translate.instant("dashboard.parents.child saved successfully"));

      this.router.navigate(['/']);

    },(err:Error)=>{
      this.isBtnLoading=false;
      this.toastr.error(err.message);

    })
   }


   sendRelinkChildReq(){
    this.isBtnLoading=true;
    this.addChildService.sendRelinkChildReq(this.childToRelinkWithNewGuardian).subscribe(res=>{

      this.toastr.success(this.translate.instant('toasterMessage.requestSendSuccessfully'))
      this.isBtnLoading=false;
      this.router.navigate(['/']);

    },(err:Error)=>{
      this.isBtnLoading=false;
      this.toastr.error(this.translate.instant("toasterMessage.error"));

    })
   }


   confirmModelLister(){
    this.confirmModel.confirmed$
    .pipe(takeUntil(this.ngDestroy$))
    .subscribe(res=>{
      if(res){
        this.sendRelinkChildReq()
      }
    })
   }

 
  ngOnDestroy(): void {
    this.ngDestroy$.next(null)
    this.ngDestroy$.complete()
    this.confirmModel.confirmed$.next(null)
  }

}
