import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Broadcast } from '../interface/broadcast';

@Injectable({
  providedIn: 'root'
})
export class BroadcastService {

  private apiUrl: string = environment.baseUrl + "api/broadcast";

  constructor(private http: HttpClient) { }

  fetchBroadcasts(): Observable<Broadcast[]> {
    return this.http.get<Broadcast[]>(this.apiUrl + "s");
  }

  fetchBroadcastByGroup(group: string): Observable<Broadcast[]> {
    return this.http.get<Broadcast[]>(this.apiUrl + "/targetGroup/" + group);
  }

  fetchBroadcastById(id: string): Observable<Broadcast> {
    return this.http.get<Broadcast>(this.apiUrl + "/" + id);
  }

  addBroadcast(broadcast: Broadcast): Observable<Broadcast> {
    return this.http.post<Broadcast>(this.apiUrl, broadcast);
  }

}
