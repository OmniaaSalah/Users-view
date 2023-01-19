import { HttpClient } from '@angular/common/http';
/* tslint:disable */
declare var Object: any;
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, of, take } from 'rxjs';
import { ClaimsEnum } from 'src/app/shared/enums/claims/claims.enum';
import { UserScope } from 'src/app/shared/enums/user/user.enum';

import { environment } from 'src/environments/environment';
import { ArrayOperations } from '../../classes/array';
import { IUser, Token } from '../../Models/base.models';
import { GenericResponse } from '../../models/global/global.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUserName;
  currentGuardian;
  currentUserSchoolId$ ;
  currentUserSchoolName$ ;
  isUserLogged$ =new BehaviorSubject(false);

  SpeaClaims=[
    'SE_NavBarMenu',
    'S_Menu_SchoolsAndStudents',
    'S_Menu_EducationalSetting',
    'S_Menu_ReportsManagement',
    'S_Menu_ManagarTools',
    'S_Menu_PeformanceManagment',
    'S_Menu_SchoolStudents',
    'S_Menu_CommunicationManagment',
    'S_MenuItem_SchoolEmployee',
    'S_MenuItem_StudentMenu',
    'S_MenuItem_SchoolMenu',
    'S_MenuItem_SubjectMenu',
    'S_MenuItem_Rate',
    'S_MenuItem_Survey',
    'S_MenuItem_Holiday',
    'S_MenuItem_SubjectReport',
    'S_MenuItem_SchoolTeacherReport',
    'S_MenuItem_AbsenceReport',
    'S_MenuItem_GuardianReport',
    'S_MenuItem_StudentReport',
    'S_MenuItem_Setting',
    'S_MenuItem_Index',
    'S_MenuItem_Role',
    'S_MenuItem_user',
    'S_MenuItem_Request',
    'S_MenuItem_Exam',
    'S_MenuItem_DegreesReport',
    'S_MenuItem_GuardianMenu',
    'S_MenuItem_SchoolReport',
    'S_MenuItem_SchoolEmployeeMenu',
    'S_MenuItem_SchoolYear',
    'S_MenuItem_SchoolEmployeeReport',
    'S_SchoolYear',
    'S_ProhibitedFromIssueeCertificate',
    'S_ProhibitedFromWithdrawing',
    'SE_ProhibitedFromIssueeCertificate',
    'SE_ProhibitedFromWithdrawing',
    'S_UploadExam',
    'S_AddEvaluation',
    'S_EvaluationStatus',
    'S_EditEvaluation',
    'S_DeleteEvaluation',
    'S_ShowSenderNameOfMessage',
    "S_EditAnnualHoliday",
    "S_ShowUnRegisteredChilds",
    "S_WithdrawingStudentFromCurrentSchool",
    "S_StudentCertificateIssue",
    "S_TransferStudentToAnotherSchool",
    "S_EditMangerInformation",
    "SE_ShowUserIcon",
    "S_UpdateStudentIdentity",
    "S_Nurse",
    "SE_UpdateStudent"
  ]
  EmployeeClaims=[
    'SE_NavBarMenu',
    'E_Menu_ManageSchool',
    'E_MenuItem_GeneralInfo',
    'E_MenuItem_Subjects',
    'E_MenuItem_AnnualHolidays',
    'E_MenuItem_EditList',

    'E_Menu_ManageGradesAndDivisions',
    'E_MenuItem_SchoolDivisions',
    'E_MenuItem_SchoolGrades',
    'E_menu_ManageSchoolEmployee',
    'E_MenuItem_SchoolEmployee',

    'E_menu_ManageStudents',
    'E_MenuItem_parents',
    'E_MenuItem_Students',
    'E_MenuItem_Requests',
    'E_ManageStudent',
    'E_ManagePerformance',
    'E_ManageGrade',

    'E_menu_SchoolPerformanceManagent',
    'E_MenuItem_Evaluation',
    'E_MenuItem_Exams',
    'E_TransferStudentGroup',
    "E_EditFlexableHoliday",
   
    'E_Accountant',

    'SE_ProhibitedFromIssueeCertificate',
    'SE_ProhibitedFromWithdrawing',
    "E_UpdateMedicalFile",

    'EG_ContactWithSpea',
    'E_EditFlexableHoliday',
    "SE_ShowUserIcon",
    "SE_UpdateStudent"

  ];
  GardianClaims=[
    'G_NavBarItems',
    'G_MyRequest',
    'G_AboutDalel',
    'G_Profile',
    'EG_ContactWithSpea',
    'G_DeleteChild',

  ]

  userClaims:Partial<{[key in ClaimsEnum]: ClaimsEnum}>={}
  
  getUserClaims(){
    
    // if(Object.keys(this.userClaims).length) return of(this.userClaims)

    return this.http.get(environment.serverUrl+'/current-user/get-claims')
    .pipe(
      map((res: GenericResponse<any>)=> res.result),
      map((res)=> res.map(val => val.code)),
      map((claims:any)=> {
        let claimsMap = ArrayOperations.arrayOfStringsToObject(claims)
        this.userClaims = {...claimsMap}

        // if(this.getCurrentUserScope()==UserScope.SPEA){
        //   this.userClaims = ArrayOperations.arrayOfStringsToObject(this.SpeaClaims)
        // }else if(this.getCurrentUserScope()==UserScope.Employee){
        //   this.userClaims = ArrayOperations.arrayOfStringsToObject(this.EmployeeClaims)
        // }else if (this.getCurrentUserScope()==UserScope.Guardian){
        //   this.userClaims = ArrayOperations.arrayOfStringsToObject(this.GardianClaims)
        // }
       
        return this.userClaims
      }),
      take(1)
    )
  }

 
  

  private token: any = new Token();
  protected prefix: string = '$AJ$';
  cities: string[];
  // schoolId;
  // schoolName;
  usersList: IUser[] = [];
  constructor( private http: HttpClient) {
    this.token.user = this.load('user');
    this.token.userId = this.load('userId');
    this.token.expires = this.load('expires');
    this.token.token = this.load('token');
    this.token.claims = this.load('claims');
    this.token.scope = this.load('scope');
    this.token.schoolId=this.load('schoolId');
    this.token.schoolName=this.load('schoolName');
    this.token.guardian=this.load('currentGuardian');
    this.token.currentUserName=this.load('currentUserName');
    this.currentUserSchoolId$ = new BehaviorSubject(this.getCurrentSchoollId() || null)
    this.currentUserSchoolName$=new BehaviorSubject(this.getCurrentSchoollName() || null)
    this.currentUserName=new BehaviorSubject(this.getCurrentUserName() || null)
    this.currentGuardian=new BehaviorSubject(this.getCurrentGuardian() ||null)
    if(this.isUserLogged()) this.isUserLogged$.next(true);
    
    

  }


  get schoolYearId():string{
    return  JSON.parse(localStorage.getItem(`${this.prefix}yearId`)) ||''
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

  public getUser() {
    
    return this.token.user ;
  }

  /**
   * This method will update the user claims and persist it
   **/
  public setClaims(claims?: any) {
    this.token.claims = JSON.stringify(claims);
    this.save();
  }
  public setSchoolId(schoolId?:any)
  {
    this.token.schoolId = JSON.stringify(schoolId);
    this.save();
  }
  public setSchoolName(schoolName?:any)
  {
    this.token.schoolName = schoolName;
    this.save();
  }
  public setCurrentUserName(currentUserName?:any)
  {
    this.token.currentUserName = currentUserName;
    this.save();
  }

  public getCurrentSchoollId(): any {
    return this.token.schoolId;
  }
  public getCurrentSchoollName(): any {
    return this.token.schoolName;
  }
  public setCurrentGuardian(guardian?:any)
  {
    this.token.guardian = guardian;
    this.save();
  }
  public getCurrentGuardian(): any {
    return this.token.guardian;
  }
public getCurrentUserName() :any {
  
  if(this.token.scope==UserScope.Employee)
  {
    return this.token.currentUserName;
  }
  else 
  {
    return JSON.parse(this.token.user)?.fullName
  }
}

   /**
   * @param  {ClaimsEnum|ClaimsEnum[]} permission
   */
  public isUserAllowedTo(claim :ClaimsEnum | ClaimsEnum[]) {
     if(claim instanceof Array){
       if(claim.some(item=> this.userClaims[item])) return true;
       return false;
     }else{
       if(this.userClaims[claim]) return true;
       return false;
     }
     // let userClaims = this.getCurrentUserClaims() || [];
     // return userClaims.indexOf(claim) >= 0;
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
    this.persist('schoolId', this.token.schoolId, expires);
    this.persist('schoolName', this.token.schoolName, expires);
    this.persist('currentUserName', this.token.currentUserName, expires);
    this.persist('currentGuardian', this.token.guardian, expires);
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
    this.isUserLogged$.next(false);
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
