import { Component, OnInit, Input } from '@angular/core';
import { Customer } from 'src/app/interface/customer';

@Component({
  selector: 'app-restricted-customers',
  templateUrl: './restricted-customers.component.html',
  styleUrls: ['./restricted-customers.component.css']
})
export class RestrictedCustomersComponent implements OnInit {

  @Input() restrictedCustomers!: Customer[];
  @Input() loading!: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
