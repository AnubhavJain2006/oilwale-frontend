import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Activity } from '../interface/activity';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  private apiUrl: string = environment.baseUrl + 'api/activity';

  constructor(private httpClient: HttpClient) { }

  addActivity(newActivity: Activity): Observable<Activity> {
    return this.httpClient.post<Activity>(this.apiUrl, newActivity);
  }

  getActivities(): Observable<Activity[]> {
    return this.httpClient.get<Activity[]>(this.apiUrl);
  }

  getDomainActivities(domain: string): Observable<Activity[]> {
    return this.httpClient.get<Activity[]>(this.apiUrl + '/' + domain);
  }

  getUserActivities(id: string): Observable<Activity[]> {
    return this.httpClient.get<Activity[]>(this.apiUrl + '/admin');
  }

}
