import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { DashboardData } from '../interface/dashboard/dashboard-data';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private httpClient: HttpClient) { }

  getDashboardStats():Observable<DashboardData> {
    return this.httpClient.get<DashboardData>(environment.baseUrl + 'api/dashboard/data');
  }

}
