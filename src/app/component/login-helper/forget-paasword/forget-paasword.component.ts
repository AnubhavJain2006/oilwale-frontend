import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../../login/login.component';

@Component({
  selector: 'app-forget-paasword',
  templateUrl: './forget-paasword.component.html',
  styleUrls: ['./forget-paasword.component.css']
})
export class ForgetPaaswordComponent implements OnInit {

  emailValidationSuccess:boolean = false;
  sendTarget:string = "";


  constructor( private loginComp:LoginComponent) {
    this.sendTarget = "Send OTP";
   }

  ngOnInit(): void {
  }

  signInClick() {
    this.loginComp.currentFormComponent = "login";
  }

  verifyEmail() {
    this.emailValidationSuccess = true;
    this.sendTarget = "Verify";
  }

}
