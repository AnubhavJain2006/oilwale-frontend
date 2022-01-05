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
    this.fetchNotAcceptedOrders();
    this.fetchPastOrders();
  }

  fetchNewOrders() {
    this.orderService.fetchNewOrders().subscribe((data) => {
      this.newOrders = data;
      console.log("haha");
      console.log(this.newOrders);
    }, 
    (error) => {
      this.acceptedOrdersLoading = false;
      console.log(error.message);
    },
    () => {
      this.newOrdersLoading = false;
    })
  }

  fetchAcceptedOrders() {
    this.orderService.fetchAcceptedOrders().subscribe((data) => {
      this.acceptedOrders = data;
    }, 
    (error) => {
      this.acceptedOrdersLoading = false;
      console.log(error.message);
    },
    () => {
      this.acceptedOrdersLoading = false;
    })
  }
  
  fetchPastOrders() {
    this.orderService.fetchPastOrders().subscribe((data) => {
      this.pastOrders = data;
    }, 
    (error) => {
      console.log(error.message);
    },
    () => {
      this.pastOrderLoading = false;
    })
  }

  fetchCompletedOrders() {
    this.orderService.fetchCompletedOrders().subscribe((data) => {
      this.completedOrders = data;
    }, 
    (error) => {
      console.log(error.message);
    },
    () => {
      this.completedOrdersLoading = false;
    })
  }

  fetchNotAcceptedOrders() {
    this.orderService.fetchNotAcceptedOrders().subscribe((data) => {
      this.notAcceptedOrders = data;
    }, 
    (error) => {
      console.log(error.message);
    },
    () => {
      this.notAcceptedOrdersLoading = false;
    })
  }

  onOrderAccepted() {
    this.fetchNewOrders();
    this.fetchAcceptedOrders();
  }

  onOrderComplete() {
    this.fetchAcceptedOrders();
    this.fetchCompletedOrders();
  }

  onOrderDecline() {
    this.fetchNewOrders();
    this.fetchNotAcceptedOrders();
  }

}
