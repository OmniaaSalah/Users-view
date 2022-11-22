import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
/* tslint:disable */
declare var Object: any;
import { Injectable, Inject, EventEmitter } from '@angular/core';

import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable, of, take } from 'rxjs';
import { PermissionsEnum } from 'src/app/shared/enums/permissions/permissions.enum';

import { environment } from 'src/environments/environment';
import { ArrayOperations } from '../../classes/array';
import { IUser, Token } from '../../Models/base.models';
import { GenericResponse } from '../../models/global/global.model';
import { IAccount } from '../../Models/IAccount';
import { IAccountAddOrEdit } from '../../Models/IAccountAddOrEdit';
import { HttpHandlerService } from '../http/http-handler.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  userClaims:Partial<{[key in PermissionsEnum]: PermissionsEnum}>={}
  
  getUserClaims(){
    if(Object.keys(this.userClaims).length) return of(this.userClaims)

    return this.http.get('https://daleel-api.azurewebsites.net/api/current-user/get-claims')
    .pipe(
      map((res: GenericResponse<any>)=> res.result),
      map((res)=> res.map(val => val.code)),
      map((claims:any)=> {
        let claimsMap = ArrayOperations.arrayOfStringsToObject(claims)
        this.userClaims = {...claimsMap}
        return claimsMap
      }),
      take(1)
    )
  }
  
  baseUrl = environment.serverUrl;
  private headers = new HttpHeaders();


  private token: any = new Token();
  protected prefix: string = '$AJ$';
  cities: string[];

  selectedCities: string[];
  usersList: IUser[] = [];
  constructor(private router: Router ,private http: HttpClient,
) {
  // this.headers = this.headers.set('content-type', 'application/json');
  // this.headers = this.headers.set('Accept', 'application/json');
    this.token.user = this.load('user');
    this.token.userId = this.load('userId');
    this.token.expires = this.load('expires');
    this.token.token = this.load('token');
    this.token.claims = this.load('claims');
    this.token.scope = this.load('scope');





  }



  public setScope(scope?: any) {
     this.token.scope = JSON.stringify(scope);
     this.save();
 }


  public getCurrentUserScope(): any {

    return typeof this.token.scope === 'string' ?  JSON.parse(this.token.scope)  : this.token.scope;

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
  public  isUserLogged():boolean
  {
    if (this.load("token"))
       {return true;}
    else
       {return false;}
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
    this.persist('scope', this.token.scope, expires);

    return true;
  }

  /**
   * @method load
   * @param {string} prop Property name
   * @return {any} Any information persisted in storage
   * @description
   * This method will load either from local storage or cookies the provided property.
   **/
  public load(prop: string) {
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
  public persist(prop: string, value: any, expires?: Date): void {
    try {
      if (value)
        localStorage.setItem(`${this.prefix}${prop}`, typeof value === 'object' ? JSON.stringify(value) : value);
    } catch (err) {
      console.error('Cannot access local/session storage:', err);
    }
  }
}
