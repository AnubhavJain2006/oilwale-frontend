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

  currentUserDetails!: Admin;
  
  private currentUserEmail:string = this.adminService.getAdminNameFromToken();
  
  // flags
  dataLoadingStatus:boolean = true;
  updateAccountLoading: boolean = false;
  updateAccountSuccess: boolean = false;
  
  sameUserEdit:boolean = false;
  updateCondition: boolean = false;

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
      this.displayName = this.adminDetails.name;
      
      
      // bad code
      // getting details of current user and comparing for the condition
      this.adminService.getAdminByEmail().subscribe (currUser => {
        this.dataLoadingStatus = false;
        
        this.currentUserDetails = currUser;
        
        if(this.adminDetails.email == this.currentUserEmail) {
          this.sameUserEdit = true;
        }

        this.updateCondition = this.calculateUpdateCondition();
      
      
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
      
    })

    });
  }

  updateUser() {
    console.log("pending implementation");

    let updateObj:Admin = {
      adminId: this.adminDetails.adminId,
      name: this.accountForm.value.name,
      email: this.accountForm.value.email,
      phoneNumber: this.accountForm.value.phoneNumber,
      alternateNumber: this.accountForm.value.alternateNumber,
      address: this.accountForm.value.address,
      pincode: this.accountForm.value.pincode,
      image: this.adminDetails.image,
      privilege: this.accountForm.value.privilege,
      createdAt: this.adminDetails.createdAt,
      updateAt: this.adminDetails.updateAt,
      active: this.adminDetails.active
    }

    this.updateAccountLoading = true;
    // this.updateAccountSuccess = false;
    this.adminService.updateAdmin(updateObj).subscribe(data => {
      this.adminDetails = data;

      // this.updateCondition = this.calculateUpdateCondition();

      this.updateAccountSuccess = true;
      setTimeout(() => {
        this.updateAccountSuccess = false;
      }, 5000);
    },
    error => {
      alert("Some error in update!")
      console.log(error);
    },
    () => {
      this.updateAccountLoading = false;
    })
    
  }


  calculateUpdateCondition(): boolean {
    return this.currentUserDetails.privilege == 'admin' && this.adminDetails.privilege == 'moderator';
  }

}
