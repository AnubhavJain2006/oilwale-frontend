import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Vehicle } from '../interface/vehicle';
import { VehicleInfo } from '../interface/vehicle-info';

@Injectable({
  providedIn: 'root'
})

export class VehicleService {

  private apiUrl:string = environment.baseUrl + 'api/vehicle';

  vehicleList:VehicleInfo[] = [];

  private _vehicleListSubject = new Subject<any>();
  
  public get vehicleListSubject() : Subject<any> {
    return this._vehicleListSubject;
  }
  

  constructor(private httpClient:HttpClient) { }

  getVehicles():Observable<VehicleInfo[]> {
    return this.httpClient.get<VehicleInfo[]>(this.apiUrl + 's');
  }

  getVehiclesPromise():Promise<any> {
    return this.httpClient.get<VehicleInfo[]>(this.apiUrl + 's').toPromise();

  }

  addVehicle(vehicle: Vehicle):Observable<Vehicle> {
    return this.httpClient.post<Vehicle>(this.apiUrl, vehicle);
  }

  getVehicleById(vehicleid: string): Observable<VehicleInfo> {
    return this.httpClient.get<VehicleInfo>(this.apiUrl + '/' + vehicleid);
  }

  // deactivates the vehicle
  deleteVehicleById(id: string): Observable<VehicleInfo> {
    return this.httpClient.delete<VehicleInfo>(this.apiUrl + '/' + id);
  }

  updateVehicle(updatedVehicle:Vehicle): Observable<Vehicle> {
    return this.httpClient.put<Vehicle>( this.apiUrl, updatedVehicle);
  }
  
  getVehiclesOfSameCompany(id: string): Observable<Vehicle[]> {
    return this.httpClient.get<Vehicle[]>(this.apiUrl + '/company/' + id);
  }


} 

