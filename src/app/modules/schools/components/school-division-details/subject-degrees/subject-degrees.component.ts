import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { map } from 'rxjs';
import { BaseSearchModel } from 'src/app/core/models/filter-search/base-search-model';
import { paginationInitialState } from 'src/app/core/helpers/pagination';
import { SearchModel } from 'src/app/core/models/filter-search/filter-search.model';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { ClaimsEnum } from 'src/app/shared/enums/claims/claims.enum';
import { FileTypeEnum } from 'src/app/shared/enums/file/file.enum';
import { IndexesEnum } from 'src/app/shared/enums/indexes/indexes.enum';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { IndexesService } from '../../../../indexes/service/indexes.service';
import { DivisionService } from '../../../services/division/division.service';
import * as FileSaver from 'file-saver';
import { SettingsService } from 'src/app/modules/system-setting/services/settings/settings.service';
import { GracePeriodEnum } from 'src/app/shared/enums/settings/settings.enum';


@Component({
  selector: 'app-subject-degrees',
  templateUrl: './subject-degrees.component.html',
  styleUrls: ['./subject-degrees.component.scss']
})
export class SubjectDegreesComponent implements OnInit {

  get claimsEnum () {return ClaimsEnum}

  lang = inject(TranslationService).lang
  schoolId= +this.route.snapshot.paramMap.get('schoolId')
  divisionId= +this.route.snapshot.paramMap.get('divisionId')

  subjectId = this.config.data.subjectId
  subjectStatus = this.config.data.status
  gradeId=this.config.data.gradeId
  semester = this.config.data.semester

  filtration:SearchModel = {...BaseSearchModel, schoolYearId:1,subjectid:this.subjectId, semester:this.semester}
  paginationState= {...paginationInitialState}

  ImprovementOptions$=this.indexService.getIndext(IndexesEnum.ModifyStudentResult)
  isSchoolAllowToUpdateDegrees$=this.settingService.isSchoolExistInGracePeriod({schoolId:this.schoolId, code:GracePeriodEnum.updateDegreesAfterApproved})

  editDegreeModelOpened=false

  stuentToImproveDegree

 selectedImprovement

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
    private translate:TranslateService,
    private indexService:IndexesService,
    private settingService:SettingsService,
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
    let student = {
      studentDegree: this.stuentToImproveDegree.studentDegree,
      isPass: this.stuentToImproveDegree.isPass,
      studentGPA: this.stuentToImproveDegree.studentGPA,
      studentHour: this.stuentToImproveDegree.studentHour,
      improveId: this.selectedImprovement
    }
    this.divisionService.improvementStudentDegree(this.schoolId,this.divisionId,this.stuentToImproveDegree.id, this.subjectId,student).subscribe(res=>{

      this.toaster.success(this.translate.instant('toasterMessage.DegreeImproved'))
      this.getSubjectDegrees()
      this.stuentToImproveDegree=null
      this.selectedImprovement=null
      this.editDegreeModelOpened =false
    },()=>{
      this.toaster.error(this.translate.instant('toasterMessage.error'))
    })
  }

  approveOrRejectDegrees(status){
    this.divisionService.approveOrRejectSubjectDegrees(this.schoolId,this.divisionId,this.gradeId,{subjectid:this.subjectId, status,semester: this.semester})
    .subscribe(res=>{
      if(status==2) this.toaster.success(this.translate.instant('toasterMessage.degreesAccepted'))
      if(status==3) this.toaster.success(this.translate.instant('toasterMessage.degreesRejected'))
      this.ref.close(true);

    },()=>{
      this.toaster.error(this.translate.instant('toasterMessage.error'))
    })
  }

  onSort(e){
    if(e.order==1) this.filtration.SortBy= 'old'
    else if(e.order == -1) this.filtration.SortBy= 'update'
    this.filtration.Page=1;
    this.getSubjectDegrees();
  }

  clearFilter(){
    this.filtration.KeyWord =''
    this.filtration.Page=1;
    this.getSubjectDegrees();
  }

  onExport(fileType: FileTypeEnum){
    this.divisionService.getDegreesExel(this.schoolId,this.divisionId, this.subjectId).subscribe(res=>{
      FileSaver.saveAs(res,'درجات الماده' + new Date().getTime() + '.xlsx');

    })
    // let filter = {...this.filtration, PageSize:null}
    // this.divisionService.subjectsDegreesToExport(this.schoolId,this.divisionId,filter).subscribe( (res) =>{
    //   this.exportService.exportFile(fileType, res, this.translate.instant('schools.studentsRate'))
    // })
  }

  paginationChanged(event: paginationState) {
    this.filtration.Page = event.page
    this.filtration.PageSize = event.rows
    this.getSubjectDegrees();

  }

}
