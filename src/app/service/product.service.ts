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
  deletedProductsList: Product[] = [];
  private _refreshNeeded = new Subject<void>();

  get refreshNeeded() {
    return this._refreshNeeded;
  }

  constructor(private httpClient: HttpClient) {

  }

  addProduct(value: Product): Observable<any> {
    return this.httpClient.post(environment.baseUrl + "api/product", value).pipe(tap(() => {
      this._refreshNeeded.next();
    }));
  }


  loadAllProducts(): Promise<any> {
    return this.httpClient.get(environment.baseUrl + "api/products").toPromise();
  }

  getDeletedProducts(): Promise<any> {
    return this.httpClient.get(environment.baseUrl + "api/products/deactive").toPromise();
  }

  getAllProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(environment.baseUrl + "api/products");
  }

  getProductById(id: string): Observable<Product> {
    return this.httpClient.get<Product>(environment.baseUrl+ "api/product/" + id);
  }

  // deactivates a product
  deleteProductById(id: string): Observable<Product> {
    let url = environment.baseUrl + "api/product/" + id;
    return this.httpClient.delete<Product>(url).pipe(tap(() => {
      this._refreshNeeded.next();
    }));
  }

  // updates the product
  updateProduct(product: Product): Observable<Product> {
    let url = environment.baseUrl + "api/product";
    return this.httpClient.put<Product>(url, product).pipe(tap(() => {
      this._refreshNeeded.next();
    }));
  }

  getSpecificVehicleTypeProduct(type: string): Observable<Product[]> {
    return this.httpClient.get<Product[]>( environment.baseUrl + 'api/product/vehicleType/' + type);
  }

}
