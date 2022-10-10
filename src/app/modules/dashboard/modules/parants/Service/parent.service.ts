import { IParent } from './../../../../../core/Models/parent';

import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ParentService {

  apiBaseUrl = environment.serverUrl;

  constructor(private http: HttpClient,
              private router: Router,
              private route: ActivatedRoute,) { }

getAllParent(){
  return this.http.get<IParent>(this.apiBaseUrl + '/Guardian')
}

}
