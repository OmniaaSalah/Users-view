import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Filtration } from 'src/app/core/classes/filtration';
import { paginationInitialState } from 'src/app/core/classes/pagination';
import { Filter } from 'src/app/core/models/filter/filter';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { FileTypeEnum } from 'src/app/shared/enums/file/file.enum';
import { StatusEnum } from 'src/app/shared/enums/status/status.enum';
import { ExportService } from 'src/app/shared/services/export/export.service';
import { StudentsService } from '../../../../students/services/students/students.service';

@Component({
  selector: 'app-school-record',
  templateUrl: './school-record.component.html',
  styleUrls: ['./school-record.component.scss']
})
export class SchoolRecordComponent implements OnInit {

  studentId = +this.route.snapshot.paramMap.get('id')
  childId = +this.route.snapshot.paramMap.get('childId')

  get statusEnum () {return StatusEnum}

  filtration :Filter = {...Filtration,StudentId:this.studentId||this.childId}
  paginationState= {...paginationInitialState}

  record={
    totalAllData:0,
    total:0,
    list:[],
    loading:true
  }
  constructor(
    private studentsService:StudentsService,
    private route :ActivatedRoute,
    private translate: TranslateService,
    private exportService:ExportService) { }

  ngOnInit(): void {
  this.getStudentRecord()

  }


  getStudentRecord(){
    this.record.loading=true
    this.record.list=[]
    this.studentsService.getStudentRecord(this.filtration).subscribe((res)=>{
      this.record.loading = false
      this.record.list = res.result.data
      this.record.totalAllData = res.result.totalAllData
      this.record.total =res.result.total

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



  onExport(fileType: FileTypeEnum){
    let filter = {...this.filtration,PageSize:this.record.totalAllData,Page:1}
    this.studentsService.recordesToExport(filter).subscribe( (res) =>{

      this.exportService.exportFile(fileType, res, this.translate.instant('dashboard.parents.studentRecord'))
    })
  }

  paginationChanged(event: paginationState) {
    this.filtration.Page = event.page
    this.getStudentRecord()

  }


}
