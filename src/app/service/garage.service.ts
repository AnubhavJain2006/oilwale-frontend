import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Garage } from './../interface/garage';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { __assign } from 'tslib';

import { Customer } from '../interface/customer';
import { Garagepointsredeem } from '../interface/utilities/garagepointsredeem';

@Injectable({
  providedIn: 'root'
})
export class GarageService {
  
  garageList: Array<Garage> = [];
  _refreshNeeded = new Subject<void>();

  apiUrl:string = environment.baseUrl + "api/garage";

  tempGarage: Garage;

  constructor(private httpClient: HttpClient) { 

    // just temp variable to store values
    this.tempGarage = {
      garageId: "",
      name: "",
      garageName: "",
      phoneNumber: "",
      alternateNumber: "",
      gstNumber: "",
      address: "",
      pincode: 380001,
      area: "",
      image: "",
      referralCode: "",
      totalCustomer: 0,
      totalScore: 0,
      panCard: "",
      // isActive: boolean,
      createdAt: "",
      updatedAt: "",
      active: false,
    }
  }


  get refreshNeeded() {
    return this._refreshNeeded;
  }

  addNewGarage(garage: Garage): Observable<any> {
    return this.httpClient.post(environment.baseUrl + "api/garage", garage).pipe(tap(() => {
      this._refreshNeeded.next();
    }));
  }
  getAreaByPincode(pincode: any): Promise<any> {
    return this.httpClient.get("https://api.postalpincode.in/pincode/" + pincode).toPromise()

  }
  getAllGarages(): Promise<any> {
    return this.httpClient.get(environment.baseUrl + "api/garage/active").toPromise()
  }

  getGarageById(id: string): Observable<Garage> {
    return this.httpClient.get<Garage>(environment.baseUrl + 'api/garage/' + id);
  }

  getGarageCustomers(id: string):Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(this.apiUrl + "/customers/" + id);
  }

  getGarageInSameArea(pincode:string): Observable<Garage[]>{
    return this.httpClient.get<Garage[]>(this.apiUrl + "/search/" + pincode);
  }

  updateGarageAccount(garage:Garage): Observable<Garage> {
    return this.httpClient.put<Garage>(this.apiUrl, garage);
  }

  deleteGarageById(id: string): Observable<Garage> {
    return this.httpClient.delete<Garage>(environment.baseUrl + 'api/garage/' + id).pipe(tap(() => {
      this._refreshNeeded.next();
    }));
  }

  redeemGaragePoints(id: string, points: number): Observable<Garagepointsredeem> {
    const data = {data: points};
    return this.httpClient.post<Garagepointsredeem>( this.apiUrl + '/redeemPoints/' + id, data);
  }

  restoreGarageAccount(garage: Garage): Observable<Garage> {
    __assign(this.tempGarage, garage);
    this.tempGarage.active = !this.tempGarage.active;
    return this.httpClient.put<Garage>(this.apiUrl, this.tempGarage);
  }
}
