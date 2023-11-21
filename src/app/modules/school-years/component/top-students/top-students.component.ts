import { Component, OnInit,Input,inject } from '@angular/core';
import { ArrayOperations } from 'src/app/core/helpers/array';
import { BaseSearchModel } from 'src/app/core/models/filter-search/base-search-model';
import { paginationInitialState } from 'src/app/core/helpers/pagination';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { FileTypeEnum } from 'src/app/shared/enums/file/file.enum';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { SchoolYearsService } from '../../service/school-years.service';
import { Table } from 'primeng/table';
import { ExportService } from 'src/app/shared/services/export/export.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
@Component({
  selector: 'app-top-students',
  templateUrl: './top-students.component.html',
  styleUrls: ['./top-students.component.scss']
})
export class TopStudentsComponent implements OnInit {
  @Input('schoolYearId') schoolYearId='';
  nationalityList=[];
  lang = inject(TranslationService).lang
  gradesList=[];
  curriculumClassList=[];
  filtration = {...BaseSearchModel,GradeId:null,CurriculumId:null,NationlaityId:null};
  paginationState= {...paginationInitialState};
  allTopStudentsList={
    total:0,
    totalAllData:0,
    list:[],
    loading:true
  };
  constructor(private sharedService:SharedService,private translate:TranslateService,private schoolYearService:SchoolYearsService,private exportService: ExportService) { }

  ngOnInit(): void {
    this.getAllTopStudents();
    this.schoolYearService.getAllGradesInSchoolYear(Number(this.schoolYearId)).subscribe((res)=>{this.gradesList=res;console.log(res)})
    this.sharedService.getAllNationalities().subscribe((res)=>{ this.nationalityList=res;})
    this.schoolYearService.getCurriculumsInSchoolYear(Number(this.schoolYearId)).subscribe((res)=>{this.curriculumClassList=res})
  }
  getAllTopStudents()
  {
   this.sharedService.appliedFilterCount$.next(ArrayOperations.filledObjectItemsCount(this.filtration));
   this.allTopStudentsList.loading=true;
   this.allTopStudentsList.list=[];
   this.schoolYearService.getAllTopStudents(Number(this.schoolYearId),this.filtration).subscribe((res)=>{
    this.sharedService.filterLoading.next(false);
       this.allTopStudentsList.loading=false;
       this.allTopStudentsList.total=res.result.total;
       this.allTopStudentsList.totalAllData=res.result.totalAllData;
       this.allTopStudentsList.list=res.result.data;


     },(err)=>{this.allTopStudentsList.loading = false;
       this.allTopStudentsList.total=0
       this.sharedService.filterLoading.next(false);
     });
  }
  clearFilter(){

   this.filtration.KeyWord =''
   this.filtration.CurriculumId= null;
   this.filtration.GradeId= null;
   this.filtration.NationlaityId= null;
   this. getAllTopStudents();
 }


 onExport(fileType: FileTypeEnum, table:Table){
  this.exportService.showLoader$.next(true)
  let filter = {...this.filtration, PageSize:this.allTopStudentsList.totalAllData,Page:1}
  this.schoolYearService.topStudentsToExport(Number(this.schoolYearId),this.filtration).subscribe( (res) =>{

    this.exportService.exportFile(fileType, res, this.translate.instant('SchoolYear.Top Students'))
  })
}

 sortMe(e)
 {
   if(e.order==-1)
   {this.filtration.SortBy="update "+e.field;}
   else
   {this.filtration.SortBy="old "+e.field;}

   this.getAllTopStudents();
 }

 paginationChanged(event: paginationState) {
   this.filtration.Page = event.page;
   this.filtration.PageSize = event.rows
   this.getAllTopStudents();

 }
}
