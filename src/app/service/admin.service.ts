import { Admin } from './../interface/admin';
import { Observable, Subject } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import jwt_decode from "jwt-decode";


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  authenticate(loginText: any): Observable<any> {
    return this.httpClient.post(environment.baseUrl + "api/authenticate", loginText);
  }

  loadDeactivAccounts(): Promise<any> {
    return this.httpClient.get(environment.baseUrl + "api/admins/deactive").toPromise();
  }

  _deleteAccount = new Subject<void>();

  activeAccountList: Array<any> = [];

  deactiveAccountList: Array<any> = [];

  get deletedAccount() {
    return this._deleteAccount;
  }

  _refreshNeeded = new Subject<void>();

  get refreshNeeded() {
    return this._refreshNeeded;
  }

  deleteAccount(adminId: string): Observable<any> {
    return this.httpClient.delete(environment.baseUrl + "api/admin/" + adminId).pipe(tap(() => {
      this._deleteAccount.next();
    }));
  }

  loadActiveAccounts(): Promise<any> {
    return this.httpClient.get(environment.baseUrl + "api/admins/active").toPromise();
  }

  addAccount(value: any): Observable<any> {
    return this.httpClient.post(environment.baseUrl + "api/admin", value).pipe(tap(() => {
      this._refreshNeeded.next();

    }));;
  }

  revertAccount(adminId: string): Observable<any> {
    return this.httpClient.put(environment.baseUrl + "api/revertAccount/" + adminId, null).pipe(tap(() => {
      this._deleteAccount.next();
    }))
  }

  getAdminByEmail(): Observable<any> {
    let authToken: string | null = localStorage.getItem('authToken');
    let token = authToken != null ? jwt_decode(authToken) : null;
    console.log(JSON.parse(JSON.stringify(token)).sub)
    return this.httpClient.get(environment.baseUrl + "api/adminByEmail/" + JSON.parse(JSON.stringify(token)).sub)
  }

  forgotPassword(email: string): Observable<any> {
    return this.httpClient.post(environment.baseUrl + "api/authenticate/forgotPassword", email);
  }


  verifyOtp() {

  }
  constructor(private httpClient: HttpClient) { }

  getAdminById(id: string): Observable<Admin> {
    return this.httpClient.get<Admin>(environment.baseUrl + 'api/admin/' + id);
  }


}
