import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { VehicleCompany } from '../interface/vehicle-company';

@Injectable({
  providedIn: 'root'
})

export class VehicleCompanyService {

  constructor(private httpClient: HttpClient) { }

  getVehicleCompanies(): Observable<VehicleCompany[]> {
    const url = `${environment.baseUrl}api/getVehicleCompany`;
    return this.httpClient.get<VehicleCompany[]>(url);
  }

  addVehicleCompany(newCompany: VehicleCompany):Observable<VehicleCompany> {
    return this.httpClient.post<VehicleCompany>( environment.baseUrl + 'api/addVehicleCompany', newCompany);
  }

}
 