import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {finalize,take } from 'rxjs';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {


  constructor(private http: HttpClient,
    private tableLoaderService: LoaderService) {

   }



  getAllUsers(page){
    return this.http.get(`https://reqres.in/api/users?page=${page}`)
    .pipe(take(1))
  }
  getUserDetails(userId){
    return this.http.get(`https://reqres.in/api/users/${userId}`)
    .pipe(take(1))
  }








  // getChild(id:number): Observable<any>{
  //   return this.http.get(`/Child/${id}`)
  //   .pipe(
  //     map(res=>{
  //       if(res.statusCode==HttpStatusCodeEnum.NotFound) {
  //         localStorage.setItem('notFoundMessage', getLocalizedValue(res?.errorLocalized))
  //         this.sharedService.notFoundMessage = getLocalizedValue(res?.errorLocalized)

  //         this.router.navigate(['/oops/page-not-allowed'])
  //         return EMPTY
  //       }
  //       else return res
  //     }),
  //     take(1));
  // }



}
