import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHandlerService } from '../http/http-handler.service';
import { BehaviorSubject, catchError, map, take } from 'rxjs';
import { SchoolsService } from 'src/app/modules/schools/services/schools/schools.service';
import { UserService } from '../user/user.service';
import { environment } from 'src/environments/environment';
import { ClaimsService } from '../claims.service';
import { TranslateService } from '@ngx-translate/core';
import { getLocalizedValue } from '../../helpers/helpers';
import { HttpStatusCodeEnum } from 'src/app/shared/enums/http-status-code/http-status-code.enum';
import { RegistrationEnum } from 'src/app/shared/enums/registration/registration-ways.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  MAIN_LINK: string = 'https://jobs-nodejs.herokuapp.com/api/users/signin/';

  public isNewAccountOpened = new BehaviorSubject<boolean>(false);
  public isForgetModelOpened = new BehaviorSubject<boolean>(false);

  signUpWaysList = [
    {
      value: RegistrationEnum.Email,
      name: this.translate.instant('sign up.emailInCaseNotHaveEmiratesID'),
    },
    {
      value: RegistrationEnum.PhoneNumber,
      name: this.translate.instant('sign up.phoneNumberInCaseNotHaveEmiratesID'),
    },
    {
      value: RegistrationEnum.EmiratesId,
      name: this.translate.instant('sign up.digitalIdentity'),
    },
  ];

  constructor(
    private http: HttpHandlerService,
    private userService: UserService,
    private claimsService: ClaimsService,
    private translate: TranslateService,
    private router: Router
  ) {}

  sendOtpToUser(account) {
    return this.http.post('/Account/send-otp', account).pipe(
      map((res) => {
        if (res?.statusCode === HttpStatusCodeEnum.Created)
          throw new Error(getLocalizedValue(res?.errorLocalized));
        else return res;
      }),
      take(1)
    );
  }
  createUAEPassAutomaticAccount(account) {
    return this.http.post(`/Account/UAEPASS/new-registration`, account);
  }
  createUAEPassAccount(account) {
    return this.http.post(`/Account/UAEPASS/registration?IDn=${account}`);
  }
  confirmOtp(account, otp) {
    return this.http.post(`/Account/otp-validation?otp=${otp}`, account);
  }
  savePassword(password) {
    return this.http.post(`/Account/set-password`, password);
  }

  saveAccount(newAccount) {
    return this.http.post(`/Account/guardian-account`, newAccount);
  }

  saveAccountEncrpted(encryptedInfo) {
    return this.http.post(`/Account/guardian-account-encrpted?guardianAccountDto=${encryptedInfo}`);
  }


  getToken() {
    return localStorage.getItem('token');
  }
  logoutUser() {
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }

  // validateUsername(userName: string) {
  //   return this.http.post("/User/Auth/Validate", { userName })
  // }

  // authenticate(token: string, password: string) {
  //   return this.http.post("/User/Auth/Authenticate", { password }, null, { Authorization: `Bearer ${token}` })
  // }

  login(account) {
    return this.http.post('/User/Auth/Login', account).pipe(
      catchError((error) => {
        let message = {
          ar: 'كلمة السر او الايميل غير صحيحة يرجى المحاولة مره اخرى',
          en: 'Invalid username and password combination',
        };
        let err =
          error.Ar || error.En
            ? getLocalizedValue(message)
            : this.translate.instant(
                'login.Something is wrong,Pleaze login again'
              );
        throw new Error(err);
      }),
      take(1)
    );
  }

  setPassword(token: string, password: string, otp: string) {
    return this.http.post(
      '/Account/Auth/SetPassword',
      { password, otp },
      null,
      { Authorization: `Bearer ${token}` }
    );
  }

  getMyProfile() {
    return this.http.get('/Account/Agent/GetMyProfile');
  }

  updateProfile(updatedUser: any) {
    return this.http.put('/Account/Agent/Update', updatedUser);
  }

  forgotPassword(account) {
    return this.http.post('/User/ForgotPassword', account);
  }

  resetPassword(account) {
    return this.http.post('/User/ResetPassword', account);
  }
  signInWithIdentity(lang) {
    return this.http.get(`/Account/UAEPASS?language=${lang}`);
  }
  getUAEUSER(code) {
    return this.http
      .get(`/Account/UAEPASS/GetToken?authenticationCode=${code}`)
      .pipe(
        take(1),
        map((res) => {
          return {
            token: res?.result?.token,
            claims: res?.result?.claims || [],
            scope: res?.result?.scope,
            userId: res?.result?.userId,
            user: { ...res?.result },
            errorLocalized: res?.errorLocalized,
            statusCode: res?.statusCode,
          };
        })
      );
  }

  schoolIDOfCurrentSchoolEmployee() {
    return this.http
      .get('/current-user/school-employee')

      .pipe(
        take(1),
        map((res) => {
          if (res) {
            if (localStorage.getItem('preferredLanguage') == 'ar') {
              this.userService.currentUserName.next(
                res.result?.arabicName + ' ' + res.result?.arabicSurname
              );
              this.userService.setCurrentUserName(
                res.result?.arabicName + ' ' + res.result?.arabicSurname
              );
            } else {
              this.userService.currentUserName.next(
                res.result?.englishName + ' ' + res.result?.englishSurname
              );
              this.userService.setCurrentUserName(
                res.result?.arabicName + ' ' + res.result?.arabicSurname
              );
            }

            return res.result;
          }
        })
      );
  }

  getSchoolNameRelatedToCurrentEmployee() {
    return this.http
      .get('/current-user/school-employee')

      .pipe(
        take(1),
        map((res) => {
          if (res) {
            return res.result.school.name;
          }
        })
      );
  }
  getCurrentGuardian() {
    return this.http
      .get('/Guardian/guardian-by-user-id')

      .pipe(
        take(1),
        map((res) => {
          this.userService.currentGuardian.next(res);
          this.userService.setCurrentGuardian(res);
          return res;
        })
      );
  }
  getMandatorySurveysOfGuardian(guardianId) {
    return this.http.get(`/Survey/gurdian-required-surveys/${guardianId}`).pipe(
      take(1),
      map((res) => res.result)
    );
  }

  getSchoolUrgentMessage(userId) {
    return this.http.get(`/Message/mandatory-messages/${userId}`);
  }
  markSchoolUrgentMessage(messages) {
    return this.http.put(`/Message/update-message`, messages);
  }

  logOut() {
    if (localStorage.getItem('UaeLogged')) {
      localStorage.removeItem('UaeLogged');
      localStorage.removeItem('schoolId');
      window.location.href = `https://stg-id.uaepass.ae/idshub/logout?redirect_uri=${environment.logoutRedirectUrl}`;
    } else {
      this.router.navigate(['/auth/login']);
    }
    this.userService.currentUserSchoolId$.next('');
    localStorage.removeItem('$AJ$currentGuardian');
    localStorage.removeItem('$AJ$yearId');
    this.userService.clear();
    this.claimsService.userClaims = {};
  }
}
