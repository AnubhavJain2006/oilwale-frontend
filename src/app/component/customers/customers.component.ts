import { CustomerService } from './../../service/customer.service';
import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/interface/customer';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers: Array<Customer> = []
  constructor(private customerService: CustomerService) {
    if (this.customerService.customerList.length == 0) {
      this.loadAllCustomers();
    }
    else {
      this.customers = this.customerService.customerList;
    }
  }


  ngOnInit(): void {
  }



  async loadAllCustomers() {
    await this.customerService.getAllCustomer().then(resp => {
      this.customers = resp;
      this.customerService.customerList = this.customers;
    })

  }
  getCustomerId(customerId: string) {
    console.log(customerId)
  }
}
