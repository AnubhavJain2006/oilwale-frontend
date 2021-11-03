import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

import { VehicleCompany } from 'src/app/interface/vehicle-company';
import { Product } from 'src/app/interface/product';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css']
})
export class AddVehicleComponent implements OnInit {
  @Input() vehicleCompanies!: VehicleCompany[];
  @Input() suggestedProducts !: Product[];

  addVehicleForm: FormGroup = new FormGroup({});


  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.addVehicleForm = this.formBuilder.group({
      vehicleCompany: '',
      vehicleModel: '',
      suggestedProducts: this.formBuilder.array([]),
    })
   }
    

  get suggestedProductForms() {
    return this.addVehicleForm.get('suggestedProducts') as FormArray;
  }

  addSuggestedProduct(productId:string) {
    let sparray =  this.suggestedProductForms.value;
    console.log(sparray);
  }

  //  addSuggestedProduct(product: string) {
  //    let index:number = this.selectedProducts.indexOf(product);

  //    if (index == -1) {
  //      this.selectedProducts.push(product);
  //    }
  //    else {
  //      this.selectedProducts.splice(index, 1);
  //    }
  //  }

}
