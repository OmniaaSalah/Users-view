import { AfterViewInit, Component, ElementRef, EventEmitter, inject, Input, OnDestroy, OnInit, Output, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, filter, finalize, first, last, map, Observable, share, Subject, takeUntil, throwError } from 'rxjs';
import { MenuItem } from 'src/app/core/models/dropdown/menu-item';
import { Division, Mode, OptionalSubjects, Track } from 'src/app/core/models/global/global.model';
import { RequestRule } from 'src/app/core/models/settings/settings.model';
import { Student } from 'src/app/core/models/student/student.model';
import { ClaimsService } from 'src/app/core/services/claims.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { ClaimsEnum } from 'src/app/shared/enums/claims/claims.enum';
import { FileEnum } from 'src/app/shared/enums/file/file.enum';
import { IndexesEnum } from 'src/app/shared/enums/indexes/indexes.enum';
import { RegistrationStatus, StatusEnum } from 'src/app/shared/enums/status/status.enum';
import { requestTypeEnum } from 'src/app/shared/enums/system-requests/requests.enum';
import { UserScope } from 'src/app/shared/enums/user/user.enum';
import { CountriesService } from 'src/app/shared/services/countries/countries.service';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { IndexesService } from '../../../indexes/service/indexes.service';
import { ParentService } from '../../../parants/services/parent.service';
import { DivisionService } from '../../../schools/services/division/division.service';
import { GradesService } from '../../../schools/services/grade/grade.service';
import { SchoolsService } from '../../../schools/services/schools/schools.service';
import { StudentsService } from '../../../students/services/students/students.service';
import { SettingsService } from '../../../system-setting/services/settings/settings.service';
import { RegisterChildService } from '../../services/register-child/register-child.service';

@Component({
  selector: 'app-register-child',
  templateUrl: './register-child.component.html',
  styleUrls: ['./register-child.component.scss']
})
export class RegisterChildComponent implements OnInit, AfterViewInit,OnDestroy {

  display:boolean = false;
  ngDestroy$ = new Subject()
  scope = this.userService.getCurrentUserScope()
  get scopeEnum() { return UserScope }
  get statusEnum() {return StatusEnum}
  lang =inject(TranslationService).lang;
  mode : Mode= 'view'
  @ViewChild('nav') nav: ElementRef

  get userScope() { return UserScope }
  currentUserScope = inject(UserService).getCurrentUserScope();
  get claimsEnum(){ return ClaimsEnum }
  get registrationStatusEnum() {return RegistrationStatus}
  get fileTypesEnum () {return FileEnum}

  studentId = +this.route.snapshot.paramMap.get('id')
  childId = +this.route.snapshot.paramMap.get('childId')
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
        ar:['', Validators.required],
        en:['', Validators.required]
      }),
      surname: this.fb.group({
        ar:['', Validators.required],
        en:['', Validators.required]
      }),
      birthDate:['', Validators.required],
      gender:['', Validators.required],
      nationalityId:[0 , Validators.required],
      religionId:[1, Validators.required],
      isTalented: [''],

      reasonForNotHavingEmiratesId:[null],
      passportId:[],
      passportIdExpirationDate:[],
      hasShadower:[],
      // id:['', Validators.required],
      daleelId: ['', Validators.required],
      studentNumber:['', Validators.required],
      ministerialId:['', Validators.required],
      manhalNumber:['', Validators.required],

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
      guardianId:['', Validators.required],
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
      studentTalent:[[]]
    })




  currentMode :Mode='view'
  paymentCurrentMode :Mode='view'

  constructor(
    private fb:FormBuilder,
    private translate:TranslateService,
    private studentsService: StudentsService,
    private countriesService: CountriesService,
    private route: ActivatedRoute,
    public childService:RegisterChildService,
    private sharedService: SharedService,
    private toastr: ToastrService,
    private userService:UserService,
    private claimsService:ClaimsService,
    private router:Router) { }


  ngOnInit(): void {


    if(this.viewStudentInfo){
          if(this.childId) this.getStudent(this.childId)
          else this.getStudent(this.studentId)
    }

  }



  ngAfterViewInit() {
    setTimeout(()=> this.setActiveTab(0))

	}



  getStudent(studentId){

    this.childService.Student$.next(null)
    this.studentsService.getStudent(studentId).subscribe((res) =>{

      this.childService.Student$.next(res?.result)    // for Sharing between multiple components instead of make multiple Http Requests
      this.schoolId = res.result.school?.id

      res.result.birthDate = new Date(res?.result?.birthDate)
      res.result.passportIdExpirationDate = new Date(res.result?.passportIdExpirationDate)
      this.currentStudent = res?.result
      this.studentForm.patchValue(res?.result as any)
      this.studentForm.controls.prohibited.patchValue(res.result?.studentProhibited)
      this.studentForm.controls.nationalityId.setValue(res.result?.nationality?.id)
      this.studentForm.controls.reasonForNotHavingEmiratesId.setValue(null)
      this.studentForm.controls.specialEducation.patchValue({name:{ar:"",en:''}})



    });

  }


  updateStudent(){
    this.childService.loading$.next(true)
    this.studentsService.updateStudent(this.studentId || this.childId,this.studentForm.value)
    .pipe(finalize(()=> {
      this.childService.loading$.next(false)
      this.currentMode='view'
      this.paymentCurrentMode='view'
    }))
    .subscribe(res=>{
      this.toastr.success(this.translate.instant('toasterMessage.successUpdate'))
      this.getStudent(this.studentId)



    },err =>{this.toastr.error(this.translate.instant('toasterMessage.error'))})
  }



	// Set Default Active Tab In Case Any tab Element Removed From The Dom For permissions Purpose
	setActiveTab(nodeIndex?){
		let navItemsList =this.nav.nativeElement.children

		if(nodeIndex == 0 && navItemsList.length){
			navItemsList[nodeIndex]?.classList.add('active')
			this.navListLength = navItemsList.length
      if(navItemsList[0]?.dataset.step) this.step = navItemsList[0]?.dataset.step
      else this.step = 1
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
      this.router.navigate(['/dashboard/messages/messages'])
    }

}
