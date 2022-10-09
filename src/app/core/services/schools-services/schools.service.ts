import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpHandlerService } from '../http-handler.service';
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
    return this.http.get('/School/Statistics', {}, {
      'Authorization':  `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBdXRoZW50aWNhdGUiOiJ0cnVlIiwibmFtZSI6ImFkbWluQHNwZWEuY29tIiwiZW1haWwiOiJhZG1pbkBzcGVhLmNvbSIsIm5hbWVpZCI6IjEiLCJTY29wZSI6IlNQRUEiLCJuYmYiOjE2NjQ1NjUxMzcsImV4cCI6MTY2NDY1MTUzNywiaWF0IjoxNjY0NTY1MTM3fQ.FXIOywLftOBW-ZSM-7ep-YNXWpD3ZXFJHeT_H7EHk1U`
    });
  }
}
