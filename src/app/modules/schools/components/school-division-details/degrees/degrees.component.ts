import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

import { Filtration } from 'src/app/core/helpers/filtration';
import { paginationInitialState } from 'src/app/core/helpers/pagination';
import { Filter } from 'src/app/core/models/filter/filter';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { SemesterEnum } from 'src/app/shared/enums/global/global.enum';
import { DivisionService } from '../../../services/division/division.service';
import * as FileSaver from 'file-saver';
import { HttpStatusCodeEnum } from 'src/app/shared/enums/http-status-code/http-status-code.enum';
import { FileTypeEnum } from 'src/app/shared/enums/file/file.enum';
import { ExportService } from 'src/app/shared/services/export/export.service';
import { ClaimsEnum } from 'src/app/shared/enums/claims/claims.enum';
import { SettingsService } from 'src/app/modules/system-setting/services/settings/settings.service';
import { GracePeriodEnum } from 'src/app/shared/enums/settings/settings.enum';

@Component({
  selector: 'app-degrees',
  templateUrl: './degrees.component.html',
  styleUrls: ['./degrees.component.scss']
})
export class DegreesComponent implements OnInit {
  @Output() onStepChanged = new EventEmitter();
  get fileTypesEnum () {return FileTypeEnum}

  get claimsEnum () {return ClaimsEnum}



  lang=this.TranslationService.lang
  schoolId= +this.route.snapshot.paramMap.get('schoolId')
  divisionId= this.route.snapshot.paramMap.get('divisionId')

  isSchoolAllowToUploadDegrees$=this.settingService.isSchoolExistInGracePeriod({schoolId:this.schoolId, code:GracePeriodEnum.raisDegreesFirstClass})

  subjects$=this.divisionService.getAllSubjects(this.divisionId)

  filtration:Filter = {...Filtration, semester:0}
  paginationState= {...paginationInitialState}

  btnGroupItems=[
    {label:this.translate.instant('shared.firstSemester'), active: true, value:SemesterEnum.FirstSemester},
    {label:this.translate.instant('shared.lastSemester'), active: false, value:SemesterEnum.LastSemester},
    {label:this.translate.instant('shared.finalResult'), active: false, value:SemesterEnum.FinalResult}
  ]

  studentPerformanceModalOpend=false
  degreeseModelOpened=false

  selectedSemesterLable=this.btnGroupItems[0].label
  selectedSubjectId
  subjectDegreesStatus:'Accepted' | 'Rejected' | 'Pending' | null=null

  degreesFileUrl
  isSubmited=false

  studentPerformanceTodisplay

  degrees ={
    total:0,
    totalAllData:0,
    list:[],
    loading:false,
    isHaveStudentPerformance:null
  }


  constructor(
    private translate:TranslateService,
    private TranslationService:TranslationService,
    public toaster: ToastrService,
    private route:ActivatedRoute,
    private settingService:SettingsService,
    private divisionService:DivisionService,
    private exportService:ExportService,) { }

  ngOnInit(): void {
    this.getDivisionDegrees()
  }

  semesterChanged(semester){

    this.filtration.semester=semester;
    this.selectedSemesterLable = this.btnGroupItems.find(el=>el.value===semester).label
    this.getDivisionDegrees()
    if(semester==SemesterEnum.LastSemester){
      this.isSchoolAllowToUploadDegrees$=this.settingService.isSchoolExistInGracePeriod({schoolId:this.schoolId, code:GracePeriodEnum.raisDegreesLastClass})
    }else if(semester==SemesterEnum.FirstSemester){
      this.isSchoolAllowToUploadDegrees$=this.settingService.isSchoolExistInGracePeriod({schoolId:this.schoolId, code:GracePeriodEnum.raisDegreesFirstClass})
    }

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
      this.degrees.isHaveStudentPerformance =this.degrees.list[0]?.isHaveStudentPerformance
      this.degrees.totalAllData = res.totalAllData
      this.degrees.total =res.total

    },err=> {
      this.degrees.loading=false
      this.degrees.total=0
    })
  }

  openStudentPerformanceModal(text:string){
    this.studentPerformanceModalOpend=true
    this.studentPerformanceTodisplay = text
  }

  checkDegreesExist(subjectid){
    this.selectedSubjectId = subjectid
    this.divisionService.checkSubjectDegreesExist(this.schoolId,this.divisionId,{subjectid:subjectid,semester:this.filtration.semester})
    .subscribe(res=>{
      this.subjectDegreesStatus=res.result
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
    this.divisionService.addSubjectDegrees(this.schoolId,this.divisionId,this.degreesFileUrl,{subjectid: this.selectedSubjectId,semester:this.filtration.semester})
    .pipe(map(res=>{
      if(!res.result){
        let error:any =this.toaster.error(this.translate.instant("toasterMessage.error"))

          switch (res.statusCode) {
            case HttpStatusCodeEnum.BadRequest:
              error = this.toaster.error(this.translate.instant("toasterMessage.degreesShouldBeEntered"))
            break;
            case HttpStatusCodeEnum.MethodNotAllowed:
              error = this.toaster.error(this.translate.instant("toasterMessage.userNotAllowedToUploadDegrees"))

            break;
            case HttpStatusCodeEnum.NonAuthoritativeInformation:
              error = this.toaster.error(this.translate.instant("toasterMessage.userNotAllowedToUploadDegrees"))
            break;
            case HttpStatusCodeEnum.NotAcceptable:
            // Created
            error =  res?.errorLocalized ? res?.errorLocalized[this.lang] : this.toaster.error(this.translate.instant("toasterMessage.fileDataShouldBeReviewed"))
            break;

          }
          throw  new Error(error)
      }else{
        return res
      }
    }))
    .subscribe(res=>{
      this.isSubmited=false
      this.toaster.success(this.translate.instant("toasterMessage.degreesUploaded"))
      this.degreeseModelOpened=false
      this.degreesFileUrl=null
      this.subjectDegreesStatus=null
      this.selectedSubjectId=null


    },(err)=>{
      this.isSubmited=false
      this.toaster.error(err.message)
    })
  }

  onSort(e){
    if(e.order==1) this.filtration.SortBy= 'old'
    else if(e.order == -1) this.filtration.SortBy= 'update'
    this.filtration.Page=1;
    this.getDivisionDegrees()
  }

  clearFilter(){
    this.filtration.Page=1;
    this.getDivisionDegrees()
  }


  onExport(fileType: FileTypeEnum){
    this.exportService.showLoader$.next(true)
    let filter = {...this.filtration,PageSize:this.degrees.totalAllData,Page:1}
    this.divisionService.degreesToExport(this.schoolId,this.divisionId,filter).subscribe( (res) =>{
      this.exportService.exportFile(fileType, res, this.translate.instant('dashboard.schools.annualDegrees'))
    })
  }

  paginationChanged(event: paginationState) {
    this.filtration.Page = event.page
    this.getDivisionDegrees()

  }


}
