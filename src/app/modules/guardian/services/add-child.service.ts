import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';

@Injectable({
  providedIn: 'root'
})
export class AddChildService {

  constructor(private http:HttpHandlerService) { }


   postChildWithoudIdentity(data){
    return this.http.post('/Child',data).pipe(take(1))
   }

   sendRelinkChildReq(data){
    return this.http.post('/Student/relink-child-to-guardian-request',data).pipe(take(1))
   }



   addChildWithIdentity(data,attachments){
    return this.http.post(`/Child/emiratesId`,attachments, data).pipe(take(1))
   }

}
