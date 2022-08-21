import { Component, OnInit } from '@angular/core';
import { faHouse, faAngleLeft, faAngleRight, faLocationDot, faUser, faPhone, faEnvelope, faPencil, faPersonCircleCheck, faCalendar, faEllipsisVertical, faXmark } from '@fortawesome/free-solid-svg-icons';
import { MenuItem } from 'primeng/api';
import { paginationState } from 'src/app/core/Models/pagination/pagination';
// declare var google: any;

@Component({
  selector: 'app-school-details',
  templateUrl: './school-details.component.html',
  styleUrls: ['./school-details.component.scss']
})
export class SchoolDetailsComponent implements OnInit {
  faCoffee = faHouse;
  faAngleLeft= faAngleLeft
  faAngleRight=faAngleRight
  faLocationDot=faLocationDot
  faUser=faUser
  faPhone=faPhone
  faEnvelope=faEnvelope
  faEllipsisVertical=faEllipsisVertical
  faXmark =faXmark

  selectedImage
  showFilterBox =false
  
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
	
	step= 3

  	// cols = [
	// 	{ field: 'name', header: 'name' },
	// 	{ field: 'category', header: 'category' },
	// 	{ field: 'quantity', header: 'quantity' },
	// 	{ field: 'price', header: 'price' }
	// ];

  	p:any
	first=0
	rows =4

	searchText =''
	isDialogOpened =false

	items: MenuItem[]=[
		{label:'قائمه المدارس '},
		{label:'الاطلاع على معلومات المدرسه'},
	];

	options = {
		center: {lat: 36.890257, lng: 30.707417},
		zoom: 12
	};
	// overlays = [
	// 	new google.maps.Marker({position: {lat: 36.879466, lng: 30.667648}, title:"Konyaalti"}),
	// 	new google.maps.Marker({position: {lat: 36.883707, lng: 30.689216}, title:"Ataturk Park"}),
	// 	new google.maps.Marker({position: {lat: 36.885233, lng: 30.702323}, title:"Oldtown"}),
	// 	new google.maps.Polygon({paths: [
	// 		{lat: 36.9177, lng: 30.7854},{lat: 36.8851, lng: 30.7802},{lat: 36.8829, lng: 30.8111},{lat: 36.9177, lng: 30.8159}
	// 	], strokeOpacity: 0.5, strokeWeight: 1,fillColor: '#1976D2', fillOpacity: 0.35
	// 	}),
	// 	new google.maps.Circle({center: {lat: 36.90707, lng: 30.56533}, fillColor: '#1976D2', fillOpacity: 0.35, strokeWeight: 1, radius: 1500}),
	// 	new google.maps.Polyline({path: [{lat: 36.86149, lng: 30.63743},{lat: 36.86341, lng: 30.72463}], geodesic: true, strokeColor: '#FF0000', strokeOpacity: 0.5, strokeWeight: 2})
	// ]

	constructor() { }

	ngOnInit(): void {
	}


	async uploadImage(event){
		console.log(event);

		let url = await this.imageStream(event)
		this.selectedImage = url
		console.log(url);
		
		
	}

	imageStream(e, maxSize = 10) {
		let image: any;
		let file = e.target.files[0];
	
		  if (e.target.files && e.target.files[0]) {
			const reader = new FileReader();
			image = new Promise(resolve => {
			  reader.onload = (event: any) => {
				resolve(event.target.result);
			  }
			  reader.readAsDataURL(e.target.files[0]);
			}
			)
		  }
		  return Promise.resolve(image);

	  }

	removeImage(){
		this.selectedImage = null
	}


	handleMapClick(event) {
        //event: MouseEvent of Google Maps api
		console.log(event);
		
    }

    handleOverlayClick(event) {
        //event.originalEvent: MouseEvent of Google Maps api
        //event.overlay: Clicked overlay
        //event.map: Map instance
		console.log(event);
    }

	openSectionModal(){
		this.isDialogOpened=true
	}
	paginationChanged(event:paginationState){
		console.log(event);
		this.first = event.first
		this.rows = event.rows

	}

}
