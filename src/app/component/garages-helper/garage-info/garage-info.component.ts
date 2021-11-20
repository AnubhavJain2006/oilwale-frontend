import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GarageService } from 'src/app/service/garage.service';

import { Garage } from 'src/app/interface/garage';
import { Customer } from 'src/app/interface/customer';
import { Garagepointsredeem } from 'src/app/interface/utilities/garagepointsredeem';

@Component({
  selector: 'app-garage-info',
  templateUrl: './garage-info.component.html',
  styleUrls: ['./garage-info.component.css']
})
export class GarageInfoComponent implements OnInit {
  id!: string;
  garageDetails!:Garage;
  dataLoadingStatus:boolean = true;

  // utilities
  redeemPointsCount:number = 0;

  // flags
  deleteLoadingFlag: boolean = false;
  accountRestoreLoadingFlag: boolean = false;
  redeemPointsLoadingFlag: boolean = false;
  redeemPointsSuccessFlag: boolean = false;

  // other info
  garageCustomerList:Customer[] = [];
  sameAreaGarages:Garage[] = [];

  constructor(private router: ActivatedRoute, private garageService: GarageService) { }

  ngOnInit(): void {
    this.id = this.router.snapshot.params.id;
    this.garageService.getGarageById(this.id).subscribe(data => {
      this.garageDetails = data;
      this.dataLoadingStatus = false;
      this.getGarageCustomers();
      this.getSameAreaGarage();
    })
  }

  deactivateAccount(id: string) {
    this.deleteLoadingFlag = true;
    this.garageService.deleteGarageById(id).subscribe(data => {
      this.garageDetails = data;
      this.deleteLoadingFlag = false;
      this.getSameAreaGarage();
    })
  }

  restoreGarageAccount() {
    this.accountRestoreLoadingFlag = true;
    this.garageService.restoreGarageAccount(this.garageDetails).subscribe(data => {
      this.garageDetails = data;
      this.accountRestoreLoadingFlag = false;
      this.getSameAreaGarage();
    });
  }

  getGarageCustomers():void {
    this.garageService.getGarageCustomers(this.garageDetails.garageId).subscribe(data => {
      this.garageCustomerList = data;
    })
  }

  getSameAreaGarage(): void {
    this.garageService.getGarageInSameArea(this.garageDetails.pincode.toString()).subscribe(data => {
      this.sameAreaGarages = data;
    })
  }

  redeemGaragePoints(): void {
    this.redeemPointsLoadingFlag = true;
    this.garageService.redeemGaragePoints(this.garageDetails.garageId, this.redeemPointsCount).subscribe(data => {
      this.redeemPointsLoadingFlag = false;
      if (data.message == "Success") {
        this.garageDetails.totalScore = data.remainingPoints;
        this.redeemPointsCount = 0;

        this.redeemPointsSuccessFlag = true;
        setTimeout(() => {
          this.redeemPointsSuccessFlag = false;
        }, 5000);

      }
      else {
        console.log('Error while redeem');
      }
    })
  }

}
