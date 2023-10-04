import { Component, OnDestroy, OnInit, ViewChild ,inject} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {faPlus } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { filter, finalize, map, Observable, of, share, Subject, switchMap, take, takeUntil, tap } from 'rxjs';
import { BaseSearchModel } from 'src/app/core/models/filter-search/base-search-model';
import { paginationInitialState } from 'src/app/core/helpers/pagination';
import { SearchModel } from 'src/app/core/models/filter-search/filter-search.model';

import { IHeader } from 'src/app/core/Models/header-dashboard';
import { Division, GenericResponse, OptionalSubjects, Track } from 'src/app/core/models/global/global.model';
import { Student } from 'src/app/core/models/student/student.model';

import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { TransferType } from 'src/app/shared/enums/school/school.enum';
import { CountriesService } from 'src/app/shared/services/countries/countries.service';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { DivisionService } from '../../../schools/services/division/division.service';
import { GradesService } from '../../../schools/services/grade/grade.service';
import { SchoolsService } from '../../../schools/services/schools/schools.service';
import { StudentsService } from '../../services/students/students.service';
import { ConfirmModelService } from 'src/app/shared/services/confirm-model/confirm-model.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { RegisterChildService } from 'src/app/modules/shared/services/register-child/register-child.service';

type transeferBy = 'parent' | 'commission';


@Component({
  selector: 'app-transfer-student',
  templateUrl: './transfer-student.component.html',
  styleUrls: ['./transfer-student.component.scss']
})
export class TransferStudentComponent implements OnInit, OnDestroy {
  onDestroy$ = new Subject()
  faPlus = faPlus
  @ViewChild('f',{static: false}) form :NgForm

  lang = inject(TranslationService).lang;
  get TransferTypeEnum(){ return TransferType}

  studentGUID = this.route.snapshot.paramMap.get('id')
  studentSchoolId
  isLoading=true

  student:Student


  componentHeaderData: IHeader={
    breadCrump: [
      { label: this.translate.instant('Students List') ,routerLink:'/schools-and-students/students/',routerLinkActiveOptions:{exact: true}},
      {
        label: this.translate.instant('dashboard.students.transferStudent') ,
        routerLink: `/schools-and-students/students/student/${this.studentGUID}/transfer`
      }
    ],
    mainTitle: {
      main: this.translate.instant('dashboard.students.transferStudent')
    }
  }

  filtration :SearchModel = {...BaseSearchModel,curriculumId:null, StateId: null}
  paginationState= {...paginationInitialState}

  schoolGrades$
  gradeDivisions$
  divisionTracks$

  AllDivisions$ =this.sharedService.getAllDivisions()
  AllGrades$ =this.sharedService.getAllGrades('')
  AllTracks$ =this.sharedService.getAllTraks()
  optionalSubjectsList:OptionalSubjects[]

  transferType= [
    {name:this.translate.instant('dashboard.students.insideEmara'), value: TransferType.TransferWithinTheEmirate},
    {name:this.translate.instant('dashboard.students.outSideEmara'), value: TransferType.TransferOutsideTheEmirate},
    {name:this.translate.instant('dashboard.students.outsideCountry'), value: TransferType.TransferOutOfTheCountry},
  ]

  // filter
  curriculums$ = this.sharedService.getAllCurriculum()
  states$ = this.CountriesService.getAllStates()

  schools={
    totalAllData:0,
    total:0,
    list:[],
    loading:true
  }

  transferForm

  isFormValid =false
  submitted=false
  transeferBy: transeferBy

  selectedSchool={ index: null, value: null}

  selectedGrade={id:'', value: false}
  selectedDivision:Division
  availableGradeDivisions=[]
  isTrackSelected:boolean=false


  constructor(
    private translate: TranslateService,
    private headerService: HeaderService,
    private route: ActivatedRoute,
    private router:Router,
    private sharedService: SharedService,
    private studentsService:StudentsService,
    private schoolsService:SchoolsService,
    private CountriesService:CountriesService,
    private toastr: ToastrService,
    private gradeService: GradesService,
    private divisionService: DivisionService,
    private confirm :ConfirmModelService,
    private registerChildService:RegisterChildService
  ) { }


  ngOnInit(): void {

    this.registerChildService.Student$
    .pipe(
      switchMap(res=>{
        if(!res) return this.studentsService.getStudent(this.studentGUID).pipe(map(res => res?.result))
        return of(res)
      }))
    .subscribe((res:Student)=>{
      this.student=res
      this.studentSchoolId= res?.school?.id
      this.componentHeaderData.mainTitle.sub = `(${res.name[this.lang]})`
      this.headerService.changeHeaderdata(this.componentHeaderData)
      this.initForm(res)
      this.isLoading= false
    })

    this.headerService.changeHeaderdata(this.componentHeaderData)
    this.confirmDialogListner()

  }


  initForm(student){
    this.transferForm={
      transferType:null,
      schoolId: null,
      gradeId: null,
      divisionId: null,
      trackId: null,
      studentIds: [student?.id],
      subjects:[]
    }
  }



  onTransferTypeChange(type :TransferType){
    if(type != TransferType.TransferWithinTheEmirate){
      this.selectedSchool.index= null
      this.selectedSchool.value =null
      this.transferForm.schoolId = null
      this.transferForm.gradeId = null
      this.transferForm.divisionId = null
    }
  }


  getSchools(){
    this.schools.loading=true
    this.schools.list=[]

    this.schoolsService.getAllSchools(this.filtration)
    .pipe(map(res => {
      let schoolsList =res.data.filter(val => val.id != this.studentSchoolId)
      return {
        data :schoolsList,
        total: res.total ? res.total -1 : res.total,
        totalAllData: res.totalAllData
      }
    }))
    .subscribe(res =>{
      this.sharedService.filterLoading.next(false);
      this.schools.loading = false
      this.schools.list = res.data
      this.schools.totalAllData = res.totalAllData
      this.schools.total =res.total

    },err=> {
      this.schools.loading=false
      this.schools.total=0
      this.sharedService.filterLoading.next(false);
    })
  }


  confirmTransferStudent(){
    switch (this.transferForm.transferType) {
      case TransferType.TransferOutsideTheEmirate:
        this.confirm.openModel({message:'سيتم نقل الطالب لخارج اماره الشارقه ولن تستطيع اجراء عمليات اخري علي حساب الطالب ، تاكيد ؟'})
        break;
      case TransferType.TransferOutOfTheCountry:
        this.confirm.openModel({message:'سيتم نقل الطالب لخارج الدوله ولن تستطيع اجراء عمليات اخري علي حساب الطالب ، تاكيد ؟'})
        break;

        case TransferType.TransferWithinTheEmirate:
          this.confirm.openModel({message:'سيتم نقل الطالب من مدرسه الي مدرسه اخري ، تاكيد ؟'})
          break;
      default:
        this.transferStudent()
        break
    }
  }

  confirmDialogListner(){
    this.confirm.confirmed$
    .pipe(takeUntil(this.onDestroy$))
    .subscribe(val => val ? this.transferStudent() : null)
  }

  transferStudent(){
    this.submitted = true
    this.studentsService.transferStudent(this.transferForm)
    .subscribe(res=>{
      this.submitted = false
      this.router.navigate(['/schools-and-students/students'])
      this.toastr.success(this.translate.instant('toasterMessage.studentTransfered'))
    },(error:Error)=>{
      this.submitted = false
      this.toastr.error(error.message || this.translate.instant('toasterMessage.error'))

    })
  }


  onSelectSchool(index, school) {
    this.selectedSchool.index= index
    this.selectedSchool.value =school
    this.transferForm.schoolId = school.id

    this.gradeDivisions$ =  this.gradeService.getGradeDivision(this.selectedSchool.value.id,this.selectedGrade.id )
    .pipe(map(val=>{
      this.availableGradeDivisions = val.data
      return val.data
    }))

  }

  // to get Divisions
  onGradeSelected(gardeId){
    this.selectedGrade.id = gardeId
    this.selectedGrade.value=true

    this.transferForm.divisionId=null
    this.transferForm.trackId=null

    console.log(this.form.controls);

    this.form.controls['divisionId']?.markAsPristine()
    this.form.controls['divisionId']?.markAsUntouched()

    this.selectedSchool.index= null
    this.selectedSchool.value =null

    this.filtration.GradeId = gardeId
    this.getSchools()
  }

  // to get tracks
  onDivisionSelected(divisionId){
    if(divisionId){
      this.selectedDivision = this.availableGradeDivisions.find(el => el.id==divisionId)

      if(!this.selectedDivision.hasTrack){
        this.transferForm.trackId=null
        this.isTrackSelected=false
        this.form.controls['trackId']?.markAsUntouched()
        // this.optionalSubjects$ = this.sharedService.getAllOptionalSubjects({schoolId: this.selectedSchool.value?.id, gradeId:this.selectedGrade.id, trackId:""}).pipe(share())
        this.getSubjects({schoolId: this.selectedSchool.value?.id, gradeId:this.selectedGrade.id, trackId: ""})
      }

      this.divisionTracks$ = this.divisionService.getDivisionTracks(divisionId).pipe(share())
    }
  }

  onTrackSelected(trackId){
    this.isTrackSelected=true
    // this.optionalSubjects$ = this.sharedService.getAllOptionalSubjects({schoolId: this.selectedSchool.value?.id, gradeId:this.selectedGrade.id, trackId: trackId}).pipe(share())
    this.getSubjects({schoolId: this.selectedSchool.value?.id, gradeId:this.selectedGrade.id, trackId: trackId})
  }


  getSubjects(parms){
    this.optionalSubjectsList=null
    this.sharedService.getAllOptionalSubjects(parms).subscribe(res=>{
      this.optionalSubjectsList =res
    })
  }


  clearFilter(){
    this.filtration.KeyWord =''
    this.filtration.StateId= null
    this.filtration.curriculumId = null
    this.getSchools()
  }


  paginationChanged(event: paginationState) {
    this.filtration.Page = event.page
    this.getSchools()

  }


  ngOnDestroy(): void {
    this.onDestroy$.next(null)
    this.onDestroy$.complete()
    this.confirm.confirmed$.next(null)
  }

}
