import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

import { Filtration } from 'src/app/core/classes/filtration';
import { paginationInitialState } from 'src/app/core/classes/pagination';
import { Filter } from 'src/app/core/models/filter/filter';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { SemesterEnum } from 'src/app/shared/enums/global/global.enum';
import { ConfirmModelService } from 'src/app/shared/services/confirm-model/confirm-model.service';
import { DivisionService } from '../../../services/division/division.service';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-degrees',
  templateUrl: './degrees.component.html',
  styleUrls: ['./degrees.component.scss']
})
export class DegreesComponent implements OnInit {

  lang=this.TranslationService.lang
  schoolId= this.route.snapshot.paramMap.get('schoolId')
  divisionId= this.route.snapshot.paramMap.get('divisionId')

  subjects$=this.divisionService.getDivisionSubjects(this.schoolId,this.divisionId,{})
  .pipe(map(res=>res.result.data.map(el=> ({id:el.subjectId,name:el.subjectName}))))

  filtration:Filter = {...Filtration, semester:0}
  paginationState= {...paginationInitialState}
  
  btnGroupItems=[
    {label:this.translate.instant('shared.firstSemester'), active: false, value:SemesterEnum.FirstSemester},
    {label:this.translate.instant('shared.lastSemester'), active: false, value:SemesterEnum.LastSemester},
    {label:this.translate.instant('shared.finalResult'), active: false, value:SemesterEnum.FinalResult}
  ]

  studentPerformanceModalOpend=false
  degreeseModelOpened=false

  selectedSemesterLable=this.btnGroupItems[0].label
  selectedSubjectId
  isDegreesUploadedBefore=false
  degreesFileUrl
  isSubmited=false


  degrees ={
    total:0,
    totalAllData:0,
    list:[],
    loading:false
  }

  
  constructor(
    private translate:TranslateService,
    private TranslationService:TranslationService,
    public toaster: ToastrService,
    private route:ActivatedRoute,
    private divisionService:DivisionService,) { }

  ngOnInit(): void {
  }

  semesterChanged(semester){
    this.filtration.semester=semester; 
    this.selectedSemesterLable = this.btnGroupItems.find(el=>el.value=semester).label
    this.getDivisionDegrees()
  }

  getDivisionDegrees(){
    this.degrees.loading=true
    this.degrees.list=[]
    this.divisionService
    .getDivisionDegrees(this.schoolId,this.divisionId,this.filtration)
    .pipe(map(res => res.result))
    .subscribe(res=>{
      this.degrees.loading=false
      this.degrees.list = res.data
      this.degrees.totalAllData = res.totalAllData
      this.degrees.total =res.total 

    },err=> {
      this.degrees.loading=false
      this.degrees.total=0
    })
  }

  openStudentPerformanceModal(){
    this.studentPerformanceModalOpend=true

  }

  checkDegreesExist(subjectid){
    this.selectedSubjectId = subjectid
    this.divisionService.checkSubjectDegreesExist(this.schoolId,this.divisionId,{subjectid:1,semester:1})
    .subscribe(res=>{
      this.isDegreesUploadedBefore=res.result
    })
  }

  getSubjectDegreesExcel(){
    this.divisionService.getSubjectDegreesExcel(this.schoolId,this.divisionId, this.selectedSubjectId)
    .subscribe(res=>{
      FileSaver.saveAs(res,'درجات الماده' + new Date().getTime() + '.xlsx');
    })
  }


  addSubjectDegrees(){
    this.isSubmited=true
    this.divisionService.addSubjectDegrees(this.schoolId,this.divisionId,this.degreesFileUrl,{subjectid:1,semester:1})
    .subscribe(res=>{
      this.isSubmited=false
      this.toaster.success('تم رفع درجات الماده بنجاح')
      this.degreeseModelOpened=false
      this.degreesFileUrl=null
      this.isDegreesUploadedBefore=false
      this.selectedSubjectId=null

    },err=>{
      this.isSubmited=false
      this.toaster.error('حدث خطأ يرجى المحاوله مره اخرى')
    })
  }
  
  onSort(e){
    if(e.order==1) this.filtration.SortBy= 'old'
    else if(e.order == -1) this.filtration.SortBy= 'update'
    this.getDivisionDegrees()
  }

  clearFilter(){
    this.getDivisionDegrees()
  }


  // onExport(fileType: FileEnum, table:Table){
  //   this.exportService.exportFile(fileType, table, this.schools.list)
  // }

  paginationChanged(event: paginationState) {
    this.filtration.Page = event.page
    this.getDivisionDegrees()

  }


}
