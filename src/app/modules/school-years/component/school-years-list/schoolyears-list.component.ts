import { Component, OnInit ,inject} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { faEllipsisVertical} from '@fortawesome/free-solid-svg-icons';
import { SchoolYearsService } from '../../service/school-years.service';
import { Router } from '@angular/router';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { IHeader } from 'src/app/core/Models/header-dashboard';
import { paginationInitialState } from 'src/app/core/classes/pagination';
import { Filtration } from 'src/app/core/classes/filtration';
import { ExportService } from 'src/app/shared/services/export/export.service';
import { FileTypeEnum } from 'src/app/shared/enums/file/file.enum';
import { Table } from 'primeng/table';
import { ArrayOperations } from 'src/app/core/classes/array';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { SchoolYearEnum } from 'src/app/shared/enums/school-year/school-year.enum';
import { ClaimsEnum } from 'src/app/shared/enums/claims/claims.enum';
@Component({
  selector: 'app-schoolyears-list',
  templateUrl: './schoolyears-list.component.html',
  styleUrls: ['./schoolyears-list.component.scss']
})
export class SchoolyearsListComponent implements OnInit {
  lang = inject(TranslationService).lang
  get schoolYearEnum() {return SchoolYearEnum}
  get ClaimsEnum(){return ClaimsEnum}
  faEllipsisVertical=faEllipsisVertical;
  filtration = {...Filtration,statusId:null};
  paginationState= {...paginationInitialState};
  schoolYearsStatus;
  componentHeaderData: IHeader = {
    breadCrump: [
      { label: this.translate.instant('breadcrumb.School Years List'),routerLink:'/educational-settings/school-year/school-years-list'}
    ],

  };
  schoolYears={
    total:0,
    totalAllData:0,
    list:[],
    loading:true
  }

  constructor(private exportService: ExportService,private sharedService:SharedService,private headerService:HeaderService,private translate:TranslateService,private router:Router, private schoolYearService:SchoolYearsService) { }

  ngOnInit(): void {


  localStorage.removeItem('addedSchoolYear');

    this.headerService.changeHeaderdata(this.componentHeaderData);
   this.getAllSchoolYears();

     this.schoolYearsStatus=this.schoolYearService.schoolYearsStatus;

  }



  getAllSchoolYears(){
    this.sharedService.appliedFilterCount$.next(ArrayOperations.filledObjectItemsCount(this.filtration));
    this.schoolYears.loading=true;
    this.schoolYears.list=[];
    this.schoolYearService.getAllSchoolYears(this.filtration).subscribe((res)=>{
      this.sharedService.filterLoading.next(false);
        this.schoolYears.loading=false;
        this.schoolYears.total=res.total;
        this.schoolYears.totalAllData=res.totalAllData;
        this.schoolYears.list=res.data;


      },(err)=>{this.schoolYears.loading = false;
        this.schoolYears.total=0
        this.sharedService.filterLoading.next(false);
      });


  }
  clearFilter(){

    this.filtration.KeyWord =''
    this.filtration.statusId= null;
    this.filtration.Page=1;
    this.getAllSchoolYears();
  }


  onExport(fileType: FileTypeEnum, table:Table){
    let filter = {...this.filtration, PageSize:this.schoolYears.totalAllData,Page:1}
    this.schoolYearService.schoolYearsToExport(filter).subscribe( (res) =>{

      this.exportService.exportFile(fileType, res, this.translate.instant('breadcrumb.School Years List'))
    })
  }

  sortMe(e)
  {
    if(e.order==-1)
    {this.filtration.SortBy="update "+e.field;}
    else
    {this.filtration.SortBy="old "+e.field;}
    this.filtration.Page=1;
    this.getAllSchoolYears();
  }

  paginationChanged(event: paginationState) {
    this.filtration.Page = event.page;
    this.getAllSchoolYears();

  }




}
