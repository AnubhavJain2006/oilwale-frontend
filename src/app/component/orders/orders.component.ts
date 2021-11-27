import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/interface/order';
import { OrderGet } from 'src/app/interface/order-get';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  newOrders:OrderGet[] = [];
  acceptedOrders: OrderGet[] = [];
  completedOrders: OrderGet[] = [];
  notAcceptedOrders: OrderGet[] = [];
  pastOrders: OrderGet[] = [];

  // flags
  newOrdersLoading: boolean = true;
  acceptedOrdersLoading: boolean = true;
  completedOrdersLoading: boolean = true;
  notAcceptedOrdersLoading: boolean = true;
  pastOrderLoading: boolean = true;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.fetchNewOrders();
    this.fetchAcceptedOrders();
    this.fetchCompletedOrders();
  }

  fetchNewOrders() {
    this.orderService.fetchNewOrders().subscribe((data) => {
      this.newOrders = data;
      this.newOrdersLoading = false;
    })
  }

  fetchAcceptedOrders() {
    this.orderService.fetchAcceptedOrders().subscribe((data) => {
      this.acceptedOrders = data;
      this.acceptedOrdersLoading = false;
    })
  }
  
  // fetchPastOrders() {
  //   this.orderService.fe().subscribe((data) => {
  //     this.newOrders = data;
  //   })
  // }

  fetchCompletedOrders() {
    this.orderService.fetchCompletedOrders().subscribe((data) => {
      this.completedOrders = data;
      this.completedOrdersLoading = false;
    })
  }
}
