import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { map, share } from 'rxjs';
import { getLocalizedValue } from 'src/app/core/classes/helpers';
import { IunregisterChild } from 'src/app/core/Models/IunregisterChild';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { CustomFile } from 'src/app/shared/components/file-upload/file-upload.component';
import { ClaimsEnum } from 'src/app/shared/enums/claims/claims.enum';
import { IndexesEnum } from 'src/app/shared/enums/indexes/indexes.enum';
import { RegistrationStatus } from 'src/app/shared/enums/status/status.enum';
import { UserScope } from 'src/app/shared/enums/user/user.enum';
import { ConfirmModelService } from 'src/app/shared/services/confirm-model/confirm-model.service';
import { CountriesService } from 'src/app/shared/services/countries/countries.service';
import { MediaService } from 'src/app/shared/services/media/media.service';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { IndexesService } from '../../../indexes/service/indexes.service';
// import { IunregisterChild } from '../../models/IunregisterChild';
import { ParentService } from '../../services/parent.service';

@Component({
  selector: 'app-unregister-child',
  templateUrl: './unregister-child.component.html',
  styleUrls: ['./unregister-child.component.scss']
})
export class UnregisterChildComponent implements OnInit {
  lang = inject(TranslationService).lang
  currentUserScope = inject(UserService).getCurrentUserScope()
  get userScope() { return UserScope }
  get claimsEnum () {return ClaimsEnum}

  child : IunregisterChild;
  childId = +this._route.snapshot.paramMap.get('childId');

  genderOptions=this.sharedService.genderOptions

  countries$ = this.countriesService.getCountries()
  relativeRelation$ =this.sharedService.getParentRelative()
  religion$ =this.sharedService.getReligion()
  NoIdentityReason$ =this.indexService.getIndext(IndexesEnum.TheReasonForLackOfIdentification)

  editMode=false
  AttachmentEditMode=false
  step=1

  student

  showErrMess = false
  onSubmit=false

  childForm = this.fb.group({
    id:[this.childId],
    name: this.fb.group({ ar: ['', Validators.required], en:['', Validators.required] }),
    surname: this.fb.group({ ar: ['', Validators.required], en:['', Validators.required] }),
    gender:[''],
    relativeRelationId:[],
    // relativeRelation: this.fb.group({
    //   id: ['', Validators.required],
    //   arabicName:['', Validators.required],
    //   englishName: ['', Validators.required]
    // }),
    passportNumber: [''],
    emiratesIdNumber: [''],
    reasonForNotHavingEmiratesId:[],
    religionId:[],
    emiratesIdPath:[''],
    birthDate: [new Date(), Validators.required],
    nationlityId: ['', Validators.required],
    imagePath: [''],
    guardianId: ['', Validators.required],
    childAttachments:this.fb.array([])
  })


  get attachmentsList() {return this.childForm.controls['childAttachments'] as FormArray}

  attch=[
    {
      titel:{ar:"هويه الطالب ", en:"Identity"},
      url:"dsfdfd",
      name: "ahmed.png",
      comment:'وريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت'
    },
    {
      titel:{ar:"ملف القيد ", en:"Identity"},
      url:"dsfsdfsd",
      name: "ahmed.png",
      comment:'وريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت'
    },
    {
      titel:{ar:"ملف اثبات الحاله", en:"Identity"},
      url:"",
      name: "",
    }
  ]


  filesTypesOptions = [...this.sharedService.fileTypesOptions]
  addMode=false
  gurdiansAttachmentsTypes$=this.indexsService.getIndext(IndexesEnum.TheTypeOfFileAttachmentForTheParent)

  get getDialogData() { return {img: this.child?.imagePath || 'assets/images/shared/image.svg',message:`هل أنت متأكد أنك تريد حذف "${getLocalizedValue(this.child?.name)}” من قائمة أبنائك؟`}}


  fileForm= this.fb.group({
    indexId:['', Validators.required],
    titel: this.fb.group({
      ar:[, Validators.required],
      en:[, Validators.required]
    }),
    fileType:[]
  })

  constructor(
    private parentService : ParentService,
    private countriesService:CountriesService,
    private fb :FormBuilder,
     private _route: ActivatedRoute,
     private router: Router,
     private sharedService: SharedService,
     public confirmModelService:ConfirmModelService,
     private indexService:IndexesService,
     private toastr:ToastrService,
     private translate:TranslateService,
     private indexsService:IndexesService,
     private mediaService:MediaService) { }

  ngOnInit(): void {
    this.getUnregisterChild();
  }



  getUnregisterChild(){
    this.child = null

    this.parentService.getChild(this.childId).subscribe(response=>{
      this.child = response;
      this.childForm.patchValue({...response})
      this.childForm.controls['birthDate'].patchValue(new Date(response.birthDate))
      this.childForm.controls.nationlityId.setValue(response.nationlity.id)
      this.childForm.controls.relativeRelationId.setValue(response.relativeRelation?.id)
      this.childForm.controls.reasonForNotHavingEmiratesId.setValue(response.reasonForNotHavingEmirates?.id)
      this.fillAttachments(response.childAttachments)

      // this.setNationality(response.nationlityId)
      // this.setRelativeRelation(response.relativeRelationId)

    })
  }

  setNationality(nationlityId) {
    this.countries$.subscribe(res=> this.child.nationality= res.filter(el => el.id==nationlityId)[0])
  }

  setRelativeRelation(relativeRelationId){
    this.relativeRelation$.subscribe(res=> this.child.relativeRelation= res.filter(el => el.id==relativeRelationId)[0])
  }

  updateChild(childData){
    this.onSubmit =true
    this.parentService.updateChild(this.childId, childData).subscribe(res=>{
      this.toastr.success(this.translate.instant('toasterMessage.successUpdate'))
      this.getUnregisterChild()
      this.onSubmit=false
      this.editMode=false
      this.AttachmentEditMode=false
    },()=>{
      this.onSubmit=false
      this.AttachmentEditMode=false
      this.toastr.error(this.translate.instant('toasterMessage.error'))
    })
  }

  attachmentGroup(item){
    return this.fb.group({
      indexId:[item.indexId??null],
      url:[item.url?? ''],
      titel: this.fb.group({
        ar:[item.title.ar?? ''],
        en:[item.title.en?? '']
      }),
      name:[item.name?? ''],
      comment:[item.comment?? '']
    })
  }

  fillAttachments(list){
    this.attachmentsList.clear()
    list.forEach(el =>{
      this.attachmentsList.push(this.attachmentGroup(el))
    })
  }

  addnewAttachmentTo(attachment:CustomFile[], index){

    let attach = attachment[0]? attachment[0] : {url:"", name:"",comment:""}

    this.attachmentsList.at(index).patchValue({...attach})
  }


  addNewFileUpload(){

    let index = this.attachmentsList.value.findIndex(el => el?.indexId === this.fileForm.value.indexId)
    if(index > -1) this.attachmentsList.value.splice(index, 1)

    this.attachmentsList.push(this.attachmentGroup({url: '', name: '', titel:this.fileForm.value.titel, comment:'', indexId:this.fileForm.value.indexId}))
    // this.attachments.unshift({url: '', name: '', titel:this.fileForm.value.titel, comment:''})
    this.addMode=false
    this.showErrMess =false
    this.fileForm.reset()
  }


  resetAttachment(index){
    let resetVal = {name:'', url:'', comment:''}
    this.attachmentsList.at(index).patchValue({...this.attachmentsList.at(index).value,...resetVal})
  }


  fileTypeChanged(indexId){
    let isExist= this.attachmentsList.value.findIndex(el => el?.indexId === indexId) > -1 ? true : false

    if(isExist) this.showErrMess=true
    else this.showErrMess =false
  }



// NOTE :---------------- Delete Child --------------------------
  // openDeleteModel(){
  //   this.confirmModelService.openModel()
  //   this.confirmDeleteListner()
  // }

  // confirmDeleteListner(){
  //   this.confirmModelService.confirmed$.subscribe(val=>{
  //     if(val) this.deleteChild()
  //   })
  // }

  deleteChild(){
    this.parentService.deleteChild(this.child.id).subscribe(res=>{
      this.toastr.success(this.translate.instant('toasterMessage.deletedSuccessfully'))
      this.router.navigate(['/'], {relativeTo:this._route})
    },()=>{
      this.toastr.error(this.translate.instant('toasterMessage.error'))
      this.router.navigate(['/'], {relativeTo:this._route})
      // this.toastr.error(this.translate.instant('toasterMessage.error'))
    })
  }

  navigateToRequestPage(){
    if (this.currentUserScope==this.userScope.Guardian) this.router.navigate([`/parent/child/${this.childId}/register-request`],{queryParams:{status:RegistrationStatus.Unregistered}})
    else this.router.navigate(['register'], {relativeTo:this._route,queryParams:{status:RegistrationStatus.Unregistered}})

  }

  uploading=false

  uploadProfileImage(event){
    let file = event.target.files[0]
    const FORM_DATA = new FormData()
    FORM_DATA.append('file', file)

    this.uploading = true

    this.mediaService.uploadMedia(FORM_DATA).subscribe(res=>{

      this.childForm.controls['imagePath'].setValue(res.url)
      this.toastr.success(this.translate.instant('toasterMessage.imageUploaded'))
      this.updateChild(this.childForm.value)
      this.child.imagePath= res.url
      this.uploading = false
    },()=>{
      this.toastr.error(this.translate.instant('toasterMessage.error'))
      this.uploading = false
    })


  }

}
