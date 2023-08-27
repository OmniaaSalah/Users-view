
import { AssignmentServiceService } from './../../service/assignment-service.service';

import { ActivatedRoute, Router } from '@angular/router';
import {  faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

import { Component, OnInit,inject} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { paginationInitialState } from 'src/app/core/helpers/pagination';
import { Filtration } from 'src/app/core/helpers/filtration';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { IHeader } from 'src/app/core/Models/header-dashboard';
import { ClaimsEnum } from 'src/app/shared/enums/claims/claims.enum';
import { UserService } from 'src/app/core/services/user/user.service';
import { UserScope } from 'src/app/shared/enums/user/user.enum';
import { FileTypeEnum } from 'src/app/shared/enums/file/file.enum';
import { ExportService } from 'src/app/shared/services/export/export.service';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { MenuItem } from 'src/app/core/models/dropdown/menu-item';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { MediaService } from 'src/app/shared/services/media/media.service';

@Component({
  selector: 'app-assignments-list',
  templateUrl: './assignments-list.component.html',
  styleUrls: ['./assignments-list.component.scss']
})
export class AssignmentsListComponent implements OnInit {
  lang = inject(TranslationService).lang
  currentUserScope = inject(UserService).getScope()
  get userScope() { return UserScope }
  schoolId=''
  get claimsEnum () {return ClaimsEnum}
  paginationState: paginationState = { ...paginationInitialState }
  filtration = {
    ...Filtration,
    Status: '',
    ...JSON.parse(this.route.snapshot.queryParams['searchQuery'] || 'null')
  };

  faEllipsisVertical = faEllipsisVertical;
  examStatusList
 assignments={
      totalAllData:0,
      total:0,
      list:[],
      loading:true
      }

  componentHeaderData: IHeader={
        breadCrump: []
      }


      items: MenuItem[]=[
        {label: this.translate.instant('shared.downloadfile'), icon:'assets/images/shared/download.svg'},
        {label: this.translate.instant('shared.downloadaudio'), icon:'assets/images/shared/download.svg'}
      ]

  constructor(
    private sharedService:SharedService,
    private headerService: HeaderService,
    private exportService: ExportService,
    private translate: TranslateService,
    private userService:UserService,
    private assignmentservice: AssignmentServiceService,
    private toastrService:ToastService,
    private route:ActivatedRoute,
    private mediaService:MediaService,
    private router:Router) { }





  ngOnInit(): void {
    this.userService.currentUserSchoolId$.subscribe(id => {this.schoolId=id;this.getAssignmentList()});

   this.checkDashboardHeader();
    this.examStatusList=this.assignmentservice.examStatusList;
  }
  getAssignmentList() {

    if(this.route.snapshot.queryParams['searchQuery']){
      this.filtration = {...JSON.parse(this.route.snapshot.queryParams['searchQuery']), ...this.filtration}
    }
    this.router.navigate([], {
      queryParams: {searchQuery : JSON.stringify(this.filtration)},
      relativeTo: this.route,

    });

    this.assignments.loading=true;
    this.assignments.list=[];
    this.assignmentservice.getAssignmentList(this.filtration,this.schoolId?this.schoolId:'').subscribe(response => {
      if(response.data){
        this.sharedService.filterLoading.next(false);
        this.assignments.loading = false;
        this.assignments.list = response.data;
        this.assignments.totalAllData = response.totalAllData;
        this.assignments.total=response.total;
      }
          },err=> {
            this.sharedService.filterLoading.next(false);
            this.assignments.loading=false
            this.assignments.total=0;
            })


  }
  onSort(e){
    if(e.order==-1)
    {this.filtration.SortBy="ASC"}
    else
    {this.filtration.SortBy="desc"}
    this.filtration.SortColumnName=e.field;
    this.filtration.Page=1;
     this.getAssignmentList()
   }

   clearFilter(){
     this.filtration.KeyWord ='';
     this.filtration.Status="",
     this.filtration.Page=1
     this.getAssignmentList()
   }

   onExport(fileType: FileTypeEnum){
    this.exportService.showLoader$.next(true)
    let filter = {...this.filtration,PageSize:this.assignments.totalAllData,Page:1}
    this.assignmentservice.assignmentsToExport(filter).subscribe( (res) =>{
      this.exportService.exportFile(fileType, res, this.translate.instant('Assignments List'))
    })
  }


   paginationChanged(event: paginationState) {
     this.filtration.Page = event.page
     console.log(event.page)
     this.getAssignmentList()

   }


  dropdownItemClicked(index,assignment){
    if(index == 0) this.exportPdf(assignment?.examPdfPath)
    if(index == 1) this.exportAudio(assignment?.examAudioPath)
  }

  exportPdf(fileUrl : string): void {
    if (fileUrl) {
      this.mediaService.downloadFTPFile(fileUrl)
      // window.open(fileUrl, '_blank').focus();
    } else {
      this.notAvailable();
    }
   }

   exportAudio(fileUrl : string){
    if (fileUrl) {
      this.mediaService.downloadFTPFile(fileUrl)
      // window.open(fileUrl, '_blank').focus();
    } else {
      this.notAvailable();
    }
   }

   notAvailable(): void {
    this.toastrService.warning(this.translate.instant('noURLFound'));
   }

   checkDashboardHeader()
   {
       if(this.currentUserScope==UserScope.Employee)
     {
       this.componentHeaderData.breadCrump=
       [

        { label: this.translate.instant('Assignments List'), routerLink: '/school-performance-managent/assignments/assignments-list', routerLinkActiveOptions: { exact: true } }
       ]


     }
     else if (this.currentUserScope==UserScope.SPEA)
     {
       this.componentHeaderData.breadCrump=
          [
          { label: this.translate.instant('Assignments List'), routerLink: '/performance-managment/assignments/assignments-list', routerLinkActiveOptions: { exact: true } }
         ]


     }

     this.headerService.changeHeaderdata(this.componentHeaderData)
   }
}
