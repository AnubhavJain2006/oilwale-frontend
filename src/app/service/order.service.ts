import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Order } from '../interface/order';
import { OrderGet } from '../interface/order-get';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = environment.baseUrl + 'api/order';

  constructor(private httpClient: HttpClient) { }

  fetchNewOrders():Observable<OrderGet[]> {
    return this.httpClient.get<OrderGet[]>(this.apiUrl + 's/0');
  }

  fetchAcceptedOrders():Observable<OrderGet[]> {
    return this.httpClient.get<OrderGet[]>(this.apiUrl + 's/1');
  }

  fetchCompletedOrders():Observable<OrderGet[]> {
    return this.httpClient.get<OrderGet[]>(this.apiUrl + 's/2');
  }

  fetchPastOrders():Observable<OrderGet[]> {
    return this.httpClient.get<OrderGet[]>(this.apiUrl + 's/3');
  }

  fetchNotAcceptedOrders():Observable<OrderGet[]> {
    return this.httpClient.get<OrderGet[]>(this.apiUrl + 's/4');
  }

  getOrderById(id: string): Observable<Order> {
    return this.httpClient.get<Order>(this.apiUrl + '/' + id);
  }

  acceptOrder(order: Order):Observable<Order> {
    order.acceptedBy = "user ka name le kar aao frontend se";
    order.acceptedAt = new Date();
    order.status = 1;
    return this.httpClient.put<Order>(this.apiUrl, order);
  }

  markOrderAsComplete(order: Order): Observable<Order> {
    order.completedAt = new Date();
    order.status = 2;
    return this.httpClient.put<Order>(this.apiUrl, order);
  }

}
