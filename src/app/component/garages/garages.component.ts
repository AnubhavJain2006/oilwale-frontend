import { Router, RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Garage } from 'src/app/interface/garage';
import { GarageService } from 'src/app/service/garage.service';
import { Subscription, timer } from 'rxjs';
import { JsonPipe } from '@angular/common';
import { Activity } from 'src/app/interface/activity';
import { ActivityService } from 'src/app/service/activity.service';

@Component({
  selector: 'app-garages',
  templateUrl: './garages.component.html',
  styleUrls: ['./garages.component.css']
})
export class GaragesComponent implements OnInit {
  garages: Array<Garage> = [];
  deactivatedGarages: Array<Garage> = [];
  garageActivities: Activity[] = [];
  
  // flags
  activeGaragesLoading: boolean = true;
  deactiveGaragesLoading: boolean = true;
  activitiesLoading: boolean = false;

  constructor(private garageService: GarageService, private activityService: ActivityService, private router: Router) {
    
    if (this.garageService.garageList.length == 0) {
      this.loadAllGarages();
    }
    else {
      this.garages = this.garageService.garageList;
      this.activeGaragesLoading = false;
    }
    
    if (this.garageService.deactivatedGarageList.length == 0) {
      this.loadDeactivatedGarages();
    }
    else {
      this.deactivatedGarages = this.garageService.deactivatedGarageList;
      this.deactiveGaragesLoading = false;
    }

  }

  ngOnInit(): void {
    this.garageService.refreshNeeded.subscribe(() => {
      this.loadAllGarages();
      this.loadDeactivatedGarages();
    });

  }

  async loadAllGarages() {
    await this.garageService.getAllGarages().then(resp => {
      this.garages = resp;
      // console.log(this.garages)

      this.activeGaragesLoading = false;
    }, err => {
      console.log(err);
    }
    );
    this.garageService.garageList = this.garages;
  }

  async loadDeactivatedGarages() {
    await this.garageService.getDeactivatedGarages().then(resp => {
      this.deactivatedGarages = resp;
      // console.log(this.garages)
      
      this.deactiveGaragesLoading = false;
    }, err => {
      console.log(err);
    }
    );
    this.garageService.deactivatedGarageList = this.deactivatedGarages;
  }

  fetchGrageActivities() {
    this.activitiesLoading = true;
    this.activityService.getDomainActivities('garages').subscribe(data => {
      this.activitiesLoading = false;
      this.garageActivities = data;
      // console.log(data);
    })
  }

  getGarageDetail(garageId: string) {
    // console.log(garageId);
  }
}
