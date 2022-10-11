import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { SchoolChartsModel } from './school-chart.models';
import { SchoolsService } from 'src/app/core/services/schools-services/schools.service';

@Component({
  selector: 'app-school-charts',
  templateUrl: './school-charts.component.html',
  styleUrls: ['./school-charts.component.scss']
})
export class SchoolChartsComponent implements OnInit {

  model: SchoolChartsModel;

  constructor(
    private schoolService: SchoolsService,
    private translate: TranslateService,
  ) {
    this.initModels();
  }

  ngOnInit(): void {
    this.getChartData();
  }

  private initModels(): void {
    this.model = new SchoolChartsModel();
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
        ],
         backgroundColor: ["#CD578A", "#5CD0DF", "#F8C073" , "#fefefe"]},
      ]
    };
  }

  private setActiveSchoolsChartData(): void {
    const chartData = this.model.chartData;
    this.model.activeSchoolsDatasets = [
      {
        data: [chartData.activeSchoolCount, chartData.inActiveSchoolCount],
        backgroundColor: ["#F8C073", "#5CD0DF"]},

    ];
  }

}
