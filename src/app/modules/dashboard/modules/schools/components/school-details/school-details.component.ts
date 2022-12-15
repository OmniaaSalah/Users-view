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
import { CustomFile } from 'src/app/shared/components/file-upload/file-upload.component';
import { UserService } from 'src/app/core/services/user/user.service';
import { ClaimsEnum } from 'src/app/shared/enums/claims/claims.enum';
import { UserScope } from 'src/app/shared/enums/user/user.enum';
import { MessageService } from '../../../messages/service/message.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';




// declare var google: any;

@Component({
	selector: 'app-school-details',
	templateUrl: './school-details.component.html',
	styleUrls: ['./school-details.component.scss']
})
export class SchoolDetailsComponent implements OnInit, AfterViewInit {
	@ViewChild('nav') nav: ElementRef
	display;
	isShown1;
	isShown2;
	speaEmpForm: FormGroup
	imagesResult =[]
	messagesTypes = []
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
		private schoolsService:SchoolsService,
		private messageService: MessageService,
		private toastr:ToastrService,
		private formbuilder:FormBuilder) { }

	ngOnInit(): void {

		this.headerService.changeHeaderdata(this.componentHeaderData)
		this.getSchool(this.schoolId)
		this.getMessagesTypes()
		this.speaEmpForm = this.formbuilder.group({
			title: ['', [Validators.required,Validators.maxLength(32)]],
			switch1: [false, [Validators.required]],
			switch2: [false, [Validators.required]],
			switch3: [false, [Validators.required]],
			messageType: ['', [Validators.required]],
			description: ['', [Validators.required,Validators.maxLength(512)]],
		  });

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
		
			this.loadMap();
		})
	}

	isToggleLabel(e)
	{

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

	hideNavControl=true;

	scrollLeft(el :ElementRef){
		this.nav.nativeElement.scrollTo({left: this.nav.nativeElement.scrollLeft - 175, behavior:'smooth'})
		this.hideNavControl = false;
	}
	
	scrollRight(el :ElementRef){
		this.nav.nativeElement.scrollTo({left: this.nav.nativeElement.scrollLeft + 175, behavior:'smooth'})
		if(this.nav.nativeElement.scrollLeft === 0) this.hideNavControl = true;
		
	}

	getMessagesTypes(){
		this.messageService.getmessagesTypes().subscribe(res=>{
		  // console.log(res);
		  
		  this.messagesTypes = res.data
		})
	  }
	showDialog() {
		this.display = true;
    }
	isToggleLabel1(e)
    {
      if(e.checked)
      {
          this.isShown1=true;
  
      }
      else{
          this.isShown1=false;
      }
    }
    isToggleLabel2(e)
    {
      if(e.checked)
      {
          this.isShown2=true;
  
      }
      else{
          this.isShown2=false;
      }
    }
	messageUpload(files){
		this.imagesResult = files
		
	   }
	messageDeleted(event){
		  this.imagesResult = event		  
	   }

	   sendMessage(){    

        const form = {
          "senderId": Number(localStorage.getItem('$AJ$userId')),
          "messageTypeId": this.speaEmpForm.value.messageType,
          "schoolId": Number(this.route.snapshot.paramMap.get('schoolId')), 
          "title": this.speaEmpForm.value.title,
          "confirmationRecive": this.speaEmpForm.value.switch1,
          "replyPossibility": this.speaEmpForm.value.switch2,
          "showSenderName": this.speaEmpForm.value.switch3,
          "messegeText": this.speaEmpForm.value.description,
          'attachments':this.imagesResult.map(attachment=>{
            return attachment.url
          }) || null
        }    
        this.messageService.sendDataFromSpeaToEmp(form).subscribe(res=>{
          this.toastr.success('تم الارسال بنجاح')
          this.isShown1=false;
          this.isShown2=false;
          this.speaEmpForm.reset();
		  this.imagesResult = []
		  this.display = false;
        },err=>{
          this.toastr.error(err)
        })
	}

}
