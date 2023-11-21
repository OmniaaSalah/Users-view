import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BaseSearchModel } from 'src/app/core/models/filter-search/base-search-model';
import { paginationInitialState } from 'src/app/core/helpers/pagination';
import { SearchModel } from 'src/app/core/models/filter-search/filter-search.model';
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

  studentId = this.route.snapshot.paramMap.get('id')
  childId = this.route.snapshot.paramMap.get('childId')

  get statusEnum () {return StatusEnum}

  filtration :SearchModel = {...BaseSearchModel,StudentId:this.studentId||this.childId}
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
    this.exportService.showLoader$.next(true)
    let filter = {...this.filtration,PageSize:this.record.totalAllData,Page:1}
    this.studentsService.recordesToExport(filter).subscribe( (res) =>{

      this.exportService.exportFile(fileType, res, this.translate.instant('parents.studentRecord'))
    })
  }

  paginationChanged(event: paginationState) {
    this.filtration.Page = event.page
    this.filtration.PageSize = event.rows
    this.getStudentRecord()

  }


}
