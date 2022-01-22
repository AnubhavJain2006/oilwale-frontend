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
import { NewGarageRequest } from '../interface/new-garage-request';
import { CheckPhoneNumber } from '../interface/utilities/check-phone-number';

@Injectable({
  providedIn: 'root'
})
export class GarageService {

  garageList: Array<Garage> = [];
  deactivatedGarageList: Array<Garage> = [];
  _refreshNeeded = new Subject<void>();

  private apiUrl: string = environment.baseUrl + "api/garage";

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
      premium: false,
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

  getDeactivatedGarages(): Promise<any> {
    return this.httpClient.get(environment.baseUrl + "api/garage/deactivated").toPromise();
  }

  getGarageById(id: string): Observable<Garage> {
    return this.httpClient.get<Garage>(environment.baseUrl + 'api/garage/' + id);
  }

  getGarageCustomers(id: string): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(this.apiUrl + "/customers/" + id);
  }

  getGarageInSameArea(pincode: string): Observable<Garage[]> {
    return this.httpClient.get<Garage[]>(this.apiUrl + "/search/" + pincode);
  }

  updateGarageAccount(garage: Garage): Observable<Garage> {
    return this.httpClient.put<Garage>(this.apiUrl, garage).pipe(tap(() => {
      this._refreshNeeded.next();
    }));
  }

  deleteGarageById(id: string): Observable<Garage> {
    return this.httpClient.delete<Garage>(environment.baseUrl + 'api/garage/' + id).pipe(tap(() => {
      this._refreshNeeded.next();
    }));
  }

  redeemGaragePoints(id: string, points: number): Observable<Garagepointsredeem> {
    const data = { data: points };
    return this.httpClient.post<Garagepointsredeem>(this.apiUrl + '/redeemPoints/' + id, data);
  }

  restoreGarageAccount(garage: Garage): Observable<Garage> {
    __assign(this.tempGarage, garage);
    this.tempGarage.active = !this.tempGarage.active;
    return this.httpClient.put<Garage>(this.apiUrl, this.tempGarage).pipe(tap(() => {
      this._refreshNeeded.next();
    }));
  }

  fetchNewRequests(): Observable<NewGarageRequest[]> {
    return this.httpClient.get<NewGarageRequest[]>( environment.baseUrl + 'api/pending/newGarages');
  }

  fetchAcceptedRequests(): Observable<NewGarageRequest[]> {
    return this.httpClient.get<NewGarageRequest[]>( environment.baseUrl + 'api/accepted/newGarages');
  }

  acceptNewRequest(request: NewGarageRequest): Observable<NewGarageRequest> {
    let reqObj = request;
    reqObj.status = true;
    return this.httpClient.put<NewGarageRequest>( environment.baseUrl + 'api/newGarage', request);
  }

  declineNewRequest(request: NewGarageRequest): Observable<NewGarageRequest> {
    
    return this.httpClient.delete<NewGarageRequest>( environment.baseUrl + 'api/newGarage/' + request.newGarageRequestId);
  }

  checkPhoneNumber( phoneNumber: string ): Observable<CheckPhoneNumber> {
    let reqObj = {
      data: phoneNumber
    }
    return this.httpClient.post<CheckPhoneNumber>( environment.baseUrl + 'api/checkPhoneNumber', reqObj)
  }

}
