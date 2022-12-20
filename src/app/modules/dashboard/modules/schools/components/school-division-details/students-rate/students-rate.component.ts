import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Filtration } from 'src/app/core/classes/filtration';
import { paginationInitialState } from 'src/app/core/classes/pagination';
import { Filter } from 'src/app/core/models/filter/filter';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { DivisionService } from '../../../services/division/division.service';

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

  ratesOptions = [{name:'ناجح',value:1},{name:'راسب', value:0},]

  students ={
    total:0,
    totalAllData:0,
    list:[],
    loading:false
  }
    
  constructor(
    private route:ActivatedRoute,
    private divisionService:DivisionService,
  ) { }

  ngOnInit(): void {
    this.getStudentsRate()
  }

  getStudentsRate(){
    this.divisionService.getDivisionStudentsRate(this.schoolId, this.divisionId,this.filtration).subscribe(res=>{
      this.students.list=res.list
      this.students.total=res.total
      this.students.totalAllData=res.totalAllData
    })
  }

  onRateChanged(val){
    
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
