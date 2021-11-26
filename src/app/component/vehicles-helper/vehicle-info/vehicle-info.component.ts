import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { VehicleService } from 'src/app/service/vehicle.service';
import { VehicleInfo } from 'src/app/interface/vehicle-info';
import { Vehicle } from 'src/app/interface/vehicle';

@Component({
  selector: 'app-vehicle-info',
  templateUrl: './vehicle-info.component.html',
  styleUrls: ['./vehicle-info.component.css']
})
export class VehicleInfoComponent implements OnInit {
  id !: string;
  vehicleDetails!: VehicleInfo;
  dataLoadingStatus: boolean = true;
  
  sameCompanyVehicles: Vehicle[] = [];

  deleteLoadingFlag: boolean = false;
  deleteSuccessFlag: boolean = false;
  restoreLoadingFlag: boolean = false;
  restoreSuccessFlag: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.id;
    this.vehicleService.getVehicleById(this.id).subscribe(vDetails => {
      this.vehicleDetails = vDetails;
      this.dataLoadingStatus = false;

      this.fetchVehicleOfSameCompany();
    });
  }

  onDeleteVehicle(id: string) {
    this.deleteLoadingFlag = true;
    this.vehicleService.deleteVehicleById(id).subscribe(data => {
      console.log(data);
      this.vehicleDetails.active = false;

      this.deleteLoadingFlag = false;
    })
  }

  onRestoreVehicle() {
    const restoreVehicleObj: Vehicle = {
      active: !this.vehicleDetails.active,
      vehicleId: this.vehicleDetails._id,
      vehicleCompanyId: this.vehicleDetails.vehicleCompanyId,
      vehicleModel: this.vehicleDetails.vehicleModel,
      suggestedProduct: this.vehicleDetails.suggestedProduct.map((v) => {
        return v.productId
      }),
      createdAt: this.vehicleDetails.createdAt,
      updatedAt: this.vehicleDetails.updatedAt
    }

    this.restoreLoadingFlag = true;
    this.vehicleService.updateVehicle(restoreVehicleObj).subscribe(data => {
      console.log(data);
      this.vehicleDetails.active = true;
      this.restoreLoadingFlag = false;
    })
  }

  fetchVehicleOfSameCompany() {
    this.vehicleService.getVehiclesOfSameCompany(this.vehicleDetails.vehicleCompanyId).subscribe((data) => {
      this.sameCompanyVehicles = data;
    })
  }

}
