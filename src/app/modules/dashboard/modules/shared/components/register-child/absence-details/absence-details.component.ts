import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { Filtration } from 'src/app/core/classes/filtration';
import { paginationInitialState } from 'src/app/core/classes/pagination';
import { Filter } from 'src/app/core/models/filter/filter';
import { StudentsService } from '../../../../students/services/students/students.service';
import { RegisterChildService } from '../../../services/register-child/register-child.service';

@Component({
  selector: 'app-absence-details',
  templateUrl: './absence-details.component.html',
  styleUrls: ['./absence-details.component.scss']
})
export class AbsenceDetailsComponent implements OnInit {

  studentId = +this.route.snapshot.paramMap.get('id')
    // << DATA PLACEHOLDER >> //
    filtration:Filter = {...Filtration, semester:0}
    paginationState= {...paginationInitialState}
  
    absence ={
      total:0,
      totalAllData:0,
      list:[],
      loading:false
    }

      
    schoolClasses: any[] = [

      {
        "id": "1001",
        "code": "nvklal433",
        "name": "Black Watch",
        "description": "Product Description",
        "image": "black-watch.jpg",
        "price": 72,
        "category": "Accessories",
        "quantity": 61,
        "inventoryStatus": "INSTOCK",
        "rating": 4
      },
      {
        "id": "1001",
        "code": "nvklal433",
        "name": "Black Watch",
        "description": "Product Description",
        "image": "black-watch.jpg",
        "price": 72,
        "category": "Accessories",
        "quantity": 61,
        "inventoryStatus": "INSTOCK",
        "rating": 4
      },
      {
        "id": "1000",
        "code": "f230fh0g3",
        "name": "Bamboo Watch",
        "description": "Product Description",
        "image": "bamboo-watch.jpg",
        "price": 65,
        "category": "Accessories",
        "quantity": 24,
        "inventoryStatus": "INSTOCK",
        "rating": 5
      },
      {
        "id": "1001",
        "code": "nvklal433",
        "name": "Black Watch",
        "description": "Product Description",
        "image": "black-watch.jpg",
        "price": 72,
        "category": "Accessories",
        "quantity": 61,
        "inventoryStatus": "INSTOCK",
        "rating": 4
      },
      {
        "id": "1000",
        "code": "f230fh0g3",
        "name": "Bamboo Watch",
        "description": "Product Description",
        "image": "bamboo-watch.jpg",
        "price": 65,
        "category": "Accessories",
        "quantity": 24,
        "inventoryStatus": "INSTOCK",
        "rating": 5
      },
      {
        "id": "1001",
        "code": "nvklal433",
        "name": "Black Watch",
        "description": "Product Description",
        "image": "black-watch.jpg",
        "price": 72,
        "category": "Accessories",
        "quantity": 61,
        "inventoryStatus": "INSTOCK",
        "rating": 4
      },

    ]


    btnGroupItems=[
      {label:"الفصل الاول", active: false, value:0},
      {label:"الفصل الاخير", active: false, value:1},
    ]

  constructor(
    private registerChildService:RegisterChildService,
    private studentService:StudentsService,
    private route: ActivatedRoute,
    ) { }



  ngOnInit(): void {
  }


  getAbsenceDetails(){
    this.absence.loading=true
    this.absence.list=[]
    this.studentService
    .getStudentAbsenceRecord(this.studentId,this.filtration.semester,this.filtration)
    .pipe(map(res => res.result))
    .subscribe((res:any)=>{
      this.absence.loading=false
      this.absence.list = res.data
      this.absence.totalAllData = res.totalAllData
      this.absence.total =res.total 

    },err=> {
      this.absence.loading=false
      this.absence.total=0
    })
  }


}
