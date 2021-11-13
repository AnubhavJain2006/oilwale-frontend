import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GarageService } from 'src/app/service/garage.service';

import { Garage } from 'src/app/interface/garage';
import { Customer } from 'src/app/interface/customer';

@Component({
  selector: 'app-garage-info',
  templateUrl: './garage-info.component.html',
  styleUrls: ['./garage-info.component.css']
})
export class GarageInfoComponent implements OnInit {
  id!: string;
  garageDetails!:Garage;
  dataLoadingStatus:boolean = true;

  // flags
  deleteLoadingFlag: boolean = false;
  accountRestoreLoadingFlag: boolean = false;

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

}
