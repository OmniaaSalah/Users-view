import { AfterViewInit, Component, ElementRef, EventEmitter, inject, Input, OnChanges, OnInit, Output, QueryList, Renderer2, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
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
import { RegisterChildService } from '../../../services/register-child/register-child.service';
import { UserScope } from 'src/app/shared/enums/user/user.enum';
import { UserService } from 'src/app/core/services/user/user.service';
import { ClaimsService } from 'src/app/core/services/claims.service';
import { MessageService } from '../../../../messages/service/message.service';
import { Filtration } from 'src/app/core/classes/filtration';

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
  currentUserScope = inject(UserService).getCurrentUserScope()

  faXmark =faXmark

  isAccountant = this.cliamsService.isUserAllowedTo(this.claimsEnum.E_Acc_R_StudentPayments)

  classType;
  student$: Observable<Student> = this.childService.Student$

  isLoading=false
  editStudentinfoMode =false
  isAccountantCommentModel=false

  studentId = +this.route.snapshot.paramMap.get('id')

  changeIdentityModelOpened=false

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
  reasonForNotHaveIdentityOptions$=this.indexService.getIndext(IndexesEnum.TheReasonForLackOfIdentification).pipe(debounceTime(1000))

  educationType$ = this.indexService.getIndext(IndexesEnum.SpecialEducation)
  AllGuardians$ = this.messageService.getGuardian({}).pipe(map(res =>res.data))
  AllGuardians = []
  guardiansFilteration={...Filtration}

  specialClassOptions = [
    {name: this.translate.instant('shared.specialClass'), value:'specialClass'},
    {name: this.translate.instant('shared.fusionClass'), value:'fusionClass'}
  ]

    // << FORMS >> //

  constructor(
    private fb:FormBuilder,
    private sharedService: SharedService,
    private CountriesService:CountriesService,
    private route: ActivatedRoute,
    private cliamsService:ClaimsService,
    private studentsService: StudentsService,
    public childService:RegisterChildService,
    private translate:TranslateService,
    private messageService: MessageService,
    private indexService:IndexesService) { }


  ngOnInit(): void {
    this.setClassType()
  }

  onLazyLoad(event){
    console.log(event);

    this.guardiansFilteration.Page = Math.ceil((event.first - 1) / this.guardiansFilteration.PageSize) + 1;
console.log(this.guardiansFilteration.Page);

    this.getGuardians()
  }
  getGuardians(){
    this.studentsService.getAllStudents(this.guardiansFilteration)
    .pipe(map(res =>res.data))
    .subscribe(res =>{
      // this.AllGuardians = [...this.AllGuardians, ...res]
      this.AllGuardians = res
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
    this.childService.onEditMode$.next(false)
  }

}

