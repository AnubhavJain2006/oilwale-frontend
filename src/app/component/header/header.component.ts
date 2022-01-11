import { SessionService, SessionService as SS } from '../../service/session.service';
import { AdminService } from 'src/app/service/admin.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HeaderService } from 'src/app/service/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userName: string = "";
  userPriviledge: string = "";
  userPhoneNumber: string = "";
  userEmail: string = "";

  active: string = this.headerService.activeTab;

  constructor(private sessionService: SessionService, private adminService: AdminService, private router: Router, private headerService: HeaderService) { }


  ngOnInit(): void {
    this.userName = this.sessionService.userName;
    this.userPriviledge = this.sessionService.userPriviledge;
    this.userPhoneNumber = this.sessionService.userPhoneNumber;
    this.userEmail = this.sessionService.id;

    if(this.userName == "" || this.userName == null) {
      this.fetchCredentials();
    }

    this.headerService.setInitialUrl();
    this.active = this.headerService.activeTab;
  }
  
  setActive(activeLink: string) {
    this.active = activeLink;

    if(window.innerWidth < 576){
      document.getElementById('navbar-toggle-btn')?.click();
    }
  }

  logout() {
    console.log("Logged Out")
    this.sessionService.loggedOut()
  }

  fetchCredentials() {
    this.adminService.getAdminByEmail().subscribe(data => {
      // console.log("Side se data le kar aaya");
      this.userName = data.name;
      this.userPriviledge = data.privilege;
      this.userPhoneNumber = data.phoneNumber;
      this.userEmail = data.email;
    })
  }


}

