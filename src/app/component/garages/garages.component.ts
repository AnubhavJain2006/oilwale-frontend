import { Router, RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Garage } from 'src/app/interface/garage';
import { GarageService } from 'src/app/service/garage.service';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-garages',
  templateUrl: './garages.component.html',
  styleUrls: ['./garages.component.css']
})
export class GaragesComponent implements OnInit {
  isValidPincode: boolean = true;
  isSubmitted: boolean = false;
  garage: FormGroup;
  garages: Array<Garage> = [];
  areas: Array<any> = [];
  newAddedGarage: any = "";

  constructor(private garageService: GarageService, private router: Router) {

    if (this.garageService.garageList.length == 0) {
      this.loadAllGarages();
    }
    else {
      this.garages = this.garageService.garageList;
    }

    this.garage = new FormGroup({
      name: new FormControl('', Validators.required),
      garageName: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      alternateNumber: new FormControl('', [Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      gstNumber: new FormControl('', [Validators.minLength(15), Validators.maxLength(15), Validators.pattern("\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}")]),
      address: new FormControl('', Validators.required),
      pincode: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
      area: new FormControl('', Validators.required)
      // image: new FormControl(''),
    })
  }

  ngOnInit(): void {
    this.garageService.refreshNeeded.subscribe(() => {
      this.loadAllGarages();
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

  async getArea(pincode: any) {
    pincode = pincode.toString();
    if (pincode.length == 6) {
      await this.garageService.getAreaByPincode(pincode).then(resp => {
        if (resp[0]["Status"] == "Error") {
          this.isValidPincode = false;
          this.areas = [];
        }
        else {
          this.isValidPincode = true;
          this.areas = resp[0].PostOffice
          this.areas = this.areas.map(item => item.Name)
        }

      }, err => {
        console.log("error in pincode fetch")
      }
      );
    }
  }



  addGarage() {
    this.garageService.addNewGarage(this.garage.value).subscribe(resp => {
      console.log(resp);
      this.newAddedGarage = resp;
      // this.isSubmitted = true;
      this.garage.reset();
    }, err => {
      console.log(err)
    })
  }


  getGarageDetail(garageId: string) {
    console.log(garageId);
  }
}
