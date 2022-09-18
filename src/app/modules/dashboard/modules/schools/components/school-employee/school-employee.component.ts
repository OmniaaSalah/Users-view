import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { IHeader } from 'src/app/core/Models/iheader';
import { HeaderService } from 'src/app/core/services/header-service/header.service';

@Component({
	selector: 'app-school-employee',
	templateUrl: './school-employee.component.html',
	styleUrls: ['./school-employee.component.scss']
})
export class SchoolEmployeeComponent implements OnInit {

	// << ICONS >> //
  	faCheck=faCheck

	schoolId = this.route.snapshot.paramMap.get('schoolId')
	employeeId = this.route.snapshot.paramMap.get('employeeId')

  	// << DASHBOARD HEADER DATA >> //
	componentHeaderData: IHeader={
			breadCrump: [
				{
					label: this.translate.instant('dashboard.schools.schoolsList'),
					routerLink: '/dashboard/schools-and-students/schools',routerLinkActiveOptions:{exact: true}},
				{
					label: this.translate.instant('dashboard.schools.viewSchoolInfo'),
					routerLink: `/dashboard/schools-and-students/schools/school/${this.schoolId}`,routerLinkActiveOptions:{exact: true}
				},
				{
					label: this.translate.instant('dashboard.schools.editSchoolEmployeeInfo'),
					routerLink: `/dashboard/schools-and-students/schools/school/${this.schoolId}/employee/${this.employeeId}`
				},
			],
			mainTitle:{ main: `${this.translate.instant('dashboard.schools.editSchoolEmployeeInfo')} (${this.employeeId})`, sub:""},
	}

	
	// << CONDITIONS >> //
	checked=true

	
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
		private headerService: HeaderService,
		private route :ActivatedRoute) { }

	ngOnInit(): void {
		this.headerService.changeHeaderdata(this.componentHeaderData)
	}

}
