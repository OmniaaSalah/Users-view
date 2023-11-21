import { Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { debounceTime, map, Observable, share } from 'rxjs';
import { GenericResponse } from 'src/app/core/models/global/global.model';
import { Student } from 'src/app/core/models/student/student.model';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { IndexesEnum } from 'src/app/shared/enums/indexes/indexes.enum';
import { ClaimsEnum } from 'src/app/shared/enums/claims/claims.enum';
import { CountriesService } from 'src/app/shared/services/countries/countries.service';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { IndexesService } from '../../../../indexes/service/indexes.service';
import { StudentsService } from '../../../../students/services/students/students.service';
import { StudentService } from '../../../services/register-child/register-child.service';
import { UserScope } from 'src/app/shared/enums/user/user.enum';
import { UserService } from 'src/app/core/services/user/user.service';
import { ClaimsService } from 'src/app/core/services/claims.service';
import { BaseSearchModel } from 'src/app/core/models/filter-search/base-search-model';
import { ParentService } from '../../../../parants/services/parent.service';
import { paginationInitialState } from 'src/app/core/helpers/pagination';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss']
})
export class PersonalInformationComponent implements OnInit {
  @Input('formGroup') studentForm:FormGroup
  @Output() openChangeIdentityModel = new EventEmitter()
  @Output() onFormSubmitted = new EventEmitter()

  @Input() mode : 'edit'| 'view'= 'view'
  @Output() modeChange = new EventEmitter();

  lang =inject(TranslationService).lang;
  get claimsEnum(){ return ClaimsEnum }
  get scopeEnum(){ return UserScope }
  currentUserScope = inject(UserService).getScope()

  faXmark =faXmark

  isAccountant = this.cliamsService.isUserAllowedTo(this.claimsEnum.E_Acc_R_StudentPayments)

  classType;
  student$: Observable<Student> = this.childService.Student$

  isLoading=false
  editStudentinfoMode =false
  isAccountantCommentModel=false

  studentId = this.route.snapshot.paramMap.get('id')

  changeIdentityModelOpened=false
  isGuardiansModelOpend=false

    // << DATA PLACEHOLDER >> //

  genderOptions=this.sharedService.genderOptions
  booleanOptions = this.sharedService.booleanOptions;
  cities = this.CountriesService.cities
  cities$ = this.CountriesService.getCities()
  states$ = this.CountriesService.getAllStates()
  talents$ = inject(IndexesService).getIndext(IndexesEnum.TheTypeOfTalentOfTheStudent);
  nationalitiesCategory$ = this.indexService.getIndext(IndexesEnum.NationalityCategory)
  languages$ = this.indexService.getIndext(IndexesEnum.Language).pipe(share())
  countries$ = this.CountriesService.getCountries()
  religions$= this.sharedService.getReligion()
  relativeRelation$= this.sharedService.getParentRelative()
  reasonForNotHaveIdentityOptions$=this.indexService.getIndext(IndexesEnum.TheReasonForLackOfIdentification)




  educationType$ = this.indexService.getIndext(IndexesEnum.SpecialEducation)
  AllGuardians$ = this.guardiansService.getGuardianDropdown({}).pipe(map(res =>res.data))

  selectedGuardianId

  AllGuardians ={
    list:[],
    totalAllData:0,
    total:0,
    loading:false
  }
  guardiansFilteration={...BaseSearchModel ,PageSize:30, NationalityId:'', emiratesId:''}
	paginationState= paginationInitialState

  specialClassOptions = [
    {name: this.translate.instant('shared.specialClass'), value:'specialClass'},
    {name: this.translate.instant('shared.fusionClass'), value:'fusionClass'}
  ]

  attendanceType = [
    {name: this.translate.instant('students.Physical'), value:'Physical'},
    {name: this.translate.instant('students.Mixed'), value:'Mixed'},
    {name: this.translate.instant('students.Remote'), value:'Remote'},

  ]

    // << FORMS >> //

  constructor(
    private fb:FormBuilder,
    private sharedService: SharedService,
    private CountriesService:CountriesService,
    private route: ActivatedRoute,
    private cliamsService:ClaimsService,
    private studentsService: StudentsService,
    public childService:StudentService,
    private translate:TranslateService,
    private guardiansService:ParentService,
    private indexService:IndexesService) { }


  ngOnInit(): void {
    this.setClassType()

    this.childService.Student$.subscribe(res=> this.selectedGuardianId = res?.guardianId)
  }

  onLazyLoad(event){
    console.log(event);

    this.guardiansFilteration.Page = Math.ceil((event.first - 1) / this.guardiansFilteration.PageSize) + 1;
      console.log(this.guardiansFilteration.Page);

    this.getGuardians()
  }


  getGuardians(){
    this.AllGuardians.loading=true
		this.AllGuardians.list=[]
    this.guardiansService.getAllParents(this.guardiansFilteration)
    .subscribe((res:any) =>{
      // this.AllGuardians = [...this.AllGuardians, ...res]
      this.AllGuardians.list = res.data
      this.AllGuardians.totalAllData = res.totalAllData
			this.AllGuardians.total =res.total
			this.AllGuardians.loading = false
      this.paginationState.rows=30
      this.sharedService.filterLoading.next(false);

    },()=>{
      this.sharedService.filterLoading.next(false);

    })
  }

  get isSpecialClass() {
    return this.studentForm.controls['isSpecialClass'] as FormControl;
  }
  get isInFusionClass() {
    return this.studentForm.controls['isInFusionClass'] as FormControl;
  }

  get isSpecialAbilities() {
    return this.studentForm.controls['isSpecialAbilities'] as FormControl;
  }

  getStudent(studentId){
    this.isLoading = true
    this.studentsService.getStudent(studentId).subscribe((res:GenericResponse<Student>) =>{
      this.setClassType()
      this.isLoading = true
    })
  }

  onSpecialClassSelected(val){
    if(val === 'specialClass') {this.isSpecialClass.setValue(true); this.isInFusionClass.setValue(false)}
    else if(val === 'fusionClass') {this.isInFusionClass.setValue(true); this.isSpecialClass.setValue(false)}

  }

  setClassType(){
      this.student$.subscribe((res)=>{

       if(res?.isSpecialAbilities){
            if(res?.isSpecialClass) this.classType='specialClass';
            else if(!res?.isSpecialClass) this.classType= 'fusionClass';
        }

    });


  }


  ngOnDestroy(): void {
  }

  changeGuardian(){
    this.studentForm.controls['guardianId'].setValue(this.selectedGuardianId)
    this.isGuardiansModelOpend=false
    this.onFormSubmitted.emit()
  }


  paginationChanged(event: paginationState) {
		this.guardiansFilteration.Page = event.page
    this.guardiansFilteration.PageSize = event.rows
		this.getGuardians();
	}
}

