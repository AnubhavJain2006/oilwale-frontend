import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CustomerService } from 'src/app/service/customer.service';
import { Customer } from 'src/app/interface/customer';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.css']
})
export class CustomerInfoComponent implements OnInit {
  id!: string;
  customerDetails!: Customer;
  dataLoadingStatus: boolean = true;


  constructor(private router: ActivatedRoute, private customerService: CustomerService) { }

  ngOnInit(): void {
    this.id = this.router.snapshot.params.id;
    this.customerService.getCustomerById(this.id).subscribe((detail) => {
      this.customerDetails = detail;
      this.dataLoadingStatus = false;
    })
  }

}
