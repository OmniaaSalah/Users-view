import { Component, OnInit,Input } from '@angular/core';
import { ArrayOperations } from 'src/app/core/classes/array';
import { Filtration } from 'src/app/core/classes/filtration';
import { paginationInitialState } from 'src/app/core/classes/pagination';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { FileEnum } from 'src/app/shared/enums/file/file.enum';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { SchoolYearsService } from '../../service/school-years.service';
import { Table } from 'primeng/table';
import { ExportService } from 'src/app/shared/services/export/export.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-top-students',
  templateUrl: './top-students.component.html',
  styleUrls: ['./top-students.component.scss']
})
export class TopStudentsComponent implements OnInit {
  @Input('schoolYearId') schoolYearId='';
  nationalityList=[];
  gradesList=[];
  curriculumClassList=[];
  filtration = {...Filtration,GradeId:null,CurriculumId:null,NationlaityId:null};
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
 
 
 onExport(fileType: FileEnum, table:Table){
  let filter = {...this.filtration, PageSize:this.allTopStudentsList.totalAllData}
  this.schoolYearService.topStudentsToExport(Number(this.schoolYearId),this.filtration).subscribe( (res) =>{
    
    this.exportService.exportFile(fileType, res, this.translate.instant('dashboard.SchoolYear.Top Students'))
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
   this.getAllTopStudents();
 
 }
}
