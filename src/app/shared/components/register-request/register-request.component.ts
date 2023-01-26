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
import { ToastrService } from 'ngx-toastr';
import { StatusEnum } from '../../enums/status/status.enum';
import { CustomFile } from '../file-upload/file-upload.component';

type ClassType= 'FusionClass' | 'SpecialClass'

@Component({
  selector: 'app-register-request',
  templateUrl: './register-request.component.html',
  styleUrls: ['./register-request.component.scss']
})
export class RegisterRequestComponent implements OnInit {
  childData
  lang = this.translationService.lang
  scope = inject(UserService).getCurrentUserScope()
  get ScopeEnum(){ return UserScope}
  get currentUserScope (){return this.userService.getCurrentUserScope()}

  parentId = +this.route.snapshot.paramMap.get('parentId')
  childId = +this.route.snapshot.paramMap.get('childId')
  childRegistrationStatus = this.route.snapshot.queryParamMap.get('status')

  componentHeaderData: IHeader



  booleanOptions = this.sharedService.booleanOptions
  disabilitiesOptions = [
    {name: this.translate.instant('shared.specialClass'), value:'SpecialClass'},
    {name: this.translate.instant('shared.fusionClass'), value: 'FusionClass'}
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

  requiredFiles=[
    {Titel:{ar:"صورة الهوية",en:"Identity Image"}, fileSize:4},
    {Titel:{ar:"صورة القيد",en:"Identity Image"}, fileSize:4},
    {Titel:{ar:"صورة شهاده الميلاد",en:"Identity Image"}, fileSize:4}
  ]
  
  
  selectedSchool={ index: null, value: null} 
  selectedGrade={id:'', value: false}


    // ارسال طلب تسجيل للابن او الطالب المنسحب 
  registerReqForm:FormGroup = this.fb.group({
    childId:[this.childId],
    studentId:[this.childRegistrationStatus==StatusEnum.Withdrawal ? this.childId : null],
    guardianId:[this.parentId],
    schoolId:[],
    gradeId: [],
    studentStatus:[this.childRegistrationStatus],
    isChildOfAMartyr:[null,Validators.required],
    isSpecialAbilities:[null],
    isSpecialClass:[null],
    isInFusionClass:[null],
    isSpecialEducation:[null,Validators.required],
    specialEducationId:[null],
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
    private userService:UserService,
    private toaster:ToastrService,
    private router:Router
  ) { }

  ngOnInit(): void {

    this.prepareHeaderData()

    if(this.scope==UserScope.Guardian) {
      this.parentId = this.userService.getCurrentGuardian()?.id
      this.registerReqForm.controls['guardianId'].setValue(this.parentId)
    }
    else  this.getStudentInfo()   
    

  }


  onClassTypeChange(value:ClassType){
    if(value== 'FusionClass') {
      this.registerReqForm.controls['isSpecialClass'].setValue(false)
      this.registerReqForm.controls['isInFusionClass'].setValue(true)
    }
    else if(value== 'SpecialClass'){
      this.registerReqForm.controls['isSpecialClass'].setValue(true)
      this.registerReqForm.controls['isInFusionClass'].setValue(false)
    }
  }
  
  getStudentInfo(){
    this._parent.getChild(this.route.snapshot.params['childId']).subscribe(res=>{
      this.childData = res
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
    this.registerReqForm.controls['schoolId'].setValue(school.id)
  }
  
  
  onGradeSelected(gardeId){
    // this.selectedGrade.id = gardeId
    this.selectedGrade.value=true
  
    this.selectedSchool.index= null
    this.selectedSchool.value =null
    
    this.filtration.GradeId = gardeId
    this.getSchools()
    this.registerReqForm.controls['gradeId'].setValue(gardeId)
    // this.gradeDivisions$ =  this.gradeService.getGradeDivision(this.selectedSchool.value.id, gardeId).pipe(map(val=>val.data))
  }

  attachments :CustomFile[] = []



  onFileUpload(uploadedFiles:CustomFile[],fileTitle,index){
    if(uploadedFiles.length) this.attachments[index]= {Titel:fileTitle.Titel, ...uploadedFiles[0]}
   }
  
   onFileDelete(index){
    this.attachments.splice(index,1)
   }




   onSubmit=false
  sendRegisterRequest(){
    this.onSubmit=true
    this.registerReqForm.controls['attachments'].setValue(this.attachments)
    this._parent.sendRegisterRequest(this.registerReqForm.value).subscribe(res=>{
      this.toaster.success("تم ارسال الطلب بنجاح")
      this.onSubmit=false

    },err=>{
      this.toaster.error(this.translate.instant('toasterMessage.Registration Request Already send before to this school'))
      this.onSubmit=false
        // this.router.navigate(['/'])
    })
    
  }


  registerChildWithSpea(){

    this.onSubmit=true
    setTimeout(()=>{
      this.onSubmit=false
      this.toaster.success("تم ارسال الطلب بنجاح")
      this.router.navigate(['../'],{relativeTo:this.route})
    },2000)
    // let data ={
    //   "attachments":   this.backupData.map(({index,...rest})=> rest),
    // "selectedSchool":this.selectedSchool.value.id,
    // "ChildId": Number(this.route.snapshot.paramMap.get('childId')),
    // "GurdianId": Number(this.route.snapshot.paramMap.get('parentId'))
    // }
    // console.log(data)
  }


  clearFilter(){
    this.filtration.Page=1
    this.filtration.KeyWord =''
    this.filtration.StateId= null
    this.filtration.curriculumId = null
    this.getSchools()
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
