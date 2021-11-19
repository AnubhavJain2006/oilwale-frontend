import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GarageService } from 'src/app/service/garage.service';

import { Garage } from 'src/app/interface/garage';
import { FormControl, FormGroup, SelectControlValueAccessor, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-garage',
  templateUrl: './edit-garage.component.html',
  styleUrls: ['./edit-garage.component.css']
})
export class EditGarageComponent implements OnInit {
  id!: string;
  garageDetails!:Garage;
  dataLoadingStatus:boolean = true;

  // utitilities
  displayName:string = ""

  areaByPincodeList: any[] = [];
  isValidPincode: boolean = true;
  isValidForm: boolean = false;
  updateSubitLoadingFlag: boolean = false;

  constructor(private router: ActivatedRoute, private garageService: GarageService) { }

  ngOnInit(): void {
    this.id = this.router.snapshot.params.id;
    this.garageService.getGarageById(this.id).subscribe(data => {
      this.garageDetails = data;
      this.dataLoadingStatus = false;
      this.displayName = this.garageDetails.garageName;
      this.getAreaListFromPincode(this.garageDetails.pincode.toString())    
      this.validateForm();
    })
  }

  getAreaListFromPincode(pincode: string) {
    if( pincode.length == 6) {
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
      })
    }
  }

  updateGarageDetails() {
    if ( this.validationFields() == false) {
      alert("Check all fields!");
      console.log("invalid");
      this.isValidForm = false;
    }

    this.updateSubitLoadingFlag = true;
    this.garageService.updateGarageAccount(this.garageDetails).subscribe(data => {
      this.garageDetails = data;
      this.displayName = this.garageDetails.garageName  
      // alert("done");
      this.updateSubitLoadingFlag = false;
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
