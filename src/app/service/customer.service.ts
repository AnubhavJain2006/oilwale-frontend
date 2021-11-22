import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'

import { Customer } from 'src/app/interface/customer';
import { CustomerVehicle } from '../interface/customer-vehicle';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  customerList: Array<Customer> = [];

  constructor(private httpClient: HttpClient) { }

  getAllCustomer(): Promise<any> {
    return this.httpClient.get(environment.baseUrl + "api/customers/active").toPromise();
  }

  getCustomerById(id: string): Observable<Customer> {
    return this.httpClient.get<Customer>(environment.baseUrl + 'api/customer/' + id );
  }

  getCustomerVehicles(id: string): Observable<CustomerVehicle[]> {
    return this.httpClient.get<CustomerVehicle[]>( environment.baseUrl + 'api/customervehicle/customer/' + id);
  }

  deleteCustomerById(id: string): Observable<Customer> {
    return this.httpClient.delete<Customer>(environment.baseUrl + 'api/customer/' + id);
  }

  restoreCustomer(customer:Customer): Observable<Customer> {
    return this.httpClient.put<Customer>(environment.baseUrl + 'api/customer', customer);
  }

}
