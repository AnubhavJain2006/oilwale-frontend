import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Vehicle } from '../interface/vehicle';

@Injectable({
  providedIn: 'root'
})

export class VehicleService {

  constructor(private httpClient:HttpClient) { }

  getVehicles():Observable<Vehicle[]> {
    const url = `${environment.baseUrl}api/getVehicles`;
    return this.httpClient.get<Vehicle[]>(url);
  }

}
