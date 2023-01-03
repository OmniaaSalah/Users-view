import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { filter, shareReplay, Subject, takeUntil, tap } from 'rxjs';
import { Filtration } from 'src/app/core/classes/filtration';
import { paginationInitialState } from 'src/app/core/classes/pagination';
import { IHeader } from 'src/app/core/Models/header-dashboard';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { GracePeriodEnum } from 'src/app/shared/enums/settings/settings.enum';
import { ConfirmModelService } from 'src/app/shared/services/confirm-model/confirm-model.service';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { SettingsService } from '../../services/settings/settings.service';

type value = 'nextValue' |'previousValue' |'currentValue'
@Component({
  selector: 'app-grace-period',
  templateUrl: './grace-period.component.html',
  styleUrls: ['./grace-period.component.scss']
})
export class GracePeriodComponent implements OnInit , OnDestroy{
  ngUnsubscribe = new Subject()
  faPlus=faPlus
  curriculums$ = this.sharedService.getAllCurriculum().pipe(shareReplay())

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
    previousValue: null,
    currentValue:null
  }
  gracePeriodRange=null

  selectedSchools=[]

  gracePeriodSchools={
    // for Other Grace Periods 
    schools :[],
    // for  transfer Student Group
    fromSchools:[],
    toSchools:[]
  }

  gracePeriodTypes$ = this.settingService.getGracePeriodTypes()


  get gracePeriodEnum(){return GracePeriodEnum}

  diseases=[{name:'أمراض القلب'},{name:'فوبيا'},{name:'حساسيه'},{name:'السكرى'}];

  filtration={...Filtration,PageSize: 30,schoolName:'',curriculumId:""}
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
    // gracePeriodType:[],
    // from:[],
    // to:[],


  })

  // get toSchools(){ return this.transferStudentsForm.controls.toSchools as FormArray}
  // get fromSchools(){ return this.transferStudentsForm.controls.fromSchools as FormArray}


  gracePeriodForm=this.fb.group({
    systemSettingsGracePeriodId: [null, Validators.required],
    dateFrom: ['', Validators.required] ,
    dateTo:  ['', Validators.required],
    // gracePeriodType:[],
    fromSchools: [[]],
    toSchools:[[]],
    schools: [[]],
  })

  get gracePeriodTypeCtr() {return this.gracePeriodForm.controls.systemSettingsGracePeriodId}
  get fromSchoolsCtr() {return this.gracePeriodForm.controls.fromSchools}
  get toSchoolsCtr() {return this.gracePeriodForm.controls.toSchools}
  get schoolsCtr() {return this.gracePeriodForm.controls.schools}


  constructor(
    private headerService:HeaderService,
    private translate:TranslateService,
    private fb:FormBuilder,
    private confirmModalService:ConfirmModelService,
    private sharedService: SharedService,
    private route:ActivatedRoute,
    private toaster:ToastrService,
    private settingService:SettingsService) { }


  ngOnInit(): void {
    if(this.gracePeriodId) this.dashboardHeaderData.breadCrump[1].routerLink= `/dashboard/manager-tools/settings/grace-period/${this.gracePeriodId}/edit`
    this.headerService.Header.next(this.dashboardHeaderData);
    this.getSchools()
    this.confirmModelListener()
    this.onConfirmModelCanceled()
  }



  getGracePeriod(){
    this.selectedGracePeriod.previousValue = this.gracePeriodEnum.raisDegrees
    this.selectedSchools = [...this.schools.list]
    this.gracePeriodSchools.schools = this.selectedSchools

  }

  onGracePeriodChange(choosenGracePeriod: GracePeriodEnum){
    if(!this.selectedGracePeriod.previousValue) this.selectedGracePeriod.previousValue =choosenGracePeriod //run on first time you selecte item from dropdown
    else this.selectedGracePeriod.nextValue = choosenGracePeriod
    
    if(this.gracePeriodSchools.schools.length || this.gracePeriodSchools.fromSchools.length || this.gracePeriodSchools.toSchools.length){
      this.selectedGracePeriod.currentValue = null
      this.gracePeriodTypeCtr.setValue(null)
      this.confirmModalService.openModel({message:this.translate.instant('shared.changes')})
    }else{

      this.selectedGracePeriod.currentValue = choosenGracePeriod
      this.gracePeriodTypeCtr.setValue(choosenGracePeriod as any)
    }
  }

  onTimeRangeChanged([startDate, endDate]){
    console.log(...arguments);
    
    if(startDate) this.gracePeriodForm.controls.dateFrom.setValue(startDate.toString())
    if(endDate) this.gracePeriodForm.controls.dateTo.setValue(endDate.toString())
  }

  setupNewGracePeriod(){
    this.selectedSchools=[]
    for(let i in this.gracePeriodSchools) this.gracePeriodSchools[i]=[]    
    this.selectedGracePeriod.currentValue= this.selectedGracePeriod.nextValue
    this.gracePeriodTypeCtr.setValue(this.selectedGracePeriod.nextValue as any)

  }

  confirmModelListener(){
    this.confirmModalService.confirmed$
    .pipe( takeUntil(this.ngUnsubscribe))
    .subscribe(val => { if(val) this.setupNewGracePeriod() })
  }

  onConfirmModelCanceled(){
    this.confirmModalService.onClose$
    .pipe(filter(val => val), takeUntil(this.ngUnsubscribe))
    .subscribe(val => {
      console.log(val);
      
      this.selectedGracePeriod.currentValue=this.selectedGracePeriod.previousValue
      this.gracePeriodTypeCtr.setValue(this.selectedGracePeriod.previousValue as any)

    })
  }


  getSchools(){
    this.schools.loading = true
    
    this.settingService.getSchools(this.filtration).subscribe(res=>{
      // this.schools.list.push(...res.data)
      // this.gracePeriodSchools.schools = res.data
      this.schools.list = res.result.data
      this.schools.totalAllData = res.result.totalAllData
      this.schools.total =res.result.total
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
      this.selectedSchools =[...this.schools.list.map(el => el.id)]
    }else{
      this.selectedSchools = []
    }
  }


  addSchoolsToGracePeriod(){
    switch(this.selectedGracePeriod.previousValue){
      case GracePeriodEnum.transferStudents: 
        if(this.modelFor=='TransferFrom'){
          this.gracePeriodSchools.fromSchools = this.selectedSchools
          this.fromSchoolsCtr.setValue(this.getSelectedSchoolsIds(this.selectedSchools) as any)
          this.isSchoolsModelOpend = false
        }else if(this.modelFor=='TransferTo'){
          this.gracePeriodSchools.toSchools= this.selectedSchools
          this.toSchoolsCtr.setValue(this.getSelectedSchoolsIds(this.selectedSchools) as any)
          this.isSchoolsModelOpend = false
        }
      break
      default: 
        this.gracePeriodSchools.schools = this.selectedSchools
        this.schoolsCtr.setValue(this.getSelectedSchoolsIds(this.selectedSchools) as any)
        this.isSchoolsModelOpend = false
      
      break;
    }
  }

  
  deleteSelectdSchool(schoolId){
    let index =this.selectedSchools.findIndex(el => el.id==schoolId)
    if(index >= 0) this.selectedSchools.splice(index ,1)
  }
  
  getSelectedSchoolsIds(schools){
    return schools.map(el => el.id)
  }

  onSubmit(){
    let newGracePeriod={
      ...this.gracePeriodForm.value,
      dateFrom: this.formateDate(new Date(this.gracePeriodForm.value.dateFrom)),
      dateTo: this.formateDate(new Date(this.gracePeriodForm.value.dateTo))
    }
    this.settingService.addGarcePeriod(newGracePeriod).subscribe(res =>{
      this.toaster.success('تم انشاء فتره السماح بنجاح')
    },()=>{
      this.toaster.error('حدث خطأ يرجى المحاوله مره اخرى')

    })
  }

  formateDate(date :Date){
    let d = new Date(date.setHours(date.getHours() - (date.getTimezoneOffset()/60) )).toISOString()
    return d.split('.')[0]
    
  }

  reset(){
    this.selectedSchools = []
    this.gracePeriodRange =null
    for(let i in this.gracePeriodSchools) this.gracePeriodSchools[i]=[] 
    this.selectedGracePeriod.currentValue=null
    this.selectedGracePeriod.previousValue=null
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
  //   this.fromSchools.push(this.fb.group({
  //     schoolId:[],
  //     gradesIds: [[]]
  //   }))
  // }

  // deleteSchoolFrom(index){
  //   this.fromSchools.removeAt(index)
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
