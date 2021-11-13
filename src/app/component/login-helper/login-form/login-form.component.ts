import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AdminService } from './../../../service/admin.service';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginComponent } from '../../login/login.component';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  loginText: FormGroup;

  constructor(private adminService: AdminService, private loginComp: LoginComponent, private router: Router) {
    this.loginText = new FormGroup({
      id: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', Validators.required)
    });

  }

  ngOnInit(): void {
  }

  login() {
    console.log(this.loginText.value)
    this.loginText.value['role'] = 'admin'
    this.adminService.authenticate(this.loginText.value).subscribe(resp => {
      console.log(resp + "Service")
      if (resp.token != null) {
        localStorage.setItem('authToken', resp.token);
        localStorage.setItem('isLoggedIn', "true");
        this.router.navigateByUrl("/dashboard");
      }
      console.log(resp)
    }, err => {
      console.log(err);
    });
  }

  forgetClick() {
    this.loginComp.currentFormComponent = "forgetPassword";
  }

}
