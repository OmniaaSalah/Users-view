import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { delay, filter, map, shareReplay, Subject, take, takeUntil, tap } from 'rxjs';
import { Filtration } from 'src/app/core/classes/filtration';
import { paginationInitialState } from 'src/app/core/classes/pagination';
import { IHeader } from 'src/app/core/Models/header-dashboard';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { GracePeriodEnum } from 'src/app/shared/enums/settings/settings.enum';
import { ConfirmModelService } from 'src/app/shared/services/confirm-model/confirm-model.service';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { SchoolsService } from '../../../schools/services/schools/schools.service';
import { SettingsService } from '../../services/settings/settings.service';

type SchoolType = 'toSchools' | 'fromSchools' | 'allowdSchools'
type value = 'nextValue' |'previousValue' |'currentValue'
@Component({
  selector: 'app-grace-period',
  templateUrl: './grace-period.component.html',
  styleUrls: ['./grace-period.component.scss']
})
export class GracePeriodComponent implements OnInit , OnDestroy{
  ngUnsubscribe = new Subject()
  lang = inject(TranslationService).lang
  faPlus=faPlus
  curriculums$ = this.sharedService.getAllCurriculum().pipe(shareReplay())

  gracePeriodId= this.route.snapshot.paramMap.get('id')
  gracePeriodCode= this.route.snapshot.queryParamMap.get('code')

  dashboardHeaderData:IHeader ={
    breadCrump:[
      { label: this.translate.instant('sideBar.managerTools.children.systemSettings'),routerLink: '/manager-tools/settings',routerLinkActiveOptions:{exact: true} },
      { label: this.translate.instant('dashboard.SystemSetting.manageGracePeriod'),routerLink: '/manager-tools/settings/grace-period/new' }

    ],
    mainTitle: {main:this.translate.instant('dashboard.SystemSetting.manageGracePeriod')}
  }

  isLoading

  selectedGracePeriod:{[key in value]: GracePeriodEnum}={
    nextValue:null,
    previousValue: null,
    currentValue:null
  }

  gracePeriodRange=null

  selectedSchools=[]
  selectedFromSchools=[]
  selectedToSchools=[]

  isSchooDeletedMode:boolean=false;

  gracePeriodSchools={
    // for Other Grace Periods
    schools :{
      list:[],
      total:0,
      totalAllData:0,
      loading:false
    },
    // for  transfer Student Group
    fromSchools :{
      list:[],
      total:0,
      totalAllData:0,
      loading:false
    },
    toSchools :{
      list:[],
      total:0,
      totalAllData:0,
      loading:false
    }
  }

  gracePeriodTypes
  gracePeriodTypes$ = this.settingService.getGracePeriodTypes().pipe(tap(res=> this.gracePeriodTypes=res),shareReplay())


  get gracePeriodEnum(){return GracePeriodEnum}

  gracePeriodMainData
  currentGracePeriodName

  filtration={...Filtration,PageSize: 30,curriculumId: 0,gracePeriodId:0}

  allowedSchoolsFiltration={...Filtration,PageSize: 6, gracePeriodId: this.gracePeriodId} //filteration for all grace periods table except  [transfer students]
  fromSchoolsFiltration={...Filtration,PageSize: 6, gracePeriodId: this.gracePeriodId}  //filteration for grace periods [transfer students From] table
  toSchoolsFiltration={...Filtration,PageSize: 6, gracePeriodId: this.gracePeriodId} //filteration for grace periods [transfer students To] table
  paginationState= paginationInitialState


  schoolsDialogFor: 'TransferFrom' | 'TransferTo' | null =null
  isSchoolsModelOpend =false

  schools={
    list:[],
    totalAllData:0,
    total:0,
    loading:false
  }

  onSubmitted
  gracePeriodForm=this.fb.group({
    id: [0],
    gracePeriodTypeId: [null],
    gracePeriodCode: [null, Validators.required],
    dateFrom: ['', Validators.required] ,
    dateTo:  ['', Validators.required],
    // gracePeriodType:[],
    fromSchools: [[]],
    toSchools:[[]],
    allowedSchools: [[]],
  })

  get gracePeriodTypeCtr() {return this.gracePeriodForm.controls.gracePeriodCode}
  get fromSchoolsCtr() {return this.gracePeriodForm.controls.fromSchools}
  get toSchoolsCtr() {return this.gracePeriodForm.controls.toSchools}
  get schoolsCtr() {return this.gracePeriodForm.controls.allowedSchools}


  constructor(
    private schoolsService:SchoolsService,
    private headerService:HeaderService,
    private translate:TranslateService,
    private fb:FormBuilder,
    private confirmModalService:ConfirmModelService,
    private sharedService: SharedService,
    private route:ActivatedRoute,
    private router :Router,
    private toaster:ToastrService,
    private settingService:SettingsService) { }


  ngOnInit(): void {
    if(this.gracePeriodId) {
      this.dashboardHeaderData.breadCrump[1].routerLink= `/manager-tools/settings/grace-period/${this.gracePeriodId}`
      this.getGracePeriodMainData(this.gracePeriodId)
    }

    this.headerService.Header.next(this.dashboardHeaderData);
    this.confirmModelListener()
    this.onConfirmModelCanceled()
  }


  getGracePeriodMainData(gracePeriodId){
     this.settingService.getGracePeriodMainData(gracePeriodId)
     .pipe(
      map(res => res.result))
     .subscribe(res=>{

         this.gracePeriodMainData = res
         this.getCurrentGracePeriodName(res.gracePeriodTypeId)
         this.gracePeriodRange = [new Date(res.dateFrom), new Date(res.dateTo)]
         this.onTimeRangeChanged(this.gracePeriodRange)

         this.selectedGracePeriod.currentValue=res.gracePeriodCode
         this.selectedGracePeriod.previousValue=res.gracePeriodCode

         this.gracePeriodForm.controls.gracePeriodCode.setValue(res.gracePeriodCode)
         this.gracePeriodForm.controls.gracePeriodTypeId.setValue(res.gracePeriodTypeId)
         this.gracePeriodForm.controls.id.setValue(res.id)


         if(res.gracePeriodCode==3){
          //Note:---- Transfer Student Grace Period
          this.toSchoolsCtr.setValue(res.toSchools)
          this.fromSchoolsCtr.setValue(res.fromSchools)
           this.getGracePeriodFromSchools()
           this.getGracePeriodToSchools()
          }else{
            //Note:----  other grace period
            this.schoolsCtr.setValue(res.allowedSchools)
           this.getGracePeriodSchools()
         }
     })
  }

  getGracePeriodSchools(){
    this.gracePeriodSchools.schools.list=[]
    this.gracePeriodSchools.schools.loading=true
     this.settingService.getGracePeriodSchools({...this.allowedSchoolsFiltration, type:'allowdSchools'}).subscribe(res=>{
      this.gracePeriodSchools.schools.list = res.data ||[]
      this.gracePeriodSchools.schools.total=res.total
      this.gracePeriodSchools.schools.totalAllData=res.totalAllData
      this.paginationState.rows=6
     })
  }

  getGracePeriodFromSchools(){
    this.gracePeriodSchools.fromSchools.list=[]
    this.gracePeriodSchools.fromSchools.loading=true
     this.settingService.getGracePeriodSchools({...this.fromSchoolsFiltration, type:'fromSchools'}).subscribe(res=>{
      this.gracePeriodSchools.fromSchools.list = res.data ||[]
      this.gracePeriodSchools.fromSchools.total=res.total
      this.gracePeriodSchools.fromSchools.totalAllData=res.totalAllData
      this.paginationState.rows=6
     })
  }

  getGracePeriodToSchools(){
    this.gracePeriodSchools.toSchools.list=[]
    this.gracePeriodSchools.toSchools.loading=true
     this.settingService.getGracePeriodSchools({...this.toSchoolsFiltration, type:'toSchools'}).subscribe(res=>{
      this.gracePeriodSchools.toSchools.list = res.data ||[]
      this.gracePeriodSchools.toSchools.total=res.total
      this.gracePeriodSchools.toSchools.totalAllData=res.totalAllData
      this.paginationState.rows=6
     })
  }



  onGracePeriodChange(choosenGracePeriod: GracePeriodEnum){
    this.isSchooDeletedMode=false
    if(!this.selectedGracePeriod.previousValue) this.selectedGracePeriod.previousValue =choosenGracePeriod //run on first time you selecte item from dropdown
    else this.selectedGracePeriod.nextValue = choosenGracePeriod

    if(this.gracePeriodSchools.schools.list.length || this.gracePeriodSchools.fromSchools.list.length || this.gracePeriodSchools.toSchools.list.length){
      this.selectedGracePeriod.currentValue = null
      this.gracePeriodTypeCtr.setValue(null)
      this.confirmModalService.openModel({message:this.translate.instant('shared.changes')})
    }else{

      this.selectedGracePeriod.currentValue = choosenGracePeriod
      this.gracePeriodTypeCtr.setValue(choosenGracePeriod as any)
    }
  }

  onTimeRangeChanged([startDate, endDate]){
    if(startDate) this.gracePeriodForm.controls.dateFrom.setValue(startDate.toString())
    if(endDate) this.gracePeriodForm.controls.dateTo.setValue(endDate.toString())
  }

  setupNewGracePeriod(){
    this.selectedSchools=[]
    for(let i in this.gracePeriodSchools) this.gracePeriodSchools[i].list=[]
    this.selectedGracePeriod.currentValue= this.selectedGracePeriod.nextValue
    this.gracePeriodTypeCtr.setValue(this.selectedGracePeriod.nextValue as any)

  }

  confirmModelListener(){
    this.confirmModalService.confirmed$
    .pipe(delay(100),takeUntil(this.ngUnsubscribe))
    .subscribe(val => {
      if(val) {
        if(!this.gracePeriodId&&!this.isSchooDeletedMode){
          this.setupNewGracePeriod()
        }
      }
    })
  }

  onConfirmModelCanceled(){
    this.confirmModalService.onClose$
    .pipe(filter(val => val), takeUntil(this.ngUnsubscribe))
    .subscribe(val => {
      if(!this.gracePeriodId){
        this.selectedGracePeriod.currentValue=this.selectedGracePeriod.previousValue
        this.gracePeriodTypeCtr.setValue(this.selectedGracePeriod.previousValue as any)
      }else{

      }

    })
  }





  getSchools(){
    this.schools.loading = true

    this.settingService.getSchools(this.filtration)
    .subscribe(res=>{

      this.schools.list = res.data
      this.schools.totalAllData = res.totalAllData
      this.schools.total =res.total
      this.paginationState.rows=30
      this.schools.loading =  false
    })
  }



  openSchoolsModel(schoolsDialogFor=null){
    this.getSchools()
    this.schoolsDialogFor = schoolsDialogFor
    if(this.gracePeriodId){
      if(this.schoolsDialogFor=='TransferFrom') this.selectedSchools= this.gracePeriodMainData.fromSchools
      else if(this.schoolsDialogFor=='TransferTo') this.selectedSchools= this.gracePeriodMainData.toSchools
      else this.selectedSchools= this.gracePeriodMainData.allowedSchools
    }else{
      if(this.schoolsDialogFor=='TransferFrom') this.selectedSchools= this.selectedFromSchools
      else if(this.schoolsDialogFor=='TransferTo') this.selectedSchools= this.selectedToSchools
      else this.selectedSchools= this.selectedSchools
    }
    this.isSchoolsModelOpend = true

  }

  onSelectAll(isAllSelected){
    this.isLoading=true
    this.settingService.getSchools({PageSize: this.schools.totalAllData, curriculumId:this.filtration.curriculumId, gracePeriodId: this.filtration.gracePeriodId})
    .pipe(map(res=> res.data))
    .subscribe(schoolsList =>{

      if(isAllSelected){
        schoolsList.forEach(item=>{
          let index = this.selectedSchools.indexOf(item.id)
          if(index == -1) this.selectedSchools=[...this.selectedSchools,item.id]
        })
      }else{
        this.selectedSchools=[]
        // schoolsList.forEach(item=>{
        //   let index = this.selectedSchools.indexOf(item.id)
        //   if(index!= -1) this.selectedSchools = this.selectedSchools.slice(index, 1)
        // })
      }
      this.isLoading=false

    })

  }


  addSchoolsToGracePeriod(){
    if(this.gracePeriodId){ //On Edit Mode
      if(this.selectedGracePeriod.previousValue){
        if(this.schoolsDialogFor=='TransferFrom'){
            this.fromSchoolsCtr.setValue(this.selectedSchools as any)
            this.selectedFromSchools=this.selectedSchools
            this.isSchoolsModelOpend = false
          }else if(this.schoolsDialogFor=='TransferTo'){
            this.toSchoolsCtr.setValue(this.selectedSchools as any)
            this.selectedToSchools=this.selectedSchools
            this.isSchoolsModelOpend = false
          }else{
            this.schoolsCtr.setValue(this.selectedSchools as any)
            this.isSchoolsModelOpend = false
          }
      }
      this.toaster.success(this.translate.instant('toasterMessage.schoolsAddedToGracePeriod'))

      this.updateGracePeriod()
    }
    else{

      this.settingService.getSchools({curriculumId:this.filtration.curriculumId, gracePeriodId: this.filtration.gracePeriodId})
      .pipe(
        map(res=> res.data),
        map(res=>{
          return res.filter(el=>{
            return this.selectedSchools.includes(el.id)
          })
        }))
      .subscribe(schoolsList =>{

        if(this.selectedGracePeriod.previousValue){
          if(this.schoolsDialogFor=='TransferFrom'){
              this.gracePeriodSchools.fromSchools.list =schoolsList
              this.fromSchoolsCtr.setValue(this.selectedSchools as any)
              this.isSchoolsModelOpend = false
            }else if(this.schoolsDialogFor=='TransferTo'){
              this.gracePeriodSchools.toSchools.list=schoolsList
              this.toSchoolsCtr.setValue(this.selectedSchools as any)

              this.isSchoolsModelOpend = false
            }else{
              this.gracePeriodSchools.schools.list =schoolsList
              this.schoolsCtr.setValue(this.selectedSchools as any)

              this.isSchoolsModelOpend = false
            }
        }
      })
    }



  }


  deleteSchool(schoolId,  schoolType:SchoolType){
    this.isSchooDeletedMode=true;
    let index


    if(schoolType=='allowdSchools'){

      index = this.gracePeriodSchools.schools.list.findIndex(el => el?.id==schoolId)
      console.log(schoolType, index);
      if(index >-1){
        this.gracePeriodSchools.schools.list.splice(index ,1)
        this.selectedSchools.splice(index ,1)
      }
    }else if(schoolType=='fromSchools'){

      index = this.gracePeriodSchools.fromSchools.list.findIndex(el => el?.id==schoolId)
      console.log(schoolType, index);
      if(index >-1){
         this.gracePeriodSchools.fromSchools.list.splice(index ,1)
         this.selectedSchools.splice(index ,1)
      }
    }else if(schoolType=='toSchools'){

      index = this.gracePeriodSchools.toSchools.list.findIndex(el => el?.id==schoolId)
      console.log(this.gracePeriodSchools.toSchools.list,schoolId,schoolType, index,);
      if(index >-1){
         this.gracePeriodSchools.toSchools.list.splice(index ,1)
         this.selectedSchools.splice(index ,1)
      }
    }

    // if(index >= 0) {
    //   console.log({e:this.selectedSchools,r:this.schoolsDialogFor})
    //   this.selectedSchools.splice(index ,1)
    //   if(this.schoolsDialogFor=='TransferFrom') this.gracePeriodSchools.fromSchools.list.splice(index ,1)
    //   else if(this.schoolsDialogFor=='TransferTo') this.gracePeriodSchools.toSchools.list.splice(index ,1)
    //   else this.gracePeriodSchools.schools.list.splice(index ,1)
    //   // this.isSchooDeletedMode=false
    // }


    if(this.gracePeriodId){
      this.settingService.deleteSchoolFromGracePeriod(this.gracePeriodId,schoolId,schoolType)
      .subscribe(res=>{
        // this.isSchooDeletedMode=false;
        this.getGracePeriodMainData(this.gracePeriodId)
        this.toaster.success('تم حذف المدرسه بنجاح')
      },()=>{
        this.toaster.error('حدث خطأ يرجى المحاوله مره اخرى')
      })
    }
  }

  getSelectedSchoolsIds(schools){
    return schools.map(el => el.id)
  }

  createNewGracePeriod(){
    this.onSubmitted =true
    let newGracePeriod={
      ...this.gracePeriodForm.value,
      gracePeriodTypeId: this.getGracePeriodIdByCode(this.gracePeriodForm.value.gracePeriodCode),
      dateFrom: this.formateDate(new Date(this.gracePeriodForm.value.dateFrom)),
      dateTo: this.formateDate(new Date(this.gracePeriodForm.value.dateTo))
    }
    this.settingService.addGarcePeriod(newGracePeriod).subscribe(res =>{
      this.toaster.success(this.translate.instant('toasterMessage.gracePeriodCreated'))
      this.onSubmitted =false
      this.reset()
      this.router.navigateByUrl('/manager-tools/settings')
    },()=>{
      this.onSubmitted =false
      this.translate.instant('toasterMessage.error')
      this.toaster.error(this.translate.instant('toasterMessage.error'))

    })
  }

  updateGracePeriod(){
    this.onSubmitted =true
    let newGracePeriod={
      ...this.gracePeriodForm.value,
      // gracePeriodTypeId: this.getGracePeriodIdByCode(this.gracePeriodForm.value.gracePeriodCode),
      dateFrom: this.formateDate(new Date(this.gracePeriodForm.value.dateFrom)),
      dateTo: this.formateDate(new Date(this.gracePeriodForm.value.dateTo))
    }
    this.settingService.updateGarcePeriod(newGracePeriod).subscribe(res =>{
      this.toaster.success(this.translate.instant('toasterMessage.gracePeriodUpdated'))
      this.onSubmitted =false
      this.getGracePeriodMainData(this.gracePeriodId)
    },()=>{
      this.toaster.error(this.translate.instant('toasterMessage.error'))
      this.onSubmitted =false
    })
  }

  getGracePeriodIdByCode(code){
    return this.gracePeriodTypes.find(el => el.code == code).id || 0
  }
  getCurrentGracePeriodName(id){
     this.gracePeriodTypes$.pipe(take(1)).subscribe(list =>{
      this.currentGracePeriodName = list.find(el => el.id == id).name
     })

  }

  formateDate(date :Date){
    let d = new Date(date.setHours(date.getHours() - (date.getTimezoneOffset()/60) )).toISOString()
    return d.split('.')[0]

  }

  reset(){
    this.selectedSchools = []
    this.gracePeriodRange =null
    for(let i in this.gracePeriodSchools) this.gracePeriodSchools[i].list=[]
    this.selectedGracePeriod.currentValue=null
    this.selectedGracePeriod.previousValue=null
    this.router.navigateByUrl('/manager-tools/settings')
  }


  allowedSchoolsPaginationChanged(event: paginationState) {

    this.allowedSchoolsFiltration.Page = event.page
    this.getGracePeriodSchools()
  }

  fromSchoolsPaginationChanged(event: paginationState) {
    this.fromSchoolsFiltration.Page = event.page
    this.getGracePeriodFromSchools()
  }

  toSchoolsPaginationChanged(event: paginationState) {
    this.toSchoolsFiltration.Page = event.page
    this.getGracePeriodToSchools()
  }



  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null)
    this.ngUnsubscribe.complete()
    this.confirmModalService.confirmed$.next(false)
  }
}
