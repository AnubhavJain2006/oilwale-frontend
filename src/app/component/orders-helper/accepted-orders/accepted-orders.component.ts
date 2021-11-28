import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Order } from 'src/app/interface/order';
import { OrderGet } from 'src/app/interface/order-get';
import { OrderUpdate } from 'src/app/interface/utilities/order-update';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-accepted-orders',
  templateUrl: './accepted-orders.component.html',
  styleUrls: ['./accepted-orders.component.css']
})
export class AcceptedOrdersComponent implements OnInit {

  @Input() orders!: OrderGet[];
  @Input() loading!: boolean;
  @Output() completeEvent:EventEmitter<string> = new EventEmitter<string>();

  acceptOrderResponse!: OrderUpdate;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
  }

  completeOrder(order: OrderGet) {
    order.status = -999;
    // this.acceptOrderFlag = true;
    this.orderService.completeOrder(order.orderId).subscribe((data) => {
      this.acceptOrderResponse = data;
      console.log(this.acceptOrderResponse);
      // this.acceptOrderFlag = false;
      this.completeEvent.emit();
    })
  }

}
