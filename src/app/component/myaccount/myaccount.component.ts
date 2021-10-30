import { Admin } from './../../interface/admin';
import { AdminService } from './../../service/admin.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.css']
})
export class MyaccountComponent implements OnInit {
  userData: any;

  constructor(private adminService: AdminService) {
    this.adminService.getAdminByEmail().subscribe(resp => {
      console.log(resp)
      this.userData = resp;
    }, err => {
      console.log(err)

    });
  }



  ngOnInit(): void {
  }

}
