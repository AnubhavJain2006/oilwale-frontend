import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, observable } from 'rxjs';

import { Order } from '../interface/order';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = environment.baseUrl + 'api/order';

  constructor(private httpClient: HttpClient) { }

  fetchNewOrders():Observable<Order[]> {
    return this.httpClient.get<Order[]>(this.apiUrl + 's/0');
  }

  fetchAcceptedOrders():Observable<Order[]> {
    return this.httpClient.get<Order[]>(this.apiUrl + 's/1');
  }

  fetchCompletedOrders():Observable<Order[]> {
    return this.httpClient.get<Order[]>(this.apiUrl + 's/2');
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
