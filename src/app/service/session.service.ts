import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  authToken: any = null;

  constructor(private router: Router) { }

  isLoggedIn() {
    this.authToken = localStorage.getItem('authToken');
    console.log(this.authToken);
    if (this.authToken == null)
      return false;
    else {
      return true;
    }
  }

  loggedOut() {
    localStorage.removeItem('authToken');
    this.router.navigateByUrl("/");
  }

}
