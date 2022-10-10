import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IIndexs } from 'src/app/core/Models/iindex';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { IndexesService } from '../../service/indexes.service';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { paginationState } from 'src/app/core/models/pagination/pagination';
import { ExportService } from 'src/app/shared/services/export/export.service';
import { FileEnum } from 'src/app/shared/enums/file/file.enum';
import { Table } from 'primeng/table';
import { Filtration } from 'src/app/core/classes/filtration';


@Component({
  selector: 'app-indexes',
  templateUrl: './indexes-list.component.html',
  styleUrls: ['./indexes-list.component.scss']
})
export class IndexesComponent implements OnInit {
  filtration = {...Filtration,indexType: '',indexStatus:''};
  tableEmpty:boolean=false;
  indexesList: IIndexs[] = [];
  faEllipsisVertical = faEllipsisVertical;
  first = 1;
  rows = 6;
  allIndexesLength:number=0;
  indexListType;
  indexStatusList
  constructor(private exportService: ExportService,private headerService: HeaderService, private indexesService: IndexesService, private translate: TranslateService, private router: Router) { }

  ngOnInit(): void {
    this.getAllIndexes();
    this.headerService.Header.next(
      {
        'breadCrump': [
          { label: this.translate.instant('sideBar.managerTools.children.System List'),routerLink: '/dashboard/manager-tools/indexes/indexes-list' }],
      }
    );
    this.indexListType = this.indexesService.indexListType;
    this.indexStatusList=this.indexesService.indexStatusList;
    
  }

  onTableDataChange(event: paginationState) {
    this.first = event.first
    this.rows = event.rows

  }
  sortMe(e)
  {
    this.filtration.SortBy=e.field;
  }

  getAllIndexes(){
    this.indexesService.getAllIndexes(this.filtration).subscribe((res)=>{
     this.allIndexesLength=res.total;
     
      this.indexesList=res.data;
     
     
     if(this.allIndexesLength==0)
     {this.tableEmpty=true;}
     else
     {this.tableEmpty=false;}
    
      });
   
   
  }
  clearFilter(){
    
    this.filtration.KeyWord =''
    this.filtration.indexType= null;
    this.filtration.indexStatus= null;
    this.getAllIndexes();
  }


  onExport(fileType:FileEnum, table:Table){
    this.exportService.exportFile(fileType, table,this.indexesList)
  }



  paginationChanged(event: paginationState) {
    this.filtration.Page = event.page;
    this.getAllIndexes();

  }

 


}
