import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DialogService } from 'primeng/dynamicdialog';
import { map, Subject, takeUntil } from 'rxjs';
import { Filtration } from 'src/app/core/classes/filtration';
import { paginationInitialState } from 'src/app/core/classes/pagination';
import { Filter } from 'src/app/core/models/filter/filter';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { FileEnum } from 'src/app/shared/enums/file/file.enum';
import { SemesterEnum } from 'src/app/shared/enums/global/global.enum';
import { StatusEnum } from 'src/app/shared/enums/status/status.enum';
import { ExportService } from 'src/app/shared/services/export/export.service';
import { DivisionService } from '../../../services/division/division.service';
import { SubjectDegreesComponent } from '../subject-degrees/subject-degrees.component';

@Component({
  selector: 'app-division-subjects',
  templateUrl: './division-subjects.component.html',
  styleUrls: ['./division-subjects.component.scss'],
  providers: [DialogService]
})
export class DivisionSubjectsComponent implements OnInit, OnDestroy {
  @Input() gradId=null
  @Input() gradeHaveTracks=false

  ngDestroy$=new Subject()

  get statusEnum() {return StatusEnum}
  schoolId= this.route.snapshot.paramMap.get('schoolId')
  divisionId= this.route.snapshot.paramMap.get('divisionId')

  filtration:Filter = {...Filtration, semester:0}
  paginationState= {...paginationInitialState}

  btnGroupItems=[
    {label: this.translate.instant('shared.firstSemester'), active: false, value: SemesterEnum.FirstSemester},
    {label: this.translate.instant('shared.lastSemester'), active: false, value:SemesterEnum.LastSemester},
    {label: this.translate.instant('shared.finalResult'), active: false, value:SemesterEnum.FinalResult}
  ]

  selectedSemester=this.btnGroupItems[0].value

    subjects ={
      total:0,
      totalAllData:0,
      list:[],
      loading:false
    }
    
  constructor(
    private route:ActivatedRoute,
    private divisionService:DivisionService,
    public dialogService: DialogService,
    private exportService:ExportService,
    private translate:TranslateService
  ) { }


  ngOnInit(): void {
    this.getSubjects()
  }

  getSubjects(){
    this.subjects.loading=true
    this.subjects.list=[]
    this.divisionService
    .getDivisionSubjects(this.schoolId,this.divisionId,this.filtration)
    .pipe(map(res => res.result))
    .subscribe(res=>{
      this.subjects.loading=false
      this.subjects.list = res.data
      this.subjects.totalAllData = res.totalAllData
      this.subjects.total =res.total 

    },err=> {
      this.subjects.loading=false
      this.subjects.total=0
    })
  }

  
  openSubjectDegrees(subject){
    const ref = this.dialogService.open(SubjectDegreesComponent, {
      data: {
        subjectId: subject.subjectId,
        status: subject.subjecttStatus,
        gradeId:this.gradId,
        semester: this.selectedSemester
      },
      width: '70%',
      height:'90%'
    });

    ref.onClose.pipe(takeUntil(this.ngDestroy$)).subscribe((val) => {
      if(val) this.getSubjects()
  });
  }


  onSort(e){
    if(e.order==1) this.filtration.SortBy= 'old'
    else if(e.order == -1) this.filtration.SortBy= 'update'
    this.filtration.Page=1;
    this.getSubjects();
  }

  clearFilter(){
    this.filtration.KeyWord =''
    this.filtration.Page=1;
    this.getSubjects();
  }

  onExport(fileType: FileEnum){
    let filter = {...this.filtration, PageSize:null}
    this.divisionService.subjectsToExport(this.schoolId,this.divisionId,filter).subscribe( (res) =>{
      this.exportService.exportFile(fileType, res, this.translate.instant('dashboard.schools.divisionSubjects'))
    })
  }

  paginationChanged(event: paginationState) {
    this.filtration.Page = event.page
    this.getSubjects();
  }

  ngOnDestroy(): void {
    this.ngDestroy$.next(null)
    this.ngDestroy$.complete
  }
}
