import { Component, OnInit,inject} from '@angular/core';
import { faAngleRight, faAngleLeft, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { Table } from 'primeng/table';
import { map } from 'rxjs';
import { Filtration } from 'src/app/core/classes/filtration';
import { paginationInitialState } from 'src/app/core/classes/pagination';
import { MenuItem } from 'src/app/core/models/dropdown/menu-item';
import { Filter } from 'src/app/core/models/filter/filter';
import { IHeader } from 'src/app/core/Models/header-dashboard';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { ClaimsEnum } from 'src/app/shared/enums/claims/claims.enum';
import { UserScope } from 'src/app/shared/enums/user/user.enum';
import { CountriesService } from 'src/app/shared/services/countries/countries.service';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { DivisionService } from '../../../schools/services/division/division.service';
import { GradesService } from '../../../schools/services/grade/grade.service';
import { SchoolsService } from '../../../schools/services/schools/schools.service';
import { StudentsService } from '../../services/students/students.service';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})

export class StudentsListComponent implements OnInit {

  lang = inject(TranslationService).lang

  currentUserScope = inject(UserService).getCurrentUserScope()
  get claimsEnum(){ return ClaimsEnum }
  // << ICONS >> //
  faAngleLeft = faAngleLeft
  faAngleDown = faAngleDown

 
  isCollapsed=true

  // << HRADER DATA >> //
  componentHeaderData: IHeader={
		breadCrump: [],
	}




  filtration:Filter = {
    ...Filtration, 
    schoolYearId:1,
    SchoolId:"", 
    curriculumId:"", 
    GradeId:"",
    DivisionId:"",
    TrackId:"",
    NationalityId:"",
    IsPassed:null,
    IsChildOfAMartyr: null, 
    TalentId: null,
    IsSpecialAbilities:null,
    // انواع الفصول الخاصه
    IsInFusionClass:null,
    IsSpecialClass:null
  }
  paginationState= {...paginationInitialState}

  // << CONDITIONS >> //
  schoolId
  isSchoolSelected = false
  isGradeSelected = false

  newSchoolId;
  // << DATA PLACEHOLDER >> //
  countries$ = this.countriesService.getCountries()
  curriculums$ = this.sharedService.getAllCurriculum()
  schools$ = this.schoolsService.getAllSchools()
  AllTracks$ =this.sharedService.getAllTraks()
  AllGrades$;
  AllDivisions$;
  gradeTracks$
  schoolDivisions$ 

  talents$ = this.studentsService.getTalents()
  booleanOptions = this.sharedService.booleanOptions

  passedOptions = [
    {name: this.translate.instant('shared.allStatus.passed'), value:true}, 
    {name: this.translate.instant('shared.allStatus.notPassed'), value:false}
  ]

  specialClassOptions = [
    {name: this.translate.instant('shared.specialClass'), value:'specialClass'},
    {name: this.translate.instant('shared.fusionClass'), value:'fusionClass'}
  ]
  

  students ={
    total:0,
    totalAllData:0,
    list:[],
    loading:false
  }

  constructor(
    private translate: TranslateService,
    private headerService:HeaderService,
    private studentsService: StudentsService,
    private sharedService: SharedService,
    private countriesService: CountriesService,
    private schoolsService: SchoolsService,
    private userService:UserService,
    private divisionService: DivisionService,
    private gradesService:GradesService
  ) { }

  ngOnInit(): void {
    this.checkDashboardHeader();
    this.headerService.changeHeaderdata(this.componentHeaderData)
  
    this.checkStudentList();
    this.userService.currentUserSchoolId$.subscribe(id =>{  
    this.schoolId=id;
    if(id)
    { this.schoolSelected(id);}
    else
    {id=''}
    this.AllDivisions$ =this.sharedService.getAllDivisions(id)
    this.AllGrades$ =this.sharedService.getAllGrades(id)
     
     
    })

  }


  schoolSelected(SchoolId){
    this.schoolId=SchoolId
    this.isSchoolSelected = true
    this.schoolDivisions$ = this.divisionService.getSchoolDivisions(SchoolId,{gradeid:this.filtration.GradeId||null}).pipe(map(res => res.data))
    this.onGradeSelected(this.filtration.GradeId||null)
  }

  onGradeSelected(GradeId){
    if(!GradeId) return

    this.isGradeSelected=true
    if( this.isGradeSelected && this.isSchoolSelected){
      this.gradeTracks$ = this.gradesService.getGradeTracks(this.filtration.SchoolId,GradeId)
      this.schoolDivisions$ = this.divisionService.getSchoolDivisions(this.schoolId,{gradeid:this.filtration.GradeId||null}).pipe(map(res => res.data))

    }
  }


  
  getStudents(){
    this.students.loading=true
    this.students.list=[]
    this.studentsService.getAllStudents(this.filtration)
    .subscribe(res=>{
      this.students.loading=false
      this.students.list = res.data
      this.students.totalAllData = res.totalAllData
      this.students.total =res.total 

    },err=> {
      this.students.loading=false
      this.students.total=0
    })
  }

  // schoolSelected(SchoolId){
  //   this.isSchoolSelected = true
  //   this.schoolGrades$ = this.gradesService.getSchoolGardes(SchoolId)
  //   this.schoolTracks$ = this.gradesService.getGradeTracks(SchoolId)
  //   this.schoolDivisions$ = this.divisionService.getAllDivisions(SchoolId)
  // }

  onSpecialClassSelected(val){
    if(val === 'specialClass') {this.filtration.IsSpecialClass = true; this.filtration.IsInFusionClass = false}
    else if(val === 'fusionClass') {this.filtration.IsInFusionClass = true ; this.filtration.IsSpecialClass = false}
    else { this.filtration.IsInFusionClass =null; this.filtration.IsSpecialClass=null}
  }


  onSort(e){
    if(e.order==1) this.filtration.SortBy= 'old'
    else if(e.order == -1) this.filtration.SortBy= 'update'
    this.checkStudentList();
  }

  clearFilter(){
    this.filtration.KeyWord =''
    this.filtration.SchoolId= null
    this.filtration.curriculumId= null
    this.filtration.GradeId= null
    this.filtration.DivisionId =''
    this.filtration.TrackId = null
    this.filtration.NationalityId= null
    this.filtration.IsChildOfAMartyr = null
    this.filtration.TalentId = null
    this.filtration.IsPassed = null
    this.filtration.IsSpecialClass= null
    this.filtration.IsInFusionClass= null
    this.filtration.IsSpecialAbilities = null
    this.checkStudentList();
  }


  paginationChanged(event: paginationState) {
    this.filtration.Page = event.page
    this.checkStudentList();

  }
  get userScope() 
  { 
    return UserScope 
  }

  checkDashboardHeader()
  {
      if(this.currentUserScope==UserScope.Employee)
    {
      this.componentHeaderData.breadCrump=
      [
        {label:this.translate.instant('dashboard.schools.studentsList') ,routerLink:'/dashboard/student-management/students'},
      ]

      
    }
    else if (this.currentUserScope==UserScope.SPEA)
    {
      this.componentHeaderData.breadCrump=
         [
          {label:this.translate.instant('dashboard.schools.studentsList'),routerLink:'/dashboard/schools-and-students/students'},
        ]

      
    }
  }

  checkStudentList()
  {
    if(this.currentUserScope==this.userScope.Employee)
    {
    this.userService.currentUserSchoolId$.subscribe(id =>{      
      this.filtration.SchoolId=id;
      this.getStudents()
    })
  }
    else{
    this.getStudents()
    }
  }

}
