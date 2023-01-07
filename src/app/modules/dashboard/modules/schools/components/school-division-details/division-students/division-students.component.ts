import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs';
import { Filtration } from 'src/app/core/classes/filtration';
import { paginationInitialState } from 'src/app/core/classes/pagination';
import { Filter } from 'src/app/core/models/filter/filter';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { Student } from 'src/app/core/models/student/student.model';
import { FileEnum } from 'src/app/shared/enums/file/file.enum';
import { ExportService } from 'src/app/shared/services/export/export.service';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { StudentsService } from '../../../../students/services/students/students.service';
import { DivisionService } from '../../../services/division/division.service';

@Component({
  selector: 'app-division-students',
  templateUrl: './division-students.component.html',
  styleUrls: ['./division-students.component.scss']
})
export class DivisionStudentsComponent implements OnInit {
  
  schoolId= this.route.snapshot.paramMap.get('schoolId')
  divisionId= this.route.snapshot.paramMap.get('divisionId')

  selectedStudent:Student= null
  divisionTracks$= this.divisionService.getDivisionTracks(this.divisionId)
  optionalSubjects$
  hasTracks
  filtration:Filter = {
    ...Filtration, 
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
      optionalSubjects: []
    })

    constructor(
      private route:ActivatedRoute,
      private divisionService:DivisionService,
      private fb:FormBuilder,
      private sharedService:SharedService,
      private exportService:ExportService,
      private translate:TranslateService

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
      this.hasTracks=res.data[0]?.grade?.hasTracks
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

  onExport(fileType:FileEnum){
    let filter = {...this.filtration, PageSize:null}
    this.divisionService.divisionStudentsToExport(this.schoolId,this.divisionId,filter).subscribe( (res) =>{
      
      this.exportService.exportFile(fileType, res, this.translate.instant('dashboard.schools.sectionStudents'))
    })
  }

  paginationChanged(event: paginationState) {
    this.filtration.Page = event.page
    this.getStudents();

  }
  
  
}
