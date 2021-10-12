import { AdminService } from './../../service/admin.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  newAddedAccount: any = "";

  modalAdminId: string = "";
  modalName: string = "";
  modalEmail: string = "";

  activeAccountList: Array<any> = [];
  deactiveAccountList: Array<any> = [];
  account: FormGroup;
  constructor(private accountService: AdminService) {
    this.account = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      phoneNumber: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      alternateNumber: new FormControl('', [Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      address: new FormControl('', Validators.required),
      pincode: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]),
      privilege: new FormControl('', Validators.required)
    })
    this.loadAccounts();
    this.loadDeativeAccount();
    console.log(this.account.valid);


  }

  ngOnInit(): void {
    this.accountService.refreshNeeded.subscribe(() => {
      this.loadAccounts();
    })

    this.accountService.deletedAccount.subscribe(() => {
      this.loadDeativeAccount();
      this.loadAccounts();
    })
  }
  async loadDeativeAccount() {
    await this.accountService.loadDeactivAccounts().then(resp => {
      console.log(resp);
      this.deactiveAccountList = resp;
    }, err => {
      console.log(err);
    })
  }

  async loadAccounts() {
    await this.accountService.loadActiveAccounts().then(resp => {
      console.log(resp);
      this.activeAccountList = resp;
    }, err => {
      console.log(err);
    })
  }

  addAccount() {
    // console.log(this.account.value);
    this.accountService.addAccount(this.account.value).subscribe(resp => {
      console.log(resp);
      this.newAddedAccount = resp;
      this.account.reset();
    }, err => {
      console.log(err);
    });

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
    let index = this.activeAccountList.findIndex(account => account.adminId == adminId);
    this.activeAccountList.splice(index, 1);
  }


  revertAccount(adminId: string) {
    console.log(adminId);
    this.accountService.revertAccount(adminId).subscribe(resp => {
      console.log(resp);

    }, err => {
      console.log(err);

    });
  }

}
