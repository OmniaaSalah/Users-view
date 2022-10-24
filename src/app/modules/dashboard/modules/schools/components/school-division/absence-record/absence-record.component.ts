import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { Filtration } from 'src/app/core/classes/filtration';
import { paginationInitialState } from 'src/app/core/classes/pagination';
import { Filter } from 'src/app/core/models/filter/filter';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { ConfirmModelService } from 'src/app/shared/services/confirm-model/confirm-model.service';
import { DivisionService } from '../../../services/division/division.service';

@Component({
  selector: 'app-absence-record',
  templateUrl: './absence-record.component.html',
  styleUrls: ['./absence-record.component.scss']
})
export class AbsenceRecordComponent implements OnInit {

  faClose=faClose

   
 schoolId = this.route.snapshot.paramMap.get('schoolId')
 divisionId = this.route.snapshot.paramMap.get('divisionId')

  filtration :Filter = {...Filtration, Status:""}
  paginationState= {...paginationInitialState}
  
  btnGroupItems=[
    {label:"الفصل الاول", active: false, value:"first"},
    {label:"الفصل الاخير", active: false, value:"second"},
  ]
  
  schoolClasses:any[] =[

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
    {
      "id": "1002",
      "code": "zz21cz3c1",
      "name": "Blue Band",
      "description": "Product Description",
      "image": "blue-band.jpg",
      "price": 79,
      "category": "Fitness",
      "quantity": 2,
      "inventoryStatus": "LOWSTOCK",
      "rating": 3
    },
    {
      "id": "1003",
      "code": "244wgerg2",
      "name": "Blue T-Shirt",
      "description": "Product Description",
      "image": "blue-t-shirt.jpg",
      "price": 29,
      "category": "Clothing",
      "quantity": 25,
      "inventoryStatus": "INSTOCK",
      "rating": 5
    },
    ]

    first=1
  rows =6

  selectedRecord

  constructor(
    private divisionService: DivisionService,
    private route: ActivatedRoute,
    public confirmModelService: ConfirmModelService
    ) { }

  ngOnInit(): void {
    this.confirmDeleteListener()
  }


  getAbsenceRecords(){
    // this.divisionService.getAbsenceRecords(this.schoolId)
  }

  deleteRecord(selectedRecord){

  }

  confirmDeleteListener(){
    this.confirmModelService.confirmed$.subscribe(val => {
      if (val) this.deleteRecord(this.selectedRecord)
      
    })
  }

  onSort(e){
    if(e.order==1) this.filtration.SortBy= 'old'
    else if(e.order == -1) this.filtration.SortBy= 'update'
    this.getAbsenceRecords()
  }

  clearFilter(){
    this.filtration.KeyWord =''
    this.filtration.City= null
    this.filtration.StateId= null
    this.filtration.Status =''
    this.filtration.curricuulumId = null
    this.getAbsenceRecords()
  }


  // onExport(fileType: FileEnum, table:Table){
  //   this.exportService.exportFile(fileType, table, this.schools.list)
  // }

  paginationChanged(event: paginationState) {
    this.first = event.first
    this.rows = event.rows
    this.filtration.Page = event.page
    this.getAbsenceRecords()

  }

}
