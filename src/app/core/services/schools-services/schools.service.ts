import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpHandlerService } from '../http/http-handler.service';
import { ISchoolChart } from 'src/app/modules/dashboard/modules/schools/components/school-list/school-charts/school-chart.models';


@Injectable({
  providedIn: 'root'
})
export class SchoolsService {

  constructor(private http: HttpHandlerService) { }

  getSchools(searchModel) {
    return this.http.post("/school", searchModel)
  }

  getCharts(): Observable<ISchoolChart> {
    // TODO => Need to implement interceptor
    return this.http.get('/School/Statistics');
  }
}
