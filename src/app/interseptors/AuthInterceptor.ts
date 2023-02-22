import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private route:Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    // if(request.url.startsWith('https://valsquad.blob.core.windows.net/daleel')) {
    //   let authReq = request;
    //   let h =   new HttpHeaders();
    //   h= h.append('Content-Type', 'text/plain')
    //   h= h.append('Accept', 'text/plain')
    //   authReq= request.clone({ headers: h });//.set('Cache-Control', 'no-cache')});
    //   return next.handle(authReq)
    // }
    let authReq = request;
    const token = localStorage.getItem("$AJ$token");


    if (token != null && token != undefined && token != '') {
      authReq = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });//.set('Cache-Control', 'no-cache')});
    }
    return next.handle(authReq).pipe(catchError(err => {
      if ((err && err.status === 401)||err.status===0) {
        localStorage.clear();
        err.error = { Message: "", status: 0 };
        err.error.status = 401;
         this.route.navigate['/auth/login']
        // location.reload();
      }
      const error = err.error.message || err.statusText;
      return throwError(err);
    }));
  }
}