import { AfterViewInit, Component, ElementRef, EventEmitter, inject, Input, OnDestroy, OnInit, Output, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { filter, finalize, map, Observable, share, throwError } from 'rxjs';
import { MenuItem } from 'src/app/core/models/dropdown/menu-item';
import { Division, OptionalSubjects, Track } from 'src/app/core/models/global/global.model';
import { Student } from 'src/app/core/models/student/student.model';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { ClaimsEnum } from 'src/app/shared/enums/claims/claims.enum';
import { StatusEnum } from 'src/app/shared/enums/status/status.enum';
import { UserScope } from 'src/app/shared/enums/user/user.enum';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { DivisionService } from '../../../schools/services/division/division.service';
import { GradesService } from '../../../schools/services/grade/grade.service';
import { SchoolsService } from '../../../schools/services/schools/schools.service';
import { StudentsService } from '../../../students/services/students/students.service';
import { RegisterChildService } from '../../services/register-child/register-child.service';

@Component({
  selector: 'app-register-child',
  templateUrl: './register-child.component.html',
  styleUrls: ['./register-child.component.scss']
})
export class RegisterChildComponent implements OnInit, AfterViewInit,OnDestroy {
  schoolId ;
  display:boolean = false;
  scope = this.userService.getCurrentUserScope()
  get scopeEnum() { return UserScope }

  lang =inject(TranslationService).lang;
  @Input('mode') mode : 'edit'| 'view'= 'view'
  @ViewChild('nav') nav: ElementRef
  get userScope() { return UserScope }
  currentUserScope = inject(UserService).getCurrentUserScope();
  get claimsEnum(){ return ClaimsEnum }
  get statusEnum() {return StatusEnum}

  studentId = this.route.snapshot.paramMap.get('id')
  childId = this.route.snapshot.paramMap.get('childId')


  items: MenuItem[]=[
    {label: this.translate.instant('dashboard.students.transferStudentToAnotherSchool'), icon:'assets/images/shared/student.svg',routerLink:`transfer`,claims:"ClaimsEnum.S_TransferStudentToAnotherSchool"},
    {label: this.translate.instant('dashboard.students.sendStudentDeleteRequest'), icon:'assets/images/shared/delete.svg',routerLink:`../../delete-student/${this.studentId}`},
    {label: this.translate.instant('dashboard.students.IssuanceOfACertificate'), icon:'assets/images/shared/certificate.svg',routerLink:'IssuanceOfACertificateComponent',claims:"ClaimsEnum.S_StudentCertificateIssue"},
    {label: this.translate.instant('dashboard.students.sendRepeateStudyPhaseReqest'), icon:'assets/images/shared/file.svg'},
    {label: this.translate.instant('dashboard.students.sendRequestToEditPersonalInfo'), icon:'assets/images/shared/user-badge.svg'},
    {label: this.translate.instant('dashboard.students.sendWithdrawalReq'), icon:'assets/images/shared/list.svg',routerLink:'student/5/transfer',claims:"ClaimsEnum.S_WithdrawingStudentFromCurrentSchool"},
    // {label: this.translate.instant('dashboard.students.editStudentInfo'), icon:'assets/images/shared/list.svg',routerLink:'delete-student/5'},
    // {label: this.translate.instant('dashboard.students.transferStudentFromDivisionToDivision'), icon:'assets/images/shared/recycle.svg',routerLink:'delete-student/5'},
  ];

  step
  navListLength=1
	hideNavControl:boolean= true;


  // << DATA PLACEHOLDER >> //

  // for Sharing between multiple components instead of make multiple Http Requests
  student$: Observable<Student> = this.childService.Student$
  currentStudent:Student



  optionalSubjectsList:OptionalSubjects[]
    // schoolDivisions$ = this.schoolsService.getSchoolDivisions(2).pipe(map(val =>val.data), share())
    currentStudentDivision:Division
    gradeDivisions$ :Observable<Division>
    divisionTracks$ :Observable<Track>

    targetDivision:Division
    isTrackSelected =false

    booleanOptions = this.sharedService.booleanOptions

    changeIdentityModelOpened=false
    RepeateStudyPhaseModelOpend =false
    transferStudentModelOpened=false
    showWithdrawalReqScreen=false
    changeStudentInfoModelOpened=false

    isLoading

    // << FORMS >> //
    onSubmit =false

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
      nationalityId:['', Validators.required],
      religionId:[1, Validators.required],
      isTalented: ['', Validators.required],
      // talents:[[], Validators.required],// missing

      daleelId: ['', Validators.required],//remove
      studentNumber:['', Validators.required],
      ministerialId:['', Validators.required],
      manhalNumber:['', Validators.required],
      isSpecialAbilities:[],//
      isChildOfAMartyr:['',Validators.required],
      isHasInternet:["", Validators.required],
      isHasPhone:["", Validators.required],
      isUsePublicTransportation:["", Validators.required],
      isSpecialEducation:['', Validators.required],//
      studentBehavior: this.fb.group({ //
        id: 0,
        // createdDate: [],
        // createdBy: [],
        // updatedDate: [],
        // updatedBy: [],
        descrition: []
      }),
      nationalityCategory:this.fb.group({ id:[] }),
      specialEducation:this.fb.group({ id:[] }),
      motherLanguage:this.fb.group({ id:[] }),
      languageAtHome:this.fb.group({ id:[] }),
      mostUsedLanguage:this.fb.group({ id:[] }),

      studentPayments: this.fb.group({
        fullAmountToBePaid: [],
        paidAmount: [],
        remainingAmount: [],
        accountantComment:  ['تعليق المحاسب '],
      }),
      prohibited: this.fb.group({
        id: [],
        rCertificateFromSPEA : [null],
        certificateFromSchool : [null],
        withdrawingFromSPEA : [null],
        withdrawingFromSchool : [null],
      }),
      address: this.fb.group({
        id: [''],
        city: [''],
        emirate: [''],
        state: ['']
      }),
      studentTalents:[{
        id: 0,
        talentId: 0,
        // studentId: 0
      }]
      // electiveSubjectId:[[]]
    })




    // Transfer From Division To Division
    transferStudentForm={
      studentId: 14,
      currentDivisionId: null,
      updatedDivisionId: null,
      trackId: '',
      electiveSubjectId: []
    }
    
    changeIdentityForm={
      identityNumber: null,
      identityAttachmentPath:"",
      studentId: this.studentId,
      childId : null
    }

    changeStudentInfoReqForm= this.fb.group({
      name: this.fb.group({
        ar:'',
        en:''
      }),
      surname: this.fb.group({
        ar:'',
        en:''
      }),
      gender:[],
      birthDate:[],
      nationalityId:[],
      religionId:[]
    })

  constructor(
    private fb:FormBuilder,
    private translate:TranslateService,
    private studentsService: StudentsService,
    private schoolsService:SchoolsService,
    private divisionService:DivisionService,
    private gradeService:GradesService,
    private route: ActivatedRoute,
    public childService:RegisterChildService,
    private sharedService: SharedService,
    private toastr: ToastrService,
    private userService:UserService,
    private router:Router) { }

    onEditMode


  ngOnInit(): void {
    this.childService.onEditMode$.subscribe(res=>{
      this.onEditMode = res ? true : false
    })


    this.childService.submitBtnClicked$.subscribe(val =>{
      if(val && this.step!=4  &&  this.step!=7) this.updateStudent(this.studentId)
    })

    if(this.childId)
    {this.getStudent(this.childId)}
    else
    {this.getStudent(this.studentId)}
  }



  ngAfterViewInit() {
		this.setActiveTab(0)
	}


  getStudent(studentId){

    this.childService.Student$.next(null)
console.log(studentId)
    this.studentsService.getStudent(studentId).subscribe((res) =>{
      this.schoolId = res.result.school.id
      res.result.birthDate = new Date(res.result.birthDate)
      this.currentStudent = res.result
      this.childService.Student$.next(res.result)
      this.studentForm.patchValue(res.result as any)
      this.studentForm.controls.prohibited.patchValue(res.result?.studentProhibited)

      this.currentStudentDivision = res.result.division
      this.transferStudentForm.currentDivisionId = res.result.division.id
      this.gradeDivisions$ = this.gradeService.getGradeDivision(res.result.school?.id || 2, 1)
      .pipe(map(res =>{
        return res.data.filter(val=> val.id!=this.currentStudentDivision.id)
        }), share())

    })
  }


  updateStudent(studentId){
    this.studentsService.updateStudent(studentId,this.studentForm.value)
    .pipe(finalize(()=> {
      this.childService.submitBtnClicked$.next(null)
      this.childService.onEditMode$.next(false)
    }))
    .subscribe(res=>{
      this.toastr.success('تم التعديل بنجاح')
      this.getStudent(studentId)



    },err =>{this.toastr.error('التعديل لم يتم يرجى المحاوله مره اخرى')})
  } 


  // Transfer Student To Another Division Logic
  // ==============================================

  onTargetDivisionSelected(division){
    this.targetDivision = division
    if(division.hasTrack) {
      this.divisionTracks$= this.divisionService.getDivisionTracks(division.id)
    }
    else {
      // this.optionalSubjects$ = this.sharedService.getAllOptionalSubjects({schoolId: this.currentStudent.school.id,gradeId:this.currentStudent.grade.id,trackId:""})
      this.getSubjects({schoolId: this.currentStudent.school.id, gradeId:this.currentStudent.grade.id, trackId: ""})

      this.transferStudentForm.trackId =null
    }

    if(division.isAcceptStudent) this.transferStudentForm.updatedDivisionId= division.id
    else this.transferStudentForm.updatedDivisionId= null
  }


  onTrackSelected(trackId){
    this.isTrackSelected =true
    // this.optionalSubjects$ = this.sharedService.getAllOptionalSubjects({schoolId: this.currentStudent.school.id,gradeId:this.currentStudent.grade.id,trackId: trackId})
    this.getSubjects({schoolId: this.currentStudent.school.id, gradeId:this.currentStudent.grade.id, trackId: trackId})


  }

  
  getSubjects(parms){
    this.optionalSubjectsList=null
    this.sharedService.getAllOptionalSubjects(parms).subscribe(res=>{
      this.optionalSubjectsList =res
    })
  }

  // نقل الطالب من شعبه لشعبه
  transferStudent(){
    this.onSubmit =true
    this.divisionService.transferStudentToAnotherDivision(this.transferStudentForm)
    .subscribe((res)=>{
      this.getStudent(this.studentId)
      this.toastr.success('تم نقل الطالب بنجاح')
      this.onSubmit =false
      this.transferStudentModelOpened = false

    },err =>{
      this.onSubmit =false
      this.toastr.success('حدث خطأ يرجى المحاوله مراه اخرى')

    })
  }

// =======================================================


  // ارسال طلب تعديل هويه
  updateIdentity(newIdentityData){
    // {
    //   "identityNumber": "string",
    //   "identityAttachmentPath": "string",
    //   "studentId": 0,
    //   "childId": 0
    // }
    this.studentsService.updateIdentityNum(newIdentityData)
    .pipe(
      map(res => {
        if(res.result) return res
        else throw new Error(res.error)
      })
    ).subscribe(res=> {
      this.changeIdentityModelOpened =false
      this.toastr.success('تم تغير رقم الهويه بنجاح')
    }, err =>{ 
      this.changeIdentityModelOpened =false
      this.toastr.error(err)
    })
  }

  // ==============================================


  // ارسال طلب انسحاب من المدرسه الحاليه
  sendWithdrawalReq(){
    this.isLoading = true
  }


  dropdownItemClicked(index){
    if (index== 3) this.RepeateStudyPhaseModelOpend=true
    if (index== 4) {
      if (this.currentStudent.emiratesId)this.changeStudentInfoModelOpened=true
      else this.changeIdentityModelOpened=true
      
    }
    if (index== 5) this.showWithdrawalReqScreen=true
  }





	// Set Default Active Tab In Case Any tab Element Removed From The Dom For permissions Purpose
	setActiveTab(nodeIndex?){
		let navItemsList =this.nav.nativeElement.children

		if(nodeIndex == 0){
			navItemsList[nodeIndex].classList.add('active')
			this.navListLength = navItemsList.length
      if(navItemsList[0].dataset.step) this.step = navItemsList[0].dataset.step
      else this.step = 1
		}
	}


	scrollLeft(el :ElementRef){
		this.nav.nativeElement.scrollTo({left: this.nav.nativeElement.scrollLeft - 175, behavior:'smooth'})
		this.hideNavControl = false;
	}

	scrollRight(el :ElementRef){
		this.nav.nativeElement.scrollTo({left: this.nav.nativeElement.scrollLeft + 175, behavior:'smooth'})
		if(this.nav.nativeElement.scrollLeft === 0) this.hideNavControl = true;

	}

  ngOnDestroy(): void {
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
