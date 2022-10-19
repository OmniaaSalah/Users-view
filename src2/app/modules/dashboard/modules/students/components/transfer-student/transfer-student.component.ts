import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {faPlus } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { Filtration } from 'src/app/core/classes/filtration';
import { paginationInitialState } from 'src/app/core/classes/pagination';
import { Filter } from 'src/app/core/models/filter/filter';
import { IHeader } from 'src/app/core/Models/iheader';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { TransferType } from 'src/app/shared/enums/school/school.enum';
import { CountriesService } from 'src/app/shared/services/countries/countries.service';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { SchoolsService } from '../../../schools/services/schools/schools.service';
import { StudentsService } from '../../services/students/students.service';

type transeferBy = 'parent' | 'commission';
type Mode = 'transfer' | 'register'


@Component({
  selector: 'app-transfer-student',
  templateUrl: './transfer-student.component.html',
  styleUrls: ['./transfer-student.component.scss']
})
export class TransferStudentComponent implements OnInit {
  faPlus = faPlus
  
  
  mode:Mode = this.route.snapshot.data['mode']
  studentId = this.route.snapshot.data['id']
  
  componentHeaderData: IHeader={
    breadCrump: [
      { label: 'قائمه الطلاب ' ,routerLink:'/dashboard/schools-and-students/students/',routerLinkActiveOptions:{exact: true}},
      {
        label: this.mode == 'transfer' ? this.translate.instant('dashboard.students.transferStudent') : 
        this.translate.instant('dashboard.students.registerChildByCommission'),
      }
    ],
    mainTitle: {
      main: this.mode == 'transfer' ? this.translate.instant('dashboard.students.transferStudent') : this.translate.instant('dashboard.students.registerChildByCommission')
    }
  }

  filtration :Filter = {...Filtration, curricuulumId:'', StateId: ''}
  paginationState= {...paginationInitialState}
  
  AllDivisions$ =this.sharedService.getAllDivisions()
  AllGrades$ =this.sharedService.getAllGrades()
  AllTracks$ =this.sharedService.getAllTraks()
  optionalSubjects$ = this.sharedService.getAllOptionalSubjects()
  transferType= [
    {name:this.translate.instant('dashboard.students.insideEmara'), value: TransferType.TransferWithinTheEmirate},
    {name:this.translate.instant('dashboard.students.outSideEmara'), value: TransferType.TransferOutsideTheEmirate},
    {name:this.translate.instant('dashboard.students.outsideCountry'), value: TransferType.TransferOutOfTheCountry},
  ]

  curriculums$ = this.sharedService.getAllCurriculum()
  states$ = this.CountriesService.getAllStates()

  schools={
    total:0,
    list:[],
    loading:true
  }
  

  transferForm={
    transferType:null,
    schoolId: null,
    gradeId: null,
    divisionId: null,
    trackId: null,
    studentIds: [this.studentId],
    subjects:[]
  }

  submitted=false
  transeferBy: transeferBy

  selectedScoolIndex 
  student =
    {
      name: 'محمد على',
      age: 15,
      regestered: false,
      regesteredSchool: 'مدرسه الشارقه الابتدائيه',
      school: 'مدرسه الشارقه',
      class: 'الصف الرابع',
      relativeRelation: 'ابن الاخ',
      src: 'assets/images/avatar.png'
    }


  constructor(
    private translate: TranslateService,
    private headerService: HeaderService,
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private studentsService:StudentsService,
    private schoolsService:SchoolsService,
    private CountriesService:CountriesService
  ) { }

  ngOnInit(): void {
    this.headerService.changeHeaderdata(this.componentHeaderData)
    this.getSchools()

  }

  getSchools(){
    this.schools.loading=true
    this.schools.list=[]

    this.schoolsService.getAllSchools(this.filtration)
    .subscribe(res =>{
      this.schools.loading = false
      this.schools.list = res.data
      this.schools.total =res.total
    },err=> {
      this.schools.loading=false
      this.schools.total=0
    })
  }


  transferStudent(){
    this.submitted = true
    this.studentsService.transferStudent(this.transferForm).subscribe(res=>{
      this.submitted = false
    },(error)=>{ this.submitted = false})
  }

  onSelectSchool(index, schoolId) {
    this.selectedScoolIndex = index
    this.transferForm.schoolId = schoolId
  }

  clearFilter(){
    this.filtration.KeyWord =''
    this.filtration.StateId= null
    this.filtration.curricuulumId = null
    this.getSchools()
  }


  paginationChanged(event: paginationState) {
    this.filtration.Page = event.page
    this.getSchools()

  }

}
