import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (localStorage.getItem('authToken') != null) {

      // const headers = new HttpHeaders().set('Authorization','Bearer '+LS.getItem('authToken'));
      // console.log(request.url.includes("https://api.postalpincode.in/pincode"))
      if (!request.url.includes("https://api.postalpincode.in/pincode")) {
        request = request.clone({
          setHeaders: {
            Authorization: 'Bearer ' + localStorage.getItem('authToken')
            // Authorization: 'Bearer ' + "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbnViaGF2amFpbkBnbWFpbC5jb20iLCJleHAiOjE2MzUzOTA5NjEsImlhdCI6MTYzNTM1NDk2MX0.y_Hy_tLNN-0vE64MZdu_-M4tM8qYDJThzvNvwstrqlc"
          }
        })
      }
    }
    return next.handle(request);
  }
}
