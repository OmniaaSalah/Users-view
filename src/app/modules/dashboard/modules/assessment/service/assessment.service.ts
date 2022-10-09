import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpHandlerService } from 'src/app/core/services/http-handler.service';

@Injectable({
  providedIn: 'root'
})
export class AssessmentService {

  constructor(private http: HttpHandlerService) {}

  getRates(): Observable<any> {
    return this.http.get('/Rate');
  }

  addRate(data: any): Observable<any> {
    return this.http.post('/Rate', data);
  }

  getRateById(id: number): Observable<any> {
    return this.http.get(`/Rate/${id}`, {}, {
      'Authorization':  `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBdXRoZW50aWNhdGUiOiJ0cnVlIiwibmFtZSI6ImFkbWluQHNwZWEuY29tIiwiZW1haWwiOiJhZG1pbkBzcGVhLmNvbSIsIm5hbWVpZCI6IjEiLCJTY29wZSI6IlNQRUEiLCJuYmYiOjE2NjUxNzE5NDYsImV4cCI6MTY2NTI1ODM0NiwiaWF0IjoxNjY1MTcxOTQ2fQ.u3IvbzzisdOmYEJee_LUlSuzQQ8YdCSTIkASGjDQoqM`
    });
  }

}
