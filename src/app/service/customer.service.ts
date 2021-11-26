import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment'

import { Customer } from 'src/app/interface/customer';
import { CustomerVehicle } from '../interface/customer-vehicle';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  customerList: Array<Customer> = [];
  restrictedCustomerList: Customer[] = [];

  private _customerListSubject = new Subject<any>();
  private _restrictedCustomerListSubject = new Subject<any>();

  get customerListSubject() {
    return this._customerListSubject;
  }

  get restrictedCustomerListSubject() {
    return this._restrictedCustomerListSubject;
  }

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
    return this.httpClient.delete<Customer>(environment.baseUrl + 'api/customer/' + id).pipe(tap(() => {
      this._customerListSubject.next();
      this._restrictedCustomerListSubject.next();
    }));
  }

  restoreCustomer(customer:Customer): Observable<Customer> {
    return this.httpClient.put<Customer>(environment.baseUrl + 'api/customer', customer).pipe(tap(() => {
      this._customerListSubject.next();
      this._restrictedCustomerListSubject.next();
    }));
  }

  getRestrictedCustomers(): Promise<Customer[]> {
    return this.httpClient.get<Customer[]>(environment.baseUrl + 'api/customers/deactive').toPromise();
  }

}
