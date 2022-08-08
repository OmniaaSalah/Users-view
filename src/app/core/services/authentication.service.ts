import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  MAIN_LINK: string = 'https://jobs-nodejs.herokuapp.com/api/users/signin/';
  constructor(private http: HttpClient, private router: Router) { }

  login(user: any) {
    return this.http.post<{ token: string }>(this.MAIN_LINK, user);
  }

  isLoggedIn() {
    const helper = new JwtHelperService();
    const token = localStorage.getItem('token');


    if (!token)
      return false;



    return true
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logoutUser() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
