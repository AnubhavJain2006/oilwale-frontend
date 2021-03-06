import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SchemeService } from 'src/app/service/scheme.service';

import { Scheme } from 'src/app/interface/scheme';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/interface/product';
import { ProductService } from 'src/app/service/product.service';
import { DatePipe } from '@angular/common';
import { SchemeInfo } from 'src/app/interface/scheme-info';

@Component({
  selector: 'app-edit-scheme',
  templateUrl: './edit-scheme.component.html',
  styleUrls: ['./edit-scheme.component.css']
})
export class EditSchemeComponent implements OnInit {
  id: string = '';
  schemeDetails!: SchemeInfo;
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
  updateSuccessMsgFlag: boolean = false;

  isValidDates: boolean = true;
  checkStartAndEndDate: boolean = false;


  constructor(private activateRoute: ActivatedRoute, private schemeService: SchemeService, private productService: ProductService, private datePipe: DatePipe) { 
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
      this.displayName = this.schemeDetails.scheme.schemeName;
      this.dataLoadingStatus = false;

      // slight modifications
      // this.schemeDetails.startedAt = this.schemeDetails.startedAt.substring(0,9);
      // this.schemeDetails.endedAt = this.schemeDetails.endedAt.substring(0,9);

      // console.log(this.schemeDetails.startedAt)
      // console.log(this.schemeDetails.endedAt)


      // dumb code :(
      let tempVehicleType = {
        twoWheeler: false,  
        threeWheeler: false,  
        fourWheeler: false,  
        trucks: false
      }

      if(this.schemeDetails.scheme.vehicleType != null) {

        this.schemeDetails.scheme.vehicleType.forEach(e => {
          if(e == '2-wheelers') tempVehicleType.twoWheeler = true;
          if(e == '3-wheelers') tempVehicleType.threeWheeler = true;
          if(e == '4-wheelers') tempVehicleType.fourWheeler = true;
          if(e == 'trucks') tempVehicleType.trucks = true;
        })
      }
      // dumb code ends :)

      this.schemeInfo.setValue({
        schemeName: this.schemeDetails.scheme.schemeName,
        description: this.schemeDetails.scheme.description,
        startedAt: this.datePipe.transform(this.schemeDetails.scheme.startedAt, 'yyyy-MM-dd'),
        endedAt: this.datePipe.transform(this.schemeDetails.scheme.endedAt, 'yyyy-MM-dd'),
        targetGroup: this.schemeDetails.scheme.targetGroup,
        vehicleType: {
          twoWheeler: tempVehicleType.twoWheeler,  
          threeWheeler: tempVehicleType.threeWheeler,  
          fourWheeler: tempVehicleType.fourWheeler,  
          trucks: tempVehicleType.trucks
        } 
      })
      console.log(this.schemeInfo.value.startedAt);


    }, error => {
      console.log(error);
    })
  }


  updateSchemeInfo() {
    console.log('update');
    console.log(this.schemeInfo.value)
    console.log(this.schemeProducts)
    
    let vehicleTypeArray: string[] = [];

    if(this.schemeInfo.value.vehicleType.twoWheeler) vehicleTypeArray.push("2-wheelers")
    if(this.schemeInfo.value.vehicleType.threeWheeler) vehicleTypeArray.push("3-wheelers")
    if(this.schemeInfo.value.vehicleType.fourWheeler) vehicleTypeArray.push("4-wheelers")
    if(this.schemeInfo.value.vehicleType.trucks) vehicleTypeArray.push("trucks")

    const schemeSubmitObj:Scheme = {
      schemeId: this.schemeDetails.scheme.schemeId,
      schemeName: this.schemeInfo.value.schemeName,
      description: this.schemeInfo.value.description,
      status: true,
      startedAt: this.schemeInfo.value.startedAt,
      endedAt: this.schemeInfo.value.endedAt,
      targetGroup: this.schemeInfo.value.targetGroup,
      productList: this.schemeProducts,
      vehicleType: vehicleTypeArray,
      createdAt: this.schemeDetails.scheme.createdAt,
      updatedAt: new Date(),
    }

    this.submitLoadingFlag = true;
    this.schemeService.updateScheme(schemeSubmitObj).subscribe(data => {
      //console.log(resp);
      this.submitLoadingFlag = false;
      this.submitSuccessFlag = true;
      this.updateSuccessMsgFlag = true;

      setTimeout(() => {
        this.goToFormPage(0);
      }, 1000);

      setTimeout(() => {
        this.submitSuccessFlag = false;
      }, 5000);

      // this.schemeInfo.setValue({startedAt: "", endedAt: ""})
      // this.schemeInfo.reset();
    }, err => {
      //console.log("Error in scheme add" + err)
    })

  }

  validateDate() {

    // if (this.schemeInfo.value.startedAt == '' || this.schemeInfo.value.endedAt == '')
    // if (isDa)

    
    
    if (this.schemeInfo.value.startedAt != '' && this.schemeInfo.value.endedAt != '') {
      console.log('validate date');
      let sd: Date = this.schemeInfo.value.startedAt;
      let ed: Date = this.schemeInfo.value.endedAt;
      if (sd <= ed) {
        this.checkStartAndEndDate = false;
        this.isValidDates = true;
      }
      else {
        this.checkStartAndEndDate = true;
        this.isValidDates = false;
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
