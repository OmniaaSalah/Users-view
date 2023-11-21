import { Component, Input, OnDestroy, OnInit ,inject} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DialogService } from 'primeng/dynamicdialog';
import { map, Subject, takeUntil } from 'rxjs';
import { BaseSearchModel } from 'src/app/core/models/filter-search/base-search-model';
import { paginationInitialState } from 'src/app/core/helpers/pagination';
import { SearchModel } from 'src/app/core/models/filter-search/filter-search.model';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { ClaimsEnum } from 'src/app/shared/enums/claims/claims.enum';
import { FileTypeEnum } from 'src/app/shared/enums/file/file.enum';
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
  lang = inject(TranslationService).lang
  @Input() gradId=null
  @Input() gradeHaveTracks=false

  ngDestroy$=new Subject()

  get statusEnum() {return StatusEnum}
  get claimsEnum () {return ClaimsEnum}

  schoolId= this.route.snapshot.paramMap.get('schoolId')
  divisionId= this.route.snapshot.paramMap.get('divisionId')

  filtration:SearchModel = {...BaseSearchModel, semester:0}
  paginationState= {...paginationInitialState}

  btnGroupItems=[
    {label: this.translate.instant('shared.firstSemester'), active: true, value: SemesterEnum.FirstSemester},
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
        semester: this.filtration.semester
      },
      width: '70%',
      height:'90%'
    });

    ref.onClose.pipe(takeUntil(this.ngDestroy$)).subscribe((val) => {
      if(val) this.getSubjects()
  });
  }


  semesterChanged(semester){
    console.log(semester);

    this.filtration.semester=semester;
    // this.selectedSemesterLable = this.btnGroupItems.find(el=>el.value===semester).label
    this.getSubjects()
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

  onExport(fileType: FileTypeEnum){
    this.exportService.showLoader$.next(true)
    let filter = {...this.filtration,PageSize:this.subjects.total,Page:1}
    this.divisionService.subjectsToExport(this.schoolId,this.divisionId,filter).subscribe( (res) =>{
      this.exportService.exportFile(fileType, res, this.translate.instant('schools.divisionSubjects'))
    })
  }

  paginationChanged(event: paginationState) {
    this.filtration.Page = event.page
    this.filtration.PageSize = event.rows
    this.getSubjects();
  }

  ngOnDestroy(): void {
    this.ngDestroy$.next(null)
    this.ngDestroy$.complete
  }
}
