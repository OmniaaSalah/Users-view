import { Component, OnInit ,inject} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { IndexesService } from '../../service/indexes.service';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { ExportService } from 'src/app/shared/services/export/export.service';
import { FileTypeEnum } from 'src/app/shared/enums/file/file.enum';
import { Table } from 'primeng/table';
import { Filtration } from 'src/app/core/helpers/filtration';
import { paginationInitialState } from 'src/app/core/helpers/pagination';
import { ArrayOperations } from 'src/app/core/helpers/array';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { StatusEnum } from 'src/app/shared/enums/status/status.enum';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { ClaimsEnum } from 'src/app/shared/enums/claims/claims.enum';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-indexes',
  templateUrl: './indexes-list.component.html',
  styleUrls: ['./indexes-list.component.scss']
})
export class IndexesComponent implements OnInit {
  lang = inject(TranslationService).lang
  faEllipsisVertical = faEllipsisVertical;
  get ClaimsEnum() {return ClaimsEnum}
  indexStatusList=[
    {'value':StatusEnum.Active,'name':this.translate.instant("Active")},
    {'value':StatusEnum.Inactive,'name':this.translate.instant("Inactive")}
  ];
  indexListType;
  filtration = {...Filtration,IndexType: null,IndexStatus:'',  ...JSON.parse(this.route.snapshot.queryParams['searchQuery'] || 'null')};
  paginationState= {...paginationInitialState};
  indexes={
    totalAllData:0,
    total:0,
    list:[],
    loading:true
  }
  constructor(private exportService: ExportService,
    private headerService: HeaderService,
    private sharedService:SharedService,
    private indexesService: IndexesService,
    private translate: TranslateService,
    private route:ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {

    this.getAllIndexes();

    this.headerService.Header.next(
      {
        'breadCrump': [
          { label: this.translate.instant('sideBar.managerTools.children.System List'),routerLink: '/manager-tools/indexes' }],
      }
    );
    this.indexListType=this.sharedService.getIndexesTypes();


  }


  sortMe(e)
  {
    if(e.order==-1)
    {this.filtration.SortBy="ASC"}
    else
    {this.filtration.SortBy="desc"}
    this.filtration.SortColumnName=e.field;
    this.filtration.Page=1;
    this.getAllIndexes();
  }

  getAllIndexes(){
    if(this.route.snapshot.queryParams['searchQuery']){
      this.filtration = {...JSON.parse(this.route.snapshot.queryParams['searchQuery']), ...this.filtration}
    }
    this.router.navigate([], {
      queryParams: {searchQuery : JSON.stringify(this.filtration)},
      relativeTo: this.route,

    });

    this.sharedService.appliedFilterCount$.next(ArrayOperations.filledObjectItemsCount(this.filtration));
    this.indexes.loading=true;
    this.indexes.list=[];
    this.indexesService.getAllIndexes(this.filtration).subscribe((res)=>{
      this.sharedService.filterLoading.next(false);
        this.indexes.loading=false;
        this.indexes.total=res.total;
        this.indexes.list=res.data;
        this.indexes.totalAllData=res.totalAllData

      },(err)=>{this.indexes.loading = false;
        this.indexes.total=0
        this.sharedService.filterLoading.next(false);
      });


  }
  clearFilter(){

    this.filtration.KeyWord =''
    this.filtration.IndexType= null;
    this.filtration.IndexStatus= null;
    this.filtration.Page=1;
    this.getAllIndexes();
  }


  onExport(fileType: FileTypeEnum, table:Table){
    this.exportService.showLoader$.next(true)
    let filter = {...this.filtration, PageSize:this.indexes.totalAllData,Page:1}
    this.indexesService.indexesToExport(filter).subscribe( (res) =>{

      this.exportService.exportFile(fileType, res, this.translate.instant('sideBar.managerTools.children.System List'))
    })
  }



  paginationChanged(event: paginationState) {
    this.filtration.Page = event.page;
    this.getAllIndexes();

  }




}
