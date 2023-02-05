import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';

@Injectable({
  providedIn: 'root'
})
export class AddChildService {

  constructor(private http:HttpHandlerService) { }

  getNationality(){
    return this.http.get('/Nationality').pipe(take(1))
  }

  getReligions(){
    return this.http.get('/Religion').pipe(take(1))
  }

  getParentsChild(id){
    return this.http.get(`/Guardian/${id}/Children?yearId=1`).pipe(take(1))
   }

   getRelative(){
    return this.http.get('/Child/relative-relation').pipe(take(1))
   }

   postChildWithoudIdentity(data){
    return this.http.post('/Child',data)
    .pipe(
      
      take(1))
   }

   sendRelinkChildReq(data){
    return this.http.post('/Student/relink-child-to-guardian-request',data).pipe(take(1))
   }
}
