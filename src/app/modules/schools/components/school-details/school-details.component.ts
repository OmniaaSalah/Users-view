import { AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { IHeader } from 'src/app/core/Models/header-dashboard';
import * as L from 'leaflet';
import { ActivatedRoute } from '@angular/router';
import { SchoolsService } from '../../services/schools/schools.service';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { School } from 'src/app/core/models/schools/school.model';
import { UserService } from 'src/app/core/services/user/user.service';
import { ClaimsEnum } from 'src/app/shared/enums/claims/claims.enum';
import { UserScope } from 'src/app/shared/enums/user/user.enum';
import { RouteListenrService } from 'src/app/shared/services/route-listenr/route-listenr.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from '../../../messages/service/message.service';
import { ToastrService } from 'ngx-toastr';
import { IndexesEnum } from 'src/app/shared/enums/indexes/indexes.enum';
import { IndexesService } from '../../../indexes/service/indexes.service';
import { getLocalizedValue } from 'src/app/core/classes/helpers';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { ClaimsService } from 'src/app/core/services/claims.service';




// declare var google: any;

@Component({
	selector: 'app-school-details',
	templateUrl: './school-details.component.html',
	styleUrls: ['./school-details.component.scss']
})
export class SchoolDetailsComponent implements OnInit, AfterViewInit {
	@ViewChild('nav') nav: ElementRef
	lang = inject(TranslationService).lang

	display;
	isShown1;
	isShown2;
	speaEmpForm: FormGroup
	imagesResult =[]
	messagesTypes = []
    checkedStatus:boolean=true;
	notCheckedStatus:boolean=false;


	get claimsEnum () {return ClaimsEnum}
	get userScope() { return UserScope }

	currentUserScope = inject(UserService).getScope()


	// << Route Data >> //
	schoolId = this.route.snapshot.paramMap.get('schoolId')
	school:School



	// << Data Placeholder>> //

	componentHeaderData: IHeader = {
		breadCrump: [
			{ label: this.translate.instant('breadcrumb.schoolList') , routerLink: '/schools-and-students/schools',routerLinkActiveOptions:{exact: true}},
			{ label: this.translate.instant('breadcrumb.showSchoolListDetails'), routerLink: `/schools-and-students/schools/school/${this.schoolId}`},
		],
		mainTitle: { main: '' }
	}

	// from tab 4
	// selectedGradeId


	map: any

	// << Conditions >> //
	step
	navListLength




	constructor(
		public translate: TranslateService,
		public sharedService: SharedService,
		private route: ActivatedRoute,
		private headerService: HeaderService,
		private routeListenrService:RouteListenrService,
		private schoolsService:SchoolsService,
		private messageService: MessageService,
		private toastr:ToastrService,
		private formbuilder:FormBuilder,
		private userService:UserService,
		private cliamsService:ClaimsService,
		private index:IndexesService) { }

	ngOnInit(): void {


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
		const routes=  [
			`/schools-and-students/schools/school/${this.schoolId}/grade/`,
			`/schools-and-students/schools/school/${this.schoolId}/division/`,
			`/school-management/school/${this.schoolId}/subjects/new-subject`,
			'/educational-settings/subject/edit-subject/',
			`/educational-settings/annual-holiday/edit-holiday/`
		];
		const previousUrl = this.routeListenrService.previousUrl
		let routeExist= routes.some(el=> previousUrl.includes(el))

		if(routeExist) setTimeout(()=>this.setActiveTab(this.sharedService.currentActiveStep$.value))
		else setTimeout(()=>this.setActiveTab(0))
	}

	steps=[
		{
			title: this.translate.instant('dashboard.schools.generalInfo'),
			index:0,
			claims:[],
			isActive:true
		},
		{
			title: this.translate.instant('dashboard.schools.schoolAddress'),
			index:1,
			claims:[],
			isActive:false
		},
		{
			title: this.translate.instant('dashboard.schools.schoolEmployee'),
			index:2,
			claims:[this.claimsEnum.E_MenuItem_SchoolEmployee],
			isActive:false
		},
		{
			title: this.translate.instant('dashboard.schools.schoolClasses'),
			index:3,
			claims:[this.claimsEnum.E_MenuItem_SchoolGrades],
			isActive:false
		},
		{
			title: this.translate.instant('dashboard.schools.schoolTracks'),
			index:4,
			claims:[this.claimsEnum.E_MenuItem_SchoolDivisions],
			isActive:false
		},
		{
			title: this.translate.instant('dashboard.schools.editableList'),
			index:5,
			claims:[this.claimsEnum.SE_MenuItem_EditList],
			isActive:false
		},
		{
			title: this.translate.instant('dashboard.schools.schoolSubjects'),
			index:6,
			claims:[this.claimsEnum.E_MenuItem_Subjects],
			isActive:false
		},
		{
			title: this.translate.instant('dashboard.schools.annualHolidays'),
			index:7,
			claims:[this.claimsEnum.E_MenuItem_AnnualHolidays],
			isActive:false
		}


	]

	// Set Default Active Tab In Case Any tab Element Removed From The Dom For permissions Purpose
	setActiveTab(stepIndex=0){
		if(stepIndex==1) this.loadMap()
		this.steps.forEach(el=>el.isActive=false)

		let allowedSteps = this.steps.filter(el => this.cliamsService.isUserAllowedTo(el.claims))
		this.navListLength = allowedSteps.length

		let el =this.steps.find(el => (el.index==stepIndex && this.cliamsService.isUserAllowedTo(el.claims)))
		if(el) {
			el.isActive =true
			this.step=el.index
		}else{
			allowedSteps[0].isActive =true
			this.step = allowedSteps[0].index
		}

		this.sharedService.currentActiveStep$.next(stepIndex)

	}


	getSchool(id){
		this.schoolsService.getSchool(id).subscribe(res =>{
			this.school = res;
			this.componentHeaderData.mainTitle.main = getLocalizedValue(res.name)
			this.headerService.changeHeaderdata(this.componentHeaderData)
		})
	}

	isToggleLabel(e)
	{

	}


	private loadMap(): void {
		// [25.081622124248337, 55.216447958765755]
		if(!this.map){

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


	}


	hideNavControl=true;

	scrollLeft(el :ElementRef){
		let stepLength = this.lang =='ar' ? (this.nav.nativeElement.scrollLeft - 175) : (this.nav.nativeElement.scrollLeft + 175)
		this.nav.nativeElement.scrollTo({left: stepLength, behavior:'smooth'})
		this.hideNavControl = false;
	}

	scrollRight(el :ElementRef){
		let stepLength = this.lang =='ar' ?(this.nav.nativeElement.scrollLeft + 175) : (this.nav.nativeElement.scrollLeft - 175)
		this.nav.nativeElement.scrollTo({left: stepLength, behavior:'smooth'})
		if(this.nav.nativeElement.scrollLeft === 0) this.hideNavControl = true;

	}

	getMessagesTypes(){
		this.index.getIndext(IndexesEnum.TtypeOfCommunicationMessage).subscribe(res=>{
		  this.messagesTypes = res
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

	onSubmit
	sendMessage(){
		this.onSubmit =true
        const form = {
          "senderId": Number(localStorage.getItem('$AJ$userId')),
          "messageTypeId": this.speaEmpForm.value.messageType,
          "schoolIds": [Number(this.route.snapshot.paramMap.get('schoolId'))],
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
		  this.onSubmit =false
          this.isShown1=false;
          this.isShown2=false;
          this.speaEmpForm.reset();
		  this.imagesResult = []
		  this.display = false;
        },err=>{
			this.onSubmit =false
          this.toastr.error(this.translate.instant('toasterMessage.error'))
        })
	}

}
