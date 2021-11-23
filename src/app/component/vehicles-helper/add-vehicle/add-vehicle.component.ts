import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { VehicleCompany } from 'src/app/interface/vehicle-company';
import { Product } from 'src/app/interface/product';
import { Vehicle } from 'src/app/interface/vehicle';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css']
})
export class AddVehicleComponent implements OnInit {
  @Input() vehicleCompanies!: VehicleCompany[];
  @Input() suggestedProducts !: Product[];

  @Input() addVehicleSuccess !: boolean;
  @Input() addVehicleLoading !: boolean;
  @Input() addVehicleFailure !: boolean;

  @Input() addVehicleCompanySuccess !: boolean;
  @Input() addVehicleCompanyLoading !: boolean;
  @Input() addVehicleCompanyFailure !: boolean;

  @Output() onAddVehicle: EventEmitter<Vehicle> = new EventEmitter();

  @Output() onAddVehicleComany: EventEmitter<VehicleCompany> = new EventEmitter();

  formInputCompany: string = "";
  formInputModel: string = "";
  formInputType: string = "";
  formInputSuggestedProducts: string[] = [];

  newVehicleCompanyName:string = "";

  constructor() { }

  ngOnInit(): void {
   
   }

   addSuggesstedProduct(productId: string) {
     let index = this.formInputSuggestedProducts.indexOf(productId)
    //  console.log(index);

     if(index == -1) {
       this.formInputSuggestedProducts.push(productId);
     }
     else{
       this.formInputSuggestedProducts.splice(index, 1);
     }
   }

   onSubmit() {
     if (!this.formInputCompany) {
       alert("Choose a company!");
       return;
     }

     if (!this.formInputModel) {
       alert("Give a Model name for the vehicle");
       return;
     }

     const newVehicle = {
      vehicleId: "",
      vehicleCompanyId: this.formInputCompany,
      vehicleModel: this.formInputModel,
      suggestedProduct: this.formInputSuggestedProducts,
      active: true,
      updatedAt: "",
      createdAt: ""
     }
    
     this.onAddVehicle.emit(newVehicle);

    //  reset the form
    this.formInputCompany = "";
    this.formInputModel = "";

   }

   onAddNewCompany() {
      if (this.newVehicleCompanyName.length == 0) {
        alert("Provide a company name first!");
        return;
      }

      const newVehicleComapny:VehicleCompany = {
        vehicleCompany: this.newVehicleCompanyName
      }

      this.onAddVehicleComany.emit(newVehicleComapny);
   }


    
}
