import { Component, OnInit } from '@angular/core';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { MenuItem } from 'primeng/api';
import { paginationState } from 'src/app/core/Models/pagination/pagination';

@Component({
  selector: 'app-parants',
  templateUrl: './parants.component.html',
  styleUrls: ['./parants.component.scss']
})
export class ParantsComponent implements OnInit {
  faEllipsisVertical=faEllipsisVertical

    // breadCrumb
    items: MenuItem[]=[
      {label:'اولياء الامور'},

    ];

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

  first=0
	rows =4
  constructor() { }

  ngOnInit(): void {
  }

  paginationChanged(event:paginationState){
		console.log(event);
		this.first = event.first
		this.rows = event.rows

	}

}
