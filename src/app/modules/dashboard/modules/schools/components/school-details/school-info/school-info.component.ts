import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { id } from 'date-fns/locale';
import { IHeader } from 'src/app/core/Models';
import { School } from 'src/app/core/models/schools/school.model';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { UserScope } from 'src/app/shared/enums/user/user.enum';
import { CustomFile } from '../../../../assignments/assignments/exam-upload/exam-upload.component';
import { SchoolsService } from '../../../services/schools/schools.service';
import * as L from 'leaflet';
import { TranslateService } from '@ngx-translate/core';
import { ClaimsEnum } from 'src/app/shared/enums/claims/claims.enum';

@Component({
  selector: 'app-school-info',
  templateUrl: './school-info.component.html',
  styleUrls: ['./school-info.component.scss']
})
export class SchoolInfoComponent implements OnInit , AfterViewInit{
  currentUserScope = inject(UserService).getCurrentUserScope();
  currentSchool="";

  get userScope() { return UserScope }
  get claimsEnum () {return ClaimsEnum}
  schoolId = this.route.snapshot.paramMap.get('schoolId')
	school:School

  location="https://www.google.com/maps/place/25%C2%B004'53.8%22N+55%C2%B012'59.2%22E/@25.0816221,55.216448,17z/data=!4m4!3m3!8m2!3d25.0816221!4d55.216448"

  componentHeaderData: IHeader = {
		breadCrump: [
		
			{ label: this.translate.instant('breadcrumb.showSchoolListDetails'), routerLink: `/dashboard/school-management/school/${this.schoolId}`},
		],
		mainTitle: { main:  this.currentSchool}
	}

  map: any

  constructor(
	private translate:TranslateService,
    private route: ActivatedRoute,
    private headerService: HeaderService,
	private userService:UserService,
	private schoolsService:SchoolsService) { }

  ngOnInit(): void {
	if(this.currentUserScope==this.userScope.Employee)
	{
		this.userService.currentUserSchoolName$?.subscribe((res)=>{
			if(res)  
			{
			  this.currentSchool=res;
			
			  this.componentHeaderData.mainTitle.main=this.currentSchool;
			}
	  })
	}

    this.getSchool(this.schoolId);

  }
  ngAfterViewInit() {
}

getSchool(id){
	
	this.schoolsService.getSchool(id).subscribe((res) =>{
		this.school = res
		if(this.currentUserScope==UserScope.Employee) {
			this.componentHeaderData.mainTitle.main = res.name.ar
			this.headerService.changeHeaderdata(this.componentHeaderData)
			this.loadMap();
		}

		},(err)=>{})
	}

  onLogoFileUpload(event: CustomFile[]){
		
		
		const file={
			title:event[0].name,
			data: event[0].url
		}

		this.schoolsService.updateSchoolLogo(this.schoolId, file).subscribe()
	}
	
	onDiplomaFileUpload(event: CustomFile[]){
		const file={
			title:event[0].name,
			data: event[0].url
		}
		this.schoolsService.updateSchoolDiplomaLogo(this.schoolId, file).subscribe()
	}


  private loadMap(): void {
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
    // [this.school?.address.latitude, this.school?.address.longitutde]
		const marker = L.marker([25.081622124248337, 55.216447958765755], { icon }).bindPopup(this.school?.name.ar);
		marker.addTo(this.map);
	}

}
