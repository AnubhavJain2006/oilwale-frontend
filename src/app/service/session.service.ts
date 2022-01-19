import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { AdminService } from './admin.service';
import { Admin } from '../interface/admin';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  authToken: any = null;

  private _userName: string = "";
  private _userPhoneNumber: string = "";
  private _userPriviledge: string = "";
  private _id: string = "";

  currentUserObject!:Admin;

  public get id(): string {
    return this._id;
  }

  public get userName(): string {
    return this._userName;
  }

  public get userPriviledge(): string {
    return this._userPriviledge;
  }

  public get userPhoneNumber(): string {
    return this._userPhoneNumber;
  }

  constructor(private router: Router, private adminService: AdminService) { }

  isLoggedIn() {
    // console.log(this.authToken);
    if (!(localStorage.getItem('authToken') != null && localStorage.getItem('isLoggedIn') != null))
      return false;
    else {
      return true;
    }
  }

  loggedOut() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('isLoggedIn')
    this.router.navigateByUrl("/");
  }

  setCredentials(resp: any) {
    this._userName = resp.userName;
    this._userPriviledge = resp.role;
    this._userPhoneNumber = resp.phoneNumber;
    this._id = resp.id;
  }

  fetchCurrentUserObject(): Observable<Admin> {
    return this.adminService.getAdminByEmail();
  }


}
