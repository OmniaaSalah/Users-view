import { Component, OnDestroy, OnInit ,inject} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { ISubject } from 'src/app/core/Models/subjects/subject';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { SubjectService } from '../../service/subject.service';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { paginationInitialState } from 'src/app/core/helpers/pagination';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { Filtration } from 'src/app/core/helpers/filtration';
import { Table } from 'primeng/table';
import { FileTypeEnum } from 'src/app/shared/enums/file/file.enum';
import { ExportService } from 'src/app/shared/services/export/export.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { ConfirmModelService } from 'src/app/shared/services/confirm-model/confirm-model.service';
import { Subscription } from 'rxjs';
import { ArrayOperations } from 'src/app/core/helpers/array';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { ClaimsEnum } from 'src/app/shared/enums/claims/claims.enum';
@Component({
  selector: 'app-subjects',
  templateUrl: './subjects-list.component.html',
  styleUrls: ['./subjects-list.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class SubjectsComponent implements OnInit,OnDestroy {
  get ClaimsEnum(){return ClaimsEnum}
  faEllipsisVertical = faEllipsisVertical;
  evaluationTypeList;
  deletedSubject;
  subscription:Subscription;
  filtration = {...Filtration,evaluation: null, ...JSON.parse(this.route.snapshot.queryParams['searchQuery'] || 'null')};
  paginationState= {...paginationInitialState};
  subjects={
    totalAllData:0,
    total:0,
    list:[],
    loading:true
  }
  lang = inject(TranslationService).lang
  constructor(
    private exportService: ExportService,
    public confirmModelService: ConfirmModelService,
    private sharedService:SharedService,
    private toastService: ToastService,
    private headerService: HeaderService,
    private translate: TranslateService,
    private subjectService: SubjectService,
    private route:ActivatedRoute,
    private router:Router) {
  }

  ngOnInit(): void {
    this.confirmDeleteListener();
    this.getAllSubjects();
    this.evaluationTypeList=this.subjectService.evaluationTypeList;

    this.headerService.Header.next(
      {
        'breadCrump': [
          { label: this.translate.instant('dashboard.Subjects.List Of Subjects'),routerLink: '/educational-settings/subject/subjects-list'}],
      }
    );



  }


  sortMe(e){
    if(e.order==-1)
    {this.filtration.SortBy="update "+e.field;}
    else
    {this.filtration.SortBy="old "+e.field;}
    this.filtration.Page=1;
    this.getAllSubjects();
  }


  confirmDeleteListener(){
    this.subscription=this.confirmModelService.confirmed$.subscribe(val => {
      if (val) this.deleteSubject(this.deletedSubject)

    })
  }

  getAllSubjects(){

    if(this.route.snapshot.queryParams['searchQuery']){
      this.filtration = {...JSON.parse(this.route.snapshot.queryParams['searchQuery']), ...this.filtration}
    }
    this.router.navigate([], {
      queryParams: {searchQuery : JSON.stringify(this.filtration)},
      relativeTo: this.route,
    });

    this.sharedService.appliedFilterCount$.next(ArrayOperations.filledObjectItemsCount(this.filtration));
    this.subjects.loading=true;
    this.subjects.list=[];
    this.subjectService.getAllSubjects(this.filtration).subscribe((res)=>{
      this.sharedService.filterLoading.next(false);
        this.subjects.loading = false;
        this.subjects.total=res.total;
        this.subjects.totalAllData = res.totalAllData;
        this.subjects.list=res.data;

      },(err)=>{
        this.subjects.loading = false;
        this.subjects.total=0
        this.sharedService.filterLoading.next(false);
      });


  }


  deleteSubject(subject)
  {

        this.subjectService.deleteSubject(subject.id).subscribe((res)=>{
          this.getAllSubjects();
          this.toastService.success(this.translate.instant('dashboard.Subjects.Subject deleted Successfully'));
          // this.confirmModelService.confirmed$.next(null);
        }
        ,
        (err)=>{
          this.getAllSubjects();
          this.toastService.error(this.translate.instant('dashboard.Subjects.error happened,try again'));
          // this.confirmModelService.confirmed$.next(null);
        })



}


  clearFilter(){

    this.filtration.KeyWord =''
    this.filtration.evaluation= null;
    this.filtration.Page=1;
    this.getAllSubjects();
  }


  onExport(fileType: FileTypeEnum, table:Table){
    let filter = {...this.filtration, PageSize:this.subjects.totalAllData,Page:1}
    this.subjectService.subjectsToExport(filter).subscribe( (res) =>{

      this.exportService.exportFile(fileType, res, this.translate.instant('dashboard.Subjects.List Of Subjects'))
    })
  }



  paginationChanged(event: paginationState) {
    this.filtration.Page = event.page;
    this.getAllSubjects();

  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.confirmModelService.confirmed$.next(null);
  }

}
