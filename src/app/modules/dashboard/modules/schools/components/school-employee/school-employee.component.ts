import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { HeaderObj } from 'src/app/core/Models/header-obj';
import { HeaderService } from 'src/app/core/services/Header/header.service';

@Component({
  selector: 'app-school-employee',
  templateUrl: './school-employee.component.html',
  styleUrls: ['./school-employee.component.scss']
})
export class SchoolEmployeeComponent implements OnInit {

	// << ICONS >> //
  	faCheck=faCheck


  	// << DASHBOARD HEADER DATA >> //
	componentHeaderData: HeaderObj={
			breadCrump: [
				{label: this.translate.instant('dashboard.schools.schoolsList')},
				{label: this.translate.instant('dashboard.schools.viewSchoolInfo')},
				{label: this.translate.instant('dashboard.schools.editSchoolEmployeeInfo')},
			],
			mainTitle:{ main: `${this.translate.instant('dashboard.schools.editSchoolEmployeeInfo')} (9724204)`, sub:""},
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
		private headerService:HeaderService,) { }

	ngOnInit(): void {
		this.headerService.changeHeaderdata(this.componentHeaderData)
	}

}
