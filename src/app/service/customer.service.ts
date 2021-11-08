import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'

import { Customer } from 'src/app/interface/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  customerList: Array<Customer> = [];

  constructor(private httpClient: HttpClient) { }

  getAllCustomer(): Promise<any> {
    return this.httpClient.get(environment.baseUrl + "api/customers").toPromise();
  }

  getCustomerById(id: string): Observable<Customer> {
    return this.httpClient.get<Customer>(environment.baseUrl + 'api/customer/' + id );
  }
}
