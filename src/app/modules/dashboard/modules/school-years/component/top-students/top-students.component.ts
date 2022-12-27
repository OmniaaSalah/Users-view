import { Component, OnInit,Input } from '@angular/core';
import { ArrayOperations } from 'src/app/core/classes/array';
import { Filtration } from 'src/app/core/classes/filtration';
import { paginationInitialState } from 'src/app/core/classes/pagination';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { FileEnum } from 'src/app/shared/enums/file/file.enum';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { SchoolYearsService } from '../../service/school-years.service';
import { Table } from 'primeng/table';
@Component({
  selector: 'app-top-students',
  templateUrl: './top-students.component.html',
  styleUrls: ['./top-students.component.scss']
})
export class TopStudentsComponent implements OnInit {
  @Input('schoolYearId') schoolYearId='';
  nationalityList;
  curriculumClassList;
  filtration = {...Filtration,GradeId:'',CurriculumId:'',NationlaityId:''};
  paginationState= {...paginationInitialState};
  allTopStudentsList={
    total:0,
    totalAllData:0,
    list:[],
    loading:true
  };
  constructor(private sharedService:SharedService,private schoolYearService:SchoolYearsService) { }

  ngOnInit(): void {
    this.getAllTopStudents();
    this.sharedService.getAllNationalities().subscribe((res)=>{ this.nationalityList=res;})
    this.schoolYearService.getCurriculumsInSchoolYear(Number(this.schoolYearId)).subscribe((res)=>{this.curriculumClassList=res})
  }
  getAllTopStudents()
  {
   this.sharedService.appliedFilterCount$.next(ArrayOperations.filledObjectItemsCount(this.filtration));
   this.allTopStudentsList.loading=true;
   this.allTopStudentsList.list=[];
   this.schoolYearService.getAllTopStudents(this.filtration).subscribe((res)=>{
 
       this.allTopStudentsList.loading=false;
       this.allTopStudentsList.total=res.result.total;
       this.allTopStudentsList.totalAllData=res.result.totalAllData;
       this.allTopStudentsList.list=res.result.data;
 
     
     },(err)=>{this.allTopStudentsList.loading = false;
       this.allTopStudentsList.total=0
     });
  }
  clearFilter(){
 
   this.filtration.KeyWord =''
   this.filtration.CurriculumId= null;
   this.filtration.GradeId= null;
   this.filtration.NationlaityId= null;
   this. getAllTopStudents();
 }
 
 
 onExport(fileType:FileEnum, table:Table){
   // this.exportService.exportFile(fileType, table,this.allTopStudentsList.list)
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
