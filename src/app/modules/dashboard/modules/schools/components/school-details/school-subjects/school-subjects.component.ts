import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Table } from 'primeng/table';
import { Filtration } from 'src/app/core/classes/filtration';
import { paginationInitialState } from 'src/app/core/classes/pagination';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { FileEnum } from 'src/app/shared/enums/file/file.enum';
import { GradesService } from '../../../services/grade/class.service';
import { SchoolsService } from '../../../services/schools/schools.service';

@Component({
  selector: 'app-school-subjects',
  templateUrl: './school-subjects.component.html',
  styleUrls: ['./school-subjects.component.scss']
})
export class SchoolSubjectsComponent implements OnInit {

  @Input('subjects') subjects=[]

  first = 0;
  rows = 4;
  
  subjectsObj={
    total:0,
    list:[],
    loading:true,
    totalAllData:0,
    isGradeSelected:false
  }

  filterApplied =false
  
  schoolId = this.route.snapshot.paramMap.get('schoolId')
  filtration={...Filtration, GradeId:"", TrackId:"",SchoolId :this.schoolId}
  paginationState={...paginationInitialState}
  
  schoolGrades$ =this.schoolsService.getSchoolsTracks(this.schoolId)
  gradeTracks$

  constructor(
    private schoolsService:SchoolsService,
    private route: ActivatedRoute,
    private gradesService:GradesService,
    ) { }

  ngOnInit(): void {

    // this.getSubjects()
  }


  getSubjects(){
    this.subjectsObj.loading=true
    this.subjectsObj.list=[]
    this.schoolsService.getSchoolSubjects(this.filtration).subscribe(res =>{
      this.subjectsObj.loading = false
      this.subjectsObj.list = res.data
      this.subjectsObj.total =res.total
      this.subjectsObj.totalAllData = res.totalAllData

      this.filterApplied =false
    },err=> {
      this.subjectsObj.loading=false
      this.subjectsObj.total=0
      this.filterApplied =false
    })
  }

  
  getSchoolClasses(){
    this.gradesService.getSchoolGardes(this.schoolId,this.filtration).subscribe()
  }

  getTracks(schoolId,gradeId){
    this.gradeTracks$ =this.gradesService.getGradeTracks(gradeId,schoolId)
    
  }


  onSort(e){
    console.log(e);
    this.filtration.SortBy
    this.filtration.SortColumn = e.field
    this.filtration.SortDirection = e.order
    this.getSubjects()
  }

  clearFilter(){
    this.filtration.KeyWord =''
    this.filtration.GradeId=null
    this.filtration.TrackId =null
    this.getSubjects()
  }


  onExport(fileType: FileEnum, table:Table){
    // this.exportService.exportFile(fileType, table, this.subjects)
  }

  paginationChanged(event: paginationState) {
    console.log(event);
    this.first = event.first
    this.rows = event.rows

    this.filtration.Page = event.page
    this.getSubjects()

  }

}
