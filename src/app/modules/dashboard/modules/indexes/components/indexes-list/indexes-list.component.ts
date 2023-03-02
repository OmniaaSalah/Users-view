import { Component, OnInit ,inject} from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { IndexesService } from '../../service/indexes.service';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { ExportService } from 'src/app/shared/services/export/export.service';
import { FileEnum } from 'src/app/shared/enums/file/file.enum';
import { Table } from 'primeng/table';
import { Filtration } from 'src/app/core/classes/filtration';
import { paginationInitialState } from 'src/app/core/classes/pagination';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { ArrayOperations } from 'src/app/core/classes/array';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { StatusEnum } from 'src/app/shared/enums/status/status.enum';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { ClaimsEnum } from 'src/app/shared/enums/claims/claims.enum';

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
  filtration = {...Filtration,IndexType: null,IndexStatus:''};
  paginationState= {...paginationInitialState};
  indexes={
    totalAllData:0,
    total:0,
    list:[],
    loading:true
  }
  constructor(private exportService: ExportService,
    private loaderService:LoaderService,
    private headerService: HeaderService,
    private sharedService:SharedService,
    private indexesService: IndexesService, private translate: TranslateService, private router: Router) { }

  ngOnInit(): void {

    this.getAllIndexes();

    this.headerService.Header.next(
      {
        'breadCrump': [
          { label: this.translate.instant('sideBar.managerTools.children.System List'),routerLink: '/dashboard/manager-tools/indexes/indexes-list' }],
      }
    );
    this.indexListType=this.sharedService.getIndexesTypes();


  }


  sortMe(e)
  {
    if(e.order==-1)
    {this.filtration.SortBy="update "+e.field;}
    else
    {this.filtration.SortBy="old "+e.field;}
    this.filtration.Page=1;
    this.getAllIndexes();
  }

  getAllIndexes(){
    this.sharedService.appliedFilterCount$.next(ArrayOperations.filledObjectItemsCount(this.filtration));
    this.indexes.loading=true;
    this.indexes.list=[];
    this.indexesService.getAllIndexes(this.filtration).subscribe((res)=>{

        this.indexes.loading=false;
        this.indexes.total=res.total;
        this.indexes.list=res.data;
        this.indexes.totalAllData=res.totalAllData
      
      },(err)=>{this.indexes.loading = false;
        this.indexes.total=0
      });


  }
  clearFilter(){

    this.filtration.KeyWord =''
    this.filtration.IndexType= null;
    this.filtration.IndexStatus= null;
    this.filtration.Page=1;
    this.getAllIndexes();
  }


  onExport(fileType: FileEnum, table:Table){
    let filter = {...this.filtration, PageSize:0}
    this.indexesService.indexesToExport(filter).subscribe( (res) =>{
      
      this.exportService.exportFile(fileType, res, this.translate.instant('sideBar.managerTools.children.System List'))
    })
  }



  paginationChanged(event: paginationState) {
    this.filtration.Page = event.page;
    this.getAllIndexes();

  }




}
