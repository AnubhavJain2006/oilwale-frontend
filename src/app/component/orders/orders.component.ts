import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/interface/order';
import { OrderGet } from 'src/app/interface/order-get';
import { OrderService } from 'src/app/service/order.service';
import { HeaderComponent } from '../header/header.component';

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

  constructor(private orderService: OrderService, private headerComponent: HeaderComponent) { }

  ngOnInit(): void {

    // changing sidebar active tab
    this.headerComponent.active = "orders"; 

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
      this.newOrdersLoading = false;
      console.log(this.newOrders);
    }, 
    (error) => {
      this.newOrdersLoading = false;
      console.log(error.message);
      console.log(error.status);
      
      if ( error.status == 404) {
        this.newOrders = [];
      }
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

      if (error.status == 404) {
        this.acceptedOrders = [];
      }
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

      if (error.status == 404) {
        this.pastOrders = [];
      }
    },
    () => {
      this.pastOrderLoading = false;
    })
  }

  fetchCompletedOrders() {
    this.orderService.fetchCompletedOrders().subscribe((data) => {
      this.completedOrdersLoading = false;
      this.completedOrders = data;
    }, 
    (error) => {
      this.completedOrdersLoading = false;
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

      if (error.status == 404) {
        this.notAcceptedOrders = [];
      }
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
