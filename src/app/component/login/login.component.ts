import { Router } from '@angular/router';
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
  errorMessage: string = '';
  loginText: FormGroup;

  constructor(private adminService: AdminService, private router: Router) {
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
      if (resp[0].token != null) {
        localStorage.setItem('authToken', resp[0].token);
        this.router.navigateByUrl('/dashboard')
      }
      else {
        this.errorMessage = "Invalid UserName and Password"
        this.loginText.controls['password'].reset()
      }
    }, err => {
      this.errorMessage = "Invalid UserName and Password"
      this.loginText.controls['password'].reset()
    });

  }

  resetMessage() {
    this.errorMessage = "";

  }

}
