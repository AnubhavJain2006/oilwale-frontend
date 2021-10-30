import { SessionService, SessionService as SS } from '../../service/session.service'
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private sessionService: SessionService) { }

  ngOnInit(): void {
  }

  active: string = "dashboard";
  setActive(activeLink: string) {
    this.active = activeLink;
  }

  logout() {
    console.log("Logged Out")
    this.sessionService.loggedOut()
  }
}
