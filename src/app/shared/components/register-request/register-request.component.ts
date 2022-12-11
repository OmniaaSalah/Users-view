import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  scope = inject(UserService).getCurrentUserScope()

  get ScopeEnum(){ return UserScope}
  
  componentHeaderData: IHeader={
    breadCrump: [
      { label: 'قائمه الطلاب ' ,routerLink:'/dashboard/schools-and-students/students/',routerLinkActiveOptions:{exact: true}},
      {label: this.translate.instant('dashboard.students.registerChildByCommission'), routerLink: `/dashboard/schools-and-students/students/student/`}
    ],
    mainTitle: {
      main: this.translate.instant('dashboard.students.registerChildByCommission')
    }
  }


  booleanOptions = this.sharedService.booleanOptions
  disabilitiesOptions = [
    {name: this.translate.instant('shared.no'), value:false},
    {name: this.translate.instant('shared.specialClass'), value:true},
    {name: this.translate.instant('shared.fusionClass'), value:true}
  ]

  educationType$ = this.indexService.getIndext(IndexesEnum.SpecialEducation)

  filtration :Filter = {...Filtration, curriculumId:'', StateId: '',GradeId:''}
  paginationState= {...paginationInitialState}
  
  
  AllGrades$ =this.sharedService.getAllGrades()
  
  // filter
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
  requestParentForm:FormGroup
  constructor(
    private translate: TranslateService,
    private headerService: HeaderService,
    private sharedService: SharedService,
    private schoolsService:SchoolsService,
    private countriesService:CountriesService,
    private indexService:IndexesService,
    private fb:FormBuilder,
    private exportService: ExportService,
  ) { }

  ngOnInit(): void {
    // this.headerService.changeHeaderdata(this.componentHeaderData)
    this.getSchools()
    this.requestParentForm = this.fb.group({
      IsSpecialAbilities:[null,Validators.required],
      IsChildOfAMartyr:[null,Validators.required],
      specialClass:[null],
      isSpecialEducation:[null,Validators.required],
      SpecialEducationId:[null]
    })
    this.requestParentForm.valueChanges.subscribe(result=>{
        if(this.requestParentForm.valid){
         this.isDisabled = true
          
        }else{
          this.isDisabled = false

        }
        
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
    this.imageResult1.push({...file[0],title:item.title,index:index})    
    this.backupData = JSON.parse(JSON.stringify(this.imageResult1));
    // console.log(this.backupData);
   }
  
  messageDeleted(event,){
      this.imageResult1 = event
      // this.backupData.find((er,index)=>{
      //   if(er.index == index){
      //     this.backupData.splice(er,1)
      //   }
      // })
      // console.log(this.backupData);
   }

clearFilter(){
  this.filtration.KeyWord =''
  this.filtration.City= null
  this.filtration.StateId= null
  this.filtration.Status =null
  this.filtration.curriculumId = null
  this.getSchools()
}


onExport(fileType: FileEnum, table:Table){
  this.exportService.exportFile(fileType, table, this.schools.list)
}
  sendParentForm(){
    if(this.requestParentForm.value.isSpecialEducation==false){
      this.requestParentForm.value.SpecialEducationId = null
    }
    let data={
        // ...this.requestForm,
        "IsSpecialAbilities":this.requestParentForm.value.IsSpecialAbilities,
        "IsChildOfAMartyr":this.requestParentForm.value.IsChildOfAMartyr,
        "specialClass":this.requestParentForm.value.specialClass,
        "isSpecialEducation":this.requestParentForm.value.isSpecialEducation,
        "SpecialEducationId":this.requestParentForm.value.SpecialEducationId,
        "selectedSchool":this.selectedSchool.value.id,
        "attachments":this.imageResult1
    }
    console.log(data);
    
  }

}
