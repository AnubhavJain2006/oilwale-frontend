import { Component, OnInit } from '@angular/core';

import { VehicleService } from 'src/app/service/vehicle.service';
import { VehicleCompanyService } from 'src/app/service/vehicle-company.service';

import { Vehicle } from 'src/app/interface/vehicle';
import { VehicleCompany } from '../../interface/vehicle-company';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {
  vehicles: Vehicle[] = [];
  vehicleCompanies: VehicleCompany[] = [];

  constructor(private vehicleService: VehicleService, private vehicleCompanyService: VehicleCompanyService) { }

  ngOnInit(): void {
    // this.vehicleService.getVehicles().subscribe(vehicles => this.vehicles = vehicles);
    // this.vehicleCompanyService.getVehicleCompanies().subscribe(vehicleCompanies => this.vehicleCompanies = vehicleCompanies)
   }
}
