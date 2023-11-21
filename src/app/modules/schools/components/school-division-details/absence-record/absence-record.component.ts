import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import {  finalize, map, shareReplay, Subject, takeUntil } from 'rxjs';
import { BaseSearchModel } from 'src/app/core/models/filter-search/base-search-model';
import { paginationInitialState } from 'src/app/core/helpers/pagination';
import { SearchModel } from 'src/app/core/models/filter-search/filter-search.model';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { ClaimsEnum } from 'src/app/shared/enums/claims/claims.enum';
import { FileTypeEnum } from 'src/app/shared/enums/file/file.enum';
import { SemesterEnum } from 'src/app/shared/enums/global/global.enum';
import { IndexesEnum } from 'src/app/shared/enums/indexes/indexes.enum';
import { ConfirmModelService } from 'src/app/shared/services/confirm-model/confirm-model.service';
import { ExportService } from 'src/app/shared/services/export/export.service';
import { IndexesService } from '../../../../indexes/service/indexes.service';
import { DivisionService } from '../../../services/division/division.service';
import moment from 'moment';

@Component({
  selector: 'app-absence-record',
  templateUrl: './absence-record.component.html',
  styleUrls: ['./absence-record.component.scss']
})
export class AbsenceRecordComponent implements OnInit, OnDestroy {
  ngUnSubscribe =new Subject()
  lang = inject(TranslationService).lang
  get claimsEnum () {return ClaimsEnum}
  isSubmited

  maxDate = new Date()

  absenceStudentsForm={
    date: null,
    studentAbsences:[]
   }

 schoolId = this.route.snapshot.paramMap.get('schoolId')
 divisionId = this.route.snapshot.paramMap.get('divisionId')

 absenceReason$ = this.indexesService.getIndext(IndexesEnum.TheReasonForAbsent).pipe(shareReplay())
 students

  filtration :SearchModel = {...BaseSearchModel, date:null}
  paginationState= {...paginationInitialState}

  absenceModelOpened=false


  btnGroupItems=[
    {label:this.translate.instant('shared.firstSemester'), active: true, value:SemesterEnum.FirstSemester},
    {label:this.translate.instant('shared.lastSemester'), active: false, value:SemesterEnum.LastSemester},
  ]


absenceRecord={
  totalAllData:0,
  total:0,
  list:[],
  loading:true,
  isDateSelected:null,
  totalAbsenceStudents:0,
  totalAttendantStudents:0,
  totalDivisionStudents:0
}

lastDate

  selectedRecord

  constructor(
    private divisionService: DivisionService,
    private toasterService:ToastrService,
    private route: ActivatedRoute,
    public confirmModelService: ConfirmModelService,
    private indexesService:IndexesService,
    private exportService:ExportService,
    private translate:TranslateService
    ) { }

  ngOnInit(): void {
    this.confirmDeleteListener()
    this.getLastAbsenceDate()
    // this.getAbsenceRecords()

  }

  getLastAbsenceDate(){

    this.divisionService.getLastAbsenceDate(this.divisionId).subscribe(res =>{
      let utc = moment.utc(res.result.split('+')[0]).toDate()
      this.lastDate = moment(utc).local().format('YYYY-MM-DD HH:mm:ss')
      // this.lastDate = new Date(res.result.split('+')[0])
      // this.absenceStudentsForm.date = new Date(res.result.split('+')[0])
      // this.dateSelected(new Date(res.result))
    })
  }


  dateSelected(date:Date){
    console.log(date);

    this.filtration.date = date.toDateString()
    this.absenceRecord.isDateSelected=true
    this.filtration.Page=1
    this.getAbsenceRecords()
  }

  getAbsenceRecords(){
    this.absenceRecord.loading=true
    this.absenceRecord.list=[]

    this.divisionService.getAbsenceRecords(this.schoolId, this.divisionId, this.filtration).subscribe(res=>{
      this.absenceRecord.loading = false
      this.absenceRecord.list = res?.result?.divisionAttendantListDto
      // this.absenceRecord.totalAllData = res.totalAllData ||1
      this.absenceRecord.total =res.total||5

      this.absenceRecord.totalAbsenceStudents = res?.result?.totalAbsenceStudents
      this.absenceRecord.totalAttendantStudents = res?.result?.totalAttendantStudents
      this.absenceRecord.totalDivisionStudents = res?.result?.totalDivisionStudents

    },err=> {
      this.absenceRecord.loading=false
      this.absenceRecord.total=0
    })
  }



  confirmDeleteListener(){
    this.confirmModelService.confirmed$.subscribe(val => {
      if (val) this.deleteRecord(this.selectedRecord)

    })
  }


  // <<<<<<<<<<<<<<<<<<<<<< Add students To Absence Records >>>>>>>>>>>>>>>>>>>>>>>>

  studentSearchText =new FormControl('')
  isLoading=false

  openRaisAbsenceModel(){
    this.absenceModelOpened=true
    // this.onSearchStudentsChanged()
    this.getDivisionStudents()
  }


  // onSearchStudentsChanged(){
  //   this.studentSearchText.valueChanges
  //   .pipe(
  //     startWith(''),
  //     debounceTime(1000),
  //     distinctUntilChanged(),
  //     switchMap((searchText)=>{
  //       this.isLoading=true
  //       this.students =null
  //       return this.getDivisionStudents(searchText)
  //     }),
  //     takeUntil(this.ngUnSubscribe))
  //   .subscribe(students=>{
  //         this.students =students
  //         this.absenceStudentsForm.studentAbsences = this.students

  //   })
  // }

  getDivisionStudents(searchText?){
    return this.divisionService.getDivisionStudents(this.schoolId, this.divisionId,{KeyWord:searchText || ''})
    .pipe(
      map(res => res?.result?.data || []),
      map(students=>{
        return students.map(el =>{
          return {
            studentId:el.id,
            name:el.name,
            studentNumber:el.studentNumber,
            withCause: null,
            isAbsencent: false,
            cause:null
          }
        })
      }),
      takeUntil(this.ngUnSubscribe),
      finalize(()=> this.isLoading = false))
      .subscribe(students=>{
        this.students =students
        this.absenceStudentsForm.studentAbsences = this.students

       })


  }

  // isAbsenteStudentsSelected(){
  //   return  this.absenceStudentsForm.studentAbsences.some(el => el.isAbsencent)
  //  }

  resetSelectedStudents(){
    this.absenceStudentsForm.studentAbsences = this.absenceStudentsForm.studentAbsences.map(el => ({...el , isAbsencent:false}))
  }

  addStudentsToAbsenceRecords(){
    this.isSubmited=true
    let data= {...this.absenceStudentsForm, date: this.formateDate(this.absenceStudentsForm.date)}
    this.divisionService.addAbsentStudents(this.schoolId, this.divisionId,this.absenceStudentsForm).subscribe(res=>{
      this.toasterService.success(this.translate.instant('toasterMessage.absenceRaised'));
      this.isSubmited=false
      this.absenceModelOpened = false
      // this.getAbsenceRecords()
      this.getLastAbsenceDate()
    },err=>{
      this.toasterService.error(this.translate.instant('toasterMessage.error'));
      this.isSubmited=false
    })
}


  deleteRecord(index) {
    // this.absencStudents.splice(index, 1)

    this.divisionService.deleteAbsentStudent(this.schoolId, this.divisionId,this.selectedRecord.student.id,this.filtration.date)
    .subscribe(res=>{
      this.absenceRecord.list.splice(index, 1)
      this.toasterService.success(this.translate.instant('toasterMessage.absenceStudentDeleted'));
      this.getAbsenceRecords()
    },err=>{
      this.toasterService.error(this.translate.instant('toasterMessage.error'));
    })
  }




  onSort(e){
    if(e.order==1) this.filtration.SortBy= 'old'
    else if(e.order == -1) this.filtration.SortBy= 'update'
    this.filtration.Page=1
    this.getAbsenceRecords()
  }

  clearFilter(){
    this.filtration.date =''
    this.filtration.Page=1
    this.getAbsenceRecords()
  }

  onExport(fileType: FileTypeEnum){
    this.exportService.showLoader$.next(true)
    let filter = {...this.filtration,PageSize:this.absenceRecord.totalAllData,Page:1}
    this.divisionService.absenceRecordToExport(this.schoolId,this.divisionId,filter).subscribe( (res) =>{
      this.exportService.exportFile(fileType, res, this.translate.instant('schools.absenceRecord'))
    })
  }


  paginationChanged(event: paginationState) {
    this.filtration.Page = event.page;
    this.filtration.PageSize = event.rows
    this.getAbsenceRecords()

  }

  formateDate(date :Date){
    let d = new Date(date.setHours(date.getHours() - (date.getTimezoneOffset()/60) )).toISOString()
    return d.split('.')[0]

  }

  ngOnDestroy(): void {
    this.ngUnSubscribe.next(null)
    this.ngUnSubscribe.complete()
  }

}
