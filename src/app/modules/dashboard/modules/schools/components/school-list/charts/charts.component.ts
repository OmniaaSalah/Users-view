
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { SchoolsService } from '../../../services/schools/schools.service';
import { SchoolListModel } from '../school-list.models';
import * as FileSaver from 'file-saver';
import { ExportService } from 'src/app/shared/services/export/export.service';
import { FileEnum } from 'src/app/shared/enums/file/file.enum';
import { TranslateService } from '@ngx-translate/core';
import { Filtration } from 'src/app/core/classes/filtration';
import { GlobalService } from 'src/app/shared/services/global/global.service';
import { paginationState } from 'src/app/core/models/pagination/pagination';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SortEvent } from 'primeng/api';
import { faHome, faFilter, faSearch, faAngleLeft, faAngleRight, faHouse, faRightFromBracket, faPercentage } from '@fortawesome/free-solid-svg-icons';


import { IHeader } from 'src/app/core/Models/iheader';
;
import { Table } from 'primeng/table';

//import { SchoolsService } from 'src/app/core/services/schools-services/schools.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {

  curriculums$ = this.globalService.getAllCurriculum()
  model: SchoolListModel;
  constructor(
    private headerService: HeaderService,
    private translate: TranslateService,
    private globalService: GlobalService,
    private schoolService: SchoolsService) {
      this.initModels();
     }

  ngOnInit(): void {
    this.getChartData();
  }
 ///////////charts////////

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

private getChartData(): void {
  this.schoolService.getCharts().subscribe(res => {
    if (res) {
      this.model.chartData = res;
      this.setCurriculumChartChartData();
      this.setRegionSchoolsChartData();
      this.setActiveSchoolsChartData();
    }
  });
}


private setCurriculumChartChartData(): void {
  const schoolCurriculum = this.model.chartData.schoolCurriculum;
  if (schoolCurriculum) {
    const schoolCurriculumValues = Object.values(schoolCurriculum);
    const isArabic = this.translate.currentLang === 'ar';
    this.model.schoolCurriculumDatasets = [{data: schoolCurriculumValues}];
    for (const key in schoolCurriculum) {
      this.model.shoolCurriculumChartLabels.push({
        key: isArabic ? key.slice(3, key.indexOf(',')) : key.slice(key.lastIndexOf(':') + 1, key.length),
        value: schoolCurriculum[key]
      });
    }
  }
}

private setRegionSchoolsChartData(): void {
  const chartData = this.model.chartData;
  this.model.regionSchoolsData = {
    labels: this.model.regionSchoolChartLabels,
    datasets: [
      { data: [
        chartData.schoolCountInEasternProvince,
        chartData.schoolCountInCentralRegion,
        chartData.schoolCountInSharjahCity
      ]},
    ]
  };
}

private setActiveSchoolsChartData(): void {
  const chartData = this.model.chartData;
  this.model.activeSchoolsDatasets = [
    {
      data: [chartData.activeSchoolCount, chartData.inActiveSchoolCount]
    }
  ];
}

private initModels(): void {
  this.model = new SchoolListModel();
}
}
