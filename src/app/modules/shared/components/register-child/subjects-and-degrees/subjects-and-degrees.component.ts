import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Table } from 'primeng/table';
import { map } from 'rxjs';
import { Filtration } from 'src/app/core/helpers/filtration';
import { paginationInitialState } from 'src/app/core/helpers/pagination';
import { Filter } from 'src/app/core/models/filter/filter';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { FileTypeEnum } from 'src/app/shared/enums/file/file.enum';
import { SemesterEnum } from 'src/app/shared/enums/global/global.enum';
import { ExportService } from 'src/app/shared/services/export/export.service';
import { StudentsService } from '../../../../students/services/students/students.service';

@Component({
  selector: 'app-subjects-and-degrees',
  templateUrl: './subjects-and-degrees.component.html',
  styleUrls: ['./subjects-and-degrees.component.scss']
})
export class SubjectsAndDegreesComponent implements OnInit {

  studentId = this.route.snapshot.paramMap.get('id')
  childId = this.route.snapshot.paramMap.get('childId')

  btnGroupItems=[
    {label:this.translate.instant('shared.firstSemester'), active: true, value:SemesterEnum.FirstSemester},
    {label:this.translate.instant('shared.lastSemester'), active: false, value:SemesterEnum.LastSemester},
    {label:this.translate.instant('shared.finalResult'), active: false, value:SemesterEnum.FinalResult}
  ]

  filtration :Filter = {...Filtration,semester:0}
  paginationState= {...paginationInitialState}

  studentPerformanceModalOpend=false

  subjects={
    finalResult: '',
    percentage: 0,
    finalGPA:0,
    finalHour:0,
    isHaveStudentPerformance:false,
    totalAllData:0,
    total:0,
    list:[],
    loading:true,
  }
  constructor(
    private studentsService:StudentsService,
    private route:ActivatedRoute,
    private translate: TranslateService,
    private exportService:ExportService) { }

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
      this.subjects.isHaveStudentPerformance =res.isHaveStudentPerformance

    },err=> {
      this.subjects.loading=false
      this.subjects.total=0
    })
  }

  studentPerformanceTodisplay

  openStudentPerformanceModal(text){
    this.studentPerformanceModalOpend=true
    this.studentPerformanceTodisplay = text
  }

  onSort(e){
    if(e.order==1) this.filtration.SortBy= 'old'
    else if(e.order == -1) this.filtration.SortBy= 'update'
    this.getSubjects()
  }

  clearFilter(){
    this.getSubjects()
  }


  onExport(fileType: FileTypeEnum){
    this.exportService.showLoader$.next(true)
    let filter = {...this.filtration,PageSize:null,Page:1}
    this.studentsService.studentSubjectsToExport(this.studentId||this.childId, this.filtration.semester,filter).subscribe( (res) =>{

      this.exportService.exportFile(fileType, res, this.translate.instant('dashboard.parents.studentRecord'))
    })
  }

  paginationChanged(event: paginationState) {
    this.filtration.Page = event.page
    this.getSubjects()

  }

}
