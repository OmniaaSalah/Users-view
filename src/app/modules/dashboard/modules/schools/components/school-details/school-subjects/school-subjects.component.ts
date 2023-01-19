import { Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { th } from 'date-fns/locale';
import { Table } from 'primeng/table';
import { Filtration } from 'src/app/core/classes/filtration';
import { paginationInitialState } from 'src/app/core/classes/pagination';
import { IHeader } from 'src/app/core/Models/header-dashboard';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { FileEnum } from 'src/app/shared/enums/file/file.enum';
import { UserScope } from 'src/app/shared/enums/user/user.enum';
import { GradesService } from '../../../services/grade/grade.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { SchoolsService } from '../../../services/schools/schools.service';
import { ExportService } from 'src/app/shared/services/export/export.service';
import { AssessmentsEnum } from 'src/app/shared/enums/subjects/assessment-type.enum';

@Component({
  selector: 'app-school-subjects',
  templateUrl: './school-subjects.component.html',
  styleUrls: ['./school-subjects.component.scss']
})
export class SchoolSubjectsComponent implements OnInit {
	currentSchool="";
  currentUserScope = inject(UserService).getCurrentUserScope()
  get userScope() { return UserScope }
  get assessmentsEnum () {return AssessmentsEnum}
  lang =inject(TranslationService).lang;

  schoolId = this.route.snapshot.paramMap.get('schoolId')

  componentHeaderData: IHeader = {
		breadCrump: [
			
			{ label: this.translate.instant('dashboard.schools.schoolSubjectMangement'), routerLink: `/dashboard/school-management/school/${this.schoolId}/subjects`},
		],
		mainTitle: { main:  this.currentSchool }
	}
  
  subjectsObj={
    total:0,
    list:[],
    loading:true,
    totalAllData:0,
    isGradeSelected:false
  }

  filterApplied =false
  
  filtration={...Filtration, GradeId:"", TrackId:"",SchoolId :this.schoolId}
  paginationState={...paginationInitialState}
  
  schoolGrades$ =this.schoolsService.getSchoolGardes(this.schoolId);
  gradeTracks$;

  constructor(
    private translate:TranslateService,
    private schoolsService:SchoolsService,
    private route: ActivatedRoute,
    private gradesService:GradesService,
    private headerService: HeaderService,
    private router:Router,
    private toastService: ToastService,
    private userService:UserService,
    private exportService :ExportService
    ) { }

  ngOnInit(): void {
    localStorage.removeItem("gradeId")
    localStorage.removeItem("trackId")
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

    // this.getSubjects()
  }


  getSubjects(){
    this.subjectsObj.loading=true
    this.subjectsObj.list=[]
    this.schoolsService.getSchoolSubjects(this.filtration).subscribe(res =>{
      this.subjectsObj.loading = false
      this.subjectsObj.list = res.data
      this.subjectsObj.total =res.total
      this.subjectsObj.totalAllData = res.totalAllData

      this.filterApplied =false
    },err=> {
      this.subjectsObj.loading=false
      this.subjectsObj.total=0
      this.filterApplied =false
    })
  }

  onGradeSelected(){
    this.subjectsObj.isGradeSelected=true;
    this.filtration.TrackId=null
    this.getSubjects()
    this.getTracks()
  }
  
  // getSchoolClasses(){
  //   this.gradesService.getSchoolGardes(this.schoolId,this.filtration).subscribe()
  // }

  getTracks(){   
    this.gradeTracks$ =this.gradesService.getGradeTracks(this.schoolId,this.filtration.GradeId)
    
  }


  onSort(e){
    if(e.order==1) this.filtration.SortBy= 'old'
    else if(e.order == -1) this.filtration.SortBy= 'update'
    this.filtration.Page=1;
    this.getSubjects()
  }

  clearFilter(){
    this.filtration.KeyWord =''
    this.filtration.GradeId=null
    this.filtration.TrackId =null
    this.filtration.Page=1;
    this.getSubjects()
  }


  onExport(fileType: FileEnum){
    let filter = {...this.filtration, PageSize:null}
    this.schoolsService.subjectsToExport(filter).subscribe( (res) =>{
      
      this.exportService.exportFile(fileType, res, this.translate.instant('dashboard.schools.schoolSubjectMangement'))
    })
  }

  paginationChanged(event: paginationState) {

    this.filtration.Page = event.page
    this.getSubjects()

  }

  sendDataToAddSubject()
  {
    if(this.filtration.GradeId)
    {
        localStorage.setItem("gradeId",this.filtration.GradeId)
        if(this.filtration.TrackId)
        {localStorage.setItem("trackId",this.filtration.TrackId)}

        this.router.navigate([`/dashboard/school-management/school/${this.schoolId}/subjects/new-subject`])
    }
    else
    {
      this.toastService.error(this.translate.instant('dashboard.schools.pleaze select class firstly'));
    }
  }

}
