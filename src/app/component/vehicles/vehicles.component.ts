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

  addVehicleCompanySuccess: boolean = false;
  addVehicleCompanyLoading: boolean = false;
  addVehicleCompanyFailure: boolean = false;

  allVehicleRefreshFlag: boolean = false;

  constructor(private productService: ProductService, private vehicleCompanyService: VehicleCompanyService, private vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.fetchVehicles();
    this.fetchVehicleComapnies();
    this.fetchProducts(); 
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

  fetchVehicles():void {
    this.vehicleService.getVehicles().subscribe(vehicles => this.allVehicles = vehicles);
  }

  fetchVehicleComapnies():void {
    this.vehicleCompanyService.getVehicleCompanies().subscribe(vehicleCompanies => this.allVehicleCompanies = vehicleCompanies)
  }

  fetchProducts():void {
    this.productService.getAllProducts().subscribe(products => this.allProducts = products)
  }

  addVehicleCompany(newVehicleComapny: VehicleCompany):void {
    this.addVehicleCompanyLoading = true;
    this.vehicleCompanyService.addVehicleCompany(newVehicleComapny).subscribe(data => {
      this.addVehicleCompanyLoading = false;
      this.addVehicleCompanySuccess = true;
      this.fetchVehicleComapnies();

      setTimeout(() => {
        this.addVehicleCompanySuccess = false;
      }, 5000);
    })

  }

}
