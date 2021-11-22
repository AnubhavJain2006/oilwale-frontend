import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GarageService } from 'src/app/service/garage.service';

import { Garage } from 'src/app/interface/garage';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-garage',
  templateUrl: './edit-garage.component.html',
  styleUrls: ['./edit-garage.component.css']
})
export class EditGarageComponent implements OnInit {
  id!: string;
  garageDetails!:Garage;
  dataLoadingStatus:boolean = true;

  areaByPincodeList: any[] = [];

  garageEditForm: FormGroup;

  // utitilities
  displayName:string = ""
  
  
  // flags
  isValidPincode: boolean = true;
  isValidForm: boolean = false;
  pincodeAreaFetchLoading: boolean = false;
  updateSubitLoadingFlag: boolean = false;
  updateSubmitSuccessFlag: boolean = false;

  constructor(private router: ActivatedRoute, private garageService: GarageService) { 
    this.garageEditForm = new FormGroup({
      name: new FormControl('', Validators.required),
      garageName: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      alternateNumber: new FormControl("", [Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      gstNumber: new FormControl('', [Validators.minLength(15), Validators.maxLength(15), Validators.pattern("[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[A-Z]{1}[0-9]{1}")]),
      address: new FormControl('', Validators.required),
      pincode: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
      area: new FormControl('', Validators.required),
      panCard: new FormControl('', [Validators.pattern("[A-Z]{5}[0-9]{4}[A-Z]{1}")]),
      active: new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {
    this.id = this.router.snapshot.params.id;
    this.garageService.getGarageById(this.id).subscribe(data => {
      this.garageDetails = data;
      this.dataLoadingStatus = false;
      this.displayName = this.garageDetails.garageName;
      this.getAreaListFromPincode(this.garageDetails.pincode.toString())    
      this.validateForm();

      this.garageEditForm.setValue({
        name: this.garageDetails.name,
        garageName: this.garageDetails.garageName,
        phoneNumber: this.garageDetails.phoneNumber,
        alternateNumber: this.garageDetails.alternateNumber,
        gstNumber: this.garageDetails.gstNumber,
        address: this.garageDetails.address,
        pincode: this.garageDetails.pincode,
        area: this.garageDetails.area,
        panCard: this.garageDetails.panCard,
        active: this.garageDetails.active
      })

    })
  }

  getAreaListFromPincode(pincode: string) {
    if( pincode.length == 6) {
      this.pincodeAreaFetchLoading = true;
      this.garageService.getAreaByPincode(pincode).then(data => {
        if (data[0]["Status"] == "Error") {
          this.isValidPincode = false;
          this.areaByPincodeList = [];
        }
        else {
          this.isValidPincode = true;
          this.areaByPincodeList = data[0].PostOffice
          this.areaByPincodeList = this.areaByPincodeList.map(item => item.Name)
        }
      this.pincodeAreaFetchLoading = false;

      })
    }
  }

  updateGarageDetails() {
    const updateGarageObj:Garage = {
      garageId: this.garageDetails.garageId,
      name: this.garageEditForm.value.name,
      garageName: this.garageEditForm.value.garageName,
      phoneNumber: this.garageEditForm.value.phoneNumber,
      alternateNumber: this.garageEditForm.value.alternateNumber,
      gstNumber: this.garageEditForm.value.gstNumber,
      address: this.garageEditForm.value.address,
      pincode: this.garageEditForm.value.pincode,
      area: this.garageEditForm.value.area,
      panCard: this.garageEditForm.value.panCard,
      image: this.garageDetails.image,
      referralCode: this.garageDetails.referralCode,
      totalCustomer: this.garageDetails.totalCustomer,
      totalScore: this.garageDetails.totalScore,
      createdAt: this.garageDetails.createdAt,
      updatedAt: this.garageDetails.updatedAt,
      active: this.garageDetails.active
    } 

    this.updateSubitLoadingFlag = true;
    this.garageService.updateGarageAccount(updateGarageObj).subscribe(data => {
      this.garageDetails = data;
      this.displayName = this.garageDetails.garageName;
      
      this.updateSubitLoadingFlag = false;
      this.updateSubmitSuccessFlag = true;

      setTimeout(() => {
        this.updateSubmitSuccessFlag = false;
      }, 5000);
    })
  }

  validateForm() {
    this.isValidForm=false;

    if (this.validationFields() == true){
      this.isValidForm = true;
    }


  }

  validationFields():boolean {
    if (this.garageDetails.name.length == 0) {
      // alert("Name is required field");
      return false;
    }
    if (this.garageDetails.garageName.length == 0) {
      // alert("Garage Name is required field");
      return false;
    }
    if (this.garageDetails.phoneNumber.length == 0) {
      // alert("Phone is required field");
      return false;
    }
    if (this.garageDetails.alternateNumber.length != 0 && this.garageDetails.alternateNumber.length != 10) {
      // alert("Alternate Phone is required field");
      return false;
    }
    if (this.garageDetails.gstNumber.length != 0 && this.garageDetails.gstNumber.length != 15) {
      // alert("GST field have incorrect value");
      return false;
    }
    if( this.garageDetails.panCard!= null && this.garageDetails.panCard.length != 0 && this.garageDetails.panCard.length != 10) {
      return false;
    }
    if (this.garageDetails.pincode.toString().length != 6) {
      // alert("Pincode field has incorrect value");
      console.log(this.garageDetails.pincode.toString().length);
      return false;
    }
    if (this.garageDetails.area.length == 0) {
      // alert("Area is required field");
      return false;
    }

    return true;
  }

}
