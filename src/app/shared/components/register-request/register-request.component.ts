import { Name } from './../../../core/Models/Survey/IAddSurvey';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Table } from 'primeng/table';
import { Filtration } from 'src/app/core/classes/filtration';
import { paginationInitialState } from 'src/app/core/classes/pagination';
import { IHeader } from 'src/app/core/Models';
import { Filter } from 'src/app/core/models/filter/filter';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { IndexesEnum } from 'src/app/shared/enums/indexes/indexes.enum';
import { CountriesService } from 'src/app/shared/services/countries/countries.service';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { IndexesService } from '../../../modules/dashboard/modules/indexes/service/indexes.service';
import { SchoolsService } from '../../../modules/dashboard/modules/schools/services/schools/schools.service';
import { FileEnum } from '../../enums/file/file.enum';
import { UserScope } from '../../enums/user/user.enum';
import { ExportService } from '../../services/export/export.service';
import { ParentService } from 'src/app/modules/dashboard/modules/parants/services/parent.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';


@Component({
  selector: 'app-register-request',
  templateUrl: './register-request.component.html',
  styleUrls: ['./register-request.component.scss']
})
export class RegisterRequestComponent implements OnInit {
  @Input() childData={
    name: 'سمير محمد',
    age: 15
  }

  lang = this.translationService.lang
  scope = inject(UserService).getCurrentUserScope()
  get ScopeEnum(){ return UserScope}
  get currentUserScope (){return this.userService.getCurrentUserScope()}

  parentId = this.route.snapshot.paramMap.get('parentId')
  childId = this.route.snapshot.paramMap.get('childId')
  childRegistrationStatus = this.route.snapshot.queryParamMap.get('status')

  componentHeaderData: IHeader



  booleanOptions = this.sharedService.booleanOptions
  disabilitiesOptions = [
    {name: this.translate.instant('shared.no'), value:false},
    {name: this.translate.instant('shared.specialClass'), value:true},
    {name: this.translate.instant('shared.fusionClass'), value:true}
  ]

  educationType$ = this.indexService.getIndext(IndexesEnum.SpecialEducation)

  filtration :Filter = {...Filtration, curriculumId:'', StateId: '',GradeId:''}
  paginationState= {...paginationInitialState}
  
  
  AllGrades$ =this.sharedService.getAllGrades('')
  curriculums$ = this.sharedService.getAllCurriculum()
  states$ = this.countriesService.getAllStates()

  
  schools={
    totalAllData:0,
    total:0,
    list:[],
    loading:true
  }
  
  submitted

  // requestForm={
  //   IsSpecialAbilities:null,
  //   IsChildOfAMartyr:null,
  //   specialClass:null,
  //   isSpecialEducation:null,
  //   SpecialEducationId:null
  // }

  requiredFiles=[
    {title:{ar:"صورة الهوية",en:"Identity Image"}, fileSize:"4mb"},
    {title:{ar:"صورة الهوية",en:"Identity Image"}, fileSize:"4mb"},
    {title:{ar:"صورة الهوية",en:"Identity Image"}, fileSize:"4mb"}
  ]
  
  
  selectedSchool={ index: null, value: null} 
  
  selectedGrade={id:'', value: false}

  imageResult1 = []
  imageResult2 = []
  imageResult3 = []
  isDisabled:boolean = false

    // ارسال طلب تسجيل للابن او الطالب المنسحب 
  registerReqForm:FormGroup = this.fb.group({
    guardianId:[],
    childId:[],
    studentId:[],
    studentStatus:[],
    isChildOfAMartyr:[null,Validators.required],
    isSpecialAbilities:[],
    isSpecialClass:[null],
    isInFusionClass:[],
    isSpecialEducation:[null,Validators.required],
    specialEducationId:[null],
    selectedSchool:[],
    attachments:[[]],
  })

  // {
  //   "schoolId": 0,
  //   "gradeId": 0,
  //   "divisionId": 0,
  //   "schoolYearId": 0,
  //   "attachmentPaths": [
  //     {
  //       "attachmentPaths": "string"
  //     }
  //   ]
  // }
  // تسجيل الابن او الطالب المنسحب من قبل الهيئه
  registerWithSpeaForm:FormGroup = this.fb.group({
    attachments:[],
    selectedSchool:[],
    ChildId:[],
    GurdianId:[]
  })

  constructor(
    private translate: TranslateService,
    private translationService:TranslationService,
    private headerService: HeaderService,
    private sharedService: SharedService,
    private schoolsService:SchoolsService,
    private countriesService:CountriesService,
    private indexService:IndexesService,
    private fb:FormBuilder,
    private route:ActivatedRoute,
    private _parent:ParentService,
    private userService:UserService
  ) { }

  ngOnInit(): void {

    this.prepareHeaderData()

    if(this.scope===UserScope.SPEA) this.getStudentInfo()

  

  }
  
  getStudentInfo(){
    this._parent.getChild(this.route.snapshot.params['childId']).subscribe(res=>{
      this.childData.name = res.name
      this.childData.age = res.age
    })
  }
  
  getSchools(){
    this.schools.loading=true
    this.schools.list=[]
  
    this.schoolsService.getAllSchools(this.filtration)
    .subscribe(res =>{
      this.schools.loading = false
      this.schools.list = res.data
      this.schools.totalAllData = res.totalAllData
      this.schools.total =res.total
  
    },err=> {
      this.schools.loading=false
      this.schools.total=0
    })
  }


  onSelectSchool(index, school) {
    this.selectedSchool.index= index
    this.selectedSchool.value =school
  }
  
  
  onGradeSelected(gardeId){
    // this.selectedGrade.id = gardeId
    this.selectedGrade.value=true
  
    this.selectedSchool.index= null
    this.selectedSchool.value =null
    
    this.filtration.GradeId = gardeId
    this.getSchools()
    // this.gradeDivisions$ =  this.gradeService.getGradeDivision(this.selectedSchool.value.id, gardeId).pipe(map(val=>val.data))
  }

  backupData = []

  messageUpload(file,item,index){
    if(file.length){
      this.imageResult1.push({...file[0],title:item.title,index:index})    
      this.backupData = JSON.parse(JSON.stringify(this.imageResult1));
    }
   }
  
  messageDeleted(index){
        this.backupData.splice(index,1)
        this.imageResult1 = JSON.parse(JSON.stringify(this.backupData));
   }

clearFilter(){
  this.filtration.Page=1
  this.filtration.KeyWord =''
  this.filtration.StateId= null
  this.filtration.curriculumId = null
  this.getSchools()
}


sendRegisterRequest(){

    
  }


  registerChildWithSpea(){
    let data ={
      "attachments":   this.backupData.map(({index,...rest})=> rest),
    "selectedSchool":this.selectedSchool.value.id,
    "ChildId": Number(this.route.snapshot.paramMap.get('childId')),
    "GurdianId": Number(this.route.snapshot.paramMap.get('parentId'))
    }
    console.log(data)
  }



  prepareHeaderData(){
    if(this.currentUserScope== this.ScopeEnum.Guardian){
      this.componentHeaderData = {
        breadCrump: [
          { label: this.translate.instant('dashboard.parents.sendRegisterReq') ,routerLink:`/parent/child/${this.childId}/register-request`,routerLinkActiveOptions:{exact: true}},
        ],
        mainTitle: { main: this.translate.instant('dashboard.parents.sendRegisterReq') }
      }

    }else{

      this.componentHeaderData={
        breadCrump: [
          { label: this.translate.instant('dashboard.parents.parents') ,routerLink:'/dashboard/schools-and-students/all-parents/',routerLinkActiveOptions:{exact: true}},
          { label: this.translate.instant('dashboard.parents.childrenList') ,routerLink:`/dashboard/schools-and-students/all-parents/parent/${this.parentId}/all-children`,routerLinkActiveOptions:{exact: true}},
          {label: this.translate.instant('dashboard.students.registerChildByCommission'), routerLink: `/dashboard/schools-and-students/all-parents/parent/${this.parentId}/child/${this.childId}/register`}
        ],
        mainTitle: {
          main: this.translate.instant('dashboard.students.registerChildByCommission')
        }
      }
    };

    this.headerService.changeHeaderdata(this.componentHeaderData)
  }


}
