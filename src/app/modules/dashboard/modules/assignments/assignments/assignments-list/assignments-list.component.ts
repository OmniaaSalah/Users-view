
import { AssignmentServiceService } from './../../service/assignment-service.service';

import { Router } from '@angular/router';
import {  faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

import { Component, OnInit, ViewChild ,inject} from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { Paginator } from 'primeng/paginator';

import { HeaderService } from 'src/app/core/services/header-service/header.service';

import { Iassignments } from '../../../../../../core/Models/Iassignments';
import { paginationInitialState } from 'src/app/core/classes/pagination';
import { Filtration } from 'src/app/core/classes/filtration';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { IHeader } from 'src/app/core/Models/header-dashboard';
import { ClaimsEnum } from 'src/app/shared/enums/claims/claims.enum';
import { UserService } from 'src/app/core/services/user/user.service';
import { UserScope } from 'src/app/shared/enums/user/user.enum';




@Component({
  selector: 'app-assignments-list',
  templateUrl: './assignments-list.component.html',
  styleUrls: ['./assignments-list.component.scss']
})
export class AssignmentsListComponent implements OnInit {
  currentUserScope = inject(UserService).getCurrentUserScope()
  get userScope() { return UserScope }
  get claimsEnum () {return ClaimsEnum}
  paginationState: paginationState = { ...paginationInitialState }
  filtration = {...Filtration,Status: ''};
  faEllipsisVertical = faEllipsisVertical;
  examStatusList
 assignments={
      totalAllData:0,
      total:0,
      list:[],
      loading:true
      }

  componentHeaderData: IHeader = {
    'breadCrump': [
      { label: this.translate.instant('sideBar.educationalSettings.children.Subjects Assessments'), routerLink: '/dashboard/performance-managment/assignments/assignments-list', routerLinkActiveOptions: { exact: true } }],

  };

  constructor(
    private headerService: HeaderService,

    private translate: TranslateService,
    private router: Router,
    private assignmentservice: AssignmentServiceService,
    private toastrService:ToastService) { }


  


  ngOnInit(): void {
    this.getAssignmentList();
    this.headerService.Header.next(
      {
        'breadCrump': [
          { label: this.translate.instant('Assignments List'), routerLink: '/dashboard/performance-managment/assignments/assignments-list', routerLinkActiveOptions: { exact: true } }],
      }
    );
    this.examStatusList=this.assignmentservice.examStatusList;
  }
  getAssignmentList() {
    this.assignments.loading=true;
    this.assignments.list=[];
    this.assignmentservice.getAssignmentList(this.filtration).subscribe(response => {
      if(response.data){
        this.assignments.loading = false;
        this.assignments.list = response.data;
        this.assignments.totalAllData = response.totalAllData;
        this.assignments.total=response.total;
       

      }
          },err=> {
            this.assignments.loading=false
            this.assignments.total=0;

            })


  }
  onSort(e){
    if(e.order==1) this.filtration.SortBy= 'old'
    else if(e.order == -1) this.filtration.SortBy= 'update'
     this.getAssignmentList()
   }

   clearFilter(){
     this.filtration.KeyWord ='';
     this.filtration.Status="",
     this.getAssignmentList()
   }


   paginationChanged(event: paginationState) {
     this.filtration.Page = event.page
     this.getAssignmentList()

   }

  exportPdf(prod : any): void {
    if (prod && prod.examPdfPath != null) {
      window.open(prod.examPdfPath, '_blank').focus();
    } else {
      this.notAvailable();
    }
   }
   exportAudio(prod : any){
    if (prod && prod.examAudioPath != null) {
      window.open(prod.examAudioPath, '_blank').focus();
    } else {
      this.notAvailable();
    }
   }

   notAvailable(): void {
    this.toastrService.warning(this.translate.instant('noURLFound'));
   }
}
