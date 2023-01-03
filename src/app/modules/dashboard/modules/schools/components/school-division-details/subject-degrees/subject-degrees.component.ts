import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { map } from 'rxjs';
import { Filtration } from 'src/app/core/classes/filtration';
import { paginationInitialState } from 'src/app/core/classes/pagination';
import { Filter } from 'src/app/core/models/filter/filter';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { FileEnum } from 'src/app/shared/enums/file/file.enum';
import { ExportService } from 'src/app/shared/services/export/export.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { DivisionService } from '../../../services/division/division.service';

@Component({
  selector: 'app-subject-degrees',
  templateUrl: './subject-degrees.component.html',
  styleUrls: ['./subject-degrees.component.scss']
})
export class SubjectDegreesComponent implements OnInit {

  schoolId= this.route.snapshot.paramMap.get('schoolId')
  divisionId= this.route.snapshot.paramMap.get('divisionId')

  subjectId = this.config.data.subjectId
  gradeId=this.config.data.gradeId
  semester = this.config.data.semester

  filtration:Filter = {...Filtration, schoolYearId:1,subjectid:this.subjectId, semester:this.semester}
  paginationState= {...paginationInitialState}

  editDegreeModelOpened=false

  subjectDegrees ={
    total:0,
    totalAllData:0,
    list:[],
    loading:false
  }
    
  constructor(
    private route:ActivatedRoute,
    private divisionService:DivisionService,
    private toaster:ToastService,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private exportService:ExportService,
    private translate:TranslateService
  ) { }

  ngOnInit(): void {
    
    this.getSubjectDegrees()
  }

  getSubjectDegrees(){
    this.subjectDegrees.loading=true
    this.subjectDegrees.list=[]
    this.divisionService
    .getDivisionSubjectsDegrees(this.schoolId,this.divisionId,this.filtration)
    .pipe(map(res => res.result))
    .subscribe(res=>{
      this.subjectDegrees.loading=false
      this.subjectDegrees.list = res.data
      this.subjectDegrees.totalAllData = res.totalAllData
      this.subjectDegrees.total =res.total 

    },err=> {
      this.subjectDegrees.loading=false
      this.subjectDegrees.total=0
    })
  }

  updateStudentDegree(){
    this.editDegreeModelOpened =false
    this.toaster.success('تم تعديل نوع التحسين بنجاح')
  }

  approveOrRejectDegrees(status){
    this.divisionService.approveOrRejectSubjectDegrees(this.schoolId,this.divisionId,this.gradeId,{subjectid:this.subjectId, status,semester: this.semester})
    .subscribe(res=>{
      if(status==2) this.toaster.success('تم قبول الدرجات المرفقه بنجاح')
      if(status==3) this.toaster.success('تم رفض الدرجات المرفقه بنجاح')
      this.ref.close(true);

    },()=>{
      this.toaster.error('حدث خطأز يرجى المحاوله مره اخرى')
    })
  }

  onSort(e){
    if(e.order==1) this.filtration.SortBy= 'old'
    else if(e.order == -1) this.filtration.SortBy= 'update'
    this.getSubjectDegrees();
  }

  clearFilter(){
    this.filtration.KeyWord =''
    this.getSubjectDegrees();
  }

  onExport(fileType: FileEnum){
    let filter = {...this.filtration, PageSize:null}
    this.divisionService.studentsRateToExport(this.schoolId,this.divisionId,filter).subscribe( (res) =>{
      this.exportService.exportFile(fileType, res, this.translate.instant('dashboard.schools.studentsRate'))
    })
  }

  paginationChanged(event: paginationState) {
    this.filtration.Page = event.page
    this.getSubjectDegrees();

  }

}
