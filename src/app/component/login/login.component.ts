import { AdminService } from './../../service/admin.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { SessionService as SS } from '../../service/session.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginText: FormGroup;

  constructor(private adminService: AdminService) {
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

}
