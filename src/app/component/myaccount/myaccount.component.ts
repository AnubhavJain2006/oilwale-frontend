import { Admin } from './../../interface/admin';
import { AdminService } from './../../service/admin.service';
import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/service/header.service';
import { HeaderComponent } from '../header/header.component';


@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.css']
})
export class MyaccountComponent implements OnInit {
  userData!: Admin;

  constructor(private adminService: AdminService, private headerService: HeaderService, private headerComponent: HeaderComponent) {

    this.headerComponent.active = "myaccount";
    this.adminService.getAdminByEmail().subscribe(resp => {
      console.log(resp)
      this.userData = resp;
    }, 
      err => {
      console.log(err)
    });
  }



  ngOnInit(): void {
    

  }

}
