import { Admin } from './../interface/admin';
import { Observable, Subject } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  loadDeactivAccounts(): Promise<any> {

    return this.httpClient.get(environment.baseUrl + "api/allDeactiveAdmins").toPromise();
  }
  _deleteAccount = new Subject<void>();

  get deletedAccount() {
    return this._deleteAccount;
  }

  _refreshNeeded = new Subject<void>();

  get refreshNeeded() {
    return this._refreshNeeded;
  }

  deleteAccount(adminId: string): Observable<any> {
    return this.httpClient.delete(environment.baseUrl + "api/deleteAdmin/" + adminId).pipe(tap(() => {
      this._deleteAccount.next();
    }));
  }
  loadActiveAccounts(): Promise<any> {
    return this.httpClient.get(environment.baseUrl + "api/allActiveAdmins").toPromise();
  }


  addAccount(value: any): Observable<any> {
    return this.httpClient.post(environment.baseUrl + "api/addAdmin", value).pipe(tap(() => {
      this._refreshNeeded.next();

    }));;
  }

  revertAccount(adminId: string): Observable<any> {
    return this.httpClient.put(environment.baseUrl + "api/revertAccount/" + adminId, null).pipe(tap(() => {
      this._deleteAccount.next();
    }))
  }

  constructor(private httpClient: HttpClient) { }
}
