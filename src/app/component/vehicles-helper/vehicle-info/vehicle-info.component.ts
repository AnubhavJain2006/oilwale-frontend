import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { VehicleService } from 'src/app/service/vehicle.service';
import { Vehicle } from 'src/app/interface/vehicle';

@Component({
  selector: 'app-vehicle-info',
  templateUrl: './vehicle-info.component.html',
  styleUrls: ['./vehicle-info.component.css']
})
export class VehicleInfoComponent implements OnInit {
  id !: string;
  vehicleDetails!: Vehicle;
  dataLoadingStatus: boolean = true;

  // vehicleDetails : Vehicle = {
  //   vehicleId  : "",
  //   vehicleCompanyId : "",
  //   vehicleModel : "",
  //   suggestedProduct : [],
  //   isActive : false,
  // };
  

  // setting default values
  


  constructor(private activatedRoute: ActivatedRoute, private vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.id;
    this.vehicleService.getVehicleById(this.id).subscribe(vDetails => {
      this.vehicleDetails = vDetails;
      this.dataLoadingStatus = false;
    });
  }

}
