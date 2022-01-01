import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { AdminService } from './admin.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  authToken: any = null;

  private _userName: string = "";
  private _userPhoneNumber: string = "";
  private _userPriviledge: string = "";

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

    console.log("credentials le kar aaya");
    console.log( this._userName);
  }

    
    // console.log("service details:")
    // console.log(this._userName);
    // console.log(this._userPriviledge);
  

}
