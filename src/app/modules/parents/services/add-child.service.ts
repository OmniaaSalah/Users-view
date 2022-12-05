import { Injectable } from '@angular/core';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';

@Injectable({
  providedIn: 'root'
})
export class AddChildService {

  constructor(private http:HttpHandlerService) { }

  getNationality(){
    return this.http.get('/Nationality')
  }

  getReligions(){
    return this.http.get('/Religion')
  }

  getParentsChild(){
    return this.http.get('/Guardian/2/Children?yearId=1')
   }
}
