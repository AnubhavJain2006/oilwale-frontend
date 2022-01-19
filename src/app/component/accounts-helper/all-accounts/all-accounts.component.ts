import { Component, OnInit, Input } from '@angular/core';
import { Admin } from 'src/app/interface/admin';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-all-accounts',
  templateUrl: './all-accounts.component.html',
  styleUrls: ['./all-accounts.component.css']
})
export class AllAccountsComponent implements OnInit {

  @Input() accounts!: Admin[];
  @Input() loading!: boolean;

  // @Input() currentUser!: Admin;

  currentUserEmail:string = this.accountService.getAdminNameFromToken();
  currentUserDetails!: Admin;

  modalAdminId: string = "";
  modalName: string = "";
  modalEmail: string = "";

  // flags
  currentUserDetailsLoadingFlag: boolean = true;

  constructor(private accountService: AdminService) { }

  ngOnInit(): void {
    console.log(this.currentUserEmail + "this");
    
    this.accountService.getAdminByEmail().subscribe(data => {
      this.currentUserDetails = data;
    },
    error => {
      alert("Error in fetching details of current user!")
      console.log(error);
    },
    () => {
      this.currentUserDetailsLoadingFlag = false;
    })

  }

  //     console.log(JSON.parse(JSON.stringify(token)).sub)

  setModal(adminId: string, name: string, email: string) {
    // console.log(adminId);
    this.modalAdminId = adminId;
    // console.log(name);
    this.modalName = name;
    // console.log(email);
    this.modalEmail = email;
  }

  
  confirmDelete(adminId: string) {
    // console.log(adminId);
    this.accountService.deleteAccount(adminId).subscribe(resp => {
      // console.log(resp);
    }, err => {
      console.log(err)
    });
    let index = this.accounts.findIndex(account => account.adminId == adminId);
    this.accounts.splice(index, 1);
  }

  
}
