import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { faHouse, faAngleLeft, faAngleRight, faLocationDot, faUser, faPhone, faEnvelope, faPencil, faPersonCircleCheck, faCalendar, faEllipsisVertical, faXmark } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { paginationState } from 'src/app/core/models/pagination/pagination';
import { TranslationService } from 'src/app/core/services/translation.service';
import { HeaderService } from 'src/app/core/services/header/header.service';
import { HeaderObj } from 'src/app/core/models/header-obj';


import * as L from 'leaflet';
import { Observable, Subscriber } from 'rxjs';




// declare var google: any;

@Component({
	selector: 'app-school-details',
	templateUrl: './school-details.component.html',
	styleUrls: ['./school-details.component.scss']
})
export class SchoolDetailsComponent implements OnInit, AfterViewInit {

	faCoffee = faHouse;
	faAngleLeft = faAngleLeft
	faAngleRight = faAngleRight
	faLocationDot = faLocationDot
	faUser = faUser
	faPhone = faPhone
	faEnvelope = faEnvelope
	faEllipsisVertical = faEllipsisVertical
	faXmark = faXmark
	faPencil = faPencil
	selectedImage
	showFilterBox = false


	schoolClasses: any[] = [
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

	step = 1

	// cols = [
	// 	{ field: 'name', header: 'name' },
	// 	{ field: 'category', header: 'category' },
	// 	{ field: 'quantity', header: 'quantity' },
	// 	{ field: 'price', header: 'price' }
	// ];

	p: any
	first = 0
	rows = 4

	searchText = ''
	isDialogOpened = false

	componentHeaderData: HeaderObj = {
		breadCrump: [
			{ label: 'قائمه المدارس ' },
			{ label: 'الاطلاع على معلومات المدرسه' },
		],
		mainTitle: { main: 'مدرسه الشارقه الابتدائيه' },
		showContactUs: true
	}

	map: any

	constructor(
		public translate: TranslateService,
		private translatService: TranslationService,
		private headerService: HeaderService,) { }

	ngOnInit(): void {

		this.headerService.changeHeaderdata(this.componentHeaderData)
		// this.translatService.init(environment.defaultLang)
		// this.translate.use('en');
	}

	ngAfterViewInit() {
		this.loadMap();
	}




	private getCurrentPosition(): any {
		return new Observable((observer: Subscriber<any>) => {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition((position: any) => {
					observer.next({
						latitude: position.coords.latitude,
						longitude: position.coords.longitude,
					});
					observer.complete();
				});
			} else {
				observer.error();
			}
		});
	}

	accessToken = 'pk.eyJ1IjoiYnJhc2thbSIsImEiOiJja3NqcXBzbWoyZ3ZvMm5ybzA4N2dzaDR6In0.RUAYJFnNgOnn80wXkrV9ZA';

	private loadMap(): void {
		// L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
		//   attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		//   maxZoom: 18,
		//   id: 'mapbox/streets-v11',
		//   tileSize: 512,
		//   zoomOffset: -1,
		// 	minZoom: 3,
		//   accessToken: this.accessToken,
		// }).addTo(this.map);

		this.map = L.map('map').setView([25.081622124248337, 55.216447958765755], 14);
		L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 19,
			attribution: '© OpenStreetMap'
		}).addTo(this.map);


		const icon = L.icon({
			iconUrl: 'assets/images/shared/map-marker.svg',
			shadowUrl: 'https://res.cloudinary.com/rodrigokamada/image/upload/v1637581626/Blog/angular-leaflet/marker-shadow.png',
			popupAnchor: [13, 0],
		});

		const marker = L.marker([25.081622124248337, 55.216447958765755], { icon }).bindPopup('Angular Leaflet');
		marker.addTo(this.map);
	}


	async uploadImage(event) {
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

	removeImage() {
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

	openSectionModal() {
		this.isDialogOpened = true
	}
	paginationChanged(event: paginationState) {
		console.log(event);
		this.first = event.first
		this.rows = event.rows

	}

}
