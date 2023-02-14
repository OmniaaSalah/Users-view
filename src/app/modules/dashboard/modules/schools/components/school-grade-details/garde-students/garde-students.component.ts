import { Component, inject, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs';
import { Filtration } from 'src/app/core/classes/filtration';
import { paginationInitialState } from 'src/app/core/classes/pagination';
import { Filter } from 'src/app/core/models/filter/filter';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { Student } from 'src/app/core/models/student/student.model';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { FileEnum } from 'src/app/shared/enums/file/file.enum';
import { ExportService } from 'src/app/shared/services/export/export.service';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { DivisionService } from '../../../services/division/division.service';
import { GradesService } from '../../../services/grade/grade.service';

@Component({
  selector: 'app-garde-students',
  templateUrl: './garde-students.component.html',
  styleUrls: ['./garde-students.component.scss']
})
export class GardeStudentsComponent implements OnInit {
  lang = inject(TranslationService).lang
  
  schoolId= this.route.snapshot.paramMap.get('schoolId')
  gradeId= this.route.snapshot.paramMap.get('gradeId')

  filtration:Filter = {
    ...Filtration,
    DivisionId:''
  }


  gradeDivisions$ = this.gradeService.getGradeDivision(this.schoolId, this.gradeId).pipe(map(res => res?.data))

  paginationState= {...paginationInitialState}

    students ={
      total:0,
      totalAllData:0,
      list:[],
      loading:false
    }
  

    changeTrackForm= this.fb.group({
      studentId: ['', Validators.required],
      trackId: ['', Validators.required],
      optionalSubjects: []
    })

    constructor(
      private route:ActivatedRoute,
      private divisionService:DivisionService,
      private gradeService:GradesService,
      private fb:FormBuilder,
      private exportService:ExportService,
      private translate:TranslateService

    ) { }

  ngOnInit(): void {
    this.getStudents()
  }

  getStudents(){
    this.students.loading=true
    this.students.list=[]
    this.gradeService
    .getGradeStudents(this.schoolId,this.gradeId,this.filtration)
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


  getGradeDivisions(){

  }
  onSort(e){
    if(e.order==1) this.filtration.SortBy= 'old'
    else if(e.order == -1) this.filtration.SortBy= 'update'
    this.filtration.Page=1;
    this.getStudents();
  }

  clearFilter(){
    this.filtration.KeyWord =''
    this.filtration.DivisionId = null
    this.filtration.Page=1;
    this.getStudents();
  }

  onExport(fileType:FileEnum){
    let filter = {...this.filtration, PageSize:null}
    this.gradeService.gradeStudentsToExport(this.schoolId,this.gradeId,filter).subscribe( (res) =>{
      
      this.exportService.exportFile(fileType, res, this.translate.instant('dashboard.schools.gradeStudents'))
    })
  }

  paginationChanged(event: paginationState) {
    this.filtration.Page = event.page
    this.getStudents();

  }
}
