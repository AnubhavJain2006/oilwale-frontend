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
  
  dataLoadingStatus:boolean = true;
  currentUserdatailLoading:boolean = true;

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

}
