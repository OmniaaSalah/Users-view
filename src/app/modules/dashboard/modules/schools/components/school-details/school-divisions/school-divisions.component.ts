import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { map } from 'rxjs';
import { Filtration } from 'src/app/core/classes/filtration';
import { paginationInitialState } from 'src/app/core/classes/pagination';
import { IHeader } from 'src/app/core/Models';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { ClaimsEnum } from 'src/app/shared/enums/claims/claims.enum';
import { FileEnum } from 'src/app/shared/enums/file/file.enum';
import { UserScope } from 'src/app/shared/enums/user/user.enum';
import { ExportService } from 'src/app/shared/services/export/export.service';
import { DivisionService } from '../../../services/division/division.service';
import { GradesService } from '../../../services/grade/grade.service';
import { SchoolsService } from '../../../services/schools/schools.service';

@Component({
  selector: 'app-school-divisions',
  templateUrl: './school-divisions.component.html',
  styleUrls: ['./school-divisions.component.scss']
})
export class SchoolDivisionsComponent implements OnInit,OnChanges {
@Input('selectedGradeId') selectedGradeId=null
currentSchool="";
currentUserScope = inject(UserService).getCurrentUserScope()
get userScope() { return UserScope }
get claimsEnum () {return ClaimsEnum}
schoolId = this.route.snapshot.paramMap.get('schoolId')

componentHeaderData: IHeader = {
  breadCrump:  [
    
    { label: this.translate.instant('dashboard.schools.schoolTracks'), routerLink: `/dashboard/grades-and-divisions/school/${this.schoolId}/divisions`,routerLinkActiveOptions:{exact: true}}

  ],
  mainTitle: { main:  this.currentSchool  }
}

  filtration={...Filtration, gradeid: this.selectedGradeId}
  paginationState={...paginationInitialState}
  schoolGrades$ = this.gradesService.getSchoolGardes(this.schoolId).pipe(map(res=>res.data))

  divisions={
    totalAllData:0,
    total:0,
    list:[],
    loading:true
  }

  first = 0
  rows = 4

//   menuItems: MenuItem[]=[
//    {label: this.translate.instant('shared.edit'), icon:'assets/images/shared/pen.svg',routerLink:'division/1'},
//    {label: this.translate.instant('dashboard.schools.raseAttendance'), icon:'assets/images/shared/clock.svg',routerLink:'division/1/absence-records'},
//    {label: this.translate.instant('dashboard.schools.defineSchedule'), icon:'assets/images/shared/list.svg',routerLink:''},
//    {label: this.translate.instant('dashboard.schools.enterGrades'), icon:'assets/images/shared/edit.svg',routerLink:''},
//  ];
   constructor(

    private schoolsService:SchoolsService,
     public translate: TranslateService,
     private exportService :ExportService,
     private route: ActivatedRoute,
     private gradesService:GradesService,
     private headerService: HeaderService,
     private divisionService:DivisionService) { }

    ngOnChanges(changes: SimpleChanges): void {

      if(changes['selectedGradeId']) this.filtration.gradeid = changes['selectedGradeId'].currentValue

    }

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

     this.getSchoolDivisions()

    }

    getSchoolDivisions(){
    this.divisions.loading=true
    this.divisions.list=[]
     this.divisionService.getSchoolDivisions(this.schoolId, this.filtration).subscribe(res=>{
      this.divisions.loading = false
      this.divisions.list = res.data
      this.divisions.totalAllData = res.totalAllData
      this.divisions.total =res.total
     },(err)=>{
      this.divisions.loading = false
     })
   }


   onSort(e){
    if(e.order==1) this.filtration.SortBy= 'old'
    else if(e.order == -1) this.filtration.SortBy= 'update'
     this.getSchoolDivisions()
   }

   clearFilter(){
     this.filtration.KeyWord =''
     this.filtration.gradeid = null
     this.getSchoolDivisions()
   }


   onExport(fileType: FileEnum, table:Table){
     this.exportService.exportFile(fileType, table, this.divisions.list)
   }

   paginationChanged(event: paginationState) {
     this.filtration.Page = event.page
     this.getSchoolDivisions()

   }

   

}
