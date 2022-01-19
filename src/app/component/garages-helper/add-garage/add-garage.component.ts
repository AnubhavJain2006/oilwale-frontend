import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GarageService } from 'src/app/service/garage.service';

@Component({
  selector: 'app-add-garage',
  templateUrl: './add-garage.component.html',
  styleUrls: ['./add-garage.component.css']
})
export class AddGarageComponent implements OnInit {

  garage: FormGroup;
  areas: Array<any> = [];
  newAddedGarage: any = "";

  // flags
  isValidPincode: boolean = true;
  isSubmitted: boolean = false;
  pincodeAreaFetchLoading: boolean = false;
  addGarageLoadingFlag: boolean = false;
  phoneNumberCheck: boolean = false;
  phoneNumberCheckLoading: boolean = true;

  // utilities
  fieldTextTypePass: boolean = false;
  fieldTextTypeConf: boolean = false;

  constructor(private garageService: GarageService, private router: Router) { 
    this.garage = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]),
      garageName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]),
      phoneNumber: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      alternateNumber: new FormControl('', [Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      gstNumber: new FormControl('', [Validators.minLength(15), Validators.maxLength(15), Validators.pattern("[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[A-Z]{1}[0-9]{1}")]),
      address: new FormControl('', Validators.required),
      pincode: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
      area: new FormControl('', Validators.required),
      // image: new FormControl(''),
      panCard: new FormControl('', [Validators.pattern("[A-Z]{5}[0-9]{4}[A-Z]{1}")]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required]),
      premium: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
  }

  async getArea(pincode: any) {

    pincode = pincode.toString();
    if (pincode.length == 6) {
      this.pincodeAreaFetchLoading = true;
      await this.garageService.getAreaByPincode(pincode).then(resp => {
        if (resp[0]["Status"] == "Error") {
          this.isValidPincode = false;
          this.areas = [];
        }
        else {
          this.isValidPincode = true;
          this.areas = resp[0].PostOffice
          this.areas = this.areas.map(item => item.Name)
        }
        this.pincodeAreaFetchLoading = false;

      }, err => {
        console.log("error in pincode fetch")
      }
      );
    }
  }

  checkPasswordMatch():boolean {
    console.log("Password check");
    let pass = this.garage.value.password;
    let confPass = this.garage.value.confirmPassword;
    if (pass === confPass) return true;
    else return false;
  }

  addGarage() {
    this.addGarageLoadingFlag = true;
    this.garageService.addNewGarage(this.garage.value).subscribe(resp => {
      console.log(resp);
      this.newAddedGarage = resp;
      // this.isSubmitted = true;
      this.garage.reset();
    }, err => {
      console.log(err)
      alert("Some error occured");
      this.addGarageLoadingFlag = false;
    },
    () => {
      this.addGarageLoadingFlag = false;
    })
  }

  toggleFieldTextTypePass() {
    this.fieldTextTypePass = !this.fieldTextTypePass;
  }

  toggleFieldTextTypeConf() {
    this.fieldTextTypeConf = !this.fieldTextTypeConf;
  }

  checkPhoneNumber() {
    console.log("check started");
    
    if (this.garage.get('phoneNumber')?.touched) {
      if (this.garage.get('phoneNumber')?.valid) {
        this.garageService.checkPhoneNumber(this.garage.value.phoneNumber).subscribe(data => {
          if (data.available) this.phoneNumberCheck = true;
        })
      }
    }
  }

}
