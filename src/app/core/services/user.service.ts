/* tslint:disable */
declare var Object: any;
import { Injectable, Inject, EventEmitter } from '@angular/core';

import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Token, IUser } from '../models/base.models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private token: any = new Token();
  protected prefix: string = '$AJ$';
  cities: string[];

  selectedCities: string[];
  userslist: IUser[] = [];
  constructor(private router: Router) {
    this.token.user = this.load('user');
    this.token.userId = this.load('userId');
    this.token.expires = this.load('expires');
    this.token.token = this.load('token');
    this.token.claims = this.load('claims');
    this.userslist = [
      { 'id': 12354777789745, 'fullname': 'Clare Cornau', 'phonenumber': '(815) 6180492', 'email': 'ccornau0@bigcartel.com', 'lastupdated': 'Female', 'privaterole': 'Somalia', 'nickname': "", 'userstatus': "", 'password': "", 'identitynumber': "" },
      { 'id': 12354777789745, 'fullname': 'Edouard Elsmore', 'phonenumber': '(507) 3119958', 'email': 'eelsmore1@goo.gl', 'lastupdated': 'Male', 'privaterole': 'United States', 'nickname': "", 'userstatus': "", 'password': "", 'identitynumber': "" },
      { 'id': 12354777789745, 'fullname': 'Aeriel Elldred', 'phonenumber': '(478) 7181722', 'email': 'aelldred2@archive.org', 'lastupdated': 'Female', 'privaterole': 'Russia', 'nickname': "", 'userstatus': "", 'password': "", 'identitynumber': "" },
      { 'id': 12354777789745, 'fullname': 'Abagael Meachem', 'phonenumber': '(698) 4411762', 'email': 'ameachem3@columbia.edu', 'lastupdated': 'Female', 'privaterole': 'China', 'nickname': "", 'userstatus': "", 'password': "", 'identitynumber': "" },
      { 'id': 12354777789745, 'fullname': 'Jeremiah Hadwen', 'phonenumber': '(345) 6582965', 'email': 'jhadwen4@vkontakte.ru', 'lastupdated': 'Male', 'privaterole': 'Mongolia', 'nickname': "", 'userstatus': "", 'password': "", 'identitynumber': "" },
      { 'id': 12354777789745, 'fullname': 'Rollin Wainscoat', 'phonenumber': '(659) 9557733', 'email': 'rwainscoat5@thetimes.co.uk', 'lastupdated': 'Male', 'privaterole': 'Bhutan', 'nickname': "", 'userstatus': "", 'password': "", 'identitynumber': "" },
      { 'id': 12354777789745, 'fullname': 'Micah Braddock', 'phonenumber': '(864) 2101861', 'email': 'mbraddock6@yellowbook.com', 'lastupdated': 'Male', 'privaterole': 'Peru', 'nickname': "", 'userstatus': "", 'password': "", 'identitynumber': "" },
      { 'id': 12354777789745, 'fullname': 'Jayme Crotty', 'phonenumber': '(165) 5814372', 'email': 'jcrotty7@opensource.org', 'lastupdated': 'Male', 'privaterole': 'Niger', 'nickname': "", 'userstatus': "", 'password': "", 'identitynumber': "" },
      { 'id': 12354777789745, 'fullname': 'Margo Braker', 'phonenumber': '(428) 2282928', 'email': 'mbraker8@yahoo.co.jp', 'lastupdated': 'Female', 'privaterole': 'Argentina', 'nickname': "", 'userstatus': "", 'password': "", 'identitynumber': "" },
      { 'id': 12354777789745, 'fullname': 'Bertie Bosman', 'phonenumber': '(673) 5170425', 'email': 'bbosman9@google.co.jp', 'lastupdated': 'Female', 'privaterole': 'Greece', 'nickname': "", 'userstatus': "", 'password': "", 'identitynumber': "" },
      { 'id': 12354777789745, 'fullname': 'Darelle Rowlands', 'phonenumber': '(978) 8885907', 'email': 'drowlandsa@slate.com', 'lastupdated': 'Female', 'privaterole': 'Indonesia', 'nickname': "", 'userstatus': "", 'password': "", 'identitynumber': "" },
      { 'id': 12354777897452, 'fullname': 'Neile Keets', 'phonenumber': '(956) 9360112', 'email': 'nkeetsb@canalblog.com', 'lastupdated': 'Female', 'privaterole': 'Finland', 'nickname': "", 'userstatus': "", 'password': "", 'identitynumber': "" },
      { 'id': 12354777789745, 'fullname': 'Shari Bussen', 'phonenumber': '(240) 7150720', 'email': 'sbussenc@so-net.ne.jp', 'lastupdated': 'Female', 'privaterole': 'Philippines', 'nickname': "", 'userstatus': "", 'password': "", 'identitynumber': "" },
      { 'id': 12354777789745, 'fullname': 'Arron Drivers', 'phonenumber': '(416) 4076124', 'email': 'adriversd@com.com', 'lastupdated': 'Male', 'privaterole': 'Bosnia and Herzegovina', 'nickname': "", 'userstatus': "", 'password': "", 'identitynumber': "" },
      { 'id': 12354777789745, 'fullname': 'Carola Balasin', 'phonenumber': '(262) 7945277', 'email': 'cbalasine@blogger.com', 'lastupdated': 'Female', 'privaterole': 'Bolivia', 'nickname': "", 'userstatus': "", 'password': "", 'identitynumber': "" },
      { 'id': 12354777789745, 'fullname': 'Clarinda Barrick', 'phonenumber': '(501) 3984600', 'email': 'cbarrickf@t-online.de', 'lastupdated': 'Female', 'privaterole': 'China', 'nickname': "", 'userstatus': "", 'password': "", 'identitynumber': "" },
      { 'id': 12354777789745, 'fullname': 'Inglis Treweela', 'phonenumber': '(718) 4157883', 'email': 'itreweelag@tripod.com', 'lastupdated': 'Male', 'privaterole': 'Finland', 'nickname': "", 'userstatus': "", 'password': "", 'identitynumber': "" },
      { 'id': 12354777789745, 'fullname': 'Yardley Georgeot', 'phonenumber': '(213) 5730967', 'email': 'ygeorgeoth@360.cn', 'lastupdated': 'Male', 'privaterole': 'Portugal', 'nickname': "", 'userstatus': "", 'password': "", 'identitynumber': "" },
      { 'id': 12354777789745, 'fullname': 'Hestiaalffrey', 'phonenumber': '(349) 6453938', 'email': 'hpalffreyi@nba.com', 'lastupdated': 'Female', 'privaterole': 'Madagascar', 'nickname': "", 'userstatus': "", 'password': "", 'identitynumber': "" },
      { 'id': 21235477789745, 'fullname': 'Gwendolyn Mordon', 'phonenumber': '(474) 3068249', 'email': 'gmordonj@uiuc.edu', 'lastupdated': 'Female', 'privaterole': 'Greece', 'nickname': "", 'userstatus': "", 'password': "", 'identitynumber': "" }
    ];



    this.cities = [
      "New York",
      "Rome",
      "London",
      "Istanbul",
      "Paris"
    ];

  }

  /**
   * This method will update the user information and persist it
   **/
  public setUser(user: any) {
    this.token.user = JSON.stringify(user);
    this.save();
  }

  /**
   * This method will update the user claims and persist it
   **/
  public setClaims(claims?: any) {
    this.token.claims = JSON.stringify(claims);
    this.save();
  }

  /**
   * @method setToken
   * @param {Token} token Token or casted AccessToken instance
   * @return {void}
   * @description
   * This method will set a flag in order to remember the current credentials
   **/
  public setToken(token: Token): void {
    this.token = Object.assign({}, this.token, token);
    this.save();
  }

  /**
   * @method getToken
   * @return {void}
   * @description
   * This method will set a flag in order to remember the current credentials.
   **/
  public getToken(): Token {
    return <Token>this.token;
  }

  /**
   * @method getAccessTokenId
   * @return {string}
   * @description
   * This method will return the actual token string, not the object instance.
   **/
  public getAccessTokenId(): string {
    return this.token.token;
  }

  public isAuthenticated(): string {
    return this.token.token && this.token.userId;
  }

  /**
   * @method getCurrentUserId
   * @return {any}
   * @description
   * This method will return the current user id, it can be number or string.
  **/

  public getCurrentUserId(): any {
    return this.token.userId;
  }

  /**
   * @method getCurrentUserData
   * @return {any}
   * @description
   * This method will return the current user instance.
   **/
  public getCurrentUserData(): IUser {
    return typeof this.token.user === 'string' ? JSON.parse(this.token.user) : this.token.user;
  }

  public getCurrentUserClaims(): any {
    return typeof this.token.claims === 'string' ? JSON.parse(this.token.claims) : this.token.claims;
  }

  public isUserAllowedTo(claim: string): any {

    let userClaims = this.getCurrentUserClaims() || [];

    return userClaims.indexOf(claim) >= 0;
  }

  /**
   * @method save
   * @return {boolean} Whether or not the information was saved
   * @description
   * This method will save in either local storage or cookies the current credentials.
   **/
  public save(): boolean {
    let expires = new Date(this.token.expires);
    this.persist('token', this.token.token, expires);
    this.persist('user', this.token.user, expires);
    this.persist('userId', this.token.userId, expires);
    this.persist('expires', this.token.expires, expires);
    this.persist('claims', this.token.claims, expires);

    return true;
  }

  /**
   * @method load
   * @param {string} prop Property name
   * @return {any} Any information persisted in storage
   * @description
   * This method will load either from local storage or cookies the provided property.
   **/
  protected load(prop: string) {
    return localStorage.getItem(`${this.prefix}${prop}`);
  }

  /**
   * @method clear
   * @return {void}
   * @description
   * This method will clear cookies or the local storage.
   **/
  public clear(): void {
    Object.keys(this.token).forEach((prop: string) => localStorage.removeItem(`${this.prefix}${prop}`));
    this.token = new Token();
    this.token.user = null;
  }

  /**
   * @method persist
   * @return {void}
   * @description
   * This method saves values to storage
   **/
  protected persist(prop: string, value: any, expires?: Date): void {
    try {
      if (value)
        localStorage.setItem(`${this.prefix}${prop}`, typeof value === 'object' ? JSON.stringify(value) : value);
    } catch (err) {
      console.error('Cannot access local/session storage:', err);
    }
  }
}
