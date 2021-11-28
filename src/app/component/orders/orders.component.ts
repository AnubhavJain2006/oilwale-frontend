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
      console.log("haha");
      this.newOrdersLoading = false;
      console.log(this.newOrders);
    }, 
    (error) => {
      this.newOrdersLoading = false;
      console.log(error.message);
    })
  }

  fetchAcceptedOrders() {
    this.orderService.fetchAcceptedOrders().subscribe((data) => {
      this.acceptedOrders = data;
      this.acceptedOrdersLoading = false;
    }, 
    (error) => {
      this.newOrdersLoading = false;
      console.log(error.message);
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
    }, 
    (error) => {
      this.newOrdersLoading = false;
      console.log(error.message);
    })
  }
}
