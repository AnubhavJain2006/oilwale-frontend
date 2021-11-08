import { Component, OnInit } from '@angular/core';

import { VehicleService } from 'src/app/service/vehicle.service';
import { VehicleCompanyService } from 'src/app/service/vehicle-company.service';
import { ProductService } from 'src/app/service/product.service';

import { Vehicle } from 'src/app/interface/vehicle';
import { VehicleInfo } from 'src/app/interface/vehicle-info';
import { Product } from 'src/app/interface/product';
import { VehicleCompany } from '../../interface/vehicle-company';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {
  allVehicles: VehicleInfo[] = [];
  allVehicleCompanies: VehicleCompany[] = [];    // for showing companies in add form
  allProducts: Product[] = [];    // for show product list in add form

  // helper variables
  addVehicleLoading: boolean = false;
  addVehicleSuccess: boolean = false;
  addVehicleFaliure: boolean = false;

  allVehicleRefreshFlag: boolean = false;

  constructor(private productService: ProductService, private vehicleCompanyService: VehicleCompanyService, private vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.vehicleService.getVehicles().subscribe(vehicles => this.allVehicles = vehicles);
    this.vehicleCompanyService.getVehicleCompanies().subscribe(vehicleCompanies => this.allVehicleCompanies = vehicleCompanies)
    this.productService.getAllProducts().subscribe(products => this.allProducts = products)
   }

  addVehicle(vehicle: Vehicle) {
    this.addVehicleLoading = true;
    this.vehicleService.addVehicle(vehicle).subscribe(
      // success
      (addedVehicle) => {
      console.log(addedVehicle);
      console.log("success");
      this.addVehicleSuccess = true;
      this.addVehicleLoading = false;

      this.allVehicleRefreshFlag = true;

      setTimeout(() => {
        this.addVehicleSuccess = false;
      }, 5000);
    }, 
    // error
      (error) => {
        this.addVehicleFaliure = true;
        setTimeout(() => {
          this.addVehicleFaliure = false;
        }, 5000);
      }
    )
  }   

}
