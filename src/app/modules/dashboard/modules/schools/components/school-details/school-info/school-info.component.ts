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
import { ClaimsEnum } from 'src/app/shared/enums/permissions/permissions.enum';

@Component({
  selector: 'app-school-info',
  templateUrl: './school-info.component.html',
  styleUrls: ['./school-info.component.scss']
})
export class SchoolInfoComponent implements OnInit , AfterViewInit{
  currentUserScope = inject(UserService).getCurrentUserScope();
  checkedStatus:boolean=true;
  notCheckedStatus:boolean=false;
  get userScope() { return UserScope }
  get claimsEnum () {return ClaimsEnum}
  schoolId = this.route.snapshot.paramMap.get('schoolId')
	school:School

  location="https://www.google.com/maps/place/25%C2%B004'53.8%22N+55%C2%B012'59.2%22E/@25.0816221,55.216448,17z/data=!4m4!3m3!8m2!3d25.0816221!4d55.216448"

  componentHeaderData: IHeader = {
		breadCrump: [
			{ label: 'اداره المدرسه ' },
			{ label: 'الاطلاع على معلومات المدرسه', routerLink: `/dashboard/school-management/school/${this.schoolId}`},
		],
		mainTitle: { main: 'مدرسه الشارقه الابتدائيه' }
	}

  map: any

  constructor(
    private route: ActivatedRoute,
    private headerService: HeaderService,
		private schoolsService:SchoolsService) { }

  ngOnInit(): void {
    this.getSchool(this.schoolId);
	console.log("ggg")
  }
  ngAfterViewInit() {
    this.loadMap();
	}
  
  getSchool(id){
    if(this.currentUserScope==UserScope.Employee) this.headerService.changeHeaderdata(this.componentHeaderData)

    this.schoolsService.getSchool(id).subscribe((res) =>{
      this.componentHeaderData.mainTitle.main = res.name.ar
	  console.log("hh")
			this.school = res
			console.log(this.school)
		},(err)=>{console.log("kk")})
	}

  onLogoFileUpload(event: CustomFile[]){
		console.log(event);
		
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
