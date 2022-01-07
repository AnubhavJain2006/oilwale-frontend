import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  displayOrderObj?: OrderGet;

  displayOrder(order: OrderGet) {
    this.displayOrderObj = order;
  }

}
