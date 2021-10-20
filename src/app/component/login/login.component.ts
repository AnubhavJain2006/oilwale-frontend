import { AdminService } from './../../service/admin.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

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
    this.adminService.authenticate(this.loginText.value).subscribe(resp => {
      console.log(resp);
    }, err => {
      console.log(err);
    });
  }

}
