import { EMPTY, map, Subject, Subscription, takeUntil } from 'rxjs';
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
import { CustomFile } from 'src/app/shared/components/file-upload/file-upload.component';


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

  currentGuardianId = this.userService.getCurrentGuardian()?.id

  componentHeaderData: IHeader = {
    breadCrump: [
      {
        label: this.translate.instant('dashboard.parentHome.newStudent'),
        routerLink: '/parent/AddChild/Addchild-WithoutNationality',
        routerLinkActiveOptions: { exact: true },
      },
    ],
    mainTitle: {main: this.translate.instant('dashboard.parentHome.newStudent')},
  };

  ngDestroy$ =new Subject()


  registerWithoutIdentityForm: FormGroup=this.fb.group({
    guardianId: this.currentGuardianId,
    reasonForNotHavingEmiratesId:['',Validators.required],
    name: this.fb.group({
      ar:['',[Validators.required, Validators.maxLength(64)]],
      en:['',[Validators.required, Validators.maxLength(64)]]
    }),
    surName: this.fb.group({
      ar:['',[Validators.required, Validators.maxLength(64)]],
      en:['',[Validators.required, Validators.maxLength(64)]]
    }),
    gender:['',Validators.required],
    nationlityId:['',Validators.required],
    relativeRelationId:['',Validators.required],
    religionId:['',Validators.required],
    birthDate:['',Validators.required],
  })


  genderList =this.sharedService.genderOptions;
  Nationalities$  = this.sharedService.getAllNationalities()
  religions$ = this.sharedService.getReligion()
  relatives$ = this.sharedService.getParentRelative()
  NoIdentityReason =this.index.getIndext(IndexesEnum.TheReasonForLackOfIdentification)


  minimumDate = new Date();
  subscription:Subscription;


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
    return (this.registerWithoutIdentityForm.controls['name']as FormGroup ).controls['ar'];
  }
  get englishName() {
    return (this.registerWithoutIdentityForm.controls['name']as FormGroup ).controls['en'];
  }
  get arabicNickName() {
    return (this.registerWithoutIdentityForm.controls['surName']as FormGroup ).controls['ar'];
  }
  get englishNickName() {
    return (this.registerWithoutIdentityForm.controls['surName']as FormGroup ).controls['en'];
  }

  get gender() {
    return this.registerWithoutIdentityForm.controls['gender'];
  }
  get nationlityId() {
    return this.registerWithoutIdentityForm.controls['nationlityId'];
  }
  get relativeRelationId() {
    return this.registerWithoutIdentityForm.controls['relativeRelationId'];
  }
  get birthDate() {
    return this.registerWithoutIdentityForm.controls['birthDate'];
  }

  get religionId() {
    return this.registerWithoutIdentityForm.controls['religionId'];
  }

  get reasonForNotHavingEmiratesId() {
    return this.registerWithoutIdentityForm.controls['reasonForNotHavingEmiratesId'];
  }


   childToRelinkWithNewGuardian={

   }

   passportAttach={
    url: "",
    titel: {
      en: 'Passport Image',
      ar: 'ًصورة جواز السفر'
    },
    name: "",
    comment: "",
  }

  noIdentityCauseAttach={
    url: "",
    titel: {
      en: 'Not Identity Image',
      ar: 'صورة اثبات عدم وجود هوية'
    },
    name: "",
    comment: "",
  }



  birthDateAttach={
    url: "",
    titel: {
      en: 'birth certificate',
      ar: 'صورة اثبات تاريخ الميلاد'
    },
    name: "",
    comment: "",
  }

  personalPhoto={
    url: "",
    titel: {
      en: 'Personal Image',
      ar: 'الصورة الشخصية'
    },
    name: "",
    comment: "",
  }


   setAttachment(attachRef, files:CustomFile[]){
    files.length ?
    ((attachRef.url=files[0].url) && (attachRef.name=files[0].name) ) :
    (attachRef.url='') && (attachRef.name='' )

  }


   addNewChild(){

    this.isBtnLoading=true;
    // this.imageResult1.map(er=>{
    //     er.comment = this.registerWithoutIdentityForm.value.note
    //     er.titel= {
    //       en: 'Not Identity Image',
    //       ar: 'صورة اثبات عدم وجود هوية'
    //     }
    // })

    // this.imageResult3.map(er=>{
    //   er.comment = this.registerWithoutIdentityForm.value.note2
    //   er.titel={
    //     en: 'birth certificate',
    //     ar: 'صورة اثبات تاريخ الميلاد'
    //   }
    // })

    // this.imageResult4.map(er=>{
    //   er.comment = this.registerWithoutIdentityForm.value.note3
    //   er.titel={
    //     en: 'Passport Image',
    //     ar: 'ًصورة جواز السفر'
    //   }
    // })

    let attachments=[this.birthDateAttach, this.personalPhoto, this.noIdentityCauseAttach, this.passportAttach].filter(el=> el.url)

    let data = {
      ...this.registerWithoutIdentityForm.value,
      imagePath: this.personalPhoto?.url,
      childAttachments : attachments
    }
    console.log(data);


    this.addChildService.postChildWithoudIdentity(data)
    .pipe(
      map(res=>{
        if(res.statusCode!=HttpStatusCodeEnum.OK || res.statusCode!=HttpStatusCodeEnum.OK){
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
            throw  new Error(this.translate.instant('toasterMessage.childAlreadyRegisted',{value: getLocalizedValue(res.name)}))
            // throw  new Error(`الأبن "${getLocalizedValue(res.name || data?.name)}" مسجل لديك بالفعل`)

          }

        }else{
          return res
        }
    }))
    .subscribe(res=>{

      this.isBtnLoading=false;
      this.toastr.success(this.translate.instant("dashboard.parents.child saved successfully"));

      // this.router.navigate(['/']);

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
