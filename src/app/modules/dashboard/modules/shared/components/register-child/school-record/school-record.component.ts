import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Filtration } from 'src/app/core/classes/filtration';
import { paginationInitialState } from 'src/app/core/classes/pagination';
import { Filter } from 'src/app/core/models/filter/filter';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { StatusEnum } from 'src/app/shared/enums/status/status.enum';
import { StudentsService } from '../../../../students/services/students/students.service';

@Component({
  selector: 'app-school-record',
  templateUrl: './school-record.component.html',
  styleUrls: ['./school-record.component.scss']
})
export class SchoolRecordComponent implements OnInit {

  studentId = +this.route.snapshot.paramMap.get('id')

  get statusEnum () {return StatusEnum}

  filtration :Filter = {...Filtration,StudentId:this.studentId}
  paginationState= {...paginationInitialState}

  record={
    totalAllData:0,
    total:0,
    list:[],
    loading:true
  }
  constructor(
    private studentsService:StudentsService,
    private route :ActivatedRoute) { }

  ngOnInit(): void {
  this.getStudentRecord()

  }


  getStudentRecord(){
    this.record.loading=true
    this.record.list=[]
    this.studentsService.getStudentRecord(this.filtration).subscribe((res)=>{
      this.record.loading = false
      this.record.list = res.data
      this.record.totalAllData = res.totalAllData
      this.record.total =res.total

    },err=> {
      this.record.loading=false
      this.record.total=0
    })
  }



  onSort(e){
    if(e.order==1) this.filtration.SortBy= 'old'
    else if(e.order == -1) this.filtration.SortBy= 'update'
    this.getStudentRecord()
  }


  // onExport(fileType: FileEnum, table:Table){
  //   this.exportService.exportFile(fileType, table, this.schools.list)
  // }

  paginationChanged(event: paginationState) {
    this.filtration.Page = event.page
    this.getStudentRecord()

  }


}
