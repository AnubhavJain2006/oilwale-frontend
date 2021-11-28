import { Component, Input, OnInit } from '@angular/core';
import { Order } from 'src/app/interface/order';
import { OrderGet } from 'src/app/interface/order-get';

@Component({
  selector: 'app-completed-orders',
  templateUrl: './completed-orders.component.html',
  styleUrls: ['./completed-orders.component.css']
})
export class CompletedOrdersComponent implements OnInit {

  @Input() orders!: OrderGet[];
  @Input() loading!: boolean;

  constructor() { }

  ngOnInit(): void {
    console.log( "completed" + this.orders);
  }

}
