import {Component, ElementRef, inject, Input, OnInit, ViewChild } from '@angular/core';
import {FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter, map, shareReplay } from 'rxjs';
import { ArrayOperations } from 'src/app/core/helpers/array';
import { Filtration } from 'src/app/core/helpers/filtration';
import { paginationInitialState } from 'src/app/core/helpers/pagination';
import { passwordMatch } from 'src/app/core/helpers/validation';

import { MenuItem } from 'src/app/core/models/dropdown/menu-item';
import { IHeader } from 'src/app/core/Models/header-dashboard';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { SchoolEmployee } from 'src/app/core/models/schools/school.model';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { ClaimsEnum } from 'src/app/shared/enums/claims/claims.enum';
import { FileTypeEnum } from 'src/app/shared/enums/file/file.enum';
import { RegistrationStatus, StatusEnum } from 'src/app/shared/enums/status/status.enum';
import { UserScope } from 'src/app/shared/enums/user/user.enum';
import { ExportService } from 'src/app/shared/services/export/export.service';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { SchoolsService } from '../../../services/schools/schools.service';
import { Tooltip } from 'primeng/tooltip';

@Component({
  selector: 'app-school-employees',
  templateUrl: './school-employees.component.html',
  styleUrls: ['./school-employees.component.scss'],
})
export class SchoolEmployeesComponent implements OnInit {
  @ViewChild(Tooltip)  tooltip:Tooltip
	currentSchool="";
	lang =inject(TranslationService).lang;
	currentUserScope = inject(UserService).getScope()
	get userScope() { return UserScope }
	get claimsEnum () {return ClaimsEnum}
	get statusEnum(){ return StatusEnum}
	schoolId = this.route.snapshot.paramMap.get('schoolId')

	componentHeaderData: IHeader = {
		breadCrump: [

			{ label:this.translate.instant('dashboard.schools.schoolEmployee'), routerLink: `/schoolEmployee-management/school/${this.schoolId}/employees`},
		],
		mainTitle: { main: this.currentSchool}
	}


	// Dropdown Items
	employeesItems: MenuItem[]=[{label: this.translate.instant('shared.edit'), icon:'assets/images/shared/pen.svg'},]


	// For Dropdown
	searchModel={...Filtration}

	filtration={
    ...Filtration,
    jobtitelid:null,
    status:null,
    ...JSON.parse(localStorage.getItem('Emp-SearchQuery') || 'null')
  }
	paginationState={...paginationInitialState}

	jobTitleOptions$ = this.schoolsService.getSchoolEmployeesJobTitle().pipe(filter(res=> res.name?.en != 'Manager'),shareReplay())
	statusOptions =[...this.sharedService.statusOptions, {name: this.translate.instant('shared.allStatus.'+ RegistrationStatus.Deleted), value:RegistrationStatus.Deleted}]
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
					this.currentSchool= res;
					this.componentHeaderData.mainTitle.main=this.currentSchool[this.lang];
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
		},err =>{

    })
	}


	getEmployees(){
    if(localStorage.getItem('Emp-SearchQuery')){
      this.filtration = {...JSON.parse(localStorage.getItem('Emp-SearchQuery')), ...this.filtration}
    }
    localStorage.setItem('Emp-SearchQuery',JSON.stringify(this.filtration))

		this.sharedService.appliedFilterCount$.next(ArrayOperations.filledObjectItemsCount(this.filtration))
		this.employees.loading=true
		this.employees.list=[]
		this.schoolsService.getSchoolEmployees(this.schoolId, this.filtration).subscribe((res )=>{
			this.sharedService.filterLoading.next(false);
			this.employees.loading = false
			this.employees.list = res.data
			this.employees.totalAllData = res.totalAllData
			this.employees.total =res.total
		}, err => {
			this.employees.loading = false;
			this.employees.total=0
			this.sharedService.filterLoading.next(false);
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
   localStorage.removeItem('Emp-SearchQuery')
     this.getEmployees()
   }



   paginationChanged(event: paginationState) {
     this.filtration.Page = event.page
     this.getEmployees()

   }

   onExport(fileType: FileTypeEnum){
    this.exportService.showLoader$.next(true)
    let filter = {...this.filtration, PageSize:this.employees.totalAllData,Page:1}
    this.schoolsService.employeesToExport(this.schoolId,filter).subscribe( (res) =>{

      this.exportService.exportFile(fileType, res, this.translate.instant('dashboard.schools.schoolEmployee'))
    })
  }

  onClick(e:ElementRef){
    this.tooltip.hide()
    console.log(e);

  }

}
