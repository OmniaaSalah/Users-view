import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs';
import { ArrayOperations } from 'src/app/core/classes/array';
import { Filtration } from 'src/app/core/classes/filtration';
import { paginationInitialState } from 'src/app/core/classes/pagination';
import { IHeader } from 'src/app/core/Models';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { ClaimsEnum } from 'src/app/shared/enums/claims/claims.enum';
import { FileEnum } from 'src/app/shared/enums/file/file.enum';
import { UserScope } from 'src/app/shared/enums/user/user.enum';
import { ExportService } from 'src/app/shared/services/export/export.service';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { DivisionService } from '../../../services/division/division.service';
import { GradesService } from '../../../services/grade/grade.service';

@Component({
  selector: 'app-school-divisions',
  templateUrl: './school-divisions.component.html',
  styleUrls: ['./school-divisions.component.scss']
})
export class SchoolDivisionsComponent implements OnInit,OnChanges {
@Input('selectedGradeId') selectedGradeId
currentSchool="";
currentUserScope = inject(UserService).getCurrentUserScope()
get userScope() { return UserScope }
get claimsEnum () {return ClaimsEnum}
schoolId = this.route.snapshot.paramMap.get('schoolId')

lang = inject(TranslationService).lang

componentHeaderData: IHeader = {
  breadCrump:  [

    { label: this.translate.instant('dashboard.schools.schoolTracks'), routerLink: `/dashboard/grades-and-divisions/school/${this.schoolId}/divisions`,routerLinkActiveOptions:{exact: true}}

  ],
  mainTitle: { main:  this.currentSchool  }
}

  filtration={...Filtration, gradeid: [],schoolId:[this.schoolId]}
  paginationState={...paginationInitialState}
  schoolGrades$ = this.gradesService.getSchoolGardes(this.schoolId).pipe(map(res=>res.data))

  divisions={
    totalAllData:0,
    total:0,
    list:[],
    loading:true
  }



   constructor(
     public translate: TranslateService,
     private exportService :ExportService,
     private route: ActivatedRoute,
     private gradesService:GradesService,
     private headerService: HeaderService,
     private divisionService:DivisionService,
     private userService:UserService,
     private sharedService:SharedService) { }

    ngOnChanges(changes: SimpleChanges): void {
console.log(changes);

      if(changes['selectedGradeId'].currentValue) this.filtration.gradeid = [changes['selectedGradeId'].currentValue]

    }

   ngOnInit(): void {
    if(this.currentUserScope==this.userScope.Employee)
    {
      this.userService.currentUserSchoolName$?.subscribe((res)=>{
        if(res)
        {
          this.currentSchool= JSON.parse(res);
          this.componentHeaderData.mainTitle.main=this.currentSchool[this.lang];
        }
      })
    }


    if(this.currentUserScope==UserScope.Employee) this.headerService.changeHeaderdata(this.componentHeaderData)

     this.getSchoolDivisions()

    }

    getSchoolDivisions(){
      this.sharedService.appliedFilterCount$.next(ArrayOperations.filledObjectItemsCount(this.filtration))
    this.divisions.loading=true
    this.divisions.list=[]
     this.divisionService.getSchoolDivisions(this.filtration).subscribe(res=>{
      this.sharedService.filterLoading.next(false);
      this.divisions.loading = false
      this.divisions.list = res.data
      this.divisions.totalAllData = res.totalAllData
      this.divisions.total =res.total
     },(err)=>{
      this.divisions.loading = false;
      this.divisions.total=0;
      this.sharedService.filterLoading.next(false);
     })
   }


   onSort(e){
    if(e.order==1) this.filtration.SortBy= 'old'
    else if(e.order == -1) this.filtration.SortBy= 'update'
    this.filtration.Page=1;
     this.getSchoolDivisions()
   }

   clearFilter(){
     this.filtration.KeyWord =''
     this.filtration.gradeid = null
     this.filtration.Page=1;
     this.getSchoolDivisions()
   }


   onExport(fileType: FileEnum){
    let filter = {...this.filtration, PageSize:this.divisions.totalAllData}
    this.divisionService.divisionsToExport(filter).subscribe( (res) =>{

      this.exportService.exportFile(fileType, res, this.translate.instant('dashboard.schools.schoolTracks'))
    })
  }

   paginationChanged(event: paginationState) {
     this.filtration.Page = event.page
     this.getSchoolDivisions()

   }



}
