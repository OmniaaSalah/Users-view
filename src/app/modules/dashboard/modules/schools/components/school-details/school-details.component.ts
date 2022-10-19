import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {faChevronCircleLeft, faChevronLeft, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { paginationState } from 'src/app/core/models/pagination/pagination';
import { TranslationService } from 'src/app/core/services/translation.service';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { IHeader } from 'src/app/core/Models/iheader';


import * as L from 'leaflet';
import { Observable, Subscriber } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'src/app/core/models/dropdown/menu-item';
import { FormGroup, FormControl, Validators, ValidationErrors, AbstractControl } from '@angular/forms';
import { GlobalService } from 'src/app/shared/services/global/global.service';
import { PermissionsEnum } from 'src/app/shared/enums/permissions/permissions.enum';
import { SchoolsService } from '../../services/schools/schools.service';




// declare var google: any;

@Component({
	selector: 'app-school-details',
	templateUrl: './school-details.component.html',
	styleUrls: ['./school-details.component.scss']
})
export class SchoolDetailsComponent implements OnInit, AfterViewInit {

	faEllipsisVertical = faEllipsisVertical
	faChevronCircleLeft = faChevronLeft

	get permissionEnum(){ return PermissionsEnum }

	// << Route Data >> //
	schoolId = this.route.snapshot.paramMap.get('schoolId')


	// << Data Placeholder>> //
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
			"rating": 5,
			"date":' 12:00pm - 2022/07/04 '
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
			"rating": 5,
			"date":' 12:00pm - 2022/07/04 '
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
			"rating": 4,
			"date":' 12:00pm - 2022/07/04 '
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
			"rating": 4,
			"date":' 12:00pm - 2022/07/04 '
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
			"rating": 5,
			"date":' 12:00pm - 2022/07/04 '
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
			"rating": 4,
			"date":' 12:00pm - 2022/07/04 '
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
			"rating": 4,
			"date":' 12:00pm - 2022/07/04 '
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
			"rating": 3,
			"date":' 12:00pm - 2022/07/04 '
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
			"rating": 5,
			"date":' 12:00pm - 2022/07/04 '
		}
	]

	componentHeaderData: IHeader = {
		breadCrump: [
			{ label: 'قائمه المدارس ' , routerLink: '/dashboard/schools-and-students/schools',routerLinkActiveOptions:{exact: true}},
			{ label: 'الاطلاع على معلومات المدرسه', routerLink: `/dashboard/schools-and-students/schools/school/${this.schoolId}`},
		],
		mainTitle: { main: 'مدرسه الشارقه الابتدائيه' }
	}



	employeesItems: MenuItem[]=[{label: this.translate.instant('shared.edit'), icon:'assets/images/shared/pen.svg'},]
	booleanOptions= this.globalService.booleanOptions

	map: any
	// cols = [
	// 	{ field: 'name', header: 'name' },
	// 	{ field: 'category', header: 'category' },
	// 	{ field: 'quantity', header: 'quantity' },
	// 	{ field: 'price', header: 'price' }
	// ];





	first = 0
	rows = 4



	// << Conditions >> //
	isDialogOpened = false
	isEmployeeModelOpened=false
	openEditListModel=false
	step = 1



	// << FORMS >> //
	employeeForm= new FormGroup({
		role: new FormControl(null, Validators.required),
		status: new FormControl(),
		password: new FormControl(),
		confirmPassword: new FormControl('', this.matchValues('password'))
	},)

	matchValues(matchTo: string ): (AbstractControl) => ValidationErrors | null {
		return (control: AbstractControl): ValidationErrors | null => {
		  return !!control.parent &&
			!!control.parent.value &&
			control.value !== control.parent.controls[matchTo].value
			? { isMatching: true }
			: null;
		};
	  }

	get f () { return this.employeeForm.controls}

	constructor(
		public translate: TranslateService,
		public globalService: GlobalService,
		private route: ActivatedRoute,
		private headerService: HeaderService,
		private schoolsService: SchoolsService) { }

	ngOnInit(): void {

		this.headerService.changeHeaderdata(this.componentHeaderData)
		// this.translatService.init(environment.defaultLang)
		// this.translate.use('en');
		this.schoolsService.getSchool(this.schoolId).subscribe(res =>{
			console.log(res);

		})

	}

	ngAfterViewInit() {
		this.loadMap();
	}



	// private getCurrentPosition(): any {
	// 	return new Observable((observer: Subscriber<any>) => {
	// 		if (navigator.geolocation) {
	// 			navigator.geolocation.getCurrentPosition((position: any) => {
	// 				observer.next({
	// 					latitude: position.coords.latitude,
	// 					longitude: position.coords.longitude,
	// 				});
	// 				observer.complete();
	// 			});
	// 		} else {
	// 			observer.error();
	// 		}
	// 	});
	// }

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

		const marker = L.marker([25.081622124248337, 55.216447958765755], { icon }).bindPopup('Dubai School Nad Al Sheba');
		marker.addTo(this.map);
	}

	onLogoFileUpload($event){

	}

	onReliableFileUpload($event){

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
