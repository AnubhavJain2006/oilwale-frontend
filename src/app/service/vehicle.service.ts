import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Vehicle } from '../interface/vehicle';
import { VehicleInfo } from '../interface/vehicle-info';

@Injectable({
  providedIn: 'root'
})

export class VehicleService {

  constructor(private httpClient:HttpClient) { }

  getVehicles():Observable<VehicleInfo[]> {
    let url = `${environment.baseUrl}api/getVehicles`;
    return this.httpClient.get<VehicleInfo[]>(url);
  }

  addVehicle(vehicle: Vehicle):Observable<Vehicle> {
    let url = `${environment.baseUrl}api/addVehicle`;
    return this.httpClient.post<Vehicle>(url, vehicle);
  }

  getVehicleById(vehicleid: string): Observable<VehicleInfo> {
    let url = environment.baseUrl + "api/getVehicle/" + vehicleid;
    return this.httpClient.get<VehicleInfo>(url);
  }

  // deactivates the vehicle
  deleteVehicleById(id: string): Observable<VehicleInfo> {
    let url = environment.baseUrl + "api/deleteVehicle/" + id; 
    return this.httpClient.delete<VehicleInfo>(url);
  }

} 

