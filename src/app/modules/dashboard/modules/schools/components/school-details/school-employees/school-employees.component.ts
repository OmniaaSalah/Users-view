import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Filtration } from 'src/app/core/classes/filtration';
import { paginationInitialState } from 'src/app/core/classes/pagination';
import { passwordMatch } from 'src/app/core/classes/validation';
import { MenuItem } from 'src/app/core/models/dropdown/menu-item';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { SchoolEmployee } from 'src/app/core/models/schools/school.model';
import { StatusEnum } from 'src/app/shared/enums/status/status.enum';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { SchoolsService } from '../../../services/schools/schools.service';

@Component({
  selector: 'app-school-employees',
  templateUrl: './school-employees.component.html',
  styleUrls: ['./school-employees.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchoolEmployeesComponent implements OnInit {

	get statusEnum(){ return StatusEnum}

	// Dropdown Items
	employeesItems: MenuItem[]=[{label: this.translate.instant('shared.edit'), icon:'assets/images/shared/pen.svg'},]

	schoolId = this.route.snapshot.paramMap.get('schoolId')
	
	filtration={...Filtration,jobtitelid:'', status:''}
	paginationState={...paginationInitialState}

	jobTitleOptions$ = this.schoolsService.getSchoolEmployeesJobTitle()
	// jobTitleOptions=[
	// 	{name:this.translate.instant('shared.jobTitle.SchoolManager'), value: JobTitle.SchoolManager},
	// 	{name:this.translate.instant('shared.jobTitle.Acountant'), value: JobTitle.Acountant},
	// 	{name:this.translate.instant('shared.jobTitle.Teacher'), value: JobTitle.Teacher},
	// 	{name:this.translate.instant('shared.jobTitle.Administrator'), value: JobTitle.Administrator},

	// ]
	statusOptions =[...this.sharedService.statusOptions, {name: this.translate.instant('shared.allStatus.'+ StatusEnum.Deleted), value:StatusEnum.Deleted}]
	userRoles


	isEmployeeModelOpened=false


	employees={
		totalAllData:0,
		total:0,
		list:[],
		loading:false
	}


  	schoolManager: SchoolEmployee

	// << FORMS >> //
	employeeForm= new FormGroup({
		id: new FormControl(null),
		jobTitle: new FormControl(null, Validators.required),
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
	private Toast :ToastService
	) { }

	ngOnInit(): void {
		this.getSchoolManager()
		this.getEmployees()
	}

	getSchoolManager(){
		this.schoolsService.getSchoolManager(this.schoolId).subscribe((res: SchoolEmployee) =>{
			this.schoolManager = res
		})
	}

	getEmployees(){
		this.employees.loading=true
		this.employees.list=[]
		this.schoolsService.getSchoolEmployees(this.schoolId, this.filtration)
		.subscribe((res )=>{
			this.employees.loading = false
			this.employees.list = res.data
			this.employees.totalAllData = res.totalAllData
			this.employees.total =res.total

		})
	}

	patchForm(employee){
		this.employeeForm.patchValue(employee)
	}									


	updateEmployee(employee: SchoolEmployee){
		let newData = 
		{
			jobTitle:employee.jobTitle
		}

		this.schoolsService.updateEmpoyee(employee.id, newData).subscribe(res =>{
			this.getEmployees()
			this.Toast.success('')
		}, err =>{
			this.Toast.error('')
		})
	}

   onSort(e){
    if(e.order==1) this.filtration.SortBy= 'old'
    else if(e.order == -1) this.filtration.SortBy= 'update'
     this.getEmployees()
   }
 
   clearFilter(){
     this.filtration.KeyWord =''
	 this.filtration.jobtitelid = null
	 this.filtration.status=null
     this.getEmployees()
   }
 

 
   paginationChanged(event: paginationState) { 
     this.filtration.Page = event.page
     this.getEmployees()
 
   }


}
