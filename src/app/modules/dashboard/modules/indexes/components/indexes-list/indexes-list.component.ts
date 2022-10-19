import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IIndexs } from 'src/app/core/Models/iindex';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { IndexesService } from '../../service/indexes.service';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { paginationState } from 'src/app/core/models/pagination/pagination';


@Component({
  selector: 'app-indexes',
  templateUrl: './indexes-list.component.html',
  styleUrls: ['./indexes-list.component.scss']
})
export class IndexesComponent implements OnInit {
  indexesList: IIndexs[] = [];
  faEllipsisVertical = faEllipsisVertical;
  first = 0;
  rows = 4;
  cities: string[];
  
  constructor(private headerService: HeaderService, private indexesService: IndexesService, private translate: TranslateService, private router: Router) { }

  ngOnInit(): void {
    this.headerService.Header.next(
      {
        'breadCrump': [
          { label: this.translate.instant('sideBar.managerTools.children.System List'),routerLink: '/dashboard/manager-tools/indexes/indexes-list' }],
      }
    );
    this.cities = this.indexesService.cities;
    this.indexesList = this.indexesService.indexesList;
  }

  onTableDataChange(event: paginationState) {
    this.first = event.first
    this.rows = event.rows

  }

 


}
