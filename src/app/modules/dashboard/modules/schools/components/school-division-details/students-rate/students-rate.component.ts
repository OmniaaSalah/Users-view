import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { Filtration } from 'src/app/core/classes/filtration';
import { paginationInitialState } from 'src/app/core/classes/pagination';
import { Filter } from 'src/app/core/models/filter/filter';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { DivisionService } from '../../../services/division/division.service';
import { pairwise, skip } from 'rxjs/operators';
import { el } from 'date-fns/locale';

@Component({
  selector: 'app-students-rate',
  templateUrl: './students-rate.component.html',
  styleUrls: ['./students-rate.component.scss']
})
export class StudentsRateComponent implements OnInit {

  schoolId= this.route.snapshot.paramMap.get('schoolId')
  divisionId= this.route.snapshot.paramMap.get('divisionId')
  
  filtration:Filter = {...Filtration}
  paginationState= {...paginationInitialState}

  studentRateInput = new FormControl()

  ratesOptions = [
    {name:this.translate.instant('shared.allStatus.passed'),value:true},
    {name:this.translate.instant('shared.allStatus.notPassed'), value:false}
]


  students ={
    total:0,
    totalAllData:0,
    list:[],
    loading:false
  }
    
  constructor(
    private route:ActivatedRoute,
    private divisionService:DivisionService,
    private toaster:ToastrService,
    private translate:TranslateService
  ) { }

  ngOnInit(): void {
    this.getStudentsRate()
  }

  getStudentsRate(){
    this.divisionService.getDivisionStudentsRate(this.schoolId, this.divisionId,this.filtration)
    .pipe(
      map(res=>{
        res.result.data=res.result.data.map(el=> ({...el, ignoredFirstEvent :true} ))
        return res
      }),
      map(res=> res.result )
      )
    .subscribe(res=>{
      this.students.list=res.data
      this.students.total=res.total
      this.students.totalAllData=res.totalAllData
    })
  }

  onStudentRateChanged(ispass,studentId, rowIndex){
    if(this.students.list[rowIndex].ignoredFirstEvent) {
      this.students.list[rowIndex].ignoredFirstEvent=false
      return;
    }
    this.divisionService.updateStudentRate(this.divisionId, studentId,{ispass}).subscribe(res=>{
      this.toaster.success(this.translate.instant('toasterMessage.successUpdate'))
    },(err)=>{
      this.toaster.error(this.translate.instant('toasterMessage.error'))
    })
  }


  onSort(e){
    if(e.order==1) this.filtration.SortBy= 'old'
    else if(e.order == -1) this.filtration.SortBy= 'update'
    this.getStudentsRate();
  }

  clearFilter(){
    this.filtration.KeyWord =''
    this.getStudentsRate();
  }

  paginationChanged(event: paginationState) {
    this.filtration.Page = event.page
    this.getStudentsRate();

  }

}
