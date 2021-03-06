import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AdminService } from './../../../service/admin.service';
import { SessionService } from 'src/app/service/session.service';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginComponent } from '../../login/login.component';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  loginText: FormGroup;

  // utilities
  loginRequestProcess: boolean = false;
  invalidCredentialsFlag: boolean = false;

  constructor(private adminService: AdminService, private loginComp: LoginComponent, private router: Router, private sessionService: SessionService) {
    this.loginText = new FormGroup({
      id: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', Validators.required)
    });

  }

  ngOnInit(): void {
  }

  login() {
    // console.log(this.loginText.value)

    this.loginRequestProcess = true;
    this.invalidCredentialsFlag = false;

    this.loginText.value['role'] = 'admin'

    this.adminService.authenticate(this.loginText.value).subscribe(resp => {
      console.log(resp)

      if (resp.token != null) {
        localStorage.setItem('authToken', resp.token);
        localStorage.setItem('isLoggedIn', "true");

        this.sessionService.setCredentials(resp);

        this.router.navigateByUrl("/dashboard");
      }

      // console.log(resp)
    }, err => {
      // console.log(err);
      // console.log("this is the error  ")
      this.invalidCredentialsFlag = true;
      this.loginRequestProcess = false;
    });
  }

  forgetClick() {
    this.loginComp.currentFormComponent = "forgetPassword";
  }

}
