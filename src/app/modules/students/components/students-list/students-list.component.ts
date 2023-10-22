import { Component, OnInit,inject} from '@angular/core';
import { faAngleLeft, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { map, shareReplay } from 'rxjs';
import { BaseSearchModel } from 'src/app/core/models/filter-search/base-search-model';
import { paginationInitialState } from 'src/app/core/helpers/pagination';
import { IHeader } from 'src/app/core/Models/header-dashboard';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { ClaimsEnum } from 'src/app/shared/enums/claims/claims.enum';
import { FileTypeEnum } from 'src/app/shared/enums/file/file.enum';
import { IndexesEnum } from 'src/app/shared/enums/indexes/indexes.enum';
import { StatusEnum } from 'src/app/shared/enums/status/status.enum';
import { UserScope } from 'src/app/shared/enums/user/user.enum';
import { CountriesService } from 'src/app/shared/services/countries/countries.service';
import { ExportService } from 'src/app/shared/services/export/export.service';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { IndexesService } from '../../../indexes/service/indexes.service';
import { DivisionService } from '../../../schools/services/division/division.service';
import { GradesService } from '../../../schools/services/grade/grade.service';
import { SettingsService } from '../../../system-setting/services/settings/settings.service';
import { StudentsService } from '../../services/students/students.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})

export class StudentsListComponent implements OnInit {

  lang = inject(TranslationService).lang
  genderList=[];
  studentCategoryList=[];
  currentUserScope = inject(UserService).getScope()
  get claimsEnum(){ return ClaimsEnum }

  get statusEnum(){ return StatusEnum }
  // << ICONS >> //
  faAngleLeft = faAngleLeft
  faAngleDown = faAngleDown


  isCollapsed=true

  // << HRADER DATA >> //
  componentHeaderData: IHeader={
		breadCrump: [],
    mainTitle: {
      main: this.translate.instant('dashboard.schools.studentsList'),
    },
	}




  filtration =
  {
    ...BaseSearchModel,
    schoolYearId:1,
    SchoolId:null,
    curriculumId:null,
    GradeId:null,
    DivisionId:null,
    TrackId:null,
    NationalityId:null,
    IsPassed:null,
    StudentCategory:null,
    IsChildOfAMartyr: null,
    talentId: null,
    IsSpecialAbilities:null,
    // انواع الفصول الخاصه
    IsInFusionClass:null,
    IsSpecialClass:null,
    StudentDegreeResultFilter:null,
    gender:null,
    StudentDaleel2Id:null,
    ...JSON.parse(this.route.snapshot.queryParams['searchQuery'] || 'null')
  }
  paginationState= {...paginationInitialState}

  // << CONDITIONS >> //
  schoolId
  isSchoolSelected = false
  isGradeSelected = false

  newSchoolId;
  isSchoolAllowToTransferGroup$

  // << DATA PLACEHOLDER >> //
  countries$ = this.countriesService.getCountries().pipe(shareReplay())
  curriculums$ = this.sharedService.getAllCurriculum().pipe(shareReplay())
  schools$ = this.studentsService.getSchools().pipe(shareReplay())
  AllTracks$ =this.sharedService.getAllTraks().pipe(shareReplay())
  AllGrades$;
  AllDivisions$;
  gradeTracks$
  schoolDivisions$

  talents$ =  this.indexService.getIndext(IndexesEnum.TheTypeOfTalentOfTheStudent).pipe(shareReplay());
  booleanOptions = this.sharedService.booleanOptions

  passedOptions = [
    {name: this.translate.instant('shared.allStatus.Passed'), value:StatusEnum.Passed},
    {name: this.translate.instant('shared.allStatus.notPassed'), value:StatusEnum.Failed},
    {name: this.translate.instant('shared.allStatus.notComplete'), value:StatusEnum.Incomplete}
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

  isSearching =false

  onCurriculumSelected(ids){
    this.schools$ = this.studentsService.getSchools({curriculumId:ids}).pipe(shareReplay())

  }

  constructor(
    private translate: TranslateService,
    private headerService:HeaderService,
    private studentsService: StudentsService,
    private sharedService: SharedService,
    private countriesService: CountriesService,
    private userService:UserService,
    private divisionService: DivisionService,
    private gradesService:GradesService,
    private exportService:ExportService,
    private settings:SettingsService,
    private indexService:IndexesService,
    private route:ActivatedRoute,
    private router:Router,
    private toaster:ToastrService
  ) { }

  ngOnInit(): void {

    this.checkDashboardHeader();
    this.genderList = this.sharedService.genderOptions

    this.checkStudentList();
    this.userService.currentUserSchoolId$.subscribe(id =>{

        this.schoolId=id;
        if(id){

          this.schoolSelected(id);
          this.isSchoolAllowToTransferGroup$=this.settings.isSchoolAllowToTransferGroup(this.schoolId)
        }
        else{
          id=''
        }
        this.AllDivisions$ =this.sharedService.getAllDivisions(id).pipe(shareReplay())
        this.AllGrades$ =this.sharedService.getAllGrades(id).pipe(shareReplay())


    })
   this.studentCategoryList=this.sharedService.studentCategoryList;
  }


  schoolSelected(SchoolId){
    this.schoolId=SchoolId
    if(this.schoolId)
    {
      this.isSchoolSelected = true
      this.schoolDivisions$ = this.divisionService.getSchoolDivisions({schoolId:this.currentUserScope==this.userScope.Employee ?[this.schoolId]:this.schoolId,gradeid:this.filtration.GradeId||null}).pipe(map(res => res.data))
      this.onGradeSelected(this.filtration.GradeId||null)
    }
    else
    {this.isSchoolSelected = false}

  }

  onGradeSelected(GradeId){

   if(GradeId)
   { if(!GradeId.length)
      {this.isGradeSelected=false}
    else
      {
      this.isGradeSelected=true
      if( this.isGradeSelected && this.isSchoolSelected){
        this.gradeTracks$ = this.gradesService.getGradeTracks(this.currentUserScope==this.userScope.Employee ?[this.schoolId]:this.schoolId,GradeId).pipe(shareReplay())
        this.schoolDivisions$ = this.divisionService.getSchoolDivisions({schoolId:this.currentUserScope==this.userScope.Employee ?[this.schoolId]:this.schoolId,gradeid:GradeId||null}).pipe(map(res => res.data), shareReplay())
      }
      }
    }
  }



  getStudents(){
    this.students.loading=true
    this.students.list=[]

    if(this.route.snapshot.queryParams['searchQuery']){
      this.filtration = {...JSON.parse(this.route.snapshot.queryParams['searchQuery']), ...this.filtration}
    }
    this.router.navigate([], {
      queryParams: {searchQuery : JSON.stringify(this.filtration)},
      relativeTo: this.route,

    });


    this.studentsService.getAllStudents(this.filtration)
    .subscribe(res=>{
      this.students.list = res.data
      this.students.totalAllData = res.totalAllData
      this.students.total = res.total
      this.isSearching =false
      this.students.loading=false


    },err=> {
      this.students.loading=false
      this.students.total=0
      this.isSearching =false
    })
  }
  getStudentsInSpecificSchool(schoolId){
    // this.filtration.SchoolId=[Number(schoolId)]
    this.students.loading=true
    this.students.list=[]

    if(this.route.snapshot.queryParams['searchQuery']){
      this.filtration = {...JSON.parse(this.route.snapshot.queryParams['searchQuery']), ...this.filtration}
    }
    this.router.navigate([], {
      queryParams: {searchQuery : JSON.stringify(this.filtration)},
      relativeTo: this.route,

    });


    this.studentsService.getAllStudentsInSpecificSchool(this.filtration,schoolId)
    .subscribe(res=>{
      this.students.loading=false
      this.students.list = res.result.data
      this.students.totalAllData = res.result.totalAllData
      this.students.total =res.result.total
      this.isSearching =false

    },err=> {
      this.students.loading=false
      this.isSearching =false
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
    if(e.order==-1)
    {this.filtration.SortBy="ASC"}
    else
    {this.filtration.SortBy="desc"}
    this.filtration.SortColumnName=e.field;
    this.filtration.Page=1;
    this.checkStudentList();
  }

  clearFilter(){
    this.filtration.KeyWord =''
    this.filtration.SchoolId= null
    this.filtration.curriculumId= null
    this.filtration.GradeId= null
    this.filtration.DivisionId =null
    this.filtration.TrackId = null
    this.filtration.NationalityId= null
    this.filtration.IsChildOfAMartyr = null
    this.filtration.talentId = null
    this.filtration.IsPassed = null
    this.filtration.IsSpecialClass= null
    this.filtration.IsInFusionClass= null
    this.filtration.IsSpecialAbilities = null
    this.filtration.StudentCategory=null
    this.filtration.StudentDegreeResultFilter=null
    this.filtration.gender=null
    this.filtration.StudentDaleel2Id=null

    this.checkStudentList();
  }


  onExport(fileType: FileTypeEnum){

    this.exportService.showLoader$.next(true)

    if(this.students.total > 10000) {
      this.toaster.error('عذرا عدد العناصر المطلوب اصدارها اكبر من الحد المسموح .يرجى تغير معاير البحث لتقليل العناصر إلى اقل من 10 ألاف')
      this.exportService.showLoader$.next(false)
      return
    }

    let filter = {...this.filtration, PageSize:this.students.total,Page:1}
    this.studentsService.studentsToExport(filter, this.userService.getSchoolId()).subscribe( (res) =>{
      this.exportService.exportFile(fileType, res, this.translate.instant('dashboard.schools.studentsList'))
    })
  }


  paginationChanged(event: paginationState) {
    this.filtration.Page = event.page
    this.filtration.PageSize = event.rows
    this.checkStudentList();
  }
  get userScope()
  {
    return UserScope
  }

  checkDashboardHeader(){
    if(this.currentUserScope==UserScope.Employee) this.componentHeaderData.breadCrump = [{label:this.translate.instant('dashboard.schools.studentsList') ,routerLink:'/student-management/students'},]
    else if (this.currentUserScope==UserScope.SPEA) this.componentHeaderData.breadCrump = [{label:this.translate.instant('dashboard.schools.studentsList'),routerLink:'/schools-and-students/students'},]

    this.headerService.changeHeaderdata(this.componentHeaderData)
  }

  checkStudentList(){
    if(this.currentUserScope==this.userScope.Employee){
        this.userService.currentUserSchoolId$.subscribe(id => {
          if(id) this.getStudentsInSpecificSchool(id)
        })
    }else { this.getStudents() }

  }

}
