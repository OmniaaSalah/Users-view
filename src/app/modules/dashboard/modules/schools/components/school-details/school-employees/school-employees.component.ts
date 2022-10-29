import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs';
import { Filtration } from 'src/app/core/classes/filtration';
import { matchValues, passwordMatch } from 'src/app/core/classes/validation';
import { MenuItem } from 'src/app/core/models/dropdown/menu-item';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { StatusEnum } from 'src/app/shared/enums/status/status.enum';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { UserRolesService } from '../../../../user-roles/service/user-roles.service';
import { SchoolsService } from '../../../services/schools/schools.service';

@Component({
  selector: 'app-school-employees',
  templateUrl: './school-employees.component.html',
  styleUrls: ['./school-employees.component.scss']
})
export class SchoolEmployeesComponent implements OnInit {

  @Input('employees') employees=[]
  first = 0
  rows = 4
  employeesItems: MenuItem[]=[{label: this.translate.instant('shared.edit'), icon:'assets/images/shared/pen.svg'},]

  schoolId = this.route.snapshot.paramMap.get('schoolId')
  filtration={...Filtration,roleId:'', status:''}


  statusOptions =[...this.sharedService.statusOptions, {name: this.translate.instant('shared.allStatus.'+ StatusEnum.Deleted), value:StatusEnum.Deleted}]
  userRoles$ = this.roleService.getAllRoles().pipe(map((res:any)=> res.data))

  isEmployeeModelOpened=false


	// << FORMS >> //
	employeeForm= new FormGroup({
		role: new FormControl(null, Validators.required),
		status: new FormControl('', Validators.required),
		password: new FormControl('', Validators.required),
		confirmPassword: new FormControl('', Validators.required)
	},{validators:[passwordMatch('password', 'confirmPassword')]})



	get f () { return this.employeeForm.controls}
  
  constructor(
	private route: ActivatedRoute,
	private translate:TranslateService,
	private schoolsService:SchoolsService,
	private sharedService:SharedService,
	private roleService:UserRolesService
	) { }

ngOnInit(): void {
	this.getEmployees(this.schoolId)
}


getEmployees(schoolId){
	this.schoolsService.getSchoolEmployees(schoolId, this.filtration).subscribe()
}


paginationChanged(event: paginationState) {
	console.log(event);
	this.first = event.first
	this.rows = event.rows
}

}
