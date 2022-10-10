import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IIndexs } from 'src/app/core/Models/iindex';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { IndexesService } from '../../service/indexes.service';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
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
  tableShown:boolean=true;
  indexesList: IIndexs[] = [];
  faEllipsisVertical = faEllipsisVertical;
  first = 0;
  rows = 4;
  listType: string[];
  
  constructor(private exportService: ExportService,private headerService: HeaderService, private indexesService: IndexesService, private translate: TranslateService, private router: Router) { }

  ngOnInit(): void {
    this.getAllIndexes();
    this.headerService.Header.next(
      {
        'breadCrump': [
          { label: this.translate.instant('sideBar.managerTools.children.System List'),routerLink: '/dashboard/manager-tools/indexes/indexes-list' }],
      }
    );
    this.listType = this.indexesService.listType;
    // this.indexesList = this.indexesService.indexesList;
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
      console.log(this.filtration); 
      console.log(this.filtration.SortBy);
    
      this.indexesList=res.data;
      // this.indexesList=[];
      setTimeout(()=> {
        if(this.indexesList.length==0)
        {this.tableShown=false;}
        else
        {this.tableShown=true;}
        }, 3000);
     
        console.log(this.tableShown);
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
    console.log(event);
    this.first = event.first
    this.rows = event.rows

    this.filtration.Page = event.page

    this.getAllIndexes();

  }

 


}
