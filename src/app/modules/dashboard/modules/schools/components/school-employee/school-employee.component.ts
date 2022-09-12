import { Component, OnInit } from '@angular/core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { HeaderObj } from 'src/app/core/models/header-obj';
import { HeaderService } from 'src/app/core/services/header/header.service';

@Component({
	selector: 'app-school-employee',
	templateUrl: './school-employee.component.html',
	styleUrls: ['./school-employee.component.scss']
})
export class SchoolEmployeeComponent implements OnInit {

	faCheck = faCheck

	checked = true
	componentHeaderData: HeaderObj = {
		breadCrump: [
			{ label: this.translate.instant('dashboard.schools.schoolsList') },
			{ label: this.translate.instant('dashboard.schools.viewSchoolInfo') },
			{ label: this.translate.instant('dashboard.schools.editSchoolEmployeeInfo') },
		],
		mainTitle: { main: `${this.translate.instant('dashboard.schools.editSchoolEmployeeInfo')} (9724204)`, sub: "" },
	}

	constructor(
		public translate: TranslateService,
		private headerService: HeaderService,) { }

	ngOnInit(): void {

		this.headerService.changeHeaderdata(this.componentHeaderData)
	}

}
