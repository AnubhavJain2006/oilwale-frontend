import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CustomerService } from 'src/app/service/customer.service';
import { Customer } from 'src/app/interface/customer';
import { CustomerVehicle } from 'src/app/interface/customer-vehicle';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.css']
})
export class CustomerInfoComponent implements OnInit {
  id!: string;
  customerDetails!: Customer;
  dataLoadingStatus: boolean = true;

  customerVehicles: CustomerVehicle[] = [];

  // flags
  deleteCustomerLoading: boolean = false;
  restoreCustomerLoading: boolean = false;

  constructor(private router: ActivatedRoute, private customerService: CustomerService) { }

  ngOnInit(): void {
    this.id = this.router.snapshot.params.id;
    this.customerService.getCustomerById(this.id).subscribe((detail) => {
      this.customerDetails = detail;
      this.dataLoadingStatus = false;

      this.fetchCustomerVehicles();
    })
  }
  
  fetchCustomerVehicles() {
    this.customerService.getCustomerVehicles(this.id).subscribe(data => {
      this.customerVehicles = data;
    })
  }

  deleteCustomer() {
    this.deleteCustomerLoading = true; 
    this.customerService.deleteCustomerById(this.id).subscribe(data => {
      this.customerDetails = data;
      this.deleteCustomerLoading = false;
    })
  }

  restoreCustomer() {
    const customerObj:Customer = {
      customerId: this.customerDetails.customerId,
      customerName: this.customerDetails.customerName,
      customerPhoneNumber: this.customerDetails.customerPhoneNumber,
      customerAddress: this.customerDetails.customerAddress,
      customerPincode: this.customerDetails.customerPincode,
      garageReferralCode: this.customerDetails.garageReferralCode,
      createdAt: this.customerDetails.createdAt,
      updatedAt: this.customerDetails.updatedAt,
      active: true
    }

    this.restoreCustomerLoading = true;
    this.customerService.restoreCustomer(customerObj).subscribe(data => {
      this.customerDetails = data;

      this.restoreCustomerLoading = false;
    })

  }

}
