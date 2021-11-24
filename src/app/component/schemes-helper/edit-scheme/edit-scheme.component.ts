import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SchemeService } from 'src/app/service/scheme.service';

import { Scheme } from 'src/app/interface/scheme';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/interface/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-edit-scheme',
  templateUrl: './edit-scheme.component.html',
  styleUrls: ['./edit-scheme.component.css']
})
export class EditSchemeComponent implements OnInit {
  id: string = '';
  schemeDetails!: Scheme;
  dataLoadingStatus: boolean = true;

  displayName: string = "";

  schemeInfo: FormGroup;
  productList:Product[] = [];
  schemeVehicleType: string[] = [];
  schemeProducts: string[] = [];

  // utility variables
  progressBarWidth: number = 0;
  currentFormSteps: number = 0;
  totalFormSteps: number = 3;

  // utility
  updateLoadingFlag: boolean = false;
  validationFlag: boolean = true;
  productFetchLoading: boolean = false;

  submitLoadingFlag: boolean = false;
  submitSuccessFlag: boolean = false;

  isValidDates: boolean = false;
  checkStartAndEndDate: boolean = false;

  constructor(private activateRoute: ActivatedRoute, private schemeService: SchemeService, private productService: ProductService) { 
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
    this.id = this.activateRoute.snapshot.params.id;
    this.schemeService.getSchemeById(this.id).subscribe(resp => {
      this.schemeDetails = resp;
      this.displayName = this.schemeDetails.schemeName;
      this.dataLoadingStatus = false;

      // slight modifications
      // this.schemeDetails.startedAt = this.schemeDetails.startedAt.substring(0,9);
      // this.schemeDetails.endedAt = this.schemeDetails.endedAt.substring(0,9);

      console.log(this.schemeDetails.startedAt)
      console.log(this.schemeDetails.endedAt)

    }, error => {
      console.log(error);
    })
  }


  updateSchemeInfo() {
    console.log('update');
    
    // this.validateForm();
    // console.log("Do better validation!");
    // this.updateLoadingFlag = true;
    // this.schemeService.updateScheme(this.schemeDetails).subscribe( data => {
    //   this.schemeDetails = data;
    //   this.displayName = this.schemeDetails.schemeName;
    //   this.updateLoadingFlag = false;
    // })
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
    let productsinventoryType:string = '';
    this.productList = [];
    // console.log(this.schemeInfo.value.vehicleType['twoWheeler']);
    if (this.schemeInfo.value.vehicleType['twoWheeler']){
      productsinventoryType = productsinventoryType + '2-wheeler,';
      console.log('2-wheeler');
    } 
    if (this.schemeInfo.value.vehicleType['threeWheeler']){
      productsinventoryType = productsinventoryType + '3-wheeler,';
      console.log('3-wheeler');

    } 
    if (this.schemeInfo.value.vehicleType['fourWheeler']) productsinventoryType += '4-wheeler,';
    if (this.schemeInfo.value.vehicleType['trucks']) productsinventoryType += 'trucks,';

    console.log(productsinventoryType);
    this.productFetchLoading = true;
    this.productService.getSpecificVehicleTypeProduct(productsinventoryType).subscribe(data => {
      this.productFetchLoading = false;
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
