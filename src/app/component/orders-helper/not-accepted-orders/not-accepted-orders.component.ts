import { Component, Input, OnInit } from '@angular/core';
import { Order } from 'src/app/interface/order';
import { OrderGet } from 'src/app/interface/order-get';

@Component({
  selector: 'app-not-accepted-orders',
  templateUrl: './not-accepted-orders.component.html',
  styleUrls: ['./not-accepted-orders.component.css']
})
export class NotAcceptedOrdersComponent implements OnInit {
  
  @Input() orders!: OrderGet[];
  @Input() loading!: boolean;
  
  constructor() { }

  ngOnInit(): void {
  }

}
