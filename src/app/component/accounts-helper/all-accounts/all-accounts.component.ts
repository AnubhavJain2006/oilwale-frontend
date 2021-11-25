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

  
  modalAdminId: string = "";
  modalName: string = "";
  modalEmail: string = "";

  constructor(private accountService: AdminService) { }

  ngOnInit(): void {
  }

  setModal(adminId: string, name: string, email: string) {
    // console.log(adminId);
    this.modalAdminId = adminId;
    // console.log(name);
    this.modalName = name;
    // console.log(email);
    this.modalEmail = email;
  }

  
  confirmDelete(adminId: string) {
    console.log(adminId);
    this.accountService.deleteAccount(adminId).subscribe(resp => {
      console.log(resp);
    }, err => {
      console.log(err)
    });
    let index = this.accounts.findIndex(account => account.adminId == adminId);
    this.accounts.splice(index, 1);
  }

  
}
