import { Router, RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Garage } from 'src/app/interface/garage';
import { GarageService } from 'src/app/service/garage.service';
import { Subscription, timer } from 'rxjs';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-garages',
  templateUrl: './garages.component.html',
  styleUrls: ['./garages.component.css']
})
export class GaragesComponent implements OnInit {
  garages: Array<Garage> = [];
  deactivatedGarages: Array<Garage> = [];
  
  // flags
  

  constructor(private garageService: GarageService, private router: Router) {
    
    if (this.garageService.garageList.length == 0) {
      this.loadAllGarages();
    }
    else {
      this.garages = this.garageService.garageList;
    }
    
    if (this.garageService.deactivatedGarageList.length == 0) {
      this.loadDeactivatedGarages();
    }
    else {
      this.deactivatedGarages = this.garageService.deactivatedGarageList;
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
      console.log(this.garages)
    }, err => {
      console.log(err);
    }
    );
    this.garageService.garageList = this.garages;
  }

  async loadDeactivatedGarages() {
    await this.garageService.getDeactivatedGarages().then(resp => {
      this.garages = resp;
      console.log(this.garages)
    }, err => {
      console.log(err);
    }
    );
    this.garageService.deactivatedGarageList = this.deactivatedGarages;
  }


  getGarageDetail(garageId: string) {
    console.log(garageId);
  }
}
