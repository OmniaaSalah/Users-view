import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { HttpHandlerService } from '../http-handler.service';

@Injectable({
  providedIn: 'root'
})
export class SchoolsService {

  constructor(private http: HttpHandlerService) { }

  getSchools(searchModel) {
    return this.http.post("/school", searchModel)
  }
}
