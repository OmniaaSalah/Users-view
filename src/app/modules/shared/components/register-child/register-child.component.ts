import { AfterViewInit, Component, ElementRef, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { finalize, map, Observable, Subject } from 'rxjs';
import {  Mode } from 'src/app/core/models/global/global.model';
import { Student } from 'src/app/core/models/student/student.model';
import { ClaimsService } from 'src/app/core/services/claims.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { ClaimsEnum } from 'src/app/shared/enums/claims/claims.enum';
import { FileTypeEnum } from 'src/app/shared/enums/file/file.enum';
import { RegistrationStatus, StatusEnum } from 'src/app/shared/enums/status/status.enum';
import { UserScope } from 'src/app/shared/enums/user/user.enum';
import { StudentsService } from '../../../students/services/students/students.service';
import { RegisterChildService } from '../../services/register-child/register-child.service';
import { HttpStatusCodeEnum } from 'src/app/shared/enums/http-status-code/http-status-code.enum';
import { MediaService } from 'src/app/shared/services/media/media.service';

@Component({
  selector: 'app-register-child',
  templateUrl: './register-child.component.html',
  styleUrls: ['./register-child.component.scss']
})
export class RegisterChildComponent implements OnInit, AfterViewInit,OnDestroy {

  display:boolean = false;
  ngDestroy$ = new Subject()
  scope = this.userService.getScope()
  get scopeEnum() { return UserScope }
  get statusEnum() {return StatusEnum}
  lang =inject(TranslationService).lang;

  @ViewChild('nav') nav: ElementRef

  get userScope() { return UserScope }
  currentUserScope = inject(UserService).getScope();
  get claimsEnum(){ return ClaimsEnum }
  get registrationStatusEnum() {return RegistrationStatus}
  get fileTypesEnum () {return FileTypeEnum}

  currStep = +this.route.snapshot.queryParamMap.get('step')

  studentId = this.route.snapshot.paramMap.get('id')
  childId = this.route.snapshot.paramMap.get('childId')
  schoolId

 viewStudentInfo:boolean = this.claimsService.isUserAllowedTo([ClaimsEnum.SEG_R_StudentInfo, ClaimsEnum.SEG_R_StudentAcceptanceInfo,ClaimsEnum.SEG_R_StudentBehavior])


  step
  navListLength=1
	hideNavControl:boolean= true;


  // << DATA PLACEHOLDER >> //


  student$: Observable<Student> = this.childService.Student$
  currentStudent:Student


    // << FORMS >> //
    onSubmit =false

    get localizeFormGroup(){
      return this.fb.group({ id:[], name:this.fb.group({ar:['a'], en: ['a']})})
    }


    studentForm= this.fb.group({
      name: this.fb.group({
        ar:[''],
        en:['']
      }),
      surname: this.fb.group({
        ar:[''],
        en:['']
      }),
      birthDate:[''],
      gender:[''],
      nationalityId:[0 ],
      religionId:[1, ],
      isTalented: [''],
      isGifted: [''],

      reasonForNotHavingEmiratesId:[null],
      // passportId:[],
      // passportIdExpirationDate:[],
      hasShadower:[],
      // id:[''],
      daleelId: [''],
      studentNumber:[''],
      ministerialId:[''],
      manhalNumber:[''],

      isSpecialAbilities:[],
      isSpecialClass:[],
      isInFusionClass:[],
      isSpecialEducation:['',],
      specialEducation: this.localizeFormGroup,

      isChildOfAMartyr:[''],
      isHasInternet:["",],
      isHasPhone:["",],
      transportationType:["",],
      studentBehavior: this.fb.group({
        id: 0,
        descrition: []
      }),
      nationalityCategory: this.localizeFormGroup,
      motherLanguage: this.localizeFormGroup,
      languageAtHome: this.localizeFormGroup,
      mostUsedLanguage: this.localizeFormGroup,
      guardianId:[''],
      studentPayments: this.fb.group({
        fullAmountToBePaid: [],
        paidAmount: [],
        remainingAmount: [],
        accountantComment:  ['تعليق المحاسب '],
      }),
      prohibited: this.fb.group({
        id: [0],
        rCertificateFromSPEA : [false],
        certificateFromSchool :[false],
        withdrawingFromSPEA :[false],
        withdrawingFromSchool : [false],
      }),
      address: this.fb.group({
        id: [0],
        city: [''],
        emirate: [''],
        state: ['']
      }),
      studentTalent:[[]],
      attendanceMode:[],
      reEnrollmentStatus:[],
      dateOfAcceptance:[],
      studentReEnrollmentId:[],
      parsonalImagePath:[],
      relativeRelationId:[]
    })



  currentMode :Mode='view'
  paymentCurrentMode :Mode='view'
  stdBehaviorMode : Mode= 'view'

  constructor(
    private fb:FormBuilder,
    private translate:TranslateService,
    private studentsService: StudentsService,
    private route: ActivatedRoute,
    public childService:RegisterChildService,
    private toastr: ToastrService,
    private userService:UserService,
    private router:Router,
    private mediaService:MediaService,
    private claimsService:ClaimsService) { }


  ngOnInit(): void {


    if(this.viewStudentInfo){
          if(this.childId) this.getStudent(this.childId)
          else this.getStudent(this.studentId)
    }

  }



  ngAfterViewInit() {
    setTimeout(()=> this.setActiveTab((this.currStep) || 0))

	}

  getStudent(studentId){

    this.childService.Student$.next(null)
    this.studentsService.getStudent(studentId)
    .pipe(map(res=>{
      if(res.statusCode==HttpStatusCodeEnum.Unauthorized){
        this.router.navigate(['/oops/page-not-allowed'])
      }

      return res

    }))
    .subscribe((res:any) =>{
      this.childService.Student$.next(res?.result)    // for Sharing between multiple components instead of make multiple Http Requests
      this.schoolId = res.result.school?.id

      res.result.birthDate = new Date(res?.result?.birthDate)
      res.result.dateOfAcceptance = new Date(res?.result?.dateOfAcceptance)
      // res.result.passportIdExpirationDate = new Date(res.result?.passportIdExpirationDate)
      this.currentStudent = res?.result
      this.initStudentForm(res?.result)

    });

  }

  initStudentForm(res){
    this.studentForm.patchValue(res as any)
    this.studentForm.controls.prohibited.patchValue(res.studentProhibited)
    this.studentForm.controls.nationalityId.setValue(res?.nationality?.id)
    this.studentForm.controls.relativeRelationId.setValue(res?.relativeRelation?.id)
    this.studentForm.controls.studentTalent.setValue(res?.studentTalents?.map(el => el?.talentId))
    this.studentForm.controls.religionId.setValue(res.religion?.id)
    // this.studentForm.controls.reasonForNotHavingEmiratesId.setValue(null)
    this.studentForm.controls.specialEducation.patchValue({name:{ar:"",en:''}})
    this.studentForm.controls.studentReEnrollmentId.patchValue(res?.reEnrollmentType?.id)

  }

  updateStudent(){
    this.childService.loading$.next(true)
    this.studentsService.updateStudent(this.studentId || this.childId,this.studentForm.value)
    .pipe(finalize(()=> {
      this.childService.loading$.next(false)
      this.currentMode='view'
      this.paymentCurrentMode='view'
      this.stdBehaviorMode='view'
    }))
    .subscribe(res=>{
      this.toastr.success(this.translate.instant('toasterMessage.successUpdate'))
      this.getStudent(this.studentId || this.childId)



    },err =>{this.toastr.error(this.translate.instant('toasterMessage.error'))})
  }

	steps=[
		{
			title: this.translate.instant('dashboard.parents.personalInfo'),
			index:0,
			claims:[this.claimsEnum.SEG_R_StudentInfo],
			isActive:true
		},
		{
			title: this.translate.instant('dashboard.parents.acceptanceInfo'),
			index:1,
			claims:[this.claimsEnum.SEG_R_StudentAcceptanceInfo],
			isActive:false
		},
		{
			title: this.translate.instant('dashboard.parents.attendanceAndAbsence'),
			index:2,
			claims:[this.claimsEnum.SEG_R_StudentAbsenceAndAttendance],
			isActive:false
		},
		{
			title: this.translate.instant('dashboard.students.studentAttachedment'),
			index:3,
			claims:[this.claimsEnum.SEG_R_StudentAttachments],
			isActive:false
		},
		{
			title: this.translate.instant('dashboard.parents.certificateList'),
			index:4,
			claims:[this.claimsEnum.SEG_R_StudentCertificates],
			isActive:false
		},
		{
			title: this.translate.instant('dashboard.students.studentBehavior'),
			index:5,
			claims:[this.claimsEnum.SEG_R_StudentBehavior],
			isActive:false
		},
		{
			title: this.translate.instant('dashboard.students.medicalFile'),
			index:6,
			claims:[this.claimsEnum.SEG_R_StudentMedicalFile],
			isActive:false
		},
		{
			title: this.translate.instant('dashboard.parents.subjectsAndDegrees'),
			index:7,
			claims:[this.claimsEnum.SEG_R_StudentSubjectsAndDegrees],
			isActive:false
		},
		{
			title: this.translate.instant('dashboard.parents.studentRecord'),
			index:8,
			claims:[this.claimsEnum.SEG_R_StudentRecord],
			isActive:false
		},
    {
			title: this.translate.instant('dashboard.parents.editableList'),
			index:9,
			claims:[], //this.claimsEnum.SEG_R_StudentEditList
			isActive:false
		}

	]


	// // Set Default Active Tab In Case Any tab Element Removed From The Dom For permissions Purpose
	// setActiveTab(nodeIndex?){
	// 	let navItemsList =this.nav.nativeElement.children

	// 	if(navItemsList.length){
	// 		navItemsList[nodeIndex]?.classList.add('active')
	// 		this.navListLength = navItemsList.length
  //     if(navItemsList[nodeIndex]?.dataset.step) this.step = navItemsList[nodeIndex]?.dataset.step
  //     else this.step = 1
	// 	}
	// }

	// Set Default Active Tab In Case Any tab Element Removed From The Dom For permissions Purpose
	setActiveTab(stepIndex=0){
		this.steps.forEach(el=>el.isActive=false)

		let allowedSteps = this.steps.filter(el => this.claimsService.isUserAllowedTo(el.claims))
		this.navListLength = allowedSteps.length

		let el =this.steps.find(el => (el.index==stepIndex && this.claimsService.isUserAllowedTo(el.claims)))

		if(el) {
			el.isActive =true
			this.step=el.index
		}else{
			allowedSteps[0].isActive =true
			this.step = allowedSteps[0].index
		}

	}

	scrollLeft(el :ElementRef){
    let stepLength = this.lang =='ar' ? (this.nav.nativeElement.scrollLeft - 175) : (this.nav.nativeElement.scrollLeft + 175)

		this.nav.nativeElement.scrollTo({left: stepLength, behavior:'smooth'})
		this.hideNavControl = false;
	}

	scrollRight(el :ElementRef){
    let stepLength = this.lang =='ar' ?(this.nav.nativeElement.scrollLeft + 175) : (this.nav.nativeElement.scrollLeft - 175)

		this.nav.nativeElement.scrollTo({left:stepLength, behavior:'smooth'})
		if(this.nav.nativeElement.scrollLeft === 0) this.hideNavControl = true;

	}

  ngOnDestroy(): void {
    this.ngDestroy$.next(null)
    this.ngDestroy$.complete()
    this.childService.onEditMode$.next(false)
  }

  showDialog() {
      this.display = true;
    }

    closeDialog(){
      this.display = false;
      // this.router.navigate(['/messages/messages'])
    }


    uploading=false

    uploadProfileImage(event){
      let file = event.target.files[0]
      const FORM_DATA = new FormData()
      FORM_DATA.append('file', file)

      this.uploading = true

      this.mediaService.uploadMedia(FORM_DATA).subscribe(res=>{

        this.studentForm.controls['parsonalImagePath'].setValue(res.url)
        this.toastr.success(this.translate.instant('toasterMessage.imageUploaded'))
        this.updateStudent()
        this.currentStudent.parsonalImagePath = res?.url
        this.childService.Student$.next(this.currentStudent)

        this.uploading = false
      },()=>{
        this.toastr.error(this.translate.instant('toasterMessage.error'))
        this.uploading = false
      })


    }
}
