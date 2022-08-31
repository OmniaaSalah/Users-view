import { Component, OnInit } from '@angular/core';
import { faArrowRight, faCheck, faClose } from '@fortawesome/free-solid-svg-icons';
import { MenuItem } from 'primeng/api';
import { LayoutService } from 'src/app/layout/services/layout/layout.service';

@Component({
  selector: 'app-child-details',
  templateUrl: './child-details.component.html',
  styleUrls: ['./child-details.component.scss']
})
export class ChildDetailsComponent implements OnInit {

  faArrowRight=faArrowRight
  faCheck=faCheck
  faClose = faClose
  
  step=1
  items: MenuItem[]=[
		{label:'اولياء الامور'},
		{label:'قائمه الابناء'},
    {label:'تفاصيل الابن'},
	];

  student=
    {
      name:'محمد على',
      age: 15,
      regestered: true,
      regesteredSchool: 'مدرسه الشارقه الابتدائيه',
      school:'مدرسه الشارقه',
      class: 'الصف الرابع',
      relativeRelation:'ابن الاخ',
      src:'assets/images/avatar.svg'
    }


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
  
    ]
  constructor(private layoutService:LayoutService) { }

  ngOnInit(): void {
    this.layoutService.changeTheme('dark')
  }

}
