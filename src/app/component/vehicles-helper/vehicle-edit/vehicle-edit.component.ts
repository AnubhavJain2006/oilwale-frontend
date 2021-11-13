import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VehicleService } from 'src/app/service/vehicle.service';

import { VehicleInfo } from 'src/app/interface/vehicle-info';
import { Product } from 'src/app/interface/product';
import { VehicleCompany } from 'src/app/interface/vehicle-company';
import { VehicleCompanyService } from 'src/app/service/vehicle-company.service';
import { ProductService } from 'src/app/service/product.service';
import { Vehicle } from 'src/app/interface/vehicle';

@Component({
  selector: 'app-vehicle-edit',
  templateUrl: './vehicle-edit.component.html',
  styleUrls: ['./vehicle-edit.component.css']
})
export class VehicleEditComponent implements OnInit {
  id!:string;
  vehicleDetails!:VehicleInfo;
  dataLoadingStatus:boolean = true;

  vehicleUpdateObject!:Vehicle;
  displayName:string = "";
  productsList:Product[] = [];
  companyList:VehicleCompany[] = [];

  // flags
  updateVehicleLoading: boolean = false;
  updateVehicleSuccess: boolean = false;

  constructor(private router: ActivatedRoute, private vehicleService:VehicleService, private vehicleCompanyService: VehicleCompanyService, private productService: ProductService) { }

  ngOnInit(): void {
    this.id = this.router.snapshot.params.id;
    this.vehicleService.getVehicleById(this.id).subscribe(data => {
      this.vehicleDetails = data;

      this.vehicleUpdateObject = {
        vehicleId: this.vehicleDetails._id,
        vehicleCompanyId: this.vehicleDetails.vehicleCompanyId,
        vehicleModel: this.vehicleDetails.vehicleModel,
        suggestedProduct: [],
        active: this.vehicleDetails.active,
        createdAt: this.vehicleDetails.createdAt,
        updatedAt: this.vehicleDetails.updatedAt
      }

      for (let i = 0; i < this.vehicleDetails.suggestedProductDetails.length; i++) {
        const element = this.vehicleDetails.suggestedProductDetails[i];
        this.vehicleUpdateObject.suggestedProduct.push(element.productId);
      }      

      this.displayName = this.vehicleDetails.vehicleModel;
      this.getVehicleCompanies();
      this.getProductsList();
      this.dataLoadingStatus = false;
    })
  }

  getVehicleCompanies():void {
    this.vehicleCompanyService.getVehicleCompanies().subscribe(data => {
      this.companyList = data;
    })
  }

  getProductsList():void {
    this.productService.getAllProducts().subscribe(data => {
      this.productsList = data;
    })
  }

  checkIfProductSuggested(product: string): boolean {
    for (let i = 0; i < this.vehicleDetails.suggestedProductDetails.length; i++) {
      const element = this.vehicleDetails.suggestedProductDetails[i].productId;
      if (element == product)
        return true;
    }
    return false;
  }

  
  addSuggesstedProduct(productId: string) {
    let index = this.vehicleUpdateObject.suggestedProduct.indexOf(productId)
   //  console.log(index);

    if(index == -1) {
      this.vehicleUpdateObject.suggestedProduct.push(productId);
    }
    else{
      this.vehicleUpdateObject.suggestedProduct.splice(index, 1);
    }
  }

  onUpdateVehicle() {
    this.updateVehicleLoading = true;
    this.vehicleService.updateVehicle(this.vehicleUpdateObject.vehicleId, this.vehicleUpdateObject).subscribe(data => {
      // alert('done');
      this.updateVehicleLoading=false;
      this.updateVehicleSuccess = true;

      setTimeout(() => {
        this.updateVehicleSuccess = false;
      }, 5000);
    })
  }

}
