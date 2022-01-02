import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Admin } from 'src/app/interface/admin';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.css']
})
export class AccountEditComponent implements OnInit {
  id!: string;
  adminDetails!:Admin;

  displayName: string = "";

  accountForm: FormGroup;

  
  currentUserEmail:string = this.adminService.getAdminNameFromToken();
  
  // flags
  dataLoadingStatus:boolean = true;
  sameUserEdit:boolean = false;
  updateAccountLoading: boolean = false;

  constructor(private router: ActivatedRoute, private adminService: AdminService) { 
    this.accountForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      phoneNumber: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      alternateNumber: new FormControl('', [Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      address: new FormControl('', Validators.required),
      pincode: new FormControl('', Validators.required),
      // password: new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]),
      privilege: new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {
    this.id = this.router.snapshot.params.id;
    this.adminService.getAdminById(this.id).subscribe(data => {
      this.adminDetails = data;
      this.dataLoadingStatus = false;
      this.displayName = this.adminDetails.name;

      if(this.adminDetails.email == this.currentUserEmail) {
        this.sameUserEdit = true;
        return;
      }

      // setting the form
      this.accountForm.setValue({
        name: this.adminDetails.name,
        email: this.adminDetails.email,
        phoneNumber: this.adminDetails.phoneNumber,
        alternateNumber: this.adminDetails.alternateNumber,
        address: this.adminDetails.address,
        pincode: this.adminDetails.pincode,
        privilege: this.adminDetails.privilege,
      })


    });
  }

  updateUser() {
    console.log("pending implementation");
    
  }

}
