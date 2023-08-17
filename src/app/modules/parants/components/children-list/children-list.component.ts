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
import { RegistrationStatus } from 'src/app/shared/enums/status/status.enum';
import { UserScope } from 'src/app/shared/enums/user/user.enum';
import { SchoolsService } from '../../../schools/services/schools/schools.service';
import { ParentService } from '../../services/parent.service';



@Component({
  selector: 'app-children-list',
  templateUrl: './children-list.component.html',
  styleUrls: ['./children-list.component.scss']
})
export class ChildrenListComponent implements OnInit {
  faChevronLeft = faChevronLeft;

  currentSchool;
  currentSchoolId;
  parentId = Number(this._router.snapshot.paramMap.get('parentId'));
  currentUserScope = inject(UserService).getScope()


  get claimsEnum () {return ClaimsEnum}
  get registrationStatus() {return RegistrationStatus}


  guardianData

  chiledren: Ichiledren[]=[] ;
  students: Istudent[] =[];
  studentsWithdrawal: Istudent[] =[];
  finalGraduatedStudents: Istudent[] =[];


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
    private userService:UserService
  ) { }

  ngOnInit(): void {
    this.checkDashboardHeader();

    this.checkChildrenList()
    this.headerService.changeHeaderdata(this.componentHeaderData)

  }
  getChildernByParentId(){
    this.parentService.getChildernByParentId(this.parentId).subscribe(response => {

      this.chiledren = response.children || [];
      this.studentsWithdrawal = response.studentsWithdrawal || []
      this.students = response.students || [];
      this.guardianData=response.guardian || {}
      this.finalGraduatedStudents=response.finalGraduatedStudents || {}
      this.isSkeletonVisible = false;

    },err=> {
      this.isSkeletonVisible=false;
    })
  }
  getChildernByParentIdInSpecificSchool(schoolId){
    this.parentService.getChildernByParentIdAndSchoolId(this.parentId,schoolId).subscribe(response => {

      this.students = response.result;
      this.isSkeletonVisible = false;

    },err=> {
      this.isSkeletonVisible=false;
    })
  }

  displayUnregisterChild(chiledId : number){
    let parentId = Number(this._router.snapshot.paramMap.get('parentId'));
    this.router.navigateByUrl(`/schools-and-students/all-parents/parent/${parentId}/child/${chiledId}/register?status=Unregistered`);
  }

  checkDashboardHeader()
  {
      if(this.currentUserScope==UserScope.Employee)
    {

		this.componentHeaderData={
      breadCrump: [
        { label: this.translate.instant('dashboard.parents.parents'),routerLink:'/student-management/all-parents/',routerLinkActiveOptions:{exact: true} },
        { label: this.translate.instant('dashboard.parents.childrenList'),routerLink:`/student-management/all-parents/parent/${this.parentId}/all-children` }
      ],
      mainTitle: { main: this.translate.instant('dashboard.parents.childrenList') }
    }
    }
    else if (this.currentUserScope==UserScope.SPEA)
    {
		this.componentHeaderData={
      breadCrump: [
        { label: this.translate.instant('dashboard.parents.parents'),routerLink:'//schools-and-students/all-parents/',routerLinkActiveOptions:{exact: true} },
        { label: this.translate.instant('dashboard.parents.childrenList'),routerLink:`//schools-and-students/all-parents/parent/${this.parentId}/all-children`}
      ],
      mainTitle: { main: this.translate.instant('dashboard.parents.childrenList') }
    }
    }
  }
  get userScope()
  {
    return UserScope
  }

  checkChildrenList()
  {
    if(this.currentUserScope==this.userScope.Employee)
    {
    this.userService.currentUserSchoolId$.subscribe(id =>{

      this.getChildernByParentIdInSpecificSchool(id);
    })
  }
    else{
    this.getChildernByParentId();
    }
  }
}
