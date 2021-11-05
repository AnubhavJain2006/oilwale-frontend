import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Scheme } from './../interface/scheme';
import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SchemeService {

  _refreshNeeded = new Subject<void>();

  get refreshNeeded() {
    return this._refreshNeeded;
  }
  constructor(private httpClient: HttpClient) { }

  addNewScheme(scheme: Scheme): Observable<any> {
    return this.httpClient.post(environment.baseUrl + "api/addScheme", scheme).pipe(tap(() => {
      this._refreshNeeded.next()
    }))
  }

  loadAllActiveScheme(): Promise<any> {
    return this.httpClient.get(environment.baseUrl + "api/allActiveScheme").toPromise();
  }
  loadAllConcludedScheme() {
    return this.httpClient.get(environment.baseUrl + "api/findAllConcludedScheme").toPromise();

  }
  loadAllUpComingScheme() {
    return this.httpClient.get(environment.baseUrl + "api/allUpcomingScheme").toPromise();
  }

  getSchemeById(id: string): Observable<Scheme> {
    return this.httpClient.get<Scheme>(environment.baseUrl + "api/getSchemeById/" + id);
  }

}
