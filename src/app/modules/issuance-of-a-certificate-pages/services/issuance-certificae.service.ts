import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';

@Injectable({
  providedIn: 'root'
})
export class IssuanceCertificaeService {

  constructor(private http:HttpHandlerService) { }
  // boardsArray = 
  //   [
  //     {name:"a1",url:"a1"},
  //     {name:"a2",url:"a2"},
  //     {name:"a3",url:"a3"},
  //     {name:"a4",url:"a4"},
  //     {name:"a5",url:"a5"},
  //     {name:"a6",url:"a6"},

  //   ]
  studentArray = []
  getBoards(id){

   return this.http.get(`/Student/attachment/${id}`)
    // return of(this.boardsArray) 
  }
  getParentsChild(){
   return this.http.get('/Guardian/2/Children?yearId=1')
  }
}
