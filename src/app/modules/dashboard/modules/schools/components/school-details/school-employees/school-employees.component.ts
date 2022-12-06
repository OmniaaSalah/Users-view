import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter, map, shareReplay } from 'rxjs';
import { Filtration } from 'src/app/core/classes/filtration';
import { paginationInitialState } from 'src/app/core/classes/pagination';
import { passwordMatch } from 'src/app/core/classes/validation';

import { MenuItem } from 'src/app/core/models/dropdown/menu-item';
import { Filter } from 'src/app/core/models/filter/filter';
import { IHeader } from 'src/app/core/Models/header-dashboard';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { SchoolEmployee } from 'src/app/core/models/schools/school.model';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { ClaimsEnum } from 'src/app/shared/enums/claims/claims.enum';
import { StatusEnum } from 'src/app/shared/enums/status/status.enum';
import { UserScope } from 'src/app/shared/enums/user/user.enum';
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
	currentSchool="";
	lang =inject(TranslationService).lang;
	currentUserScope = inject(UserService).getCurrentUserScope()
	get userScope() { return UserScope }
	get claimsEnum () {return ClaimsEnum}
	get statusEnum(){ return StatusEnum}

	schoolId = this.route.snapshot.paramMap.get('schoolId')

	componentHeaderData: IHeader = {
		breadCrump: [
			
			{ label:this.translate.instant('dashboard.schools.schoolEmployee'), routerLink: `/dashboard/schoolEmployee-management/school/${this.schoolId}/employees`},
		],
		mainTitle: { main: this.currentSchool}
	}

	
	// Dropdown Items
	employeesItems: MenuItem[]=[{label: this.translate.instant('shared.edit'), icon:'assets/images/shared/pen.svg'},]


	// For Dropdown
	searchModel={...Filtration}

	filtration={...Filtration,jobtitelid:null, status:null}
	paginationState={...paginationInitialState}

	jobTitleOptions$ = this.schoolsService.getSchoolEmployeesJobTitle().pipe(filter(res=> res.name?.en != 'Manager'),shareReplay())
	statusOptions =[...this.sharedService.statusOptions, {name: this.translate.instant('shared.allStatus.'+ StatusEnum.Deleted), value:StatusEnum.Deleted}]
	employees$=this.schoolsService.getSchoolEmployees(this.schoolId,this.searchModel).pipe(map(res=>res.data))



	isEmployeeModelOpened=false
	isManagerModelOpened=false

	employees={
		totalAllData:0,
		total:0,
		list:[],
		loading:false
	}


  	schoolManager!: SchoolEmployee

	// << FORMS >> //
	employeeForm= new FormGroup({
		id: new FormControl(null),
		newManagerId: new FormControl(null),
		jobTitleId: new FormControl(null, Validators.required),
		status: new FormControl( '', Validators.required),
		password: new FormControl('', [ Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{1,30}')]),
		confirmPassword: new FormControl('')
	},{validators:[passwordMatch('password', 'confirmPassword')]})

	managerForm= new FormGroup({
		id: new FormControl(null),
		newManagerId: new FormControl(null, Validators.required),
		status: new FormControl(StatusEnum.Active, Validators.required),
		jobTitleId: new FormControl(1),
		password: new FormControl('', [ Validators.required,Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{1,30}')]),
		confirmPassword: new FormControl('', Validators.required)
	},{validators:[passwordMatch('password', 'confirmPassword')]})



	get employeeFormCtr () { return this.employeeForm.controls}
	get managerFormCtr () { return this.managerForm.controls}


  constructor(
	private route: ActivatedRoute,
	private translate:TranslateService,
	private schoolsService:SchoolsService,
	private sharedService:SharedService,
	private Toast :ToastService,
	private headerService: HeaderService,
	) { }

	ngOnInit(): void {
		if(this.currentUserScope==this.userScope.Employee)
		{
			this.schoolsService.currentSchoolName.subscribe((res)=>{
				if(res)  
				{
				  this.currentSchool=res;
				
				  this.componentHeaderData.mainTitle.main=this.currentSchool;
				}
		  })
		}
		if(this.currentUserScope==UserScope.Employee) this.headerService.changeHeaderdata(this.componentHeaderData)

		this.getSchoolManager()
		this.getEmployees()
	}

	getSchoolManager(){
		this.schoolManager =null
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

		}, err => this.employees.loading = false)
	}

	patchForm(employee){
		this.employeeForm.patchValue(employee)
	}	
	
	patchManagerForm(employee){
		this.managerForm.patchValue(employee)
	}	


	updateEmployee(employee){
		let {id, confirmPassword, ...newData} = employee

		this.schoolsService.updateEmpoyee(id, newData).subscribe(res =>{
			this.isEmployeeModelOpened = false
			this.getSchoolManager()
			this.getEmployees()
			this.Toast.success('تم التعديل بنجاح')
			// this.employeeForm.reset()
		}, err =>{
			this.Toast.error('فشل التعديل يمكن المحاوله مره اخرى')
		})
	}

	updateManager(employee){
		let {id, confirmPassword, ...newData} = employee

		this.schoolsService.updateEmpoyee(id, newData).subscribe(res =>{
			this.isManagerModelOpened = false
			this.getSchoolManager()
			this.getEmployees()
			this.Toast.success('تم التعديل بنجاح')
			//  this.managerForm.reset()
		}, err =>{
			this.Toast.error('فشل التعديل يمكن المحاوله مره اخرى')
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
