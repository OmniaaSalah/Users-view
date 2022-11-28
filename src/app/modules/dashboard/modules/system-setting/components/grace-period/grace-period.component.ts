import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { th } from 'date-fns/locale';
import { filter, Subject, takeUntil, tap } from 'rxjs';
import { Filtration } from 'src/app/core/classes/filtration';
import { paginationInitialState } from 'src/app/core/classes/pagination';
import { IHeader } from 'src/app/core/Models/header-dashboard';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { School } from 'src/app/core/models/schools/school.model';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { GracePeriodEnum } from 'src/app/shared/enums/settings/settings.enum';
import { ConfirmModelService } from 'src/app/shared/services/confirm-model/confirm-model.service';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { SchoolsService } from '../../../schools/services/schools/schools.service';

type value = 'nextValue' |'previousValue'
@Component({
  selector: 'app-grace-period',
  templateUrl: './grace-period.component.html',
  styleUrls: ['./grace-period.component.scss']
})
export class GracePeriodComponent implements OnInit , OnDestroy{
  ngUnsubscribe = new Subject()
  faPlus=faPlus
  curriculums$ = this.sharedService.getAllCurriculum()

  gracePeriodId= this.route.snapshot.paramMap.get('id')

  dashboardHeaderData:IHeader ={
    breadCrump:[
      { label: this.translate.instant('sideBar.managerTools.children.systemSettings'),routerLink: '/dashboard/manager-tools/settings',routerLinkActiveOptions:{exact: true} },
      { label: this.translate.instant('dashboard.SystemSetting.manageGracePeriod'),routerLink: '/dashboard/manager-tools/settings/grace-period/new' }

    ],
    mainTitle: {main:this.translate.instant('dashboard.SystemSetting.manageGracePeriod')}
  }


  selectedGracePeriod:{[key in value]: GracePeriodEnum}={
    nextValue:null,
    previousValue: null
  }

  selectedSchools=[]

  gracePeriodSchools={
    // for Other Grace Periods 
    schools :[],
    // for  transfer Student Group
    schoolsFrom:[],
    schoolsTo:[]
  }

  gracePeriodList=[
    {name:'نقل الطلاب بشكل جماعى' , value:GracePeriodEnum.transferStudents},
    {name:'رفع الدرجات', value: GracePeriodEnum.raisDegrees},
    {name:'حذف الطلاب', value: GracePeriodEnum.deleteStudents}
  ]

  get gracePeriodEnum(){return GracePeriodEnum}

  diseases=[{name:'أمراض القلب'},{name:'فوبيا'},{name:'حساسيه'},{name:'السكرى'}];

  filtration={...Filtration,PageSize: 30,StateId:'',curriculumId:""}
  paginationState= paginationInitialState
  searchKeyWord

  modelFor: 'TransferFrom' | 'TransferTo' | null =null
  isSchoolsModelOpend =false

  schools={
    list:[],
    totalAllData:0,
    total:0,
    loading:false
  }
 
  list=[
    {name:'مدرسه الشارقه', id:1},
  ]


  transferStudentsForm= this.fb.group({
    gracePeriodType:[],
    from:[],
    to:[],
    schoolsFrom: this.fb.array([]),
    schoolsTo:this.fb.array([]),

  })

  // get schoolsTo(){ return this.transferStudentsForm.controls.schoolsTo as FormArray}
  // get schoolsFrom(){ return this.transferStudentsForm.controls.schoolsFrom as FormArray}


  gracePeriodForm=this.fb.group({
    gracePeriodType:[],
    schools: this.fb.array([]),
  })

  // get GP_Schools(){ return this.gracePeriodForm.controls.schools as FormArray}


  constructor(
    private headerService:HeaderService,
    private schoolsService:SchoolsService,
    private translate:TranslateService,
    private fb:FormBuilder,
    private confirmModalService:ConfirmModelService,
    private sharedService: SharedService,
    private route:ActivatedRoute) { }


  ngOnInit(): void {
    if(this.gracePeriodId) this.dashboardHeaderData.breadCrump[1].routerLink= `/dashboard/manager-tools/settings/grace-period/${this.gracePeriodId}/edit`
    this.headerService.Header.next(this.dashboardHeaderData);
    this.getSchools()
    this.confirmModelListener()
  
    
    
  }


  getGracePeriod(){
    this.selectedGracePeriod.previousValue = this.gracePeriodEnum.raisDegrees
    this.selectedSchools =this.schools.list
    this.gracePeriodSchools.schools = this.selectedSchools

  }

  onGracePeriodChange(gracePeriod: GracePeriodEnum){
    this.selectedGracePeriod.nextValue = gracePeriod
    if(this.gracePeriodSchools.schools.length || this.gracePeriodSchools.schoolsFrom.length || this.gracePeriodSchools.schoolsTo.length){
      this.selectedGracePeriod.previousValue = null
      this.confirmModalService.openModel({message:this.translate.instant('shared.changes')})
    }else{

      this.selectedGracePeriod.previousValue = this.selectedGracePeriod.nextValue
    }
  }

  setupNewGracePeriod(){
    this.selectedGracePeriod.previousValue= this.selectedGracePeriod.nextValue
    for(let i in this.gracePeriodSchools) this.gracePeriodSchools[i]=[]    
  }

  confirmModelListener(){
    this.confirmModalService.confirmed$
    .pipe(tap(console.log),filter(val => val==true), takeUntil(this.ngUnsubscribe))
    .subscribe(val => {if(val) this.setupNewGracePeriod()})
  }


  getSchools(){
    this.schools.loading = true
    
    this.schoolsService.getAllSchools(this.filtration).subscribe(res=>{
      // this.schools.list.push(...res.data)
      // this.gracePeriodSchools.schools = res.data
      this.schools.list = res.data
      this.schools.totalAllData = res.totalAllData
      this.schools.total =res.total
      this.paginationState.rows=30
      this.schools.loading =  false

      if(this.gracePeriodId) this.getGracePeriod()
    })
  }



  openSchoolsModel(modelFor=null){
    this.modelFor = modelFor
    this.isSchoolsModelOpend = true
  }

  onSelectAll(value){
    if(value){
      this.selectedSchools = this.schools.list
    }else{
      this.selectedSchools = []
    }
  }


  addSchoolsToGracePeriod(){
    switch(this.selectedGracePeriod.previousValue){
      case GracePeriodEnum.transferStudents: 
        if(this.modelFor=='TransferFrom'){
          this.gracePeriodSchools.schoolsFrom = this.selectedSchools
          this.isSchoolsModelOpend = false
        }else if(this.modelFor=='TransferTo'){
          this.gracePeriodSchools.schoolsTo= this.selectedSchools
          this.isSchoolsModelOpend = false
        }
      break
      default: 
        this.gracePeriodSchools.schools = this.selectedSchools
        this.isSchoolsModelOpend = false
      
      break;
    }
  }

  deleteSelectdSchool(schoolId){
    let index =this.selectedSchools.findIndex(el => el.id==schoolId)
    if(index >= 0) this.selectedSchools.splice(index ,1)
  }

  onSubmit(){

  }

  // addNewSchoolToGarcePeriod(){
  //   this.GP_Schools.push(this.fb.group({
  //     schoolId:[],
  //     gradesIds: [[]]
  //   }))
  // }

  // deleteGpSchool(index){
  //   this.GP_Schools.removeAt(index)
  // }


  // ----------------------------------------------------
  // addNewSchooleToTranser(){
  //   this.schoolsFrom.push(this.fb.group({
  //     schoolId:[],
  //     gradesIds: [[]]
  //   }))
  // }

  // deleteSchoolFrom(index){
  //   this.schoolsFrom.removeAt(index)
  // }

  // addNewSchooleToAccept(){
  //   this.schoolsTo.push(this.fb.group({
  //     schoolId:[],
  //     gradesIds: [[]],
  //     divisionsIds:[[]]
  //   }))
  // }

  // deleteSchoolToAccept(index){
  //   this.schoolsTo.removeAt(index)
  // }


  // onLazyLoad(event){
  //   console.log(event);
  //   let pages = this.schools.totalAllData /this.filtration.PageSize
  //   let currPage = Math.ceil(event.first /this.filtration.PageSize)
  //   this.filtration.Page= currPage+1
  //   console.log(this.filtration.Page);
    
  //   this.getSchools()
    
  // }

  paginationChanged(event: paginationState) {
    this.filtration.Page = event.page
    this.getSchools()

  }


  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null)
    this.ngUnsubscribe.complete()
    this.confirmModalService.confirmed$.next(false)
  }
}
