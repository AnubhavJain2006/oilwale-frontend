import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  authToken: any = null;

  constructor(private router: Router) { }

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

}
