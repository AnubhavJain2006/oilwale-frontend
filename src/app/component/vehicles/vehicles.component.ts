import { Component, OnInit } from '@angular/core';

import { VehicleService } from 'src/app/service/vehicle.service';
import { VehicleCompanyService } from 'src/app/service/vehicle-company.service';

import { Vehicle } from 'src/app/interface/vehicle';
import { Product } from 'src/app/interface/product';
import { VehicleCompany } from '../../interface/vehicle-company';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {
  vehicles: Vehicle[] = [];
  vehicleCompanies: VehicleCompany[] = [];
  allSuggestionProducts: Product[] = [];

  // helper variables
  addVehicleSuccess: boolean = false;
  addVehicleLoading: boolean = false;

  constructor(private productService: ProductService, private vehicleCompanyService: VehicleCompanyService, private vehicleService: VehicleService) { }

  ngOnInit(): void {
    // this.vehicleService.getVehicles().subscribe(vehicles => this.vehicles = vehicles);
    this.vehicleCompanyService.getVehicleCompanies().subscribe(vehicleCompanies => this.vehicleCompanies = vehicleCompanies)
    this.productService.getAllProducts().subscribe(products => this.allSuggestionProducts = products)
   }

  addVehicle(vehicle: Vehicle) {
    this.addVehicleLoading = true;
    this.vehicleService.addVehicle(vehicle).subscribe((addedVehicle) => {
      console.log(addedVehicle);
      console.log("success");
      this.addVehicleSuccess = true;
      this.addVehicleLoading = false;
      setTimeout(() => {
        this.addVehicleSuccess = false;
      }, 5000);
    })
  }   

}
