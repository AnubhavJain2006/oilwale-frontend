import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { SchemeService } from 'src/app/service/scheme.service';
import { ProductService } from 'src/app/service/product.service';

import { Scheme } from 'src/app/interface/scheme';
import { Product } from 'src/app/interface/product';

@Component({
  selector: 'app-add-scheme',
  templateUrl: './add-scheme.component.html',
  styleUrls: ['./add-scheme.component.css']
})
export class AddSchemeComponent implements OnInit {

  productList:Product[] = [];
  addedSchemeObject!:Scheme;

  schemeInfo: FormGroup;

  schemeVehicleType: string[] = [];
  schemeProducts: string[] = [];

  isValidDates: boolean = false;
  checkStartAndEndDate: boolean = false;

  // utility variables
  progressBarWidth: number = 0;
  currentFormSteps: number = 0;
  totalFormSteps: number = 3;

  submitLoadingFlag: boolean = false;
  submitSuccessFlag: boolean = false;

  constructor(private schemeService: SchemeService, private productService: ProductService) {

    this.schemeInfo = new FormGroup({
      schemeName: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      startedAt: new FormControl('', Validators.required),
      endedAt: new FormControl('', Validators.required),
      targetGroup: new FormControl('' , Validators.required),
      vehicleType: new FormGroup({
        twoWheeler: new FormControl(false),
        threeWheeler: new FormControl(false),
        fourWheeler: new FormControl(false),
        trucks: new FormControl(false),
      })
    })
  }

  ngOnInit(): void {
    this.fetchProducts();
    console.log(this.schemeInfo.get('startedAt'));
  }

  addScheme() {
    console.log(this.schemeInfo.value); 
    console.log(this.schemeProducts);

    const schemeSubmitObj:Scheme = {
      schemeName: this.schemeInfo.value.schemeName,
      description: this.schemeInfo.value.description,
      status: true,
      startedAt: this.schemeInfo.value.startedAt,
      endedAt: this.schemeInfo.value.endedAt,
      targetGroup: this.schemeInfo.value.targetGroup,
      productList: this.schemeProducts
    }

    this.submitLoadingFlag = true;
    this.schemeService.addNewScheme(schemeSubmitObj).subscribe(data => {
      //console.log(resp);
      this.addedSchemeObject = data;
      this.submitLoadingFlag = false;
      this.submitSuccessFlag = true;
      

      setTimeout(() => {
        this.goToFormPage(0);
      }, 1000);

      setTimeout(() => {
        this.submitSuccessFlag = false;
      }, 5000);

      // this.schemeInfo.setValue({startedAt: "", endedAt: ""})
      this.schemeInfo.reset();
    }, err => {
      //console.log("Error in scheme add" + err)
    })

  }

  validateDate() {

    // if (this.schemeInfo.value.startedAt == '' || this.schemeInfo.value.endedAt == '')
    // if (isDa)

    if (this.schemeInfo.value.startedAt != '' && this.schemeInfo.value.endedAt != '') {
      let sd: Date = this.schemeInfo.value.startedAt;
      let ed: Date = this.schemeInfo.value.endedAt;
      if (sd <= ed) {
        this.checkStartAndEndDate = false;
        this.isValidDates = true;
      }
      else {
        this.checkStartAndEndDate = true;
      }
    }
  }

  fetchProducts():void {
    this.productService.getAllProducts().subscribe(data => {
      this.productList = data;
    })
  }

  addSchemeProduct(productId: string) {
    let index = this.schemeProducts.indexOf(productId)
   //  console.log(index);

    if (index == -1)  this.schemeProducts.push(productId);
    else this.schemeProducts.splice(index, 1);
    
  }

  progressBarOneStepForward() {
    if (this.currentFormSteps == this.totalFormSteps) return;
    this.currentFormSteps++;
    this.progressBarWidth = (this.currentFormSteps/this.totalFormSteps)*100;
  }

  progressBarOneStepBack() {
    if (this.currentFormSteps == 0) return;
    this.currentFormSteps--;
    this.progressBarWidth = (this.currentFormSteps/this.totalFormSteps)*100;
  }

  // used to show or hide the form content
  showFormPart(step:number): boolean {
    if (this.currentFormSteps == step) return true;
    else return false;
  }

  goToFormPage(page:number) {
    this.currentFormSteps = page;
    this.progressBarWidth = (this.currentFormSteps/this.totalFormSteps)*100;
    this.showFormPart(page);
  }

}
