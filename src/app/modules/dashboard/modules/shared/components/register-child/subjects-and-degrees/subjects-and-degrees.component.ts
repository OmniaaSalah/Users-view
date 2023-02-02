import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Table } from 'primeng/table';
import { map } from 'rxjs';
import { Filtration } from 'src/app/core/classes/filtration';
import { paginationInitialState } from 'src/app/core/classes/pagination';
import { Filter } from 'src/app/core/models/filter/filter';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { SemesterEnum } from 'src/app/shared/enums/global/global.enum';
import { StudentsService } from '../../../../students/services/students/students.service';

@Component({
  selector: 'app-subjects-and-degrees',
  templateUrl: './subjects-and-degrees.component.html',
  styleUrls: ['./subjects-and-degrees.component.scss']
})
export class SubjectsAndDegreesComponent implements OnInit {

  studentId = +this.route.snapshot.paramMap.get('id')
  childId = this.route.snapshot.paramMap.get('childId')

  btnGroupItems=[
    {label:"الفصل الاول", active: true, value:SemesterEnum.FirstSemester},
    {label:"الفصل الاخير", active: false, value:SemesterEnum.LastSemester},
    {label:"النتيجه النهائيه", active: false, value:SemesterEnum.FinalResult}
  ]

  filtration :Filter = {...Filtration,semester:0}
  paginationState= {...paginationInitialState}

  studentPerformanceModalOpend=false

  subjects={
    finalResult: '',
    percentage: 0,
    finalGPA:0,
    finalHour:0,
    totalAllData:0,
    total:0,
    list:[],
    loading:true
  }
  constructor(
    private studentsService:StudentsService,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.getSubjects()

  }


  getSubjects(){
    this.subjects.loading=true
    this.subjects.list=[]
    this.studentsService.getStudentSubjects(this.studentId||this.childId, this.filtration.semester,this.filtration)
    .pipe(map((res)=> res.result))
    .subscribe((res)=>{
      this.subjects.loading = false
      this.subjects.finalResult = res.finalResult
      this.subjects.percentage = res.percentage
      this.subjects.finalGPA=res.finalGPA
      this.subjects.finalHour=res.finalHour
      this.subjects.list = res.data
      this.subjects.totalAllData = res.totalAllData
      this.subjects.total =res.total

    },err=> {
      this.subjects.loading=false
      this.subjects.total=0
    })
  }


  openStudentPerformanceModal(){
    this.studentPerformanceModalOpend=true

  }

  onSort(e){
    if(e.order==1) this.filtration.SortBy= 'old'
    else if(e.order == -1) this.filtration.SortBy= 'update'
    this.getSubjects()
  }

  clearFilter(){
    this.getSubjects()
  }


  // onExport(fileType: FileEnum, table:Table){
  //   this.exportService.exportFile(fileType, table, this.schools.list)
  // }

  paginationChanged(event: paginationState) {
    this.filtration.Page = event.page
    this.getSubjects()

  }

}
