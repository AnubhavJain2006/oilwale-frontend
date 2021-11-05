import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Garage } from './../interface/garage';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class GarageService {

  garageList: Array<Garage> = [];
  _refreshNeeded = new Subject<void>();

  get refreshNeeded() {
    return this._refreshNeeded;
  }

  addNewGarage(garage: Garage): Observable<any> {
    return this.httpClient.post(environment.baseUrl + "api/addGarage", garage).pipe(tap(() => {
      this._refreshNeeded.next();
    }));
  }
  getAreaByPincode(pincode: any): Promise<any> {
    return this.httpClient.get("https://api.postalpincode.in/pincode/" + pincode).toPromise()

  }
  getAllGarages(): Promise<any> {
    return this.httpClient.get(environment.baseUrl + "api/getAllGarages").toPromise()
  }

  constructor(private httpClient: HttpClient) { }

  getGarageById(id: string): Observable<Garage> {
    return this.httpClient.get<Garage>(environment.baseUrl + 'api/getGarageById/' + id);
  }
}
