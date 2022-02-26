import { JsonPipe } from '@angular/common';
import { AdminService } from './../../../service/admin.service';
import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../../login/login.component';

@Component({
  selector: 'app-forget-paasword',
  templateUrl: './forget-paasword.component.html',
  styleUrls: ['./forget-paasword.component.css']
})
export class ForgetPaaswordComponent implements OnInit {

  emailValidationSuccess: boolean = false;

  otp: string = "";
  email: string = "";

  // booleans
  isValidOtp: boolean = true;
  isValidEmail: boolean = true;
  isValidRegisteredEmail: boolean = true;
  otpValidationFromServer: boolean = true;

  // utils
  verifiyEmailLoading: boolean = false;
  verifyOtpLoading: boolean = false;

  constructor(private loginComp: LoginComponent, private adminService: AdminService) {

  }

  ngOnInit(): void {
  }

  signInClick() {
    this.loginComp.currentFormComponent = "login";
  }

  removeValidationMsg() {
    this.isValidEmail = true;
    this.isValidOtp = true;
    this.isValidRegisteredEmail = true;
  }

  verifyEmail() {
    this.removeValidationMsg();

    if (!this.validateEmail(this.email)) {
      this.isValidEmail = false;
      return;
    }

    this.verifiyEmailLoading = true;

    this.adminService.forgotPassword(this.email).subscribe(resp => {
      console.log(resp.data);

      if (resp.data == "Success") {
        this.emailValidationSuccess = true;

        this.verifiyEmailLoading = false;
      }
      else {
        this.isValidRegisteredEmail = false;

        this.verifiyEmailLoading = false;
      }
    }, err => {
      console.log(err);
    },);
  }

  verifyOtp() {
    this.removeValidationMsg();

    if (this.otp.length != 6) {
      this.isValidOtp = false;
      return;
    }

    this.verifyOtpLoading = true;

    // this.adminService.sendotp()
    this.adminService.verifyOtp(this.email, this.otp).subscribe(
      resp => {
        console.log("OTP verify function");
        
        if (resp.data == "Success") {
          console.log("OTP verified")
        }
        else {
          this.otpValidationFromServer = false;
        }

        this.verifyOtpLoading = false;

      },
      err => {
        console.log(err);
        this.verifyOtpLoading = false;
      }
    )
  }

  validateEmail(email: string) {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

}
