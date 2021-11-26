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
  isValidEmail: boolean = true;
  constructor(private loginComp: LoginComponent, private adminService: AdminService) {

  }

  ngOnInit(): void {
  }

  signInClick() {
    this.loginComp.currentFormComponent = "login";
  }

  verifyEmail() {
    this.adminService.forgotPassword(this.email).subscribe(resp => {
      console.log(resp.data);

      if (resp.data == "Success")
        this.emailValidationSuccess = true;
      else
        this.isValidEmail = false;
    }, err => {
      console.log(err);
    });
  }

  verifyOtp() {
    this.adminService.verifyOtp()
  }

}
