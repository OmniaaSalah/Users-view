import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Filtration } from 'src/app/core/classes/filtration';
import { paginationInitialState } from 'src/app/core/classes/pagination';
import { Filter } from 'src/app/core/models/filter/filter';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { StudentsService } from '../../../../students/services/students/students.service';

@Component({
  selector: 'app-certificate-list',
  templateUrl: './certificate-list.component.html',
  styleUrls: ['./certificate-list.component.scss']
})
export class CertificateListComponent implements OnInit {

  studentId = this.route.snapshot.paramMap.get('id')

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
  filtration :Filter = {...Filtration}
  paginationState= {...paginationInitialState}

  certificates={
    totalAllData:0,
    total:0,
    list:[],
    loading:true
  }



  constructor(
    private studentService:StudentsService,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.getCertificate()
  }

  getCertificate(){
    this.certificates.loading=true
    this.certificates.list=[]
    this.studentService.getCertificatesList(this.studentId, this.filtration).subscribe(res =>{
      this.certificates.loading=false
      this.certificates.list = res.data
      this.certificates.totalAllData = res.totalAllData
      this.certificates.total =res.total 
    },err=>{
      this.certificates.loading=false
      this.certificates.total=0
    })
  }


  onSort(e){
    console.log(e);
    if(e.order==1) this.filtration.SortBy= 'old'
    else if(e.order == -1) this.filtration.SortBy= 'update'
    this.getCertificate()
  }

  clearFilter(){
    this.getCertificate()
  }


  paginationChanged(event: paginationState) {
    this.filtration.Page = event.page
    this.getCertificate()

  }

}
