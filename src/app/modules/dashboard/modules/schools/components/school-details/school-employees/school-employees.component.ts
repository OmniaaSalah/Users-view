import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter, map, shareReplay } from 'rxjs';
import { ArrayOperations } from 'src/app/core/classes/array';
import { Filtration } from 'src/app/core/classes/filtration';
import { paginationInitialState } from 'src/app/core/classes/pagination';
import { passwordMatch } from 'src/app/core/classes/validation';

import { MenuItem } from 'src/app/core/models/dropdown/menu-item';
import { IHeader } from 'src/app/core/Models/header-dashboard';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { SchoolEmployee } from 'src/app/core/models/schools/school.model';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { ClaimsEnum } from 'src/app/shared/enums/claims/claims.enum';
import { FileEnum } from 'src/app/shared/enums/file/file.enum';
import { StatusEnum } from 'src/app/shared/enums/status/status.enum';
import { UserScope } from 'src/app/shared/enums/user/user.enum';
import { ExportService } from 'src/app/shared/services/export/export.service';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { SchoolsService } from '../../../services/schools/schools.service';

@Component({
  selector: 'app-school-employees',
  templateUrl: './school-employees.component.html',
  styleUrls: ['./school-employees.component.scss'],
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
	isBtnLoading:boolean=false;

	employees={
		totalAllData:0,
		total:0,
		list:[],
		loading:true
	}

	isSubmited=false
  	schoolManager!: SchoolEmployee

	// << FORMS >> //
	employeeForm= new FormGroup({
		id: new FormControl(null),
		newManagerId: new FormControl(null),
		jobTitleId: new FormControl(null, Validators.required),
		status: new FormControl( '', Validators.required),
		password: new FormControl('', [ Validators.pattern('(?=\\D*\\d)(?=.*?[#?!@$%^&*-])(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}')]),
		confirmPassword: new FormControl('')
	},{validators:[passwordMatch('password', 'confirmPassword')]})

	managerForm= new FormGroup({
		id: new FormControl(null),
		newManagerId: new FormControl(null, Validators.required),
		status: new FormControl(StatusEnum.Active, Validators.required),
		jobTitleId: new FormControl(1),
		password: new FormControl('', [Validators.pattern('(?=\\D*\\d)(?=.*?[#?!@$%^&*-])(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}')]),
		confirmPassword: new FormControl('',)
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
	private router: Router,
	private userService:UserService,
	private exportService: ExportService,
	) { }

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
		this.sharedService.appliedFilterCount$.next(ArrayOperations.filledObjectItemsCount(this.filtration))
		this.employees.loading=true
		this.employees.list=[]
		this.schoolsService.getSchoolEmployees(this.schoolId, this.filtration).subscribe((res )=>{
			this.employees.loading = false
			this.employees.list = res.data
			this.employees.totalAllData = res.totalAllData
			this.employees.total =res.total
		}, err => {
			this.employees.loading = false;
			this.employees.total=0
		})
	}

	patchForm(employee){
		this.isEmployeeModelOpened=true;
		this.employeeForm.patchValue(employee)
	}	
	
	patchManagerForm(employee){
		this.managerForm.patchValue(employee)
	}	


	updateEmployee(employee){
		this.isSubmited=true
		let {id, confirmPassword, ...newData} = employee;
		
		this.schoolsService.updateEmpoyee(id,newData).subscribe((res) =>{
			this.Toast.success(this.translate.instant('Updated Successfully'))
			this.isEmployeeModelOpened=false;
			this.isSubmited=false
			this.getSchoolManager()
			this.getEmployees()
		}, (err) =>{
			this.isSubmited=false
			this.isEmployeeModelOpened=false;
			this.Toast.error(this.translate.instant('error happened in edit ,pleaze try again'))
		})
	}

	updateManager(employee){
		this.isSubmited=true

		let {id, confirmPassword, ...newData} = employee

		this.schoolsService.updateEmpoyee(id, newData).subscribe(res =>{
			this.isManagerModelOpened = false
			this.isSubmited=false
			this.getSchoolManager()
			this.getEmployees()
			this.Toast.success(this.translate.instant('Updated Successfully'))
		    
		}, err =>{
			this.isSubmited=false
			this.Toast.error(this.translate.instant('error happened in edit ,pleaze try again'))
		})
	}

   onSort(e){
    if(e.order==1) this.filtration.SortBy= 'old'
    else if(e.order == -1) this.filtration.SortBy= 'update'
	this.filtration.Page=1;
     this.getEmployees()
   }

   clearFilter(){
     this.filtration.KeyWord =''
	 this.filtration.jobtitelid = null
	 this.filtration.status=null
	 this.filtration.Page=1;
     this.getEmployees()
   }



   paginationChanged(event: paginationState) {
     this.filtration.Page = event.page
     this.getEmployees()

   }

   onExport(fileType: FileEnum){
    let filter = {...this.filtration, PageSize:null}
    this.schoolsService.employeesToExport(this.schoolId,filter).subscribe( (res) =>{
      
      this.exportService.exportFile(fileType, res, this.translate.instant('dashboard.schools.schoolEmployee'))
    })
  }

}
