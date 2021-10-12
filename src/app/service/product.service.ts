import { Product } from './../interface/product';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators'
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productList: Array<Product> = [];
  _refreshNeeded = new Subject<void>();

  get refreshNeeded() {
    return this._refreshNeeded;
  }

  constructor(private httpClient: HttpClient) {

  }

  addProduct(value: Product): Observable<any> {
    return this.httpClient.post(environment.baseUrl + "api/addProduct", value).pipe(tap(() => {
      this._refreshNeeded.next();
    }));
  }


  loadAllProducts(): Promise<any> {
    return this.httpClient.get(environment.baseUrl + "api/getAllProduct").toPromise();
  }

}
