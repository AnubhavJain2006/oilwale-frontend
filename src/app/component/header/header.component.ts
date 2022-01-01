import { SessionService, SessionService as SS } from '../../service/session.service';
import { AdminService } from 'src/app/service/admin.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userName: string = "";
  userPriviledge: string = "";

  constructor(private sessionService: SessionService, private adminService: AdminService, private router: Router) { }

  active: string = "dashboard";


  ngOnInit(): void {
    this.userName = this.sessionService.userName;
    this.userPriviledge = this.sessionService.userPriviledge;

    if(this.userName == "" || this.userName == null) {
      this.fetchCredentials();
    }

    this.setInitialUrl();
  }
  
  setActive(activeLink: string) {
    this.active = activeLink;
  }

  logout() {
    console.log("Logged Out")
    this.sessionService.loggedOut()
  }

  fetchCredentials() {
    this.adminService.getAdminByEmail().subscribe(data => {
      console.log("Side se data le kar aaya");
      this.userName = data.name;
      this.userPriviledge = data.privilege;
    })
  }

  setInitialUrl() {
    const tempUrl = this.router.url;

    console.log("ye hum url laaye h")
    console.log(tempUrl)

    if( tempUrl == "/dashboard") this.setActive("dashboard")
    else if ( tempUrl == "/garages") this.setActive("garages")
    else if ( tempUrl == "/customers") this.setActive("customers")
    else if ( tempUrl == "/vehicles") this.setActive("vehicles")
    else if ( tempUrl == "/products") this.setActive("products")
    else if ( tempUrl == "/schemes") this.setActive("schemes")
    else if ( tempUrl == "/orders") this.setActive("orders")
    else if ( tempUrl == "/accounts") this.setActive("accounts")
    else if( tempUrl == "/myactivities") this.setActive("myactivities")
    else if( tempUrl == "/myaccount") this.setActive("myaccount")
    else this.setActive("dashboard")



  }

}

