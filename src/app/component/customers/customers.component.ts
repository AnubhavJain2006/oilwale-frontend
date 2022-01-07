import { CustomerService } from './../../service/customer.service';
import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/interface/customer';
import { ActivityService } from 'src/app/service/activity.service';
import { Activity } from 'src/app/interface/activity';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers: Array<Customer> = [];
  restrictedCustomers: Customer[] = [];
  customerActivities: Activity[] = [];

  // flags
  customersLoadingFlag: boolean = true;
  restrictedCustomersLoadingFlag: boolean = true;
  activitiesLoading: boolean = false;;

  constructor(private customerService: CustomerService, private activityService: ActivityService, private headerComponent: HeaderComponent) {
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

    // changing sidebar active tab
    this.headerComponent.active = "customers"; 

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
    }).finally(() => {
      this.customersLoadingFlag = false;
    })
  }

  async loadRestrictedCustomers() {
    await this.customerService.getRestrictedCustomers().then (data => {
      this.restrictedCustomers = data;
      this.customerService.restrictedCustomerList = this.restrictedCustomers;
    }).finally(() => {
      this.restrictedCustomersLoadingFlag = false;
    })
  }

  fetchCustomerActivities() {
    this.activitiesLoading = true;
    this.activityService.getDomainActivities('customers').subscribe(data => {
      this.customerActivities = data;
      // console.log(data);
    },
    (err) => {
      console.log(err);
    },
    () => {
      this.activitiesLoading = false;
    }
    )
  }

}
