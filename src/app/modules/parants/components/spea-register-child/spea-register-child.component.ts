import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BaseSearchModel } from 'src/app/core/models/filter-search/base-search-model';
import { paginationInitialState } from 'src/app/core/helpers/pagination';
import { SearchModel } from 'src/app/core/models/filter-search/filter-search.model';
import { IHeader } from 'src/app/core/Models/header-dashboard';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { CountriesService } from 'src/app/shared/services/countries/countries.service';
import { SharedService } from 'src/app/shared/services/shared/shared.service';


@Component({
  selector: 'app-spea-register-child',
  templateUrl: './spea-register-child.component.html',
  styleUrls: ['./spea-register-child.component.scss']
})
export class SpeaRegisterChildComponent implements OnInit {

  parentId = this.route.snapshot.paramMap.get('parentId')
  childId = this.route.snapshot.paramMap.get('childId')


  componentHeaderData: IHeader={
    breadCrump: [
      { label: this.translate.instant('dashboard.parents.parents') ,routerLink:'//schools-and-students/all-parents/',routerLinkActiveOptions:{exact: true}},
      { label: this.translate.instant('dashboard.parents.childrenList') ,routerLink:`//schools-and-students/all-parents/parent/${this.parentId}/all-children`,routerLinkActiveOptions:{exact: true}},
      {label: this.translate.instant('dashboard.students.registerChildByCommission'), routerLink: `//schools-and-students/all-parents/parent/${this.parentId}/all-children/child/${this.childId}/register`}
    ],
    mainTitle: {
      main: this.translate.instant('dashboard.students.registerChildByCommission')
    }
  }

filtration :SearchModel = {...BaseSearchModel,curriculumId:'', StateId: '',GradeId:''}
paginationState= {...paginationInitialState}


AllGrades$ =this.sharedService.getAllGrades('')

// filter
curriculums$ = this.sharedService.getAllCurriculum()
states$ = this.countriesService.getAllStates()

schools={
  totalAllData:0,
  total:0,
  list:[],
  loading:true
}

submitted


selectedSchool={ index: null, value: null}


student =
  {
    name: 'محمد على',
    age: 15,
    regestered: false,
    regesteredSchool: 'مدرسه الشارقه الابتدائيه',
    school: 'مدرسه الشارقه',
    class: 'الصف الرابع',
    relativeRelation: 'ابن الاخ',
    src: 'assets/images/avatar.png'
  }
  selectedGrade={id:'', value: false}


constructor(
  private translate: TranslateService,
  private headerService: HeaderService,
  private sharedService: SharedService,
  private countriesService: CountriesService,
  private route: ActivatedRoute

) { }

ngOnInit(): void {
  this.headerService.changeHeaderdata(this.componentHeaderData)
}


}
