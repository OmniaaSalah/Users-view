/* tslint:disable */
declare var Object: any;
import { Injectable, Inject, EventEmitter } from '@angular/core';

import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Token, User } from '../Models/base.models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private token: any = new Token();
  protected prefix: string = '$AJ$';
  cities: string[];

  selectedCities: string[];
  UsersList:User[]=[];
  constructor(private router: Router) {
    this.token.user = this.load('user');
    this.token.userId = this.load('userId');
    this.token.expires = this.load('expires');
    this.token.token = this.load('token');
    this.token.claims = this.load('claims');
    this.UsersList= [
      { 'id': 12354777789745,'fullName': 'Clare Cornau', 'phoneNumber': '(815) 6180492', 'email': 'ccornau0@bigcartel.com', 'lastUpdated': 'Female', 'PrivateRole': 'Somalia','NickName':"",'UserStatus':"",'Password':"",'IdentityNumber':"" },
      { 'id': 12354777789745, 'fullName': 'Edouard Elsmore', 'phoneNumber': '(507) 3119958', 'email': 'eelsmore1@goo.gl', 'lastUpdated': 'Male', 'PrivateRole': 'United States','NickName':"",'UserStatus':"",'Password':"",'IdentityNumber':"" },
      { 'id': 12354777789745, 'fullName': 'Aeriel Elldred', 'phoneNumber': '(478) 7181722', 'email': 'aelldred2@archive.org', 'lastUpdated': 'Female', 'PrivateRole': 'Russia' ,'NickName':"",'UserStatus':"",'Password':"",'IdentityNumber':"" },
      { 'id': 12354777789745, 'fullName': 'Abagael Meachem', 'phoneNumber': '(698) 4411762', 'email': 'ameachem3@columbia.edu', 'lastUpdated': 'Female', 'PrivateRole': 'China','NickName':"",'UserStatus':"",'Password':"",'IdentityNumber':""  },
      { 'id': 12354777789745, 'fullName': 'Jeremiah Hadwen', 'phoneNumber': '(345) 6582965', 'email': 'jhadwen4@vkontakte.ru', 'lastUpdated': 'Male', 'PrivateRole': 'Mongolia','NickName':"",'UserStatus':"",'Password':"",'IdentityNumber':""  },
      { 'id': 12354777789745, 'fullName': 'Rollin Wainscoat', 'phoneNumber': '(659) 9557733', 'email': 'rwainscoat5@thetimes.co.uk', 'lastUpdated': 'Male', 'PrivateRole': 'Bhutan','NickName':"",'UserStatus':"",'Password':"",'IdentityNumber':""  },
      { 'id': 12354777789745, 'fullName': 'Micah Braddock', 'phoneNumber': '(864) 2101861', 'email': 'mbraddock6@yellowbook.com', 'lastUpdated': 'Male', 'PrivateRole': 'Peru' ,'NickName':"",'UserStatus':"",'Password':"",'IdentityNumber':"" },
      { 'id': 12354777789745, 'fullName': 'Jayme Crotty', 'phoneNumber': '(165) 5814372', 'email': 'jcrotty7@opensource.org', 'lastUpdated': 'Male', 'PrivateRole': 'Niger','NickName':"",'UserStatus':"",'Password':"",'IdentityNumber':""  },
      { 'id': 12354777789745, 'fullName': 'Margo Braker', 'phoneNumber': '(428) 2282928', 'email': 'mbraker8@yahoo.co.jp', 'lastUpdated': 'Female', 'PrivateRole': 'Argentina','NickName':"",'UserStatus':"",'Password':"",'IdentityNumber':""  },
      { 'id': 12354777789745, 'fullName': 'Bertie Bosman', 'phoneNumber': '(673) 5170425', 'email': 'bbosman9@google.co.jp', 'lastUpdated': 'Female', 'PrivateRole': 'Greece' ,'NickName':"",'UserStatus':"",'Password':"",'IdentityNumber':"" },
      { 'id': 12354777789745, 'fullName': 'Darelle Rowlands', 'phoneNumber': '(978) 8885907', 'email': 'drowlandsa@slate.com', 'lastUpdated': 'Female', 'PrivateRole': 'Indonesia' ,'NickName':"",'UserStatus':"",'Password':"",'IdentityNumber':"" },
      { 'id': 12354777897452, 'fullName': 'Neile Keets', 'phoneNumber': '(956) 9360112', 'email': 'nkeetsb@canalblog.com', 'lastUpdated': 'Female', 'PrivateRole': 'Finland','NickName':"",'UserStatus':"",'Password':"",'IdentityNumber':""  },
      { 'id': 12354777789745, 'fullName': 'Shari Bussen', 'phoneNumber': '(240) 7150720', 'email': 'sbussenc@so-net.ne.jp', 'lastUpdated': 'Female', 'PrivateRole': 'Philippines','NickName':"",'UserStatus':"",'Password':"",'IdentityNumber':""  },
      { 'id': 12354777789745, 'fullName': 'Arron Drivers', 'phoneNumber': '(416) 4076124', 'email': 'adriversd@com.com', 'lastUpdated': 'Male', 'PrivateRole': 'Bosnia and Herzegovina','NickName':"",'UserStatus':"",'Password':"",'IdentityNumber':""  },
      { 'id': 12354777789745, 'fullName': 'Carola Balasin', 'phoneNumber': '(262) 7945277', 'email': 'cbalasine@blogger.com', 'lastUpdated': 'Female', 'PrivateRole': 'Bolivia','NickName':"",'UserStatus':"",'Password':"",'IdentityNumber':""  },
      { 'id': 12354777789745, 'fullName': 'Clarinda Barrick', 'phoneNumber': '(501) 3984600', 'email': 'cbarrickf@t-online.de', 'lastUpdated': 'Female', 'PrivateRole': 'China' ,'NickName':"",'UserStatus':"",'Password':"",'IdentityNumber':"" },
      { 'id': 12354777789745, 'fullName': 'Inglis Treweela', 'phoneNumber': '(718) 4157883', 'email': 'itreweelag@tripod.com', 'lastUpdated': 'Male', 'PrivateRole': 'Finland','NickName':"",'UserStatus':"",'Password':"",'IdentityNumber':""  },
      { 'id': 12354777789745, 'fullName': 'Yardley Georgeot', 'phoneNumber': '(213) 5730967', 'email': 'ygeorgeoth@360.cn', 'lastUpdated': 'Male', 'PrivateRole': 'Portugal','NickName':"",'UserStatus':"",'Password':"",'IdentityNumber':""  },
      { 'id': 12354777789745, 'fullName': 'Hestiaalffrey', 'phoneNumber': '(349) 6453938', 'email': 'hpalffreyi@nba.com', 'lastUpdated': 'Female', 'PrivateRole': 'Madagascar','NickName':"",'UserStatus':"",'Password':"",'IdentityNumber':""  },
      { 'id': 21235477789745, 'fullName': 'Gwendolyn Mordon', 'phoneNumber': '(474) 3068249', 'email': 'gmordonj@uiuc.edu', 'lastUpdated': 'Female', 'PrivateRole': 'Greece' ,'NickName':"",'UserStatus':"",'Password':"",'IdentityNumber':"" }
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
  public getCurrentUserData(): User {
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
