import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-add-accounts',
  templateUrl: './add-accounts.component.html',
  styleUrls: ['./add-accounts.component.css']
})
export class AddAccountsComponent implements OnInit {
  newAddedAccount: any = "";

  account: FormGroup;

  // flags
  addAccountLoading: boolean = false;

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
  }

  ngOnInit(): void {
  }

  addAccount() {
    // console.log(this.account.value);
    this.addAccountLoading = true;
    this.accountService.addAccount(this.account.value).subscribe(resp => {
      console.log(resp);
      this.addAccountLoading = false;
      this.newAddedAccount = resp;
      this.account.reset();
    }, err => {
      console.log(err);
    });

  }

}
