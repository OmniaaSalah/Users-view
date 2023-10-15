import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { BaseSearchModel } from 'src/app/core/models/filter-search/base-search-model';
import { paginationInitialState } from 'src/app/core/helpers/pagination';
import { SearchModel } from 'src/app/core/models/filter-search/filter-search.model';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { Student } from 'src/app/core/models/student/student.model';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { ClaimsEnum } from 'src/app/shared/enums/claims/claims.enum';
import { FileTypeEnum } from 'src/app/shared/enums/file/file.enum';
import { UserScope } from 'src/app/shared/enums/user/user.enum';
import { ExportService } from 'src/app/shared/services/export/export.service';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { DivisionService } from '../../../services/division/division.service';

@Component({
  selector: 'app-division-students',
  templateUrl: './division-students.component.html',
  styleUrls: ['./division-students.component.scss']
})
export class DivisionStudentsComponent implements OnInit {
  @Input('hasTracks') isGradeHaveTracks
  @Input() gradeId


  get userScope() { return UserScope }
  get claimsEnum () {return ClaimsEnum}


  currentUserScope = inject(UserService).getScope()
  lang=inject(TranslationService).lang

  schoolId= this.route.snapshot.paramMap.get('schoolId')
  divisionId= this.route.snapshot.paramMap.get('divisionId')

  selectedStudent:Student= null
  divisionTracks$= this.divisionService.getDivisionTracks(this.divisionId)
  optionalSubjects$
  filtration:SearchModel = {
    ...BaseSearchModel,
    schoolYearId:1,
    TrackId:''
  }
  paginationState= {...paginationInitialState}

    students ={
      total:0,
      totalAllData:0,
      list:[],
      loading:false
    }


    changeTrackModelOpened=false


    changeTrackForm= this.fb.group({
      studentId: ['', Validators.required],
      trackId: ['', Validators.required],
      optionalSubjects: [[]]
    })

    constructor(
      private route:ActivatedRoute,
      private divisionService:DivisionService,
      private fb:FormBuilder,
      private sharedService:SharedService,
      private exportService:ExportService,
      private translate:TranslateService,
      private toaster:ToastrService,

    ) { }

  ngOnInit(): void {
    this.getStudents()
  }

  getStudents(){
    this.students.loading=true
    this.students.list=[]
    this.divisionService
    .getDivisionStudents(this.schoolId,this.divisionId,this.filtration)
    .pipe(map(res => res.result))
    .subscribe(res=>{
      this.students.loading=false
      this.students.list = res.data
      this.students.totalAllData = res.totalAllData
      this.students.total =res.total

    },err=> {
      this.students.loading=false
      this.students.total=0
    })
  }


  onTrackInputChange(trackId){
    this.optionalSubjects$ = this.sharedService.getAllOptionalSubjects({schoolId: this.schoolId, gradeId:this.selectedStudent.grade.id, trackId: trackId})
  }

  openChangeTrackModel(student){
    this.selectedStudent = student
    this.changeTrackForm.controls.studentId.setValue(student.id)
    this.changeTrackForm.controls.trackId.setValue(student.trackId)
    this.optionalSubjects$=this.sharedService.getAllOptionalSubjects({schoolId: this.schoolId, gradeId:1, trackId: student.trackId})
    this.changeTrackModelOpened =true
  }

  changeStudentTrack(studentData){
    this.divisionService.changeStudentTrack(this.schoolId,this.gradeId,this.divisionId,studentData)
    .subscribe(res=>{
      this.changeTrackModelOpened =false
      this.toaster.success(this.translate.instant('toasterMessage.successUpdate'))
      this.getStudents()
    },()=>{
      this.toaster.error(this.translate.instant('toasterMessage.error'))
    })
  }

  onSort(e){
    if(e.order==1) this.filtration.SortBy= 'old'
    else if(e.order == -1) this.filtration.SortBy= 'update'
    this.filtration.Page=1;
    this.getStudents();
  }

  clearFilter(){
    this.filtration.KeyWord =''
    this.filtration.TrackId = null
    this.filtration.Page=1;
    this.getStudents();
  }

  onExport(fileType:FileTypeEnum){
    this.exportService.showLoader$.next(true)
    let filter = {...this.filtration,PageSize:this.students.total,Page:1}
    this.divisionService.divisionStudentsToExport(this.schoolId,this.divisionId,filter).subscribe( (res) =>{

      this.exportService.exportFile(fileType, res, this.translate.instant('dashboard.schools.sectionStudents'))
    })
  }

  paginationChanged(event: paginationState) {
    this.filtration.Page = event.page
    this.filtration.PageSize = event.rows
    this.getStudents();

  }


}
