import { Component, OnInit } from '@angular/core';
import { ActivityService } from 'src/app/service/activity.service';

import { Activity } from 'src/app/interface/activity';

@Component({
  selector: 'app-vehicle-activities',
  templateUrl: './vehicle-activities.component.html',
  styleUrls: ['./vehicle-activities.component.css']
})
export class VehicleActivitiesComponent implements OnInit {

  allActivities:Activity[] = [];

  constructor(private activityService: ActivityService) { }

  ngOnInit(): void {
    this.fetchAllActivities();
  }

  fetchAllActivities() {
    this.activityService.getDomainActivities('vehicles').subscribe((data) => {
      this.allActivities = data;
      console.log(this.allActivities);

    })
  }

}
