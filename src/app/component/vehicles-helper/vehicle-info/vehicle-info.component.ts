import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { VehicleService } from 'src/app/service/vehicle.service';
import { VehicleInfo } from 'src/app/interface/vehicle-info';

@Component({
  selector: 'app-vehicle-info',
  templateUrl: './vehicle-info.component.html',
  styleUrls: ['./vehicle-info.component.css']
})
export class VehicleInfoComponent implements OnInit {
  id !: string;
  vehicleDetails!: VehicleInfo;
  dataLoadingStatus: boolean = true;
  

  constructor(private activatedRoute: ActivatedRoute, private vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.id;
    this.vehicleService.getVehicleById(this.id).subscribe(vDetails => {
      this.vehicleDetails = vDetails;
      this.dataLoadingStatus = false;
    });
  }

}
