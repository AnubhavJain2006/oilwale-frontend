import { SessionService } from './../session.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private sessionService: SessionService) {
  }
  canActivate(): boolean {
    if (this.sessionService.isLoggedIn()) {
      return true;
    }
    else {
      this.router.navigateByUrl("/");
      return false;
    }
  }

}
