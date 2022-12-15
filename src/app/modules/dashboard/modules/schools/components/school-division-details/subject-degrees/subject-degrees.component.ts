import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { Filtration } from 'src/app/core/classes/filtration';
import { paginationInitialState } from 'src/app/core/classes/pagination';
import { Filter } from 'src/app/core/models/filter/filter';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { DivisionService } from '../../../services/division/division.service';

@Component({
  selector: 'app-subject-degrees',
  templateUrl: './subject-degrees.component.html',
  styleUrls: ['./subject-degrees.component.scss']
})
export class SubjectDegreesComponent implements OnInit {

  schoolId= this.route.snapshot.paramMap.get('schoolId')
  divisionId= this.route.snapshot.paramMap.get('divisionId')

  filtration:Filter = {...Filtration, schoolYearId:1,}
  paginationState= {...paginationInitialState}

    subjects ={
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


  onSort(e){
    if(e.order==1) this.filtration.SortBy= 'old'
    else if(e.order == -1) this.filtration.SortBy= 'update'
    this.getSubjects();
  }

  clearFilter(){
    this.filtration.KeyWord =''
    this.getSubjects();
  }

  paginationChanged(event: paginationState) {
    this.filtration.Page = event.page
    this.getSubjects();

  }

}
