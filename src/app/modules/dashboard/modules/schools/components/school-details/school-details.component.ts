import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { faHouse, faAngleLeft, faAngleRight, faLocationDot, faUser, faPhone, faEnvelope, faPencil, faPersonCircleCheck, faCalendar, faEllipsisVertical, faXmark } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { paginationState } from 'src/app/core/Models/pagination/pagination';
import { TranslationService } from 'src/app/core/services/translation.service';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import XYZ from 'ol/source/XYZ'
import { defaults as defaultControls } from 'ol/control';
import ZoomToExtent from 'ol/control/ZoomToExtent';
import { HeaderService } from 'src/app/core/services/Header/header.service';
import { HeaderObj } from 'src/app/core/Models/header-obj';




// declare var google: any;

@Component({
  selector: 'app-school-details',
  templateUrl: './school-details.component.html',
  styleUrls: ['./school-details.component.scss']
})
export class SchoolDetailsComponent implements OnInit, AfterViewInit {

	@ViewChild('map')
	private mapContainer: ElementRef<HTMLElement>;

	
  faCoffee = faHouse;
  faAngleLeft= faAngleLeft
  faAngleRight=faAngleRight
  faLocationDot=faLocationDot
  faUser=faUser
  faPhone=faPhone
  faEnvelope=faEnvelope
  faEllipsisVertical=faEllipsisVertical
  faXmark =faXmark
  faPencil =faPencil
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
	
	step= 1

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

	componentHeaderData: HeaderObj={
		breadCrump: [
			{label:'قائمه المدارس '},
			{label:'الاطلاع على معلومات المدرسه'},
		],
		mainTitle:{ main:'مدرسه الشارقه الابتدائيه' },
		showContactUs:true
	}

	map: Map

	constructor(
		public translate: TranslateService,
		private translatService:TranslationService,
		private headerService:HeaderService,) { }

	ngOnInit(): void {

		this.headerService.changeHeaderdata(this.componentHeaderData)
		// this.translatService.init(environment.defaultLang)
		// this.translate.use('en');

		// this.map = new Map({
		// 	view: new View({
		// 	  center: [0, 0],
		// 	  zoom: 1,
		// 	}),
		// 	layers: [
		// 	  new TileLayer({
		// 		source: new OSM(),
		// 	  }),
		// 	],
		// 	target: 'map'
		//   });

	}
	
	ngAfterViewInit() {
		this.map = new Map({
			view: new View({

			  center: [	24.466667, 54.366669],
			  zoom: 1,
			}),
			layers: [
			  new TileLayer({
				source: new OSM(),
			  }),
			],
			target: 'map'
		});
		this.map.setTarget('map')

		// this.map = new Map({
		//   target: 'map',
		//   layers: [
		// 	new TileLayer({
		// 	  source: new XYZ({
		// 		url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
		// 	  })
		// 	})
		//   ],
		//   view: new View({
		// 	center: [813079.7791264898, 5929220.284081122],
		// 	zoom: 7
		//   }),
		//   controls: defaultControls().extend([
		// 	new ZoomToExtent({
		// 	  extent: [
		// 		813079.7791264898, 5929220.284081122,
		// 		848966.9639063801, 5936863.986909639
		// 	  ]
		// 	})
		//   ])
		// });

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
