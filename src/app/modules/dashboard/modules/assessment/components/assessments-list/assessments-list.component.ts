import { Component, OnInit ,OnDestroy,inject} from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { faAngleLeft, faAngleRight, faCheck, faEllipsisVertical, faPlus } from '@fortawesome/free-solid-svg-icons';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { AssessmentService } from '../../service/assessment.service';
import { Filter } from 'src/app/core/models/filter/filter';
import { Filtration } from 'src/app/core/classes/filtration';
import { FileEnum } from 'src/app/shared/enums/file/file.enum';
import { Table } from 'primeng/table';
import { ExportService } from 'src/app/shared/services/export/export.service';
import { paginationInitialState } from 'src/app/core/classes/pagination';
import { IHeader } from 'src/app/core/Models/header-dashboard';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { ClaimsEnum } from 'src/app/shared/enums/claims/claims.enum';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { ConfirmModelService } from 'src/app/shared/services/confirm-model/confirm-model.service';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/core/services/user/user.service';
import { UserScope } from 'src/app/shared/enums/user/user.enum';
@Component({
  selector: 'app-assessments-list',
  templateUrl: './assessments-list.component.html',
  styleUrls: ['./assessments-list.component.scss']
})
export class AssessmentsListComponent implements OnInit ,OnDestroy{
  currentUserScope = inject(UserService).getCurrentUserScope()
  get userScope() { return UserScope }
  selectedRate;
  isShown:boolean=false;
  isShownfiltration:boolean=false;
  checked:boolean=true;
  get claimsEnum () {return ClaimsEnum}
  faEllipsisVertical = faEllipsisVertical;
  paginationState= {...paginationInitialState}
  //assessmentList: IAssesment[] = [];
  first = 0;
  rows = 3;
  cities: string[];
  faAngleLeft = faAngleLeft
  faAngleRight = faAngleRight
  plusIcon = faPlus;
  checkIcon= faCheck;
  status = '';
  filtration: Filter = { ...Filtration , status : null }
  subscription:Subscription;
 
  selectedStatus:any;
  filteration_status = [
    {name:this.translate.instant('shared.yes'), code: true},
    {name: this.translate.instant('shared.no'), code: false}
];
  // rateList: Array<IRate> = [];
  assessmentList = {
    totalAllData: 0,
    total: 0,
    list: [],
    loading: true
  }
  componentHeaderData: IHeader={
    breadCrump: []
  }

  constructor(public confirmModelService: ConfirmModelService,private exportService: ExportService, private headerService: HeaderService,private toastService: ToastService,
    private assessmentService: AssessmentService, private translate: TranslateService, private router: Router) { }
   isAdmin =false;
  ngOnInit(): void {
    this.confirmDeleteListener();
    let userRole =JSON.parse(localStorage.getItem('$AJ$user'));
    userRole.roles.forEach(element => {
      if(element.name=='Admin'){
        this.isAdmin=true;
      }
    });
    this.checkDashboardHeader();
    this.getRate();
  }

  paginationChanged(event: paginationState) {
    this.filtration.Page = event.page
    this.getRate();
  }


  gotoAddAssessment() {
    this.router.navigate(['/dashboard/educational-settings/assessments/new-assessment']);
  }

  navigateToEditAssessment(id: number): void {
    this.router.navigateByUrl(`/dashboard/educational-settings/assessments/edit-assessment/${id}`);
  }

  private getRate(): void {
  
    this.assessmentList.loading = true
    this.assessmentList.list = []
    this.assessmentService.getRates(this.filtration).subscribe(res => {

      this.assessmentList.loading = false
      this.assessmentList.list = res.data
      this.assessmentList.totalAllData = res.totalAllData
      this.assessmentList.total = res.total
    }, err => {
      this.assessmentList.loading = false
      this.assessmentList.total = 0
    })
  }

  onSort(e) {
    if (e.order == 1) this.filtration.SortBy = 'old'
    else if (e.order == -1) this.filtration.SortBy = 'update'
    this.filtration.Page=1;
    this.getRate()
  }
  onExport(fileType: FileEnum, table: Table) {
    this.exportService.exportFile(fileType, this.assessmentList.list,'')
  }
  clearFilter() {
    this.filtration.KeyWord = ''
    this.filtration.status = null
    this.selectedStatus = null
    this.filtration.Page=1;
    this.getRate()
  }
 
deleteRate(id)
{
  this.assessmentService.deleteRate(id).subscribe((res)=>{
    if(res.error)
    {
      this.toastService.error(this.translate.instant(res.error));
    }
    else
    {
      this.toastService.success(this.translate.instant('dashboard.Assessment.Assessment deleted Successfully'));
      this.getRate()
     }
    
  },(err)=>{
    this.toastService.error(this.translate.instant('dashboard.AnnualHoliday.error,please try again'));
  })
}
confirmDeleteListener(){
  this.subscription=this.confirmModelService.confirmed$.subscribe(val => {
    if (val) this.deleteRate(this.selectedRate)
    
  })
}

ngOnDestroy(): void {
  this.subscription.unsubscribe();
}
checkDashboardHeader()
   {
       if(this.currentUserScope==UserScope.Employee)
     {
       this.componentHeaderData.breadCrump=
       [
      
        { label: this.translate.instant('sideBar.educationalSettings.children.Subjects Assessments'), routerLink: '/dashboard/school-performance-managent/assessments/assements-list/', routerLinkActiveOptions: { exact: true } }
       ]
 
       
     }
     else if (this.currentUserScope==UserScope.SPEA)
     {
       this.componentHeaderData.breadCrump=
          [
            { label: this.translate.instant('sideBar.educationalSettings.children.Subjects Assessments'), routerLink: '/dashboard/educational-settings/assessments/assements-list/', routerLinkActiveOptions: { exact: true } }
         ]
 
       
     }
 
     this.headerService.changeHeaderdata(this.componentHeaderData)
   }

}
