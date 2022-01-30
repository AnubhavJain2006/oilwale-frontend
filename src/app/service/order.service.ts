import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Order } from '../interface/order';
import { OrderGet } from '../interface/order-get';
import { OrderUpdate } from '../interface/utilities/order-update';
import { environment } from 'src/environments/environment';

import jwt_decode from "jwt-decode";

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
    return this.httpClient.get<OrderGet[]>(this.apiUrl + '/pastOrders');
  }

  fetchNotAcceptedOrders():Observable<OrderGet[]> {
    return this.httpClient.get<OrderGet[]>(this.apiUrl + 's/4');
  }

  getOrderById(id: string): Observable<Order> {
    return this.httpClient.get<Order>(this.apiUrl + '/' + id);
  }

  acceptOrder(id: string):Observable<OrderUpdate> {
    let authToken: string | null = localStorage.getItem('authToken');
    let token = authToken != null ? jwt_decode(authToken) : null;
    
    const acceptOrder = {
      adminEmailId: JSON.parse(JSON.stringify(token)).sub,
      id: id,
      status: 1
    };
    return this.httpClient.put<OrderUpdate>(this.apiUrl, acceptOrder);
  }

  completeOrder(id: string):Observable<OrderUpdate> {
    let authToken: string | null = localStorage.getItem('authToken');
    let token = authToken != null ? jwt_decode(authToken) : null;
    
    const completeOrder = {
      adminEmailId: JSON.parse(JSON.stringify(token)).sub,
      id: id,
      status: 2
    };
    return this.httpClient.put<OrderUpdate>(this.apiUrl, completeOrder);
  }

  declineOrder(id: string):Observable<OrderUpdate> {
    let authToken: string | null = localStorage.getItem('authToken');
    let token = authToken != null ? jwt_decode(authToken) : null;
    
    const declineOrderObj = {
      adminEmailId: JSON.parse(JSON.stringify(token)).sub,
      id: id,
      status: 4
    };
    return this.httpClient.put<OrderUpdate>(this.apiUrl, declineOrderObj);
  }

  addNoteToOrder(orderId: string, note: string): Observable<OrderGet> {
    let reqObj = {
      orderId: orderId,
      notes: note
    }

    return this.httpClient.put<OrderGet>(this.apiUrl + '/note', reqObj);
  }

}
