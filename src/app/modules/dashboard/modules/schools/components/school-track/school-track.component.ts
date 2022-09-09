import { Component, OnInit } from '@angular/core';
import { faArrowLeft, faArrowRight, faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { HeaderObj } from 'src/app/core/Models/header-obj';
import { paginationState } from 'src/app/core/Models/pagination/pagination';
import { HeaderService } from 'src/app/core/services/Header/header.service';

@Component({
  selector: 'app-school-track',
  templateUrl: './school-track.component.html',
  styleUrls: ['./school-track.component.scss']
})
export class SchoolTrackComponent implements OnInit {

  faArrowLeft = faArrowLeft
  faArrowRight = faArrowRight
  faPlus =faPlus
  faCheck = faCheck

  componentHeaderData: HeaderObj={
		breadCrump: [
      {label:'قائمه المدارس '},
      {label:'الاطلاع على معلومات المدرسه'},
      {label:'تعديل الشعبه'},
		],
		mainTitle:{ main: 'مدرسه الشارقه الابتدائيه' },
    subTitle: {main: this.translate.instant('dashboard.schools.editTrack'), sub:'(B 1)'}
	}

  searchText=''
  isModelOpened
  selectedSubjects=[]


  step =1

  
	first=0
	rows =4

  schoolClasses:any[] =[
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
  {
    "id": "1004",
    "code": "h456wer53",
    "name": "Bracelet",
    "description": "Product Description",
    "image": "bracelet.jpg",
    "price": 15,
    "category": "Accessories",
    "quantity": 73,
    "inventoryStatus": "INSTOCK",
    "rating": 4
  },
  {
    "id": "1005",
    "code": "av2231fwg",
    "name": "Brown Purse",
    "description": "Product Description",
    "image": "brown-purse.jpg",
    "price": 120,
    "category": "Accessories",
    "quantity": 0,
    "inventoryStatus": "OUTOFSTOCK",
    "rating": 4
  },
  {
    "id": "1006",
    "code": "bib36pfvm",
    "name": "Chakra Bracelet",
    "description": "Product Description",
    "image": "chakra-bracelet.jpg",
    "price": 32,
    "category": "Accessories",
    "quantity": 5,
    "inventoryStatus": "LOWSTOCK",
    "rating": 3
  },
  {
    "id": "1007",
    "code": "mbvjkgip5",
    "name": "Galaxy Earrings",
    "description": "Product Description",
    "image": "galaxy-earrings.jpg",
    "price": 34,
    "category": "Accessories",
    "quantity": 23,
    "inventoryStatus": "INSTOCK",
    "rating": 5
  }
]
  constructor(
    private translate: TranslateService,
    private headerService:HeaderService
  ) { }

  ngOnInit(): void {

    this.headerService.changeHeaderdata(this.componentHeaderData)
  }

  
  openAddStudentModel(){
		this.isModelOpened=true
	}
	paginationChanged(event:paginationState){
		console.log(event);
		this.first = event.first
		this.rows = event.rows

	}

}
