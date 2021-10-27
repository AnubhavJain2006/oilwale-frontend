import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  static authToken: any = null;

  constructor() { }

  static isLoggedIn() {
    this.authToken = localStorage.getItem('authToken');
    console.log(this.authToken);
    if (this.authToken == null)
      return false;
    else {
      return true;
    }
  }

  static loggedOut() {
    localStorage.removeItem('authToken');
  }

}
