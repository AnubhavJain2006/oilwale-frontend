import { Component, OnInit, Input } from '@angular/core';
import { Order } from 'src/app/interface/order';
import { OrderGet } from 'src/app/interface/order-get';

@Component({
  selector: 'app-new-orders',
  templateUrl: './new-orders.component.html',
  styleUrls: ['./new-orders.component.css']
})
export class NewOrdersComponent implements OnInit {

  @Input() orders!: OrderGet[];
  @Input() loading!: boolean;

  constructor() { }

  ngOnInit(): void {
    console.log( "new" + this.orders);

  }

}
