// import { AdminService } from './../../service/admin.service';
import { Component, OnInit } from '@angular/core';
// import { SessionService as SS } from '../../service/session.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  currentFormComponent: string = "login";

  constructor() { }

  ngOnInit(): void {
  }

  showForgetPassword() {
    this.currentFormComponent = "forgetPassword";
  }

}
