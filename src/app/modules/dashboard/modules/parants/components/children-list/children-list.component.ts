import { Component, OnInit,inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import {IHeader } from 'src/app/core/Models/header-dashboard';
import { Ichiledren } from 'src/app/core/Models/Ichiledren';
import { Istudent } from 'src/app/core/Models/Istudent';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { ClaimsEnum } from 'src/app/shared/enums/claims/claims.enum';
import { UserScope } from 'src/app/shared/enums/user/user.enum';
import { SchoolsService } from '../../../schools/services/schools/schools.service';
import { ParentService } from '../../services/parent.service';



@Component({
  selector: 'app-children-list',
  templateUrl: './children-list.component.html',
  styleUrls: ['./children-list.component.scss']
})
export class ChildrenListComponent implements OnInit {
  currentSchool;
  currentSchoolId;
  parentId = Number(this._router.snapshot.paramMap.get('parentId'));
  currentUserScope = inject(UserService).getCurrentUserScope()
  chiledren: Ichiledren[]=[] ;
  get claimsEnum () {return ClaimsEnum}
  students: Istudent[] =[];
  faChevronLeft = faChevronLeft;
  isSkeletonVisible = true;

  items: MenuItem[] = [
    { label: 'اولياء الامور' },
    { label: 'قائمه الابناء' },
  ];

  componentHeaderData: IHeader ;


  constructor(
    private translate: TranslateService,
    private headerService: HeaderService,
    private parentService : ParentService,
    private _router: ActivatedRoute,
    public translationService: TranslationService,
    private router: Router,
    private schoolService:SchoolsService,
    private userService:UserService
  ) { }

  ngOnInit(): void {
    this.checkDashboardHeader();
    this.getChildernByParentId();
    this.headerService.changeHeaderdata(this.componentHeaderData)
   this.schoolService.currentSchoolName.subscribe((res)=>{this.currentSchool=res})
  
 
  }
  getChildernByParentId(){
    this.parentService.getChildernByParentId(this.parentId).subscribe(response => {

      this.chiledren = response.children;
      this.students = response.students;
      this.isSkeletonVisible = false;

    },err=> {
      this.isSkeletonVisible=false;
    })
  }

  displayUnregisterChild(chiledId : number){
  
    let parentId = Number(this._router.snapshot.paramMap.get('id'));
    this.router.navigateByUrl(`/dashboard/schools-and-students/all-parents/parent/${parentId}/child/${chiledId}?registered=false`);
  }

  checkDashboardHeader()
  {
      if(this.currentUserScope==UserScope.Employee)
    {
   
		this.componentHeaderData={
      breadCrump: [
        { label: this.translate.instant('dashboard.parents.parents'),routerLink:'/dashboard/student-management/all-parents/',routerLinkActiveOptions:{exact: true} },
        { label: this.translate.instant('dashboard.parents.childrenList'),routerLink:`/dashboard/student-management/all-parents/parent/${this.parentId}/all-children` }
      ],
      mainTitle: { main: this.translate.instant('dashboard.parents.childrenList'), sub: '(محمد على طارق)' }
    }
    }
    else if (this.currentUserScope==UserScope.SPEA)
    {
		this.componentHeaderData={
      breadCrump: [
        { label: this.translate.instant('dashboard.parents.parents'),routerLink:'/dashboard/schools-and-students/all-parents/',routerLinkActiveOptions:{exact: true} },
        { label: this.translate.instant('dashboard.parents.childrenList'),routerLink:`/dashboard/schools-and-students/all-parents/parent/${this.parentId}/all-children`}
      ],
      mainTitle: { main: this.translate.instant('dashboard.parents.childrenList'), sub: '(محمد على طارق)' }
    }
    }
  }
  get userScope() 
  { 
    return UserScope 
  }
}
