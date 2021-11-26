import { Component, OnInit, Input } from '@angular/core';
import { Admin } from 'src/app/interface/admin';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-deleted-accounts',
  templateUrl: './deleted-accounts.component.html',
  styleUrls: ['./deleted-accounts.component.css']
})
export class DeletedAccountsComponent implements OnInit {

  @Input() accounts!: Admin[];
  @Input() loading!: boolean;

  // flags 
  revertAccountFlagLoading: boolean = false;
  revertAccountFlagSuccess: boolean = false;

  // dumb variables

  tempAdmin: Admin = {
    adminId: '',
    name: "",
    email: "",
    phoneNumber: "",
    alternateNumber: "",
    address: "",
    pincode: "",
    image: "",
    password: "",
    privilege: "",
    createdAt: "",
    updateAt: "",
    active: false
  };

  constructor(private accountService: AdminService) { }

  ngOnInit(): void {
  }

  setModal(admin: Admin) {
    this.tempAdmin = admin;

  }

  revertAccount() {
    this.tempAdmin.active = true;
    this.revertAccountFlagLoading = true;
    this.accountService.updateAdmin(this.tempAdmin).subscribe(data => {
      console.log(data);
      this.revertAccountFlagLoading = false;
      this.revertAccountFlagSuccess = true;

      setTimeout(() => {
        this.revertAccountFlagSuccess = false;
      }, 5000);
    })
  }


}
