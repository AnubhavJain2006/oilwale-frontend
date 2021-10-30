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

  constructor(private adminService: AdminService, private loginComp:LoginComponent) {
    this.loginText = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', Validators.required)
    });

  }

  ngOnInit(): void {
  }

  login() {
    console.log(this.loginText.value)
    console.log()
    this.adminService.authenticate(this.loginText.value).subscribe(resp => {
      // console.log(resp);
      // console.log(resp[0].token)
      localStorage.setItem('authToken', resp[0].token);
    }, err => {
      console.log(err);
    });
  }

  forgetClick() {
    this.loginComp.currentFormComponent = "forgetPassword";
  }

}
