import { AdminService } from './../../service/admin.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Output } from '@angular/core';

import { Admin } from 'src/app/interface/admin';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  activeAccountList: Array<any> = [];
  deactiveAccountList: Array<any> = [];

  // flags 
  activeAccountsLoading: boolean = true;
  deactiveAccountLoading: boolean = true;

  constructor(private accountService: AdminService) {
    
    if (this.accountService.activeAccountList.length == 0) {
      this.loadAccounts();
    }
    else {
      this.activeAccountsLoading = false;
      this.activeAccountList = this.accountService.activeAccountList;
    }
    if (this.accountService.deactiveAccountList.length == 0) {
      this.loadDeativeAccount();
    }
    else {
      this.deactiveAccountLoading = false;
      this.deactiveAccountList = this.accountService.deactiveAccountList;
    }
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
      this.accountService.deactiveAccountList = this.deactiveAccountList;

      this.deactiveAccountLoading = false;
    }, err => {
      console.log(err);
    })
  }

  async loadAccounts() {
    await this.accountService.loadActiveAccounts().then(resp => {
      console.log(resp);
      this.activeAccountList = resp;
      this.accountService.activeAccountList = this.activeAccountList;

      this.activeAccountsLoading = false;
    }, err => {
      console.log(err);
    })
  }







}
