import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { SchoolsService } from '../../../services/schools/schools.service';
import { SchoolListModel } from '../school-list.models';
@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {

  model: SchoolListModel;
  constructor(
    private headerService: HeaderService,
    private schoolService: SchoolsService) {
      this.initModels();
     }

  ngOnInit(): void {
    this.getChartData();
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
    this.model.schoolCurriculumDatasets = [
      {
        data: [
          schoolCurriculum.australi,
          schoolCurriculum.english,
          schoolCurriculum.string,
          0,
        ],
      }
    ];
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
