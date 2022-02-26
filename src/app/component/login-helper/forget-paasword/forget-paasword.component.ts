import { JsonPipe } from '@angular/common';
import { AdminService } from './../../../service/admin.service';
import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../../login/login.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forget-paasword',
  templateUrl: './forget-paasword.component.html',
  styleUrls: ['./forget-paasword.component.css']
})
export class ForgetPaaswordComponent implements OnInit {

  emailValidationSuccess: boolean = false;

  otp: string = "";
  email: string = "";

  // not so bad variables
  passwordResetShow: boolean = false;

  passwordResetForm: FormGroup;
  passwordResetMatchFlag: boolean = true;
  passwordResetSubmitLoading: boolean = false;
  passwordResetComplete: boolean = false;
  passwordResetRequestComplete: boolean = false;

  // booleans
  isValidOtp: boolean = true;
  isValidEmail: boolean = true;
  isValidRegisteredEmail: boolean = true;
  otpValidationFromServer: boolean = true;

  // utils
  verifiyEmailLoading: boolean = false;
  verifyOtpLoading: boolean = false;

  constructor(private loginComp: LoginComponent, private adminService: AdminService) {
    this.passwordResetForm = new FormGroup({
      newPassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]),
      newPasswordConfirm: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])
    })

  }

  toggle() {
    this.passwordResetShow = !this.passwordResetShow;
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
        
        if (resp.data == "success") {
          console.log("OTP verified")
          this.passwordResetShow = true;
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

  checkNewPasswordMatch(): boolean {
    return this.passwordResetForm.value.newPassword === this.passwordResetForm.value.newPasswordConfirm;
  }

  runPasswordMatch() {
    let check = this.checkNewPasswordMatch();
    if (check) {
      this.passwordResetMatchFlag = true;
      return;
    }
    this.passwordResetMatchFlag = false;
  }


  resetPasswordSubmit() {
    console.log("Password reset request!");
    this.passwordResetSubmitLoading = true;

    this.adminService.resetPassword(this.email, this.passwordResetForm.value.newPassword).subscribe(
      (res) => {
        console.log("Password reset complete");
        this.passwordResetSubmitLoading = false;
        
        this.passwordResetRequestComplete = true;
        if (res.data == "success") {
          this.passwordResetComplete = true;
        }

      },
      (err) => {
        console.log(err);
      }
    )

  }

}
