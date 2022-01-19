import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';

import { Admin } from 'src/app/interface/admin';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css']
})
export class AccountInfoComponent implements OnInit {
  id!: string;
  adminDetails!:Admin;
  currentUser!: Admin;
  

  // flags
  dataLoadingStatus:boolean = true;
  currentUserdatailLoading:boolean = true;
  deleteAccountLoadingFlag: boolean = false;
  restoreAccountLoadingFlag: boolean = false;


  constructor(private router: ActivatedRoute, private adminService: AdminService) { }

  ngOnInit(): void {
    this.id = this.router.snapshot.params.id;
    this.adminService.getAdminById(this.id).subscribe(data => {
      this.adminDetails = data;
      this.dataLoadingStatus = false;
    });
    
    this.adminService.getAdminByEmail().subscribe(data => {
      this.currentUser = data;
      this.currentUserdatailLoading = false;
    })
  }

  deleteUser(admin: Admin) {
    this.deleteAccountLoadingFlag = true;
    this.adminService.deleteAccount(admin.adminId).subscribe(data => {
      console.log(data);
      this.adminDetails = data;
    },
    error => {
      console.log(error);
      alert("Some error occurred while deleting!");
    },
    () => {
      this.deleteAccountLoadingFlag = false;
    })
  }

  restoreUser(admin: Admin) {
    const restoreObj: Admin = {
      adminId: admin.adminId,
      name: admin.name,
      email: admin.email,
      phoneNumber: admin.phoneNumber,
      alternateNumber: admin.alternateNumber,
      address: admin.address,
      pincode: admin.pincode,
      image: admin.image,
      privilege: admin.privilege,
      createdAt: admin.createdAt,
      updateAt: admin.updateAt,
      active: true
    };

    this.restoreAccountLoadingFlag = true;

    this.adminService.updateAdmin(restoreObj).subscribe(data => {
      this.adminDetails = data;
    },
    error => {
      alert("Some error occurred!");
      console.log(error);
      
    },
    () => {
      this.restoreAccountLoadingFlag = false;
    })
  }

}
