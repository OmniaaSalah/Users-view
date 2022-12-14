import { AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { IHeader } from 'src/app/core/Models/header-dashboard';


import * as L from 'leaflet';
import { ActivatedRoute } from '@angular/router';
import { SchoolsService } from '../../services/schools/schools.service';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { School } from 'src/app/core/models/schools/school.model';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { ClaimsEnum } from 'src/app/shared/enums/claims/claims.enum';
import { UserScope } from 'src/app/shared/enums/user/user.enum';




// declare var google: any;

@Component({
	selector: 'app-school-details',
	templateUrl: './school-details.component.html',
	styleUrls: ['./school-details.component.scss']
})
export class SchoolDetailsComponent implements OnInit, AfterViewInit {
	// @ViewChild('map') mapContainer: ElementRef
	@ViewChild('nav') nav: ElementRef

	get claimsEnum () {return ClaimsEnum}
    checkedStatus:boolean=true;
	notCheckedStatus:boolean=false;


	get userScope() { return UserScope }
	currentUserScope = inject(UserService).getCurrentUserScope()
	

	// << Route Data >> //
	schoolId = this.route.snapshot.paramMap.get('schoolId')
	school:School
	
	
	// << Data Placeholder>> //

	componentHeaderData: IHeader = {
		breadCrump: [
			{ label: 'قائمه المدارس ' , routerLink: '/dashboard/schools-and-students/schools',routerLinkActiveOptions:{exact: true}},
			{ label: 'الاطلاع على معلومات المدرسه', routerLink: `/dashboard/schools-and-students/schools/school/${this.schoolId}`},
		],
		mainTitle: { main: 'مدرسه الشارقه الابتدائيه' }
	}

	// from tab 4
	selectedGradeId


	map: any

	// << Conditions >> //
	step
	navListLength




	constructor(
		public translate: TranslateService,
		public sharedService: SharedService,
		private translatService: TranslationService,
		private route: ActivatedRoute,
		private headerService: HeaderService,
		private schoolsService:SchoolsService) { }

	ngOnInit(): void {

		
		this.getSchool(this.schoolId)

	}

	ngAfterViewInit() {
		this.setActiveTab(0)
	}
	
	// Set Default Active Tab In Case Any tab Element Removed From The Dom For permissions Purpose
	setActiveTab(nodeIndex?){
		let navItemsList =this.nav.nativeElement.children
		
		if(nodeIndex == 0){
			navItemsList[nodeIndex].classList.add('active')
			this.navListLength = navItemsList.length
			if(navItemsList[0].dataset.step) this.step = navItemsList[0].dataset.step
			else this.step = 1
		}
	}


	getSchool(id){
		this.schoolsService.getSchool(id).subscribe(res =>{
			this.school = res;
			this.componentHeaderData.mainTitle.main = res.name.ar
			this.headerService.changeHeaderdata(this.componentHeaderData)
			// this.loadMap();
			// if(this.step ==2) 
		})
	}

	isToggleLabel(e)
	{

	}


	private loadMap(): void {		
		// [25.081622124248337, 55.216447958765755]

			this.map = L.map('map').setView([this.school?.address?.latitude, this.school?.address?.longitutde], 14);
			L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
				maxZoom: 19,
				attribution: '© OpenStreetMap'
			}).addTo(this.map);
	
	
			const icon = L.icon({
				iconUrl: 'assets/images/shared/map-marker.svg',
				shadowUrl: 'https://res.cloudinary.com/rodrigokamada/image/upload/v1637581626/Blog/angular-leaflet/marker-shadow.png',
				popupAnchor: [13, 0],
			});
	
			const marker = L.marker([this.school?.address.latitude, this.school?.address.longitutde], { icon }).bindPopup(this.school?.name.ar);
			marker.addTo(this.map);
		
	}


	hideNavControl=true;

	scrollLeft(el :ElementRef){
		this.nav.nativeElement.scrollTo({left: this.nav.nativeElement.scrollLeft - 175, behavior:'smooth'})
		this.hideNavControl = false;
	}
	
	scrollRight(el :ElementRef){
		this.nav.nativeElement.scrollTo({left: this.nav.nativeElement.scrollLeft + 175, behavior:'smooth'})
		if(this.nav.nativeElement.scrollLeft === 0) this.hideNavControl = true;
		
	}

}
