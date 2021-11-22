import { Component, OnInit } from '@angular/core';

import { AdminService } from 'src/app/service/admin.service';
import { ActivityService } from 'src/app/service/activity.service';

import { Activity } from 'src/app/interface/activity';
import { Admin } from 'src/app/interface/admin';

@Component({
  selector: 'app-myactivities',
  templateUrl: './myactivities.component.html',
  styleUrls: ['./myactivities.component.css']
})
export class MyactivitiesComponent implements OnInit {
  userDetails!:Admin;
  userActivities!:Activity[];

  // flags
  detailsLoadingFlag: boolean = false;
  activityLoadingFlag: boolean = false;

  constructor(private accountService: AdminService, private activityService: ActivityService) { }

  ngOnInit(): void {
    this.detailsLoadingFlag = true;
    this.accountService.getAdminByEmail().subscribe(data => {
      this.detailsLoadingFlag = false;
      this.activityLoadingFlag = true;
      this.userDetails = data;

      this.activityService.getUserActivities(this.userDetails.adminId).subscribe(data => {
        this.userActivities = data;
        console.log(this.userActivities);
        this.activityLoadingFlag = false;
      })
    })
  }

}
