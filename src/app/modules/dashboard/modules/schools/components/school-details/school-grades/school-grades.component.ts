import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Table } from 'primeng/table';
import { Filtration } from 'src/app/core/classes/filtration';
import { paginationInitialState } from 'src/app/core/classes/pagination';
import { Track } from 'src/app/core/Models/global/global.model';
import { IHeader } from 'src/app/core/Models/header-dashboard';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { FileEnum } from 'src/app/shared/enums/file/file.enum';
import { UserScope } from 'src/app/shared/enums/user/user.enum';
import { ExportService } from 'src/app/shared/services/export/export.service';
import { GradesService } from '../../../services/grade/grade.service';
import { TranslateService } from '@ngx-translate/core';
import { ClaimsEnum } from 'src/app/shared/enums/claims/claims.enum';
import { SchoolsService } from '../../../services/schools/schools.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';

@Component({
  selector: 'app-school-grades',
  templateUrl: './school-grades.component.html',
  styleUrls: ['./school-grades.component.scss']
})
export class SchoolGradesComponent implements OnInit {
  @Output() setActiveTab =new EventEmitter<number>()
  @Output() selectedGradeId = new EventEmitter<number>()

  lang = inject(TranslationService).lang


  get claimsEnum () {return ClaimsEnum}
  currentSchool="";
  schoolId = this.route.snapshot.paramMap.get('schoolId')
  currentUserScope = inject(UserService).getCurrentUserScope()
  get userScope() { return UserScope }

  componentHeaderData: IHeader = {
		breadCrump: [
		
			{ label: this.translate.instant('dashboard.schools.schoolClasses'), routerLink: `/dashboard/grades-and-divisions/school/${this.schoolId}/grades`},
		],
		mainTitle: { main: this.currentSchool }
	}

  isDialogOpened=false

  filtration={...Filtration}
  paginationState={...paginationInitialState}

  grades={
    totalAllData:0,
    total:0,
    list:[],
    loading:true
  }

  gradeTracks:Track[]

  constructor(
    private schoolsService:SchoolsService,
    private translate :TranslateService,
    private gradesService:GradesService,
    private route: ActivatedRoute,
    private headerService: HeaderService,
    private userService:UserService,
    private exportService: ExportService) { }

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

    this.getSchoolGrades()
  }

  getSchoolGrades(){
    this.grades.loading=true
    this.grades.list=[]
    this.gradesService.getSchoolGardes(this.schoolId,this.filtration).subscribe(res=>{
      this.grades.loading = false
      this.grades.list = res.data
      this.grades.totalAllData = res.totalAllData
      this.grades.total =res.total
    },err =>{
      this.grades.loading=false
      this.grades.total=0
    })
  }



  showTracks(gradeId){
    this.gradeTracks=null
    this.gradesService.getGradeTracks(this.schoolId,gradeId).subscribe(res =>{
      this.gradeTracks = res
    })
    this.isDialogOpened=true
  }




  onSort(e){
    if(e.order==1) this.filtration.SortBy= 'old'
    else if(e.order == -1) this.filtration.SortBy= 'update'
    this.filtration.Page=1;
    this.getSchoolGrades()
  }

  clearFilter(){
    this.filtration.KeyWord =''
    this.filtration.Page=1;
    this.getSchoolGrades()
  }


  onExport(fileType: FileEnum){
    let filter = {...this.filtration, PageSize:null}
    this.gradesService.gradesToExport(this.schoolId,filter).subscribe( (res) =>{
      
      this.exportService.exportFile(fileType, res, this.translate.instant('dashboard.schools.schoolClasses'))
    })
  }

  paginationChanged(event: paginationState) {
    this.filtration.Page = event.page
    this.getSchoolGrades()

  }

}
