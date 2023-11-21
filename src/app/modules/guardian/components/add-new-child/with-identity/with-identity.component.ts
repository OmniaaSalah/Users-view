import { EMPTY, isEmpty, map, of, Subject, Subscription, switchMap, takeUntil } from 'rxjs';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IHeader } from 'src/app/core/Models';
import { IunregisterChild } from 'src/app/core/Models/IunregisterChild';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { ParentService } from 'src/app/modules/parants/services/parent.service';
import { AddChildService } from '../../../services/add-child.service';
import { ConfirmModelService } from 'src/app/shared/services/confirm-model/confirm-model.service';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { ToastrService } from 'ngx-toastr';
import { FileTypeEnum } from 'src/app/shared/enums/file/file.enum';
import { CustomFile } from 'src/app/shared/components/file-upload/file-upload.component';
import { HttpStatusCodeEnum } from 'src/app/shared/enums/http-status-code/http-status-code.enum';
import { UserService } from 'src/app/core/services/user/user.service';
import { getLocalizedValue } from 'src/app/core/helpers/helpers';

@Component({
  selector: 'app-with-identity',
  templateUrl: './with-identity.component.html',
  styleUrls: ['./with-identity.component.scss']
})

export class WithIdentityComponent implements OnInit {
  ngDestroy$ =new Subject()

  lang =inject(TranslationService).lang
  get fileTypesEnum () {return FileTypeEnum}

  currentGuardianId = this.userService.getCurrentGuardian().id

  identityAttach={
    url: "",
    titel: {
      en: 'Identity Image',
      ar: 'صورة الهوية'
    },
    name: "",
    comment: "",
  }


  birthDate={
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
    console.log(attachRef, files);

    // files.length ? attachRef={...attachRef, ...files[0]} : attachRef={...attachRef, name:'',url:''}
    files.length ?
    ((attachRef.url=files[0].url) && (attachRef.name=files[0].name) ) :
    (attachRef.url='') && (attachRef.name='' )

  }


  onSubmit=false

  newChildForm: FormGroup = this.fb.group({
    emiratesId:[ null,[Validators.required, Validators.pattern('(784)[0-9]{12}')]],
    RelativeRelationId:['',Validators.required],
  })

  get IdentityNumCtr(){return this.newChildForm.controls['emiratesId']}


  relativeityTypes$ = this.shredService.getParentRelative()

  minimumDate = new Date();

  componentHeaderData: IHeader = {
    breadCrump: [
      {
        label: this.translate.instant(
          'parentHome.newStudent'
        ),
        routerLink: '/parent/AddChild/Addchild-WithNationality',
        routerLinkActiveOptions: { exact: true },
      },
    ],
    mainTitle: {
      main: this.translate.instant('parentHome.newStudent'),
    },
  };

  constructor(private fb:FormBuilder,
    private addChildService:AddChildService,
    private userService:UserService,
    private translate: TranslateService,private headerService: HeaderService,
    private shredService:SharedService,
    public confirmModelService: ConfirmModelService,
    private router:Router,
    private toastr:ToastrService) { }

  ngOnInit(): void {
    this.headerService.changeHeaderdata(this.componentHeaderData);
    this.onModelClose()
  }


  childToRelinkWithNewGuardian

  addNewChild(){
    this.onSubmit=true

    let data={
      ...this.newChildForm.value,
      imagePhath:this.personalPhoto?.url
    }
    let attachments=[this.birthDate, this.personalPhoto, this.identityAttach]

    this.addChildService.addChildWithIdentity(data,attachments)
    .pipe(
      switchMap(res=>{


        if(res.statusCode!=HttpStatusCodeEnum.OK){

          if(res.statusCode==HttpStatusCodeEnum.NotAcceptable){

            this.confirmModelService.openModel({message: this.translate.instant('toasterMessage.childExistForAnotherGaurdian')})
            this.confirmModelLister()
            this.onSubmit=false;
            this.childToRelinkWithNewGuardian={
                  studentId: res.studentId,
                  childId: res.childId,
                  guardianId: this.currentGuardianId,
                  studentStatus: res.studentStatus
            };
            return EMPTY

          }else if(res.statusCode==HttpStatusCodeEnum.BadRequest){
            throw  new Error(this.translate.instant(getLocalizedValue(res?.errorMessage)))

          }else{

            throw  new Error(this.translate.instant('toasterMessage.childAlreadyRegisted',{value: res?.name[this.lang] || ''}))
            // throw  new Error(`الأبن "${getLocalizedValue(res.name || data?.name)}" مسجل لديك بالفعل`)

          }

        }else{

          return of(res)
        }
    }) )
    .subscribe({
      next: (res)=>{

      this.onSubmit=false;
      this.toastr.success(this.translate.instant("parents.child saved successfully"));

      this.router.navigate(['/'])
      },
      error: (err:Error)=>{
        this.onSubmit=false;
        this.toastr.error(err.message || this.translate.instant('toasterMessage.error'));
      }

    },)

   }




   sendRelinkChildReq(){

    this.onSubmit=true;
    this.addChildService.sendRelinkChildReq(this.childToRelinkWithNewGuardian).subscribe(res=>{

      this.toastr.success(this.translate.instant('toasterMessage.requestSendSuccessfully'))
      this.onSubmit=false;
      this.router.navigate(['/']);

    },(err:Error)=>{
      this.onSubmit=false;
      this.toastr.error(this.translate.instant("toasterMessage.error"));

    })
   }


   confirmModelLister(){
    this.confirmModelService.confirmed$
    .pipe(takeUntil(this.ngDestroy$))
    .subscribe(res=>{
      if(res){
        this.sendRelinkChildReq()
      }
    })

   }
 onModelClose(){

  this.confirmModelService.onClose$
  .pipe(takeUntil(this.ngDestroy$))
  .subscribe(val =>{
    console.log(val);

    if(val) {
      this.confirmModelService.confirmed$.next(false)
      this.ngDestroy$.next(null)
      this.ngDestroy$.complete()
    }
  })
 }

  ngOnDestroy(): void {
    this.ngDestroy$.next(null)
    this.ngDestroy$.complete()
    this.confirmModelService.confirmed$.next(null);
    this.confirmModelService.closeModel();
  }

}
