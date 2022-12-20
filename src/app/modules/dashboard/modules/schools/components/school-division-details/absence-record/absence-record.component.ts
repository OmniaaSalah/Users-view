import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, distinctUntilChanged, finalize, map, startWith, Subject, switchMap, takeUntil } from 'rxjs';
import { Filtration } from 'src/app/core/classes/filtration';
import { paginationInitialState } from 'src/app/core/classes/pagination';
import { Filter } from 'src/app/core/models/filter/filter';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { SemesterEnum } from 'src/app/shared/enums/global/global.enum';
import { IndexesEnum } from 'src/app/shared/enums/indexes/indexes.enum';
import { ConfirmModelService } from 'src/app/shared/services/confirm-model/confirm-model.service';
import { IndexesService } from '../../../../indexes/service/indexes.service';
import { DivisionService } from '../../../services/division/division.service';

@Component({
  selector: 'app-absence-record',
  templateUrl: './absence-record.component.html',
  styleUrls: ['./absence-record.component.scss']
})
export class AbsenceRecordComponent implements OnInit, OnDestroy {
  ngUnSubscribe =new Subject()
  lang = inject(TranslationService).lang

  faClose=faClose
  selectedStudents=[]

  absenceStudentsForm={
    date: null,
    studentAbsences:[]
   }
   
 schoolId = this.route.snapshot.paramMap.get('schoolId')
 divisionId = this.route.snapshot.paramMap.get('divisionId')

 absenceReason$ = this.indexesService.getIndext(IndexesEnum.TheReasonForAbsent)
 students

  filtration :Filter = {...Filtration, date:null}
  paginationState= {...paginationInitialState}

  absenceModelOpened=false

  
  btnGroupItems=[
    {label:"الفصل الاول", active: false, value:SemesterEnum.FirstSemester},
    {label:"الفصل الاخير", active: false, value:SemesterEnum.LastSemester},
  ]


absenceRecord={
  totalAllData:0,
  total:0,
  list:[],
  loading:true,
  isDateSelected:null
}


  selectedRecord

  constructor(
    private divisionService: DivisionService,
    private toasterService:ToastrService,
    private route: ActivatedRoute,
    public confirmModelService: ConfirmModelService,
    private indexesService:IndexesService
    ) { }

  ngOnInit(): void {
    this.confirmDeleteListener()
    // this.getAbsenceRecords()
  }


  dateSelected(date:Date){
    this.filtration.date = date.toDateString()
    this.getAbsenceRecords()
  }

  getAbsenceRecords(){
    this.absenceRecord.loading=true
    this.absenceRecord.list=[]

    this.divisionService.getAbsenceRecords(this.schoolId, this.divisionId, this.filtration).subscribe(res=>{
      this.absenceRecord.loading = false
      this.absenceRecord.list = res.result
      this.absenceRecord.totalAllData = res.totalAllData ||1
      this.absenceRecord.total =res.total||5
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
    this.onSearchStudentsChanged()
  }


  onSearchStudentsChanged(){
    this.studentSearchText.valueChanges
    .pipe(
      startWith(''),
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap((searchText)=>{
        this.isLoading=true
        this.students =null
        return this.getDivisionStudents(searchText)
      }),
      takeUntil(this.ngUnSubscribe))
    .subscribe(students=>{
          this.students =students
          this.absenceStudentsForm.studentAbsences = students
        
    })
  }

  getDivisionStudents(searchText?){
    return this.divisionService.getDivisionStudents(this.schoolId, this.divisionId,{KeyWord:searchText || ''})
    .pipe(
      map(res => res.result.data),
      map(students=>{
        return students.map(el =>{
          return {
            name:el.name,
            studentNumber:el.studentNumber,
            withCause:0,
            isAbsencent: false,
            cause:null
          }
        })
      }),
      takeUntil(this.ngUnSubscribe),
      finalize(()=> this.isLoading = false))



  }

  addStudentsToAbsenceRecords(){
        this.absenceModelOpened = false

    this.divisionService.addAbsentStudents(this.schoolId, this.divisionId,this.absenceStudentsForm).subscribe(res=>{
      this.toasterService.success('تم اضافه الطلاب الى سجل الغياب بنجاح');
      this.getAbsenceRecords()
    })
}

  deleteRecord(index) {
    // this.absencStudents.splice(index, 1)
    
    this.divisionService.deleteAbsentStudent(this.schoolId, this.divisionId,this.selectedRecord.student.id,this.filtration.date)
    .subscribe(res=>{
      this.absenceRecord.list.splice(index, 1)
      this.toasterService.success('تم حذف الطالب من سجل الغياب بنجاح');
      this.getAbsenceRecords()
    })
  }




  onSort(e){
    if(e.order==1) this.filtration.SortBy= 'old'
    else if(e.order == -1) this.filtration.SortBy= 'update'
    this.getAbsenceRecords()
  }

  clearFilter(){
    this.filtration.date =''
    this.getAbsenceRecords()
  }

  // onExport(fileType: FileEnum, table:Table){
  //   this.exportService.exportFile(fileType, table, this.schools.list)
  // }


  paginationChanged(event: paginationState) {
    this.filtration.Page = event.page
    this.getAbsenceRecords()

  }

  ngOnDestroy(): void {
    this.ngUnSubscribe.next(null)
    this.ngUnSubscribe.complete()
  }

}
