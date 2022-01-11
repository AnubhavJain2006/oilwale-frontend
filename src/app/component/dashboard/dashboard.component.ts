import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/service/dashboard.service';

import { DashboardData } from 'src/app/interface/dashboard/dashboard-data';
import { SessionService } from 'src/app/service/session.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dashBoardStats!:DashboardData;

  // flags 
  statsLoadingFlag: boolean = true;

  constructor(private dbService:DashboardService, private sessionService: SessionService) { }

  ngOnInit(): void {
    this.dbService.getDashboardStats().subscribe((data) => {
      this.statsLoadingFlag = false;
      this.dashBoardStats = data;
    })

  }

  logout() {
    console.log("Logout");
    this.sessionService.loggedOut();
  }

}
