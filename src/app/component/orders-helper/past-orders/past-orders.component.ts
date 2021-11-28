import { Component, Input, OnInit } from '@angular/core';
import { Order } from 'src/app/interface/order';
import { OrderGet } from 'src/app/interface/order-get';

@Component({
  selector: 'app-past-orders',
  templateUrl: './past-orders.component.html',
  styleUrls: ['./past-orders.component.css']
})
export class PastOrdersComponent implements OnInit {

  @Input() orders!: OrderGet[];
  @Input() loading!: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
