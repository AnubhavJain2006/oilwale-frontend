import { Customer } from 'src/app/interface/customer';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  customerList: Array<Customer> = [];

  getAllCustomer(): Promise<any> {
    return this.httpClient.get(environment.baseUrl + "api/getCustomers").toPromise();
  }

  constructor(private httpClient: HttpClient) { }
}
