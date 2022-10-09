import { Component, OnInit } from '@angular/core';

import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { paginationState } from 'src/app/core/models/pagination/pagination';
import { SchoolListModel } from './school-list.models';


@Component({
  selector: 'app-school-list',
  templateUrl: './school-list.component.html',
  styleUrls: ['./school-list.component.scss']
})
export class SchoolListComponent implements OnInit {

  model: SchoolListModel;

  constructor(
    private headerService: HeaderService,
  ) { 
    this.initModels();
  }

  ngOnInit(): void {
    this.headerService.changeHeaderdata(this.model.componentHeaderData);
    this.initFilter();
  }


  paginationChanged(event: paginationState) {
    console.log(event);
    this.model.first = event.first
    this.model.rows = event.rows
  }

  private initFilter(): void {
    this.model.appUserCount1 = this.model.appUsageData.filter(
      (app) => app.appname === 'app-1'
    ).length;
    this.model.appUserCount2 = this.model.appUsageData.filter(
      (app) => app.appname === 'app-4'
    ).length;
    this.model.appUserCount3 = this.model.appUsageData.filter(
      (app) => app.appname === 'app-3'
    ).length;
    this.model.appUserCount4 = this.model.appUsageData.filter(
      (app) => app.appname === 'app-2'
    ).length;
    this.model.appUserCount5 = this.model.appUsageData.filter(
      (app) => app.appname === 'app-5'
    ).length;
  }

  private initModels(): void {
    this.model = new SchoolListModel();
  }
}
