import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VehicleService } from 'src/app/service/vehicle.service';

import { VehicleInfo } from 'src/app/interface/vehicle-info';

@Component({
  selector: 'app-vehicle-edit',
  templateUrl: './vehicle-edit.component.html',
  styleUrls: ['./vehicle-edit.component.css']
})
export class VehicleEditComponent implements OnInit {
  id!:string;
  vehicleDetails!:VehicleInfo;
  dataLoadingStatus:boolean = true;

  constructor(private router: ActivatedRoute, private vehicleService:VehicleService) { }

  ngOnInit(): void {
    this.id = this.router.snapshot.params.id;
    this.vehicleService.getVehicleById(this.id).subscribe(data => {
      this.vehicleDetails = data;
      this.dataLoadingStatus = false;
    })
  }

}
