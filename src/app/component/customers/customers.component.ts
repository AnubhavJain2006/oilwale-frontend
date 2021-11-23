import { CustomerService } from './../../service/customer.service';
import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/interface/customer';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers: Array<Customer> = [];
  restrictedCustomers: Customer[] = [];

  // flags
  customersLoadingFlag: boolean = true;
  restrictedCustomersLoadingFlag: boolean = true;

  constructor(private customerService: CustomerService) {
    if (this.customerService.customerList.length == 0) {
      this.loadAllCustomers();
    }
    else {
      this.customers = this.customerService.customerList;
      this.customersLoadingFlag = false;
    }

    if( this.customerService.restrictedCustomerList.length == 0) {
      this.loadRestrictedCustomers();
    }
    else {
      this.restrictedCustomers = this.customerService.restrictedCustomerList;
      this.restrictedCustomersLoadingFlag = false;
    }
  }


  ngOnInit(): void {
    this.customerService.customerListSubject.subscribe(() => {
      this.loadAllCustomers();
    })

    this.customerService.restrictedCustomerListSubject.subscribe(() => {
      this.loadRestrictedCustomers();
    })
  }


  async loadAllCustomers() {
    await this.customerService.getAllCustomer().then(resp => {
      this.customers = resp;
      this.customerService.customerList = this.customers;

      this.customersLoadingFlag = false;
    })
  }

  async loadRestrictedCustomers() {
    await this.customerService.getRestrictedCustomers().then (data => {
      this.restrictedCustomers = data;
      this.customerService.restrictedCustomerList = this.restrictedCustomers;

      this.restrictedCustomersLoadingFlag = false;
    })
  }

}
